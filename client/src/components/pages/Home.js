import React, { useEffect } from 'react';
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
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Spa as SpaIcon,
  Psychology as PsychologyIcon,
  LocalDining as DiningIcon,
  FitnessCenter as FitnessIcon,
  ArrowForward as ArrowForwardIcon,
  KeyboardArrowDown as ScrollDownIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const { darkMode } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.165, 0.84, 0.44, 1],
      },
    },
  };

  const doshaCards = [
    {
      title: 'Vata',
      subtitle: 'Air & Ether',
      desc: 'The energy of movement. High creativity, quick mind, and enthusiastic spirit.',
      image: `${process.env.PUBLIC_URL}/assets/images/vata.png`,
      color: '#8E85EE',
      qualities: 'Dry, light, cold, mobile'
    },
    {
      title: 'Pitta',
      subtitle: 'Fire & Water',
      desc: 'The energy of transformation. Sharp intellect, strong digestion, and ambitious drive.',
      image: `${process.env.PUBLIC_URL}/assets/images/pitta.png`,
      color: '#FF7D7D',
      qualities: 'Hot, sharp, light, oily'
    },
    {
      title: 'Kapha',
      subtitle: 'Earth & Water',
      desc: 'The energy of structure. Calm temperament, great endurance, and loyal nature.',
      image: `${process.env.PUBLIC_URL}/assets/images/kapha.png`,
      color: '#78C2AD',
      qualities: 'Heavy, slow, stable, soft'
    }
  ];

  return (
    <Box sx={{ overflow: 'hidden', bgcolor: 'transparent' }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: 'white',
          overflow: 'hidden',
        }}
      >
        <Box
          component={motion.div}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "linear" }}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/hero.png)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: -1,
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)',
            }
          }}
        />

        <Container maxWidth="lg">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <Typography
                variant="overline"
                sx={{
                  letterSpacing: '0.5em',
                  mb: 2,
                  display: 'block',
                  color: 'rgba(255,255,255,0.8)'
                }}
              >
                ANCIENT WISDOM • MODERN WELLNESS
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '3rem', md: '5.5rem' },
                  fontWeight: 800,
                  mb: 3,
                  textShadow: '0 10px 30px rgba(0,0,0,0.3)',
                  lineHeight: 1.1,
                }}
              >
                Find Your <span style={{ fontStyle: 'italic', fontWeight: '400' }}>Balance</span>
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Typography
                variant="h5"
                sx={{
                  mb: 5,
                  maxWidth: '700px',
                  mx: 'auto',
                  opacity: 0.9,
                  fontWeight: 300,
                  lineHeight: 1.6
                }}
              >
                Discover your Prakruti—the unique Ayurvedic blueprint that governs your physical and mental well-being.
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button
                  component={RouterLink}
                  to={isAuthenticated ? '/assessment' : '/register'}
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: 'white',
                    color: 'black',
                    px: 6,
                    py: 2,
                    borderRadius: '100px',
                    fontSize: '1rem',
                    fontWeight: 600,
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.9)',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s'
                  }}
                >
                  {isAuthenticated ? 'Take Assessment' : 'Get Started'}
                </Button>
              </Box>
            </motion.div>
          </motion.div>
        </Container>

        <Box
          sx={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            animation: 'bounce 2s infinite'
          }}
        >
          <ScrollDownIcon sx={{ fontSize: 40, opacity: 0.6 }} />
        </Box>
      </Box>

      {/* The Three Doshas Section */}
      <Container maxWidth="lg" sx={{ py: 15 }}>
        <Box
          sx={{ textAlign: 'center', mb: 8 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <Typography variant="overline" color="primary" sx={{ fontWeight: 600, letterSpacing: 4 }}>
              THE CORE PHILOSOPHY
            </Typography>
            <Typography variant="h2" sx={{ mt: 2, mb: 3 }}>
              The Three Pillars of Life
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', fontSize: '1.2rem' }}>
              In Ayurveda, the five elements combine into three primary vital forces, or doshas. Understanding them is the key to personalized health.
            </Typography>
          </motion.div>
        </Box>

        {/* The Five Elements Interactive Visualization */}
        <Box sx={{ mb: 15, position: 'relative' }}>
          <Grid container spacing={4} justifyContent="center">
            {[
              { name: 'Space', icon: '✨', label: 'Ether (Akasha)', desc: 'The field of potential' },
              { name: 'Air', icon: '💨', label: 'Air (Vayu)', desc: 'The principle of movement' },
              { name: 'Fire', icon: '🔥', label: 'Fire (Agni)', desc: 'The force of transformation' },
              { name: 'Water', icon: '💧', label: 'Water (Jala)', desc: 'The principle of flow' },
              { name: 'Earth', icon: '🌱', label: 'Earth (Prithvi)', desc: 'The essence of structure' }
            ].map((el, i) => (
              <Grid item xs={6} sm={4} md={2.4} key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.8 }}
                >
                  <Box
                    sx={{
                      textAlign: 'center',
                      p: 4,
                      borderRadius: '24px',
                      bgcolor: darkMode ? 'rgba(255,255,255,0.02)' : 'white',
                      border: '1px solid rgba(0,0,0,0.05)',
                      transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        bgcolor: 'primary.main',
                        color: 'white',
                        boxShadow: '0 20px 40px rgba(6, 78, 59, 0.2)'
                      }
                    }}
                  >
                    <Typography variant="h2" sx={{ mb: 2 }}>{el.icon}</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{el.name}</Typography>
                    <Typography variant="caption" sx={{ opacity: 0.7, fontSize: '0.75rem', display: 'block', mb: 1 }}>{el.label}</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.6, fontSize: '0.8rem', fontStyle: 'italic' }}>{el.desc}</Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8, mb: 4 }}>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
            >
              <Box sx={{ px: 3, py: 1, borderRadius: '50px', border: '1px solid var(--primary)', color: 'primary.main', fontSize: '0.8rem', fontWeight: 600 }}>
                TRANSFORMING INTO DOSHAS
              </Box>
              <Box sx={{ width: 2, height: 80, mx: 'auto', mt: 2, background: 'linear-gradient(to bottom, var(--primary), transparent)' }} />
            </motion.div>
          </Box>
        </Box>

        {/* Narrative Energy Section with Premium Background */}
        <Box
          sx={{
            mb: 15,
            textAlign: 'center',
            position: 'relative',
            p: 8,
            borderRadius: '40px',
            overflow: 'hidden',
            bgcolor: darkMode ? 'rgba(0,0,0,0.2)' : 'rgba(6, 78, 59, 0.02)'
          }}
        >
          <Typography
            variant="h1"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '20rem',
              opacity: 0.03,
              zIndex: 0,
              pointerEvents: 'none'
            }}
          >
            ELEMENTS
          </Typography>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            style={{ position: 'relative', zIndex: 1 }}
          >
            <Typography variant="h4" sx={{ fontStyle: 'italic', fontWeight: 300, color: 'primary.main', mb: 3 }}>
              "As is the universe, so is the body. As is the body, so is the mind."
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: 850, mx: 'auto', fontSize: '1.2rem', opacity: 0.8, lineHeight: 1.8 }}>
              Ayurveda teaches that these elements don't just exist outside of us—they are the very fabric of our biology. When they combine in your unique ratio, they form the <strong>Three Doshas</strong>. Discovering your primary energy helps you return to your natural state of <strong>Vibrant Health</strong>.
            </Typography>
          </motion.div>
        </Box>

        <Grid container spacing={4}>
          {doshaCards.map((dosha, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card
                  className="premium-card glass"
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 2,
                    border: 'none',
                    bgcolor: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.7)',
                  }}
                >
                  <Box sx={{ position: 'relative', borderRadius: '15px', overflow: 'hidden', mb: 3 }}>
                    <CardMedia
                      component="img"
                      height="260"
                      image={dosha.image}
                      alt={dosha.title}
                      sx={{
                        filter: darkMode ? 'brightness(0.8) contrast(1.2)' : 'none',
                        transition: 'transform 0.5s',
                        '&:hover': { transform: 'scale(1.1)' }
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 20,
                        right: 20,
                        bgcolor: dosha.color,
                        color: 'white',
                        px: 2,
                        py: 0.5,
                        borderRadius: '50px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                      }}
                    >
                      {dosha.subtitle}
                    </Box>
                  </Box>
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                    <Typography variant="h4" gutterBottom>
                      {dosha.title}
                    </Typography>
                    <Typography variant="body2" color="primary" sx={{ mb: 2, fontWeight: 600, fontStyle: 'italic' }}>
                      {dosha.qualities}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {dosha.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* New Informational Section to fill space */}
        <Box
          sx={{
            mt: 12,
            p: { xs: 4, md: 8 },
            borderRadius: '30px',
            bgcolor: darkMode ? 'rgba(255,255,255,0.02)' : '#f8fafc',
            border: '1px solid rgba(0,0,0,0.03)',
            textAlign: 'center'
          }}
        >
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="h3" gutterBottom>Beyond the Surface</Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.8 }}>
                  Your constitution isn't just about your physical body—it's the metabolic map of your mind and soul. When your unique ratio of Vata, Pitta, and Kapha is in harmony, you experience effortless health, mental clarity, and emotional resilience.
                </Typography>
                <List sx={{ mb: 4 }}>
                  {[
                    { t: 'Prakruti', d: 'Your unchanging genetic constitution.' },
                    { t: 'Vikruti', d: 'Your current state of imbalance.' },
                    { t: 'Dinacharya', d: 'Daily routines for systemic harmony.' }
                  ].map((item, i) => (
                    <ListItem key={i} disableGutters sx={{ alignItems: 'flex-start' }}>
                      <ListItemIcon sx={{ minWidth: 36, mt: 1 }}>
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={<Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{item.t}</Typography>}
                        secondary={item.d}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '400px'
                }}
              >
                {/* Abstract visualization of balance */}
                <motion.div
                  animate={{
                    rotate: 360,
                    borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 50%", "30% 60% 70% 40% / 50% 60% 30% 60%", "40% 60% 70% 30% / 40% 50% 60% 50%"]
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  style={{
                    width: '320px',
                    height: '320px',
                    background: 'linear-gradient(135deg, rgba(6,78,59,0.2) 0%, rgba(142,68,173,0.15) 50%, rgba(231,76,60,0.1) 100%)',
                    filter: 'blur(10px)',
                    position: 'absolute'
                  }}
                />
                <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                  <Typography variant="h1" sx={{ fontSize: '12rem', opacity: 0.05, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>ॐ</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 600, fontStyle: 'italic' }}>"Health is the state of being established in one's own natural self."</Typography>
                  <Typography variant="caption" sx={{ mt: 2, display: 'block', letterSpacing: 2 }}>— SUSHRUTA SAMHITA</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* Benefits - Modern Ribbon */}
      <Box
        sx={{
          py: 12,
          bgcolor: darkMode ? 'rgba(6, 78, 59, 0.2)' : 'rgba(6, 78, 59, 0.03)',
          borderTop: '1px solid rgba(0,0,0,0.05)',
          borderBottom: '1px solid rgba(0,0,0,0.05)'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={5}>
              <Typography variant="overline" color="primary" sx={{ fontWeight: 600 }}>REASONS TO START</Typography>
              <Typography variant="h3" sx={{ mt: 2, mb: 4 }}>Why Knowledge is the First Step to Healing</Typography>
              <Typography variant="body1" color="text.secondary" paragraph sx={{ fontSize: '1.1rem' }}>
                Your Prakruti doesn't just tell you about your body; it explains your reactions to stress, your sleep patterns, and your natural talents.
              </Typography>
              <Button
                component={RouterLink}
                to="/register"
                variant="text"
                color="primary"
                endIcon={<ArrowForwardIcon />}
                sx={{ fontWeight: 600, fontSize: '1.1rem' }}
              >
                Join our community
              </Button>
            </Grid>
            <Grid item xs={12} md={7}>
              <Grid container spacing={3}>
                {[
                  { icon: <SpaIcon />, title: 'Deep Self-Awareness', text: 'Understand why you feel and act the way you do.' },
                  { icon: <FitnessIcon />, title: 'Yoga Guide', text: 'Ancient asanas tailored to harmonize your specific constitution.' },
                  { icon: <DiningIcon />, title: 'Smart Nutrition', text: 'Eat foods that fuel your specific fire.' },
                  { icon: <PsychologyIcon />, title: 'Mental Clarity', text: 'Align your mind with its natural rhythm.' }
                ].map((item, i) => (
                  <Grid item xs={12} sm={6} key={i}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        borderRadius: '20px',
                        bgcolor: darkMode ? 'rgba(255,255,255,0.05)' : 'white',
                        height: '100%',
                        transition: 'all 0.3s',
                        '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }
                      }}
                    >
                      <Box sx={{ color: 'primary.main', mb: 2 }}>{item.icon}</Box>
                      <Typography variant="h6" gutterBottom>{item.title}</Typography>
                      <Typography variant="body2" color="text.secondary">{item.text}</Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section - Minimalist & Powerful */}
      <Container maxWidth="md" sx={{ py: 20, textAlign: 'center' }}>
        <Paper
          className="glass"
          sx={{
            py: 10,
            px: { xs: 3, md: 8 },
            borderRadius: '40px',
            position: 'relative',
            overflow: 'hidden',
            bgcolor: darkMode ? 'rgba(6, 78, 59, 0.4)' : 'var(--primary)',
            color: 'white'
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
              Ready to embrace your nature?
            </Typography>
            <Typography variant="h6" sx={{ mb: 6, opacity: 0.8, fontWeight: 300 }}>
              It takes less than 10 minutes to reveal your Ayurvedic constitution.
            </Typography>
            <Button
              component={RouterLink}
              to={isAuthenticated ? '/assessment' : '/register'}
              variant="contained"
              sx={{
                bgcolor: 'white',
                color: 'var(--primary)',
                px: 8,
                py: 2,
                borderRadius: '100px',
                fontSize: '1.2rem',
                fontWeight: 700,
                '&:hover': {
                  bgcolor: '#f8fafc',
                  transform: 'scale(1.05)'
                }
              }}
            >
              Start Your Free Assessment
            </Button>
          </Box>
        </Paper>
      </Container>

      <style>
        {`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {transform: translateY(0) translateX(-50%);}
            40% {transform: translateY(-10px) translateX(-50%);}
            60% {transform: translateY(-5px) translateX(-50%);}
          }
        `}
      </style>
    </Box>
  );
};

export default Home;