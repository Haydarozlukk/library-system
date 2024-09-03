package com.example.library_system.controller;

import com.example.library_system.model.DamagedBook;
import com.example.library_system.service.DamagedBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/damaged-books")
public class DamagedBookController {

    @Autowired
    private DamagedBookService damagedBookService;

    @GetMapping
    public List<DamagedBook> getAllDamagedBooks() {
        return damagedBookService.getAllDamagedBooks();
    }

    @PostMapping
    public DamagedBook reportDamagedBook(@RequestBody DamagedBook damagedBook) {
        return damagedBookService.reportDamagedBook(damagedBook);
    }
}
