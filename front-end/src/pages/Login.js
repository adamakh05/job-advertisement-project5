import React from 'react';
import { Box, Typography, Paper, Avatar, Grid } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import PromoSection from '../components/PromoSection';

const Login = () => {
    return (
        <Grid container sx={{ height: '100vh', bgcolor: '#f5f5f5' }}>
            <Grid item xs={false} sm={4} md={7} sx={{ display: { xs: 'none', sm: 'block' } }}>
                <PromoSection 
                    title="Find Your Dream Job"
                    description="Connect with top companies and discover opportunities that align with your passion. Your next career milestone starts here."
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
                            bgcolor: '#2196f3',
                            boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)',
                            mb: 2
                        }}
                    >
                        <LockOutlinedIcon sx={{ fontSize: 32 }} />
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
                        Welcome Back
                    </Typography>
                    <LoginForm />
                </Box>
                <Box sx={{ 
                    mt: 2, 
                    display: 'flex', 
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 1
                }}>
                    <Typography variant="body2" color="text.secondary">
                        Don't have an account?
                    </Typography>
                    <Typography 
                        component={Link}
                        to="/register" 
                        variant="body2" 
                        sx={{
                            color: '#2196f3',
                            textDecoration: 'none',
                            fontWeight: 600,
                            cursor: 'pointer',
                            '&:hover': {
                                color: '#1976d2',
                                textDecoration: 'underline',
                            }
                        }}
                    >
                        Register here
                    </Typography>
                </Box>
                <Box sx={{ mt: 1 }}>
                    <Typography 
                        component={Link}
                        to="/admin/login" 
                        variant="body2" 
                        sx={{
                            color: '#757575',
                            textDecoration: 'none',
                            '&:hover': {
                                textDecoration: 'underline',
                            }
                        }}
                    >
                        Admin Login
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Login;


