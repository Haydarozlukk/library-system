package com.example.library.model;

import com.example.library_system.model.Book;
import com.example.library_system.model.Customer;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor // Parametresiz constructor oluşturur
public class BookRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Customer customer;

    @ManyToOne
    private Book book;

    private String status; // Pending, Approved, Rejected

    private LocalDateTime requestDate;

    private LocalDateTime approvalDate;


}
