import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { adminAuthService } from '../services/api';
import Cookies from 'js-cookie';

const AdminLoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await adminAuthService.login(email, password);
            const { token, user } = response.data;

            // Store admin token and user data
            localStorage.setItem('adminToken', token);
            localStorage.setItem('adminUser', JSON.stringify(user));
            Cookies.set('adminToken', token, { expires: 1 });

            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.message || 'Failed to login. Please check your admin credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 4, width: '100%', maxWidth: '400px' }}>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <TextField
                margin="normal"
                required
                fullWidth
                id="admin-email"
                label="Admin Email"
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
                id="admin-password"
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
                    bgcolor: '#f44336', // Different color for admin
                    '&:hover': {
                        bgcolor: '#d32f2f',
                    },
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontSize: '16px',
                    fontWeight: 600,
                    boxShadow: '0 4px 12px rgba(244, 67, 54, 0.3)',
                }}
            >
                {loading ? 'Signing in...' : 'Admin Sign In'}
            </Button>
        </Box>
    );
};

export default AdminLoginForm;
