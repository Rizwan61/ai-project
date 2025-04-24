import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { purple } from '@mui/material/colors';
import { NavLink } from 'react-router-dom';


function Navbar() {
    return (
        <Box 
            width="100%" 
            p="1rem 6%" 
            textAlign="center" 
            sx={{ boxShadow: 3, mb: 2, bgcolor: purple[500], color: 'white' }}
        >
            <Typography variant="h4" fontWeight="bold" color="white">
                AI GPT Clone
            </Typography>
            <Link component={NavLink} to="/" sx={{ p: 1, color: 'white', textDecoration: 'none' }}>
                Home
            </Link>
            <Link component={NavLink} to="/register" sx={{ p: 1, color: 'white', textDecoration: 'none' }}>
                Sign Up
            </Link>
            <Link component={NavLink} to="/login" sx={{ p: 1, color: 'white', textDecoration: 'none' }}>
                Login
            </Link>
        </Box>
    );
}

export default Navbar;
