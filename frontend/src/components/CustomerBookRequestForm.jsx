import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, Select, MenuItem, FormControl, InputLabel, Box, Card, CardContent, CardMedia } from '@mui/material';
import axios from 'axios';

function CustomerBookRequestForm() {
    const [books, setBooks] = useState([]); // Kitapları tutacak state
    const [selectedBookId, setSelectedBookId] = useState(''); // Seçilen kitabın ID'si
    const [customerId, setCustomerId] = useState('');
    const [selectedBookDetails, setSelectedBookDetails] = useState(null); // Seçilen kitabın detayları

    // Kitapları backend'den çek
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/books/all');
                setBooks(response.data); // Kitapları state'e kaydet
            } catch (error) {
                console.error('Kitaplar çekilirken hata oluştu:', error);
            }
        };

        fetchBooks();
    }, []);

    // Seçilen kitabın detaylarını getir
    useEffect(() => {
        if (selectedBookId) {
            const fetchBookDetails = async () => {
                try {
                    const response = await axios.get(`http://localhost:8081/api/books/${selectedBookId}`);
                    setSelectedBookDetails(response.data); // Seçilen kitabın detaylarını kaydet
                } catch (error) {
                    console.error('Kitap detayları getirilirken hata oluştu:', error);
                }
            };
            fetchBookDetails();
        } else {
            setSelectedBookDetails(null); // Seçim yapılmazsa detayları temizle
        }
    }, [selectedBookId]);

    const handleRequest = async () => {
        if (!selectedBookId || !customerId) {
            alert('Lütfen tüm alanları doldurun.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8081/api/book-requests/request', {
                book: { id: selectedBookId },
                customer: { id: customerId },
            });
            alert('Kitap isteği başarıyla gönderildi.');
        } catch (error) {
            console.error('Kitap isteği gönderilirken hata oluştu:', error);
        }
    };

    return (
        <Container>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Kitap İsteği Yap
                </Typography>

                {/* Kitap Seçimi */}
                <FormControl
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    sx={{
                        backgroundColor: 'white',
                        borderRadius: '4px',
                        boxShadow: '0px 3px 6px rgba(0,0,0,0.1)',
                        width: '50%',
                    }}
                >
                    <InputLabel id="book-select-label">Kitap Seçin</InputLabel>
                    <Select
                        labelId="book-select-label"
                        value={selectedBookId}
                        onChange={(e) => setSelectedBookId(e.target.value)}
                        label="Kitap Seçin"
                    >
                        {books.map((book) => (
                            <MenuItem key={book.id} value={book.id}>
                                {book.title}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Seçilen Kitap Detayları */}
                {selectedBookDetails && (
                    <Card sx={{ maxWidth: 345, marginTop: '20px' }}>
                        <CardMedia
                            component="img"
                            height="200"
                            image={selectedBookDetails.imageUrl}
                            alt={selectedBookDetails.title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {selectedBookDetails.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                ISBN: {selectedBookDetails.isbn}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Yayın Yılı: {selectedBookDetails.publicationYear}
                            </Typography>
                        </CardContent>
                    </Card>
                )}

                {/* Müşteri ID */}
                <TextField
                    label="Müşteri ID"
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    sx={{
                        backgroundColor: 'white',
                        borderRadius: '4px',
                        boxShadow: '0px 3px 6px rgba(0,0,0,0.1)',
                        width: '50%',
                    }}
                />

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleRequest}
                    sx={{
                        marginTop: '20px',
                        padding: '10px 20px',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        width: '50%',
                    }}
                >
                    Kitap İsteği Gönder
                </Button>
            </Box>
        </Container>
    );
}

export default CustomerBookRequestForm;
