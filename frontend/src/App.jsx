import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookList from './components/BookList';

const App = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5173/api/books') // API'den kitap verilerini çekiyor
            .then(response => response.json())
            .then(data => {
                setBooks(data);
            })
            .catch(error => console.error('Veri çekilirken hata oluştu:', error));
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/kitaplistele" element={<BookList books={books} />} />
            </Routes>
        </Router>
    );
};

export default App;
