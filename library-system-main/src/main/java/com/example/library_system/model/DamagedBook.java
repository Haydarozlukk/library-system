package com.example.library_system.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public class DamagedBook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Book book;

    private Date reportedDate;

    @ManyToOne
    private Customer reportedBy;

    private String status; // PENDING, IN_MAINTENANCE, FIXED


}
