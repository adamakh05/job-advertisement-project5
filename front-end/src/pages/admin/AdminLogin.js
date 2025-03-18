import React from 'react';
import { Box, Typography, Paper, Avatar, Grid } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Link } from 'react-router-dom';
import AdminLoginForm from '../../components/AdminLoginForm';
import PromoSection from '../../components/PromoSection';

const AdminLogin = () => {
    return (
        <Grid container sx={{ height: '100vh', bgcolor: '#f5f5f5' }}>
            <Grid item xs={false} sm={4} md={7} sx={{ display: { xs: 'none', sm: 'block' } }}>
                <PromoSection 
                    title="Admin Portal"
                    description="Manage jobs, users, and applications in the job portal system."
                />
            </Grid>
            <Grid 
                item 
                xs={12} 
                sm={8} 
                md={5} 
                component={Paper} 
                elevation={0}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: 4,
                    backgroundColor: 'white'
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: '400px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar 
                        sx={{ 
                            width: 56, 
                            height: 56, 
                            bgcolor: '#f44336',
                            boxShadow: '0 4px 12px rgba(244, 67, 54, 0.3)',
                            mb: 2
                        }}
                    >
                        <AdminPanelSettingsIcon sx={{ fontSize: 32 }} />
                    </Avatar>
                    <Typography 
                        component="h1" 
                        variant="h4" 
                        sx={{ 
                            mb: 4, 
                            fontWeight: 700,
                            color: '#1a1a1a'
                        }}
                    >
                        Admin Login
                    </Typography>
                    <AdminLoginForm />
                </Box>
                <Box sx={{ mt: 2 }}>
                    <Typography 
                        component={Link}
                        to="/" 
                        variant="body2" 
                        sx={{
                            color: '#757575',
                            textDecoration: 'none',
                            '&:hover': {
                                textDecoration: 'underline',
                            }
                        }}
                    >
                        Return to User Login
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
};

export default AdminLogin;
