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
    public AuthService(
        UserRepository userRepository,
        CustomerProfileRepository customerProfileRepository,
        WorkerProfileRepository workerProfileRepository,
        PasswordEncoder passwordEncoder,
        JwtService jwtService
) {
    this.userRepository = userRepository;
    this.customerProfileRepository = customerProfileRepository;
    this.workerProfileRepository = workerProfileRepository;
    this.passwordEncoder = passwordEncoder;
    this.jwtService = jwtService;
}

    // =========================
    // CUSTOMER REGISTRATION
    // =========================

    @Transactional
    public User registerCustomer(RegisterRequest request) {

        validateDuplicateUser(request.getEmail(), request.getMobile());

        User user = createUser(
                request.getFullName(),
                request.getEmail(),
                request.getMobile(),
                request.getPassword(),
                Role.CUSTOMER
        );

        User savedUser = userRepository.save(user);

        CustomerProfile customerProfile = new CustomerProfile();
        customerProfile.setUser(savedUser);
        customerProfile.setFreeBookingsUsed(0);

        customerProfileRepository.save(customerProfile);

        return savedUser;
    }
    

    // =========================
    // WORKER REGISTRATION
    // =========================

@Transactional
public User registerWorker(WorkerRegisterRequest request) {

    validateDuplicateUser(request.getEmail(), request.getMobile());

    if (request.getAge() < 19) {
        throw new IllegalArgumentException(
                "Worker must be at least 19 years old"
        );
    }

    if (request.getLatitude() == null || request.getLongitude() == null) {
        throw new IllegalArgumentException(
                "Current location is required for worker registration"
        );
    }

    User user = createUser(
            request.getFullName(),
            request.getEmail(),
            request.getMobile(),
            request.getPassword(),
            Role.WORKER
    );

    User savedUser = userRepository.save(user);

    WorkerProfile workerProfile = new WorkerProfile();

    workerProfile.setUser(savedUser);

    workerProfile.setAge(request.getAge());
    workerProfile.setCategory(request.getCategory());
    workerProfile.setExperienceYears(request.getExperienceYears());

    workerProfile.setState(request.getState());
    workerProfile.setDistrict(request.getDistrict());
    workerProfile.setCity(request.getCity());
    workerProfile.setArea(request.getArea());

    workerProfile.setLatitude(request.getLatitude());
    workerProfile.setLongitude(request.getLongitude());

    workerProfile.setCharges(request.getCharges());
    workerProfile.setAbout(request.getAbout());

    workerProfileRepository.save(workerProfile);

    return savedUser;
}
    // =========================
    // COMMON USER CREATION
    // =========================

    private User createUser(
            String fullName,
            String email,
            String mobile,
            String password,
            Role role
    ) {

        User user = new User();

        user.setFullName(fullName);
        user.setEmail(email);
        user.setMobile(mobile);

        // NEVER store plain-text passwords
        user.setPassword(passwordEncoder.encode(password));

        user.setRole(role);
        user.setActive(true);

        return user;
    }
       public LoginResponse login(LoginRequest request) {

    User user = userRepository
            .findByEmail(request.getEmail())
            .orElseThrow(() ->
                    new BadCredentialsException(
                            "Invalid email or password"
                    )
            );

    if (!user.isActive()) {
        throw new IllegalArgumentException(
                "Your account is inactive"
        );
    }

    if (!passwordEncoder.matches(
            request.getPassword(),
            user.getPassword()
    )) {
        throw new BadCredentialsException(
                "Invalid email or password"
        );
    }

    Role requestedRole;

    try {
        requestedRole = Role.valueOf(
                request.getRole().toUpperCase()
        );
    } catch (IllegalArgumentException e) {
        throw new IllegalArgumentException(
                "Invalid account type"
        );
    }

    if (user.getRole() != requestedRole) {
        throw new BadCredentialsException(
                "This account is not registered as a "
                + requestedRole.name().toLowerCase()
        );
    }

    String token = jwtService.generateToken(user);

    return new LoginResponse(
            "Login successful",
            token,
            user.getId(),
            user.getFullName(),
            user.getEmail(),
            user.getRole().name()
    );
}
    // =========================
    // DUPLICATE VALIDATION
    // =========================

    private void validateDuplicateUser(
            String email,
            String mobile
    ) {

        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException(
                    "Email is already registered"
            );
        }

        if (userRepository.existsByMobile(mobile)) {
            throw new IllegalArgumentException(
                    "Mobile number is already registered"
            );
        }
    }
}