package com.example.library.service;

import com.example.library.model.BookRequest;

import java.util.List;

public interface BookRequestService {

    BookRequest createBookRequest(BookRequest bookRequest);

    List<BookRequest> getAllPendingRequests();

    BookRequest approveRequest(Long requestId);

    BookRequest rejectRequest(Long requestId);

    List<BookRequest> getCustomerApprovedBooks(Long customerId);
}
