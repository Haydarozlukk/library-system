import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Container,
    Box,
    Stack,
    Avatar,
    Chip,
} from '@mui/material';
import CategoryIcon from '@mui/icons-material/CategoryRounded';
import BookIcon from '@mui/icons-material/AutoStoriesRounded';
import UserIcon from '@mui/icons-material/PeopleAltRounded';
import HomeIcon from '@mui/icons-material/HomeRounded';
import LibraryIcon from '@mui/icons-material/LocalLibraryRounded';
import LogoutIcon from '@mui/icons-material/LogoutRounded';
import CloudDownloadRounded from '@mui/icons-material/CloudDownloadRounded';
import AuthorList from './components/AuthorList';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import CategoryList from './components/CategoryList';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import UserCreateForm from './components/UserCreateForm';
import PasswordResetRequestForm from './components/PasswordResetRequestForm';
import PasswordResetForm from './components/PasswordResetForm';
import OpenLibraryImport from './components/OpenLibraryImport';
import { AuthProvider, useAuth } from './context/AuthContext';

const drawerWidth = 260;

const baseNavItems = [
    { label: 'Ana Sayfa', to: '/', icon: HomeIcon },
    { label: 'Kitaplar', to: '/books', icon: BookIcon },
    { label: 'Yazarlar', to: '/authors', icon: UserIcon },
    { label: 'Kategoriler', to: '/categories', icon: CategoryIcon },
];

const adminNavItems = [
    { label: 'OpenLibrary İçe Aktar', to: '/admin/openlibrary-import', icon: CloudDownloadRounded },
];

function Navigation() {
    const location = useLocation();
    const { isAdmin } = useAuth();
    const navItems = isAdmin ? [...baseNavItems, ...adminNavItems] : baseNavItems;

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
        >
            <Toolbar>
                <Stack direction="row" spacing={1.2} alignItems="center">
                    <LibraryIcon sx={{ color: 'primary.main' }} />
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                        Kütüphanem
                    </Typography>
                </Stack>
            </Toolbar>
            <List sx={{ px: 1.5, mt: 1 }}>
                {navItems.map(({ label, to, icon: Icon }) => {
                    const active = location.pathname === to;
                    return (
                        <ListItemButton
                            key={to}
                            component={Link}
                            to={to}
                            selected={active}
                            sx={{
                                borderRadius: 2.5,
                                mb: 0.75,
                                '&.Mui-selected': {
                                    bgcolor: 'rgba(15,95,166,0.10)',
                                    '&:hover': { bgcolor: 'rgba(15,95,166,0.16)' },
                                },
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                <Icon sx={{ color: active ? 'primary.main' : 'text.secondary' }} />
                            </ListItemIcon>
                            <ListItemText
                                primary={label}
                                primaryTypographyProps={{
                                    fontWeight: active ? 700 : 500,
                                    color: active ? 'text.primary' : 'text.secondary',
                                }}
                            />
                        </ListItemButton>
                    );
                })}
            </List>
        </Drawer>
    );
}

function TopBarActions() {
    const { auth, isLoggedIn, isAdmin, logout } = useAuth();
    const navigate = useNavigate();

    if (!isLoggedIn) {
        return (
            <Stack direction="row" spacing={1.5}>
                <Button color="inherit" component={Link} to="/login">
                    Giriş Yap
                </Button>
                <Button variant="contained" color="primary" component={Link} to="/create-user">
                    Kayıt Ol
                </Button>
            </Stack>
        );
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <Stack direction="row" spacing={1.5} alignItems="center">
            <Chip
                avatar={<Avatar sx={{ bgcolor: isAdmin ? 'secondary.main' : 'primary.main' }}>{auth.name?.[0] ?? '?'}</Avatar>}
                label={`${auth.name} ${isAdmin ? '(Admin)' : ''}`}
                variant="outlined"
            />
            <Button color="inherit" startIcon={<LogoutIcon />} onClick={handleLogout}>
                Çıkış Yap
            </Button>
        </Stack>
    );
}

function AppShell() {
    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}>
                <Toolbar sx={{ justifyContent: 'flex-end' }}>
                    <TopBarActions />
                </Toolbar>
            </AppBar>

            <Navigation />

            <Box component="main" sx={{ flexGrow: 1, minHeight: '100vh' }}>
                <Toolbar />
                <Container maxWidth="lg" sx={{ py: 5 }}>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/create-user" element={<UserCreateForm />} />
                        <Route path="/" element={<HomePage />} />
                        <Route path="/authors" element={<AuthorList />} />
                        <Route path="/books" element={<BookList />} />
                        <Route path="/books/:id" element={<BookDetail />} />
                        <Route path="/categories" element={<CategoryList />} />
                        <Route path="/admin/openlibrary-import" element={<OpenLibraryImport />} />
                        <Route path="/password-reset-request" element={<PasswordResetRequestForm />} />
                        <Route path="/reset-password" element={<PasswordResetForm />} />
                    </Routes>
                </Container>
            </Box>
        </Box>
    );
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <AppShell />
            </Router>
        </AuthProvider>
    );
}

export default App;
