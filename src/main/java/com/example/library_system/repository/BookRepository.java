package com.example.library_system.repository;

import com.example.library_system.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findByAuthorId(Long authorId);
    List<Book> findByCategoryId(Long categoryId);
    boolean existsByIsbn(String isbn);
    boolean existsByTitleIgnoreCase(String title);

    @Query("""
            SELECT b FROM Book b
            WHERE (CAST(:search AS string) IS NULL
                   OR LOWER(b.title) LIKE LOWER(CONCAT('%', CAST(:search AS string), '%'))
                   OR LOWER(b.author.name) LIKE LOWER(CONCAT('%', CAST(:search AS string), '%')))
              AND (CAST(:categoryId AS long) IS NULL OR b.category.id = :categoryId)
              AND (CAST(:authorId AS long) IS NULL OR b.author.id = :authorId)
            """)
    Page<Book> search(@Param("search") String search,
                      @Param("categoryId") Long categoryId,
                      @Param("authorId") Long authorId,
                      Pageable pageable);
}
