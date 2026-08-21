package com.workerspot.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.workerspot.entity.PaymentStatus;
import com.workerspot.entity.PaymentTransaction;
import com.workerspot.entity.User;

@Repository
public interface PaymentTransactionRepository
        extends JpaRepository<PaymentTransaction, Long> {

    // =====================================================
    // FIND BY RAZORPAY ORDER ID
    // =====================================================

    Optional<PaymentTransaction> findByOrderId(
            String orderId
    );


    // =====================================================
    // FIND BY RAZORPAY PAYMENT ID
    // =====================================================

    Optional<PaymentTransaction> findByPaymentId(
            String paymentId
    );


    // =====================================================
    // CUSTOMER TRANSACTIONS
    // =====================================================

    List<PaymentTransaction> findByCustomer(
            User customer
    );


    // =====================================================
    // FIND UNUSED PAID PAYMENT
    // =====================================================

    /*
     * Used by BookingService when a customer needs to pay
     * the ₹20 Worker Spot platform fee.
     *
     * The payment must:
     *
     * 1. Belong to this customer
     * 2. Have PAID status
     * 3. Not already be used by another booking
     */

    Optional<PaymentTransaction>
    findFirstByCustomerAndStatusAndUsedForBookingFalseOrderByCreatedAtDesc(
            User customer,
            PaymentStatus status
    );
}