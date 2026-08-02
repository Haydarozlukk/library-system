package com.example.library_system.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OpenLibrarySearchResult {
    private String openLibraryKey;
    private String title;
    private String authorName;
    private Integer publicationYear;
    private String isbn;
    private String coverUrl;
    private String authorPhotoUrl;
    private Integer pageCount;
    private String language;
    private String publisher;
}
