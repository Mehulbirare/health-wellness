import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Paper,
  useTheme as useMuiTheme
} from '@mui/material';
import {
  Spa as SpaIcon,
  Psychology as PsychologyIcon,
  LocalDining as DiningIcon,
  FitnessCenter as FitnessIcon,
  Opacity as WaterIcon,
  AcUnit as ColdIcon,
  Whatshot as HotIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const { darkMode } = useTheme();
  const muiTheme = useMuiTheme();

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
    hover: {
      scale: 1.03,
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
          height: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          overflow: 'hidden',
          mb: 8
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url(https://source.unsplash.com/random/1920x1080/?ayurveda,nature)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.4)',
            zIndex: -1
          }}
        />
        <Container maxWidth="md">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  color: 'white',
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                }}
              >
                Discover Your Ayurvedic Constitution
              </Typography>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  color: 'white',
                  textShadow: '0 2px 5px rgba(0,0,0,0.3)'
                }}
              >
                Understand your unique mind-body type and receive personalized wellness recommendations
              </Typography>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Button
                component={RouterLink}
                to={isAuthenticated ? '/assessment' : '/register'}
                variant="contained"
                size="large"
                color="primary"
                sx={{
                  py: 1.5,
                  px: 4,
                  fontSize: '1.1rem',
                  borderRadius: '50px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.25)'
                }}
              >
                {isAuthenticated ? 'Take Assessment' : 'Get Started'}
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </Box>

      {/* What is Prakruti Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{ fontWeight: 600 }}
          >
            What is Prakruti?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
            Prakruti is your unique mind-body constitution determined at conception, which influences your physical, mental, and emotional characteristics.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 500 }}>
                Your Unique Blueprint
              </Typography>
              <Typography paragraph>
                According to Ayurveda, each person has a unique constitution or Prakruti that is determined at conception and remains constant throughout life. This constitution is made up of three doshas: Vata, Pitta, and Kapha.
              </Typography>
              <Typography paragraph>
                Understanding your Prakruti helps you make lifestyle choices that maintain balance and prevent disease. When you live in harmony with your natural constitution, you experience optimal health and well-being.
              </Typography>
              <Typography>
                Our assessment helps you identify your dominant dosha(s) and provides personalized recommendations for diet, exercise, daily routines, and more.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              className={darkMode ? 'glass-dark' : 'glass'}
              sx={{
                p: 4,
                borderRadius: 4,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <WaterIcon sx={{ fontSize: 40, color: '#8E44AD', mr: 2 }} />
                    <Box>
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>
                        Vata (Air & Ether)
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Qualities: Dry, light, cold, rough, subtle, mobile
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body1">
                    Vata types are creative, quick-thinking, and energetic when balanced. They typically have a thin frame, dry skin, and variable appetite and energy.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <HotIcon sx={{ fontSize: 40, color: '#E74C3C', mr: 2 }} />
                    <Box>
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>
                        Pitta (Fire & Water)
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Qualities: Hot, sharp, light, oily, liquid, mobile
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body1">
                    Pitta types are intelligent, focused, and ambitious when balanced. They typically have a medium build, warm skin, strong digestion, and sharp intellect.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <ColdIcon sx={{ fontSize: 40, color: '#2ECC71', mr: 2 }} />
                    <Box>
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>
                        Kapha (Earth & Water)
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Qualities: Heavy, slow, cool, oily, smooth, dense, soft, stable
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body1">
                    Kapha types are calm, grounded, and nurturing when balanced. They typically have a solid build, smooth skin, steady energy, and excellent endurance.
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Benefits Section */}
      <Box sx={{ py: 8, backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.02)' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Benefits of Knowing Your Prakruti
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
              Understanding your unique constitution empowers you to make informed choices for optimal health
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              {
                icon: <SpaIcon sx={{ fontSize: 50, color: '#8E44AD' }} />,
                title: 'Personalized Wellness',
                description: 'Receive tailored recommendations for diet, exercise, and lifestyle based on your unique constitution.'
              },
              {
                icon: <PsychologyIcon sx={{ fontSize: 50, color: '#E74C3C' }} />,
                title: 'Mental Balance',
                description: 'Learn techniques to balance your mind and emotions according to your dosha type.'
              },
              {
                icon: <DiningIcon sx={{ fontSize: 50, color: '#2ECC71' }} />,
                title: 'Dietary Guidance',
                description: 'Discover which foods are most beneficial for your body type and which ones to avoid.'
              },
              {
                icon: <FitnessIcon sx={{ fontSize: 50, color: '#3498DB' }} />,
                title: 'Optimal Exercise',
                description: 'Find out which forms of exercise will energize rather than deplete your unique constitution.'
              }
            ].map((benefit, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  whileHover="hover"
                  variants={cardVariants}
                >
                  <Card
                    elevation={0}
                    className={darkMode ? 'glass-dark' : 'glass'}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 4,
                      overflow: 'hidden'
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 4 }}>
                      <Box sx={{ mb: 2 }}>{benefit.icon}</Box>
                      <Typography gutterBottom variant="h5" component="h3" sx={{ fontWeight: 500 }}>
                        {benefit.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {benefit.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{ fontWeight: 600 }}
          >
            How It Works
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
            Our comprehensive assessment process is simple and effective
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {[
            {
              step: '01',
              title: 'Create an Account',
              description: 'Sign up for a free account to access the assessment and save your results.'
            },
            {
              step: '02',
              title: 'Complete the Assessment',
              description: 'Answer questions about your physical characteristics, mental traits, and lifestyle habits.'
            },
            {
              step: '03',
              title: 'Receive Your Results',
              description: 'Get a detailed breakdown of your dosha composition with personalized insights.'
            },
            {
              step: '04',
              title: 'Follow Recommendations',
              description: 'Implement the customized recommendations to optimize your health and well-being.'
            }
          ].map((step, index) => (
            <Grid item xs={12} md={6} lg={3} key={index}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={itemVariants}
              >
                <Box sx={{ position: 'relative', height: '100%' }}>
                  <Typography
                    variant="h1"
                    sx={{
                      position: 'absolute',
                      top: -30,
                      left: -10,
                      fontWeight: 900,
                      fontSize: '8rem',
                      color: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                      zIndex: -1
                    }}
                  >
                    {step.step}
                  </Typography>
                  <Box sx={{ pt: 4 }}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                      {step.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {step.description}
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          py: 10,
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: darkMode ? 'primary.dark' : 'primary.main',
          color: 'white'
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 600 }}>
              Ready to Discover Your Prakruti?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Take the first step toward personalized Ayurvedic wellness
            </Typography>
            <Button
              component={RouterLink}
              to={isAuthenticated ? '/assessment' : '/register'}
              variant="contained"
              size="large"
              sx={{
                py: 1.5,
                px: 4,
                fontSize: '1.1rem',
                borderRadius: '50px',
                backgroundColor: 'white',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.9)'
                }
              }}
            >
              {isAuthenticated ? 'Take Assessment Now' : 'Create Free Account'}
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;