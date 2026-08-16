package com.workerspot.dto;

public class BookingRequest {

    private Long workerId;

    private String category;

    private String serviceLocation;

    private String serviceState;

    private String serviceDistrict;

    private String serviceCity;

    private String serviceArea;

    private Double customerLatitude;

    private Double customerLongitude;

    private String problemDescription;


    // ==============================
    // GETTERS
    // ==============================

    public Long getWorkerId() {
        return workerId;
    }

    public String getCategory() {
        return category;
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

    public String getProblemDescription() {
        return problemDescription;
    }


    // ==============================
    // SETTERS
    // ==============================

    public void setWorkerId(Long workerId) {
        this.workerId = workerId;
    }

    public void setCategory(String category) {
        this.category = category;
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

    public void setProblemDescription(String problemDescription) {
        this.problemDescription = problemDescription;
    }
}