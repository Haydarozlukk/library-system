package com.example.library_system.dto;

import lombok.Data;

@Data
public class ImportBookRequest {
    private String title;
    private String authorName;
    private String isbn;
    private Integer publicationYear;
    private String coverUrl;
    private Integer pageCount;
    private String language;
    private String publisher;
    private Long categoryId;
}
