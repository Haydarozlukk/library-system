package com.example.library_system.service;

import com.example.library_system.model.Book;

import java.util.List;
import java.util.Optional;

public interface BookService {
    List<Book> getAllBooks();
    Optional<Book> getBookById(Long id);
    Book addBook(Book book);
    Book updateBook(Long id, Book bookDetails);
    void deleteBook(Long id);
    void deleteAllBooks();
}
