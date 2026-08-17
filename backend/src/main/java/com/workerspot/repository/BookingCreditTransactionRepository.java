package com.workerspot.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.workerspot.entity.BookingCreditTransaction;

@Repository
public interface BookingCreditTransactionRepository
        extends JpaRepository<BookingCreditTransaction, Long> {

    // =====================================================
    // CUSTOMER TRANSACTIONS
    // =====================================================

    List<BookingCreditTransaction>
    findByCustomerIdOrderByCreatedAtDesc(Long customerId);


    // =====================================================
    // PAYMENT ORDER
    // =====================================================

    Optional<BookingCreditTransaction>
    findByPaymentOrderId(String paymentOrderId);


    // =====================================================
    // PAYMENT ID
    // =====================================================

    Optional<BookingCreditTransaction>
    findByPaymentId(String paymentId);
}
