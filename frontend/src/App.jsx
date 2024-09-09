import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminList from './components/AdminList';
import AuthorList from './components/AuthorList';
import BookList from './components/BookList';
import CategoryList from './components/CategoryList';
import CustomerList from './components/CustomerList';
import UserCreateForm from './components/UserCreateForm';
import HomePage from './components/HomePage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/admins" element={<AdminList />} />
                <Route path="/authors" element={<AuthorList />} />
                <Route path="/books" element={<BookList />} />
                <Route path="/categories" element={<CategoryList />} />
                <Route path="/customers" element={<CustomerList />} />
                <Route path="/create-user" element={<UserCreateForm />} />
            </Routes>
        </Router>
    );
}

export default App;
