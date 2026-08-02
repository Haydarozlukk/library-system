import React from 'react';
import { Card, CardActionArea, CardContent, Grid, Typography, Box, Stack, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';

const sections = [
    {
        title: 'Kitaplar',
        description: 'Kütüphanedeki tüm kitapları görüntüle, yeni kitap ekle.',
        to: '/books',
        icon: AutoStoriesRoundedIcon,
        color: '#0F5FA6',
    },
    {
        title: 'Yazarlar',
        description: 'Yazar profillerini incele, bir yazarın tüm kitaplarını gör.',
        to: '/authors',
        icon: PeopleAltRoundedIcon,
        color: '#E31E3E',
    },
    {
        title: 'Kategoriler',
        description: 'Kategorilere göre kitapları keşfet ve yönet.',
        to: '/categories',
        icon: CategoryRoundedIcon,
        color: '#2E9E5B',
    },
];

const HomePage = () => {
    return (
        <Box>
            <Box
                sx={{
                    borderRadius: 4,
                    p: { xs: 4, md: 6 },
                    mb: 5,
                    border: '1px solid rgba(17,24,39,0.08)',
                    background:
                        'linear-gradient(135deg, rgba(15,95,166,0.08) 0%, rgba(227,30,62,0.05) 100%)',
                }}
            >
                <Chip
                    label="Kütüphane Yönetim Sistemi"
                    size="small"
                    sx={{ mb: 2, bgcolor: 'rgba(15,95,166,0.10)', color: 'primary.dark', fontWeight: 700 }}
                />
                <Typography variant="h3" sx={{ maxWidth: 640 }}>
                    Kitapları, yazarları ve kategorileri tek yerden yönet.
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 2, maxWidth: 560 }}>
                    Aşağıdaki bölümlerden birine geçerek kayıtları görüntüleyebilir, yeni kayıt
                    ekleyebilir veya bir kitap isteğinde bulunabilirsin.
                </Typography>
            </Box>

            <Grid container spacing={3}>
                {sections.map(({ title, description, to, icon: Icon, color }) => (
                    <Grid item xs={12} sm={6} md={4} key={to}>
                        <Card sx={{ height: '100%' }}>
                            <CardActionArea component={Link} to={to} sx={{ height: '100%', p: 0.5 }}>
                                <CardContent>
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        justifyContent="center"
                                        sx={{
                                            width: 52,
                                            height: 52,
                                            borderRadius: 2.5,
                                            mb: 2,
                                            bgcolor: `${color}22`,
                                        }}
                                    >
                                        <Icon sx={{ color, fontSize: 28 }} />
                                    </Stack>
                                    <Typography variant="h6" gutterBottom>
                                        {title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default HomePage;
