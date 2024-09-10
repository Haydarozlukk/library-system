import React, { useState, useEffect } from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Grid } from '@mui/material';
import axios from 'axios';

function AdminList() {
    const [admins, setAdmins] = useState([]);
    const [newAdmin, setNewAdmin] = useState({ name: '', email: '', password: '', role: '', active: true });

    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/admin/all');
            setAdmins(response.data);
        } catch (error) {
            console.error("Yöneticiler getirilirken hata oluştu.", error);
        }
    };

    const createAdmin = async () => {
        if (!newAdmin.name || !newAdmin.email || !newAdmin.password || !newAdmin.role) {
            alert("Tüm alanların doldurulması zorunludur!");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8081/api/admin/create', newAdmin);
            fetchAdmins(); // Admin eklendikten sonra listeyi yeniler
            alert("Yönetici başarıyla oluşturuldu!");
            setNewAdmin({ name: '', email: '', password: '', role: '', active: true }); // Formu sıfırla
        } catch (error) {
            console.error("Yönetici oluşturulurken hata oluştu.", error.response ? error.response.data : error.message);
            alert("Yönetici oluşturulurken bir hata meydana geldi. Detaylar için konsolu kontrol edin.");
        }
    };

    return (
        <div style={{ marginTop: '50px', padding: '20px' }}>
            <Typography variant="h4" align="center" gutterBottom style={{ fontWeight: 'bold', fontSize: '2rem' }}>
                Yönetici Listesi
            </Typography>

            <TableContainer component={Paper} style={{ marginTop: '20px', padding: '20px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>ID</strong></TableCell>
                            <TableCell><strong>İsim</strong></TableCell>
                            <TableCell><strong>Email</strong></TableCell>
                            <TableCell><strong>Rol</strong></TableCell>
                            <TableCell><strong>Durum</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {admins.map((admin) => (
                            <TableRow key={admin.id}>
                                <TableCell>{admin.id}</TableCell>
                                <TableCell>{admin.name}</TableCell>
                                <TableCell>{admin.email}</TableCell>
                                <TableCell>{admin.role.toUpperCase()}</TableCell>
                                <TableCell>{admin.active ? 'Aktif' : 'Pasif'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Typography variant="h5" style={{ marginTop: '40px', fontWeight: 'bold', fontSize: '1.5rem' }}>
                Yeni Yönetici Oluştur
            </Typography>

            <Grid container spacing={3} style={{ marginTop: '20px' }}>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="İsim"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={newAdmin.name}
                        onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="email"
                        value={newAdmin.email}
                        onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Şifre"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="password"
                        value={newAdmin.password}
                        onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Rol"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={newAdmin.role}
                        onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
                    />
                </Grid>
            </Grid>

            <Button
                variant="contained"
                color="primary"
                style={{ marginTop: '20px', padding: '10px 20px', fontSize: '1rem', fontWeight: 'bold' }}
                onClick={createAdmin}
            >
                Yönetici Oluştur
            </Button>
        </div>
    );
}

export default AdminList;
