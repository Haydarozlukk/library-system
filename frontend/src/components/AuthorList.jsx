import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Avatar } from '@mui/material';
import axios from 'axios';

function AuthorList() {
    const [authors, setAuthors] = useState([]);
    const [newAuthor, setNewAuthor] = useState({ name: '', age: '', memleket: '', imageUrl: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedAuthorId, setSelectedAuthorId] = useState(null);
    const [authorBooks, setAuthorBooks] = useState([]); // Yazarın kitaplarını tutacak state

    useEffect(() => {
        fetchAuthors();
    }, []);

    const fetchAuthors = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:8081/api/authors');
            setAuthors(response.data);
        } catch (error) {
            setError("Yazarlar getirilirken bir hata oluştu.");
            console.error("Yazarlar getirilirken hata oluştu", error);
        } finally {
            setLoading(false);
        }
    };

    const createAuthor = async () => {
        if (!newAuthor.name || !newAuthor.age || !newAuthor.memleket || !newAuthor.imageUrl) {
            alert("Tüm alanlar doldurulmalıdır!");
            return;
        }

        try {
            await axios.post('http://localhost:8081/api/authors', newAuthor);
            fetchAuthors();
            setNewAuthor({ name: '', age: '', memleket: '', imageUrl: '' });
            alert("Yazar başarıyla eklendi!");
        } catch (error) {
            console.error("Yazar oluşturulurken hata oluştu", error);
            alert("Yazar oluşturulurken bir hata oluştu.");
        }
    };

    const fetchBooksByAuthor = async (authorId) => {
        setSelectedAuthorId(authorId);
        try {
            const response = await axios.get(`http://localhost:8081/api/authors/${authorId}/books`);
            setAuthorBooks(response.data);
        } catch (error) {
            console.error("Yazarın kitapları getirilirken hata oluştu", error);
            setAuthorBooks([]);
        }
    };

    return (
        <div style={{ marginTop: '50px' }}>
            <Typography
                variant="h4"
                align="center"
                gutterBottom
                style={{ fontWeight: 'bold', fontSize: '2rem', color: '#3f51b5' }}>
                Yazar Yönetimi
            </Typography>

            <Grid container spacing={3} justifyContent="center">

                {/* Yazar Listesi */}
                <Grid item xs={12} md={8}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="div" gutterBottom style={{ fontWeight: 'bold' }}>
                                Yazar Listesi
                            </Typography>

                            {loading ? (
                                <CircularProgress />
                            ) : error ? (
                                <Typography color="error">{error}</Typography>
                            ) : (
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell><strong>Görsel</strong></TableCell>
                                                <TableCell><strong>İsim</strong></TableCell>
                                                <TableCell><strong>Yaş</strong></TableCell>
                                                <TableCell><strong>Memleket</strong></TableCell>
                                                <TableCell><strong>Kitaplar</strong></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {authors.map((author) => (
                                                <TableRow key={author.id}>
                                                    <TableCell>
                                                        <Avatar alt={author.name} src={author.imageUrl} />
                                                    </TableCell>
                                                    <TableCell>{author.name}</TableCell>
                                                    <TableCell>{author.age}</TableCell>
                                                    <TableCell>{author.memleket}</TableCell>
                                                    <TableCell>
                                                        <Button
                                                            variant="outlined"
                                                            color="primary"
                                                            onClick={() => fetchBooksByAuthor(author.id)}
                                                        >
                                                            Kitapları Göster
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )}
                        </CardContent>
                    </Card>
                </Grid>

                {/* Yeni Yazar Ekleme Formu */}
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="div" gutterBottom style={{ fontWeight: 'bold' }}>
                                Yeni Yazar Oluştur
                            </Typography>
                            <form noValidate autoComplete="off">
                                <TextField
                                    label="İsim"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    required
                                    value={newAuthor.name}
                                    onChange={(e) => setNewAuthor({ ...newAuthor, name: e.target.value })}
                                />

                                <TextField
                                    label="Yaş"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    type="number"
                                    required
                                    value={newAuthor.age}
                                    onChange={(e) => setNewAuthor({ ...newAuthor, age: e.target.value })}
                                />

                                <TextField
                                    label="Memleket"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    required
                                    value={newAuthor.memleket}
                                    onChange={(e) => setNewAuthor({ ...newAuthor, memleket: e.target.value })}
                                />

                                {/* Görsel URL */}
                                <TextField
                                    label="Görsel URL"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    required
                                    value={newAuthor.imageUrl}
                                    onChange={(e) => setNewAuthor({ ...newAuthor, imageUrl: e.target.value })}
                                />

                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ marginTop: '20px', padding: '10px 20px', fontWeight: 'bold' }}
                                    fullWidth
                                    onClick={createAuthor}
                                >
                                    Yazar Oluştur
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Yazarın Kitap Listesi */}
            {selectedAuthorId && (
                <Grid container spacing={3} justifyContent="center" style={{ marginTop: '30px' }}>
                    <Grid item xs={12} md={8}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="div" gutterBottom style={{ fontWeight: 'bold' }}>
                                    Yazarın Kitapları
                                </Typography>

                                {authorBooks.length === 0 ? (
                                    <Typography>Bu yazarın henüz kitabı yok.</Typography>
                                ) : (
                                    <TableContainer component={Paper}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell><strong>Kapak</strong></TableCell>
                                                    <TableCell><strong>Başlık</strong></TableCell>
                                                    <TableCell><strong>ISBN</strong></TableCell>
                                                    <TableCell><strong>Yayın Yılı</strong></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {authorBooks.map((book) => (
                                                    <TableRow key={book.id}>
                                                        <TableCell>
                                                            <Avatar alt={book.title} src={book.imageUrl} />
                                                        </TableCell>
                                                        <TableCell>{book.title}</TableCell>
                                                        <TableCell>{book.isbn}</TableCell>
                                                        <TableCell>{book.publicationYear}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            )}
        </div>
    );
}

export default AuthorList;
