import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Paper, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import axios from 'axios';

function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [newCustomer, setNewCustomer] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
        phoneNumber: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:8081/api/customer/all');
            setCustomers(response.data);
        } catch (error) {
            setError("Müşteriler getirilirken bir hata oluştu.");
            console.error("Müşteriler getirilirken hata oluştu", error);
        } finally {
            setLoading(false);
        }
    };

    const createCustomer = async () => {
        if (!newCustomer.name || !newCustomer.email || !newCustomer.password || !newCustomer.address || !newCustomer.phoneNumber) {
            alert("Tüm alanlar doldurulmalıdır!");
            return;
        }

        try {
            await axios.post('http://localhost:8081/api/customer/create', newCustomer);
            setNewCustomer({
                name: '',
                email: '',
                password: '',
                address: '',
                phoneNumber: ''
            });
            fetchCustomers();
            alert("Müşteri başarıyla oluşturuldu!");
        } catch (error) {
            console.error("Müşteri oluşturulurken hata oluştu", error);
            alert("Müşteri oluşturulurken bir hata oluştu.");
        }
    };

    const deleteCustomer = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/api/customer/delete/${id}`);
            fetchCustomers();
            alert("Müşteri başarıyla silindi!");
        } catch (error) {
            console.error("Müşteri silinirken hata oluştu", error);
            alert("Müşteri silinirken bir hata oluştu.");
        }
    };

    return (
        <div style={{ marginTop: '50px', padding: '20px' }}>
            <Typography
                variant="h4"
                align="center"
                gutterBottom
                style={{ fontWeight: 'bold', fontSize: '2rem', color: '#3f51b5' }}>
                Müşteri Listesi
            </Typography>

            {loading ? (
                <CircularProgress style={{ display: 'block', margin: '20px auto' }} />
            ) : error ? (
                <Typography color="error" align="center">{error}</Typography>
            ) : (
                <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>İsim</strong></TableCell>
                                <TableCell><strong>Email</strong></TableCell>
                                <TableCell><strong>Adres</strong></TableCell>
                                <TableCell><strong>Telefon Numarası</strong></TableCell>
                                <TableCell><strong>İşlemler</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customers.map((customer) => (
                                <TableRow key={customer.id}>
                                    <TableCell>{customer.name}</TableCell>
                                    <TableCell>{customer.email}</TableCell>
                                    <TableCell>{customer.address}</TableCell>
                                    <TableCell>{customer.phoneNumber}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            startIcon={<DeleteIcon />}
                                            onClick={() => deleteCustomer(customer.id)}
                                        >
                                            Sil
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <Typography
                variant="h5"
                style={{ marginTop: '40px', fontWeight: 'bold', fontSize: '1.5rem', color: '#3f51b5' }}>
                Yeni Müşteri Oluştur
            </Typography>

            <Grid container spacing={2} style={{ marginTop: '20px' }}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="İsim"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={newCustomer.name}
                        onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={newCustomer.email}
                        onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Şifre"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="password"
                        value={newCustomer.password}
                        onChange={(e) => setNewCustomer({ ...newCustomer, password: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Adres"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={newCustomer.address}
                        onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Telefon Numarası"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={newCustomer.phoneNumber}
                        onChange={(e) => setNewCustomer({ ...newCustomer, phoneNumber: e.target.value })}
                    />
                </Grid>
            </Grid>

            <Button
                variant="contained"
                color="primary"
                style={{ marginTop: '20px', padding: '10px 20px', fontSize: '1rem', fontWeight: 'bold' }}
                onClick={createCustomer}
            >
                Müşteri Oluştur
            </Button>
        </div>
    );
}

export default CustomerList;
