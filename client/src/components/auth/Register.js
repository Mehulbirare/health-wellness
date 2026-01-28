import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  InputAdornment,
  IconButton,
  CircularProgress,
  Alert,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email as EmailIcon,
  Person as PersonIcon,
  Lock as LockIcon,
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon,
  LocalFlorist as LeafIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const Register = () => {
  const { register, isAuthenticated } = useAuth();
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const steps = ['Essentials', 'Security'];

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const validateStep = (step) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (step === 0) {
      if (!formData.name.trim()) errors.name = 'Name is required';
      if (!formData.email) {
        errors.email = 'Email is required';
      } else if (!emailRegex.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
      }
    } else if (step === 1) {
      if (!formData.password) {
        errors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        errors.password = 'Minimum 6 characters';
      }
      if (formData.confirmPassword !== formData.password) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (formErrors[name]) setFormErrors({ ...formErrors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(activeStep)) return;

    setLoading(true);
    const success = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password
    });
    setLoading(false);

    if (success) navigate('/dashboard');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        py: 12
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(/assets/images/auth_bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.6)',
          zIndex: -1
        }}
      />

      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper
            elevation={0}
            className="glass"
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: '40px',
              bgcolor: darkMode ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)',
              boxShadow: '0 30px 60px rgba(0,0,0,0.3)',
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <LeafIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>Join Prakruti</Typography>
              <Typography variant="body1" color="text.secondary">Start your transition to a mindful life.</Typography>
            </Box>

            <Stepper activeStep={activeStep} sx={{ mb: 6 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel sx={{ '& .MuiStepLabel-label': { fontWeight: 600 } }}>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {error && <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>{error}</Alert>}

            <Box component="form" onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {activeStep === 0 ? (
                  <motion.div
                    key="step0"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={!!formErrors.name}
                      helperText={formErrors.name}
                      sx={{
                        mb: 3,
                        '& .MuiInputLabel-root': { color: darkMode ? 'rgba(255,255,255,0.7)' : 'inherit' }
                      }}
                      InputProps={{
                        startAdornment: <InputAdornment position="start"><PersonIcon sx={{ color: 'primary.main', mr: 1 }} /></InputAdornment>,
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!formErrors.email}
                      helperText={formErrors.email}
                      sx={{
                        mb: 4,
                        '& .MuiInputLabel-root': { color: darkMode ? 'rgba(255,255,255,0.7)' : 'inherit' }
                      }}
                      InputProps={{
                        startAdornment: <InputAdornment position="start"><EmailIcon sx={{ color: 'primary.main', mr: 1 }} /></InputAdornment>,
                      }}
                    />
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handleNext}
                      endIcon={<ArrowForwardIcon />}
                      sx={{
                        py: 2,
                        borderRadius: '100px',
                        fontWeight: 700,
                        bgcolor: 'primary.main',
                        '&:hover': { bgcolor: 'primary.dark' },
                        boxShadow: '0 10px 20px rgba(6, 78, 59, 0.2)'
                      }}
                    >
                      Next Step
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <TextField
                      fullWidth
                      label="Password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      error={!!formErrors.password}
                      helperText={formErrors.password}
                      sx={{
                        mb: 3,
                        '& .MuiInputLabel-root': { color: darkMode ? 'rgba(255,255,255,0.7)' : 'inherit' }
                      }}
                      InputProps={{
                        startAdornment: <InputAdornment position="start"><LockIcon sx={{ color: 'primary.main', mr: 1 }} /></InputAdornment>,
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Confirm Password"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      error={!!formErrors.confirmPassword}
                      helperText={formErrors.confirmPassword}
                      sx={{
                        mb: 4,
                        '& .MuiInputLabel-root': { color: darkMode ? 'rgba(255,255,255,0.7)' : 'inherit' }
                      }}
                      InputProps={{
                        startAdornment: <InputAdornment position="start"><LockIcon sx={{ color: 'primary.main', mr: 1 }} /></InputAdornment>,
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Button onClick={handleBack} startIcon={<ArrowBackIcon />} sx={{ borderRadius: '100px', px: 3 }}>
                        Back
                      </Button>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={loading}
                        sx={{
                          py: 2,
                          borderRadius: '100px',
                          fontWeight: 700,
                          bgcolor: 'primary.main',
                          '&:hover': { bgcolor: 'primary.dark' },
                          boxShadow: '0 10px 20px rgba(6, 78, 59, 0.2)'
                        }}
                      >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
                      </Button>
                    </Box>
                  </motion.div>
                )}
              </AnimatePresence>
            </Box>

            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account? {' '}
                <Link component={RouterLink} to="/login" sx={{ fontWeight: 700, color: 'primary.main', textDecoration: 'none' }}>
                  Sign in
                </Link>
              </Typography>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Register;