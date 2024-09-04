package com.example.library_system.service;

import com.example.library_system.model.DamagedBook;

import java.util.List;

public interface DamagedBookService {
    List<DamagedBook> getAllDamagedBooks();
    DamagedBook reportDamagedBook(DamagedBook damagedBook);
}
