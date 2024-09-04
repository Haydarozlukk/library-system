package com.example.library_system.repository;

import com.example.library_system.model.BookRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRequestRepository extends JpaRepository<BookRequest, Long> {

    List<BookRequest> findByCustomerId(Long customerId);

    List<BookRequest> findByStatus(String status);
}
