
package com.workerspot.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "booking_credit_transactions")
public class BookingCreditTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // =====================================================
    // CUSTOMER
    // =====================================================

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private User customer;

    // =====================================================
    // CREDIT PLAN
    // =====================================================

    @Column(name = "plan_name", nullable = false, length = 50)
    private String planName;

    @Column(name = "credits", nullable = false)
    private int credits;

    @Column(name = "amount", nullable = false)
    private double amount;

    // =====================================================
    // PAYMENT
    // =====================================================

    @Column(name = "payment_order_id", unique = true)
    private String paymentOrderId;

    @Column(name = "payment_id", unique = true)
    private String paymentId;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 30)
    private CreditTransactionStatus status =
            CreditTransactionStatus.CREATED;

    // =====================================================
    // TIMESTAMPS
    // =====================================================

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    // =====================================================
    // JPA CALLBACKS
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
    // GETTERS
    // =====================================================

    public Long getId() {
        return id;
    }

    public User getCustomer() {
        return customer;
    }

    public String getPlanName() {
        return planName;
    }

    public int getCredits() {
        return credits;
    }

    public double getAmount() {
        return amount;
    }

    public String getPaymentOrderId() {
        return paymentOrderId;
    }

    public String getPaymentId() {
        return paymentId;
    }

    public CreditTransactionStatus getStatus() {
        return status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    // =====================================================
    // SETTERS
    // =====================================================

    public void setCustomer(User customer) {
        this.customer = customer;
    }

    public void setPlanName(String planName) {
        this.planName = planName;
    }

    public void setCredits(int credits) {
        this.credits = credits;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public void setPaymentOrderId(String paymentOrderId) {
        this.paymentOrderId = paymentOrderId;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }

    public void setStatus(CreditTransactionStatus status) {
        this.status = status;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
