package com.example.library_system.controller;

import com.example.library_system.dto.ImportBookRequest;
import com.example.library_system.dto.OpenLibrarySearchResult;
import com.example.library_system.model.Author;
import com.example.library_system.model.Book;
import com.example.library_system.model.Category;
import com.example.library_system.repository.AuthorRepository;
import com.example.library_system.repository.BookRepository;
import com.example.library_system.repository.CategoryRepository;
import com.example.library_system.service.OpenLibraryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/openlibrary")
public class OpenLibraryController {

    @Autowired
    private OpenLibraryService openLibraryService;

    @Autowired
    private AuthorRepository authorRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private BookRepository bookRepository;

    @GetMapping("/search")
    public List<OpenLibrarySearchResult> search(@RequestParam String q) {
        return openLibraryService.search(q);
    }

    @PostMapping("/import")
    public ResponseEntity<Book> importBook(@RequestBody ImportBookRequest request) {
        if (request.getCategoryId() == null) {
            return ResponseEntity.badRequest().build();
        }

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Kategori bulunamadı"));

        Book book = buildBook(request.getTitle(), request.getAuthorName(), null, request.getIsbn(),
                request.getPublicationYear(), request.getCoverUrl(), request.getPageCount(),
                request.getLanguage(), request.getPublisher(), category);

        return ResponseEntity.ok(bookRepository.save(book));
    }

    @PostMapping("/bulk-import")
    public ResponseEntity<Map<String, Object>> bulkImport(
            @RequestParam String q,
            @RequestParam Long categoryId,
            @RequestParam(defaultValue = "50") int limit) {

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Kategori bulunamadı"));

        List<OpenLibrarySearchResult> results = openLibraryService.search(q, limit, true);

        int imported = 0;
        int skipped = 0;
        for (OpenLibrarySearchResult r : results) {
            if (r.getIsbn() != null && bookRepository.existsByIsbn(r.getIsbn())) {
                skipped++;
                continue;
            }
            if (bookRepository.existsByTitleIgnoreCase(r.getTitle())) {
                skipped++;
                continue;
            }

            Book book = buildBook(r.getTitle(), r.getAuthorName(), r.getAuthorPhotoUrl(), r.getIsbn(),
                    r.getPublicationYear(), r.getCoverUrl(), r.getPageCount(),
                    r.getLanguage(), r.getPublisher(), category);
            bookRepository.save(book);
            imported++;
        }

        return ResponseEntity.ok(Map.of(
                "query", q,
                "category", category.getName(),
                "found", results.size(),
                "imported", imported,
                "skipped", skipped));
    }

    private Book buildBook(String title, String authorName, String authorPhotoUrl, String isbn,
                           Integer publicationYear, String coverUrl, Integer pageCount,
                           String language, String publisher, Category category) {
        Author author = authorRepository.findByNameIgnoreCase(authorName);
        if (author == null) {
            author = new Author();
            author.setName(authorName);
            author.setImageUrl(authorPhotoUrl);
            author = authorRepository.save(author);
        } else if (author.getImageUrl() == null && authorPhotoUrl != null) {
            author.setImageUrl(authorPhotoUrl);
            author = authorRepository.save(author);
        }

        Book book = new Book();
        book.setTitle(title);
        book.setIsbn(isbn);
        book.setPublicationYear(publicationYear != null ? publicationYear : 0);
        book.setImageUrl(coverUrl);
        book.setPageCount(pageCount);
        book.setLanguage(language);
        book.setPublisher(publisher);
        book.setAuthor(author);
        book.setCategory(category);
        return book;
    }
}
