
package com.workerspot.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@Table(name = "customer_profiles")
public class CustomerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // =====================================================
    // USER
    // =====================================================

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        name = "user_id",
        nullable = false,
        unique = true
    )
    private User user;


    // =====================================================
    // FREE BOOKINGS
    // =====================================================
    // Every new customer gets 3 free bookings.
    //
    // 0 = no free bookings used
    // 1 = one free booking used
    // 2 = two free bookings used
    // 3 = all free bookings used
    //
    // IMPORTANT:
    // Purchased credits NEVER modify this value.
    // =====================================================

    @Column(
        name = "free_bookings_used",
        nullable = false
    )
    private int freeBookingsUsed = 0;


    // =====================================================
    // PAID BOOKING CREDITS
    // =====================================================
    // Credits purchased from Worker Spot.
    //
    // ₹20  -> 1 booking
    // ₹40  -> 3 bookings
    // ₹80  -> 5 bookings
    // ₹100 -> 8 bookings
    //
    // These credits are for Worker Spot's
    // connection/booking service only.
    //
    // They are NOT worker charges.
    //
    // Customer pays the worker directly after
    // completing the work.
    // =====================================================

    @Column(
        name = "booking_credits",
        nullable = false
    )
    private int bookingCredits = 0;


    // =====================================================
    // TIMESTAMPS
    // =====================================================

    @Column(
        name = "created_at",
        nullable = false,
        updatable = false
    )
    private LocalDateTime createdAt;

    @Column(
        name = "updated_at",
        nullable = false
    )
    private LocalDateTime updatedAt;


    // =====================================================
    // JPA LIFECYCLE
    // =====================================================

    @PrePersist
    protected void onCreate() {

        LocalDateTime now = LocalDateTime.now();

        createdAt = now;
        updatedAt = now;
    }

    @PreUpdate
    protected void onUpdate() {

        updatedAt = LocalDateTime.now();
    }


    // =====================================================
    // ID
    // =====================================================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    // =====================================================
    // USER
    // =====================================================

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }


    // =====================================================
    // FREE BOOKINGS
    // =====================================================

    public int getFreeBookingsUsed() {
        return freeBookingsUsed;
    }

    public void setFreeBookingsUsed(int freeBookingsUsed) {

        if (freeBookingsUsed < 0) {
            throw new IllegalArgumentException(
                "Free bookings used cannot be negative"
            );
        }

        if (freeBookingsUsed > 3) {
            throw new IllegalArgumentException(
                "Free bookings used cannot exceed 3"
            );
        }

        this.freeBookingsUsed = freeBookingsUsed;
    }


    // =====================================================
    // PAID BOOKING CREDITS
    // =====================================================

    public int getBookingCredits() {
        return bookingCredits;
    }

    public void setBookingCredits(int bookingCredits) {

        if (bookingCredits < 0) {
            throw new IllegalArgumentException(
                "Booking credits cannot be negative"
            );
        }

        this.bookingCredits = bookingCredits;
    }


    // =====================================================
    // TIMESTAMPS
    // =====================================================

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
