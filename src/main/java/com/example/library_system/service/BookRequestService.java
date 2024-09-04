package com.example.library_system.service;

import com.example.library_system.model.BookRequest;

import java.util.List;

public interface BookRequestService {

    BookRequest createRequest(BookRequest bookRequest);

    List<BookRequest> getRequestsByCustomer(Long customerId);

    List<BookRequest> getRequestsByStatus(String status);

    BookRequest updateRequestStatus(Long requestId, String status);
}
