package com.example.library.repository;

import com.example.library.model.BookRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookRequestRepository extends JpaRepository<BookRequest, Long> {
    List<BookRequest> findByCustomerId(Long customerId);
    List<BookRequest> findByStatus(String status);
}
