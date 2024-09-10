package com.example.library_system.service;

import com.example.library_system.model.Book;
import com.example.library_system.model.Category;

import java.util.List;

public interface CategoryService {
    List<Category> getAllCategories();

    Category getCategoryById(Long id);

    Category createCategory(Category category);

    Category updateCategory(Long id, Category category);

    void deleteCategory(Long id);

    List<Book> getBooksByCategory(Long categoryId);

}
