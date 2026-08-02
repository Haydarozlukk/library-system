import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CircularProgress,
    Stack,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    MenuItem,
    Snackbar,
    Alert,
} from '@mui/material';
import { SearchRounded, MenuBookRounded } from '@mui/icons-material';
import axiosClient from '../api/axiosClient';

function OpenLibraryImport() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selected, setSelected] = useState(null);
    const [categoryId, setCategoryId] = useState('');
    const [snackbar, setSnackbar] = useState(null);
    const [importing, setImporting] = useState(false);

    useEffect(() => {
        axiosClient.get('/api/categories').then((res) => setCategories(res.data));
    }, []);

    const search = async () => {
        if (!query.trim()) return;
        setLoading(true);
        try {
            const response = await axiosClient.get('/api/admin/openlibrary/search', { params: { q: query } });
            setResults(response.data);
        } catch (error) {
            console.error('OpenLibrary araması sırasında hata oluştu', error);
            setSnackbar({ severity: 'error', message: 'Arama sırasında bir hata oluştu.' });
        } finally {
            setLoading(false);
        }
    };

    const openImportDialog = (book) => {
        setSelected(book);
        setCategoryId('');
    };

    const confirmImport = async () => {
        if (!categoryId) {
            setSnackbar({ severity: 'warning', message: 'Lütfen bir kategori seçin.' });
            return;
        }
        setImporting(true);
        try {
            await axiosClient.post('/api/admin/openlibrary/import', {
                title: selected.title,
                authorName: selected.authorName,
                isbn: selected.isbn,
                publicationYear: selected.publicationYear,
                coverUrl: selected.coverUrl,
                pageCount: selected.pageCount,
                language: selected.language,
                publisher: selected.publisher,
                categoryId,
            });
            setSnackbar({ severity: 'success', message: `"${selected.title}" kataloğa eklendi.` });
            setSelected(null);
        } catch (error) {
            console.error('İçe aktarma sırasında hata oluştu', error);
            setSnackbar({ severity: 'error', message: 'İçe aktarma sırasında bir hata oluştu.' });
        } finally {
            setImporting(false);
        }
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                OpenLibrary'den İçe Aktar
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Gerçek kitap verisiyle kataloğunu büyüt. Başlık ile ara, bulduğun kitabı bir kategoriye atayarak tek tıkla ekle.
            </Typography>

            <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                <TextField
                    fullWidth
                    label="Kitap adı ara"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && search()}
                />
                <Button variant="contained" startIcon={<SearchRounded />} onClick={search} sx={{ whiteSpace: 'nowrap' }}>
                    Ara
                </Button>
            </Stack>

            {loading ? (
                <CircularProgress sx={{ display: 'block', mx: 'auto', my: 6 }} />
            ) : (
                <Grid container spacing={3}>
                    {results.map((book, idx) => (
                        <Grid item xs={12} sm={6} md={4} key={`${book.openLibraryKey}-${idx}`}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                {book.coverUrl ? (
                                    <CardMedia component="img" height="220" image={book.coverUrl} alt={book.title} />
                                ) : (
                                    <Box
                                        sx={{
                                            height: 220,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            bgcolor: 'rgba(15,95,166,0.06)',
                                        }}
                                    >
                                        <MenuBookRounded sx={{ fontSize: 48, color: 'primary.main', opacity: 0.5 }} />
                                    </Box>
                                )}
                                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }} gutterBottom>
                                        {book.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                        {book.authorName}
                                    </Typography>
                                    <Stack direction="row" spacing={1} sx={{ mb: 2 }} flexWrap="wrap" useFlexGap>
                                        {book.publicationYear && <Chip size="small" label={book.publicationYear} variant="outlined" />}
                                        {book.language && <Chip size="small" label={book.language} variant="outlined" />}
                                    </Stack>
                                    <Button variant="contained" sx={{ mt: 'auto' }} onClick={() => openImportDialog(book)}>
                                        İçe Aktar
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                    {!loading && results.length === 0 && query && (
                        <Grid item xs={12}>
                            <Typography color="text.secondary" align="center">
                                Sonuç bulunamadı.
                            </Typography>
                        </Grid>
                    )}
                </Grid>
            )}

            <Dialog open={!!selected} onClose={() => setSelected(null)} fullWidth maxWidth="xs">
                <DialogTitle>Kataloğa Ekle</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                        <strong>{selected?.title}</strong> — {selected?.authorName}
                    </Typography>
                    <TextField
                        select
                        label="Kategori"
                        fullWidth
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                    >
                        {categories.map((c) => (
                            <MenuItem key={c.id} value={c.id}>
                                {c.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSelected(null)}>Vazgeç</Button>
                    <Button variant="contained" onClick={confirmImport} disabled={importing}>
                        {importing ? 'Ekleniyor...' : 'Ekle'}
                    </Button>
                </DialogActions>
            </Dialog>

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

export default OpenLibraryImport;
