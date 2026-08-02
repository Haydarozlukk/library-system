import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    Typography,
    Chip,
    Stack,
    Paper,
    Button,
    CircularProgress,
    Avatar,
    Divider,
    Snackbar,
    Alert,
} from '@mui/material';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { BookmarkAddRounded, ArrowBackRounded, MenuBookRounded } from '@mui/icons-material';
import axiosClient from '../api/axiosClient';
import { useAuth } from '../context/AuthContext';

function BookDetail() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [snackbar, setSnackbar] = useState(null);
    const { isAdmin, isCustomer, isLoggedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        setError(null);
        axiosClient
            .get(`/api/books/${id}`)
            .then((res) => setBook(res.data))
            .catch((err) => {
                console.error('Kitap detayı getirilirken hata oluştu', err);
                setError('Kitap bulunamadı.');
            })
            .finally(() => setLoading(false));
    }, [id]);

    const borrowBook = async () => {
        if (!isLoggedIn) {
            setSnackbar({ severity: 'info', message: 'Ödünç almak için giriş yapmalısınız.' });
            navigate('/login', { state: { from: `/books/${id}` } });
            return;
        }
        if (!isCustomer) {
            setSnackbar({ severity: 'info', message: 'Sadece müşteri hesapları kitap ödünç alabilir.' });
            return;
        }
        try {
            await axiosClient.post('/api/book-requests/request', { book: { id: book.id } });
            setSnackbar({ severity: 'success', message: `"${book.title}" için ödünç isteğiniz alındı, onay bekleniyor.` });
        } catch (err) {
            console.error('Ödünç isteği gönderilirken hata oluştu', err);
            setSnackbar({ severity: 'error', message: 'İstek gönderilirken bir hata oluştu.' });
        }
    };

    if (loading) {
        return <CircularProgress sx={{ display: 'block', mx: 'auto', my: 8 }} />;
    }

    if (error || !book) {
        return (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
                <Typography color="error">{error || 'Kitap bulunamadı.'}</Typography>
                <Button sx={{ mt: 2 }} onClick={() => navigate('/books')}>
                    Kitaplara Dön
                </Button>
            </Paper>
        );
    }

    return (
        <Box>
            <Button startIcon={<ArrowBackRounded />} onClick={() => navigate('/books')} sx={{ mb: 3 }}>
                Kitaplara Dön
            </Button>

            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    {book.imageUrl ? (
                        <Paper sx={{ p: 0, overflow: 'hidden' }}>
                            <Box component="img" src={book.imageUrl} alt={book.title} sx={{ width: '100%', display: 'block' }} />
                        </Paper>
                    ) : (
                        <Paper
                            sx={{
                                height: 360,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: 'rgba(15,95,166,0.06)',
                            }}
                        >
                            <MenuBookRounded sx={{ fontSize: 64, color: 'primary.main', opacity: 0.5 }} />
                        </Paper>
                    )}

                    {!isAdmin && (
                        <Button
                            variant="contained"
                            fullWidth
                            size="large"
                            startIcon={<BookmarkAddRounded />}
                            sx={{ mt: 2 }}
                            onClick={borrowBook}
                        >
                            Ödünç Al
                        </Button>
                    )}
                </Grid>

                <Grid item xs={12} md={8}>
                    <Typography variant="h3" gutterBottom>
                        {book.title}
                    </Typography>

                    {book.author && (
                        <Stack
                            direction="row"
                            spacing={1.5}
                            alignItems="center"
                            component={Link}
                            to="/authors"
                            sx={{ textDecoration: 'none', mb: 2, width: 'fit-content' }}
                        >
                            <Avatar
                                src={book.author.imageUrl}
                                alt={book.author.name}
                                sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: 14 }}
                            >
                                {book.author.name?.[0]}
                            </Avatar>
                            <Typography variant="subtitle1" color="text.primary">
                                {book.author.name}
                            </Typography>
                        </Stack>
                    )}

                    <Stack direction="row" spacing={1} sx={{ mb: 3 }} flexWrap="wrap" useFlexGap>
                        {book.category?.name && <Chip label={book.category.name} color="primary" variant="outlined" />}
                        <Chip label={book.publicationYear} variant="outlined" />
                        {book.language && <Chip label={book.language} variant="outlined" />}
                        {book.pageCount && <Chip label={`${book.pageCount} sayfa`} variant="outlined" />}
                    </Stack>

                    {book.description && (
                        <>
                            <Typography variant="h6" gutterBottom>
                                Tanıtım
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
                                {book.description}
                            </Typography>
                        </>
                    )}

                    <Divider sx={{ mb: 3 }} />

                    <Grid container spacing={2}>
                        <Grid item xs={6} sm={4}>
                            <Typography variant="caption" color="text.secondary">
                                ISBN
                            </Typography>
                            <Typography variant="body2">{book.isbn}</Typography>
                        </Grid>
                        <Grid item xs={6} sm={4}>
                            <Typography variant="caption" color="text.secondary">
                                Yayınevi
                            </Typography>
                            <Typography variant="body2">{book.publisher || '—'}</Typography>
                        </Grid>
                        <Grid item xs={6} sm={4}>
                            <Typography variant="caption" color="text.secondary">
                                Dil
                            </Typography>
                            <Typography variant="body2">{book.language || '—'}</Typography>
                        </Grid>
                        <Grid item xs={6} sm={4}>
                            <Typography variant="caption" color="text.secondary">
                                Sayfa Sayısı
                            </Typography>
                            <Typography variant="body2">{book.pageCount || '—'}</Typography>
                        </Grid>
                        <Grid item xs={6} sm={4}>
                            <Typography variant="caption" color="text.secondary">
                                Yayın Yılı
                            </Typography>
                            <Typography variant="body2">{book.publicationYear}</Typography>
                        </Grid>
                        <Grid item xs={6} sm={4}>
                            <Typography variant="caption" color="text.secondary">
                                Kategori
                            </Typography>
                            <Typography variant="body2">{book.category?.name || '—'}</Typography>
                        </Grid>
                    </Grid>

                    {book.author?.biography && (
                        <>
                            <Divider sx={{ my: 3 }} />
                            <Typography variant="h6" gutterBottom>
                                Yazar Hakkında
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                                {book.author.biography}
                            </Typography>
                        </>
                    )}
                </Grid>
            </Grid>

            <Snackbar
                open={!!snackbar}
                autoHideDuration={4000}
                onClose={() => setSnackbar(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                {snackbar && (
                    <Alert severity={snackbar.severity} onClose={() => setSnackbar(null)}>
                        {snackbar.message}
                    </Alert>
                )}
            </Snackbar>
        </Box>
    );
}

export default BookDetail;
