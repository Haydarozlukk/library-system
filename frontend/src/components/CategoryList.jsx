import React, { useState, useEffect } from 'react';
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
        try {
            await axios.post('http://localhost:8081/api/categories', newCategory);
            setNewCategory({ name: '' }); // Formu sıfırlar
            fetchCategories();
        } catch (error) {
            console.error("Error creating category", error);
        }
    };

    const deleteCategory = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/api/categories/${id}`);
            fetchCategories();
        } catch (error) {
            console.error("Error deleting category", error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Category List</h2>

            {/* Kategori Listesi */}
            <table className="table table-striped table-bordered mt-4">
                <thead className="thead-dark">
                <tr>
                    <th>Category Name</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {categories.map((category) => (
                    <tr key={category.id}>
                        <td>{category.name}</td>
                        <td>
                            <button
                                className="btn btn-danger"
                                onClick={() => deleteCategory(category.id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Yeni Kategori Ekleme Formu */}
            <h3 className="mt-5">Create New Category</h3>
            <form className="mt-3">
                <div className="form-group">
                    <label htmlFor="categoryName">Category Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="categoryName"
                        placeholder="Enter category name"
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    />
                </div>

                <button
                    type="button"
                    className="btn btn-primary mt-3"
                    onClick={createCategory}>
                    Create Category
                </button>
            </form>
        </div>
    );
}

export default CategoryList;
