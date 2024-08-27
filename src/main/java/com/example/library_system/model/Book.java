package com.example.library_system.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String isbn;
    private int publicationYear;

    @ManyToOne
    private Author author;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

}

