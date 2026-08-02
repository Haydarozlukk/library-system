import React, { useState } from 'react';
import { Button, TextField, Typography, Box, Paper, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import { useAuth } from '../context/AuthContext';

const UserCreateForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleCreateUser = async () => {
        setError(null);
        if (!name || !email || !password) {
            setError('İsim, e-posta ve şifre zorunludur.');
            return;
        }
        setLoading(true);
        try {
            const response = await axiosClient.post('/api/auth/register', {
                name,
                email,
                password,
                address,
                phoneNumber,
            });
            login(response.data);
            navigate('/');
        } catch (err) {
            setError(err.response?.data || 'Kayıt sırasında bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
            <Paper sx={{ width: '100%', maxWidth: 460, p: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Kayıt Ol
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Kayıt olduktan sonra kitap ödünç alabilirsin.
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {typeof error === 'string' ? error : 'Kayıt başarısız.'}
                    </Alert>
                )}

                <TextField label="İsim" fullWidth sx={{ mb: 2 }} value={name} onChange={(e) => setName(e.target.value)} />
                <TextField label="E-posta" fullWidth sx={{ mb: 2 }} value={email} onChange={(e) => setEmail(e.target.value)} />
                <TextField
                    label="Şifre"
                    type="password"
                    fullWidth
                    sx={{ mb: 2 }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                    label="Adres"
                    fullWidth
                    sx={{ mb: 2 }}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <TextField
                    label="Telefon Numarası"
                    fullWidth
                    sx={{ mb: 3 }}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />

                <Button variant="contained" fullWidth size="large" onClick={handleCreateUser} disabled={loading}>
                    {loading ? 'Kaydediliyor...' : 'Kayıt Ol'}
                </Button>
            </Paper>
        </Box>
    );
};

export default UserCreateForm;
