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
        @UniqueConstraint(
            name = "uk_user_email",
            columnNames = "email"
        ),
        @UniqueConstraint(
            name = "uk_user_mobile",
            columnNames = "mobile"
        )
    }
)
public class User {

    // =====================================================
    // ID
    // =====================================================

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // =====================================================
    // BASIC USER INFORMATION
    // =====================================================

    @Column(
        name = "full_name",
        nullable = false,
        length = 100
    )
    private String fullName;


    @Column(
        nullable = false,
        length = 150
    )
    private String email;


    @Column(
        nullable = false,
        length = 15
    )
    private String mobile;


    // =====================================================
    // MOBILE VERIFICATION
    // =====================================================

    /*
     * Indicates whether the mobile number was successfully
     * verified through OTP.
     *
     * false = mobile not verified
     * true  = mobile verified
     *
     * New accounts should only be created after successful
     * OTP verification, so normally this will be true for
     * newly registered users.
     */
    @Column(
        name = "mobile_verified",
        nullable = false
    )
    private boolean mobileVerified = false;


    // =====================================================
    // PASSWORD
    // =====================================================

    /*
     * Password is always stored as a BCrypt hash.
     *
     * NEVER store the user's plain-text password.
     */
    @Column(
        nullable = false
    )
    private String password;


    // =====================================================
    // ROLE
    // =====================================================

    @Enumerated(EnumType.STRING)
    @Column(
        nullable = false,
        length = 20
    )
    private Role role;


    // =====================================================
    // ACCOUNT STATUS
    // =====================================================

    @Column(
        nullable = false
    )
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
     * After 3 free bookings, the customer pays the
     * Worker Spot platform fee for future bookings.
     */
    @Column(
        name = "free_bookings_used",
        nullable = false
    )
    private int freeBookingsUsed = 0;


    // =====================================================
    // CONSTANT
    // =====================================================

    /**
     * Maximum number of free bookings allowed
     * for every customer.
     */
    public static final int FREE_BOOKING_LIMIT = 3;


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

        /*
         * Every newly created user starts with:
         *
         * 0 used free bookings
         *
         * and mobile verification defaults to false.
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
    // ID GETTER / SETTER
    // =====================================================

    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }


    // =====================================================
    // FULL NAME
    // =====================================================

    public String getFullName() {
        return fullName;
    }


    public void setFullName(String fullName) {
        this.fullName = fullName;
    }


    // =====================================================
    // EMAIL
    // =====================================================

    public String getEmail() {
        return email;
    }


    public void setEmail(String email) {
        this.email = email;
    }


    // =====================================================
    // MOBILE
    // =====================================================

    public String getMobile() {
        return mobile;
    }


    public void setMobile(String mobile) {
        this.mobile = mobile;
    }


    // =====================================================
    // MOBILE VERIFICATION
    // =====================================================

    /**
     * Returns true when the mobile number has been
     * successfully verified through OTP.
     */
    public boolean isMobileVerified() {
        return mobileVerified;
    }


    /**
     * Sets the mobile verification status.
     */
    public void setMobileVerified(boolean mobileVerified) {
        this.mobileVerified = mobileVerified;
    }


    // =====================================================
    // PASSWORD
    // =====================================================

    public String getPassword() {
        return password;
    }


    public void setPassword(String password) {
        this.password = password;
    }


    // =====================================================
    // ROLE
    // =====================================================

    public Role getRole() {
        return role;
    }


    public void setRole(Role role) {
        this.role = role;
    }


    // =====================================================
    // ACTIVE
    // =====================================================

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


    public void setFreeBookingsUsed(
            int freeBookingsUsed
    ) {

        if (freeBookingsUsed < 0) {

            this.freeBookingsUsed = 0;

            return;
        }

        this.freeBookingsUsed = freeBookingsUsed;
    }


    // =====================================================
    // BOOKING HELPERS
    // =====================================================

    /**
     * Returns true if the customer still has
     * at least one free booking available.
     */
    public boolean hasFreeBooking() {

        return freeBookingsUsed < FREE_BOOKING_LIMIT;
    }


    /**
     * Returns the number of free bookings remaining.
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