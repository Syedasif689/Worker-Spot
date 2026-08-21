package com.workerspot.control;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.workerspot.dto.PaymentOrderRequest;
import com.workerspot.dto.PaymentVerificationRequest;
import com.workerspot.entity.PaymentTransaction;
import com.workerspot.entity.User;
import com.workerspot.repository.UserRepository;
import com.workerspot.service.PaymentService;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    // =====================================================
    // SERVICES / REPOSITORIES
    // =====================================================

    private final PaymentService paymentService;

    private final UserRepository userRepository;


    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    public PaymentController(
            PaymentService paymentService,
            UserRepository userRepository) {

        this.paymentService = paymentService;
        this.userRepository = userRepository;
    }


    // =====================================================
    // CREATE PAYMENT ORDER
    // =====================================================

    @PostMapping("/create-order")
    public ResponseEntity<?> createPaymentOrder(
            @Valid @RequestBody PaymentOrderRequest request,
            Authentication authentication) {

        try {

            User customer = getAuthenticatedUser(
                    authentication
            );


            PaymentTransaction transaction =
                    paymentService.createPaymentOrder(
                            request,
                            customer
                    );


            return ResponseEntity.ok(
                    new PaymentOrderResponse(
                            transaction.getOrderId(),
                            transaction.getAmount(),
                            paymentService.getRazorpayKeyId()
                    )
            );

        } catch (Exception e) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            new ErrorResponse(
                                    e.getMessage()
                            )
                    );
        }
    }


    // =====================================================
    // VERIFY PAYMENT
    // =====================================================

    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(
            @Valid @RequestBody PaymentVerificationRequest request,
            Authentication authentication) {

        try {

            User customer = getAuthenticatedUser(
                    authentication
            );


            PaymentTransaction transaction =
                    paymentService.verifyPayment(
                            request,
                            customer
                    );


            return ResponseEntity.ok(
                    new PaymentVerificationResponse(
                            transaction.getOrderId(),
                            transaction.getPaymentId(),
                            transaction.getStatus().name(),
                            transaction.getAmount()
                    )
            );

        } catch (Exception e) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            new ErrorResponse(
                                    e.getMessage()
                            )
                    );
        }
    }


    // =====================================================
    // GET AUTHENTICATED USER
    // =====================================================

    private User getAuthenticatedUser(
            Authentication authentication) {

        if (authentication == null
                || authentication.getName() == null
                || authentication.getName().isBlank()) {

            throw new RuntimeException(
                    "User is not authenticated"
            );
        }


        String email =
                authentication.getName();


        return userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Authenticated user not found"
                        )
                );
    }


    // =====================================================
    // PAYMENT ORDER RESPONSE
    // =====================================================

    public static class PaymentOrderResponse {

        private String orderId;

        private Double amount;

        private String keyId;


        public PaymentOrderResponse(
                String orderId,
                Double amount,
                String keyId) {

            this.orderId = orderId;
            this.amount = amount;
            this.keyId = keyId;
        }


        public String getOrderId() {
            return orderId;
        }


        public Double getAmount() {
            return amount;
        }


        public String getKeyId() {
            return keyId;
        }
    }


    // =====================================================
    // PAYMENT VERIFICATION RESPONSE
    // =====================================================

    public static class PaymentVerificationResponse {

        private String orderId;

        private String paymentId;

        private String status;

        private Double amount;


        public PaymentVerificationResponse(
                String orderId,
                String paymentId,
                String status,
                Double amount) {

            this.orderId = orderId;
            this.paymentId = paymentId;
            this.status = status;
            this.amount = amount;
        }


        public String getOrderId() {
            return orderId;
        }


        public String getPaymentId() {
            return paymentId;
        }


        public String getStatus() {
            return status;
        }


        public Double getAmount() {
            return amount;
        }
    }


    // =====================================================
    // ERROR RESPONSE
    // =====================================================

    public static class ErrorResponse {

        private String message;


        public ErrorResponse(String message) {

            this.message = message;
        }


        public String getMessage() {

            return message;
        }
    }
}