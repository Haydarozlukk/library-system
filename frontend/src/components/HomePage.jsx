import React from 'react';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div style={{ marginTop: '50px' }}>
            <Typography variant="h3" align="center" gutterBottom style={{ fontWeight: 'bold' }}>
                Kütüphane Yönetim Sistemi
            </Typography>

            <Grid container spacing={4} justifyContent="center">

                {/* Admin Listesi */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card style={{ borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', transition: 'transform 0.3s' }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <CardContent>
                            <Typography variant="h5" component="div" style={{ fontWeight: 'bold' }}>
                                Yöneticiler
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Yöneticileri görüntüle ve yönet.
                            </Typography>
                            <Button
                                component={Link}
                                to="/admins"
                                variant="contained"
                                color="primary"
                                style={{ marginTop: '10px' }}
                            >
                                Yöneticilere Git
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Yazar Listesi */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card style={{ borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', transition: 'transform 0.3s' }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <CardContent>
                            <Typography variant="h5" component="div" style={{ fontWeight: 'bold' }}>
                                Yazarlar
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Yazarları görüntüle ve yönet.
                            </Typography>
                            <Button
                                component={Link}
                                to="/authors"
                                variant="contained"
                                color="primary"
                                style={{ marginTop: '10px' }}
                            >
                                Yazarlara Git
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Kitap Listesi */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card style={{ borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', transition: 'transform 0.3s' }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <CardContent>
                            <Typography variant="h5" component="div" style={{ fontWeight: 'bold' }}>
                                Kitaplar
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Kitapları görüntüle ve yönet.
                            </Typography>
                            <Button
                                component={Link}
                                to="/books"
                                variant="contained"
                                color="primary"
                                style={{ marginTop: '10px' }}
                            >
                                Kitaplara Git
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Kategori Listesi */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card style={{ borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', transition: 'transform 0.3s' }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <CardContent>
                            <Typography variant="h5" component="div" style={{ fontWeight: 'bold' }}>
                                Kategoriler
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Kategorileri görüntüle ve yönet.
                            </Typography>
                            <Button
                                component={Link}
                                to="/categories"
                                variant="contained"
                                color="primary"
                                style={{ marginTop: '10px' }}
                            >
                                Kategorilere Git
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Müşteri Listesi */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card style={{ borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', transition: 'transform 0.3s' }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <CardContent>
                            <Typography variant="h5" component="div" style={{ fontWeight: 'bold' }}>
                                Müşteriler
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Müşterileri görüntüle ve yönet.
                            </Typography>
                            <Button
                                component={Link}
                                to="/customers"
                                variant="contained"
                                color="primary"
                                style={{ marginTop: '10px' }}
                            >
                                Müşterilere Git
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Kullanıcı Oluştur */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card style={{ borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', transition: 'transform 0.3s' }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <CardContent>
                            <Typography variant="h5" component="div" style={{ fontWeight: 'bold' }}>
                                Kullanıcı Oluştur
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Admin veya Müşteri oluştur.
                            </Typography>
                            <Button
                                component={Link}
                                to="/create-user"
                                variant="contained"
                                color="primary"
                                style={{ marginTop: '10px' }}
                            >
                                Kullanıcı Oluştur
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </div>
    );
}

export default HomePage;
