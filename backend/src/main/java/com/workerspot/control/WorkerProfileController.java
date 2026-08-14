package com.workerspot.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.workerspot.entity.User;
import com.workerspot.entity.WorkerProfile;
import com.workerspot.repository.UserRepository;
import com.workerspot.repository.WorkerProfileRepository;

@RestController
@RequestMapping("/api/workers")
public class WorkerProfileController {

    private final UserRepository userRepository;
    private final WorkerProfileRepository workerProfileRepository;

    public WorkerProfileController(
            UserRepository userRepository,
            WorkerProfileRepository workerProfileRepository
    ) {
        this.userRepository = userRepository;
        this.workerProfileRepository = workerProfileRepository;
    }

    @GetMapping("/me")
    public ResponseEntity<?> getMyProfile(
            Authentication authentication
    ) {

        String email = authentication.getName();

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );

        WorkerProfile workerProfile =
                workerProfileRepository
                        .findByUser(user)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Worker profile not found"
                                )
                        );

        return ResponseEntity.ok(
        Map.ofEntries(
                Map.entry("userId", user.getId()),
                Map.entry("fullName", user.getFullName()),
                Map.entry("email", user.getEmail()),
                Map.entry("mobile", user.getMobile()),
                Map.entry("role", user.getRole()),

                Map.entry(
                        "workerProfileId",
                        workerProfile.getId()
                ),

                Map.entry(
                        "category",
                        workerProfile.getCategory()
                ),

                Map.entry(
                        "age",
                        workerProfile.getAge()
                ),

                Map.entry(
                        "experienceYears",
                        workerProfile.getExperienceYears()
                ),

                Map.entry(
                        "state",
                        workerProfile.getState()
                ),

                Map.entry(
                        "district",
                        workerProfile.getDistrict()
                ),

                Map.entry(
                        "city",
                        workerProfile.getCity()
                ),

                Map.entry(
                        "area",
                        workerProfile.getArea() == null
                                ? ""
                                : workerProfile.getArea()
                ),

                Map.entry(
                        "charges",
                        workerProfile.getCharges()
                ),

                Map.entry(
                        "availability",
                        workerProfile.getAvailability()
                ),

                Map.entry(
                        "about",
                        workerProfile.getAbout() == null
                                ? ""
                                : workerProfile.getAbout()
                )
        )
);
    }
}