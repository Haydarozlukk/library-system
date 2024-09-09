import React, { useState, useEffect } from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
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
        try {
            const response = await axios.get('http://localhost:8081/api/books');
            setBooks(response.data);
        } catch (error) {
            console.error("Error fetching books", error);
        }
    };

    const createBook = async () => {
        if (!newBook.title || !newBook.isbn || !newBook.publicationYear || !newBook.author || !newBook.category) {
            alert("All fields are required!");
            return;
        }

        try {
            await axios.post('http://localhost:8081/api/books', newBook);
            fetchBooks();
            setNewBook({ title: '', isbn: '', publicationYear: '', author: '', category: '' });
            alert("Book created successfully!");
        } catch (error) {
            console.error("Error creating book", error);
            alert("There was an error creating the book.");
        }
    };

    const deleteBook = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/api/books/${id}`);
            fetchBooks();
        } catch (error) {
            console.error("Error deleting book", error);
            alert("There was an error deleting the book.");
        }
    };

    return (
        <div style={{ marginTop: '50px' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Book List
            </Typography>

            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>ISBN</TableCell>
                            <TableCell>Publication Year</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {books.map((book) => (
                            <TableRow key={book.id}>
                                <TableCell>{book.title}</TableCell>
                                <TableCell>{book.isbn}</TableCell>
                                <TableCell>{book.publicationYear}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => deleteBook(book.id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Typography variant="h5" style={{ marginTop: '40px' }}>
                Create New Book
            </Typography>

            <form noValidate autoComplete="off" style={{ marginTop: '20px' }}>
                <TextField
                    label="Title"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={newBook.title}
                    onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                />

                <TextField
                    label="ISBN"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={newBook.isbn}
                    onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
                />

                <TextField
                    label="Publication Year"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="number"
                    value={newBook.publicationYear}
                    onChange={(e) => setNewBook({ ...newBook, publicationYear: e.target.value })}
                />

                <TextField
                    label="Author ID"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={newBook.author}
                    onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                />

                <TextField
                    label="Category ID"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={newBook.category}
                    onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
                />

                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: '20px' }}
                    onClick={createBook}
                >
                    Create Book
                </Button>
            </form>
        </div>
    );
}

export default BookList;
