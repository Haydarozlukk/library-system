import React, { useState } from 'react';
import { Button, TextField, Typography, Link, Box, Checkbox, FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/login.jpg'; // Ortak arka plan resmi

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            alert('Giriş başarılı!');
            navigate('/'); // Ana sayfaya yönlendir
        } else {
            alert('Giriş başarısız!');
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '100%',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 400,
                    padding: 4,
                    backgroundColor: 'rgba(0,0,0,0.85)', // Daha belirgin siyah arka plan
                    borderRadius: 2,
                    boxShadow: 3,
                    textAlign: 'center',
                    color: 'white',
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Oturum Aç
                </Typography>

                <TextField
                    label="E-posta veya telefon numarası"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ marginBottom: '20px', backgroundColor: '#333', color: 'white' }} // Daha koyu arka plan
                    InputProps={{ style: { color: 'white' } }}
                    InputLabelProps={{ style: { color: 'white' } }}
                />
                <TextField
                    label="Parola"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ marginBottom: '20px', backgroundColor: '#333', color: 'white' }} // Daha koyu arka plan
                    InputProps={{ style: { color: 'white' } }}
                    InputLabelProps={{ style: { color: 'white' } }}
                />

                <Button
                    variant="contained"
                    fullWidth
                    style={{
                        backgroundColor: '#e50914',
                        color: 'white',
                        marginBottom: '20px',
                    }}
                    onClick={handleLogin}
                >
                    Oturum Aç
                </Button>

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            style={{ color: 'white' }}
                        />
                    }
                    label="Beni hatırla"
                    style={{ color: 'white' }}
                />

                <Box mt={2}>
                    <Link href="#" variant="body2" style={{ color: '#b3b3b3' }}>
                        Parolayı mı unuttunuz?
                    </Link>
                </Box>

                <Box mt={2}>
                    <Link href="#" variant="body2" style={{ color: '#b3b3b3' }} onClick={() => navigate('/create-user')}>
                       Bize Katılın <span style={{ color: 'white' }}>Şimdi kaydolun.</span>
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

export default LoginPage;
