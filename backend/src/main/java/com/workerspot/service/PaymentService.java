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
import com.workerspot.entity.BookingCreditTransaction;
import com.workerspot.entity.CreditTransactionStatus;
import com.workerspot.entity.CustomerProfile;
import com.workerspot.entity.PaymentStatus;
import com.workerspot.entity.PaymentTransaction;
import com.workerspot.entity.User;
import com.workerspot.repository.BookingCreditTransactionRepository;
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
     * STARTER -> ₹20  -> 1 credit
     * PLUS    -> ₹40  -> 3 credits
     * PRO     -> ₹80  -> 5 credits
     * PREMIUM -> ₹100 -> 8 credits
     *
     * IMPORTANT:
     *
     * The frontend sends ONLY packageName.
     *
     * The backend decides the amount and credits.
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

    private final BookingCreditTransactionRepository
            bookingCreditTransactionRepository;


    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    public PaymentService(
            PaymentTransactionRepository paymentTransactionRepository,
            CustomerProfileRepository customerProfileRepository,
            BookingCreditTransactionRepository bookingCreditTransactionRepository
    ) {

        this.paymentTransactionRepository =
                paymentTransactionRepository;

        this.customerProfileRepository =
                customerProfileRepository;

        this.bookingCreditTransactionRepository =
                bookingCreditTransactionRepository;
    }


    // =====================================================
    // CREATE RAZORPAY ORDER
    // =====================================================

    @Transactional
    public PaymentTransaction createPaymentOrder(
            PaymentOrderRequest request,
            User customer
    ) {

        /*
         * Never trust amount or credits from React.
         *
         * React sends:
         *
         * {
         *     "packageName": "PRO"
         * }
         *
         * Backend determines:
         *
         * PRO -> ₹80 -> 5 credits
         */

        String packageName =
                normalizePackageName(
                        request.getPackageName()
                );


        // =================================================
        // GET PACKAGE AMOUNT
        // =================================================

        double amount =
                getPackageAmount(
                        packageName
                );


        // =================================================
        // GET PACKAGE CREDITS
        // =================================================

        int bookingCredits =
                getPackageCredits(
                        packageName
                );


        try {

            // =============================================
            // RAZORPAY CLIENT
            // =============================================

            RazorpayClient razorpayClient =
                    new RazorpayClient(
                            razorpayKeyId,
                            razorpayKeySecret
                    );


            // =============================================
            // AMOUNT IN PAISE
            // =============================================

            int amountInPaise =
                    (int) Math.round(
                            amount * 100
                    );


            // =============================================
            // RAZORPAY ORDER REQUEST
            // =============================================

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


            // =============================================
            // CREATE RAZORPAY ORDER
            // =============================================

            Order razorpayOrder =
                    razorpayClient.orders.create(
                            orderRequest
                    );


            String orderId =
                    razorpayOrder.get("id");


            // =============================================
            // SAVE PAYMENT TRANSACTION
            // =============================================

            PaymentTransaction transaction =
                    new PaymentTransaction();

            transaction.setCustomer(
                    customer
            );

            transaction.setOrderId(
                    orderId
            );

            transaction.setAmount(
                    amount
            );

            transaction.setBookingCredits(
                    bookingCredits
            );

            transaction.setStatus(
                    PaymentStatus.CREATED
            );


            PaymentTransaction savedPaymentTransaction =
                    paymentTransactionRepository.save(
                            transaction
                    );


            // =============================================
            // SAVE BOOKING CREDIT TRANSACTION
            // =============================================
            //
            // This creates the record in:
            //
            // booking_credit_transactions
            //
            // At this point payment has NOT yet been
            // verified.
            //
            // Therefore status = CREATED.
            //
            // Credits are NOT added here.
            //
            // Credits are added only after successful
            // Razorpay verification.
            // =============================================

            BookingCreditTransaction creditTransaction =
                    new BookingCreditTransaction();

            creditTransaction.setCustomer(
                    customer
            );

            creditTransaction.setPlanName(
                    packageName
            );

            creditTransaction.setCredits(
                    bookingCredits
            );

            creditTransaction.setAmount(
                    amount
            );

            creditTransaction.setPaymentOrderId(
                    orderId
            );

            creditTransaction.setPaymentId(
                    null
            );

            creditTransaction.setStatus(
                    CreditTransactionStatus.CREATED
            );


            bookingCreditTransactionRepository.save(
                    creditTransaction
            );


            // =============================================
            // RETURN PAYMENT TRANSACTION
            // =============================================

            return savedPaymentTransaction;


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
            User customer
    ) {

        // =================================================
        // FIND PAYMENT TRANSACTION
        // =================================================

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


        try {

            // =================================================
            // VERIFY RAZORPAY SIGNATURE
            // =================================================

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
            // ADD CREDITS TO CUSTOMER
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
            // MARK PAYMENT TRANSACTION AS PAID
            // =================================================

            transaction.setPaymentId(
                    request.getPaymentId()
            );

            transaction.setStatus(
                    PaymentStatus.PAID
            );


            PaymentTransaction savedPaymentTransaction =
                    paymentTransactionRepository.save(
                            transaction
                    );


            // =================================================
            // UPDATE BOOKING CREDIT TRANSACTION
            // =================================================
            //
            // Find the credit transaction using the
            // Razorpay order ID.
            //
            // Then attach the actual payment ID and mark
            // the transaction as PAID.
            // =================================================

            BookingCreditTransaction creditTransaction =
                    bookingCreditTransactionRepository
                            .findByPaymentOrderId(
                                    transaction.getOrderId()
                            )
                            .orElseThrow(() ->
                                    new RuntimeException(
                                            "Booking credit transaction not found"
                                    )
                            );


            // =============================================
            // PAYMENT ID
            // =============================================

            creditTransaction.setPaymentId(
                    request.getPaymentId()
            );


            // =============================================
            // MARK CREDIT TRANSACTION AS PAID
            // =============================================

            creditTransaction.setStatus(
                    CreditTransactionStatus.PAID
            );


            bookingCreditTransactionRepository.save(
                    creditTransaction
            );


            // =================================================
            // RETURN
            // =================================================

            return savedPaymentTransaction;


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
            String packageName
    ) {

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
            String packageName
    ) {

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
            String packageName
    ) {

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
     * NEVER send razorpay.key.secret to frontend.
     */

    public String getRazorpayKeyId() {

        return razorpayKeyId;
    }
}