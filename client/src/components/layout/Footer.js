import React from 'react';
import { Box, Container, Typography, Link, IconButton, Grid, Divider, useTheme as useMuiTheme } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn, LocalFlorist as LeafIcon } from '@mui/icons-material';
import { useTheme } from '../../context/ThemeContext';

const Footer = () => {
  const { darkMode } = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: darkMode ? 'var(--bg-dark)' : '#f8fafc',
        pt: 10,
        pb: 5,
        borderTop: `1px solid ${darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={8} sx={{ mb: 8 }}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <LeafIcon sx={{ color: 'primary.main', mr: 1, fontSize: 32 }} />
              <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: -1, fontStyle: 'italic' }}>
                Prakruti
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.8 }}>
              Empowering your wellness journey through the ancient wisdom of Ayurveda. Discover your unique constitution and live in harmony with nature.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {[Facebook, Twitter, Instagram, LinkedIn].map((Icon, i) => (
                <IconButton
                  key={i}
                  sx={{
                    bgcolor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                    '&:hover': { bgcolor: 'primary.main', color: 'white' }
                  }}
                >
                  <Icon fontSize="small" />
                </IconButton>
              ))}
            </Box>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>Platform</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {['Home', 'Assessment', 'Dashboard', 'Profile'].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`}
                  color="text.secondary"
                  underline="none"
                  sx={{ '&:hover': { color: 'primary.main' } }}
                >
                  {item}
                </Link>
              ))}
            </Box>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>Legal</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <Link
                  key={item}
                  href="#"
                  color="text.secondary"
                  underline="none"
                  sx={{ '&:hover': { color: 'primary.main' } }}
                >
                  {item}
                </Link>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>Stay Mindful</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Join our newsletter for weekly Ayurvedic tips and wellness insights.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <input
                type="email"
                placeholder="Your email"
                style={{
                  padding: '12px 20px',
                  borderRadius: '100px',
                  border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                  background: darkMode ? 'rgba(255,255,255,0.05)' : 'white',
                  color: 'inherit',
                  width: '100%',
                  outline: 'none'
                }}
              />
              <IconButton sx={{ bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' } }}>
                <LeafIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ mb: 4, opacity: 0.5 }} />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Prakruti Wellness. Designed for harmony.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            Made with <LeafIcon sx={{ fontSize: 16, color: 'primary.main' }} /> for a better life.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;