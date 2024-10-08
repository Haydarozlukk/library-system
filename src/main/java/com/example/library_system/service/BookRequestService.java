package com.example.library_system.service;

import com.example.library_system.model.BookRequest;

import java.util.List;

public interface BookRequestService {

    BookRequest createBookRequest(BookRequest bookRequest);

    List<BookRequest> getAllPendingRequests();

    BookRequest approveRequest(Long requestId);

    BookRequest rejectRequest(Long requestId);

    List<BookRequest> getCustomerApprovedBooks(Long customerId);
}
