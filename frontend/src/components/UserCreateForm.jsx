import React, { useState } from 'react';
import { Button, TextField, Typography, Box, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/login.jpg'; // Ortak arka plan resmi

const UserCreateForm = () => {
    const [role, setRole] = useState('Admin');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigate = useNavigate();

    const handleCreateUser = async () => {
        if (role === 'Admin') {
            alert('Admin başarıyla oluşturuldu!');
            navigate('/'); // Başarıyla kayıt olduktan sonra ana sayfaya yönlendirme
        } else {
            alert('Müşteri başarıyla oluşturuldu!');
            navigate('/'); // Başarıyla kayıt olduktan sonra ana sayfaya yönlendirme
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
                width: '100%', // genişliği ekran yerine konteyner genişliğine göre ayarladık
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 400,
                    padding: 4,
                    backgroundColor: 'rgba(0,0,0,0.85)',
                    borderRadius: 2,
                    boxShadow: 3,
                    textAlign: 'center',
                    color: 'white',
                }}
            >
                <Typography variant="h4" gutterBottom>
                    {role === 'Admin' ? 'Admin Kayıt Ol' : 'Müşteri Kayıt Ol'}
                </Typography>

                <TextField
                    select
                    label="Rol"
                    fullWidth
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    style={{ marginBottom: '20px', backgroundColor: '#333', color: 'white' }}
                    InputProps={{ style: { color: 'white' } }}
                    InputLabelProps={{ style: { color: 'white' } }}
                >
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Müşteri">Müşteri</MenuItem>
                </TextField>

                <TextField
                    label="İsim"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ marginBottom: '20px', backgroundColor: '#333', color: 'white' }}
                    InputProps={{ style: { color: 'white' } }}
                    InputLabelProps={{ style: { color: 'white' } }}
                />
                <TextField
                    label="Email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ marginBottom: '20px', backgroundColor: '#333', color: 'white' }}
                    InputProps={{ style: { color: 'white' } }}
                    InputLabelProps={{ style: { color: 'white' } }}
                />
                <TextField
                    label="Şifre"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ marginBottom: '20px', backgroundColor: '#333', color: 'white' }}
                    InputProps={{ style: { color: 'white' } }}
                    InputLabelProps={{ style: { color: 'white' } }}
                />

                {role === 'Müşteri' && (
                    <>
                        <TextField
                            label="Adres"
                            fullWidth
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            style={{ marginBottom: '20px', backgroundColor: '#333', color: 'white' }}
                            InputProps={{ style: { color: 'white' } }}
                            InputLabelProps={{ style: { color: 'white' } }}
                        />
                        <TextField
                            label="Telefon Numarası"
                            fullWidth
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            style={{ marginBottom: '20px', backgroundColor: '#333', color: 'white' }}
                            InputProps={{ style: { color: 'white' } }}
                            InputLabelProps={{ style: { color: 'white' } }}
                        />
                    </>
                )}

                <Button
                    variant="contained"
                    fullWidth
                    style={{
                        backgroundColor: '#e50914',
                        color: 'white',
                        marginBottom: '20px',
                    }}
                    onClick={handleCreateUser}
                >
                    {role === 'Admin' ? 'Admin Oluştur' : 'Müşteri Oluştur'}
                </Button>
            </Box>
        </Box>
    );
};

export default UserCreateForm;
