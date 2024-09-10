package com.example.library.controller;

import com.example.library.model.BookRequest;
import com.example.library.service.BookRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5174")
@RestController
@RequestMapping("/api/book-requests")
public class BookRequestController {

    @Autowired
    private BookRequestService bookRequestService;

    @PostMapping("/request")
    public BookRequest createRequest(@RequestBody BookRequest bookRequest) {
        return bookRequestService.createBookRequest(bookRequest);
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
