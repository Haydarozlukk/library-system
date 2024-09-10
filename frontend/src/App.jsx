import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, CssBaseline, Container } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import BookIcon from '@mui/icons-material/Book';
import AdminIcon from '@mui/icons-material/SupervisedUserCircle';
import UserIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import AdminList from './components/AdminList';
import AuthorList from './components/AuthorList';
import BookList from './components/BookList';
import CategoryList from './components/CategoryList';
import CustomerList from './components/CustomerList';
import UserCreateForm from './components/UserCreateForm';
import HomePage from './components/HomePage';

const drawerWidth = 280;

function App() {
    return (
        <Router>
            <div style={{ display: 'flex' }}>
                <CssBaseline />

                {/* AppBar */}
                <AppBar position="fixed" style={{ zIndex: 1201, backgroundColor: '#1976d2' }}>
                    <Toolbar>
                        <Typography variant="h6" noWrap>
                            Kütüphane Yönetim Sistemi
                        </Typography>
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
                        <ListItem button component="a" href="/" style={{ marginBottom: '20px' }}>
                            <ListItemIcon><HomeIcon style={{ color: '#1976d2' }} /></ListItemIcon>
                            <ListItemText primary={<Typography variant="h6">Ana Sayfa</Typography>} />
                        </ListItem>

                        {/* Kitaplar */}
                        <ListItem button component="a" href="/books" style={{ marginBottom: '20px' }}>
                            <ListItemIcon><BookIcon style={{ color: '#1976d2' }} /></ListItemIcon>
                            <ListItemText primary={<Typography variant="h6">Kitaplar</Typography>} />
                        </ListItem>

                        {/* Yazarlar */}
                        <ListItem button component="a" href="/authors" style={{ marginBottom: '20px' }}>
                            <ListItemIcon><UserIcon style={{ color: '#1976d2' }} /></ListItemIcon>
                            <ListItemText primary={<Typography variant="h6">Yazarlar</Typography>} />
                        </ListItem>

                        {/* Kategoriler */}
                        <ListItem button component="a" href="/categories" style={{ marginBottom: '20px' }}>
                            <ListItemIcon><CategoryIcon style={{ color: '#1976d2' }} /></ListItemIcon>
                            <ListItemText primary={<Typography variant="h6">Kategoriler</Typography>} />
                        </ListItem>

                        {/* Yöneticiler */}
                        <ListItem button component="a" href="/admins" style={{ marginBottom: '20px' }}>
                            <ListItemIcon><AdminIcon style={{ color: '#1976d2' }} /></ListItemIcon>
                            <ListItemText primary={<Typography variant="h6">Yöneticiler</Typography>} />
                        </ListItem>

                        {/* Müşteriler */}
                        <ListItem button component="a" href="/customers" style={{ marginBottom: '20px' }}>
                            <ListItemIcon><UserIcon style={{ color: '#1976d2' }} /></ListItemIcon>
                            <ListItemText primary={<Typography variant="h6">Müşteriler</Typography>} />
                        </ListItem>

                        {/* Kullanıcı Oluştur */}
                        <ListItem button component="a" href="/create-user" style={{ marginBottom: '20px' }}>
                            <ListItemIcon><UserIcon style={{ color: '#1976d2' }} /></ListItemIcon>
                            <ListItemText primary={<Typography variant="h6">Kullanıcı Oluştur</Typography>} />
                        </ListItem>
                    </List>
                </Drawer>

                {/* Main Content */}
                <main style={{ flexGrow: 1, padding: '80px 20px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
                    <Container>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/admins" element={<AdminList />} />
                            <Route path="/authors" element={<AuthorList />} />
                            <Route path="/books" element={<BookList />} />
                            <Route path="/categories" element={<CategoryList />} />
                            <Route path="/customers" element={<CustomerList />} />
                            <Route path="/create-user" element={<UserCreateForm />} />
                        </Routes>
                    </Container>
                </main>
            </div>
        </Router>
    );
}

export default App;
