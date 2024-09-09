import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';

function AuthorList() {
    const [authors, setAuthors] = useState([]);
    const [newAuthor, setNewAuthor] = useState({ name: '', age: '', memleket: '' });

    useEffect(() => {
        fetchAuthors();
    }, []);

    const fetchAuthors = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/authors');
            setAuthors(response.data);
        } catch (error) {
            console.error("Error fetching authors", error);
        }
    };

    const createAuthor = async () => {
        if (!newAuthor.name || !newAuthor.age || !newAuthor.memleket) {
            alert("All fields are required!");
            return;
        }

        try {
            await axios.post('http://localhost:8081/api/authors', newAuthor);
            fetchAuthors();
            setNewAuthor({ name: '', age: '', memleket: '' });
            alert("Author created successfully!");
        } catch (error) {
            console.error("Error creating author", error);
            alert("There was an error creating the author.");
        }
    };

    return (
        <div style={{ marginTop: '50px' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Author Management
            </Typography>

            <Grid container spacing={3} justifyContent="center">

                {/* Yazar Listesi */}
                <Grid item xs={12} md={8}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="div" gutterBottom>
                                Author List
                            </Typography>

                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Age</TableCell>
                                            <TableCell>Hometown</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {authors.map((author) => (
                                            <TableRow key={author.id}>
                                                <TableCell>{author.name}</TableCell>
                                                <TableCell>{author.age}</TableCell>
                                                <TableCell>{author.memleket}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Yeni Yazar Ekleme Formu */}
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="div" gutterBottom>
                                Create New Author
                            </Typography>
                            <form noValidate autoComplete="off">
                                <TextField
                                    label="Name"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={newAuthor.name}
                                    onChange={(e) => setNewAuthor({ ...newAuthor, name: e.target.value })}
                                />

                                <TextField
                                    label="Age"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    type="number"
                                    value={newAuthor.age}
                                    onChange={(e) => setNewAuthor({ ...newAuthor, age: e.target.value })}
                                />

                                <TextField
                                    label="Hometown"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={newAuthor.memleket}
                                    onChange={(e) => setNewAuthor({ ...newAuthor, memleket: e.target.value })}
                                />

                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ marginTop: '20px' }}
                                    fullWidth
                                    onClick={createAuthor}
                                >
                                    Create Author
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}

export default AuthorList;
