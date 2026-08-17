package com.workerspot.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.workerspot.dto.CustomerProfileResponse;
import com.workerspot.dto.CustomerProfileUpdateRequest;
import com.workerspot.entity.CustomerProfile;
import com.workerspot.entity.User;
import com.workerspot.repository.CustomerProfileRepository;
import com.workerspot.repository.UserRepository;

@Service
public class CustomerProfileService {

    private final UserRepository userRepository;
    private final CustomerProfileRepository customerProfileRepository;


    public CustomerProfileService(
            UserRepository userRepository,
            CustomerProfileRepository customerProfileRepository
    ) {
        this.userRepository = userRepository;
        this.customerProfileRepository = customerProfileRepository;
    }


    // =====================================================
    // GET CUSTOMER PROFILE
    // =====================================================

    @Transactional(readOnly = true)
    public CustomerProfileResponse getCustomerProfile(
            String email
    ) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Customer account not found."
                        )
                );


        CustomerProfile profile =
                customerProfileRepository
                        .findByUserId(user.getId())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Customer profile not found."
                                )
                        );


        return mapToResponse(user, profile);
    }


    // =====================================================
    // UPDATE CUSTOMER PROFILE
    // =====================================================

    @Transactional
    public CustomerProfileResponse updateCustomerProfile(
            String email,
            CustomerProfileUpdateRequest request
    ) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Customer account not found."
                        )
                );


        user.setFullName(
                request.getFullName().trim()
        );


        userRepository.save(user);


        CustomerProfile profile =
                customerProfileRepository
                        .findByUserId(user.getId())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Customer profile not found."
                                )
                        );


        return mapToResponse(user, profile);
    }


    // =====================================================
    // MAP RESPONSE
    // =====================================================

    private CustomerProfileResponse mapToResponse(
            User user,
            CustomerProfile profile
    ) {

        return new CustomerProfileResponse(

                user.getId(),

                profile.getId(),

                user.getFullName(),

                user.getEmail(),

                user.getMobile(),

                user.getRole().name(),

                user.isActive(),

                profile.getFreeBookingsUsed(),
                 
                user.getRemainingFreeBookings(),

                profile.getBookingCredits(),

                user.getCreatedAt(),

                profile.getUpdatedAt()
        );
    }
}