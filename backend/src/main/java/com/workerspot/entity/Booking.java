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
import jakarta.persistence.OneToOne;

@Entity
@Table(name = "bookings")
public class Booking {

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
    // WORKER
    // =====================================================

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "worker_id", nullable = false)
    private WorkerProfile worker;

    // =====================================================
    // SERVICE DETAILS
    // =====================================================

    @Column(nullable = false, length = 100)
    private String category;

    @Column(name = "problem_description", columnDefinition = "TEXT")
    private String problemDescription;

    // =====================================================
    // SERVICE LOCATION
    // =====================================================

    @Column(
        name = "service_location",
        nullable = false,
        length = 500
    )
    private String serviceLocation;

    @Column(name = "service_state", length = 100)
    private String serviceState;

    @Column(name = "service_district", length = 100)
    private String serviceDistrict;

    @Column(name = "service_city", length = 100)
    private String serviceCity;

    @Column(name = "service_area", length = 100)
    private String serviceArea;

    @Column(name = "customer_latitude")
    private Double customerLatitude;

    @Column(name = "customer_longitude")
    private Double customerLongitude;

    // =====================================================
    // PAYMENT
    // =====================================================

    /*
     * IMPORTANT:
     *
     * workerCharges = worker's own charge.
     *
     * Worker Spot does NOT collect this money.
     *
     * Customer pays the worker directly after the
     * work is completed.
     */

    @Column(name = "worker_charges", nullable = false)
    private double workerCharges;

    /*
     * Worker Spot platform fee is NOT added to workerCharges.
     *
     * Platform access is handled separately through
     * booking credits.
     *
     * Therefore this remains 0 for normal bookings.
     */

    @Column(name = "platform_fee", nullable = false)
    private double platformFee = 0.0;

    /*
     * This represents only the worker's service charge.
     *
     * Example:
     *
     * Worker charge = ₹500
     *
     * totalAmount = ₹500
     *
     * Worker Spot does NOT receive this ₹500.
     */

    @Column(name = "total_amount", nullable = false)
    private double totalAmount;

    /*
     * TRUE for first 3 free Worker Spot bookings.
     *
     * FALSE when booking was made using purchased
     * Worker Spot booking credits.
     */

    @Column(name = "free_booking", nullable = false)
    private boolean freeBooking;
     // =====================================================
// PLATFORM FEE PAYMENT
// =====================================================

/*
 * Links this booking to the Worker Spot platform-fee
 * payment transaction.
 *
 * NULL for the first 3 free bookings.
 *
 * NOT NULL for bookings after the free-booking limit.
 *
 * This prevents a Razorpay payment from being reused
 * for multiple bookings.
 */
@OneToOne(fetch = FetchType.LAZY)
@JoinColumn(
    name = "payment_transaction_id",
    unique = true
)
private PaymentTransaction paymentTransaction;

    // =====================================================
    // BOOKING STATUS
    // =====================================================

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private BookingStatus status = BookingStatus.PENDING;

    // =====================================================
    // 24-HOUR CONNECTION WINDOW
    // =====================================================

    /*
     * This field is NULL until the worker completes
     * the booking.
     *
     * When worker presses "Completed":
     *
     * connectionExpiresAt =
     *     completed time + 24 hours
     *
     * During this period:
     *
     * Customer:
     *   - can see worker connection card
     *   - can call through Worker Spot
     *   - can report a complaint
     *
     * Worker:
     *   - can communicate through the allowed
     *     Worker Spot calling system
     *
     * After this time:
     *
     *   - connection is locked
     *   - calling is disabled
     *   - complaint connection is closed
     */

    @Column(name = "connection_expires_at")
    private LocalDateTime connectionExpiresAt;

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
    // GETTERS AND SETTERS
    // =====================================================

    public Long getId() {
        return id;
    }

    public User getCustomer() {
        return customer;
    }

    public void setCustomer(User customer) {
        this.customer = customer;
    }

    public WorkerProfile getWorker() {
        return worker;
    }

    public void setWorker(WorkerProfile worker) {
        this.worker = worker;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getProblemDescription() {
        return problemDescription;
    }

    public void setProblemDescription(String problemDescription) {
        this.problemDescription = problemDescription;
    }

    public String getServiceLocation() {
        return serviceLocation;
    }

    public void setServiceLocation(String serviceLocation) {
        this.serviceLocation = serviceLocation;
    }

    public String getServiceState() {
        return serviceState;
    }

    public void setServiceState(String serviceState) {
        this.serviceState = serviceState;
    }

    public String getServiceDistrict() {
        return serviceDistrict;
    }

    public void setServiceDistrict(String serviceDistrict) {
        this.serviceDistrict = serviceDistrict;
    }

    public String getServiceCity() {
        return serviceCity;
    }

    public void setServiceCity(String serviceCity) {
        this.serviceCity = serviceCity;
    }

    public String getServiceArea() {
        return serviceArea;
    }

    public void setServiceArea(String serviceArea) {
        this.serviceArea = serviceArea;
    }

    public Double getCustomerLatitude() {
        return customerLatitude;
    }

    public void setCustomerLatitude(Double customerLatitude) {
        this.customerLatitude = customerLatitude;
    }

    public Double getCustomerLongitude() {
        return customerLongitude;
    }

    public void setCustomerLongitude(Double customerLongitude) {
        this.customerLongitude = customerLongitude;
    }

    public double getWorkerCharges() {
        return workerCharges;
    }

    public void setWorkerCharges(double workerCharges) {
        this.workerCharges = workerCharges;
    }

    public double getPlatformFee() {
        return platformFee;
    }

    public void setPlatformFee(double platformFee) {
        this.platformFee = platformFee;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public boolean isFreeBooking() {
        return freeBooking;
    }

    public void setFreeBooking(boolean freeBooking) {
        this.freeBooking = freeBooking;
    }

    public BookingStatus getStatus() {
        return status;
    }

    public void setStatus(BookingStatus status) {
        this.status = status;
    }
     public PaymentTransaction getPaymentTransaction() {
    return paymentTransaction;
}

public void setPaymentTransaction(
        PaymentTransaction paymentTransaction
) {
    this.paymentTransaction = paymentTransaction;
}

    // =====================================================
    // 24-HOUR CONNECTION
    // =====================================================

    public LocalDateTime getConnectionExpiresAt() {
        return connectionExpiresAt;
    }

    public void setConnectionExpiresAt(
            LocalDateTime connectionExpiresAt
    ) {
        this.connectionExpiresAt = connectionExpiresAt;
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