package com.workerspot.service;

import java.util.List;

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
    private static final double PLATFORM_FEE = 20.0;

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final WorkerProfileRepository workerProfileRepository;
    private final CustomerProfileRepository customerProfileRepository;

    public BookingService(
            BookingRepository bookingRepository,
            UserRepository userRepository,
            WorkerProfileRepository workerProfileRepository,
            CustomerProfileRepository customerProfileRepository
    ) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.workerProfileRepository = workerProfileRepository;
        this.customerProfileRepository = customerProfileRepository;
    }

    // =====================================================
    // CREATE BOOKING
    // =====================================================

    @Transactional
    public BookingResponse createBooking(
            Long customerId,
            BookingRequest request
    ) {

        // -------------------------------------------------
        // CUSTOMER
        // -------------------------------------------------

        User customer = userRepository
                .findById(customerId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Customer not found."
                        )
                );

        // -------------------------------------------------
        // VERIFY CUSTOMER ROLE
        // -------------------------------------------------

        if (customer.getRole() == null ||
                !customer.getRole().name().equals("CUSTOMER")) {

            throw new RuntimeException(
                    "Only customers can create bookings."
            );
        }

        // -------------------------------------------------
        // VALIDATE WORKER ID
        // -------------------------------------------------

        if (request.getWorkerId() == null) {

            throw new RuntimeException(
                    "Worker ID is required."
            );
        }

        // -------------------------------------------------
        // WORKER
        // -------------------------------------------------

        WorkerProfile worker =
                workerProfileRepository
                        .findById(request.getWorkerId())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Worker not found."
                                )
                        );

        // -------------------------------------------------
        // WORKER MUST BE AVAILABLE
        // -------------------------------------------------

        if (worker.getAvailability() !=
                Availability.AVAILABLE) {

            throw new RuntimeException(
                    "This worker is currently busy."
            );
        }

        // -------------------------------------------------
        // CUSTOMER PROFILE
        // -------------------------------------------------

        CustomerProfile customerProfile =
                customerProfileRepository
                        .findByUser(customer)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Customer profile not found."
                                )
                        );

        // -------------------------------------------------
        // FREE BOOKINGS
        // -------------------------------------------------

        int freeBookingsUsed =
                customerProfile.getFreeBookingsUsed();

        boolean freeBooking =
                freeBookingsUsed < FREE_BOOKING_LIMIT;

        // -------------------------------------------------
        // PLATFORM FEE
        // -------------------------------------------------

        double platformFee =
                freeBooking
                        ? 0.0
                        : PLATFORM_FEE;

        // -------------------------------------------------
        // WORKER CHARGES
        // -------------------------------------------------

        double workerCharges =
                worker.getCharges();

        // -------------------------------------------------
        // TOTAL AMOUNT
        // -------------------------------------------------

        double totalAmount =
                workerCharges + platformFee;

        // -------------------------------------------------
        // CREATE BOOKING
        // -------------------------------------------------

        Booking booking = new Booking();

        booking.setCustomer(customer);

        booking.setWorker(worker);

        booking.setCategory(
                request.getCategory()
        );

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

        booking.setCustomerLatitude(
                request.getCustomerLatitude()
        );

        booking.setCustomerLongitude(
                request.getCustomerLongitude()
        );

        booking.setProblemDescription(
                request.getProblemDescription()
        );

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

        // -------------------------------------------------
        // WORKER MUST ACCEPT
        // -------------------------------------------------

        booking.setStatus(
                BookingStatus.PENDING
        );

        // -------------------------------------------------
        // SAVE
        // -------------------------------------------------

        Booking savedBooking =
                bookingRepository.save(booking);

        // -------------------------------------------------
        // CONSUME FREE BOOKING
        //
        // IMPORTANT:
        // The free attempt is consumed when the booking
        // request is created.
        // -------------------------------------------------

        if (freeBooking) {

            customerProfile.setFreeBookingsUsed(
                    freeBookingsUsed + 1
            );

            customerProfileRepository.save(
                    customerProfile
            );
        }

        // -------------------------------------------------
        // SAFE RESPONSE
        // -------------------------------------------------

        return toBookingResponse(savedBooking);
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

        // -------------------------------------------------
        // SECURITY CHECK
        // -------------------------------------------------

        if (booking.getWorker() == null ||
                !booking.getWorker()
                        .getId()
                        .equals(workerId)) {

            throw new RuntimeException(
                    "You are not authorized to accept this booking."
            );
        }

        // -------------------------------------------------
        // MUST BE PENDING
        // -------------------------------------------------

        if (booking.getStatus() !=
                BookingStatus.PENDING) {

            throw new RuntimeException(
                    "This booking is no longer pending."
            );
        }

        // -------------------------------------------------
        // WORKER MUST STILL BE AVAILABLE
        // -------------------------------------------------

        WorkerProfile worker =
                booking.getWorker();

        if (worker.getAvailability() !=
                Availability.AVAILABLE) {

            throw new RuntimeException(
                    "You cannot accept a booking while busy."
            );
        }

        // -------------------------------------------------
        // ACCEPT
        // -------------------------------------------------

        booking.setStatus(
                BookingStatus.ACCEPTED
        );

        // -------------------------------------------------
        // WORKER BECOMES BUSY
        // -------------------------------------------------

        worker.setAvailability(
                Availability.BUSY
        );

        workerProfileRepository.save(worker);

        Booking savedBooking =
                bookingRepository.save(booking);

        // -------------------------------------------------
        // SAFE RESPONSE
        // -------------------------------------------------

        return toBookingResponse(savedBooking);
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

        // -------------------------------------------------
        // SECURITY CHECK
        // -------------------------------------------------

        if (booking.getWorker() == null ||
                !booking.getWorker()
                        .getId()
                        .equals(workerId)) {

            throw new RuntimeException(
                    "You are not authorized to reject this booking."
            );
        }

        // -------------------------------------------------
        // MUST BE PENDING
        // -------------------------------------------------

        if (booking.getStatus() !=
                BookingStatus.PENDING) {

            throw new RuntimeException(
                    "This booking is no longer pending."
            );
        }

        // -------------------------------------------------
        // REJECT
        // -------------------------------------------------

        booking.setStatus(
                BookingStatus.REJECTED
        );

        Booking savedBooking =
                bookingRepository.save(booking);

        // -------------------------------------------------
        // SAFE RESPONSE
        // -------------------------------------------------

        return toBookingResponse(savedBooking);
    }

    // =====================================================
    // SAFE BOOKING RESPONSE
    // =====================================================

    private BookingResponse toBookingResponse(
            Booking booking
    ) {

        BookingResponse response =
                new BookingResponse();

        // -------------------------------------------------
        // BOOKING
        // -------------------------------------------------

        response.setBookingId(
                booking.getId()
        );

        response.setCategory(
                booking.getCategory()
        );

        response.setProblemDescription(
                booking.getProblemDescription()
        );

        // -------------------------------------------------
        // SERVICE LOCATION
        // -------------------------------------------------

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

        response.setCustomerLatitude(
                booking.getCustomerLatitude()
        );

        response.setCustomerLongitude(
                booking.getCustomerLongitude()
        );

        // -------------------------------------------------
        // PAYMENT
        // -------------------------------------------------

        response.setWorkerCharges(
                booking.getWorkerCharges()
        );

        response.setPlatformFee(
                booking.getPlatformFee()
        );

        response.setTotalAmount(
                booking.getTotalAmount()
        );

        response.setFreeBooking(
                booking.isFreeBooking()
        );

        // -------------------------------------------------
        // STATUS
        // -------------------------------------------------

        if (booking.getStatus() != null) {

            response.setStatus(
                    booking.getStatus().name()
            );
        }

        response.setCreatedAt(
                booking.getCreatedAt()
        );
         response.setUpdatedAt(
                booking.getUpdatedAt()
        );

        // =================================================
        // CUSTOMER INFORMATION
        // =================================================

           if (booking.getCustomer() != null) {

    response.setCustomerId(
            booking.getCustomer().getId()
    );

    response.setCustomerName(
            booking.getCustomer().getFullName()
    );
}

      // =================================================
// WORKER INFORMATION
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

        /*
         * =================================================
         * PRIVACY
         * =================================================
         *
         * NEVER return:
         *
         * customer email
         * customer mobile
         * worker email
         * worker mobile
         *
         * Contact between customer and worker will later
         * be handled through Worker Spot's hidden-number
         * calling system.
         *
         * Workers are NOT charged any platform fee.
         *
         * Customer pays:
         *
         * First 3 bookings:
         *     Worker charges only
         *
         * After 3 free bookings:
         *     Worker charges + ₹20 platform fee
         *
         * =================================================
         */

        return response;
    }
}