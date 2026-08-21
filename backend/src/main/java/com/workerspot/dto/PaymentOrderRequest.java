package com.workerspot.dto;

import jakarta.validation.constraints.NotBlank;

public class PaymentOrderRequest {

    // =====================================================
    // PACKAGE
    // =====================================================

    /*
     * Frontend sends only the package name.
     *
     * Example:
     *
     * STARTER
     * PLUS
     * PRO
     * PREMIUM
     *
     * The backend decides the actual price and
     * number of booking credits.
     */

    @NotBlank(message = "Package is required")
    private String packageName;


    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    public PaymentOrderRequest() {
    }


    // =====================================================
    // GETTER
    // =====================================================

    public String getPackageName() {
        return packageName;
    }


    // =====================================================
    // SETTER
    // =====================================================

    public void setPackageName(String packageName) {
        this.packageName = packageName;
    }
}