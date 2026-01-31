import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { recipesData } from '../../data/recipes';
import {
    Box,
    Container,
    Typography,
    Chip,
    IconButton,
    Button,
    Grid,
    Paper,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Rating
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    AccessTime as TimeIcon,
    Restaurant as DifficultyIcon,
    LocalFireDepartment as CaloriesIcon,
    CheckCircle as CheckIcon,
    Favorite as HeartIcon,
    Share as ShareIcon,
    Print as PrintIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const RecipeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { darkMode } = useTheme();

    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        // Find recipe by ID
        const foundRecipe = recipesData.find(r => r.id === parseInt(id));
        if (foundRecipe) {
            setRecipe(foundRecipe);
        } else {
            // Redirect if not found (optional, or show error)
            // navigate('/kitchen'); 
        }
    }, [id, navigate]);

    if (!recipe) {
        return (
            <Container sx={{ pt: 15, textAlign: 'center' }}>
                <Typography variant="h5">Loading Recipe...</Typography>
            </Container>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', pt: 12, pb: 8 }}>
            <Container maxWidth="lg">
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate(-1)}
                    sx={{ mb: 4, color: 'text.secondary' }}
                >
                    Back to Kitchen
                </Button>

                <Grid container spacing={6}>
                    {/* Left Column: Image & Quick Stats */}
                    <Grid item xs={12} md={6}>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Box
                                component="img"
                                src={recipe.image}
                                alt={recipe.title}
                                sx={{
                                    width: '100%',
                                    borderRadius: '30px',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                                    mb: 4
                                }}
                            />

                            <Paper
                                elevation={0}
                                sx={{
                                    p: 3,
                                    borderRadius: '20px',
                                    bgcolor: darkMode ? 'rgba(255,255,255,0.05)' : 'white',
                                    border: '1px solid rgba(0,0,0,0.05)'
                                }}
                            >
                                <Grid container spacing={2} sx={{ textAlign: 'center' }}>
                                    <Grid item xs={4}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                                            <TimeIcon color="primary" />
                                            <Typography variant="caption" color="text.secondary">TIME</Typography>
                                            <Typography fontWeight={700}>{recipe.time}</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                                            <DifficultyIcon color="primary" />
                                            <Typography variant="caption" color="text.secondary">LEVEL</Typography>
                                            <Typography fontWeight={700}>{recipe.difficulty}</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                                            <CaloriesIcon color="primary" />
                                            <Typography variant="caption" color="text.secondary">CALORIES</Typography>
                                            <Typography fontWeight={700}>{recipe.calories}</Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </motion.div>
                    </Grid>

                    {/* Right Column: Details */}
                    <Grid item xs={12} md={6}>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                                <Box>
                                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                        {recipe.dosha.map(d => (
                                            <Chip
                                                key={d}
                                                label={d}
                                                size="small"
                                                sx={{
                                                    bgcolor: 'primary.main',
                                                    color: 'white',
                                                    fontWeight: 600
                                                }}
                                            />
                                        ))}
                                    </Box>
                                    <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, lineHeight: 1.1 }}>
                                        {recipe.title}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Rating value={recipe.rating} readOnly size="small" />
                                        <Typography variant="body2" color="text.secondary">({recipe.rating})</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <IconButton sx={{ bgcolor: darkMode ? 'rgba(255,255,255,0.05)' : '#f1f5f9' }}>
                                        <ShareIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton sx={{ bgcolor: darkMode ? 'rgba(255,255,255,0.05)' : '#f1f5f9' }}>
                                        <HeartIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            </Box>

                            <Typography variant="body1" sx={{ mb: 4, opacity: 0.8, fontSize: '1.1rem', lineHeight: 1.8 }}>
                                {recipe.description}
                            </Typography>

                            <Box sx={{ mb: 4, p: 3, borderRadius: '20px', bgcolor: 'rgba(120, 194, 173, 0.1)', border: '1px solid rgba(120, 194, 173, 0.2)' }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                                    Ayurvedic Benefits
                                </Typography>
                                <Typography variant="body2">
                                    {recipe.benefits}
                                </Typography>
                            </Box>

                            <Divider sx={{ mb: 4 }} />

                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>Ingredients</Typography>
                            <List sx={{ mb: 4 }}>
                                {recipe.ingredients && recipe.ingredients.map((ing, i) => (
                                    <ListItem key={i} disableGutters>
                                        <ListItemIcon sx={{ minWidth: 36 }}>
                                            <CheckIcon color="primary" fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary={ing} />
                                    </ListItem>
                                ))}
                            </List>

                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>Instructions</Typography>
                            <List component="ol" sx={{ pl: 0 }}>
                                {recipe.instructions && recipe.instructions.map((step, i) => (
                                    <ListItem key={i} alignItems="flex-start" sx={{ px: 0, mb: 2 }}>
                                        <Box
                                            sx={{
                                                minWidth: 32,
                                                height: 32,
                                                borderRadius: '50%',
                                                bgcolor: 'primary.main',
                                                color: 'white',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: 700,
                                                fontSize: '0.9rem',
                                                mr: 2,
                                                mt: 0.5
                                            }}
                                        >
                                            {i + 1}
                                        </Box>
                                        <ListItemText
                                            primary={step}
                                            primaryTypographyProps={{ sx: { lineHeight: 1.6 } }}
                                        />
                                    </ListItem>
                                ))}
                            </List>

                            <Button
                                variant="outlined"
                                startIcon={<PrintIcon />}
                                sx={{ mt: 2, borderRadius: '50px' }}
                            >
                                Print Recipe
                            </Button>

                        </motion.div>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default RecipeDetail;
