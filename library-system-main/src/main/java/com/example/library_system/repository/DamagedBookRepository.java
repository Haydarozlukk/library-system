package com.example.library_system.repository;

import com.example.library_system.model.DamagedBook;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DamagedBookRepository extends JpaRepository<DamagedBook, Long> {
}
