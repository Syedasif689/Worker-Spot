package com.workerspot.service;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.workerspot.dto.LoginRequest;
import com.workerspot.dto.LoginResponse;
import com.workerspot.dto.RegisterRequest;
import com.workerspot.dto.WorkerRegisterRequest;
import com.workerspot.entity.CustomerProfile;
import com.workerspot.entity.Role;
import com.workerspot.entity.User;
import com.workerspot.entity.WorkerProfile;
import com.workerspot.repository.CustomerProfileRepository;
import com.workerspot.repository.UserRepository;
import com.workerspot.repository.WorkerProfileRepository;
import com.workerspot.security.JwtService;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final CustomerProfileRepository customerProfileRepository;
    private final WorkerProfileRepository workerProfileRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final MSG91VerificationService msg91VerificationService;


    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    public AuthService(
            UserRepository userRepository,
            CustomerProfileRepository customerProfileRepository,
            WorkerProfileRepository workerProfileRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            MSG91VerificationService msg91VerificationService
    ) {

        this.userRepository = userRepository;
        this.customerProfileRepository = customerProfileRepository;
        this.workerProfileRepository = workerProfileRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.msg91VerificationService = msg91VerificationService;
    }


    // =====================================================
    // CUSTOMER REGISTRATION
    // =====================================================

    @Transactional
    public User registerCustomer(
            RegisterRequest request
    ) {

        // -------------------------------------------------
        // CLEAN INPUT
        // -------------------------------------------------

        String fullName =
                request.getFullName().trim();

        String email =
                request.getEmail().trim().toLowerCase();

        String mobile =
                request.getMobile().trim();

        String password =
                request.getPassword();

        String mobileVerificationId =
                request.getMobileVerificationId();


        // -------------------------------------------------
        // MSG91 MOBILE VERIFICATION
        // -------------------------------------------------

        /*
         * IMPORTANT:
         *
         * Never trust mobileVerificationId merely because
         * it is present.
         *
         * The backend asks MSG91 whether the access token
         * is actually valid.
         */

        boolean mobileVerified =
                msg91VerificationService.verifyAccessToken(
                        mobileVerificationId
                );


        if (!mobileVerified) {

            throw new IllegalArgumentException(
                    "Mobile number verification failed. "
                    + "Please verify your mobile number using OTP."
            );
        }


        // -------------------------------------------------
        // VALIDATE DUPLICATES
        // -------------------------------------------------

        validateDuplicateUser(
                email,
                mobile
        );


        // -------------------------------------------------
        // CREATE CUSTOMER USER
        // -------------------------------------------------

        User user = createUser(
                fullName,
                email,
                mobile,
                password,
                Role.CUSTOMER
        );


        // -------------------------------------------------
        // MARK MOBILE AS VERIFIED
        // -------------------------------------------------

        user.setMobileVerified(true);


        // -------------------------------------------------
        // SAVE USER
        // -------------------------------------------------

        User savedUser =
                userRepository.save(user);


        // -------------------------------------------------
        // CREATE CUSTOMER PROFILE
        // -------------------------------------------------

        CustomerProfile customerProfile =
                new CustomerProfile();

        customerProfile.setUser(
                savedUser
        );


        // -------------------------------------------------
        // FREE BOOKINGS
        // -------------------------------------------------

        /*
         * Every new customer starts with
         * 3 free bookings.
         *
         * This means:
         *
         * FREE_BOOKING_LIMIT = 3
         * freeBookingsUsed = 0
         */

        customerProfile.setFreeBookingsUsed(0);


        // -------------------------------------------------
        // PAID BOOKING CREDITS
        // -------------------------------------------------

        /*
         * New customers have no paid credits initially.
         */

        customerProfile.setBookingCredits(0);


        // -------------------------------------------------
        // SAVE CUSTOMER PROFILE
        // -------------------------------------------------

        customerProfileRepository.save(
                customerProfile
        );


        return savedUser;
    }


    // =====================================================
    // WORKER REGISTRATION
    // =====================================================

    @Transactional
    public User registerWorker(
            WorkerRegisterRequest request
    ) {

        // -------------------------------------------------
        // CLEAN INPUT
        // -------------------------------------------------

        String fullName =
                request.getFullName().trim();

        String email =
                request.getEmail().trim().toLowerCase();

        String mobile =
                request.getMobile().trim();


        // -------------------------------------------------
        // DUPLICATE VALIDATION
        // -------------------------------------------------

        validateDuplicateUser(
                email,
                mobile
        );


        // -------------------------------------------------
        // AGE VALIDATION
        // -------------------------------------------------

        if (request.getAge() < 19) {

            throw new IllegalArgumentException(
                    "Worker must be at least 19 years old"
            );
        }


        // -------------------------------------------------
        // LOCATION VALIDATION
        // -------------------------------------------------

        if (
                request.getLatitude() == null ||
                request.getLongitude() == null
        ) {

            throw new IllegalArgumentException(
                    "Current location is required for worker registration"
            );
        }


        // -------------------------------------------------
        // CREATE USER
        // -------------------------------------------------

        User user = createUser(
                fullName,
                email,
                mobile,
                request.getPassword(),
                Role.WORKER
        );


        // -------------------------------------------------
        // SAVE USER
        // -------------------------------------------------

        User savedUser =
                userRepository.save(user);


        // -------------------------------------------------
        // CREATE WORKER PROFILE
        // -------------------------------------------------

        WorkerProfile workerProfile =
                new WorkerProfile();

        workerProfile.setUser(
                savedUser
        );

        workerProfile.setAge(
                request.getAge()
        );

        workerProfile.setCategory(
                request.getCategory()
        );

        workerProfile.setExperienceYears(
                request.getExperienceYears()
        );

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

        workerProfile.setLatitude(
                request.getLatitude()
        );

        workerProfile.setLongitude(
                request.getLongitude()
        );

        workerProfile.setCharges(
                request.getCharges()
        );

        workerProfile.setAbout(
                request.getAbout()
        );


        // -------------------------------------------------
        // SAVE WORKER PROFILE
        // -------------------------------------------------

        workerProfileRepository.save(
                workerProfile
        );


        return savedUser;
    }


    // =====================================================
    // COMMON USER CREATION
    // =====================================================

    private User createUser(
            String fullName,
            String email,
            String mobile,
            String password,
            Role role
    ) {

        User user =
                new User();


        user.setFullName(
                fullName
        );

        user.setEmail(
                email
        );

        user.setMobile(
                mobile
        );


        // -------------------------------------------------
        // NEVER STORE PLAIN TEXT PASSWORD
        // -------------------------------------------------

        user.setPassword(
                passwordEncoder.encode(password)
        );


        // -------------------------------------------------
        // ROLE
        // -------------------------------------------------

        user.setRole(
                role
        );


        // -------------------------------------------------
        // ACCOUNT STATUS
        // -------------------------------------------------

        user.setActive(
                true
        );


        /*
         * mobileVerified remains false by default.
         *
         * Customer registration changes it to true only
         * after successful MSG91 verification.
         */

        return user;
    }


    // =====================================================
    // LOGIN
    // =====================================================

    public LoginResponse login(
            LoginRequest request
    ) {

        String email =
                request.getEmail()
                        .trim()
                        .toLowerCase();


        // -------------------------------------------------
        // FIND USER
        // -------------------------------------------------

        User user =
                userRepository
                        .findByEmail(email)
                        .orElseThrow(() ->
                                new BadCredentialsException(
                                        "Invalid email or password"
                                )
                        );


        // -------------------------------------------------
        // ACTIVE ACCOUNT CHECK
        // -------------------------------------------------

        if (!user.isActive()) {

            throw new IllegalArgumentException(
                    "Your account is inactive"
            );
        }


        // -------------------------------------------------
        // PASSWORD CHECK
        // -------------------------------------------------

        if (
                !passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword()
                )
        ) {

            throw new BadCredentialsException(
                    "Invalid email or password"
            );
        }


        // -------------------------------------------------
        // ROLE VALIDATION
        // -------------------------------------------------

        Role requestedRole;

        try {

            requestedRole =
                    Role.valueOf(
                            request.getRole()
                                    .trim()
                                    .toUpperCase()
                    );

        } catch (IllegalArgumentException e) {

            throw new IllegalArgumentException(
                    "Invalid account type"
            );
        }


        // -------------------------------------------------
        // USER ROLE MUST MATCH LOGIN ROLE
        // -------------------------------------------------

        if (
                user.getRole() != requestedRole
        ) {

            throw new BadCredentialsException(
                    "This account is not registered as a "
                    + requestedRole
                            .name()
                            .toLowerCase()
            );
        }


        // -------------------------------------------------
        // GENERATE JWT
        // -------------------------------------------------

        String token =
                jwtService.generateToken(user);


        // -------------------------------------------------
        // RETURN LOGIN RESPONSE
        // -------------------------------------------------

        return new LoginResponse(
                "Login successful",
                token,
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getRole().name()
        );
    }


    // =====================================================
    // DUPLICATE USER VALIDATION
    // =====================================================

    private void validateDuplicateUser(
            String email,
            String mobile
    ) {

        // -------------------------------------------------
        // EMAIL
        // -------------------------------------------------

        if (
                userRepository.existsByEmail(email)
        ) {

            throw new IllegalArgumentException(
                    "Email is already registered"
            );
        }


        // -------------------------------------------------
        // MOBILE
        // -------------------------------------------------

        if (
                userRepository.existsByMobile(mobile)
        ) {

            throw new IllegalArgumentException(
                    "Mobile number is already registered"
            );
        }
    }
}