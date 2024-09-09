import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookList() {
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({
        title: '',
        isbn: '',
        publicationYear: '',
        author: '',
        category: ''
    });

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        const response = await axios.get('http://localhost:8081/api/books');
        setBooks(response.data);
    };

    const createBook = async () => {
        await axios.post('http://localhost:8081/api/books', newBook);
        fetchBooks();
    };

    const deleteBook = async (id) => {
        await axios.delete(`http://localhost:8081/api/books/${id}`);
        fetchBooks();
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Book List</h2>

            {/* Kitap Listesi */}
            <table className="table table-striped table-bordered mt-4">
                <thead className="thead-dark">
                <tr>
                    <th>Title</th>
                    <th>ISBN</th>
                    <th>Publication Year</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {books.map((book) => (
                    <tr key={book.id}>
                        <td>{book.title}</td>
                        <td>{book.isbn}</td>
                        <td>{book.publicationYear}</td>
                        <td>
                            <button
                                className="btn btn-danger"
                                onClick={() => deleteBook(book.id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Yeni Kitap Ekleme Formu */}
            <h3 className="mt-5">Create New Book</h3>
            <form className="mt-3">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Enter title"
                        value={newBook.title}
                        onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="isbn">ISBN</label>
                    <input
                        type="text"
                        className="form-control"
                        id="isbn"
                        placeholder="Enter ISBN"
                        value={newBook.isbn}
                        onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="publicationYear">Publication Year</label>
                    <input
                        type="number"
                        className="form-control"
                        id="publicationYear"
                        placeholder="Enter publication year"
                        value={newBook.publicationYear}
                        onChange={(e) => setNewBook({ ...newBook, publicationYear: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="author">Author ID</label>
                    <input
                        type="text"
                        className="form-control"
                        id="author"
                        placeholder="Enter Author ID"
                        value={newBook.author}
                        onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="category">Category ID</label>
                    <input
                        type="text"
                        className="form-control"
                        id="category"
                        placeholder="Enter Category ID"
                        value={newBook.category}
                        onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
                    />
                </div>

                <button
                    type="button"
                    className="btn btn-primary mt-3"
                    onClick={createBook}>
                    Create Book
                </button>
            </form>
        </div>
    );
}

export default BookList;
