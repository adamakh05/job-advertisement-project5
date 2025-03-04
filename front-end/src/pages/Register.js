import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Avatar, Grid, Stepper, Step, StepLabel } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

function RegisterForm() {
    const [activeStep, setActiveStep] = useState(0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [dob, setDob] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState('');

    const steps = ['Account Details', 'Personal Information', 'Confirmation'];

    const validateStep = () => {
        const newErrors = {};
        
        

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep()) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        setErrors({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateStep()) return;

        setIsSubmitting(true);
        setErrors({});
        setSuccess('');

        try {
            const response = await fetch('http://localhost:5000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, username, dob }),
            });
            
            const data = await response.json();
            
            if (response.ok) {
                setSuccess(data.message);
                // You might want to store the token and redirect
                localStorage.setItem('token', data.data.token);
                // Add navigation here if needed
            } else {
                if (data.errors) {
                    const formattedErrors = {};
                    data.errors.forEach(error => {
                        formattedErrors[error.param] = error.msg;
                    });
                    setErrors(formattedErrors);
                } else {
                    setErrors({ submit: data.message || 'Registration failed' });
                }
            }
        } catch (err) {
            setErrors({ submit: 'Server error. Please try again later.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box sx={{ width: '100%', maxWidth: '400px' }}>
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 4 }}>
                {activeStep === 0 && (
                    <>
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
                            error={!!errors.email}
                            helperText={errors.email}
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
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={!!errors.password}
                            helperText={errors.password}
                            sx={{
                                '& .MuiInputBase-root': {
                                    borderRadius: '12px',
                                    backgroundColor: '#f8f9fa'
                                }
                            }}
                        />
                    </>
                )}
                {activeStep === 1 && (
                    <>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            error={!!errors.username}
                            helperText={errors.username}
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
                            id="dob"
                            label="Date of Birth"
                            name="dob"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            error={!!errors.dob}
                            helperText={errors.dob}
                            sx={{
                                '& .MuiInputBase-root': {
                                    borderRadius: '12px',
                                    backgroundColor: '#f8f9fa'
                                }
                            }}
                        />
                    </>
                )}
                {activeStep === 2 && (
                    <>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Confirm your details
                        </Typography>
                        <Typography>Email: {email}</Typography>
                        <Typography>Username: {username}</Typography>
                        <Typography>Date of Birth: {dob}</Typography>
                    </>
                )}
                {errors.submit && (
                    <Typography color="error" sx={{ mt: 2 }}>
                        {errors.submit}
                    </Typography>
                )}
                {success && (
                    <Typography color="success.main" sx={{ mt: 2 }}>
                        {success}
                    </Typography>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                    <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{
                            py: 1.5,
                            borderRadius: '12px',
                            textTransform: 'none',
                            fontSize: '16px',
                            fontWeight: 600,
                        }}
                    >
                        Back
                    </Button>
                    {activeStep === steps.length - 1 ? (
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={isSubmitting}
                            sx={{
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
                            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                        </Button>
                    ) : (
                        <Button
                            onClick={handleNext}
                            variant="contained"
                            sx={{
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
                            Next
                        </Button>
                    )}
                </Box>
            </Box>
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
                    Start Your Journey
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
                    Join our community of professionals and unlock endless career possibilities.
                    Your dream job awaits.
                </Typography>
            </Box>
        </Box>
    );
}

const Register = () => {
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
                        Create Account
                    </Typography>
                    <RegisterForm />
                </Box>
            </Grid>
        </Grid>
    );
};

export default Register;



