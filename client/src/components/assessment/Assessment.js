import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Container,
  Box,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Check as CheckIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

// Assessment sections and questions
const assessmentSections = [
  {
    title: 'Physical Characteristics',
    questions: [
      {
        id: 'physical_1',
        question: 'What is your body frame like?',
        options: [
          { value: 'vata', label: 'Thin, lean, difficult to gain weight' },
          { value: 'pitta', label: 'Medium build, moderate weight gain/loss' },
          { value: 'kapha', label: 'Larger build, gains weight easily' }
        ]
      },
      {
        id: 'physical_2',
        question: 'How would you describe your skin?',
        options: [
          { value: 'vata', label: 'Dry, rough, or thin' },
          { value: 'pitta', label: 'Warm, reddish, sensitive' },
          { value: 'kapha', label: 'Thick, oily, cool to touch' }
        ]
      },
      {
        id: 'physical_3',
        question: 'What best describes your hair?',
        options: [
          { value: 'vata', label: 'Dry, frizzy, or brittle' },
          { value: 'pitta', label: 'Fine, early graying, or balding' },
          { value: 'kapha', label: 'Thick, wavy, lustrous' }
        ]
      },
      {
        id: 'physical_4',
        question: 'How would you describe your eyes?',
        options: [
          { value: 'vata', label: 'Small, active, dry' },
          { value: 'pitta', label: 'Medium-sized, sharp, intense' },
          { value: 'kapha', label: 'Large, attractive, thick lashes' }
        ]
      },
      {
        id: 'physical_5',
        question: 'What is your typical energy level?',
        options: [
          { value: 'vata', label: 'Erratic, comes in bursts' },
          { value: 'pitta', label: 'Moderate, focused, purposeful' },
          { value: 'kapha', label: 'Steady, enduring, but slow to start' }
        ]
      }
    ]
  },
  {
    title: 'Mental Traits',
    questions: [
      {
        id: 'mental_1',
        question: 'How do you typically handle stress?',
        options: [
          { value: 'vata', label: 'Anxious, worried, overthinking' },
          { value: 'pitta', label: 'Irritable, frustrated, argumentative' },
          { value: 'kapha', label: 'Calm, steady, may withdraw' }
        ]
      },
      {
        id: 'mental_2',
        question: 'How would you describe your memory?',
        options: [
          { value: 'vata', label: 'Quick to learn, quick to forget' },
          { value: 'pitta', label: 'Sharp, clear, focused' },
          { value: 'kapha', label: 'Slow to learn, but excellent retention' }
        ]
      },
      {
        id: 'mental_3',
        question: 'What is your typical speech pattern?',
        options: [
          { value: 'vata', label: 'Fast, enthusiastic, sometimes scattered' },
          { value: 'pitta', label: 'Clear, precise, persuasive' },
          { value: 'kapha', label: 'Slow, methodical, thoughtful' }
        ]
      },
      {
        id: 'mental_4',
        question: 'How do you approach decision making?',
        options: [
          { value: 'vata', label: 'Indecisive, changes mind frequently' },
          { value: 'pitta', label: 'Decisive, strategic, goal-oriented' },
          { value: 'kapha', label: 'Careful, methodical, resistant to change' }
        ]
      },
      {
        id: 'mental_5',
        question: 'How would you describe your creativity?',
        options: [
          { value: 'vata', label: 'Highly imaginative, many ideas' },
          { value: 'pitta', label: 'Innovative, practical solutions' },
          { value: 'kapha', label: 'Steady, methodical, traditional' }
        ]
      }
    ]
  },
  {
    title: 'Daily Habits',
    questions: [
      {
        id: 'habits_1',
        question: 'How is your appetite?',
        options: [
          { value: 'vata', label: 'Variable, sometimes forget to eat' },
          { value: 'pitta', label: 'Strong, irritable when hungry' },
          { value: 'kapha', label: 'Steady, can easily skip meals' }
        ]
      },
      {
        id: 'habits_2',
        question: 'How would you describe your sleep?',
        options: [
          { value: 'vata', label: 'Light, easily disturbed' },
          { value: 'pitta', label: 'Moderate, wake up refreshed' },
          { value: 'kapha', label: 'Deep, difficulty waking up' }
        ]
      },
      {
        id: 'habits_3',
        question: 'What exercise do you prefer?',
        options: [
          { value: 'vata', label: 'Light, variable (walking, dancing)' },
          { value: 'pitta', label: 'Moderate, competitive (running, sports)' },
          { value: 'kapha', label: 'Steady, strength-building (weight training)' }
        ]
      },
      {
        id: 'habits_4',
        question: 'How do you handle routine?',
        options: [
          { value: 'vata', label: 'Dislike routine, prefer variety' },
          { value: 'pitta', label: 'Organized, efficient routines' },
          { value: 'kapha', label: 'Thrive on routine, resistant to change' }
        ]
      },
      {
        id: 'habits_5',
        question: 'What is your spending style?',
        options: [
          { value: 'vata', label: 'Impulsive, variable spending' },
          { value: 'pitta', label: 'Strategic, value-focused' },
          { value: 'kapha', label: 'Conservative, saves money' }
        ]
      }
    ]
  },
  {
    title: 'Environmental Reactions',
    questions: [
      {
        id: 'environment_1',
        question: 'How do you react to cold weather?',
        options: [
          { value: 'vata', label: 'Strongly dislike cold, get cold easily' },
          { value: 'pitta', label: 'Tolerate cold well, prefer cooler environments' },
          { value: 'kapha', label: 'Not bothered by cold, but dislike damp cold' }
        ]
      },
      {
        id: 'environment_2',
        question: 'How do you react to hot weather?',
        options: [
          { value: 'vata', label: 'Enjoy warmth, tolerate heat well' },
          { value: 'pitta', label: 'Dislike heat, overheat easily' },
          { value: 'kapha', label: 'Enjoy warmth, tolerate heat well' }
        ]
      },
      {
        id: 'environment_3',
        question: 'How does your energy change with the seasons?',
        options: [
          { value: 'vata', label: 'Lowest in fall/early winter' },
          { value: 'pitta', label: 'Lowest in late spring/summer' },
          { value: 'kapha', label: 'Lowest in winter/early spring' }
        ]
      },
      {
        id: 'environment_4',
        question: 'How do you react to stress in your environment?',
        options: [
          { value: 'vata', label: 'Become anxious, overwhelmed' },
          { value: 'pitta', label: 'Become irritable, critical' },
          { value: 'kapha', label: 'Withdraw, become stubborn' }
        ]
      },
      {
        id: 'environment_5',
        question: 'What type of environment helps you feel most balanced?',
        options: [
          { value: 'vata', label: 'Warm, cozy, organized spaces' },
          { value: 'pitta', label: 'Cool, moderately organized, calming spaces' },
          { value: 'kapha', label: 'Bright, stimulating, variable spaces' }
        ]
      }
    ]
  }
];

const Assessment = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    // Redirect if not authenticated
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, authLoading, navigate]);
  
  const isStepComplete = (step) => {
    const currentSection = assessmentSections[step];
    return currentSection.questions.every((q) => answers[q.id]);
  };
  
  const handleNext = () => {
    const currentSection = assessmentSections[activeStep];
    const allQuestionsAnswered = currentSection.questions.every(
      (q) => answers[q.id]
    );

    if (!allQuestionsAnswered) {
      setError('Please answer all questions before proceeding.');
      return;
    }

    setError('');

    if (activeStep === assessmentSections.length - 1) {
      calculateResults();
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers({
      ...answers,
      [questionId]: value
    });

    // Clear error when user answers a question
    setError('');
  };
  
  const calculateResults = () => {
    setLoading(true);

    // Count the occurrences of each dosha in the answers
    const counts = Object.values(answers).reduce(
      (acc, value) => {
        acc[value]++;
        return acc;
      },
      { vata: 0, pitta: 0, kapha: 0 }
    );

    // Calculate percentages
    const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
    const percentages = {
      vata: Math.round((counts.vata / total) * 100),
      pitta: Math.round((counts.pitta / total) * 100),
      kapha: Math.round((counts.kapha / total) * 100)
    };

    // Determine primary and secondary doshas
    const sortedDoshas = Object.entries(percentages).sort((a, b) => b[1] - a[1]);
    const primaryDosha = sortedDoshas[0][0];
    const secondaryDosha = sortedDoshas[1][0];

    // In a real app, you would save this to the user's profile via an API call
    setTimeout(() => {
      setResults({
        percentages,
        primaryDosha,
        secondaryDosha,
        constitution: `${primaryDosha}-${secondaryDosha}`
      });
      setLoading(false);
    }, 1500); // Simulating API call delay
  };

  const resetAssessment = () => {
    setAnswers({});
    setResults(null);
    setActiveStep(0);
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

  const getDoshaDescription = (dosha) => {
    switch (dosha) {
      case 'vata':
        return 'Vata represents the elements of space and air. Vata individuals are typically creative, energetic, and quick-thinking, but may struggle with anxiety and irregular routines.';
      case 'pitta':
        return 'Pitta represents the elements of fire and water. Pitta individuals are typically intelligent, focused, and ambitious, but may struggle with irritability and impatience.';
      case 'kapha':
        return 'Kapha represents the elements of earth and water. Kapha individuals are typically calm, grounded, and loyal, but may struggle with lethargy and resistance to change.';
      default:
        return '';
    }
  };

  const getDoshaRecommendations = (dosha) => {
    switch (dosha) {
      case 'vata':
        return [
          'Maintain regular daily routines',
          'Favor warm, cooked, moist foods',
          'Practice grounding exercises like yoga and meditation',
          'Keep warm and avoid cold, windy environments',
          'Use calming essential oils like lavender and chamomile'
        ];
      case 'pitta':
        return [
          'Avoid excessive heat and direct sunlight',
          'Favor cooling foods like sweet fruits and vegetables',
          'Practice moderate exercise, avoiding intense competition',
          'Make time for relaxation and leisure',
          'Use cooling essential oils like mint and sandalwood'
        ];
      case 'kapha':
        return [
          'Maintain an active lifestyle with regular exercise',
          'Favor light, warm, spicy foods',
          'Embrace change and new experiences',
          'Rise early and avoid daytime naps',
          'Use stimulating essential oils like eucalyptus and rosemary'
        ];
      default:
        return [];
    }
  };

  if (authLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          elevation={0}
          className={darkMode ? 'glass-dark' : 'glass'}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            overflow: 'hidden'
          }}
        >
          {!results ? (
            <>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
                  Ayurvedic Constitution Assessment
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Answer the following questions to discover your unique mind-body constitution (Prakriti).
                </Typography>
              </Box>

              <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
                {assessmentSections.map((section) => (
                  <Step key={section.title}>
                    <StepLabel>{section.title}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                      {assessmentSections[activeStep].title}
                    </Typography>

                    {assessmentSections[activeStep].questions.map((question) => (
                      <Box key={question.id} sx={{ mb: 4 }}>
                        <FormControl component="fieldset" sx={{ width: '100%' }}>
                          <FormLabel component="legend" sx={{ mb: 2, fontSize: '1.1rem', fontWeight: 500 }}>
                            {question.question}
                          </FormLabel>
                          <RadioGroup
                            name={question.id}
                            value={answers[question.id] || ''}
                            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                          >
                            {question.options.map((option) => (
                              <FormControlLabel
                                key={option.value}
                                value={option.value}
                                control={<Radio />}
                                label={option.label}
                                sx={{ mb: 1 }}
                              />
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </Box>
                    ))}
                  </Box>
                </motion.div>
              </AnimatePresence>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={handleBack}
                  startIcon={<ArrowBackIcon />}
                  disabled={activeStep === 0}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  endIcon={<ArrowForwardIcon />}
                  disabled={!isStepComplete(activeStep)}
                >
                  {activeStep === assessmentSections.length - 1 ? 'Submit' : 'Next'}
                </Button>
              </Box>
            </>
          ) : loading ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8 }}>
              <CircularProgress size={60} sx={{ mb: 4 }} />
              <Typography variant="h6">Analyzing your responses...</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Determining your unique Ayurvedic constitution
              </Typography>
            </Box>
          ) : (
            <Box>
              <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
                  Your Ayurvedic Constitution
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Based on your responses, we've determined your unique mind-body constitution (Prakriti).
                </Typography>
              </Box>

              <Grid container spacing={4} sx={{ mb: 6 }}>
                <Grid item xs={12} md={6}>
                  <Card
                    elevation={0}
                    className={darkMode ? 'glass-dark' : 'glass'}
                    sx={{ height: '100%', borderRadius: 4 }}
                  >
                    <CardContent>
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                        Your Dosha Profile
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Your constitution is primarily {getDosha(results.primaryDosha)} with {getDosha(results.secondaryDosha)} as a secondary influence.
                      </Typography>

                      <Box sx={{ mb: 4 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2">Vata</Typography>
                          <Typography variant="body2">{results.percentages.vata}%</Typography>
                        </Box>
                        <Box
                          sx={{
                            height: 10,
                            borderRadius: 5,
                            bgcolor: 'background.paper',
                            mb: 2
                          }}
                        >
                          <Box
                            sx={{
                              height: '100%',
                              borderRadius: 5,
                              width: `${results.percentages.vata}%`,
                              bgcolor: '#8E85EE' // Purple for Vata
                            }}
                          />
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2">Pitta</Typography>
                          <Typography variant="body2">{results.percentages.pitta}%</Typography>
                        </Box>
                        <Box
                          sx={{
                            height: 10,
                            borderRadius: 5,
                            bgcolor: 'background.paper',
                            mb: 2
                          }}
                        >
                          <Box
                            sx={{
                              height: '100%',
                              borderRadius: 5,
                              width: `${results.percentages.pitta}%`,
                              bgcolor: '#FF7D7D' // Red for Pitta
                            }}
                          />
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2">Kapha</Typography>
                          <Typography variant="body2">{results.percentages.kapha}%</Typography>
                        </Box>
                        <Box
                          sx={{
                            height: 10,
                            borderRadius: 5,
                            bgcolor: 'background.paper',
                            mb: 2
                          }}
                        >
                          <Box
                            sx={{
                              height: '100%',
                              borderRadius: 5,
                              width: `${results.percentages.kapha}%`,
                              bgcolor: '#78C2AD' // Green for Kapha
                            }}
                          />
                        </Box>
                      </Box>

                      <Button
                        variant="outlined"
                        startIcon={<RefreshIcon />}
                        onClick={resetAssessment}
                        sx={{ mt: 2 }}
                      >
                        Retake Assessment
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card
                    elevation={0}
                    className={darkMode ? 'glass-dark' : 'glass'}
                    sx={{ height: '100%', borderRadius: 4 }}
                  >
                    <CardContent>
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                        Understanding Your Primary Dosha
                      </Typography>
                      <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                        {getDosha(results.primaryDosha)}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 3 }}>
                        {getDoshaDescription(results.primaryDosha)}
                      </Typography>

                      <Divider sx={{ mb: 3 }} />

                      <Typography variant="h6" gutterBottom>
                        Recommendations for Balance
                      </Typography>
                      <List>
                        {getDoshaRecommendations(results.primaryDosha).map((recommendation, index) => (
                          <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <CheckIcon color="primary" fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary={recommendation} />
                          </ListItem>
                        ))}
                      </List>

                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/dashboard')}
                        sx={{ mt: 3 }}
                      >
                        View Detailed Recommendations
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Assessment;