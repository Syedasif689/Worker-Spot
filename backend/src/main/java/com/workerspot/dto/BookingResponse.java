package com.workerspot.dto;

import java.time.LocalDateTime;

public class BookingResponse {

    private Long bookingId;

    // =====================================================
    // CUSTOMER-SAFE INFORMATION
    // =====================================================

    private Long workerId;
    private String workerName;
    private String workerCategory;
    private int workerExperienceYears;

    // =====================================================
    // WORKER-SAFE INFORMATION
    // =====================================================

    private Long customerId;
    private String customerName;

    // =====================================================
    // SERVICE
    // =====================================================

    private String category;
    private String problemDescription;

    private String serviceLocation;
    private String serviceState;
    private String serviceDistrict;
    private String serviceCity;
    private String serviceArea;

    private Double customerLatitude;
    private Double customerLongitude;

    // =====================================================
    // PAYMENT
    // =====================================================

    private double workerCharges;
    private double platformFee;
    private double totalAmount;
    private boolean freeBooking;

    // =====================================================
    // STATUS
    // =====================================================

    private String status;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;


    // =====================================================
    // GETTERS
    // =====================================================

    public Long getBookingId() {
        return bookingId;
    }

    public Long getWorkerId() {
        return workerId;
    }

    public String getWorkerName() {
        return workerName;
    }

    public String getWorkerCategory() {
        return workerCategory;
    }

    public int getWorkerExperienceYears() {
        return workerExperienceYears;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public String getCategory() {
        return category;
    }

    public String getProblemDescription() {
        return problemDescription;
    }

    public String getServiceLocation() {
        return serviceLocation;
    }

    public String getServiceState() {
        return serviceState;
    }

    public String getServiceDistrict() {
        return serviceDistrict;
    }

    public String getServiceCity() {
        return serviceCity;
    }

    public String getServiceArea() {
        return serviceArea;
    }

    public Double getCustomerLatitude() {
        return customerLatitude;
    }

    public Double getCustomerLongitude() {
        return customerLongitude;
    }

    public double getWorkerCharges() {
        return workerCharges;
    }

    public double getPlatformFee() {
        return platformFee;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public boolean isFreeBooking() {
        return freeBooking;
    }

    public String getStatus() {
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

    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }

    public void setWorkerId(Long workerId) {
        this.workerId = workerId;
    }

    public void setWorkerName(String workerName) {
        this.workerName = workerName;
    }

    public void setWorkerCategory(String workerCategory) {
        this.workerCategory = workerCategory;
    }

    public void setWorkerExperienceYears(int workerExperienceYears) {
        this.workerExperienceYears = workerExperienceYears;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setProblemDescription(String problemDescription) {
        this.problemDescription = problemDescription;
    }

    public void setServiceLocation(String serviceLocation) {
        this.serviceLocation = serviceLocation;
    }

    public void setServiceState(String serviceState) {
        this.serviceState = serviceState;
    }

    public void setServiceDistrict(String serviceDistrict) {
        this.serviceDistrict = serviceDistrict;
    }

    public void setServiceCity(String serviceCity) {
        this.serviceCity = serviceCity;
    }

    public void setServiceArea(String serviceArea) {
        this.serviceArea = serviceArea;
    }

    public void setCustomerLatitude(Double customerLatitude) {
        this.customerLatitude = customerLatitude;
    }

    public void setCustomerLongitude(Double customerLongitude) {
        this.customerLongitude = customerLongitude;
    }

    public void setWorkerCharges(double workerCharges) {
        this.workerCharges = workerCharges;
    }

    public void setPlatformFee(double platformFee) {
        this.platformFee = platformFee;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public void setFreeBooking(boolean freeBooking) {
        this.freeBooking = freeBooking;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}