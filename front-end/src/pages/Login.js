import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Avatar, Grid, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    

        try {
            const response = await authService.login(email, password);
            console.log('Login successful:', response);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Failed to login. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 4, width: '100%', maxWidth: '400px' }}>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                    '& .MuiInputBase-root': {
                        borderRadius: '12px',
                        backgroundColor: '#f8f9fa'
                    },
                    mb: 2
                }}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                    '& .MuiInputBase-root': {
                        borderRadius: '12px',
                        backgroundColor: '#f8f9fa'
                    }
                }}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                    mt: 4,
                    mb: 2,
                    py: 1.5,
                    bgcolor: '#2196f3',
                    '&:hover': {
                        bgcolor: '#1976d2',
                    },
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontSize: '16px',
                    fontWeight: 600,
                    boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)',
                }}
            >
                {loading ? 'Signing in...' : 'Sign In'}
            </Button>
        </Box>
    );
}

function PromoSection() {
    return (
        <Box
            sx={{
                position: 'relative',
                height: '100%',
                backgroundImage: 'url(https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '0 20px 20px 0',
                overflow: 'hidden',
                boxShadow: '0 0 40px rgba(0,0,0,0.1)',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 100%)',
                    color: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 6,
                }}
            >
                <Typography 
                    variant="h2" 
                    sx={{ 
                        fontWeight: 800, 
                        mb: 3, 
                        textAlign: 'center',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                        letterSpacing: '1px'
                    }}
                >
                    Find Your Dream Job
                </Typography>
                <Typography 
                    variant="h6" 
                    sx={{ 
                        textAlign: 'center',
                        maxWidth: '600px',
                        lineHeight: 1.8,
                        textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                        opacity: 0.9
                    }}
                >
                    Connect with top companies and discover opportunities that align with your passion. 
                    Your next career milestone starts here.
                </Typography>
            </Box>
        </Box>
    );
}

const Login = () => {
    return (
        <Grid container sx={{ height: '100vh', bgcolor: '#f5f5f5' }}>
            <Grid item xs={false} sm={4} md={7} sx={{ display: { xs: 'none', sm: 'block' } }}>
                <PromoSection />
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
                        component="a" 
                        href="/register" 
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
            </Grid>
        </Grid>
    );
};

export default Login;


