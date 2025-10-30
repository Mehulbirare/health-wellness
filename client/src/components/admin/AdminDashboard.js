import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Divider,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  People as PeopleIcon,
  Assessment as AssessmentIcon,
  Dashboard as DashboardIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import axios from 'axios';

const AdminDashboard = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAssessments: 0,
    recentAssessments: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    // Redirect if not admin
    if (!authLoading && (!isAuthenticated || user?.role !== 'admin')) {
      navigate('/dashboard');
    }
    
    const fetchAdminStats = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/admin/stats');
        setStats(res.data);
        setError('');
      } catch (err) {
        console.error('Error fetching admin stats:', err);
        setError('Failed to load admin statistics');
      } finally {
        setLoading(false);
      }
    };
    
    if (isAuthenticated && user?.role === 'admin') {
      fetchAdminStats();
    }
  }, [isAuthenticated, user, authLoading, navigate]);
  
  if (authLoading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} md={4}>
          <Card 
            elevation={3}
            sx={{ 
              height: '100%',
              bgcolor: darkMode ? 'background.paper' : 'background.default',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)'
              }
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PeopleIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h5" component="div">
                  Users
                </Typography>
              </Box>
              <Typography variant="h3" component="div" sx={{ mb: 1 }}>
                {loading ? <CircularProgress size={30} /> : stats.totalUsers}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total registered users
              </Typography>
              <Button 
                variant="text" 
                color="primary" 
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate('/admin/users')}
                sx={{ mt: 2 }}
              >
                Manage Users
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card 
            elevation={3}
            sx={{ 
              height: '100%',
              bgcolor: darkMode ? 'background.paper' : 'background.default',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)'
              }
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AssessmentIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h5" component="div">
                  Assessments
                </Typography>
              </Box>
              <Typography variant="h3" component="div" sx={{ mb: 1 }}>
                {loading ? <CircularProgress size={30} /> : stats.totalAssessments}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total completed assessments
              </Typography>
              <Button 
                variant="text" 
                color="primary" 
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate('/admin/assessments')}
                sx={{ mt: 2 }}
              >
                View Assessments
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card 
            elevation={3}
            sx={{ 
              height: '100%',
              bgcolor: darkMode ? 'background.paper' : 'background.default',
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)'
              }
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <DashboardIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h5" component="div">
                  Dashboard
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Admin Controls
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage system settings and view analytics
              </Typography>
              <Button 
                variant="contained" 
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => navigate('/admin/settings')}
              >
                System Settings
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Recent Activity */}
        <Grid item xs={12}>
          <Paper 
            elevation={3}
            sx={{ 
              p: 3,
              bgcolor: darkMode ? 'background.paper' : 'background.default'
            }}
          >
            <Typography variant="h6" gutterBottom>
              Recent Assessments
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
              </Box>
            ) : error ? (
              <Typography color="error">{error}</Typography>
            ) : stats.recentAssessments.length > 0 ? (
              <List>
                {stats.recentAssessments.map((assessment) => (
                  <ListItem key={assessment._id} divider>
                    <ListItemIcon>
                      <AssessmentIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary={`${assessment.user.name} completed an assessment`}
                      secondary={new Date(assessment.createdAt).toLocaleString()}
                    />
                    <Button 
                      size="small" 
                      onClick={() => navigate(`/admin/assessments/${assessment._id}`)}
                    >
                      View Details
                    </Button>
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body1" sx={{ p: 2 }}>
                No recent assessments found.
              </Typography>
            )}
            
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button 
                variant="outlined" 
                color="primary"
                onClick={() => navigate('/admin/assessments')}
              >
                View All Assessments
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;