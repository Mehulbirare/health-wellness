import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useReminders } from '../../context/ReminderContext';
import { useTheme } from '../../context/ThemeContext';
import {
    Box,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Button,
    Chip,
    IconButton
} from '@mui/material';
import {
    NotificationsActive as NotificationsIcon,
    Restaurant as MealIcon,
    Opacity as HydrationIcon,
    SelfImprovement as MeditationIcon,
    FitnessCenter as ExerciseIcon,
    Nightlight as SleepIcon,
    Assessment as AssessmentIcon,
    LocalPharmacy as SupplementIcon,
    Alarm as AlarmIcon,
    ArrowForward as ArrowIcon,
    Add as AddIcon
} from '@mui/icons-material';

const ReminderWidget = () => {
    const { darkMode } = useTheme();
    const { reminders } = useReminders();
    const navigate = useNavigate();

    const getTypeIcon = (type) => {
        switch (type) {
            case 'meal': return <MealIcon />;
            case 'hydration': return <HydrationIcon />;
            case 'meditation': return <MeditationIcon />;
            case 'supplement': return <SupplementIcon />;
            case 'exercise': return <ExerciseIcon />;
            case 'sleep': return <SleepIcon />;
            case 'assessment': return <AssessmentIcon />;
            default: return <AlarmIcon />;
        }
    };

    const activeReminders = reminders.filter(r => r.enabled).slice(0, 5);

    return (
        <Paper
            elevation={0}
            className={darkMode ? 'glass-dark' : 'glass'}
            sx={{
                p: 3,
                borderRadius: 4,
                height: '100%'
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <NotificationsIcon color="primary" />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Active Reminders
                    </Typography>
                </Box>
                <Chip
                    label={`${activeReminders.length} active`}
                    size="small"
                    color="primary"
                    sx={{ fontWeight: 600 }}
                />
            </Box>

            {activeReminders.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                    <NotificationsIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2, opacity: 0.3 }} />
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        No active reminders
                    </Typography>
                    <Button
                        variant="outlined"
                        size="small"
                        startIcon={<AddIcon />}
                        onClick={() => navigate('/reminders')}
                        sx={{ mt: 2, borderRadius: '50px' }}
                    >
                        Create Reminder
                    </Button>
                </Box>
            ) : (
                <>
                    <List sx={{ mb: 2 }}>
                        {activeReminders.map((reminder) => (
                            <ListItem
                                key={reminder._id}
                                sx={{
                                    px: 0,
                                    py: 1,
                                    borderBottom: '1px solid',
                                    borderColor: 'divider',
                                    '&:last-child': { borderBottom: 'none' }
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    {getTypeIcon(reminder.type)}
                                </ListItemIcon>
                                <ListItemText
                                    primary={reminder.title}
                                    secondary={reminder.time}
                                    primaryTypographyProps={{ fontWeight: 500, fontSize: '0.9rem' }}
                                    secondaryTypographyProps={{ fontSize: '0.8rem' }}
                                />
                                <Chip
                                    label={reminder.days.includes('everyday') ? 'Daily' : `${reminder.days.length}d`}
                                    size="small"
                                    sx={{ fontSize: '0.7rem' }}
                                />
                            </ListItem>
                        ))}
                    </List>

                    <Button
                        fullWidth
                        variant="outlined"
                        endIcon={<ArrowIcon />}
                        onClick={() => navigate('/reminders')}
                        sx={{ borderRadius: '50px' }}
                    >
                        Manage All Reminders
                    </Button>
                </>
            )}
        </Paper>
    );
};

export default ReminderWidget;
