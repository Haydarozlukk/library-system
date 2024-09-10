import React from 'react';
import { Card, CardContent, Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div>
            <Typography variant="h3" align="center" gutterBottom>
                Kütüphane Yönetim Sistemi
            </Typography>
            <Grid container spacing={3} justifyContent="center">

                {/* Yazarlar Kartı */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Yazarlar
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Yazarları görüntüle ve yönet.
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                component={Link}
                                to="/authors"
                                style={{ marginTop: '10px' }}
                            >
                                YAZARLARA GİT
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Kitaplar Kartı */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Kitaplar
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Kitapları görüntüle ve yönet.
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                component={Link}
                                to="/books"
                                style={{ marginTop: '10px' }}
                            >
                                KİTAPLARA GİT
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Kategoriler Kartı */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Kategoriler
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Kategorileri görüntüle ve yönet.
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                component={Link}
                                to="/categories"
                                style={{ marginTop: '10px' }}
                            >
                                KATEGORİLERE GİT
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                {/* "Kullanıcı Oluştur", "Müşteriler" ve "Yöneticiler" kartları kaldırıldı */}
            </Grid>
        </div>
    );
};

export default HomePage;
