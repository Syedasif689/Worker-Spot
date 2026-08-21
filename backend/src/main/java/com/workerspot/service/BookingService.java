package com.workerspot.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.workerspot.dto.BookingRequest;
import com.workerspot.dto.BookingResponse;
import com.workerspot.entity.Availability;
import com.workerspot.entity.Booking;
import com.workerspot.entity.BookingStatus;
import com.workerspot.entity.CustomerProfile;
import com.workerspot.entity.User;
import com.workerspot.entity.WorkerProfile;
import com.workerspot.repository.BookingRepository;
import com.workerspot.repository.CustomerProfileRepository;
import com.workerspot.repository.UserRepository;
import com.workerspot.repository.WorkerProfileRepository;

@Service
public class BookingService {

    // =====================================================
    // BUSINESS RULES
    // =====================================================

    private static final int FREE_BOOKING_LIMIT = 3;

    private static final int CONNECTION_WINDOW_HOURS = 24;


    // =====================================================
    // REPOSITORIES
    // =====================================================

    private final BookingRepository bookingRepository;

    private final UserRepository userRepository;

    private final WorkerProfileRepository workerProfileRepository;

    private final CustomerProfileRepository customerProfileRepository;


    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    public BookingService(
            BookingRepository bookingRepository,
            UserRepository userRepository,
            WorkerProfileRepository workerProfileRepository,
            CustomerProfileRepository customerProfileRepository
    ) {

        this.bookingRepository =
                bookingRepository;

        this.userRepository =
                userRepository;

        this.workerProfileRepository =
                workerProfileRepository;

        this.customerProfileRepository =
                customerProfileRepository;
    }


    // =====================================================
    // CREATE BOOKING
    // =====================================================

    @Transactional
    public BookingResponse createBooking(
            Long customerId,
            BookingRequest request
    ) {

        // =================================================
        // CUSTOMER
        // =================================================

        User customer =
                userRepository
                        .findById(customerId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Customer not found."
                                )
                        );


        // =================================================
        // CUSTOMER ROLE
        // =================================================

        if (customer.getRole() == null ||
                !customer.getRole()
                        .name()
                        .equals("CUSTOMER")) {

            throw new RuntimeException(
                    "Only customers can create bookings."
            );
        }


        // =================================================
        // WORKER ID
        // =================================================

        if (request.getWorkerId() == null) {

            throw new RuntimeException(
                    "Worker ID is required."
            );
        }


        // =================================================
        // FIND WORKER
        // =================================================

        WorkerProfile worker =
                workerProfileRepository
                        .findById(request.getWorkerId())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Worker not found."
                                )
                        );


        // =================================================
        // PREVENT DUPLICATE REQUESTS
        // =================================================
        //
        // IMPORTANT:
        //
        // A customer can have only ONE active booking
        // request with the same worker.
        //
        // PENDING    -> BLOCK
        // ACCEPTED   -> BLOCK
        // COMPLETED  -> BLOCK
        // REJECTED   -> ALLOW
        //
        // This prevents customers from accidentally
        // clicking Book multiple times and creating
        // multiple requests for the same worker.
        //
        // =================================================

        boolean existingBooking =
                bookingRepository
                        .findByCustomerIdOrderByCreatedAtDesc(
                                customerId
                        )
                        .stream()
                        .anyMatch(booking ->
                                booking.getWorker() != null
                                        && booking.getWorker().getId().equals(worker.getId())
                                        && booking.getStatus() != BookingStatus.REJECTED
                        );


        if (existingBooking) {

            throw new RuntimeException(
                    "You already have an active booking request "
                    + "with this worker."
            );
        }


        // =================================================
        // WORKER MUST BE AVAILABLE
        // =================================================

        if (worker.getAvailability() !=
                Availability.AVAILABLE) {

            throw new RuntimeException(
                    "This worker is currently busy."
            );
        }


        // =================================================
        // CUSTOMER PROFILE
        // =================================================

        CustomerProfile customerProfile =
                customerProfileRepository
                        .findByUser(customer)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Customer profile not found."
                                )
                        );


        // =================================================
        // BOOKING ACCESS
        // =================================================

        int freeBookingsUsed =
                customerProfile.getFreeBookingsUsed();

        int bookingCredits =
                customerProfile.getBookingCredits();


        boolean freeBooking =
                freeBookingsUsed < FREE_BOOKING_LIMIT;


        // =================================================
        // AFTER 3 FREE BOOKINGS
        // =================================================

        if (!freeBooking && bookingCredits <= 0) {

            throw new RuntimeException(
                    "Your 3 free bookings are completed. "
                    + "Please purchase a Worker Spot booking plan "
                    + "to book another worker."
            );
        }


        // =================================================
        // WORKER CHARGE
        // =================================================

        double workerCharges =
                worker.getCharges();


        // =================================================
        // WORKER SPOT PLATFORM FEE
        // =================================================

        double platformFee = 0.0;


        // =================================================
        // TOTAL WORKER PAYMENT
        // =================================================

        double totalAmount =
                workerCharges;


        // =================================================
        // CREATE BOOKING
        // =================================================

        Booking booking =
                new Booking();


        booking.setCustomer(
                customer
        );

        booking.setWorker(
                worker
        );


        // =================================================
        // CATEGORY
        // =================================================

        booking.setCategory(
                request.getCategory()
        );


        // =================================================
        // SERVICE LOCATION
        // =================================================

        booking.setServiceLocation(
                request.getServiceLocation()
        );

        booking.setServiceState(
                request.getServiceState()
        );

        booking.setServiceDistrict(
                request.getServiceDistrict()
        );

        booking.setServiceCity(
                request.getServiceCity()
        );

        booking.setServiceArea(
                request.getServiceArea()
        );


        // =================================================
        // CUSTOMER GPS
        // =================================================

        booking.setCustomerLatitude(
                request.getCustomerLatitude()
        );

        booking.setCustomerLongitude(
                request.getCustomerLongitude()
        );


        // =================================================
        // PROBLEM DESCRIPTION
        // =================================================

        booking.setProblemDescription(
                request.getProblemDescription()
        );


        // =================================================
        // PAYMENT INFORMATION
        // =================================================

        booking.setWorkerCharges(
                workerCharges
        );

        booking.setPlatformFee(
                platformFee
        );

        booking.setTotalAmount(
                totalAmount
        );

        booking.setFreeBooking(
                freeBooking
        );


        // =================================================
        // CONNECTION WINDOW
        // =================================================

        booking.setConnectionExpiresAt(
                null
        );


        // =================================================
        // INITIAL STATUS
        // =================================================

        booking.setStatus(
                BookingStatus.PENDING
        );


        // =================================================
        // SAVE BOOKING
        // =================================================

        Booking savedBooking =
                bookingRepository.save(
                        booking
                );


        // =================================================
        // CONSUME BOOKING ACCESS
        // =================================================

        if (freeBooking) {

            customerProfile.setFreeBookingsUsed(
                    freeBookingsUsed + 1
            );

        } else {

            customerProfile.setBookingCredits(
                    bookingCredits - 1
            );
        }


        customerProfileRepository.save(
                customerProfile
        );


        // =================================================
        // RETURN
        // =================================================

        return toBookingResponse(
                savedBooking
        );
    }


    // =====================================================
    // CUSTOMER BOOKINGS
    // =====================================================

    public List<BookingResponse> getCustomerBookings(
            Long customerId
    ) {

        return bookingRepository
                .findByCustomerIdOrderByCreatedAtDesc(
                        customerId
                )
                .stream()
                .map(this::toBookingResponse)
                .toList();
    }


    // =====================================================
    // WORKER BOOKINGS
    // =====================================================

    public List<BookingResponse> getWorkerBookings(
            Long workerId
    ) {

        return bookingRepository
                .findByWorkerIdOrderByCreatedAtDesc(
                        workerId
                )
                .stream()
                .map(this::toBookingResponse)
                .toList();
    }


    // =====================================================
    // CUSTOMER BOOKING ACCESS
    // =====================================================

    public Map<String, Object> getCustomerBookingAccess(
            Long customerId
    ) {

        CustomerProfile customerProfile =
                customerProfileRepository
                        .findByUserId(customerId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Customer profile not found."
                                )
                        );


        int freeBookingsUsed =
                customerProfile.getFreeBookingsUsed();


        int freeBookingsRemaining =
                Math.max(
                        FREE_BOOKING_LIMIT -
                                freeBookingsUsed,
                        0
                );


        boolean freeBookingsCompleted =
                freeBookingsUsed >=
                        FREE_BOOKING_LIMIT;


        int bookingCredits =
                customerProfile.getBookingCredits();


        boolean canBook =
                !freeBookingsCompleted ||
                bookingCredits > 0;


        return Map.of(
                "freeBookingsUsed",
                freeBookingsUsed,

                "freeBookingsRemaining",
                freeBookingsRemaining,

                "freeBookingsCompleted",
                freeBookingsCompleted,

                "bookingCredits",
                bookingCredits,

                "canBook",
                canBook
        );
    }


    // =====================================================
    // ACCEPT BOOKING
    // =====================================================

    @Transactional
    public BookingResponse acceptBooking(
            Long bookingId,
            Long workerId
    ) {

        Booking booking =
                bookingRepository
                        .findById(bookingId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Booking not found."
                                )
                        );


        // =================================================
        // SECURITY CHECK
        // =================================================

        if (booking.getWorker() == null ||
                !booking.getWorker()
                        .getId()
                        .equals(workerId)) {

            throw new RuntimeException(
                    "You are not authorized to accept this booking."
            );
        }


        // =================================================
        // MUST BE PENDING
        // =================================================

        if (booking.getStatus() !=
                BookingStatus.PENDING) {

            throw new RuntimeException(
                    "This booking is no longer pending."
            );
        }


        // =================================================
        // WORKER MUST BE AVAILABLE
        // =================================================

        WorkerProfile worker =
                booking.getWorker();


        if (worker.getAvailability() !=
                Availability.AVAILABLE) {

            throw new RuntimeException(
                    "You cannot accept a booking while busy."
            );
        }


        // =================================================
        // ACCEPT
        // =================================================

        booking.setStatus(
                BookingStatus.ACCEPTED
        );


        // =================================================
        // WORKER BECOMES BUSY
        // =================================================

        worker.setAvailability(
                Availability.BUSY
        );

        workerProfileRepository.save(
                worker
        );


        // =================================================
        // CONNECTION EXPIRY
        // =================================================

        booking.setConnectionExpiresAt(
                null
        );


        Booking savedBooking =
                bookingRepository.save(
                        booking
                );


        return toBookingResponse(
                savedBooking
        );
    }


    // =====================================================
    // REJECT BOOKING
    // =====================================================

    @Transactional
    public BookingResponse rejectBooking(
            Long bookingId,
            Long workerId
    ) {

        Booking booking =
                bookingRepository
                        .findById(bookingId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Booking not found."
                                )
                        );


        // =================================================
        // SECURITY CHECK
        // =================================================

        if (booking.getWorker() == null ||
                !booking.getWorker()
                        .getId()
                        .equals(workerId)) {

            throw new RuntimeException(
                    "You are not authorized to reject this booking."
            );
        }


        // =================================================
        // MUST BE PENDING
        // =================================================

        if (booking.getStatus() !=
                BookingStatus.PENDING) {

            throw new RuntimeException(
                    "This booking is no longer pending."
            );
        }


        // =================================================
        // REJECT
        // =================================================

        booking.setStatus(
                BookingStatus.REJECTED
        );

        booking.setConnectionExpiresAt(
                null
        );


        Booking savedBooking =
                bookingRepository.save(
                        booking
                );


        // =================================================
        // IMPORTANT
        // =================================================
        //
        // We DO NOT restore the customer's free booking
        // or paid credit here.
        //
        // The booking request itself has already consumed
        // one booking access.
        //
        // The customer can now create a NEW request after
        // rejection, provided they still have booking access.
        //
        // =================================================

        return toBookingResponse(
                savedBooking
        );
    }


    // =====================================================
    // COMPLETE BOOKING
    // =====================================================

    @Transactional
    public BookingResponse completeBooking(
            Long bookingId,
            Long workerId
    ) {

        Booking booking =
                bookingRepository
                        .findById(bookingId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Booking not found."
                                )
                        );


        // =================================================
        // SECURITY CHECK
        // =================================================

        if (booking.getWorker() == null ||
                !booking.getWorker()
                        .getId()
                        .equals(workerId)) {

            throw new RuntimeException(
                    "You are not authorized to complete this booking."
            );
        }


        // =================================================
        // MUST BE ACCEPTED
        // =================================================

        if (booking.getStatus() !=
                BookingStatus.ACCEPTED) {

            throw new RuntimeException(
                    "Only accepted bookings can be completed."
            );
        }


        // =================================================
        // COMPLETION TIME
        // =================================================

        LocalDateTime completedAt =
                LocalDateTime.now();


        // =================================================
        // COMPLETE BOOKING
        // =================================================

        booking.setStatus(
                BookingStatus.COMPLETED
        );


        // =================================================
        // START 24-HOUR CONNECTION WINDOW
        // =================================================

        booking.setConnectionExpiresAt(
                completedAt.plusHours(
                        CONNECTION_WINDOW_HOURS
                )
        );


        // =================================================
        // WORKER BECOMES AVAILABLE
        // =================================================

        WorkerProfile worker =
                booking.getWorker();


        worker.setAvailability(
                Availability.AVAILABLE
        );

        workerProfileRepository.save(
                worker
        );


        // =================================================
        // SAVE BOOKING
        // =================================================

        Booking savedBooking =
                bookingRepository.save(
                        booking
                );


        return toBookingResponse(
                savedBooking
        );
    }


    // =====================================================
    // CHECK 24-HOUR CONNECTION
    // =====================================================

    public boolean isConnectionActive(
            Booking booking
    ) {

        if (booking == null) {
            return false;
        }


        if (booking.getStatus() !=
                BookingStatus.COMPLETED) {

            return false;
        }


        LocalDateTime expiresAt =
                booking.getConnectionExpiresAt();


        if (expiresAt == null) {
            return false;
        }


        return LocalDateTime.now()
                .isBefore(expiresAt);
    }


    // =====================================================
    // REQUIRE ACTIVE CONNECTION
    // =====================================================

    public void requireActiveConnection(
            Booking booking
    ) {

        if (!isConnectionActive(booking)) {

            throw new RuntimeException(
                    "The 24-hour Worker Spot connection "
                    + "window has expired."
            );
        }
    }


    // =====================================================
    // SAFE BOOKING RESPONSE
    // =====================================================

    private BookingResponse toBookingResponse(
            Booking booking
    ) {

        BookingResponse response =
                new BookingResponse();


        // =================================================
        // BOOKING
        // =================================================

        response.setBookingId(
                booking.getId()
        );

        response.setCategory(
                booking.getCategory()
        );

        response.setProblemDescription(
                booking.getProblemDescription()
        );


        // =================================================
        // SERVICE LOCATION
        // =================================================

        response.setServiceLocation(
                booking.getServiceLocation()
        );

        response.setServiceState(
                booking.getServiceState()
        );

        response.setServiceDistrict(
                booking.getServiceDistrict()
        );

        response.setServiceCity(
                booking.getServiceCity()
        );

        response.setServiceArea(
                booking.getServiceArea()
        );


        // =================================================
        // CUSTOMER GPS
        // =================================================

        response.setCustomerLatitude(
                booking.getCustomerLatitude()
        );

        response.setCustomerLongitude(
                booking.getCustomerLongitude()
        );


        // =================================================
        // WORKER PAYMENT
        // =================================================

        response.setWorkerCharges(
                booking.getWorkerCharges()
        );

        response.setPlatformFee(
                0.0
        );

        response.setTotalAmount(
                booking.getWorkerCharges()
        );

        response.setFreeBooking(
                booking.isFreeBooking()
        );


        // =================================================
        // STATUS
        // =================================================

        if (booking.getStatus() != null) {

            response.setStatus(
                    booking.getStatus().name()
            );
        }


        // =================================================
        // TIMESTAMPS
        // =================================================

        response.setCreatedAt(
                booking.getCreatedAt()
        );

        response.setUpdatedAt(
                booking.getUpdatedAt()
        );


        // =================================================
        // CUSTOMER
        // =================================================

        if (booking.getCustomer() != null) {

            response.setCustomerId(
                    booking.getCustomer().getId()
            );

            response.setCustomerName(
                    booking.getCustomer()
                            .getFullName()
            );
        }


        // =================================================
        // WORKER
        // =================================================

        if (booking.getWorker() != null) {

            response.setWorkerId(
                    booking.getWorker().getId()
            );


            if (booking.getWorker().getUser() != null) {

                response.setWorkerName(
                        booking.getWorker()
                                .getUser()
                                .getFullName()
                );
            }


            response.setWorkerCategory(
                    booking.getWorker()
                            .getCategory()
            );


            response.setWorkerExperienceYears(
                    booking.getWorker()
                            .getExperienceYears()
            );
        }


        // =================================================
        // 24-HOUR CONNECTION
        // =================================================

        response.setConnectionExpiresAt(
                booking.getConnectionExpiresAt()
        );

        response.setConnectionActive(
                isConnectionActive(booking)
        );


        // =================================================
        // CUSTOMER BOOKING ACCESS
        // =================================================

        if (booking.getCustomer() != null) {

            CustomerProfile customerProfile =
                    customerProfileRepository
                            .findByUser(
                                    booking.getCustomer()
                            )
                            .orElse(null);


            if (customerProfile != null) {

                int freeBookingsUsed =
                        customerProfile
                                .getFreeBookingsUsed();


                int freeBookingsRemaining =
                        Math.max(
                                FREE_BOOKING_LIMIT
                                        - freeBookingsUsed,
                                0
                        );


                int bookingCredits =
                        customerProfile
                                .getBookingCredits();


                boolean canBook =
                        freeBookingsUsed
                                < FREE_BOOKING_LIMIT
                        || bookingCredits > 0;


                response.setFreeBookingsUsed(
                        freeBookingsUsed
                );

                response.setFreeBookingsRemaining(
                        freeBookingsRemaining
                );

                response.setBookingCredits(
                        bookingCredits
                );

                response.setCanBook(
                        canBook
                );
            }
        }


        // =================================================
        // PRIVACY
        // =================================================
        //
        // Customer/worker original phone numbers and
        // emails are never returned here.
        //
        // =================================================

        return response;
    }
}