package com.workerspot.control;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.workerspot.dto.BookingRequest;
import com.workerspot.dto.BookingResponse;
import com.workerspot.entity.User;
import com.workerspot.entity.WorkerProfile;
import com.workerspot.repository.UserRepository;
import com.workerspot.repository.WorkerProfileRepository;
import com.workerspot.service.BookingService;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;
    private final UserRepository userRepository;
    private final WorkerProfileRepository workerProfileRepository;

    public BookingController(
            BookingService bookingService,
            UserRepository userRepository,
            WorkerProfileRepository workerProfileRepository
    ) {
        this.bookingService = bookingService;
        this.userRepository = userRepository;
        this.workerProfileRepository = workerProfileRepository;
    }

    // =====================================================
    // CREATE BOOKING
    // =====================================================

    @PostMapping
    public ResponseEntity<?> createBooking(
            @RequestBody BookingRequest request,
            Authentication authentication
    ) {

        try {

            String email = authentication.getName();

            User customer =
                    userRepository
                            .findByEmail(email)
                            .orElseThrow(() ->
                                    new RuntimeException(
                                            "Authenticated customer not found."
                                    )
                            );

            BookingResponse booking =
                    bookingService.createBooking(
                            customer.getId(),
                            request
                    );

            return ResponseEntity.ok(booking);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            Map.of(
                                    "message",
                                    e.getMessage()
                            )
                    );
        }
    }


    // =====================================================
    // CUSTOMER BOOKING ACCESS
    // =====================================================
    //
    // Frontend uses this endpoint to determine:
    //
    // freeBookingsUsed
    // freeBookingsRemaining
    // freeBookingsCompleted
    // bookingCredits
    //
    // IMPORTANT:
    // When freeBookingsCompleted = true AND
    // bookingCredits = 0,
    // frontend should lock/blur worker cards.
    //
    // Example response:
    //
    // {
    //   "freeBookingsUsed": 3,
    //   "freeBookingsRemaining": 0,
    //   "freeBookingsCompleted": true,
    //   "bookingCredits": 0
    // }
    //
    // =====================================================

    @GetMapping("/access")
    public ResponseEntity<?> getCustomerBookingAccess(
            Authentication authentication
    ) {

        try {

            String email = authentication.getName();

            User customer =
                    userRepository
                            .findByEmail(email)
                            .orElseThrow(() ->
                                    new RuntimeException(
                                            "Customer not found."
                                    )
                            );

            Map<String, Object> access =
                    bookingService.getCustomerBookingAccess(
                            customer.getId()
                    );

            return ResponseEntity.ok(access);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            Map.of(
                                    "message",
                                    e.getMessage()
                            )
                    );
        }
    }


    // =====================================================
    // CUSTOMER BOOKINGS
    // =====================================================

    @GetMapping("/customer")
    public ResponseEntity<?> getCustomerBookings(
            Authentication authentication
    ) {

        try {

            String email = authentication.getName();

            User customer =
                    userRepository
                            .findByEmail(email)
                            .orElseThrow(() ->
                                    new RuntimeException(
                                            "Customer not found."
                                    )
                            );

            List<BookingResponse> bookings =
                    bookingService.getCustomerBookings(
                            customer.getId()
                    );

            return ResponseEntity.ok(bookings);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            Map.of(
                                    "message",
                                    e.getMessage()
                            )
                    );
        }
    }


    // =====================================================
    // WORKER BOOKINGS
    // =====================================================

    @GetMapping("/worker")
    public ResponseEntity<?> getWorkerBookings(
            Authentication authentication
    ) {

        try {

            String email = authentication.getName();

            User workerUser =
                    userRepository
                            .findByEmail(email)
                            .orElseThrow(() ->
                                    new RuntimeException(
                                            "Worker not found."
                                    )
                            );

            // =================================================
            // USER ID != WORKER PROFILE ID
            // =================================================

            WorkerProfile worker =
                    workerProfileRepository
                            .findByUserId(workerUser.getId())
                            .orElseThrow(() ->
                                    new RuntimeException(
                                            "Worker profile not found."
                                    )
                            );

            List<BookingResponse> bookings =
                    bookingService.getWorkerBookings(
                            worker.getId()
                    );

            return ResponseEntity.ok(bookings);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            Map.of(
                                    "message",
                                    e.getMessage()
                            )
                    );
        }
    }


    // =====================================================
    // ACCEPT BOOKING
    // =====================================================

    @PutMapping("/{bookingId}/accept")
    public ResponseEntity<?> acceptBooking(
            @PathVariable Long bookingId,
            Authentication authentication
    ) {

        try {

            String email = authentication.getName();

            User workerUser =
                    userRepository
                            .findByEmail(email)
                            .orElseThrow(() ->
                                    new RuntimeException(
                                            "Worker not found."
                                    )
                            );

            // =================================================
            // USER ID -> WORKER PROFILE ID
            // =================================================

            WorkerProfile worker =
                    workerProfileRepository
                            .findByUserId(workerUser.getId())
                            .orElseThrow(() ->
                                    new RuntimeException(
                                            "Worker profile not found."
                                    )
                            );

            BookingResponse booking =
                    bookingService.acceptBooking(
                            bookingId,
                            worker.getId()
                    );

            return ResponseEntity.ok(booking);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            Map.of(
                                    "message",
                                    e.getMessage()
                            )
                    );
        }
    }


    // =====================================================
    // REJECT BOOKING
    // =====================================================

    @PutMapping("/{bookingId}/reject")
    public ResponseEntity<?> rejectBooking(
            @PathVariable Long bookingId,
            Authentication authentication
    ) {

        try {

            String email = authentication.getName();

            User workerUser =
                    userRepository
                            .findByEmail(email)
                            .orElseThrow(() ->
                                    new RuntimeException(
                                            "Worker not found."
                                    )
                            );

            // =================================================
            // USER ID -> WORKER PROFILE ID
            // =================================================

            WorkerProfile worker =
                    workerProfileRepository
                            .findByUserId(workerUser.getId())
                            .orElseThrow(() ->
                                    new RuntimeException(
                                            "Worker profile not found."
                                    )
                            );

            BookingResponse booking =
                    bookingService.rejectBooking(
                            bookingId,
                            worker.getId()
                    );

            return ResponseEntity.ok(booking);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            Map.of(
                                    "message",
                                    e.getMessage()
                            )
                    );
        }
    }


    // =====================================================
    // COMPLETE BOOKING
    // =====================================================
    //
    // Worker marks an ACCEPTED booking as COMPLETED.
    //
    // This:
    //
    // ACCEPTED
    //     ↓
    // COMPLETED
    //
    // BUSY
    //     ↓
    // AVAILABLE
    //
    // And starts the 24-hour connection window.
    //
    // =====================================================

    @PutMapping("/{bookingId}/complete")
    public ResponseEntity<?> completeBooking(
            @PathVariable Long bookingId,
            Authentication authentication
    ) {

        try {

            String email = authentication.getName();

            User workerUser =
                    userRepository
                            .findByEmail(email)
                            .orElseThrow(() ->
                                    new RuntimeException(
                                            "Worker not found."
                                    )
                            );

            // =================================================
            // USER ID -> WORKER PROFILE ID
            // =================================================

            WorkerProfile worker =
                    workerProfileRepository
                            .findByUserId(workerUser.getId())
                            .orElseThrow(() ->
                                    new RuntimeException(
                                            "Worker profile not found."
                                    )
                            );

            BookingResponse booking =
                    bookingService.completeBooking(
                            bookingId,
                            worker.getId()
                    );

            return ResponseEntity.ok(booking);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            Map.of(
                                    "message",
                                    e.getMessage()
                            )
                    );
        }
    }
}