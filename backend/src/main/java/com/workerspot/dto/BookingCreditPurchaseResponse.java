package com.workerspot.dto;

public class BookingCreditPurchaseResponse {

    private Long transactionId;

    private String plan;

    private int credits;

    private double amount;

    private String status;

    private String paymentOrderId;


    // =====================================================
    // GETTERS
    // =====================================================

    public Long getTransactionId() {
        return transactionId;
    }

    public String getPlan() {
        return plan;
    }

    public int getCredits() {
        return credits;
    }

    public double getAmount() {
        return amount;
    }

    public String getStatus() {
        return status;
    }

    public String getPaymentOrderId() {
        return paymentOrderId;
    }


    // =====================================================
    // SETTERS
    // =====================================================

    public void setTransactionId(Long transactionId) {
        this.transactionId = transactionId;
    }

    public void setPlan(String plan) {
        this.plan = plan;
    }

    public void setCredits(int credits) {
        this.credits = credits;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setPaymentOrderId(String paymentOrderId) {
        this.paymentOrderId = paymentOrderId;
    }
}
