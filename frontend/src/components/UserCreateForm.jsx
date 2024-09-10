import React, { useState } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Typography, Box, Alert } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
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

    const [error, setError] = useState(null);  // Hata durumu
    const [success, setSuccess] = useState(null);  // Başarı durumu

    const createUser = async () => {
        // Form validasyonu
        if (!newUser.name || !newUser.email || !newUser.password || (newUser.role === 'customer' && (!newUser.address || !newUser.phoneNumber))) {
            setError("Tüm alanlar doldurulmalıdır!");
            setSuccess(null);  // Başarı mesajını sıfırla
            return;
        }

        try {
            // Kullanıcı rolüne göre farklı API uç noktalarına POST isteği gönderiyoruz
            const apiUrl = newUser.role === 'admin'
                ? 'http://localhost:8081/api/admin/create'
                : 'http://localhost:8081/api/customer/create';

            await axios.post(apiUrl, newUser);
            setSuccess(`${newUser.role.charAt(0).toUpperCase() + newUser.role.slice(1)} başarıyla oluşturuldu!`);
            setError(null);  // Hata mesajını sıfırla

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
            setError("Kullanıcı oluşturulurken bir hata oluştu.");
            setSuccess(null);  // Başarı mesajını sıfırla
        }
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Kullanıcı Oluştur (Admin veya Müşteri)
            </Typography>

            {/* Hata Mesajı */}
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            {/* Başarı Mesajı */}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

            <form noValidate autoComplete="off">
                <FormControl fullWidth margin="normal">
                    <InputLabel id="role-label">Rol</InputLabel>
                    <Select
                        labelId="role-label"
                        id="role"
                        value={newUser.role}
                        label="Rol"
                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    >
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="customer">Müşteri</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    label="İsim"
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
                    label="Şifre"
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
                            label="Adres"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={newUser.address}
                            onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
                        />

                        <TextField
                            label="Telefon Numarası"
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
                    startIcon={<AddIcon />}  // Butona ikon eklendi
                    sx={{ mt: 3 }}
                    onClick={createUser}
                >
                    {newUser.role.charAt(0).toUpperCase() + newUser.role.slice(1)} Oluştur
                </Button>
            </form>
        </Box>
    );
}

export default UserCreateForm;
