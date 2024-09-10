import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import axios from 'axios';

function AuthorList() {
    const [authors, setAuthors] = useState([]);
    const [newAuthor, setNewAuthor] = useState({ name: '', age: '', memleket: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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
        if (!newAuthor.name || !newAuthor.age || !newAuthor.memleket) {
            alert("Tüm alanlar doldurulmalıdır!");
            return;
        }

        try {
            await axios.post('http://localhost:8081/api/authors', newAuthor);
            fetchAuthors();
            setNewAuthor({ name: '', age: '', memleket: '' });
            alert("Yazar başarıyla eklendi!");
        } catch (error) {
            console.error("Yazar oluşturulurken hata oluştu", error);
            alert("Yazar oluşturulurken bir hata oluştu.");
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
                                                <TableCell><strong>İsim</strong></TableCell>
                                                <TableCell><strong>Yaş</strong></TableCell>
                                                <TableCell><strong>Memleket</strong></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {authors.map((author) => (
                                                <TableRow key={author.id}>
                                                    <TableCell>{author.name}</TableCell>
                                                    <TableCell>{author.age}</TableCell>
                                                    <TableCell>{author.memleket}</TableCell>
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
        </div>
    );
}

export default AuthorList;
