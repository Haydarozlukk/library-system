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


    @PostMapping("/request")
    public BookRequest createRequest(@RequestBody BookRequest bookRequest) {
        return bookRequestService.createRequest(bookRequest);
    }


    @GetMapping("/customer/{customerId}")
    public List<BookRequest> getRequestsByCustomer(@PathVariable Long customerId) {
        return bookRequestService.getRequestsByCustomer(customerId);
    }


    @GetMapping("/pending")
    public List<BookRequest> getAllPendingRequests() {
        return bookRequestService.getRequestsByStatus("PENDING");
    }


    @PostMapping("/approve/{requestId}")
    public BookRequest approveRequest(@PathVariable Long requestId) {
        return bookRequestService.updateRequestStatus(requestId, "APPROVED");
    }


    @PostMapping("/reject/{requestId}")
    public BookRequest rejectRequest(@PathVariable Long requestId) {
        return bookRequestService.updateRequestStatus(requestId, "REJECTED");
    }
}
