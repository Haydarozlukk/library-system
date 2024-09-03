package com.example.library_system.service.impl;

import com.example.library_system.model.BookRequest;
import com.example.library_system.repository.BookRequestRepository;
import com.example.library_system.service.BookRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class BookRequestServiceImpl implements BookRequestService {

    @Autowired
    private BookRequestRepository bookRequestRepository;

    @Override
    public BookRequest createRequest(BookRequest bookRequest) {
        bookRequest.setRequestDate(new Date());
        bookRequest.setStatus("PENDING");
        return bookRequestRepository.save(bookRequest);
    }

    @Override
    public List<BookRequest> getRequestsByCustomer(Long customerId) {
        return bookRequestRepository.findByCustomerId(customerId);
    }

    @Override
    public List<BookRequest> getRequestsByStatus(String status) {
        return bookRequestRepository.findByStatus(status);
    }

    @Override
    public BookRequest updateRequestStatus(Long requestId, String status) {
        BookRequest request = bookRequestRepository.findById(requestId)
                .orElseThrow(() -> new IllegalArgumentException("Request not found"));
        request.setStatus(status);
        return bookRequestRepository.save(request);
    }
}
