import React, { useState, useEffect } from 'react';
import { useReminders } from '../../context/ReminderContext';
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
    Switch,
    IconButton,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Fab,
    Tooltip,
    Alert,
    AlertTitle
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Notifications as NotificationsIcon,
    NotificationsOff as NotificationsOffIcon,
    Restaurant as MealIcon,
    Opacity as HydrationIcon,
    SelfImprovement as MeditationIcon,
    FitnessCenter as ExerciseIcon,
    Nightlight as SleepIcon,
    Assessment as AssessmentIcon,
    LocalPharmacy as SupplementIcon,
    Alarm as AlarmIcon,
    NotificationsActive as NotificationsActiveIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const Reminders = () => {
    const { darkMode } = useTheme();
    const { user } = useAuth();
    const {
        reminders,
        loading,
        notificationPermission,
        requestNotificationPermission,
        createReminder,
        updateReminder,
        toggleReminder,
        deleteReminder,
        createDefaultReminders
    } = useReminders();

    const [openDialog, setOpenDialog] = useState(false);
    const [editingReminder, setEditingReminder] = useState(null);
    const [formData, setFormData] = useState({
        type: 'meal',
        title: '',
        description: '',
        time: '08:00',
        days: ['everyday'],
        notificationMethods: {
            browser: true,
            email: false
        }
    });

    const reminderTypes = [
        { value: 'meal', label: 'Meal', icon: <MealIcon />, color: '#78c2ad' },
        { value: 'hydration', label: 'Hydration', icon: <HydrationIcon />, color: '#4fc3f7' },
        { value: 'meditation', label: 'Meditation', icon: <MeditationIcon />, color: '#9c27b0' },
        { value: 'supplement', label: 'Supplement', icon: <SupplementIcon />, color: '#ff7043' },
        { value: 'exercise', label: 'Exercise', icon: <ExerciseIcon />, color: '#66bb6a' },
        { value: 'sleep', label: 'Sleep', icon: <SleepIcon />, color: '#5c6bc0' },
        { value: 'assessment', label: 'Assessment', icon: <AssessmentIcon />, color: '#ffa726' },
        { value: 'custom', label: 'Custom', icon: <AlarmIcon />, color: '#8d6e63' }
    ];

    const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    const getTypeConfig = (type) => {
        return reminderTypes.find(t => t.value === type) || reminderTypes[0];
    };

    const handleOpenDialog = (reminder = null) => {
        if (reminder) {
            setEditingReminder(reminder);
            setFormData({
                type: reminder.type,
                title: reminder.title,
                description: reminder.description || '',
                time: reminder.time,
                days: reminder.days,
                notificationMethods: reminder.notificationMethods
            });
        } else {
            setEditingReminder(null);
            setFormData({
                type: 'meal',
                title: '',
                description: '',
                time: '08:00',
                days: ['everyday'],
                notificationMethods: {
                    browser: true,
                    email: false
                }
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingReminder(null);
    };

    const handleSubmit = async () => {
        try {
            const typeConfig = getTypeConfig(formData.type);
            const reminderData = {
                ...formData,
                icon: typeConfig.label.toLowerCase(),
                color: typeConfig.color
            };

            if (editingReminder) {
                await updateReminder(editingReminder._id, reminderData);
            } else {
                await createReminder(reminderData);
            }
            handleCloseDialog();
        } catch (error) {
            console.error('Error saving reminder:', error);
        }
    };

    const handleDayToggle = (day) => {
        if (day === 'everyday') {
            setFormData({
                ...formData,
                days: formData.days.includes('everyday') ? [] : ['everyday']
            });
        } else {
            const newDays = formData.days.filter(d => d !== 'everyday');
            if (newDays.includes(day)) {
                setFormData({
                    ...formData,
                    days: newDays.filter(d => d !== day)
                });
            } else {
                setFormData({
                    ...formData,
                    days: [...newDays, day]
                });
            }
        }
    };

    const handleSetupDefaultReminders = async () => {
        if (notificationPermission !== 'granted') {
            const granted = await requestNotificationPermission();
            if (!granted) return;
        }
        await createDefaultReminders();
    };

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Header */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
                        Smart Reminders
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                        Stay on track with personalized wellness reminders throughout your day.
                    </Typography>

                    {/* Notification Permission Alert */}
                    {notificationPermission !== 'granted' && (
                        <Alert severity="warning" sx={{ mb: 3 }}>
                            <AlertTitle>Enable Notifications</AlertTitle>
                            To receive reminders, please enable browser notifications.
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={requestNotificationPermission}
                                sx={{ ml: 2 }}
                            >
                                Enable Now
                            </Button>
                        </Alert>
                    )}

                    {/* Quick Actions */}
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => handleOpenDialog()}
                            sx={{ borderRadius: '50px' }}
                        >
                            New Reminder
                        </Button>
                        {reminders.length === 0 && (
                            <Button
                                variant="outlined"
                                startIcon={<NotificationsActiveIcon />}
                                onClick={handleSetupDefaultReminders}
                                sx={{ borderRadius: '50px' }}
                            >
                                Setup Default Reminders
                            </Button>
                        )}
                    </Box>
                </Box>

                {/* Reminders Grid */}
                {reminders.length === 0 ? (
                    <Paper
                        elevation={0}
                        sx={{
                            p: 8,
                            textAlign: 'center',
                            borderRadius: 4,
                            bgcolor: darkMode ? 'rgba(255,255,255,0.02)' : '#f8fafc'
                        }}
                    >
                        <NotificationsOffIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
                        <Typography variant="h5" gutterBottom>
                            No Reminders Yet
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                            Create your first reminder to stay on track with your wellness goals.
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => handleOpenDialog()}
                            sx={{ borderRadius: '50px', mr: 2 }}
                        >
                            Create Reminder
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<NotificationsActiveIcon />}
                            onClick={handleSetupDefaultReminders}
                            sx={{ borderRadius: '50px' }}
                        >
                            Setup Defaults
                        </Button>
                    </Paper>
                ) : (
                    <Grid container spacing={3}>
                        <AnimatePresence>
                            {reminders.map((reminder, index) => {
                                const typeConfig = getTypeConfig(reminder.type);
                                return (
                                    <Grid item xs={12} sm={6} md={4} key={reminder._id}>
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <Card
                                                elevation={0}
                                                sx={{
                                                    height: '100%',
                                                    borderRadius: 4,
                                                    bgcolor: darkMode ? 'rgba(255,255,255,0.03)' : 'white',
                                                    border: '1px solid',
                                                    borderColor: reminder.enabled ? typeConfig.color : 'divider',
                                                    opacity: reminder.enabled ? 1 : 0.6,
                                                    transition: 'all 0.3s',
                                                    '&:hover': {
                                                        transform: 'translateY(-4px)',
                                                        boxShadow: `0 8px 24px ${typeConfig.color}40`
                                                    }
                                                }}
                                            >
                                                <CardContent>
                                                    {/* Header */}
                                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                        <Box
                                                            sx={{
                                                                width: 48,
                                                                height: 48,
                                                                borderRadius: '12px',
                                                                bgcolor: `${typeConfig.color}20`,
                                                                color: typeConfig.color,
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                mr: 2
                                                            }}
                                                        >
                                                            {typeConfig.icon}
                                                        </Box>
                                                        <Box sx={{ flexGrow: 1 }}>
                                                            <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                                                                {reminder.title}
                                                            </Typography>
                                                            <Chip
                                                                label={typeConfig.label}
                                                                size="small"
                                                                sx={{
                                                                    mt: 0.5,
                                                                    bgcolor: `${typeConfig.color}20`,
                                                                    color: typeConfig.color,
                                                                    fontWeight: 600,
                                                                    fontSize: '0.7rem'
                                                                }}
                                                            />
                                                        </Box>
                                                    </Box>

                                                    {/* Description */}
                                                    {reminder.description && (
                                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                                            {reminder.description}
                                                        </Typography>
                                                    )}

                                                    {/* Time */}
                                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                        <AlarmIcon sx={{ fontSize: 20, mr: 1, color: 'text.secondary' }} />
                                                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                                            {reminder.time}
                                                        </Typography>
                                                    </Box>

                                                    {/* Days */}
                                                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
                                                        {reminder.days.includes('everyday') ? (
                                                            <Chip label="Everyday" size="small" />
                                                        ) : (
                                                            reminder.days.map(day => (
                                                                <Chip
                                                                    key={day}
                                                                    label={day.substring(0, 3).toUpperCase()}
                                                                    size="small"
                                                                />
                                                            ))
                                                        )}
                                                    </Box>

                                                    {/* Actions */}
                                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                                                        <FormControlLabel
                                                            control={
                                                                <Switch
                                                                    checked={reminder.enabled}
                                                                    onChange={() => toggleReminder(reminder._id)}
                                                                    color="primary"
                                                                />
                                                            }
                                                            label={reminder.enabled ? 'Active' : 'Inactive'}
                                                        />
                                                        <Box>
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => handleOpenDialog(reminder)}
                                                                sx={{ mr: 1 }}
                                                            >
                                                                <EditIcon fontSize="small" />
                                                            </IconButton>
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => deleteReminder(reminder._id)}
                                                                color="error"
                                                            >
                                                                <DeleteIcon fontSize="small" />
                                                            </IconButton>
                                                        </Box>
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    </Grid>
                                );
                            })}
                        </AnimatePresence>
                    </Grid>
                )}

                {/* Floating Action Button */}
                <Fab
                    color="primary"
                    sx={{
                        position: 'fixed',
                        bottom: 32,
                        right: 32,
                        display: { xs: 'flex', md: 'none' }
                    }}
                    onClick={() => handleOpenDialog()}
                >
                    <AddIcon />
                </Fab>

                {/* Create/Edit Dialog */}
                <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    maxWidth="sm"
                    fullWidth
                    PaperProps={{
                        sx: {
                            borderRadius: 4,
                            bgcolor: darkMode ? '#1e293b' : 'white'
                        }
                    }}
                >
                    <DialogTitle>
                        {editingReminder ? 'Edit Reminder' : 'Create New Reminder'}
                    </DialogTitle>
                    <DialogContent>
                        <Box sx={{ pt: 2 }}>
                            {/* Type */}
                            <FormControl fullWidth sx={{ mb: 3 }}>
                                <InputLabel>Type</InputLabel>
                                <Select
                                    value={formData.type}
                                    label="Type"
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                >
                                    {reminderTypes.map(type => (
                                        <MenuItem key={type.value} value={type.value}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                {type.icon}
                                                {type.label}
                                            </Box>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            {/* Title */}
                            <TextField
                                fullWidth
                                label="Title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                sx={{ mb: 3 }}
                                required
                            />

                            {/* Description */}
                            <TextField
                                fullWidth
                                label="Description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                multiline
                                rows={2}
                                sx={{ mb: 3 }}
                            />

                            {/* Time */}
                            <TextField
                                fullWidth
                                label="Time"
                                type="time"
                                value={formData.time}
                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                InputLabelProps={{ shrink: true }}
                                sx={{ mb: 3 }}
                                required
                            />

                            {/* Days */}
                            <Typography variant="subtitle2" gutterBottom>
                                Repeat On
                            </Typography>
                            <Box sx={{ mb: 3 }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={formData.days.includes('everyday')}
                                            onChange={() => handleDayToggle('everyday')}
                                        />
                                    }
                                    label="Everyday"
                                />
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                                    {daysOfWeek.map(day => (
                                        <Chip
                                            key={day}
                                            label={day.substring(0, 3).toUpperCase()}
                                            onClick={() => handleDayToggle(day)}
                                            color={formData.days.includes(day) && !formData.days.includes('everyday') ? 'primary' : 'default'}
                                            disabled={formData.days.includes('everyday')}
                                        />
                                    ))}
                                </Box>
                            </Box>

                            {/* Notification Methods */}
                            <Typography variant="subtitle2" gutterBottom>
                                Notification Methods
                            </Typography>
                            <FormGroup sx={{ mb: 2 }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={formData.notificationMethods.browser}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                notificationMethods: {
                                                    ...formData.notificationMethods,
                                                    browser: e.target.checked
                                                }
                                            })}
                                        />
                                    }
                                    label="Browser Notification"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={formData.notificationMethods.email}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                notificationMethods: {
                                                    ...formData.notificationMethods,
                                                    email: e.target.checked
                                                }
                                            })}
                                        />
                                    }
                                    label="Email Notification"
                                />
                            </FormGroup>
                        </Box>
                    </DialogContent>
                    <DialogActions sx={{ p: 3 }}>
                        <Button onClick={handleCloseDialog}>Cancel</Button>
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            disabled={!formData.title || !formData.time || formData.days.length === 0}
                        >
                            {editingReminder ? 'Update' : 'Create'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </motion.div>
        </Container>
    );
};

export default Reminders;
