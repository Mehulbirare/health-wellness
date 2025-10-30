import React from 'react';
import { Box, Container, Typography, Link, IconButton, Divider, useTheme as useMuiTheme } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import { useTheme } from '../../context/ThemeContext';

const Footer = () => {
  const { darkMode } = useTheme();
  const muiTheme = useMuiTheme();

  const footerStyle = {
    backgroundColor: darkMode ? 'rgba(18, 18, 18, 0.8)' : 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    padding: '2rem 0',
    marginTop: '2rem',
    borderTop: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
  };

  return (
    <Box component="footer" sx={footerStyle}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2, md: 0 } }}>
            <img src="/logo.svg" alt="Logo" style={{ height: 40, marginRight: 10 }} />
            <Typography variant="h6" component="div">
              Ayurvedic Prakruti
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton color="primary" aria-label="facebook" component="a" href="#" target="_blank" rel="noopener">
              <Facebook />
            </IconButton>
            <IconButton color="primary" aria-label="twitter" component="a" href="#" target="_blank" rel="noopener">
              <Twitter />
            </IconButton>
            <IconButton color="primary" aria-label="instagram" component="a" href="#" target="_blank" rel="noopener">
              <Instagram />
            </IconButton>
            <IconButton color="primary" aria-label="linkedin" component="a" href="#" target="_blank" rel="noopener">
              <LinkedIn />
            </IconButton>
          </Box>
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ mb: { xs: 2, md: 0 } }}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400 }}>
              Ayurvedic Prakruti Assessment helps you discover your unique body constitution according to Ayurvedic principles. Understanding your Prakruti can guide you toward optimal health and wellness.
            </Typography>
          </Box>
          
          <Box sx={{ mb: { xs: 2, md: 0 } }}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link href="/" color="text.secondary" underline="hover" sx={{ mb: 1 }}>
                Home
              </Link>
              <Link href="/assessment" color="text.secondary" underline="hover" sx={{ mb: 1 }}>
                Take Assessment
              </Link>
              <Link href="/login" color="text.secondary" underline="hover" sx={{ mb: 1 }}>
                Login
              </Link>
              <Link href="/register" color="text.secondary" underline="hover">
                Register
              </Link>
            </Box>
          </Box>
          
          <Box>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: d23amtics081@gmail.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: 6355660998
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Address: 307, Ayurveda St, Wellness City
            </Typography>
          </Box>
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Ayurvedic Prakruti Assessment. All rights reserved.
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Link href="#" color="text.secondary" underline="hover" sx={{ mx: 1 }}>
              Privacy Policy
            </Link>
            <Link href="#" color="text.secondary" underline="hover" sx={{ mx: 1 }}>
              Terms of Service
            </Link>
            <Link href="#" color="text.secondary" underline="hover" sx={{ mx: 1 }}>
              Cookie Policy
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;