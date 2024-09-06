import React from 'react';

const BookList = ({ books }) => {
    if (!books || books.length === 0) {
        return <p>Yükleniyor veya kitap bulunamadı...</p>;
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Kitap Listesi</h1>
            <div className="row">
                {books.map(book => (
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
                ))}
            </div>
        </div>
    );
};

export default BookList;
