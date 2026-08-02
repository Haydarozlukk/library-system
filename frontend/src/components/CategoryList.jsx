import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Paper, Typography, CircularProgress, Box, Stack, Chip } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import axiosClient from '../api/axiosClient';
import { useAuth } from '../context/AuthContext';

function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({ name: '' });
    const [selectedCategoryBooks, setSelectedCategoryBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { isAdmin } = useAuth();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosClient.get('/api/categories');
            setCategories(response.data);
        } catch (error) {
            setError('Kategoriler getirilirken bir hata oluştu.');
            console.error('Kategoriler getirilirken hata oluştu', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchBooksByCategory = async (categoryId) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosClient.get(`/api/categories/${categoryId}/books`);
            setSelectedCategoryBooks(response.data);
        } catch (error) {
            setError('Kitaplar getirilirken bir hata oluştu.');
            console.error('Kitaplar getirilirken hata oluştu', error);
            setSelectedCategoryBooks([]);
        } finally {
            setLoading(false);
        }
    };

    const createCategory = async () => {
        if (!newCategory.name) {
            alert('Kategori ismi zorunludur!');
            return;
        }

        try {
            await axiosClient.post('/api/categories', newCategory);
            setNewCategory({ name: '' });
            fetchCategories();
            alert('Kategori başarıyla oluşturuldu!');
        } catch (error) {
            console.error('Kategori oluşturulurken hata oluştu', error);
            alert('Kategori oluşturulurken bir hata oluştu.');
        }
    };

    const deleteCategory = async (id) => {
        try {
            await axiosClient.delete(`/api/categories/${id}`);
            setCategories(categories.filter((category) => category.id !== id));
            alert('Kategori başarıyla silindi!');
        } catch (error) {
            console.error('Kategori silinirken hata oluştu', error);
            alert('Kategori silinirken bir hata oluştu.');
        }
    };

    return (
        <Box>
            <Stack direction="row" alignItems="baseline" justifyContent="space-between" sx={{ mb: 3 }}>
                <Typography variant="h4">Kategoriler</Typography>
                <Chip label={`${categories.length} kayıt`} size="small" />
            </Stack>

            {loading ? (
                <CircularProgress sx={{ display: 'block', mx: 'auto', my: 6 }} />
            ) : error ? (
                <Typography color="error" align="center">{error}</Typography>
            ) : categories.length === 0 ? (
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                    <Typography color="text.secondary">Henüz kayıtlı kategori yok.</Typography>
                </Paper>
            ) : (
                <Grid container spacing={2}>
                    {categories.map((category) => (
                        <Grid item xs={12} sm={6} md={4} key={category.id}>
                            <Paper
                                sx={{
                                    p: 2.5,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 1.5,
                                }}
                            >
                                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                    {category.name}
                                </Typography>
                                <Stack direction="row" spacing={1}>
                                    <Button size="small" variant="outlined" onClick={() => fetchBooksByCategory(category.id)}>
                                        Kitapları Göster
                                    </Button>
                                    {isAdmin && (
                                        <Button
                                            size="small"
                                            color="error"
                                            variant="text"
                                            startIcon={<DeleteIcon fontSize="small" />}
                                            onClick={() => deleteCategory(category.id)}
                                        >
                                            Sil
                                        </Button>
                                    )}
                                </Stack>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            )}

            {selectedCategoryBooks.length > 0 && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Kategorideki Kitaplar
                    </Typography>
                    <Grid container spacing={2}>
                        {selectedCategoryBooks.map((book) => (
                            <Grid item xs={12} sm={6} md={4} key={book.id}>
                                <Paper sx={{ p: 2.5 }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                        {book.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {book.isbn} · {book.publicationYear}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}

            {isAdmin && (
                <Paper sx={{ p: { xs: 3, md: 4 }, mt: 5 }}>
                    <Typography variant="h5" gutterBottom>
                        Yeni Kategori Oluştur
                    </Typography>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 1 }}>
                        <TextField
                            label="Kategori İsmi"
                            fullWidth
                            value={newCategory.name}
                            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                        />
                        <Button variant="contained" onClick={createCategory} sx={{ whiteSpace: 'nowrap' }}>
                            Kategori Oluştur
                        </Button>
                    </Stack>
                </Paper>
            )}
        </Box>
    );
}

export default CategoryList;
