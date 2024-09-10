import React, { useState, useEffect } from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, Grid } from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:8081/api/books');
            setBooks(response.data);
        } catch (error) {
            setError("Kitaplar getirilirken bir hata oluştu.");
            console.error("Kitaplar getirilirken hata oluştu", error);
        } finally {
            setLoading(false);
        }
    };

    const createBook = async () => {
        if (!newBook.title || !newBook.isbn || !newBook.publicationYear || !newBook.author || !newBook.category) {
            alert("Tüm alanlar doldurulmalıdır!");
            return;
        }

        try {
            await axios.post('http://localhost:8081/api/books', newBook);
            fetchBooks();
            setNewBook({ title: '', isbn: '', publicationYear: '', author: '', category: '' });
            alert("Kitap başarıyla oluşturuldu!");
        } catch (error) {
            console.error("Kitap oluşturulurken hata oluştu", error);
            alert("Kitap oluşturulurken bir hata oluştu.");
        }
    };

    const deleteBook = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/api/books/${id}`);
            fetchBooks();
        } catch (error) {
            console.error("Kitap silinirken hata oluştu", error);
            alert("Kitap silinirken bir hata oluştu.");
        }
    };

    return (
        <div style={{ marginTop: '50px', padding: '20px' }}>
            <Typography
                variant="h4"
                align="center"
                gutterBottom
                style={{ fontWeight: 'bold', fontSize: '2.2rem', color: '#3f51b5' }}>
                Kitap Listesi
            </Typography>

            {loading ? (
                <CircularProgress style={{ display: 'block', margin: '20px auto' }} />
            ) : error ? (
                <Typography color="error" align="center">{error}</Typography>
            ) : (
                <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Başlık</strong></TableCell>
                                <TableCell><strong>ISBN</strong></TableCell>
                                <TableCell><strong>Yayın Yılı</strong></TableCell>
                                <TableCell><strong>İşlemler</strong></TableCell>
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
                                            startIcon={<DeleteIcon />}
                                            onClick={() => deleteBook(book.id)}
                                        >
                                            Sil
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <Typography
                variant="h5"
                style={{ marginTop: '40px', fontWeight: 'bold', fontSize: '1.8rem', color: '#3f51b5' }}>
                Yeni Kitap Oluştur
            </Typography>

            <Grid container spacing={2} style={{ marginTop: '20px' }}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Başlık"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={newBook.title}
                        onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="ISBN"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={newBook.isbn}
                        onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Yayın Yılı"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="number"
                        value={newBook.publicationYear}
                        onChange={(e) => setNewBook({ ...newBook, publicationYear: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Yazar ID"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={newBook.author}
                        onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Kategori ID"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={newBook.category}
                        onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
                    />
                </Grid>
            </Grid>

            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                style={{ marginTop: '20px', padding: '10px 20px', fontSize: '1rem', fontWeight: 'bold' }}
                onClick={createBook}
            >
                Kitap Oluştur
            </Button>
        </div>
    );
}

export default BookList;
