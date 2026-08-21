package com.workerspot.service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.Utils;
import com.workerspot.dto.PaymentOrderRequest;
import com.workerspot.dto.PaymentVerificationRequest;
import com.workerspot.entity.CustomerProfile;
import com.workerspot.entity.PaymentStatus;
import com.workerspot.entity.PaymentTransaction;
import com.workerspot.entity.User;
import com.workerspot.repository.CustomerProfileRepository;
import com.workerspot.repository.PaymentTransactionRepository;

@Service
public class PaymentService {

    // =====================================================
    // PACKAGE DEFINITIONS
    // =====================================================

    /*
     * Worker Spot booking-credit packages.
     *
     * The frontend sends ONLY the package name.
     *
     * The backend decides:
     *
     * STARTER -> ₹20  -> 1 credit
     * PLUS    -> ₹40  -> 3 credits
     * PRO     -> ₹80  -> 5 credits
     * PREMIUM -> ₹100 -> 8 credits
     */

    private static final String STARTER = "STARTER";
    private static final String PLUS = "PLUS";
    private static final String PRO = "PRO";
    private static final String PREMIUM = "PREMIUM";


    // =====================================================
    // RAZORPAY CREDENTIALS
    // =====================================================

    @Value("${razorpay.key.id}")
    private String razorpayKeyId;

    @Value("${razorpay.key.secret}")
    private String razorpayKeySecret;


    // =====================================================
    // REPOSITORIES
    // =====================================================

    private final PaymentTransactionRepository
            paymentTransactionRepository;

    private final CustomerProfileRepository
            customerProfileRepository;


    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    public PaymentService(
            PaymentTransactionRepository paymentTransactionRepository,
            CustomerProfileRepository customerProfileRepository) {

        this.paymentTransactionRepository =
                paymentTransactionRepository;

        this.customerProfileRepository =
                customerProfileRepository;
    }


    // =====================================================
    // CREATE RAZORPAY ORDER
    // =====================================================

    @Transactional
    public PaymentTransaction createPaymentOrder(
            PaymentOrderRequest request,
            User customer) {

        /*
         * Never trust amount or credits from React.
         *
         * React sends only:
         *
         * {
         *     "packageName": "PRO"
         * }
         *
         * Backend determines the price and credits.
         */

        String packageName =
                normalizePackageName(
                        request.getPackageName()
                );


        double amount =
                getPackageAmount(packageName);


        int bookingCredits =
                getPackageCredits(packageName);


        try {

            // =================================================
            // RAZORPAY CLIENT
            // =================================================

            RazorpayClient razorpayClient =
                    new RazorpayClient(
                            razorpayKeyId,
                            razorpayKeySecret
                    );


            // =================================================
            // AMOUNT IN PAISE
            // =================================================

            int amountInPaise =
                    (int) Math.round(
                            amount * 100
                    );


            // =================================================
            // RAZORPAY ORDER REQUEST
            // =================================================

            JSONObject orderRequest =
                    new JSONObject();

            orderRequest.put(
                    "amount",
                    amountInPaise
            );

            orderRequest.put(
                    "currency",
                    "INR"
            );

            orderRequest.put(
                    "receipt",
                    "WS_" + System.currentTimeMillis()
            );


            // =================================================
            // CREATE RAZORPAY ORDER
            // =================================================

            Order razorpayOrder =
                    razorpayClient.orders.create(
                            orderRequest
                    );


            String orderId =
                    razorpayOrder.get("id");


            // =================================================
            // SAVE TRANSACTION
            // =================================================

            PaymentTransaction transaction =
                    new PaymentTransaction();

            transaction.setCustomer(customer);

            transaction.setOrderId(orderId);

            transaction.setAmount(amount);

            transaction.setBookingCredits(
                    bookingCredits
            );

            transaction.setStatus(
                    PaymentStatus.CREATED
            );


            return paymentTransactionRepository.save(
                    transaction
            );

        } catch (Exception e) {

            throw new RuntimeException(
                    "Unable to create Razorpay order",
                    e
            );
        }
    }


    // =====================================================
// VERIFY RAZORPAY PAYMENT
// =====================================================

@Transactional
public PaymentTransaction verifyPayment(
        PaymentVerificationRequest request,
        User customer) {

    PaymentTransaction transaction =
            paymentTransactionRepository
                    .findByOrderId(
                            request.getOrderId()
                    )
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Payment order not found"
                            )
                    );


    // =================================================
    // SECURITY CHECK
    // =================================================

    if (transaction.getCustomer() == null
            || !transaction.getCustomer()
                    .getId()
                    .equals(customer.getId())) {

        throw new RuntimeException(
                "You are not authorized to verify this payment"
        );
    }


    // =================================================
    // PREVENT DUPLICATE CREDIT
    // =================================================

    if (transaction.getStatus()
            == PaymentStatus.PAID) {

        return transaction;
    }


    // =================================================
    // VERIFY RAZORPAY SIGNATURE
    // =================================================

    try {

        String payload =
                request.getOrderId()
                + "|"
                + request.getPaymentId();


        boolean validSignature =
                Utils.verifySignature(
                        payload,
                        request.getSignature(),
                        razorpayKeySecret
                );


        if (!validSignature) {

            transaction.setStatus(
                    PaymentStatus.FAILED
            );

            paymentTransactionRepository.save(
                    transaction
            );

            throw new RuntimeException(
                    "Payment signature verification failed"
            );
        }


        // =================================================
        // CUSTOMER PROFILE
        // =================================================

        CustomerProfile customerProfile =
                customerProfileRepository
                        .findByUser(customer)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Customer profile not found"
                                )
                        );


        // =================================================
        // PURCHASED CREDITS
        // =================================================

        int purchasedCredits =
                transaction.getBookingCredits();


        if (purchasedCredits <= 0) {

            throw new RuntimeException(
                    "Invalid booking credit amount"
            );
        }


        // =================================================
        // ADD CREDITS
        // =================================================

        int currentCredits =
                customerProfile.getBookingCredits();


        customerProfile.setBookingCredits(
                currentCredits + purchasedCredits
        );


        customerProfileRepository.save(
                customerProfile
        );


        // =================================================
        // MARK PAYMENT AS PAID
        // =================================================

        transaction.setPaymentId(
                request.getPaymentId()
        );

        transaction.setStatus(
                PaymentStatus.PAID
        );


        return paymentTransactionRepository.save(
                transaction
        );

    } catch (Exception e) {

        /*
         * Do not mark an already successful payment
         * as failed.
         */

        if (transaction.getStatus()
                != PaymentStatus.PAID) {

            transaction.setStatus(
                    PaymentStatus.FAILED
            );

            paymentTransactionRepository.save(
                    transaction
            );
        }


        throw new RuntimeException(
                "Payment verification failed",
                e
        );
    }
}


    // =====================================================
    // NORMALIZE PACKAGE NAME
    // =====================================================

    private String normalizePackageName(
            String packageName) {

        if (packageName == null
                || packageName.isBlank()) {

            throw new RuntimeException(
                    "Package name is required"
            );
        }


        return packageName
                .trim()
                .toUpperCase();
    }


    // =====================================================
    // PACKAGE PRICE
    // =====================================================

    private double getPackageAmount(
            String packageName) {

        return switch (packageName) {

            case STARTER -> 20.0;

            case PLUS -> 40.0;

            case PRO -> 80.0;

            case PREMIUM -> 100.0;

            default -> throw new RuntimeException(
                    "Invalid Worker Spot package: "
                    + packageName
            );
        };
    }


    // =====================================================
    // PACKAGE CREDITS
    // =====================================================

    private int getPackageCredits(
            String packageName) {

        return switch (packageName) {

            case STARTER -> 1;

            case PLUS -> 3;

            case PRO -> 5;

            case PREMIUM -> 8;

            default -> throw new RuntimeException(
                    "Invalid Worker Spot package: "
                    + packageName
            );
        };
    }


    // =====================================================
    // GET RAZORPAY KEY ID
    // =====================================================

    /*
     * Safe to send to React.
     *
     * NEVER send razorpay.key.secret to the frontend.
     */

    public String getRazorpayKeyId() {

        return razorpayKeyId;
    }
}