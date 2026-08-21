package com.workerspot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.workerspot.entity.Booking;
import com.workerspot.entity.BookingStatus;

@Repository
public interface BookingRepository
        extends JpaRepository<Booking, Long> {

    // =====================================================
    // CUSTOMER BOOKINGS
    // =====================================================

    List<Booking> findByCustomerIdOrderByCreatedAtDesc(
            Long customerId
    );


    // =====================================================
    // WORKER REQUESTS
    // =====================================================

    List<Booking> findByWorkerIdOrderByCreatedAtDesc(
            Long workerId
    );


    // =====================================================
    // WORKER REQUESTS BY STATUS
    // =====================================================

    List<Booking> findByWorkerIdAndStatusOrderByCreatedAtDesc(
            Long workerId,
            BookingStatus status
    );


    // =====================================================
    // COUNT CUSTOMER FREE BOOKINGS
    // =====================================================

    long countByCustomerIdAndFreeBookingTrue(
            Long customerId
    );


    // =====================================================
    // ACTIVE BOOKINGS FOR WORKER
    // =====================================================

    long countByWorkerIdAndStatus(
            Long workerId,
            BookingStatus status
    );


    // =====================================================
    // CHECK EXISTING CUSTOMER -> WORKER BOOKING
    // =====================================================
    //
    // A customer can have only ONE active request with
    // the same worker.
    //
    // PENDING  -> blocks another request
    // ACCEPTED -> blocks another request
    // REJECTED -> allows another request
    // COMPLETED -> allows another request
    //
    // =====================================================

    boolean existsByCustomerIdAndWorkerIdAndStatusIn(
            Long customerId,
            Long workerId,
            List<BookingStatus> statuses
    );
}