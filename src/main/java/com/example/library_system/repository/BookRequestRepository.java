package com.example.library_system.repository;

import com.example.library_system.model.BookRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookRequestRepository extends JpaRepository<BookRequest, Long> {
    List<BookRequest> findByCustomerId(Long customerId);
    List<BookRequest> findByStatus(String status);
}
