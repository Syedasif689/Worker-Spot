package com.workerspot.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class RegisterRequest {

    @NotBlank(message = "Full name is required")
    @Size(
        min = 2,
        max = 100,
        message = "Full name must be between 2 and 100 characters"
    )
    private String fullName;


    @NotBlank(message = "Email is required")
    @Email(message = "Please provide a valid email address")
    @Size(
        max = 150,
        message = "Email must not exceed 150 characters"
    )
    private String email;


    @NotBlank(message = "Mobile number is required")
    @Pattern(
        regexp = "^[6-9][0-9]{9}$",
        message = "Please provide a valid 10-digit Indian mobile number"
    )
    private String mobile;


    @NotBlank(message = "Password is required")
    @Size(
        min = 8,
        max = 100,
        message = "Password must be between 8 and 100 characters"
    )
    private String password;


    // =====================================================
    // MSG91 MOBILE VERIFICATION
    // =====================================================

    @NotBlank(
        message = "Mobile number verification is required"
    )
    private String mobileVerificationId;


    // =====================================================
    // GETTERS / SETTERS
    // =====================================================

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public String getMobileVerificationId() {
        return mobileVerificationId;
    }

    public void setMobileVerificationId(
            String mobileVerificationId
    ) {
        this.mobileVerificationId =
                mobileVerificationId;
    }
}