import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  CircularProgress,
  useTheme as useMuiTheme
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Download as DownloadIcon,
  Share as ShareIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const Results = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const muiTheme = useMuiTheme();
  
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  // Mock data - in a real app, this would come from an API call using the ID
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Mock results data
      const mockResults = {
        id: id,
        date: new Date().toISOString(),
        doshas: {
          vata: 40,
          pitta: 35,
          kapha: 25
        },
        dominantDosha: 'Vata',
        secondaryDosha: 'Pitta',
        analysis: {
          body: 'Medium-sized, expressive eyes',
          skin: 'Moderately balanced skin',
          hair: 'Normal and slightly dimensional',
          digestion: 'Balanced',
          sleep: 'Regular pattern',
          energy: 'Balanced',
          emotions: 'Calm and steady',
          mind: 'Balanced',
          stress: 'Moderate response'
        },
        recommendations: {
          diet: [
            'Include cucumber, yogurt, and sweet fruits',
            'Avoid excessive spicy and oily foods',
            'Stay hydrated with room temperature water'
          ],
          lifestyle: [
            'Regular routine for meals and sleep',
            'Moderate exercise like walking',
            'Spend time in nature'
          ],
          practices: [
            'Meditation for 10-15 minutes daily',
            'Deep breathing exercises',
            'Self-massage with warm oil'
          ]
        }
      };

      setResults(mockResults);
      setLoading(false);
    }, 1500);
  }, [id]);

  // Chart data
  const chartData = {
    labels: ['Vata', 'Pitta', 'Kapha'],
    datasets: [
      {
        data: results ? [results.doshas.vata, results.doshas.pitta, results.doshas.kapha] : [0, 0, 0],
        backgroundColor: [
          'rgba(255, 159, 64, 0.7)',  // Orange for Vata
          'rgba(255, 99, 132, 0.7)',   // Red for Pitta
          'rgba(54, 162, 235, 0.7)',   // Blue for Kapha
        ],
        borderColor: [
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: darkMode ? '#fff' : '#333',
          font: {
            family: '"Poppins", sans-serif',
            size: 14
          }
        }
      },
      tooltip: {
        backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        titleColor: darkMode ? '#fff' : '#333',
        bodyColor: darkMode ? '#fff' : '#333',
        bodyFont: {
          family: '"Poppins", sans-serif'
        },
        titleFont: {
          family: '"Poppins", sans-serif',
          weight: 'bold'
        }
      }
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box textAlign="center">
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading your assessment results...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, minHeight: '80vh' }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h5" color="error" gutterBottom>
            Error Loading Results
          </Typography>
          <Typography variant="body1">
            {error}
          </Typography>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/dashboard')}
            sx={{ mt: 3 }}
          >
            Back to Dashboard
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6, minHeight: '80vh' }}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
            <Typography variant="h4" component="h1" fontWeight="bold">
              Assessment Results
            </Typography>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/dashboard')}
            >
              Back to Dashboard
            </Button>
          </Box>
        </motion.div>

        <Grid container spacing={4}>
          {/* Summary Card */}
          <Grid item xs={12} md={4}>
            <motion.div variants={itemVariants}>
              <Paper elevation={3} sx={{ p: 3, height: '100%', borderRadius: 2 }} className={darkMode ? 'glass-dark' : 'glass'}>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  Your Dosha Profile
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ height: 250, mb: 2 }}>
                  <Pie data={chartData} options={chartOptions} />
                </Box>
                <Typography variant="h6" gutterBottom>
                  Primary Constitution: <strong>{results.dominantDosha}</strong>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Secondary Influence: <strong>{results.secondaryDosha}</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Assessment Date: {new Date(results.date).toLocaleDateString()}
                </Typography>
              </Paper>
            </motion.div>
          </Grid>

          {/* Analysis Table */}
          <Grid item xs={12} md={8}>
            <motion.div variants={itemVariants}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }} className={darkMode ? 'glass-dark' : 'glass'}>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  Detailed Analysis
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Trait</strong></TableCell>
                        <TableCell><strong>Your Characteristics</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.entries(results.analysis).map(([trait, value]) => (
                        <TableRow key={trait}>
                          <TableCell sx={{ textTransform: 'capitalize' }}>{trait.replace('_', ' ')}</TableCell>
                          <TableCell>{value}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </motion.div>
          </Grid>

          {/* Recommendations */}
          <Grid item xs={12}>
            <motion.div variants={itemVariants}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }} className={darkMode ? 'glass-dark' : 'glass'}>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  Personalized Recommendations
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Card sx={{ height: '100%', bgcolor: 'transparent', boxShadow: 'none' }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom color="primary">
                          Diet & Nutrition
                        </Typography>
                        <ul style={{ paddingLeft: '1.5rem' }}>
                          {results.recommendations.diet.map((item, index) => (
                            <li key={index}>
                              <Typography variant="body2" paragraph>
                                {item}
                              </Typography>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Card sx={{ height: '100%', bgcolor: 'transparent', boxShadow: 'none' }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom color="primary">
                          Lifestyle
                        </Typography>
                        <ul style={{ paddingLeft: '1.5rem' }}>
                          {results.recommendations.lifestyle.map((item, index) => (
                            <li key={index}>
                              <Typography variant="body2" paragraph>
                                {item}
                              </Typography>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Card sx={{ height: '100%', bgcolor: 'transparent', boxShadow: 'none' }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom color="primary">
                          Daily Practices
                        </Typography>
                        <ul style={{ paddingLeft: '1.5rem' }}>
                          {results.recommendations.practices.map((item, index) => (
                            <li key={index}>
                              <Typography variant="body2" paragraph>
                                {item}
                              </Typography>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Paper>
            </motion.div>
          </Grid>

          {/* Action Buttons */}
          <Grid item xs={12}>
            <motion.div variants={itemVariants}>
              <Box display="flex" justifyContent="center" gap={2} mt={2}>
                <Button
                  variant="contained"
                  startIcon={<DownloadIcon />}
                  onClick={() => alert('Download functionality would be implemented here')}
                >
                  Download Report
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<ShareIcon />}
                  onClick={() => alert('Share functionality would be implemented here')}
                >
                  Share Results
                </Button>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default Results;