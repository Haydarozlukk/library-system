import React, { useState, useEffect } from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import axios from 'axios';

function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({
        name: ''
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/categories');
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories", error);
        }
    };

    const createCategory = async () => {
        if (!newCategory.name) {
            alert("Category name is required!");
            return;
        }

        try {
            await axios.post('http://localhost:8081/api/categories', newCategory);
            setNewCategory({ name: '' }); // Formu sıfırlar
            fetchCategories();
            alert("Category created successfully!");
        } catch (error) {
            console.error("Error creating category", error);
            alert("There was an error creating the category.");
        }
    };

    const deleteCategory = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/api/categories/${id}`);
            setCategories(categories.filter((category) => category.id !== id));
            alert("Category deleted successfully!");
        } catch (error) {
            console.error("Error deleting category", error);
            alert("There was an error deleting the category.");
        }
    };

    return (
        <div style={{ marginTop: '50px' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Category List
            </Typography>

            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Category Name</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((category) => (
                            <TableRow key={category.id}>
                                <TableCell>{category.name}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => deleteCategory(category.id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Typography variant="h5" style={{ marginTop: '40px' }}>
                Create New Category
            </Typography>

            <form noValidate autoComplete="off" style={{ marginTop: '20px' }}>
                <TextField
                    label="Category Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                />

                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: '20px' }}
                    onClick={createCategory}
                >
                    Create Category
                </Button>
            </form>
        </div>
    );
}

export default CategoryList;
