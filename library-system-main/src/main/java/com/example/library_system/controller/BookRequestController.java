package com.example.library_system.controller;

import com.example.library_system.model.BookRequest;
import com.example.library_system.service.BookRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookrequest")
public class BookRequestController {

    @Autowired
    private BookRequestService bookRequestService;

    // Müşteri kitap talebi oluşturur
    @PostMapping("/request")
    public BookRequest createRequest(@RequestBody BookRequest bookRequest) {
        return bookRequestService.createRequest(bookRequest);
    }

    // Belirli bir müşteriye ait talepleri getirir
    @GetMapping("/customer/{customerId}")
    public List<BookRequest> getRequestsByCustomer(@PathVariable Long customerId) {
        return bookRequestService.getRequestsByCustomer(customerId);
    }

    // Tüm bekleyen talepleri getirir (admin için)
    @GetMapping("/pending")
    public List<BookRequest> getAllPendingRequests() {
        return bookRequestService.getRequestsByStatus("PENDING");
    }

    // Talebi onaylar (admin için)
    @PostMapping("/approve/{requestId}")
    public BookRequest approveRequest(@PathVariable Long requestId) {
        return bookRequestService.updateRequestStatus(requestId, "APPROVED");
    }

    // Talebi reddeder (admin için)
    @PostMapping("/reject/{requestId}")
    public BookRequest rejectRequest(@PathVariable Long requestId) {
        return bookRequestService.updateRequestStatus(requestId, "REJECTED");
    }
}
