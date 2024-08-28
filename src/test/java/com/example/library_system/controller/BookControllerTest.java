package com.example.library_system.controller;

import com.example.library_system.model.Book;
import com.example.library_system.service.BookService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class BookControllerTest {

    @Mock
    private BookService bookService;

    @InjectMocks
    private BookController bookController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetBooks() {
        Book book = new Book();
        book.setId(1L);
        when(bookService.getAllBooks()).thenReturn(Collections.singletonList(book));

        List<Book> response = bookController.getAllBooks();
        assertNotNull(response);
        assertEquals(1, response.size());
        assertEquals(1L, response.get(0).getId());
    }


    @Test
    void testGetBooks_EmptyList() {
        when(bookService.getAllBooks()).thenReturn(Collections.emptyList());

        List<Book> response = bookController.getAllBooks();

        assertNotNull(response);
        assertTrue(response.isEmpty());
        verify(bookService, times(1)).getAllBooks();
    }
}
