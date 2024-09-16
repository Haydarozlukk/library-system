import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Paper, Typography, CircularProgress } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import axios from 'axios';

function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({ name: '' });
    const [selectedCategoryBooks, setSelectedCategoryBooks] = useState([]); // Seçilen kategoriye ait kitaplar
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:8081/api/categories');
            setCategories(response.data);
        } catch (error) {
            setError("Kategoriler getirilirken bir hata oluştu.");
            console.error("Kategoriler getirilirken hata oluştu", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchBooksByCategory = async (categoryId) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:8081/api/categories/${categoryId}/books`);
            setSelectedCategoryBooks(response.data);
            console.log("Fetched books: ", response.data); // Kitapları kontrol etmek için log ekliyoruz
        } catch (error) {
            setError("Kitaplar getirilirken bir hata oluştu.");
            console.error("Kitaplar getirilirken hata oluştu", error);
            setSelectedCategoryBooks([]); // Hata durumunda boş bir liste atıyoruz
        } finally {
            setLoading(false);
        }
    };

    const createCategory = async () => {
        if (!newCategory.name) {
            alert("Kategori ismi zorunludur!");
            return;
        }

        try {
            await axios.post('http://localhost:8081/api/categories', newCategory);
            setNewCategory({ name: '' });
            fetchCategories();
            alert("Kategori başarıyla oluşturuldu!");
        } catch (error) {
            console.error("Kategori oluşturulurken hata oluştu", error);
            alert("Kategori oluşturulurken bir hata oluştu.");
        }
    };

    const deleteCategory = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/api/categories/${id}`);
            setCategories(categories.filter((category) => category.id !== id));
            alert("Kategori başarıyla silindi!");
        } catch (error) {
            console.error("Kategori silinirken hata oluştu", error);
            alert("Kategori silinirken bir hata oluştu.");
        }
    };

    return (
        <div style={{ marginTop: '50px', padding: '20px' }}>
            <Typography
                variant="h4"
                align="center"
                gutterBottom
                style={{ fontWeight: 'bold', fontSize: '2rem', color: '#3f51b5' }}>
                Kategori Listesi
            </Typography>

            {loading ? (
                <CircularProgress style={{ display: 'block', margin: '20px auto' }} />
            ) : error ? (
                <Typography color="error" align="center">{error}</Typography>
            ) : (
                <Grid container spacing={3} style={{ marginTop: '20px' }}>
                    {categories.map((category) => (
                        <Grid item xs={12} sm={6} md={6} key={category.id}>
                            <Paper
                                style={{ padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="body1">{category.name}</Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => fetchBooksByCategory(category.id)}
                                >
                                    Kitapları Göster
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<DeleteIcon />}
                                    onClick={() => deleteCategory(category.id)}
                                >
                                    Sil
                                </Button>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* Seçilen Kategoriye Ait Kitaplar */}
            {selectedCategoryBooks.length > 0 && (
                <div style={{ marginTop: '30px' }}>
                    <Typography
                        variant="h5"
                        gutterBottom
                        style={{ fontWeight: 'bold', fontSize: '1.8rem', color: '#3f51b5' }}>
                        Kategorideki Kitaplar
                    </Typography>
                    <Grid container spacing={3}>
                        {selectedCategoryBooks.map((book) => (
                            <Grid item xs={12} sm={6} md={4} key={book.id}>
                                <Paper style={{ padding: '10px' }}>
                                    <Typography variant="h6">{book.title}</Typography>
                                    <Typography>{book.isbn}</Typography>
                                    <Typography>{book.publicationYear}</Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            )}

            <Typography
                variant="h5"
                style={{ marginTop: '40px', fontWeight: 'bold', fontSize: '1.5rem', color: '#3f51b5' }}>
                Yeni Kategori Oluştur
            </Typography>

            <Grid container spacing={2} style={{ marginTop: '20px' }}>
                <Grid item xs={12}>
                    <TextField
                        label="Kategori İsmi"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    />
                </Grid>
            </Grid>

            <Button
                variant="contained"
                color="primary"
                style={{ marginTop: '20px', padding: '10px 20px', fontSize: '1rem', fontWeight: 'bold' }}
                onClick={createCategory}
            >
                Kategori Oluştur
            </Button>
        </div>
    );
}

export default CategoryList;
