import React, { useState, useEffect } from 'react';
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
    Grid,
    Button,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider
} from '@mui/material';
import {
    SelfImprovement as YogaIcon,
    Timer as TimerIcon,
    Leaderboard as LevelIcon,
    DoneAll as CheckIcon,
    Close as CloseIcon,
    ElectricBolt as FireIcon,
    WaterDrop as WaterIcon,
    Park as EarthIcon,
    Air as AirIcon,
    CloudCircle as SpaceIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { yogaData } from '../../data/yoga';

const ElementIcon = ({ element }) => {
    switch (element) {
        case 'Fire': return <FireIcon sx={{ fontSize: 16, color: '#ff7d7d' }} />;
        case 'Water': return <WaterIcon sx={{ fontSize: 16, color: '#78c2ad' }} />;
        case 'Earth': return <EarthIcon sx={{ fontSize: 16, color: '#a8a878' }} />;
        case 'Air': return <AirIcon sx={{ fontSize: 16, color: '#a8e6cf' }} />;
        case 'Space': return <SpaceIcon sx={{ fontSize: 16, color: '#a29bfe' }} />;
        default: return null;
    }
};

const YogaSection = () => {
    const { darkMode } = useTheme();
    const { user } = useAuth();
    const [activeFilter, setActiveFilter] = useState('All');
    const [selectedPose, setSelectedPose] = useState(null);
    const [hoveredCard, setHoveredCard] = useState(null);

    // Auto-select based on user's Dosha
    useEffect(() => {
        if (user?.prakrutiResult?.dominantDosha) {
            const dbDosha = user.prakrutiResult.dominantDosha.toLowerCase();
            if (dbDosha.includes('vata')) setActiveFilter('Vata');
            else if (dbDosha.includes('pitta')) setActiveFilter('Pitta');
            else if (dbDosha.includes('kapha')) setActiveFilter('Kapha');
        }
    }, [user]);

    const filters = ['All', 'Vata', 'Pitta', 'Kapha'];

    const filteredPoses = yogaData.filter(pose =>
        activeFilter === 'All' || pose.dosha.includes(activeFilter)
    );

    return (
        <Box sx={{ minHeight: '100vh', pt: 12, pb: 8 }}>
            <Container maxWidth="xl">
                {/* Hero */}
                <Box sx={{
                    mb: 6,
                    position: 'relative',
                    borderRadius: '30px',
                    bgcolor: darkMode ? 'rgba(255,255,255,0.02)' : '#f0fdf4',
                    p: { xs: 4, md: 8 },
                    overflow: 'hidden'
                }}>
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={7}>
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                                <Typography variant="overline" color="primary" sx={{ letterSpacing: 3, fontWeight: 700 }}>
                                    Prakruti Yoga Guide
                                </Typography>
                                <Typography variant="h2" sx={{ fontWeight: 800, mt: 1, mb: 2, fontSize: { xs: '2.5rem', md: '4rem' } }}>
                                    Balance your <span style={{ color: '#22c55e', fontStyle: 'italic' }}>Flow</span>.
                                </Typography>
                                <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 300, maxWidth: 600, mb: 4 }}>
                                    Ancient asanas tailored to harmonize your specific constitution and quiet the mind.
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
                                                transition: 'all 0.3s',
                                                '&:hover': { transform: 'translateY(-2px)' }
                                            }}
                                        />
                                    ))}
                                </Box>
                            </motion.div>
                        </Grid>
                        <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
                            <Box
                                component="img"
                                src="https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                sx={{ width: '100%', borderRadius: '30px', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}
                            />
                        </Grid>
                    </Grid>
                </Box>

                {/* Grid */}
                <Grid container spacing={4}>
                    <AnimatePresence>
                        {filteredPoses.map((pose) => (
                            <Grid item xs={12} sm={6} md={4} key={pose.id}>
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    whileHover={{ y: -10 }}
                                    onMouseEnter={() => setHoveredCard(pose.id)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                >
                                    <Card sx={{
                                        borderRadius: '24px',
                                        overflow: 'hidden',
                                        height: '100%',
                                        bgcolor: darkMode ? '#1e293b' : 'white',
                                        boxShadow: hoveredCard === pose.id ? '0 20px 40px rgba(0,0,0,0.1)' : 'none',
                                        transition: 'all 0.3s'
                                    }}>
                                        <CardMedia
                                            component="img"
                                            height="240"
                                            image={pose.image}
                                            alt={pose.title}
                                        />
                                        <CardContent sx={{ p: 3 }}>
                                            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                                {pose.dosha.map(d => (
                                                    <Chip key={d} label={d} size="small" color="primary" variant="outlined" sx={{ fontWeight: 600 }} />
                                                ))}
                                            </Box>
                                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>{pose.title}</Typography>
                                            <Typography variant="subtitle2" color="text.secondary" sx={{ fontStyle: 'italic', mb: 2 }}>{pose.sanskrit}</Typography>

                                            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                    <TimerIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                                    <Typography variant="caption">{pose.duration}</Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                    <LevelIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                                    <Typography variant="caption">{pose.difficulty}</Typography>
                                                </Box>
                                            </Box>

                                            <Button
                                                fullWidth
                                                variant="contained"
                                                onClick={() => setSelectedPose(pose)}
                                                sx={{ borderRadius: '12px', py: 1.5, fontWeight: 700 }}
                                            >
                                                Practice Now
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </Grid>
                        ))}
                    </AnimatePresence>
                </Grid>

                {/* Detail Dialog */}
                <Dialog
                    open={Boolean(selectedPose)}
                    onClose={() => setSelectedPose(null)}
                    maxWidth="md"
                    fullWidth
                    PaperProps={{
                        sx: { borderRadius: '24px', p: 2, bgcolor: darkMode ? '#0f172a' : 'white' }
                    }}
                >
                    {selectedPose && (
                        <>
                            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="h4" fontWeight={800}>{selectedPose.title}</Typography>
                                <IconButton onClick={() => setSelectedPose(null)}><CloseIcon /></IconButton>
                            </DialogTitle>
                            <DialogContent>
                                <Grid container spacing={4}>
                                    <Grid item xs={12} md={6}>
                                        <Box
                                            component="img"
                                            src={selectedPose.image}
                                            sx={{ width: '100%', borderRadius: '20px', mb: 2 }}
                                        />
                                        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                                            {selectedPose.elements.map(el => (
                                                <Chip
                                                    key={el}
                                                    icon={<ElementIcon element={el} />}
                                                    label={`${el} Element`}
                                                    variant="outlined"
                                                    sx={{ borderRadius: '8px' }}
                                                />
                                            ))}
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="h6" gutterBottom fontWeight={700} color="primary">Benefits</Typography>
                                        <Typography variant="body1" sx={{ mb: 3 }}>{selectedPose.benefits}</Typography>

                                        <Divider sx={{ mb: 3 }} />

                                        <Typography variant="h6" gutterBottom fontWeight={700}>Steps to practice</Typography>
                                        <List>
                                            {selectedPose.steps.map((step, i) => (
                                                <ListItem key={i} sx={{ px: 0, alignItems: 'flex-start' }}>
                                                    <ListItemIcon sx={{ minWidth: 36, mt: 0.5 }}>
                                                        <CheckIcon color="primary" fontSize="small" />
                                                    </ListItemIcon>
                                                    <ListItemText primary={step} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Grid>
                                </Grid>
                            </DialogContent>
                        </>
                    )}
                </Dialog>
            </Container>
        </Box>
    );
};

export default YogaSection;
