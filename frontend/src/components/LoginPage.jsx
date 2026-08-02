import React, { useState } from 'react';
import { Button, TextField, Typography, Link, Box, Paper, Alert } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const handleLogin = async () => {
        setError(null);
        if (!email || !password) {
            setError('E-posta ve şifre zorunludur.');
            return;
        }
        setLoading(true);
        try {
            const response = await axiosClient.post('/api/auth/login', { email, password });
            login(response.data);
            const redirectTo = location.state?.from || '/';
            navigate(redirectTo);
        } catch (err) {
            setError(err.response?.data || 'Giriş başarısız. Bilgilerinizi kontrol edin.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
            <Paper sx={{ width: '100%', maxWidth: 420, p: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Giriş Yap
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Kitap ödünç alabilmek için giriş yapmalısınız.
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {typeof error === 'string' ? error : 'Giriş başarısız.'}
                    </Alert>
                )}

                <TextField
                    label="E-posta"
                    fullWidth
                    sx={{ mb: 2 }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Şifre"
                    type="password"
                    fullWidth
                    sx={{ mb: 3 }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                />

                <Button variant="contained" fullWidth size="large" onClick={handleLogin} disabled={loading}>
                    {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                </Button>

                <Box mt={2} textAlign="center">
                    <Link href="/password-reset-request" underline="hover">
                        Parolayı mı unuttunuz?
                    </Link>
                </Box>

                <Box mt={1} textAlign="center">
                    <Typography variant="body2" color="text.secondary" component="span">
                        Hesabın yok mu?{' '}
                    </Typography>
                    <Link href="/create-user" underline="hover">
                        Şimdi kaydol
                    </Link>
                </Box>
            </Paper>
        </Box>
    );
};

export default LoginPage;
