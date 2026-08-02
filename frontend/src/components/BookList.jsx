import React, { useState, useEffect, useCallback } from 'react';
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    TextField,
    Button,
    CircularProgress,
    Box,
    Paper,
    Chip,
    Stack,
    IconButton,
    MenuItem,
    Snackbar,
    Alert,
    Pagination,
    InputAdornment,
} from '@mui/material';
import { Add as AddIcon, MenuBookRounded, BookmarkAddRounded, SearchRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import { useAuth } from '../context/AuthContext';

const PAGE_SIZE = 24;

const emptyBook = {
    title: '',
    isbn: '',
    publicationYear: '',
    author: '',
    category: '',
    imageUrl: '',
    description: '',
    pageCount: '',
    language: '',
    publisher: '',
};

function BookList() {
    const [books, setBooks] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [page, setPage] = useState(1);
    const [searchInput, setSearchInput] = useState('');
    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [newBook, setNewBook] = useState(emptyBook);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [snackbar, setSnackbar] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const { isAdmin, isCustomer, isLoggedIn } = useAuth();
    const navigate = useNavigate();

    const fetchBooks = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosClient.get('/api/books', {
                params: {
                    page: page - 1,
                    size: PAGE_SIZE,
                    search: search || undefined,
                    categoryId: categoryFilter || undefined,
                },
            });
            setBooks(response.data.content);
            setTotalPages(response.data.totalPages);
            setTotalElements(response.data.totalElements);
        } catch (err) {
            setError('Kitaplar getirilirken bir hata oluştu.');
            console.error('Kitaplar getirilirken hata oluştu', err);
        } finally {
            setLoading(false);
        }
    }, [page, search, categoryFilter]);

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    useEffect(() => {
        axiosClient.get('/api/categories').then((res) => setCategories(res.data));
    }, []);

    useEffect(() => {
        if (isAdmin) {
            axiosClient.get('/api/authors').then((res) => setAuthors(res.data));
        }
    }, [isAdmin]);

    const applySearch = () => {
        setPage(1);
        setSearch(searchInput);
    };

    const createBook = async () => {
        if (!newBook.title || !newBook.isbn || !newBook.publicationYear || !newBook.author || !newBook.category) {
            setSnackbar({ severity: 'warning', message: 'Başlık, ISBN, yayın yılı, yazar ve kategori zorunludur.' });
            return;
        }

        try {
            await axiosClient.post('/api/books', {
                ...newBook,
                imageUrl: newBook.imageUrl || null,
                pageCount: newBook.pageCount ? Number(newBook.pageCount) : null,
                author: { id: newBook.author },
                category: { id: newBook.category },
            });
            fetchBooks();
            setNewBook(emptyBook);
            setSnackbar({ severity: 'success', message: 'Kitap başarıyla oluşturuldu!' });
        } catch (err) {
            console.error('Kitap oluşturulurken hata oluştu', err);
            setSnackbar({ severity: 'error', message: 'Kitap oluşturulurken bir hata oluştu.' });
        }
    };

    const borrowBook = async (event, book) => {
        event.stopPropagation();
        if (!isLoggedIn) {
            setSnackbar({ severity: 'info', message: 'Ödünç almak için giriş yapmalısınız.' });
            navigate('/login', { state: { from: '/books' } });
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

    return (
        <Box>
            <Stack direction="row" alignItems="baseline" justifyContent="space-between" sx={{ mb: 3 }}>
                <Typography variant="h4">Kitaplar</Typography>
                <Chip label={`${totalElements.toLocaleString('tr-TR')} kitap`} size="small" />
            </Stack>

            <Paper sx={{ p: 2, mb: 3 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <TextField
                        fullWidth
                        placeholder="Kitap adı veya yazar ara..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && applySearch()}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchRounded color="action" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        select
                        label="Kategori"
                        value={categoryFilter}
                        onChange={(e) => {
                            setPage(1);
                            setCategoryFilter(e.target.value);
                        }}
                        sx={{ minWidth: 200 }}
                    >
                        <MenuItem value="">Tümü</MenuItem>
                        {categories.map((c) => (
                            <MenuItem key={c.id} value={c.id}>
                                {c.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button variant="contained" onClick={applySearch} sx={{ whiteSpace: 'nowrap' }}>
                        Ara
                    </Button>
                </Stack>
            </Paper>

            {loading ? (
                <CircularProgress sx={{ display: 'block', mx: 'auto', my: 6 }} />
            ) : error ? (
                <Typography color="error" align="center">{error}</Typography>
            ) : books.length === 0 ? (
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                    <Typography color="text.secondary">Aramanla eşleşen kitap bulunamadı.</Typography>
                </Paper>
            ) : (
                <>
                    <Grid container spacing={3}>
                        {books.map((book) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
                                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <CardActionArea
                                        onClick={() => navigate(`/books/${book.id}`)}
                                        sx={{ flexGrow: 1, alignItems: 'stretch', display: 'flex', flexDirection: 'column' }}
                                    >
                                        {book.imageUrl ? (
                                            <CardMedia
                                                component="img"
                                                image={book.imageUrl}
                                                alt={book.title}
                                                sx={{ height: 260, objectFit: 'contain', bgcolor: '#F7F8FA', p: 1 }}
                                            />
                                        ) : (
                                            <Box
                                                sx={{
                                                    height: 260,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    bgcolor: 'rgba(15,95,166,0.06)',
                                                }}
                                            >
                                                <MenuBookRounded sx={{ fontSize: 48, color: 'primary.main', opacity: 0.5 }} />
                                            </Box>
                                        )}
                                        <CardContent sx={{ flexGrow: 1, width: '100%' }}>
                                            <Typography
                                                variant="subtitle1"
                                                sx={{
                                                    fontWeight: 700,
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                    minHeight: 48,
                                                }}
                                            >
                                                {book.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" noWrap sx={{ mb: 1 }}>
                                                {book.author?.name || 'Bilinmeyen yazar'}
                                            </Typography>
                                            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                                {book.category?.name && (
                                                    <Chip size="small" label={book.category.name} color="primary" variant="outlined" />
                                                )}
                                                {book.publicationYear > 0 && (
                                                    <Chip size="small" label={book.publicationYear} variant="outlined" />
                                                )}
                                            </Stack>
                                        </CardContent>
                                    </CardActionArea>
                                    {!isAdmin && (
                                        <Box sx={{ px: 2, pb: 2, display: 'flex', justifyContent: 'flex-end' }}>
                                            <IconButton
                                                sx={{ bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' } }}
                                                onClick={(e) => borrowBook(e, book)}
                                                title="Ödünç Al"
                                            >
                                                <BookmarkAddRounded fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    )}
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    {totalPages > 1 && (
                        <Stack alignItems="center" sx={{ mt: 5 }}>
                            <Pagination
                                count={totalPages}
                                page={page}
                                onChange={(_, value) => {
                                    setPage(value);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                color="primary"
                                siblingCount={1}
                            />
                        </Stack>
                    )}
                </>
            )}

            {isAdmin && (
                <Box sx={{ mt: 5 }}>
                    <Button variant="outlined" onClick={() => setShowCreateForm((v) => !v)}>
                        {showCreateForm ? 'Formu Gizle' : 'Elle Kitap Ekle'}
                    </Button>

                    {showCreateForm && (
                        <Paper sx={{ p: { xs: 3, md: 4 }, mt: 2 }}>
                            <Typography variant="h5" gutterBottom>
                                Yeni Kitap Oluştur
                            </Typography>
                            <Grid container spacing={2} sx={{ mt: 0.5 }}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Başlık"
                                        fullWidth
                                        value={newBook.title}
                                        onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="ISBN"
                                        fullWidth
                                        value={newBook.isbn}
                                        onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        label="Yayın Yılı"
                                        fullWidth
                                        type="number"
                                        value={newBook.publicationYear}
                                        onChange={(e) => setNewBook({ ...newBook, publicationYear: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        label="Sayfa Sayısı"
                                        fullWidth
                                        type="number"
                                        value={newBook.pageCount}
                                        onChange={(e) => setNewBook({ ...newBook, pageCount: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        label="Dil"
                                        fullWidth
                                        value={newBook.language}
                                        onChange={(e) => setNewBook({ ...newBook, language: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        select
                                        label="Yazar"
                                        fullWidth
                                        value={newBook.author}
                                        onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                                    >
                                        {authors.map((author) => (
                                            <MenuItem key={author.id} value={author.id}>
                                                {author.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        select
                                        label="Kategori"
                                        fullWidth
                                        value={newBook.category}
                                        onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
                                    >
                                        {categories.map((category) => (
                                            <MenuItem key={category.id} value={category.id}>
                                                {category.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Yayınevi"
                                        fullWidth
                                        value={newBook.publisher}
                                        onChange={(e) => setNewBook({ ...newBook, publisher: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Kapak Resmi URL"
                                        fullWidth
                                        value={newBook.imageUrl}
                                        onChange={(e) => setNewBook({ ...newBook, imageUrl: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Tanıtım Yazısı"
                                        fullWidth
                                        multiline
                                        minRows={3}
                                        value={newBook.description}
                                        onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                                    />
                                </Grid>
                            </Grid>

                            <Button variant="contained" startIcon={<AddIcon />} sx={{ mt: 3 }} onClick={createBook}>
                                Kitap Oluştur
                            </Button>
                        </Paper>
                    )}
                </Box>
            )}

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

export default BookList;
