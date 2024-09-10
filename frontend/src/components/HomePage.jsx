import React from 'react';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div style={{ marginTop: '50px' }}>
            <Typography variant="h3" align="center" gutterBottom style={{ fontSize: '3rem', fontWeight: 'bold' }}>
                Kütüphane Yönetim Sistemi
            </Typography>

            <Grid container spacing={3} justifyContent="center">
                {/* Yöneticiler */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card style={{ padding: '20px', minHeight: '200px' }}>
                        <CardContent>
                            <Typography variant="h5" component="div" style={{ fontSize: '1.75rem', fontWeight: '500', marginBottom: '20px' }}>
                                Yöneticiler
                            </Typography>
                            <Typography variant="body2" color="text.secondary" style={{ marginBottom: '20px', fontSize: '1.1rem' }}>
                                Yöneticileri görüntüle ve yönet.
                            </Typography>
                            <Button
                                component={Link}
                                to="/admins"
                                variant="contained"
                                color="primary"
                                style={{ fontSize: '1rem', padding: '10px 20px' }}
                            >
                                YÖNETİCİLERE GİT
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Yazarlar */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card style={{ padding: '20px', minHeight: '200px' }}>
                        <CardContent>
                            <Typography variant="h5" component="div" style={{ fontSize: '1.75rem', fontWeight: '500', marginBottom: '20px' }}>
                                Yazarlar
                            </Typography>
                            <Typography variant="body2" color="text.secondary" style={{ marginBottom: '20px', fontSize: '1.1rem' }}>
                                Yazarları görüntüle ve yönet.
                            </Typography>
                            <Button
                                component={Link}
                                to="/authors"
                                variant="contained"
                                color="primary"
                                style={{ fontSize: '1rem', padding: '10px 20px' }}
                            >
                                YAZARLARA GİT
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Kitaplar */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card style={{ padding: '20px', minHeight: '200px' }}>
                        <CardContent>
                            <Typography variant="h5" component="div" style={{ fontSize: '1.75rem', fontWeight: '500', marginBottom: '20px' }}>
                                Kitaplar
                            </Typography>
                            <Typography variant="body2" color="text.secondary" style={{ marginBottom: '20px', fontSize: '1.1rem' }}>
                                Kitapları görüntüle ve yönet.
                            </Typography>
                            <Button
                                component={Link}
                                to="/books"
                                variant="contained"
                                color="primary"
                                style={{ fontSize: '1rem', padding: '10px 20px' }}
                            >
                                KİTAPLARA GİT
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Kategoriler */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card style={{ padding: '20px', minHeight: '200px' }}>
                        <CardContent>
                            <Typography variant="h5" component="div" style={{ fontSize: '1.75rem', fontWeight: '500', marginBottom: '20px' }}>
                                Kategoriler
                            </Typography>
                            <Typography variant="body2" color="text.secondary" style={{ marginBottom: '20px', fontSize: '1.1rem' }}>
                                Kategorileri görüntüle ve yönet.
                            </Typography>
                            <Button
                                component={Link}
                                to="/categories"
                                variant="contained"
                                color="primary"
                                style={{ fontSize: '1rem', padding: '10px 20px' }}
                            >
                                KATEGORİLERE GİT
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Müşteriler */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card style={{ padding: '20px', minHeight: '200px' }}>
                        <CardContent>
                            <Typography variant="h5" component="div" style={{ fontSize: '1.75rem', fontWeight: '500', marginBottom: '20px' }}>
                                Müşteriler
                            </Typography>
                            <Typography variant="body2" color="text.secondary" style={{ marginBottom: '20px', fontSize: '1.1rem' }}>
                                Müşterileri görüntüle ve yönet.
                            </Typography>
                            <Button
                                component={Link}
                                to="/customers"
                                variant="contained"
                                color="primary"
                                style={{ fontSize: '1rem', padding: '10px 20px' }}
                            >
                                MÜŞTERİLERE GİT
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Kullanıcı Oluştur */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card style={{ padding: '20px', minHeight: '200px' }}>
                        <CardContent>
                            <Typography variant="h5" component="div" style={{ fontSize: '1.75rem', fontWeight: '500', marginBottom: '20px' }}>
                                Kullanıcı Oluştur
                            </Typography>
                            <Typography variant="body2" color="text.secondary" style={{ marginBottom: '20px', fontSize: '1.1rem' }}>
                                Admin veya Müşteri oluştur.
                            </Typography>
                            <Button
                                component={Link}
                                to="/create-user"
                                variant="contained"
                                color="primary"
                                style={{ fontSize: '1rem', padding: '10px 20px' }}
                            >
                                KULLANICI OLUŞTUR
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </div>
    );
}

export default HomePage;
