import React, { useState } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Typography, Box } from '@mui/material';
import axios from 'axios';

function UserCreateForm() {
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
        phoneNumber: '',
        role: 'admin' // Varsayılan olarak admin seçili
    });

    const createUser = async () => {
        try {
            // Kullanıcı rolüne göre farklı API uç noktalarına POST isteği gönderiyoruz
            const apiUrl = newUser.role === 'admin'
                ? 'http://localhost:8081/api/admin/create'
                : 'http://localhost:8081/api/customer/create';

            await axios.post(apiUrl, newUser);
            alert(`${newUser.role.charAt(0).toUpperCase() + newUser.role.slice(1)} created successfully!`);

            // Formu sıfırla
            setNewUser({
                name: '',
                email: '',
                password: '',
                address: '',
                phoneNumber: '',
                role: 'admin'
            });
        } catch (error) {
            console.error("Error creating user", error);
            alert("There was an error creating the user.");
        }
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Create User (Admin or Customer)
            </Typography>
            <form noValidate autoComplete="off">
                <FormControl fullWidth margin="normal">
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                        labelId="role-label"
                        id="role"
                        value={newUser.role}
                        label="Role"
                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    >
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="customer">Customer</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />

                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />

                <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                />

                {newUser.role === 'customer' && (
                    <>
                        <TextField
                            label="Address"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={newUser.address}
                            onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
                        />

                        <TextField
                            label="Phone Number"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={newUser.phoneNumber}
                            onChange={(e) => setNewUser({ ...newUser, phoneNumber: e.target.value })}
                        />
                    </>
                )}

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 3 }}
                    onClick={createUser}
                >
                    Create {newUser.role.charAt(0).toUpperCase() + newUser.role.slice(1)}
                </Button>
            </form>
        </Box>
    );
}

export default UserCreateForm;
