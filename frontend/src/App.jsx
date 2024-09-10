import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Drawer, List, ListItem, ListItemIcon, ListItemText, CssBaseline, Container, Box } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import BookIcon from '@mui/icons-material/Book';
import UserIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import AuthorList from './components/AuthorList';
import BookList from './components/BookList';
import CategoryList from './components/CategoryList';
import HomePage from './components/HomePage';
import CustomerBookRequestForm from './components/CustomerBookRequestForm';
import LoginPage from './components/LoginPage'; // Login sayfasını ekliyoruz

const drawerWidth = 280;

function App() {
    return (
        <Router>
            <div style={{ display: 'flex' }}>
                <CssBaseline />

                {/* AppBar */}
                <AppBar position="fixed" style={{ zIndex: 1201, backgroundColor: '#1976d2' }}>
                    <Toolbar>
                        <Typography variant="h6" style={{ flexGrow: 1 }}>
                            Kütüphane Yönetim Sistemi
                        </Typography>

                        {/* Sağ üstteki Login ve Kayıt Ol butonları */}
                        <Button color="inherit" component={Link} to="/login" style={{ marginRight: '10px' }}>
                            Giriş Yap
                        </Button>
                        <Button variant="outlined" color="inherit" component={Link} to="/create-user">
                            Kayıt Ol
                        </Button>
                    </Toolbar>
                </AppBar>

                {/* Drawer (Sidebar) */}
                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#f4f6f8' },
                    }}
                >
                    <Toolbar />
                    <div style={{ paddingTop: '20px' }}></div>
                    <List>
                        {/* Ana Sayfa */}
                        <ListItem button component={Link} to="/" style={{ marginBottom: '20px' }}>
                            <ListItemIcon><HomeIcon style={{ color: '#1976d2' }} /></ListItemIcon>
                            <ListItemText primary={<Typography variant="h6">Ana Sayfa</Typography>} />
                        </ListItem>

                        {/* Kitaplar */}
                        <ListItem button component={Link} to="/books" style={{ marginBottom: '20px' }}>
                            <ListItemIcon><BookIcon style={{ color: '#1976d2' }} /></ListItemIcon>
                            <ListItemText primary={<Typography variant="h6">Kitaplar</Typography>} />
                        </ListItem>

                        {/* Yazarlar */}
                        <ListItem button component={Link} to="/authors" style={{ marginBottom: '20px' }}>
                            <ListItemIcon><UserIcon style={{ color: '#1976d2' }} /></ListItemIcon>
                            <ListItemText primary={<Typography variant="h6">Yazarlar</Typography>} />
                        </ListItem>

                        {/* Kategoriler */}
                        <ListItem button component={Link} to="/categories" style={{ marginBottom: '20px' }}>
                            <ListItemIcon><CategoryIcon style={{ color: '#1976d2' }} /></ListItemIcon>
                            <ListItemText primary={<Typography variant="h6">Kategoriler</Typography>} />
                        </ListItem>

                        {/* Kitap İsteği */}
                        <ListItem button component={Link} to="/request-book" style={{ marginBottom: '20px' }}>
                            <ListItemIcon><BookIcon style={{ color: '#1976d2' }} /></ListItemIcon>
                            <ListItemText primary={<Typography variant="h6">Kitap İsteği Yap</Typography>} />
                        </ListItem>
                    </List>
                </Drawer>

                {/* Main Content */}
                <main style={{ flexGrow: 1, padding: '80px 20px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
                    <Container>
                        <Routes>
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/" element={<HomePage />} />
                            <Route path="/authors" element={<AuthorList />} />
                            <Route path="/books" element={<BookList />} />
                            <Route path="/categories" element={<CategoryList />} />
                            <Route path="/request-book" element={<CustomerBookRequestForm />} />
                        </Routes>
                    </Container>
                </main>
            </div>
        </Router>
    );
}

export default App;
