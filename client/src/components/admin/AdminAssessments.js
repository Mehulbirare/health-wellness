import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Container,
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  CircularProgress,
  Alert,
  Chip,
  Tooltip,
  Card,
  CardContent,
  Grid
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon
} from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminAssessments = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    vata: 0,
    pitta: 0,
    kapha: 0
  });
  
  // Dialog states
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  
  useEffect(() => {
    // Redirect if not admin
    if (!authLoading && (!isAuthenticated || user?.role !== 'admin')) {
      navigate('/dashboard');
    }
    
    const fetchAssessments = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/admin/assessments');
        setAssessments(res.data);
        
        // Calculate stats
        const total = res.data.length;
        const vataCount = res.data.filter(a => a.dominantDosha === 'vata').length;
        const pittaCount = res.data.filter(a => a.dominantDosha === 'pitta').length;
        const kaphaCount = res.data.filter(a => a.dominantDosha === 'kapha').length;
        
        setStats({
          total,
          vata: vataCount,
          pitta: pittaCount,
          kapha: kaphaCount
        });
        
        setError('');
      } catch (err) {
        console.error('Error fetching assessments:', err);
        setError('Failed to load assessments');
      } finally {
        setLoading(false);
      }
    };
    
    if (isAuthenticated && user?.role === 'admin') {
      fetchAssessments();
    }
  }, [isAuthenticated, user, authLoading, navigate]);
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(0);
  };
  
  const handleOpenDeleteDialog = (assessment) => {
    setSelectedAssessment(assessment);
    setOpenDeleteDialog(true);
  };
  
  const handleOpenViewDialog = (assessment) => {
    setSelectedAssessment(assessment);
    setOpenViewDialog(true);
  };
  
  const handleCloseDialogs = () => {
    setOpenDeleteDialog(false);
    setOpenViewDialog(false);
    setSelectedAssessment(null);
  };
  
  const handleDeleteAssessment = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/admin/assessments/${selectedAssessment._id}`);
      setAssessments(assessments.filter(a => a._id !== selectedAssessment._id));
      
      // Update stats
      setStats(prev => ({
        ...prev,
        total: prev.total - 1,
        [selectedAssessment.dominantDosha]: prev[selectedAssessment.dominantDosha] - 1
      }));
      
      toast.success('Assessment deleted successfully');
      handleCloseDialogs();
    } catch (err) {
      console.error('Error deleting assessment:', err);
      toast.error(err.response?.data?.message || 'Failed to delete assessment');
    } finally {
      setLoading(false);
    }
  };
  
  // Filter assessments based on search term
  const filteredAssessments = assessments.filter(assessment => 
    assessment.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assessment.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assessment.dominantDosha?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
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
        Assessment Management
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            elevation={3}
            sx={{ 
              bgcolor: darkMode ? 'background.paper' : 'background.default',
              borderLeft: '4px solid #3f51b5'
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>Total Assessments</Typography>
              <Typography variant="h3">{stats.total}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            elevation={3}
            sx={{ 
              bgcolor: darkMode ? 'background.paper' : 'background.default',
              borderLeft: '4px solid #ff9800'
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>Vata Dominant</Typography>
              <Typography variant="h3">{stats.vata}</Typography>
              <Typography variant="body2" color="text.secondary">
                {stats.total > 0 ? Math.round((stats.vata / stats.total) * 100) : 0}% of total
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            elevation={3}
            sx={{ 
              bgcolor: darkMode ? 'background.paper' : 'background.default',
              borderLeft: '4px solid #f44336'
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>Pitta Dominant</Typography>
              <Typography variant="h3">{stats.pitta}</Typography>
              <Typography variant="body2" color="text.secondary">
                {stats.total > 0 ? Math.round((stats.pitta / stats.total) * 100) : 0}% of total
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            elevation={3}
            sx={{ 
              bgcolor: darkMode ? 'background.paper' : 'background.default',
              borderLeft: '4px solid #4caf50'
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>Kapha Dominant</Typography>
              <Typography variant="h3">{stats.kapha}</Typography>
              <Typography variant="body2" color="text.secondary">
                {stats.total > 0 ? Math.round((stats.kapha / stats.total) * 100) : 0}% of total
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Paper 
        elevation={3}
        sx={{ 
          width: '100%', 
          mb: 2,
          bgcolor: darkMode ? 'background.paper' : 'background.default'
        }}
      >
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search assessments..."
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ width: 300 }}
            InputProps={{
              startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />
            }}
          />
          <Box sx={{ ml: 'auto' }}>
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              sx={{ mr: 1 }}
            >
              Filter
            </Button>
          </Box>
        </Box>
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Dominant Dosha</TableCell>
                <TableCell>Date Completed</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : filteredAssessments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No assessments found
                  </TableCell>
                </TableRow>
              ) : (
                filteredAssessments
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((assessment) => (
                    <TableRow key={assessment._id}>
                      <TableCell>{assessment.user?.name || 'Unknown'}</TableCell>
                      <TableCell>{assessment.user?.email || 'Unknown'}</TableCell>
                      <TableCell>
                        <Chip 
                          label={assessment.dominantDosha?.toUpperCase() || 'Unknown'}
                          color={
                            assessment.dominantDosha === 'vata' ? 'warning' :
                            assessment.dominantDosha === 'pitta' ? 'error' :
                            assessment.dominantDosha === 'kapha' ? 'success' : 'default'
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {new Date(assessment.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="View Details">
                          <IconButton 
                            color="primary" 
                            onClick={() => handleOpenViewDialog(assessment)}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Assessment">
                          <IconButton 
                            color="error" 
                            onClick={() => handleOpenDeleteDialog(assessment)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredAssessments.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      
      {/* Delete Assessment Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDialogs}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this assessment? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogs}>Cancel</Button>
          <Button onClick={handleDeleteAssessment} color="error" variant="contained">
            {loading ? <CircularProgress size={24} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* View Assessment Dialog */}
      <Dialog
        open={openViewDialog}
        onClose={handleCloseDialogs}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Assessment Details</DialogTitle>
        <DialogContent>
          {selectedAssessment && (
            <Box>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    User
                  </Typography>
                  <Typography variant="body1">
                    {selectedAssessment.user?.name || 'Unknown'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1">
                    {selectedAssessment.user?.email || 'Unknown'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Completed On
                  </Typography>
                  <Typography variant="body1">
                    {new Date(selectedAssessment.createdAt).toLocaleString()}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Dominant Dosha
                  </Typography>
                  <Typography variant="body1">
                    <Chip 
                      label={selectedAssessment.dominantDosha?.toUpperCase() || 'Unknown'}
                      color={
                        selectedAssessment.dominantDosha === 'vata' ? 'warning' :
                        selectedAssessment.dominantDosha === 'pitta' ? 'error' :
                        selectedAssessment.dominantDosha === 'kapha' ? 'success' : 'default'
                      }
                    />
                  </Typography>
                </Grid>
              </Grid>
              
              <Typography variant="h6" gutterBottom>
                Dosha Breakdown
              </Typography>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={4}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" color="warning.main">Vata</Typography>
                      <Typography variant="h4">
                        {selectedAssessment.scores?.vata || 0}%
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" color="error.main">Pitta</Typography>
                      <Typography variant="h4">
                        {selectedAssessment.scores?.pitta || 0}%
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" color="success.main">Kapha</Typography>
                      <Typography variant="h4">
                        {selectedAssessment.scores?.kapha || 0}%
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              
              <Typography variant="h6" gutterBottom>
                Assessment Responses
              </Typography>
              <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Question</TableCell>
                      <TableCell>Response</TableCell>
                      <TableCell>Dosha</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedAssessment.responses && Object.entries(selectedAssessment.responses).map(([key, value]) => (
                      <TableRow key={key}>
                        <TableCell>{key}</TableCell>
                        <TableCell>{value}</TableCell>
                        <TableCell>
                          <Chip 
                            label={value?.toUpperCase() || 'Unknown'}
                            color={
                              value === 'vata' ? 'warning' :
                              value === 'pitta' ? 'error' :
                              value === 'kapha' ? 'success' : 'default'
                            }
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogs}>Close</Button>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => {
              handleCloseDialogs();
              navigate(`/admin/users/${selectedAssessment.user?._id}`);
            }}
          >
            View User Profile
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminAssessments;