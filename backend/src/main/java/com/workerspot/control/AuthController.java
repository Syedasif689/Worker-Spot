package com.workerspot.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.workerspot.dto.LoginRequest;
import com.workerspot.dto.LoginResponse;
import com.workerspot.dto.RegisterRequest;
import com.workerspot.dto.WorkerRegisterRequest;
import com.workerspot.entity.User;
import com.workerspot.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // =====================================================
    // CUSTOMER REGISTRATION
    // =====================================================

    @PostMapping("/register/customer")
    public ResponseEntity<?> registerCustomer(
            @Valid @RequestBody RegisterRequest request
    ) {

        User user = authService.registerCustomer(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(Map.of(
                        "message",
                        "Customer registered successfully",

                        "userId",
                        user.getId(),

                        "role",
                        user.getRole()
                ));
    }


    // =====================================================
    // LOGIN
    // =====================================================

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @Valid @RequestBody LoginRequest request
    ) {

        LoginResponse response =
                authService.login(request);

        return ResponseEntity.ok(response);
    }


    // =====================================================
    // WORKER REGISTRATION
    // =====================================================

    @PostMapping("/register/worker")
    public ResponseEntity<?> registerWorker(
            @Valid @RequestBody WorkerRegisterRequest request
    ) {

        User user =
                authService.registerWorker(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(Map.of(
                        "message",
                        "Worker registered successfully. Please login to continue!",

                        "userId",
                        user.getId(),

                        "role",
                        user.getRole()
                ));
    }
}