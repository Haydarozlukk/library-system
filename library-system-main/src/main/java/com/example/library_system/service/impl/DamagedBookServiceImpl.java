package com.example.library_system.service.impl;

import com.example.library_system.model.DamagedBook;
import com.example.library_system.repository.DamagedBookRepository;
import com.example.library_system.service.DamagedBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DamagedBookServiceImpl implements DamagedBookService {

    @Autowired
    private DamagedBookRepository damagedBookRepository;

    @Override
    public List<DamagedBook> getAllDamagedBooks() {
        return damagedBookRepository.findAll();
    }

    @Override
    public DamagedBook reportDamagedBook(DamagedBook damagedBook) {
        return damagedBookRepository.save(damagedBook);
    }
}
