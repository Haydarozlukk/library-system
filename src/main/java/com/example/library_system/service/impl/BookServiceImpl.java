package com.example.library_system.service.impl;

import com.example.library_system.model.Book;
import com.example.library_system.repository.BookRepository;
import com.example.library_system.repository.AuthorRepository;
import com.example.library_system.repository.CategoryRepository;
import com.example.library_system.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private AuthorRepository authorRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @Override
    public Optional<Book> getBookById(Long id) {
        return bookRepository.findById(id);
    }

    @Override
    public Book addBook(Book book) {
        // Author ve Category ID'lerinin geçerli olup olmadığını kontrol ediyoruz.
        book.setAuthor(authorRepository.findById(book.getAuthor().getId())
                .orElseThrow(() -> new RuntimeException("Author not found")));
        book.setCategory(categoryRepository.findById(book.getCategory().getId())
                .orElseThrow(() -> new RuntimeException("Category not found")));

        return bookRepository.save(book);
    }

    @Override
    public Book updateBook(Long id, Book bookDetails) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        book.setTitle(bookDetails.getTitle());
        book.setIsbn(bookDetails.getIsbn());
        book.setAuthor(authorRepository.findById(bookDetails.getAuthor().getId())
                .orElseThrow(() -> new RuntimeException("Author not found")));
        book.setCategory(categoryRepository.findById(bookDetails.getCategory().getId())
                .orElseThrow(() -> new RuntimeException("Category not found")));

        return bookRepository.save(book);
    }

    @Override
    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }
    @Override
    public void deleteAllBooks() {
        bookRepository.deleteAll();
    }

}
