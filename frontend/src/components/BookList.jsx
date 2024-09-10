import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, TextField, Button, CircularProgress } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import axios from 'axios';

function BookList() {
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({
        title: '',
        isbn: '',
        publicationYear: '',
        author: '',
        category: '',
        imageUrl: '' // Yeni resim URL alanı
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
            const response = await axios.get('http://localhost:8081/api/books/all');
            setBooks(response.data);
        } catch (error) {
            setError("Kitaplar getirilirken bir hata oluştu.");
            console.error("Kitaplar getirilirken hata oluştu", error);
        } finally {
            setLoading(false);
        }
    };

    const createBook = async () => {
        if (!newBook.title || !newBook.isbn || !newBook.publicationYear || !newBook.author || !newBook.category || !newBook.imageUrl) {
            alert("Tüm alanlar doldurulmalıdır!");
            return;
        }

        try {
            await axios.post('http://localhost:8081/api/books', newBook);
            fetchBooks();
            setNewBook({ title: '', isbn: '', publicationYear: '', author: '', category: '', imageUrl: '' });
            alert("Kitap başarıyla oluşturuldu!");
        } catch (error) {
            console.error("Kitap oluşturulurken hata oluştu", error);
            alert("Kitap oluşturulurken bir hata oluştu.");
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
                <Grid container spacing={3}>
                    {books.map((book) => (
                        <Grid item xs={12} sm={6} md={4} key={book.id}>
                            <Card style={{ maxWidth: 345 }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={book.imageUrl} // Resim URL'sini kullanıyoruz
                                    alt={book.title}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {book.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        ISBN: {book.isbn}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Yayın Yılı: {book.publicationYear}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
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
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Resim URL"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={newBook.imageUrl}
                        onChange={(e) => setNewBook({ ...newBook, imageUrl: e.target.value })} // Resim URL girişi
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
