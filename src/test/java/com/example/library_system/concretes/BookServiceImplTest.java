package com.example.library_system.concretes;

import com.example.library_system.model.Book;
import com.example.library_system.repository.BookRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class BookServiceImplTest {

    @Mock
    private BookRepository bookRepository;

    @InjectMocks
    private BookServiceImpl bookService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testFindBookById() {
        Book book = new Book();
        book.setId(1L);
        when(bookRepository.findById(1L)).thenReturn(Optional.of(book));

        Optional<Book> foundBookOptional = bookService.getBookById(1L);

        assertTrue(foundBookOptional.isPresent()); // Optional'ın dolu olduğunu kontrol edin
        Book foundBook = foundBookOptional.get(); // Optional'dan Book nesnesini alın

        assertNotNull(foundBook);
        assertEquals(1L, foundBook.getId());
        verify(bookRepository, times(1)).findById(1L);
    }

    @Test
    void testFindBookById_NotFound() {
        when(bookRepository.findById(1L)).thenReturn(Optional.empty());

        Optional<Book> foundBookOptional = bookService.getBookById(1L);

        assertFalse(foundBookOptional.isPresent());
        verify(bookRepository, times(1)).findById(1L);
    }
}
