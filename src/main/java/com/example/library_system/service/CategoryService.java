package com.example.library_system.service;

import com.example.library_system.model.Book;
import com.example.library_system.model.Category;

import java.util.List;

public interface CategoryService {
    List<Category> getAllCategories();

    Category getCategoryById(Long id);

    List<Book> getBooksByCategoryId(Long categoryId);

    Category createCategory(Category category);

    Category updateCategory(Long id, Category category);

    void deleteCategory(Long id);
}
