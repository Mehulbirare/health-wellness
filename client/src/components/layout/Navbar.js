import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Avatar,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Container,
  useTheme as useMuiTheme
} from '@mui/material';
import {
  Menu as MenuIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Dashboard as DashboardIcon,
  Assessment as AssessmentIcon,
  Person as PersonIcon,
  ExitToApp as LogoutIcon,
  AdminPanelSettings as AdminIcon,
  Home as HomeIcon,
  LocalFlorist as LeafIcon,
  Restaurant as KitchenIcon,
  NotificationsActive as RemindersIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/');
  };

  const navBarStyle = {
    background: scrolled
      ? (darkMode ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)')
      : 'transparent',
    backdropFilter: scrolled ? 'blur(12px)' : 'none',
    boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.05)' : 'none',
    transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
    color: (scrolled || location.pathname !== '/') ? (darkMode ? 'white' : 'black') : 'white',
    borderBottom: scrolled ? `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}` : 'none',
  };

  const menuItems = [
    { text: 'Home', path: '/', icon: <HomeIcon /> },
    { text: 'Kitchen', path: '/kitchen', icon: <KitchenIcon /> },
    { text: 'Assessment', path: '/assessment', icon: <AssessmentIcon /> },
    { text: 'Dashboard', path: '/dashboard', icon: <DashboardIcon />, private: true },
    { text: 'Reminders', path: '/reminders', icon: <RemindersIcon />, private: true },
  ];

  const drawer = (
    <Box sx={{ width: 280, height: '100%', bgcolor: darkMode ? 'var(--bg-dark)' : 'var(--bg-light)' }}>
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <LeafIcon color="primary" />
        <Typography variant="h6" sx={{ fontWeight: 700 }}>Prakruti</Typography>
      </Box>
      <Divider sx={{ opacity: 0.5 }} />
      <List sx={{ px: 2, pt: 2 }}>
        {menuItems.map((item) => (
          (!item.private || isAuthenticated) && (
            <ListItem
              button
              key={item.text}
              component={Link}
              to={item.path}
              onClick={handleDrawerToggle}
              sx={{
                borderRadius: '12px',
                mb: 1,
                bgcolor: location.pathname === item.path ? 'rgba(6, 78, 59, 0.1)' : 'transparent',
                color: location.pathname === item.path ? 'primary.main' : 'inherit'
              }}
            >
              <ListItemIcon sx={{ color: location.pathname === item.path ? 'primary.main' : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: 500 }} />
            </ListItem>
          )
        ))}
      </List>
      <Box sx={{ position: 'absolute', bottom: 20, width: '100%', px: 3 }}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          onClick={toggleDarkMode}
          sx={{ borderRadius: '100px' }}
        >
          {darkMode ? 'Light' : 'Dark'} Mode
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" sx={navBarStyle} elevation={0}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ height: 80 }}>
            {isMobile && (
              <IconButton color="inherit" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
                <MenuIcon />
              </IconButton>
            )}

            <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
              <motion.div whileHover={{ rotate: 15 }} transition={{ type: 'spring' }}>
                <LeafIcon sx={{ fontSize: 32, mr: 1, color: (scrolled || location.pathname !== '/') ? 'primary.main' : 'white' }} />
              </motion.div>
              <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: -1, fontStyle: 'italic', color: (scrolled || location.pathname !== '/') ? 'inherit' : 'white' }}>
                Prakruti
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {menuItems.map((item) => (
                  (!item.private || isAuthenticated) && (
                    <Button
                      key={item.text}
                      component={Link}
                      to={item.path}
                      sx={{
                        color: 'inherit',
                        px: 2,
                        fontWeight: 500,
                        opacity: location.pathname === item.path ? 1 : 0.7,
                        '&:hover': { opacity: 1 }
                      }}
                    >
                      {item.text}
                    </Button>
                  )
                ))}

                <IconButton onClick={toggleDarkMode} color="inherit" sx={{ mx: 1 }}>
                  {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>

                {isAuthenticated ? (
                  <>
                    <IconButton onClick={handleMenu} sx={{ p: 0.5, border: '2px solid rgba(6, 78, 59, 0.3)' }}>
                      <Avatar
                        sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}
                      >
                        {user?.name?.charAt(0)}
                      </Avatar>
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          mt: 1.5,
                          borderRadius: '16px',
                          minWidth: 180,
                          bgcolor: darkMode ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                          backdropFilter: 'blur(10px)',
                          boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                          '& .MuiMenuItem-root': { borderRadius: '8px', mx: 1, my: 0.5 }
                        }
                      }}
                    >
                      <MenuItem component={Link} to="/profile" onClick={handleClose}>
                        <ListItemIcon><PersonIcon fontSize="small" /></ListItemIcon>
                        Profile
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>
                        <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
                        Logout
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <Button
                    component={Link}
                    to="/login"
                    variant="contained"
                    sx={{
                      borderRadius: '100px',
                      px: 4,
                      bgcolor: (scrolled || location.pathname !== '/') ? 'primary.main' : 'white',
                      color: (scrolled || location.pathname !== '/') ? 'white' : 'black',
                      '&:hover': {
                        bgcolor: (scrolled || location.pathname !== '/') ? 'primary.dark' : 'rgba(255,255,255,0.9)',
                      }
                    }}
                  >
                    Login
                  </Button>
                )}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        open={mobileOpen}
        onClose={handleDrawerToggle}
        PaperProps={{ sx: { borderRadius: '0 24px 24px 0' } }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;