import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AuthorList() {
    const [authors, setAuthors] = useState([]);
    const [newAuthor, setNewAuthor] = useState({ name: '', age: '', memleket: '' });

    useEffect(() => {
        fetchAuthors();
    }, []);

    const fetchAuthors = async () => {
        const response = await axios.get('http://localhost:8081/api/authors');
        setAuthors(response.data);
    };

    const createAuthor = async () => {
        await axios.post('http://localhost:8081/api/authors', newAuthor);
        fetchAuthors();
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Author List</h2>

            {/* Author Listesi */}
            <table className="table table-striped table-bordered mt-4">
                <thead className="thead-dark">
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Hometown</th>
                </tr>
                </thead>
                <tbody>
                {authors.map((author) => (
                    <tr key={author.id}>
                        <td>{author.name}</td>
                        <td>{author.age}</td>
                        <td>{author.memleket}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Yeni Yazar Ekleme Formu */}
            <h3 className="mt-5">Create New Author</h3>
            <form className="mt-3">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter name"
                        value={newAuthor.name}
                        onChange={(e) => setNewAuthor({ ...newAuthor, name: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input
                        type="number"
                        className="form-control"
                        id="age"
                        placeholder="Enter age"
                        value={newAuthor.age}
                        onChange={(e) => setNewAuthor({ ...newAuthor, age: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="memleket">Hometown</label>
                    <input
                        type="text"
                        className="form-control"
                        id="memleket"
                        placeholder="Enter hometown"
                        value={newAuthor.memleket}
                        onChange={(e) => setNewAuthor({ ...newAuthor, memleket: e.target.value })}
                    />
                </div>

                <button
                    type="button"
                    className="btn btn-primary mt-3"
                    onClick={createAuthor}
                >
                    Create Author
                </button>
            </form>
        </div>
    );
}

export default AuthorList;
