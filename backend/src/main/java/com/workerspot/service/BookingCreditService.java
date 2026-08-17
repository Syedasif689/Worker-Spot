package com.workerspot.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.workerspot.dto.BookingCreditPurchaseRequest;
import com.workerspot.dto.BookingCreditPurchaseResponse;
import com.workerspot.entity.BookingCreditPlan;
import com.workerspot.entity.BookingCreditTransaction;
import com.workerspot.entity.CreditTransactionStatus;
import com.workerspot.entity.CustomerProfile;
import com.workerspot.entity.User;
import com.workerspot.repository.BookingCreditTransactionRepository;
import com.workerspot.repository.CustomerProfileRepository;
import com.workerspot.repository.UserRepository;

@Service
public class BookingCreditService {

    private final BookingCreditTransactionRepository
            bookingCreditTransactionRepository;

    private final CustomerProfileRepository
            customerProfileRepository;

    private final UserRepository userRepository;


    public BookingCreditService(
            BookingCreditTransactionRepository
                    bookingCreditTransactionRepository,
            CustomerProfileRepository
                    customerProfileRepository,
            UserRepository userRepository
    ) {

        this.bookingCreditTransactionRepository =
                bookingCreditTransactionRepository;

        this.customerProfileRepository =
                customerProfileRepository;

        this.userRepository =
                userRepository;
    }


    // =====================================================
    // CREATE PURCHASE
    // =====================================================
    //
    // IMPORTANT:
    //
    // This does NOT give credits to the customer.
    //
    // It only creates the purchase transaction.
    //
    // Credits are added ONLY after payment verification.
    // =====================================================

    @Transactional
    public BookingCreditPurchaseResponse createPurchase(
            Long customerId,
            BookingCreditPurchaseRequest request
    ) {

        // =================================================
        // VALIDATE CUSTOMER
        // =================================================

        User customer = userRepository
                .findById(customerId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Customer not found."
                        )
                );


        // =================================================
        // VALIDATE CUSTOMER ROLE
        // =================================================

        if (customer.getRole() == null ||
                !customer.getRole()
                        .name()
                        .equals("CUSTOMER")) {

            throw new RuntimeException(
                    "Only customers can purchase booking credits."
            );
        }


        // =================================================
        // VALIDATE REQUEST
        // =================================================

        if (request == null ||
                request.getPlan() == null ||
                request.getPlan().isBlank()) {

            throw new RuntimeException(
                    "Booking credit plan is required."
            );
        }


        // =================================================
        // FIND PLAN
        // =================================================

        BookingCreditPlan plan;

        try {

            plan = BookingCreditPlan.fromName(
                    request.getPlan().trim()
            );

        } catch (IllegalArgumentException e) {

            throw new RuntimeException(
                    "Invalid booking credit plan."
            );
        }


        // =================================================
        // CREATE TRANSACTION
        // =================================================

        BookingCreditTransaction transaction =
                new BookingCreditTransaction();


        transaction.setCustomer(customer);

        transaction.setPlanName(
                plan.getName()
        );

        transaction.setCredits(
                plan.getCredits()
        );

        transaction.setAmount(
                plan.getAmount()
        );


        // =================================================
        // INITIAL PAYMENT STATUS
        // =================================================

        transaction.setStatus(
                CreditTransactionStatus.CREATED
        );


        // =================================================
        // PAYMENT IDS
        // =================================================
        //
        // These remain NULL until the payment gateway
        // creates an actual payment order/payment.
        // =================================================

        transaction.setPaymentOrderId(null);

        transaction.setPaymentId(null);


        // =================================================
        // SAVE
        // =================================================

        BookingCreditTransaction savedTransaction =
                bookingCreditTransactionRepository
                        .save(transaction);


        // =================================================
        // RESPONSE
        // =================================================

        return toPurchaseResponse(
                savedTransaction
        );
    }


    // =====================================================
    // CUSTOMER TRANSACTIONS
    // =====================================================

    public List<BookingCreditPurchaseResponse>
    getCustomerTransactions(Long customerId) {

        return bookingCreditTransactionRepository
                .findByCustomerIdOrderByCreatedAtDesc(
                        customerId
                )
                .stream()
                .map(this::toPurchaseResponse)
                .toList();
    }


    // =====================================================
    // CUSTOMER CREDIT BALANCE
    // =====================================================

    public int getCustomerCredits(Long customerId) {

        CustomerProfile customerProfile =
                customerProfileRepository
                        .findByUserId(customerId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Customer profile not found."
                                )
                        );

        return customerProfile.getBookingCredits();
    }


    // =====================================================
    // ADD CREDITS AFTER SUCCESSFUL PAYMENT
    // =====================================================
    //
    // IMPORTANT:
    //
    // This method must ONLY be called after the payment
    // has been verified by the backend.
    //
    // It also prevents the same transaction from adding
    // credits twice.
    // =====================================================

    @Transactional
    public BookingCreditPurchaseResponse
    markPaymentSuccessful(
            Long transactionId,
            String paymentId
    ) {

        BookingCreditTransaction transaction =
                bookingCreditTransactionRepository
                        .findById(transactionId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Credit transaction not found."
                                )
                        );


        // =================================================
        // PREVENT DUPLICATE CREDIT
        // =================================================

        if (transaction.getStatus() ==
                CreditTransactionStatus.PAID) {

            return toPurchaseResponse(
                    transaction
            );
        }


        // =================================================
        // PAYMENT ID
        // =================================================

        if (paymentId == null ||
                paymentId.isBlank()) {

            throw new RuntimeException(
                    "Payment ID is required."
            );
        }


        // =================================================
        // CHECK PAYMENT ID ALREADY USED
        // =================================================

        bookingCreditTransactionRepository
                .findByPaymentId(paymentId)
                .ifPresent(existingTransaction -> {

                    if (!existingTransaction.getId()
                            .equals(transactionId)) {

                        throw new RuntimeException(
                                "This payment has already been used."
                        );
                    }
                });


        // =================================================
        // CUSTOMER PROFILE
        // =================================================

        CustomerProfile customerProfile =
                customerProfileRepository
                        .findByUserId(
                                transaction
                                        .getCustomer()
                                        .getId()
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Customer profile not found."
                                )
                        );


        // =================================================
        // ADD CREDITS
        // =================================================

        customerProfile.setBookingCredits(
                customerProfile.getBookingCredits()
                        + transaction.getCredits()
        );


        customerProfileRepository.save(
                customerProfile
        );


        // =================================================
        // MARK TRANSACTION PAID
        // =================================================

        transaction.setPaymentId(
                paymentId
        );

        transaction.setStatus(
                CreditTransactionStatus.PAID
        );


        BookingCreditTransaction savedTransaction =
                bookingCreditTransactionRepository
                        .save(transaction);


        return toPurchaseResponse(
                savedTransaction
        );
    }


    // =====================================================
    // MARK PAYMENT FAILED
    // =====================================================

    @Transactional
    public BookingCreditPurchaseResponse
    markPaymentFailed(Long transactionId) {

        BookingCreditTransaction transaction =
                bookingCreditTransactionRepository
                        .findById(transactionId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Credit transaction not found."
                                )
                        );


        if (transaction.getStatus() ==
                CreditTransactionStatus.PAID) {

            throw new RuntimeException(
                    "A successful payment cannot be marked as failed."
            );
        }


        transaction.setStatus(
                CreditTransactionStatus.FAILED
        );


        BookingCreditTransaction savedTransaction =
                bookingCreditTransactionRepository
                        .save(transaction);


        return toPurchaseResponse(
                savedTransaction
        );
    }


    // =====================================================
    // RESPONSE MAPPER
    // =====================================================

    private BookingCreditPurchaseResponse
    toPurchaseResponse(
            BookingCreditTransaction transaction
    ) {

        BookingCreditPurchaseResponse response =
                new BookingCreditPurchaseResponse();


        response.setTransactionId(
                transaction.getId()
        );

        response.setPlan(
                transaction.getPlanName()
        );

        response.setCredits(
                transaction.getCredits()
        );

        response.setAmount(
                transaction.getAmount()
        );

        response.setStatus(
                transaction.getStatus() != null
                        ? transaction.getStatus().name()
                        : null
        );

        response.setPaymentOrderId(
                transaction.getPaymentOrderId()
        );


        return response;
    }
}
