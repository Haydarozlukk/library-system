package com.example.library_system.service;

import com.example.library_system.model.Author;
import com.example.library_system.model.Book;

import java.util.List;
import java.util.Optional;

public interface AuthorService {
    List<Author> getAllAuthors();

    Optional<Author> getAuthorById(Long id);

    Author addAuthor(Author author);

    Author updateAuthor(Long id, Author authorDetails);

    void deleteAuthor(Long id);

    List<Book> getBooksByAuthor(Long authorId);

}
