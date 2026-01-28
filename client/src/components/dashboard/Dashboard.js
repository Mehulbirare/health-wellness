import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme as useMuiTheme
} from '@mui/material';
import {
  Assessment as AssessmentIcon,
  Restaurant as DietIcon,
  SelfImprovement as LifestyleIcon,
  Spa as WellnessIcon,
  FitnessCenter as ExerciseIcon,
  Opacity as HydrationIcon,
  Nightlight as SleepIcon,
  ArrowForward as ArrowForwardIcon,
  Check as CheckIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// We'll use the actual user data from AuthContext instead of mock data

const Dashboard = () => {
  const { user, isAuthenticated, loading: authLoading, logout } = useAuth();
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    // Redirect if not authenticated
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
      return;
    }

    // Use the actual user data from AuthContext
    if (isAuthenticated && user) {
      // Format the user data to match our dashboard's expected structure
      const hasAssessment = user.prakrutiResult && user.prakrutiResult.lastAssessmentDate;
      const formattedUserData = {
        name: user.name || 'Mehul Birare',
        email: user.email || 'mehul.birare@example.com',
        constitution: hasAssessment ? {
          primaryDosha: user.prakrutiResult.dominantDosha?.split('-')[0] || '',
          secondaryDosha: user.prakrutiResult.dominantDosha?.split('-')[1] || '',
          percentages: {
            vata: user.prakrutiResult.vata ?? 0,
            pitta: user.prakrutiResult.pitta ?? 0,
            kapha: user.prakrutiResult.kapha ?? 0
          },
          lastAssessment: new Date(user.prakrutiResult.lastAssessmentDate).toISOString().split('T')[0]
        } : {
          primaryDosha: '',
          secondaryDosha: '',
          percentages: {
            vata: 0,
            pitta: 0,
            kapha: 0
          },
          lastAssessment: 'No assessment taken'
        }
      };

      setUserData(formattedUserData);
      setLoading(false);
    }
  }, [isAuthenticated, authLoading, navigate, user]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const getDosha = (dosha) => {
    switch (dosha) {
      case 'vata':
        return 'Vata';
      case 'pitta':
        return 'Pitta';
      case 'kapha':
        return 'Kapha';
      default:
        return '';
    }
  };

  const getDoshaColor = (dosha) => {
    switch (dosha) {
      case 'vata':
        return '#9C27B0'; // Purple for Vata
      case 'pitta':
        return '#F44336'; // Red for Pitta
      case 'kapha':
        return '#4CAF50'; // Green for Kapha
      default:
        return darkMode ? '#424242' : '#bdbdbd'; // Gray for neutral
    }
  };

  const getDietRecommendations = (primaryDosha) => {
    switch (primaryDosha) {
      case 'vata':
        return [
          'Favor warm, cooked, moist foods',
          'Include healthy oils like ghee and olive oil',
          'Eat regular meals at consistent times',
          'Enjoy sweet, sour, and salty tastes',
          'Limit dry, cold foods and raw vegetables',
          'Reduce caffeine and stimulants'
        ];
      case 'pitta':
        return [
          'Favor cooling, hydrating foods',
          'Include sweet, bitter, and astringent tastes',
          'Enjoy fresh fruits and vegetables',
          'Limit spicy, sour, and salty foods',
          'Reduce hot drinks and alcohol',
          'Avoid eating when angry or stressed'
        ];
      case 'kapha':
        return [
          'Favor light, warm, dry foods',
          'Include pungent, bitter, and astringent tastes',
          'Enjoy spices like ginger, black pepper, and turmeric',
          'Limit heavy, oily, and sweet foods',
          'Reduce dairy and cold drinks',
          'Consider intermittent fasting'
        ];
      default:
        return [];
    }
  };

  const getLifestyleRecommendations = (primaryDosha) => {
    switch (primaryDosha) {
      case 'vata':
        return [
          'Maintain regular daily routines',
          'Practice gentle, grounding yoga',
          'Get adequate rest and sleep',
          'Stay warm and avoid cold, windy environments',
          'Practice meditation and deep breathing',
          'Avoid excessive travel and overstimulation'
        ];
      case 'pitta':
        return [
          'Make time for relaxation and leisure',
          'Practice cooling, moderate exercise',
          'Avoid excessive heat and direct sunlight',
          'Practice moonlight walks and swimming',
          'Cultivate patience and compassion',
          'Balance work with play'
        ];
      case 'kapha':
        return [
          'Maintain an active lifestyle',
          'Practice vigorous, stimulating exercise',
          'Rise early (before 6 am)',
          'Embrace change and new experiences',
          'Avoid daytime naps',
          'Keep environments fresh and stimulating'
        ];
      default:
        return [];
    }
  };

  const getExerciseRecommendations = (primaryDosha) => {
    switch (primaryDosha) {
      case 'vata':
        return [
          'Gentle yoga with long holds',
          'Walking in nature',
          'Swimming in warm water',
          'Tai chi or qigong',
          'Dancing',
          'Avoid excessive endurance training'
        ];
      case 'pitta':
        return [
          'Moderate exercise in cool environments',
          'Swimming',
          'Moonlight walks',
          'Cycling at moderate pace',
          'Yoga focusing on surrender rather than achievement',
          'Team sports with a non-competitive approach'
        ];
      case 'kapha':
        return [
          'Vigorous, stimulating exercise',
          'Running or jogging',
          'High-intensity interval training',
          'Hot yoga',
          'Competitive sports',
          'Exercise in the morning'
        ];
      default:
        return [];
    }
  };

  if (authLoading || loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Grid container spacing={4}>
          {/* Profile Summary */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              elevation={0}
              className={darkMode ? 'glass-dark' : 'glass'}
              sx={{
                p: 3,
                borderRadius: 4,
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    backgroundColor: getDoshaColor(userData?.constitution?.primaryDosha),
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    mx: 'auto',
                    mb: 2,
                    position: 'relative',
                    border: '2px solid white'
                  }}
                >
                  {userData?.name?.charAt(0) || 'M'}
                </Box>
                <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
                  {userData?.name || 'Mehul Birare'}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {userData?.email || 'mehul.birare@example.com'}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Your Constitution
                </Typography>
                {userData?.constitution && userData.constitution.primaryDosha ? (
                  <>
                    <Typography variant="body1" paragraph>
                      Primary: <strong>{getDosha(userData.constitution.primaryDosha)}</strong> ({userData.constitution.percentages[userData.constitution.primaryDosha]}%)
                    </Typography>
                    <Typography variant="body1" paragraph>
                      Secondary: <strong>{getDosha(userData.constitution.secondaryDosha)}</strong> ({userData.constitution.percentages[userData.constitution.secondaryDosha]}%)
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Last assessment: {userData.constitution.lastAssessment}
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Vata: 0% | Pitta: 0% | Kapha: 0%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      You haven't taken the assessment yet.
                    </Typography>
                  </>
                )}
              </Box>

              <Box sx={{ mt: 'auto' }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<AssessmentIcon />}
                  onClick={() => navigate('/assessment')}
                  sx={{ borderRadius: '50px', py: 1.2, mb: 2 }}
                >
                  {userData?.constitution && userData.constitution.primaryDosha ? 'Retake Assessment' : 'Take Assessment'}
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  fullWidth
                  onClick={logout}
                  sx={{ borderRadius: '50px', py: 1.2 }}
                >
                  Logout
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper
              elevation={0}
              className={darkMode ? 'glass-dark' : 'glass'}
              sx={{
                p: { xs: 2, md: 4 },
                borderRadius: 4,
                mb: 4
              }}
            >
              <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
                  Welcome back, {userData?.name?.split(' ')[0] || 'Mehul'}!
                </Typography>
                {userData?.constitution && userData.constitution.primaryDosha ? (
                  <Typography variant="body1">
                    Based on your assessment, you have a <strong>{getDosha(userData.constitution.primaryDosha)}-{getDosha(userData.constitution.secondaryDosha)}</strong> constitution. Here are your personalized recommendations to maintain balance.
                  </Typography>
                ) : (
                  <Typography variant="body1">
                    You haven't taken the personal Prakruti assessment yet. Discover your unique Ayurvedic constitution to get personalized health and wellness recommendations.
                  </Typography>
                )}
              </Box>

              {userData?.constitution && (userData.constitution.primaryDosha || userData.constitution.percentages.vata === 0) ? (
                <>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                    <Tabs
                      value={activeTab}
                      onChange={handleTabChange}
                      variant={isMobile ? 'scrollable' : 'fullWidth'}
                      scrollButtons={isMobile ? 'auto' : false}
                      aria-label="dashboard tabs"
                    >
                      <Tab
                        label="Constitution"
                        icon={<WellnessIcon />}
                        iconPosition="start"
                        sx={{ minHeight: 64 }}
                      />
                      <Tab
                        label="Diet"
                        icon={<DietIcon />}
                        iconPosition="start"
                        sx={{ minHeight: 64 }}
                      />
                      <Tab
                        label="Lifestyle"
                        icon={<LifestyleIcon />}
                        iconPosition="start"
                        sx={{ minHeight: 64 }}
                      />
                      <Tab
                        label="Exercise"
                        icon={<ExerciseIcon />}
                        iconPosition="start"
                        sx={{ minHeight: 64 }}
                      />
                    </Tabs>
                  </Box>

                  <Box sx={{ py: 2 }}>
                    {/* Constitution Tab */}
                    {activeTab === 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                          Your Dosha Distribution
                        </Typography>

                        <Grid container spacing={4}>
                          <Grid item xs={12} md={6}>
                            <Box sx={{ mb: 4 }}>
                              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                {Object.entries(userData.constitution.percentages).map(([dosha, percentage]) => (
                                  <Box key={dosha}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                      <Typography variant="body1" sx={{ fontWeight: 500 }}>{getDosha(dosha)}</Typography>
                                      <Typography variant="body1">{percentage}%</Typography>
                                    </Box>
                                    <Box
                                      sx={{
                                        height: 12,
                                        borderRadius: 6,
                                        backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                                        overflow: 'hidden'
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          height: '100%',
                                          width: `${percentage}%`,
                                          backgroundColor: getDoshaColor(dosha),
                                          borderRadius: 6
                                        }}
                                      />
                                    </Box>
                                  </Box>
                                ))}
                              </Box>
                            </Box>
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <Box
                              sx={{
                                p: 3,
                                borderRadius: 4,
                                backgroundColor: darkMode ? 'rgba(30, 30, 30, 0.6)' : 'rgba(245, 245, 245, 0.6)',
                                height: '100%'
                              }}
                            >
                              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                {getDosha(userData.constitution.primaryDosha)}-{getDosha(userData.constitution.secondaryDosha)} Constitution
                              </Typography>
                              <Typography variant="body1" paragraph>
                                Your constitution is primarily {getDosha(userData.constitution.primaryDosha)} with {getDosha(userData.constitution.secondaryDosha)} as a secondary influence.
                              </Typography>
                              <Typography variant="body1">
                                This means you may experience characteristics of both doshas, with {getDosha(userData.constitution.primaryDosha)} traits being more dominant. Your personalized recommendations are designed to help you maintain balance and harmony between these energies.
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>

                        <Box sx={{ mt: 4 }}>
                          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                            Dosha Characteristics
                          </Typography>

                          <Grid container spacing={3}>
                            {[
                              {
                                dosha: 'vata',
                                elements: 'Air & Space',
                                qualities: 'Dry, light, cold, rough, subtle, mobile',
                                balanced: 'Creative, energetic, quick-thinking, flexible',
                                imbalanced: 'Anxious, scattered, irregular routines, insomnia'
                              },
                              {
                                dosha: 'pitta',
                                elements: 'Fire & Water',
                                qualities: 'Hot, sharp, light, liquid, spreading, oily',
                                balanced: 'Intelligent, focused, articulate, courageous',
                                imbalanced: 'Irritable, critical, impatient, inflammatory conditions'
                              },
                              {
                                dosha: 'kapha',
                                elements: 'Earth & Water',
                                qualities: 'Heavy, slow, cool, oily, smooth, dense, soft, stable',
                                balanced: 'Calm, loving, loyal, stable, strong',
                                imbalanced: 'Lethargic, attached, resistant to change, weight gain'
                              }
                            ].map((item) => (
                              <Grid item xs={12} md={4} key={item.dosha}>
                                <Card
                                  elevation={0}
                                  sx={{
                                    height: '100%',
                                    borderRadius: 4,
                                    backgroundColor: 'transparent',
                                    border: '1px solid',
                                    borderColor: item.dosha === userData.constitution.primaryDosha
                                      ? getDoshaColor(item.dosha)
                                      : 'divider'
                                  }}
                                >
                                  <CardContent>
                                    <Box
                                      sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        mb: 2
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          width: 16,
                                          height: 16,
                                          borderRadius: '50%',
                                          backgroundColor: getDoshaColor(item.dosha),
                                          mr: 1
                                        }}
                                      />
                                      <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                                        {getDosha(item.dosha)}
                                      </Typography>
                                    </Box>

                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                      <strong>Elements:</strong> {item.elements}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                      <strong>Qualities:</strong> {item.qualities}
                                    </Typography>
                                    <Divider sx={{ my: 1.5 }} />
                                    <Typography variant="body2" gutterBottom>
                                      <strong>When balanced:</strong> {item.balanced}
                                    </Typography>
                                    <Typography variant="body2">
                                      <strong>When imbalanced:</strong> {item.imbalanced}
                                    </Typography>
                                  </CardContent>
                                </Card>
                              </Grid>
                            ))}
                          </Grid>
                        </Box>
                      </motion.div>
                    )}

                    {/* Diet Tab */}
                    {activeTab === 1 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                          Dietary Recommendations
                        </Typography>

                        <Typography variant="body1" paragraph>
                          Based on your {getDosha(userData.constitution.primaryDosha)}-dominant constitution, here are dietary guidelines to help you maintain balance:
                        </Typography>

                        <Grid container spacing={4}>
                          <Grid item xs={12} md={6}>
                            <Paper
                              elevation={0}
                              className={darkMode ? 'glass-dark' : 'glass'}
                              sx={{ p: 3, borderRadius: 4, height: '100%' }}
                            >
                              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                                <DietIcon sx={{ mr: 1 }} /> General Guidelines
                              </Typography>
                              <List>
                                {getDietRecommendations(userData.constitution.primaryDosha).map((rec, index) => (
                                  <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                                    <ListItemIcon sx={{ minWidth: 32 }}>
                                      <CheckIcon color="primary" fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary={rec} />
                                  </ListItem>
                                ))}
                              </List>
                            </Paper>
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <Paper
                              elevation={0}
                              className={darkMode ? 'glass-dark' : 'glass'}
                              sx={{ p: 3, borderRadius: 4, height: '100%' }}
                            >
                              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                                <HydrationIcon sx={{ mr: 1 }} /> Hydration Tips
                              </Typography>
                              <List>
                                {userData.constitution.primaryDosha === 'vata' && (
                                  <>
                                    <ListItem sx={{ px: 0, py: 0.5 }}>
                                      <ListItemIcon sx={{ minWidth: 32 }}>
                                        <CheckIcon color="primary" fontSize="small" />
                                      </ListItemIcon>
                                      <ListItemText primary="Drink warm or hot water throughout the day" />
                                    </ListItem>
                                    <ListItem sx={{ px: 0, py: 0.5 }}>
                                      <ListItemIcon sx={{ minWidth: 32 }}>
                                        <CheckIcon color="primary" fontSize="small" />
                                      </ListItemIcon>
                                      <ListItemText primary="Enjoy warming herbal teas like ginger and cinnamon" />
                                    </ListItem>
                                    <ListItem sx={{ px: 0, py: 0.5 }}>
                                      <ListItemIcon sx={{ minWidth: 32 }}>
                                        <CheckIcon color="primary" fontSize="small" />
                                      </ListItemIcon>
                                      <ListItemText primary="Limit ice cold beverages" />
                                    </ListItem>
                                    <ListItem sx={{ px: 0, py: 0.5 }}>
                                      <ListItemIcon sx={{ minWidth: 32 }}>
                                        <CheckIcon color="primary" fontSize="small" />
                                      </ListItemIcon>
                                      <ListItemText primary="Consider golden milk (turmeric with warm milk) before bed" />
                                    </ListItem>
                                  </>
                                )}

                                {userData.constitution.primaryDosha === 'pitta' && (
                                  <>
                                    <ListItem sx={{ px: 0, py: 0.5 }}>
                                      <ListItemIcon sx={{ minWidth: 32 }}>
                                        <CheckIcon color="primary" fontSize="small" />
                                      </ListItemIcon>
                                      <ListItemText primary="Drink cool (not ice cold) water throughout the day" />
                                    </ListItem>
                                    <ListItem sx={{ px: 0, py: 0.5 }}>
                                      <ListItemIcon sx={{ minWidth: 32 }}>
                                        <CheckIcon color="primary" fontSize="small" />
                                      </ListItemIcon>
                                      <ListItemText primary="Enjoy cooling herbal teas like mint and fennel" />
                                    </ListItem>
                                    <ListItem sx={{ px: 0, py: 0.5 }}>
                                      <ListItemIcon sx={{ minWidth: 32 }}>
                                        <CheckIcon color="primary" fontSize="small" />
                                      </ListItemIcon>
                                      <ListItemText primary="Limit alcohol and caffeine" />
                                    </ListItem>
                                    <ListItem sx={{ px: 0, py: 0.5 }}>
                                      <ListItemIcon sx={{ minWidth: 32 }}>
                                        <CheckIcon color="primary" fontSize="small" />
                                      </ListItemIcon>
                                      <ListItemText primary="Try coconut water for natural electrolytes" />
                                    </ListItem>
                                  </>
                                )}

                                {userData.constitution.primaryDosha === 'kapha' && (
                                  <>
                                    <ListItem sx={{ px: 0, py: 0.5 }}>
                                      <ListItemIcon sx={{ minWidth: 32 }}>
                                        <CheckIcon color="primary" fontSize="small" />
                                      </ListItemIcon>
                                      <ListItemText primary="Drink hot water with lemon or honey throughout the day" />
                                    </ListItem>
                                    <ListItem sx={{ px: 0, py: 0.5 }}>
                                      <ListItemIcon sx={{ minWidth: 32 }}>
                                        <CheckIcon color="primary" fontSize="small" />
                                      </ListItemIcon>
                                      <ListItemText primary="Enjoy stimulating herbal teas like ginger and black pepper" />
                                    </ListItem>
                                    <ListItem sx={{ px: 0, py: 0.5 }}>
                                      <ListItemIcon sx={{ minWidth: 32 }}>
                                        <CheckIcon color="primary" fontSize="small" />
                                      </ListItemIcon>
                                      <ListItemText primary="Limit iced or cold beverages" />
                                    </ListItem>
                                    <ListItem sx={{ px: 0, py: 0.5 }}>
                                      <ListItemIcon sx={{ minWidth: 32 }}>
                                        <CheckIcon color="primary" fontSize="small" />
                                      </ListItemIcon>
                                      <ListItemText primary="Consider fasting from beverages other than warm water until noon" />
                                    </ListItem>
                                  </>
                                )}
                              </List>
                            </Paper>
                          </Grid>
                        </Grid>
                      </motion.div>
                    )}

                    {/* Lifestyle Tab */}
                    {activeTab === 2 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                          Lifestyle Recommendations
                        </Typography>

                        <Typography variant="body1" paragraph>
                          Based on your {getDosha(userData.constitution.primaryDosha)}-dominant constitution, here are lifestyle guidelines to help you maintain balance:
                        </Typography>

                        <Grid container spacing={4}>
                          <Grid item xs={12} md={6}>
                            <Paper
                              elevation={0}
                              className={darkMode ? 'glass-dark' : 'glass'}
                              sx={{ p: 3, borderRadius: 4, height: '100%' }}
                            >
                              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                                <LifestyleIcon sx={{ mr: 1 }} /> Daily Routines
                              </Typography>
                              <List>
                                {getLifestyleRecommendations(userData.constitution.primaryDosha).map((rec, index) => (
                                  <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                                    <ListItemIcon sx={{ minWidth: 32 }}>
                                      <CheckIcon color="primary" fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary={rec} />
                                  </ListItem>
                                ))}
                              </List>
                            </Paper>
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <Paper
                              elevation={0}
                              className={darkMode ? 'glass-dark' : 'glass'}
                              sx={{ p: 3, borderRadius: 4, height: '100%' }}
                            >
                              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                                <SleepIcon sx={{ mr: 1 }} /> Sleep Recommendations
                              </Typography>
                              <List>
                                {userData.constitution.primaryDosha === 'vata' && (
                                  <>
                                    <ListItem sx={{ px: 0, py: 0.5 }}>
                                      <ListItemIcon sx={{ minWidth: 32 }}>
                                        <CheckIcon color="primary" fontSize="small" />
                                      </ListItemIcon>
                                      <ListItemText primary="Establish a consistent sleep schedule" />
                                    </ListItem>
                                    <ListItem sx={{ px: 0, py: 0.5 }}>
                                      <ListItemIcon sx={{ minWidth: 32 }}>
                                        <CheckIcon color="primary" fontSize="small" />
                                      </ListItemIcon>
                                      <ListItemText primary="Create a calming bedtime routine" />
                                    </ListItem>
                                    <ListItem sx={{ px: 0, py: 0.5 }}>
                                      <ListItemIcon sx={{ minWidth: 32 }}>
                                        <CheckIcon color="primary" fontSize="small" />
                                      </ListItemIcon>
                                      <ListItemText primary="Use calming essential oils like lavender" />
                                    </ListItem>
                                    <ListItem sx={{ px: 0, py: 0.5 }}>
                                      <ListItemIcon sx={{ minWidth: 32 }}>
                                        <CheckIcon color="primary" fontSize="small" />
                                      </ListItemIcon>
                                      <ListItemText primary="Aim for 7-8 hours of sleep" />
                                    </ListItem>
                                  </>
                                )}

                                {userData.constitution.primaryDosha === 'pitta' && (
                                  <>
                                    <ListItem sx={{ px: 0, py: 0.5 }}>
                                      <ListItemIcon sx={{ minWidth: 32 }}>
                                        <CheckIcon color="primary" fontSize="small" />
                                      </ListItemIcon>
                                      <ListItemText primary="Keep your bedroom cool and well-ventilated" />
                                    </ListItem>
                                    <ListItem sx={{ px: 0, py: 0.5 }}>
                                      <ListItemIcon sx={{ minWidth: 32 }}>
                                        <CheckIcon color="primary" fontSize="small" />
                                      </ListItemIcon>
                                      <ListItemText primary="Avoid working or problem-solving before bed" />
                                    </ListItem>
                                    <ListItem sx={{ px: 0, py: 0.5 }}>
                                      <ListItemIcon sx={{ minWidth: 32 }}>
                                        <CheckIcon color="primary" fontSize="small" />
                                      </ListItemIcon>
                                      <ListItemText primary="Use cooling essential oils like sandalwood" />
                                    </ListItem>
                                    <ListItem sx={{ px: 0, py: 0.5 }}>
                                      <ListItemIcon sx={{ minWidth: 32 }}>
                                        <CheckIcon color="primary" fontSize="small" />
                                      </ListItemIcon>
                                      <ListItemText primary="Aim for 6-7 hours of sleep" />
                                    </ListItem>
                                  </>
                                )}

                                {userData.constitution.primaryDosha === 'kapha' && (
                                  <>
                                    <ListItem sx={{ px: 0, py: 0.5 }}>
                                      <ListItemIcon sx={{ minWidth: 32 }}>
                                        <CheckIcon color="primary" fontSize="small" />
                                      </ListItemIcon>
                                      <ListItemText primary="Rise early, before 6 am if possible" />
                                    </ListItem>
                                    <ListItem sx={{ px: 0, py: 0.5 }}>
                                      <ListItemIcon sx={{ minWidth: 32 }}>
                                        <CheckIcon color="primary" fontSize="small" />
                                      </ListItemIcon>
                                      <ListItemText primary="Avoid daytime napping" />
                                    </ListItem>
                                    <ListItem sx={{ px: 0, py: 0.5 }}>
                                      <ListItemIcon sx={{ minWidth: 32 }}>
                                        <CheckIcon color="primary" fontSize="small" />
                                      </ListItemIcon>
                                      <ListItemText primary="Use stimulating essential oils like eucalyptus in the morning" />
                                    </ListItem>
                                    <ListItem sx={{ px: 0, py: 0.5 }}>
                                      <ListItemIcon sx={{ minWidth: 32 }}>
                                        <CheckIcon color="primary" fontSize="small" />
                                      </ListItemIcon>
                                      <ListItemText primary="Aim for 6-7 hours of sleep" />
                                    </ListItem>
                                  </>
                                )}
                              </List>
                            </Paper>
                          </Grid>
                        </Grid>
                      </motion.div>
                    )}

                    {/* Exercise Tab */}
                    {activeTab === 3 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                          Exercise Recommendations
                        </Typography>

                        <Typography variant="body1" paragraph>
                          Based on your {getDosha(userData.constitution.primaryDosha)}-dominant constitution, here are exercise guidelines to help you maintain balance:
                        </Typography>

                        <Grid container spacing={4}>
                          <Grid item xs={12} md={6}>
                            <Paper
                              elevation={0}
                              className={darkMode ? 'glass-dark' : 'glass'}
                              sx={{ p: 3, borderRadius: 4, height: '100%' }}
                            >
                              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                                <ExerciseIcon sx={{ mr: 1 }} /> Recommended Activities
                              </Typography>
                              <List>
                                {getExerciseRecommendations(userData.constitution.primaryDosha).map((rec, index) => (
                                  <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                                    <ListItemIcon sx={{ minWidth: 32 }}>
                                      <CheckIcon color="primary" fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary={rec} />
                                  </ListItem>
                                ))}
                              </List>
                            </Paper>
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <Paper
                              elevation={0}
                              className={darkMode ? 'glass-dark' : 'glass'}
                              sx={{ p: 3, borderRadius: 4, height: '100%' }}
                            >
                              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                Exercise Guidelines
                              </Typography>

                              {userData.constitution.primaryDosha === 'vata' && (
                                <>
                                  <Typography variant="body1" paragraph>
                                    <strong>Intensity:</strong> Gentle to moderate
                                  </Typography>
                                  <Typography variant="body1" paragraph>
                                    <strong>Duration:</strong> 30-45 minutes
                                  </Typography>
                                  <Typography variant="body1" paragraph>
                                    <strong>Frequency:</strong> 3-5 times per week
                                  </Typography>
                                  <Typography variant="body1" paragraph>
                                    <strong>Best time:</strong> Sunrise or sunset
                                  </Typography>
                                  <Typography variant="body1">
                                    Focus on grounding, consistent movement rather than erratic or exhausting exercise. Always warm up properly and cool down with gentle stretching.
                                  </Typography>
                                </>
                              )}

                              {userData.constitution.primaryDosha === 'pitta' && (
                                <>
                                  <Typography variant="body1" paragraph>
                                    <strong>Intensity:</strong> Moderate
                                  </Typography>
                                  <Typography variant="body1" paragraph>
                                    <strong>Duration:</strong> 30-60 minutes
                                  </Typography>
                                  <Typography variant="body1" paragraph>
                                    <strong>Frequency:</strong> 3-4 times per week
                                  </Typography>
                                  <Typography variant="body1" paragraph>
                                    <strong>Best time:</strong> Early morning or evening (avoid midday heat)
                                  </Typography>
                                  <Typography variant="body1">
                                    Focus on cooling, non-competitive activities. Avoid exercising when already overheated or during the hottest part of the day. Stay well-hydrated.
                                  </Typography>
                                </>
                              )}

                              {userData.constitution.primaryDosha === 'kapha' && (
                                <>
                                  <Typography variant="body1" paragraph>
                                    <strong>Intensity:</strong> Moderate to vigorous
                                  </Typography>
                                  <Typography variant="body1" paragraph>
                                    <strong>Duration:</strong> 45-60 minutes
                                  </Typography>
                                  <Typography variant="body1" paragraph>
                                    <strong>Frequency:</strong> 5-6 times per week
                                  </Typography>
                                  <Typography variant="body1" paragraph>
                                    <strong>Best time:</strong> Early morning (6-10 am)
                                  </Typography>
                                  <Typography variant="body1">
                                    Focus on stimulating, energizing activities that build heat and induce sweating. Challenge yourself regularly with new routines to prevent stagnation.
                                  </Typography>
                                </>
                              )}
                            </Paper>
                          </Grid>
                        </Grid>
                      </motion.div>
                    )}
                  </Box>
                </>
              ) : (
                <Box sx={{ textAlign: 'center', py: 6 }}>
                  <AssessmentIcon sx={{ fontSize: 80, color: 'primary.main', mb: 2, opacity: 0.7 }} />
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                    Take the Ayurvedic Assessment
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
                    Discover your unique mind-body constitution and receive personalized recommendations for diet, lifestyle, and wellness practices.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => navigate('/assessment')}
                    sx={{ borderRadius: '50px', py: 1.5, px: 4 }}
                  >
                    Start Assessment
                  </Button>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default Dashboard;