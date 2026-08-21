package com.workerspot.dto;

import jakarta.validation.constraints.NotBlank;

public class PaymentVerificationRequest {

    // =====================================================
    // ORDER ID
    // =====================================================

    /*
     * Payment gateway order ID created by our backend.
     */
    @NotBlank(message = "Order ID is required")
    private String orderId;


    // =====================================================
    // PAYMENT ID
    // =====================================================

    /*
     * Payment ID generated after the customer completes
     * the payment.
     */
    @NotBlank(message = "Payment ID is required")
    private String paymentId;


    // =====================================================
    // PAYMENT SIGNATURE
    // =====================================================

    /*
     * Signature returned by the payment gateway.
     *
     * Backend uses this to verify that the payment response
     * has not been tampered with.
     */
    @NotBlank(message = "Payment signature is required")
    private String signature;


    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    public PaymentVerificationRequest() {
    }


    // =====================================================
    // GETTERS
    // =====================================================

    public String getOrderId() {
        return orderId;
    }


    public String getPaymentId() {
        return paymentId;
    }


    public String getSignature() {
        return signature;
    }


    // =====================================================
    // SETTERS
    // =====================================================

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }


    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }


    public void setSignature(String signature) {
        this.signature = signature;
    }
}