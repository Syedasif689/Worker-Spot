package com.workerspot.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@Table(name = "payment_transactions")
public class PaymentTransaction {

    // =====================================================
    // ID
    // =====================================================

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // =====================================================
    // CUSTOMER
    // =====================================================

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        name = "customer_id",
        nullable = false
    )
    private User customer;


    // =====================================================
    // PAYMENT USAGE
    // =====================================================

    /*
     * Indicates whether the credits from this payment
     * have already been consumed.
     *
     * false = credits still available
     * true  = payment credits have been consumed
     *
     * IMPORTANT:
     *
     * The actual number of remaining credits is stored
     * in CustomerProfile.bookingCredits.
     */

    @Column(
        name = "used_for_booking",
        nullable = false
    )
    private boolean usedForBooking = false;


    // =====================================================
    // PAYMENT ORDER
    // =====================================================

    /*
     * Razorpay order ID.
     *
     * Example:
     * order_R9x123abc
     */

    @Column(
        name = "order_id",
        nullable = false,
        unique = true,
        length = 100
    )
    private String orderId;


    // =====================================================
    // PAYMENT ID
    // =====================================================

    /*
     * Razorpay payment ID.
     *
     * This is null until payment succeeds.
     */

    @Column(
        name = "payment_id",
        unique = true,
        length = 100
    )
    private String paymentId;


    // =====================================================
    // BOOKING CREDITS
    // =====================================================

    /*
     * Number of booking credits purchased by this payment.
     *
     * Packages:
     *
     * ₹20  -> 1 credit
     * ₹40  -> 3 credits
     * ₹80  -> 5 credits
     * ₹100 -> 8 credits
     *
     * This value records what the customer purchased.
     */

    @Column(
        name = "booking_credits",
        nullable = false
    )
    private int bookingCredits;


    // =====================================================
    // AMOUNT
    // =====================================================

    /*
     * Amount actually paid to Worker Spot.
     *
     * Examples:
     *
     * ₹20
     * ₹40
     * ₹80
     * ₹100
     */

    @Column(
        nullable = false
    )
    private Double amount;


    // =====================================================
    // PAYMENT STATUS
    // =====================================================

    @Enumerated(EnumType.STRING)
    @Column(
        nullable = false,
        length = 20
    )
    private PaymentStatus status;


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
    // CONSTRUCTOR
    // =====================================================

    public PaymentTransaction() {
    }


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
    // CUSTOMER
    // =====================================================

    public User getCustomer() {
        return customer;
    }

    public void setCustomer(User customer) {
        this.customer = customer;
    }


    // =====================================================
    // PAYMENT USAGE
    // =====================================================

    public boolean isUsedForBooking() {
        return usedForBooking;
    }

    public void setUsedForBooking(boolean usedForBooking) {
        this.usedForBooking = usedForBooking;
    }


    // =====================================================
    // ORDER ID
    // =====================================================

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }


    // =====================================================
    // PAYMENT ID
    // =====================================================

    public String getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }


    // =====================================================
    // BOOKING CREDITS
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
    // AMOUNT
    // =====================================================

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {

        if (amount == null || amount <= 0) {
            throw new IllegalArgumentException(
                "Payment amount must be greater than zero"
            );
        }

        this.amount = amount;
    }


    // =====================================================
    // STATUS
    // =====================================================

    public PaymentStatus getStatus() {
        return status;
    }

    public void setStatus(PaymentStatus status) {
        this.status = status;
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