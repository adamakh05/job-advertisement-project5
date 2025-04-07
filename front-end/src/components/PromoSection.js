import React from 'react';
import { Box, Typography } from '@mui/material';

const PromoSection = ({ title, description }) => {
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
                    {title}
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
                    {description}
                </Typography>
            </Box>
        </Box>
    );
};

export default PromoSection;
