package com.workerspot.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(
    name = "users",
    uniqueConstraints = {
        @UniqueConstraint(name = "uk_user_email", columnNames = "email"),
        @UniqueConstraint(name = "uk_user_mobile", columnNames = "mobile")
    }
)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;

    @Column(nullable = false, length = 150)
    private String email;

    @Column(nullable = false, length = 15)
    private String mobile;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Role role;

    @Column(nullable = false)
    private boolean active = true;

    // =====================================================
    // FREE BOOKINGS
    // =====================================================

    /*
     * Every new customer gets 3 free bookings.
     *
     * 0 = No free bookings used
     * 1 = One free booking used
     * 2 = Two free bookings used
     * 3 = All free bookings used
     *
     * After 3 free bookings, the customer pays
     * the Worker Spot platform fee for future bookings.
     */
    @Column(
        name = "free_bookings_used",
        nullable = false
    )
    private int freeBookingsUsed = 0;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;


    // =====================================================
    // LIFECYCLE
    // =====================================================

    @PrePersist
    protected void onCreate() {

        LocalDateTime now = LocalDateTime.now();

        createdAt = now;
        updatedAt = now;

        /*
         * Make sure every newly created user starts
         * with zero used free bookings.
         */
        if (freeBookingsUsed < 0) {
            freeBookingsUsed = 0;
        }
    }


    @PreUpdate
    protected void onUpdate() {

        updatedAt = LocalDateTime.now();

    }


    // =====================================================
    // GETTERS AND SETTERS
    // =====================================================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }


    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }


    // =====================================================
    // FREE BOOKINGS GETTER / SETTER
    // =====================================================

    public int getFreeBookingsUsed() {
        return freeBookingsUsed;
    }

    public void setFreeBookingsUsed(int freeBookingsUsed) {

        if (freeBookingsUsed < 0) {
            this.freeBookingsUsed = 0;
            return;
        }

        this.freeBookingsUsed = freeBookingsUsed;
    }


    // =====================================================
    // BOOKING HELPER METHODS
    // =====================================================

    /**
     * Maximum number of free bookings allowed
     * for every customer.
     */
    public static final int FREE_BOOKING_LIMIT = 3;


    /**
     * Returns true if the customer still has
     * at least one free booking available.
     */
    public boolean hasFreeBooking() {

        return freeBookingsUsed < FREE_BOOKING_LIMIT;
    }


    /**
     * Returns how many free bookings remain.
     */
    public int getRemainingFreeBookings() {

        int remaining =
                FREE_BOOKING_LIMIT - freeBookingsUsed;

        return Math.max(remaining, 0);
    }


    /**
     * Uses one free booking.
     */
    public void useFreeBooking() {

        if (hasFreeBooking()) {

            freeBookingsUsed++;
        }
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