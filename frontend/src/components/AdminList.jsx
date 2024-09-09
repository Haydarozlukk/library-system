import React, { useState, useEffect } from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import axios from 'axios';

function AdminList() {
    const [admins, setAdmins] = useState([]);
    const [newAdmin, setNewAdmin] = useState({ name: '', email: '', password: '', role: '', active: true });

    useEffect(() => {
        fetchAdmins();
    }, []);

    // Admin listesini sunucudan getirir
    const fetchAdmins = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/admin/all');
            setAdmins(response.data);
        } catch (error) {
            console.error("Error fetching admins", error);
        }
    };

    // Yeni bir admin oluşturur
    const createAdmin = async () => {
        if (!newAdmin.name || !newAdmin.email || !newAdmin.password || !newAdmin.role) {
            alert("All fields are required!");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8081/api/admin/create', newAdmin);
            console.log("Admin created successfully", response.data);
            fetchAdmins(); // Admin eklendikten sonra listeyi yeniler
            alert("Admin created successfully!");
        } catch (error) {
            console.error("Error creating admin", error.response ? error.response.data : error.message);
            alert("There was an error creating the admin. Please check the console for more details.");
        }
    };

    return (
        <div style={{ marginTop: '50px' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Admin List
            </Typography>

            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {admins.map((admin) => (
                            <TableRow key={admin.id}>
                                <TableCell>{admin.id}</TableCell>
                                <TableCell>{admin.name}</TableCell>
                                <TableCell>{admin.email}</TableCell>
                                <TableCell>{admin.role}</TableCell>
                                <TableCell>{admin.active ? 'Active' : 'Inactive'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Typography variant="h5" style={{ marginTop: '40px' }}>
                Create Admin
            </Typography>

            <form noValidate autoComplete="off" style={{ marginTop: '20px' }}>
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={newAdmin.name}
                    onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                />

                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="email"
                    value={newAdmin.email}
                    onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                />

                <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="password"
                    value={newAdmin.password}
                    onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                />

                <TextField
                    label="Role"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={newAdmin.role}
                    onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
                />

                <Button variant="contained" color="primary" style={{ marginTop: '20px' }} onClick={createAdmin}>
                    Create Admin
                </Button>
            </form>
        </div>
    );
}

export default AdminList;
