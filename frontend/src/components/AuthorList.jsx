import React, { useState, useEffect, useCallback } from 'react';
import {
    Grid,
    TextField,
    Button,
    Typography,
    CircularProgress,
    Avatar,
    Box,
    Paper,
    Stack,
    Chip,
    Pagination,
    InputAdornment,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import { MenuBookRounded, SearchRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import { useAuth } from '../context/AuthContext';

const PAGE_SIZE = 24;

function AuthorList() {
    const [authors, setAuthors] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [searchInput, setSearchInput] = useState('');
    const [search, setSearch] = useState('');
    const [newAuthor, setNewAuthor] = useState({ name: '', age: '', memleket: '', imageUrl: '', biography: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedAuthor, setSelectedAuthor] = useState(null);
    const [authorBooks, setAuthorBooks] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const { isAdmin } = useAuth();
    const navigate = useNavigate();

    const fetchAuthors = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosClient.get('/api/authors/paged', {
                params: { page: page - 1, size: PAGE_SIZE, search },
            });
            setAuthors(response.data.content);
            setTotalPages(response.data.totalPages);
            setTotalElements(response.data.totalElements);
        } catch (err) {
            setError('Yazarlar getirilirken bir hata oluştu.');
            console.error('Yazarlar getirilirken hata oluştu', err);
        } finally {
            setLoading(false);
        }
    }, [page, search]);

    useEffect(() => {
        fetchAuthors();
    }, [fetchAuthors]);

    const applySearch = () => {
        setPage(1);
        setSearch(searchInput);
    };

    const createAuthor = async () => {
        if (!newAuthor.name) {
            alert('Yazar ismi zorunludur!');
            return;
        }

        try {
            await axiosClient.post('/api/authors', {
                ...newAuthor,
                age: newAuthor.age ? Number(newAuthor.age) : null,
                imageUrl: newAuthor.imageUrl || null,
            });
            fetchAuthors();
            setNewAuthor({ name: '', age: '', memleket: '', imageUrl: '', biography: '' });
            alert('Yazar başarıyla eklendi!');
        } catch (err) {
            console.error('Yazar oluşturulurken hata oluştu', err);
            alert('Yazar oluşturulurken bir hata oluştu.');
        }
    };

    const openAuthorBooks = async (author) => {
        setSelectedAuthor(author);
        setAuthorBooks([]);
        try {
            const response = await axiosClient.get(`/api/authors/${author.id}/books`);
            setAuthorBooks(response.data);
        } catch (err) {
            console.error('Yazarın kitapları getirilirken hata oluştu', err);
            setAuthorBooks([]);
        }
    };

    return (
        <Box>
            <Stack direction="row" alignItems="baseline" justifyContent="space-between" sx={{ mb: 3 }}>
                <Typography variant="h4">Yazarlar</Typography>
                <Chip label={`${totalElements.toLocaleString('tr-TR')} yazar`} size="small" />
            </Stack>

            <Paper sx={{ p: 2, mb: 3 }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                        fullWidth
                        placeholder="Yazar ara..."
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
                    <Button variant="contained" onClick={applySearch} sx={{ whiteSpace: 'nowrap' }}>
                        Ara
                    </Button>
                </Stack>
            </Paper>

            {loading ? (
                <CircularProgress sx={{ display: 'block', mx: 'auto', my: 6 }} />
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : authors.length === 0 ? (
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                    <Typography color="text.secondary">Aramanla eşleşen yazar bulunamadı.</Typography>
                </Paper>
            ) : (
                <>
                    <Grid container spacing={2}>
                        {authors.map((author) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={author.id}>
                                <Paper
                                    sx={{
                                        p: 2.5,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        gap: 1.5,
                                        height: '100%',
                                    }}
                                >
                                    <Avatar
                                        alt={author.name}
                                        src={author.imageUrl}
                                        sx={{ width: 80, height: 80, bgcolor: 'primary.main', fontSize: 28 }}
                                    >
                                        {author.name?.[0]}
                                    </Avatar>
                                    <Box>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                            {author.name}
                                        </Typography>
                                        {(author.memleket || author.age) && (
                                            <Typography variant="body2" color="text.secondary">
                                                {[author.memleket, author.age ? `${author.age} yaşında` : null]
                                                    .filter(Boolean)
                                                    .join(' · ')}
                                            </Typography>
                                        )}
                                    </Box>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => openAuthorBooks(author)}
                                        sx={{ mt: 'auto' }}
                                    >
                                        Kitapları Göster
                                    </Button>
                                </Paper>
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
                            />
                        </Stack>
                    )}
                </>
            )}

            {isAdmin && (
                <Box sx={{ mt: 5 }}>
                    <Button variant="outlined" onClick={() => setShowCreateForm((v) => !v)}>
                        {showCreateForm ? 'Formu Gizle' : 'Yeni Yazar Ekle'}
                    </Button>
                    {showCreateForm && (
                        <Paper sx={{ p: 3, mt: 2, maxWidth: 520 }}>
                            <Typography variant="h6" gutterBottom>
                                Yeni Yazar Oluştur
                            </Typography>
                            <Stack spacing={2} component="form" noValidate autoComplete="off">
                                <TextField
                                    label="İsim"
                                    fullWidth
                                    required
                                    value={newAuthor.name}
                                    onChange={(e) => setNewAuthor({ ...newAuthor, name: e.target.value })}
                                />
                                <TextField
                                    label="Yaş"
                                    fullWidth
                                    type="number"
                                    value={newAuthor.age}
                                    onChange={(e) => setNewAuthor({ ...newAuthor, age: e.target.value })}
                                />
                                <TextField
                                    label="Memleket"
                                    fullWidth
                                    value={newAuthor.memleket}
                                    onChange={(e) => setNewAuthor({ ...newAuthor, memleket: e.target.value })}
                                />
                                <TextField
                                    label="Görsel URL"
                                    fullWidth
                                    value={newAuthor.imageUrl}
                                    onChange={(e) => setNewAuthor({ ...newAuthor, imageUrl: e.target.value })}
                                />
                                <TextField
                                    label="Biyografi"
                                    fullWidth
                                    multiline
                                    minRows={3}
                                    value={newAuthor.biography}
                                    onChange={(e) => setNewAuthor({ ...newAuthor, biography: e.target.value })}
                                />
                                <Button variant="contained" onClick={createAuthor}>
                                    Yazar Oluştur
                                </Button>
                            </Stack>
                        </Paper>
                    )}
                </Box>
            )}

            <Dialog open={!!selectedAuthor} onClose={() => setSelectedAuthor(null)} fullWidth maxWidth="sm">
                <DialogTitle>{selectedAuthor?.name} — Kitapları</DialogTitle>
                <DialogContent dividers>
                    {selectedAuthor?.biography && (
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.7 }}>
                            {selectedAuthor.biography}
                        </Typography>
                    )}
                    {authorBooks.length === 0 ? (
                        <Typography color="text.secondary">Bu yazarın kayıtlı kitabı yok.</Typography>
                    ) : (
                        <Stack spacing={2}>
                            {authorBooks.map((book) => (
                                <Stack
                                    key={book.id}
                                    direction="row"
                                    spacing={2}
                                    alignItems="center"
                                    sx={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        setSelectedAuthor(null);
                                        navigate(`/books/${book.id}`);
                                    }}
                                >
                                    <Avatar
                                        variant="rounded"
                                        alt={book.title}
                                        src={book.imageUrl}
                                        sx={{ width: 44, height: 60, bgcolor: 'rgba(15,95,166,0.08)' }}
                                    >
                                        <MenuBookRounded sx={{ color: 'primary.main', opacity: 0.6 }} fontSize="small" />
                                    </Avatar>
                                    <Box>
                                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                            {book.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {[book.category?.name, book.publicationYear > 0 ? book.publicationYear : null]
                                                .filter(Boolean)
                                                .join(' · ')}
                                        </Typography>
                                    </Box>
                                </Stack>
                            ))}
                        </Stack>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSelectedAuthor(null)}>Kapat</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default AuthorList;
