package com.example.library.service.impl;

import com.example.library.model.BookRequest;
import com.example.library.repository.BookRequestRepository;
import com.example.library.service.BookRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BookRequestServiceImpl implements BookRequestService {

    @Autowired
    private BookRequestRepository bookRequestRepository;

    @Override
    public BookRequest createBookRequest(BookRequest bookRequest) {
        bookRequest.setRequestDate(LocalDateTime.now());
        bookRequest.setStatus("Pending");
        return bookRequestRepository.save(bookRequest);
    }

    @Override
    public List<BookRequest> getAllPendingRequests() {
        return bookRequestRepository.findByStatus("Pending");
    }

    @Override
    public BookRequest approveRequest(Long requestId) {
        BookRequest request = bookRequestRepository.findById(requestId).orElseThrow(() -> new RuntimeException("Request not found"));
        request.setStatus("Approved");
        request.setApprovalDate(LocalDateTime.now());
        return bookRequestRepository.save(request);
    }

    @Override
    public BookRequest rejectRequest(Long requestId) {
        BookRequest request = bookRequestRepository.findById(requestId).orElseThrow(() -> new RuntimeException("Request not found"));
        request.setStatus("Rejected");
        return bookRequestRepository.save(request);
    }

    @Override
    public List<BookRequest> getCustomerApprovedBooks(Long customerId) {
        return bookRequestRepository.findByCustomerId(customerId)
                .stream()
                .filter(request -> "Approved".equals(request.getStatus()))
                .toList();
    }
}
