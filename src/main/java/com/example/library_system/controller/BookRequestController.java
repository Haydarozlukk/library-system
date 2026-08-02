package com.example.library_system.controller;

import com.example.library_system.model.BookRequest;
import com.example.library_system.model.Customer;
import com.example.library_system.repository.CustomerRepository;
import com.example.library_system.security.AppUserPrincipal;
import com.example.library_system.service.BookRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/book-requests")
public class BookRequestController {

    @Autowired
    private BookRequestService bookRequestService;

    @Autowired
    private CustomerRepository customerRepository;

    @PostMapping("/request")
    public ResponseEntity<?> createRequest(@RequestBody BookRequest bookRequest, Authentication authentication) {
        AppUserPrincipal principal = (AppUserPrincipal) authentication.getPrincipal();
        if (!"CUSTOMER".equals(principal.getRole())) {
            return ResponseEntity.status(403).body("Sadece müşteriler kitap isteği oluşturabilir.");
        }

        Customer customer = customerRepository.findById(principal.getId())
                .orElseThrow(() -> new RuntimeException("Müşteri bulunamadı"));
        bookRequest.setCustomer(customer);

        return ResponseEntity.ok(bookRequestService.createBookRequest(bookRequest));
    }

    @GetMapping("/my")
    public List<BookRequest> getMyRequests(Authentication authentication) {
        AppUserPrincipal principal = (AppUserPrincipal) authentication.getPrincipal();
        return bookRequestService.getRequestsByCustomerId(principal.getId());
    }

    @GetMapping("/pending")
    public List<BookRequest> getAllPendingRequests() {
        return bookRequestService.getAllPendingRequests();
    }

    @PostMapping("/approve/{id}")
    public BookRequest approveRequest(@PathVariable Long id) {
        return bookRequestService.approveRequest(id);
    }

    @PostMapping("/reject/{id}")
    public BookRequest rejectRequest(@PathVariable Long id) {
        return bookRequestService.rejectRequest(id);
    }

    @GetMapping("/customer/{customerId}/approved-books")
    public List<BookRequest> getCustomerApprovedBooks(@PathVariable Long customerId) {
        return bookRequestService.getCustomerApprovedBooks(customerId);
    }
}
