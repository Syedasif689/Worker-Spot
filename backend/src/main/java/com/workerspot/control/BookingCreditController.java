
package com.workerspot.control;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.workerspot.dto.BookingCreditPurchaseRequest;
import com.workerspot.dto.BookingCreditPurchaseResponse;
import com.workerspot.entity.User;
import com.workerspot.repository.UserRepository;
import com.workerspot.service.BookingCreditService;

@RestController
@RequestMapping("/api/booking-credits")
public class BookingCreditController {

    private final BookingCreditService bookingCreditService;
    private final UserRepository userRepository;


    public BookingCreditController(
            BookingCreditService bookingCreditService,
            UserRepository userRepository
    ) {
        this.bookingCreditService = bookingCreditService;
        this.userRepository = userRepository;
    }


    // =====================================================
    // CREATE CREDIT PURCHASE
    // =====================================================
    //
    // POST /api/booking-credits/purchase
    //
    // Request:
    //
    // {
    //     "plan": "STARTER"
    // }
    //
    // IMPORTANT:
    //
    // This only creates the purchase transaction.
    //
    // It does NOT add credits yet.
    // Payment verification comes later.
    // =====================================================

    @PostMapping("/purchase")
    public ResponseEntity<BookingCreditPurchaseResponse>
    createPurchase(
            Authentication authentication,
            @RequestBody BookingCreditPurchaseRequest request
    ) {

        User customer = getAuthenticatedUser(
                authentication
        );

        BookingCreditPurchaseResponse response =
                bookingCreditService.createPurchase(
                        customer.getId(),
                        request
                );

        return ResponseEntity.ok(response);
    }


    // =====================================================
    // GET CUSTOMER CREDIT BALANCE
    // =====================================================
    //
    // GET /api/booking-credits/balance
    //
    // Returns:
    //
    // {
    //     "credits": 5
    // }
    // =====================================================

    @GetMapping("/balance")
    public ResponseEntity<CreditBalanceResponse>
    getBalance(
            Authentication authentication
    ) {

        User customer = getAuthenticatedUser(
                authentication
        );

        int credits =
                bookingCreditService.getCustomerCredits(
                        customer.getId()
                );

        return ResponseEntity.ok(
                new CreditBalanceResponse(credits)
        );
    }


    // =====================================================
    // GET CUSTOMER TRANSACTIONS
    // =====================================================
    //
    // GET /api/booking-credits/transactions
    //
    // Returns the customer's purchase history.
    // =====================================================

    @GetMapping("/transactions")
    public ResponseEntity<
            List<BookingCreditPurchaseResponse>>
    getTransactions(
            Authentication authentication
    ) {

        User customer = getAuthenticatedUser(
                authentication
        );

        List<BookingCreditPurchaseResponse> transactions =
                bookingCreditService
                        .getCustomerTransactions(
                                customer.getId()
                        );

        return ResponseEntity.ok(
                transactions
        );
    }


    // =====================================================
    // GET AUTHENTICATED USER
    // =====================================================

    private User getAuthenticatedUser(
            Authentication authentication
    ) {

        if (authentication == null ||
                authentication.getName() == null) {

            throw new RuntimeException(
                    "Authentication required."
            );
        }


        User user = userRepository
                .findByEmail(
                        authentication.getName()
                )
                .orElseThrow(() ->
                        new RuntimeException(
                                "Authenticated customer not found."
                        )
                );


        // =================================================
        // CUSTOMER ONLY
        // =================================================

        if (user.getRole() == null ||
                !user.getRole()
                        .name()
                        .equals("CUSTOMER")) {

            throw new RuntimeException(
                    "Only customers can access booking credits."
            );
        }


        return user;
    }


    // =====================================================
    // BALANCE RESPONSE
    // =====================================================

    public static class CreditBalanceResponse {

        private final int credits;


        public CreditBalanceResponse(int credits) {
            this.credits = credits;
        }


        public int getCredits() {
            return credits;
        }
    }
}
