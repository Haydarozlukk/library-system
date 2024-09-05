import React, { useState, useEffect } from 'react';
import './App.css';  // CSS dosyasını burada içe aktarın
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap'i ekleyin

const App = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5173/api/books')
            .then(response => response.json())
            .then(data => {
                setBooks(data);
            })
            .catch(error => console.error('Veri çekilirken hata oluştu:', error));
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Kitap Listesi</h1>
            <div className="row">
                {books.length > 0 ? (
                    books.map(book => (
                        <div className="col-md-4 mb-4" key={book.id}>
                            <div className="card h-100 shadow-sm rounded">
                                <div className="card-body">
                                    <h5 className="card-title">{book.title}</h5>
                                    <p className="card-text">
                                        <strong>Yazar:</strong> {book.author.name}<br />
                                        <strong>Kategori:</strong> {book.category.name}<br />
                                        <strong>ISBN:</strong> {book.isbn}<br />
                                        <strong>Yayın Yılı:</strong> {book.publicationYear}
                                    </p>
                                    <a href="#" className="btn btn-primary">Detayları Gör</a>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Yükleniyor...</p>
                )}
            </div>
        </div>
    );
}

export default App;
