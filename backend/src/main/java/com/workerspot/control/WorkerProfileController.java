package com.workerspot.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.workerspot.dto.NearbyWorkerResponse;
import com.workerspot.dto.WorkerProfileUpdateRequest;
import com.workerspot.entity.Availability;
import com.workerspot.entity.User;
import com.workerspot.entity.WorkerProfile;
import com.workerspot.repository.UserRepository;
import com.workerspot.repository.WorkerProfileRepository;
import com.workerspot.service.WorkerProfileService;

@RestController
@RequestMapping("/api/workers")
public class WorkerProfileController {

    private final UserRepository userRepository;
    private final WorkerProfileRepository workerProfileRepository;
    private final WorkerProfileService workerProfileService;

    public WorkerProfileController(
            UserRepository userRepository,
            WorkerProfileRepository workerProfileRepository,
            WorkerProfileService workerProfileService
    ) {
        this.userRepository = userRepository;
        this.workerProfileRepository = workerProfileRepository;
        this.workerProfileService = workerProfileService;
    }

    // =====================================================
    // GET MY PROFILE
    // =====================================================

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

                        Map.entry(
                                "userId",
                                user.getId()
                        ),

                        Map.entry(
                                "fullName",
                                user.getFullName() == null
                                        ? ""
                                        : user.getFullName()
                        ),

                        Map.entry(
                                "email",
                                user.getEmail() == null
                                        ? ""
                                        : user.getEmail()
                        ),

                        Map.entry(
                                "mobile",
                                user.getMobile() == null
                                        ? ""
                                        : user.getMobile()
                        ),

                        Map.entry(
                                "role",
                                user.getRole()
                        ),

                        Map.entry(
                                "workerProfileId",
                                workerProfile.getId()
                        ),

                        Map.entry(
                                "category",
                                workerProfile.getCategory() == null
                                        ? ""
                                        : workerProfile.getCategory()
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
                                workerProfile.getState() == null
                                        ? ""
                                        : workerProfile.getState()
                        ),

                        Map.entry(
                                "district",
                                workerProfile.getDistrict() == null
                                        ? ""
                                        : workerProfile.getDistrict()
                        ),

                        Map.entry(
                                "city",
                                workerProfile.getCity() == null
                                        ? ""
                                        : workerProfile.getCity()
                        ),

                        Map.entry(
                                "area",
                                workerProfile.getArea() == null
                                        ? ""
                                        : workerProfile.getArea()
                        ),

                        Map.entry(
                                "latitude",
                                workerProfile.getLatitude()
                        ),

                        Map.entry(
                                "longitude",
                                workerProfile.getLongitude()
                        ),

                        Map.entry(
                                "charges",
                                workerProfile.getCharges()
                        ),

                        Map.entry(
                                "availability",
                                workerProfile.getAvailability() == null
                                        ? "AVAILABLE"
                                        : workerProfile.getAvailability()
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


    // =====================================================
    // UPDATE MY PROFILE
    // =====================================================

    @PutMapping("/me")
    public ResponseEntity<?> updateMyProfile(
            Authentication authentication,
            @RequestBody WorkerProfileUpdateRequest request
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

        // =================================
        // USER INFORMATION
        // =================================

        user.setFullName(
                request.getFullName()
        );


        // =================================
        // WORKER INFORMATION
        // =================================

        workerProfile.setAge(
                request.getAge()
        );

        workerProfile.setCategory(
                request.getCategory()
        );

        workerProfile.setExperienceYears(
                request.getExperienceYears()
        );


        // =================================
        // ADDRESS
        // =================================

        workerProfile.setState(
                request.getState()
        );

        workerProfile.setDistrict(
                request.getDistrict()
        );

        workerProfile.setCity(
                request.getCity()
        );

        workerProfile.setArea(
                request.getArea()
        );


        // =================================
        // GPS LOCATION
        // =================================

        workerProfile.setLatitude(
                request.getLatitude()
        );

        workerProfile.setLongitude(
                request.getLongitude()
        );


        // =================================
        // SERVICE INFORMATION
        // =================================

        workerProfile.setCharges(
                request.getCharges()
        );

        workerProfile.setAvailability(
                Availability.valueOf(
                        request.getAvailability()
                                .toUpperCase()
                )
        );

        workerProfile.setAbout(
                request.getAbout()
        );


        // =================================
        // SAVE
        // =================================

        userRepository.save(user);

        workerProfileRepository.save(
                workerProfile
        );


        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Worker profile updated successfully"
                )
        );
    }


    // =====================================================
    // FIND NEARBY WORKERS
    // =====================================================

    @GetMapping("/nearby")
    public ResponseEntity<?> findNearbyWorkers(
            @RequestParam double latitude,
            @RequestParam double longitude,
            @RequestParam String category
    ) {

        List<NearbyWorkerResponse> workers =
                workerProfileService.findNearbyWorkers(
                        latitude,
                        longitude,
                        category
                );

        return ResponseEntity.ok(workers);
    }
}