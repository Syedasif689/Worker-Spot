package com.workerspot.dto;

import java.time.LocalDateTime;

public class CustomerProfileResponse {

    private Long userId;

    private Long profileId;

    private String fullName;

    private String email;

    private String mobile;

    private String role;

    private boolean active;

    private int freeBookingsUsed;

    private int freeBookingsRemaining;

    private int bookingCredits;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;


    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    public CustomerProfileResponse(
            Long userId,
            Long profileId,
            String fullName,
            String email,
            String mobile,
            String role,
            boolean active,
            int freeBookingsUsed,
            int freeBookingsRemaining,
            int bookingCredits,
            LocalDateTime createdAt,
            LocalDateTime updatedAt
    ) {

        this.userId = userId;
        this.profileId = profileId;
        this.fullName = fullName;
        this.email = email;
        this.mobile = mobile;
        this.role = role;
        this.active = active;
        this.freeBookingsUsed = freeBookingsUsed;
        this.freeBookingsRemaining = freeBookingsRemaining;
        this.bookingCredits = bookingCredits;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }


    // =====================================================
    // GETTERS
    // =====================================================

    public Long getUserId() {
        return userId;
    }

    public Long getProfileId() {
        return profileId;
    }

    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }

    public String getMobile() {
        return mobile;
    }

    public String getRole() {
        return role;
    }

    public boolean isActive() {
        return active;
    }

    public int getFreeBookingsUsed() {
        return freeBookingsUsed;
    }

    public int getFreeBookingsRemaining() {
        return freeBookingsRemaining;
    }

    public int getBookingCredits() {
        return bookingCredits;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}