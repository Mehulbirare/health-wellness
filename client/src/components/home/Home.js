import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Divider,
  useMediaQuery,
  useTheme as useMuiTheme
} from '@mui/material';
import {
  HealthAndSafety as HealthIcon,
  Balance as BalanceIcon,
  Spa as SpaIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Hero section background image
const heroImage = '/images/ayurveda-hero.jpg'; // This will need to be added to public/images folder

const Home = () => {
  const { darkMode } = useTheme();
  const { isAuthenticated } = useAuth();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '80vh', md: '90vh' },
          display: 'flex',
          alignItems: 'center',
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          mb: 8
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '2.5rem', md: '4rem' },
                mb: 2
              }}
            >
              Discover Your Ayurvedic Constitution
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                maxWidth: '800px',
                lineHeight: 1.5
              }}
            >
              Understand your unique mind-body type and receive personalized wellness recommendations based on ancient wisdom.
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Button
                component={RouterLink}
                to={isAuthenticated ? '/assessment' : '/register'}
                variant="contained"
                color="primary"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  borderRadius: '50px',
                  py: 1.5,
                  px: 4,
                  fontSize: '1.1rem',
                  mr: 2,
                  mb: { xs: 2, sm: 0 }
                }}
              >
                {isAuthenticated ? 'Take Assessment' : 'Get Started'}
              </Button>
              <Button
                component={RouterLink}
                to="/about"
                variant="outlined"
                color="inherit"
                size="large"
                sx={{
                  borderRadius: '50px',
                  py: 1.5,
                  px: 4,
                  fontSize: '1.1rem',
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                Learn More
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <motion.div variants={itemVariants}>
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  fontSize: { xs: '2rem', md: '3rem' }
                }}
              >
                Discover the Science of Life
              </Typography>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Typography
                variant="h5"
                color="text.secondary"
                sx={{ maxWidth: '800px', mx: 'auto', lineHeight: 1.6 }}
              >
                Ayurveda is one of the world's oldest holistic healing systems, focusing on the balance between mind, body, and spirit.
              </Typography>
            </motion.div>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <motion.div variants={itemVariants}>
                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  className={darkMode ? 'glass-dark' : 'glass'}
                  sx={{
                    height: '100%',
                    borderRadius: 4,
                    overflow: 'hidden',
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center'
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: 'primary.main',
                      borderRadius: '50%',
                      p: 2,
                      mb: 3,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <BalanceIcon sx={{ fontSize: 40, color: 'white' }} />
                  </Box>
                  <Typography variant="h5" component="h3" sx={{ mb: 2, fontWeight: 600 }}>
                    Balance Your Doshas
                  </Typography>
                  <Typography color="text.secondary">
                    Understand your unique constitution of Vata, Pitta, and Kapha doshas to achieve optimal health and harmony.
                  </Typography>
                </motion.div>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={4}>
              <motion.div variants={itemVariants}>
                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  className={darkMode ? 'glass-dark' : 'glass'}
                  sx={{
                    height: '100%',
                    borderRadius: 4,
                    overflow: 'hidden',
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center'
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: 'primary.main',
                      borderRadius: '50%',
                      p: 2,
                      mb: 3,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <HealthIcon sx={{ fontSize: 40, color: 'white' }} />
                  </Box>
                  <Typography variant="h5" component="h3" sx={{ mb: 2, fontWeight: 600 }}>
                    Personalized Wellness
                  </Typography>
                  <Typography color="text.secondary">
                    Receive customized recommendations for diet, lifestyle, and daily routines based on your unique constitution.
                  </Typography>
                </motion.div>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={4}>
              <motion.div variants={itemVariants}>
                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  className={darkMode ? 'glass-dark' : 'glass'}
                  sx={{
                    height: '100%',
                    borderRadius: 4,
                    overflow: 'hidden',
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center'
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: 'primary.main',
                      borderRadius: '50%',
                      p: 2,
                      mb: 3,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <SpaIcon sx={{ fontSize: 40, color: 'white' }} />
                  </Box>
                  <Typography variant="h5" component="h3" sx={{ mb: 2, fontWeight: 600 }}>
                    Natural Healing
                  </Typography>
                  <Typography color="text.secondary">
                    Learn about natural remedies and practices that can help you maintain balance and prevent disease.
                  </Typography>
                </motion.div>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          py: 10,
          backgroundColor: darkMode ? 'rgba(30, 30, 30, 0.8)' : 'rgba(245, 245, 245, 0.8)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h3"
                  component="h2"
                  sx={{
                    fontWeight: 600,
                    mb: 3,
                    fontSize: { xs: '1.8rem', md: '2.5rem' }
                  }}
                >
                  Begin Your Ayurvedic Journey Today
                </Typography>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{ mb: 4, lineHeight: 1.6 }}
                >
                  Take our comprehensive assessment to discover your unique constitution and receive personalized recommendations.
                </Typography>
                <Button
                  component={RouterLink}
                  to={isAuthenticated ? '/assessment' : '/register'}
                  variant="contained"
                  color="primary"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    borderRadius: '50px',
                    py: 1.5,
                    px: 4,
                    fontSize: '1.1rem'
                  }}
                >
                  {isAuthenticated ? 'Start Assessment' : 'Create Account'}
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  component="img"
                  src="/images/ayurveda-illustration.svg" // This will need to be added to public/images folder
                  alt="Ayurvedic wellness illustration"
                  sx={{
                    width: '100%',
                    maxWidth: '500px',
                    mx: 'auto',
                    display: 'block',
                    borderRadius: 4,
                    boxShadow: darkMode ? 'none' : '0 10px 40px rgba(0,0,0,0.1)'
                  }}
                />
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <motion.div variants={itemVariants}>
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  fontSize: { xs: '2rem', md: '3rem' }
                }}
              >
                What Our Users Say
              </Typography>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Typography
                variant="h5"
                color="text.secondary"
                sx={{ maxWidth: '800px', mx: 'auto', lineHeight: 1.6 }}
              >
                Discover how our platform has helped people transform their health and wellness journey.
              </Typography>
            </motion.div>
          </Box>

          <Grid container spacing={4}>
            {[
              {
                name: 'Vinay',
                role: 'Yoga Instructor',
                testimonial: 'Understanding my Pitta-dominant constitution has completely transformed my approach to diet and exercise. I now know exactly what foods and activities help me maintain balance.'
              },
              {
                name: 'jay',
                role: 'Software Engineer',
                testimonial: 'As someone with a Vata constitution, I struggled with anxiety and sleep issues. The personalized recommendations have helped me establish a routine that keeps me grounded.'
              },
              {
                name: 'yash',
                role: 'Healthcare Professional',
                testimonial: 'The detailed insights about my Kapha constitution explained so many patterns in my health. The dietary suggestions have given me more energy than I've had in years.'
              }
            ].map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div variants={itemVariants}>
                  <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    className={darkMode ? 'glass-dark' : 'glass'}
                    sx={{
                      height: '100%',
                      borderRadius: 4,
                      overflow: 'hidden',
                      p: 4,
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ mb: 3, fontStyle: 'italic', flex: 1 }}
                    >
                      "{testimonial.testimonial}"
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: '50%',
                          backgroundColor: 'primary.main',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold',
                          mr: 2
                        }}
                      >
                        {testimonial.name.charAt(0)}
                      </Box>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* Contact Us Section */}
      <Box
        sx={{
          py: 8,
          backgroundColor: darkMode ? 'rgba(30, 30, 30, 0.8)' : 'rgba(245, 245, 245, 0.8)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h2"
                  component="h2"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    fontSize: { xs: '2rem', md: '3rem' }
                  }}
                >
                  Contact Us
                </Typography>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{ maxWidth: '800px', mx: 'auto', lineHeight: 1.6 }}
                >
                  Have questions? We're here to help you on your wellness journey.
                </Typography>
              </motion.div>
            </Box>

            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} md={4}>
                <motion.div variants={itemVariants}>
                  <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    className={darkMode ? 'glass-dark' : 'glass'}
                    sx={{
                      height: '100%',
                      borderRadius: 4,
                      overflow: 'hidden',
                      p: 4,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center'
                    }}
                  >
                    <Typography variant="h5" component="h3" sx={{ mb: 2, fontWeight: 600 }}>
                      Email
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 2 }}>
                      d23amtics081@gmail.com
                    </Typography>
                  </motion.div>
                </motion.div>
              </Grid>

              <Grid item xs={12} md={4}>
                <motion.div variants={itemVariants}>
                  <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    className={darkMode ? 'glass-dark' : 'glass'}
                    sx={{
                      height: '100%',
                      borderRadius: 4,
                      overflow: 'hidden',
                      p: 4,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center'
                    }}
                  >
                    <Typography variant="h5" component="h3" sx={{ mb: 2, fontWeight: 600 }}>
                      Phone
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 2 }}>
                      6355660998
                    </Typography>
                  </motion.div>
                </motion.div>
              </Grid>

              <Grid item xs={12} md={4}>
                <motion.div variants={itemVariants}>
                  <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    className={darkMode ? 'glass-dark' : 'glass'}
                    sx={{
                      height: '100%',
                      borderRadius: 4,
                      overflow: 'hidden',
                      p: 4,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center'
                    }}
                  >
                    <Typography variant="h5" component="h3" sx={{ mb: 2, fontWeight: 600 }}>
                      Address
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 2 }}>
                      307, Ayurveda St, Wellness City
                    </Typography>
                  </motion.div>
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;