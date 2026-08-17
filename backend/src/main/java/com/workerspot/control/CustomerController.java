package com.workerspot.control;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.workerspot.dto.CustomerProfileResponse;
import com.workerspot.dto.CustomerProfileUpdateRequest;
import com.workerspot.service.CustomerProfileService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerProfileService customerProfileService;


    public CustomerController(
            CustomerProfileService customerProfileService
    ) {
        this.customerProfileService =
                customerProfileService;
    }


    // =====================================================
    // GET MY PROFILE
    // =====================================================

    @GetMapping("/me")
    public ResponseEntity<?> getMyProfile(
            Authentication authentication
    ) {

        try {

            String email =
                    authentication.getName();

            CustomerProfileResponse profile =
                    customerProfileService
                            .getCustomerProfile(email);

            return ResponseEntity.ok(profile);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            java.util.Map.of(
                                    "message",
                                    e.getMessage()
                            )
                    );
        }
    }


    // =====================================================
    // UPDATE MY PROFILE
    // =====================================================

    @PutMapping("/me")
    public ResponseEntity<?> updateMyProfile(
            @Valid
            @RequestBody
            CustomerProfileUpdateRequest request,

            Authentication authentication
    ) {

        try {

            String email =
                    authentication.getName();

            CustomerProfileResponse profile =
                    customerProfileService
                            .updateCustomerProfile(
                                    email,
                                    request
                            );

            return ResponseEntity.ok(profile);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            java.util.Map.of(
                                    "message",
                                    e.getMessage()
                            )
                    );
        }
    }
}