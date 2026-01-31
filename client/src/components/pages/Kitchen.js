import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
    Box,
    Container,
    Typography,
    Chip,
    Card,
    CardMedia,
    CardContent,
    CardActionArea,
    IconButton,
    Button,
    Avatar,
    Grid,
    Rating
} from '@mui/material';
import {
    Whatshot as FireIcon,
    AcUnit as IceIcon,
    Landscape as EarthIcon,
    Opacity as WaterIcon,
    Air as AirIcon,
    Search as SearchIcon,
    FilterList as FilterIcon,
    FavoriteBorder as HeartIcon,
    AccessTime as TimeIcon,
    Restaurant as DifficultyIcon,
    ArrowForward as ArrowIcon,
    LocalFireDepartment as SpicyIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

import { recipesData } from '../../data/recipes';

// Recipes are imported from data/recipes.js

const ElementTag = ({ element }) => {
    const getIcon = () => {
        switch (element) {
            case 'Fire': return <FireIcon sx={{ fontSize: 14 }} />;
            case 'Water': return <WaterIcon sx={{ fontSize: 14 }} />;
            case 'Earth': return <EarthIcon sx={{ fontSize: 14 }} />;
            case 'Air': return <AirIcon sx={{ fontSize: 14 }} />;
            default: return <IceIcon sx={{ fontSize: 14 }} />;
        }
    };

    const getColor = () => {
        switch (element) {
            case 'Fire': return '#ff7d7d';
            case 'Water': return '#78c2ad';
            case 'Earth': return '#a8a878';
            case 'Air': return '#a8e6cf';
            default: return '#ccc';
        }
    };

    return (
        <Chip
            icon={getIcon()}
            label={element}
            size="small"
            sx={{
                bgcolor: `${getColor()}20`,
                color: getColor(),
                border: `1px solid ${getColor()}40`,
                mr: 0.5,
                mb: 0.5,
                fontWeight: 600,
                fontSize: '0.7rem',
                height: 20,
                '& .MuiChip-icon': { color: 'inherit' }
            }}
        />
    );
};

const Kitchen = () => {
    const { darkMode } = useTheme();
    const { user } = useAuth();
    const [activeFilter, setActiveFilter] = useState('All');
    const [hoveredCard, setHoveredCard] = useState(null);

    // Auto-select filter based on user's Dosha
    useEffect(() => {
        if (user?.prakrutiResult?.dominantDosha) {
            const dbDosha = user.prakrutiResult.dominantDosha;
            // Handle simple doshas
            if (['vata', 'pitta', 'kapha'].includes(dbDosha)) {
                setActiveFilter(dbDosha.charAt(0).toUpperCase() + dbDosha.slice(1));
            }
            // Handle dual doshas (simplified to primary for now) or Tridoshic
            else if (dbDosha.includes('vata')) {
                setActiveFilter('Vata');
            } else if (dbDosha.includes('pitta')) {
                setActiveFilter('Pitta');
            } else if (dbDosha.includes('kapha')) {
                setActiveFilter('Kapha');
            }
        }
    }, [user]);

    // In a real app, this would default to user.dosha if available
    const filters = ['All', 'Vata', 'Pitta', 'Kapha', 'Tridoshic'];

    const filteredRecipes = activeFilter === 'All'
        ? recipesData
        : recipesData.filter(r => r.dosha.includes(activeFilter));

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <Box sx={{ minHeight: '100vh', pt: 12, pb: 8 }}>
            <Container maxWidth="xl">
                {/* Hero Section */}
                <Box sx={{ mb: 6, position: 'relative', overflow: 'hidden', borderRadius: '30px', bgcolor: darkMode ? 'rgba(255,255,255,0.02)' : '#f8fafc', p: { xs: 3, md: 6 } }}>
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={7}>
                            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                                <Typography variant="overline" color="primary" sx={{ letterSpacing: 3, fontWeight: 700 }}>
                                    Smart Dosha Kitchen
                                </Typography>
                                <Typography variant="h2" sx={{ fontWeight: 800, mt: 1, mb: 2, fontSize: { xs: '2.5rem', md: '4rem' } }}>
                                    Eat for your <span style={{ color: '#78c2ad', fontStyle: 'italic' }}>Elements</span>.
                                </Typography>
                                <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 300, maxWidth: 600, mb: 4 }}>
                                    Discover recipes perfectly tuned to balance your internal energy.
                                    {user?.dosha ? ` Curated specifically for your ${user.dosha} constitution.` : ' Start by selecting a Dosha.'}
                                </Typography>

                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                    {filters.map((filter) => (
                                        <Chip
                                            key={filter}
                                            label={filter}
                                            onClick={() => setActiveFilter(filter)}
                                            sx={{
                                                px: 2,
                                                py: 2.5,
                                                borderRadius: '12px',
                                                fontSize: '1rem',
                                                fontWeight: 600,
                                                bgcolor: activeFilter === filter ? 'primary.main' : (darkMode ? 'rgba(255,255,255,0.05)' : 'white'),
                                                color: activeFilter === filter ? 'white' : 'text.primary',
                                                border: activeFilter === filter ? 'none' : '1px solid rgba(0,0,0,0.1)',
                                                transition: 'all 0.3s',
                                                '&:hover': {
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                                                }
                                            }}
                                        />
                                    ))}
                                </Box>
                            </motion.div>
                        </Grid>
                        <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1 }}
                                style={{ position: 'relative' }}
                            >
                                <Box
                                    component="img"
                                    src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                    sx={{
                                        width: '100%',
                                        borderRadius: '30px',
                                        transform: 'rotate(2deg)',
                                        boxShadow: '0 20px 50px rgba(0,0,0,0.2)'
                                    }}
                                />
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: -20,
                                        left: -20,
                                        bgcolor: darkMode ? '#1e293b' : 'white',
                                        p: 2,
                                        borderRadius: '20px',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2
                                    }}
                                >
                                    <Avatar sx={{ bgcolor: '#ff7d7d' }}><FireIcon /></Avatar>
                                    <Box>
                                        <Typography variant="subtitle2" fontWeight={700}>Pitta Reducing</Typography>
                                        <Typography variant="caption" color="text.secondary">Cooling meals recommended</Typography>
                                    </Box>
                                </Box>
                            </motion.div>
                        </Grid>
                    </Grid>
                </Box>

                {/* Netflix Style Horizontal Scroll Section - Trending */}
                <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <SpicyIcon color="primary" /> Trending for {activeFilter === 'All' ? 'Everyone' : activeFilter}
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        overflowX: 'auto',
                        gap: 3,
                        pb: 4,
                        mb: 6,
                        '::-webkit-scrollbar': { display: 'none' },
                        msOverflowStyle: 'none',
                        scrollbarWidth: 'none',
                        perspective: '1000px'
                    }}
                >
                    <AnimatePresence mode="popLayout">
                        {filteredRecipes.map((recipe, index) => (
                            <motion.div
                                key={recipe.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                style={{ minWidth: '320px', maxWidth: '320px' }}
                            >
                                <Card
                                    onMouseEnter={() => setHoveredCard(recipe.id)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                    sx={{
                                        height: '100%',
                                        borderRadius: '24px',
                                        bgcolor: darkMode ? '#1e293b' : 'white',
                                        border: '1px solid rgba(0,0,0,0.05)',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        transform: hoveredCard === recipe.id ? 'translateY(-10px)' : 'none',
                                        boxShadow: hoveredCard === recipe.id ? '0 20px 40px rgba(0,0,0,0.15)' : 'none',
                                        position: 'relative',
                                        overflow: 'visible'
                                    }}
                                >
                                    {/* Floating Action Badge */}
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 15,
                                            right: 15,
                                            zIndex: 2,
                                            bgcolor: 'white',
                                            borderRadius: '50%',
                                            p: 0.5,
                                            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                                        }}
                                    >
                                        <IconButton size="small" color="primary">
                                            <HeartIcon fontSize="small" />
                                        </IconButton>
                                    </Box>

                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={recipe.image}
                                        alt={recipe.title}
                                        sx={{ borderRadius: '24px 24px 0 0' }}
                                    />

                                    <CardContent sx={{ p: 3 }}>
                                        <Box sx={{ display: 'flex', gap: 1, mb: 1.5, flexWrap: 'wrap' }}>
                                            {recipe.elements.map(el => <ElementTag key={el} element={el} />)}
                                        </Box>

                                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, lineHeight: 1.2 }}>
                                            {recipe.title}
                                        </Typography>

                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, color: 'text.secondary', fontSize: '0.85rem' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                <TimeIcon fontSize="inherit" /> {recipe.time}
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                <DifficultyIcon fontSize="inherit" /> {recipe.difficulty}
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                <Rating value={recipe.rating} max={1} readOnly size="small" /> {recipe.rating}
                                            </Box>
                                        </Box>

                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                            {recipe.description}
                                        </Typography>

                                        <Button
                                            fullWidth
                                            component={RouterLink}
                                            to={`/kitchen/recipe/${recipe.id}`}
                                            variant="outlined"
                                            endIcon={<ArrowIcon />}
                                            sx={{
                                                borderRadius: '12px',
                                                borderWidth: '2px',
                                                fontWeight: 600,
                                                '&:hover': { borderWidth: '2px' }
                                            }}
                                        >
                                            View Recipe
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </Box>

                {/* Categories Grid */}
                <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>Explore by Category</Typography>
                <Grid container spacing={3}>
                    {['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Elixirs', 'Deserts'].map((cat, i) => (
                        <Grid item xs={6} md={2} key={cat}>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Box
                                    sx={{
                                        p: 3,
                                        borderRadius: '20px',
                                        bgcolor: darkMode ? 'rgba(255,255,255,0.05)' : 'white',
                                        textAlign: 'center',
                                        border: '1px solid rgba(0,0,0,0.05)',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s',
                                        '&:hover': {
                                            bgcolor: 'primary.main',
                                            color: 'white',
                                            boxShadow: '0 10px 20px rgba(6,78,59,0.2)'
                                        }
                                    }}
                                >
                                    <Typography variant="h6" fontWeight={600}>{cat}</Typography>
                                </Box>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>

            </Container>
        </Box>
    );
};

export default Kitchen;
