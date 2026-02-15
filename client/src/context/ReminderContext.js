import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

const ReminderContext = createContext();

export const useReminders = () => {
    const context = useContext(ReminderContext);
    if (!context) {
        throw new Error('useReminders must be used within a ReminderProvider');
    }
    return context;
};

export const ReminderProvider = ({ children }) => {
    const { isAuthenticated, user } = useAuth();
    const [reminders, setReminders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [notificationPermission, setNotificationPermission] = useState('default');

    // Request notification permission on mount
    useEffect(() => {
        if ('Notification' in window) {
            setNotificationPermission(Notification.permission);
        }
    }, []);

    // Request notification permission
    const requestNotificationPermission = async () => {
        if (!('Notification' in window)) {
            toast.error('This browser does not support notifications');
            return false;
        }

        try {
            const permission = await Notification.requestPermission();
            setNotificationPermission(permission);

            if (permission === 'granted') {
                toast.success('Notifications enabled!');
                return true;
            } else {
                toast.warning('Notification permission denied');
                return false;
            }
        } catch (error) {
            console.error('Error requesting notification permission:', error);
            return false;
        }
    };

    // Show browser notification
    const showNotification = (title, options = {}) => {
        if (notificationPermission !== 'granted') {
            return;
        }

        const notification = new Notification(title, {
            icon: '/logo192.png',
            badge: '/logo192.png',
            vibrate: [200, 100, 200],
            ...options
        });

        notification.onclick = () => {
            window.focus();
            notification.close();
        };

        return notification;
    };

    // Fetch all reminders
    const fetchReminders = async () => {
        if (!isAuthenticated) return;

        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('/api/reminders', {
                headers: { 'x-auth-token': token }
            });
            setReminders(res.data);
        } catch (error) {
            console.error('Error fetching reminders:', error);
            toast.error('Failed to load reminders');
        } finally {
            setLoading(false);
        }
    };

    // Create a new reminder
    const createReminder = async (reminderData) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('/api/reminders', reminderData, {
                headers: { 'x-auth-token': token }
            });
            setReminders([...reminders, res.data]);
            toast.success('Reminder created successfully!');
            return res.data;
        } catch (error) {
            console.error('Error creating reminder:', error);
            toast.error(error.response?.data?.msg || 'Failed to create reminder');
            throw error;
        }
    };

    // Update a reminder
    const updateReminder = async (id, reminderData) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.put(`/api/reminders/${id}`, reminderData, {
                headers: { 'x-auth-token': token }
            });
            setReminders(reminders.map(r => r._id === id ? res.data : r));
            toast.success('Reminder updated successfully!');
            return res.data;
        } catch (error) {
            console.error('Error updating reminder:', error);
            toast.error(error.response?.data?.msg || 'Failed to update reminder');
            throw error;
        }
    };

    // Toggle reminder enabled/disabled
    const toggleReminder = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.put(`/api/reminders/${id}/toggle`, {}, {
                headers: { 'x-auth-token': token }
            });
            setReminders(reminders.map(r => r._id === id ? res.data : r));
            toast.success(res.data.enabled ? 'Reminder enabled' : 'Reminder disabled');
            return res.data;
        } catch (error) {
            console.error('Error toggling reminder:', error);
            toast.error('Failed to toggle reminder');
            throw error;
        }
    };

    // Snooze a reminder
    const snoozeReminder = async (id, minutes = 15) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.put(`/api/reminders/${id}/snooze`, { minutes }, {
                headers: { 'x-auth-token': token }
            });
            setReminders(reminders.map(r => r._id === id ? res.data : r));
            toast.info(`Reminder snoozed for ${minutes} minutes`);
            return res.data;
        } catch (error) {
            console.error('Error snoozing reminder:', error);
            toast.error('Failed to snooze reminder');
            throw error;
        }
    };

    // Delete a reminder
    const deleteReminder = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`/api/reminders/${id}`, {
                headers: { 'x-auth-token': token }
            });
            setReminders(reminders.filter(r => r._id !== id));
            toast.success('Reminder deleted successfully!');
        } catch (error) {
            console.error('Error deleting reminder:', error);
            toast.error('Failed to delete reminder');
            throw error;
        }
    };

    // Create default reminders for new users
    const createDefaultReminders = async () => {
        const defaultReminders = [
            {
                type: 'meal',
                title: 'Breakfast Time',
                description: 'Start your day with a balanced breakfast',
                time: '08:00',
                days: ['everyday'],
                icon: 'restaurant',
                color: '#78c2ad',
                notificationMethods: { browser: true, email: false }
            },
            {
                type: 'meal',
                title: 'Lunch Time',
                description: 'Enjoy your midday meal',
                time: '12:30',
                days: ['everyday'],
                icon: 'restaurant',
                color: '#78c2ad',
                notificationMethods: { browser: true, email: false }
            },
            {
                type: 'meal',
                title: 'Dinner Time',
                description: 'Have a light, early dinner',
                time: '19:00',
                days: ['everyday'],
                icon: 'restaurant',
                color: '#78c2ad',
                notificationMethods: { browser: true, email: false }
            },
            {
                type: 'hydration',
                title: 'Hydration Check',
                description: 'Remember to drink water',
                time: '10:00',
                days: ['everyday'],
                icon: 'opacity',
                color: '#4fc3f7',
                notificationMethods: { browser: true, email: false }
            },
            {
                type: 'hydration',
                title: 'Afternoon Hydration',
                description: 'Stay hydrated throughout the day',
                time: '15:00',
                days: ['everyday'],
                icon: 'opacity',
                color: '#4fc3f7',
                notificationMethods: { browser: true, email: false }
            },
            {
                type: 'meditation',
                title: 'Morning Meditation',
                description: 'Start your day with mindfulness',
                time: '07:00',
                days: ['everyday'],
                icon: 'self_improvement',
                color: '#9c27b0',
                notificationMethods: { browser: true, email: false }
            },
            {
                type: 'meditation',
                title: 'Evening Meditation',
                description: 'Wind down with evening meditation',
                time: '20:00',
                days: ['everyday'],
                icon: 'self_improvement',
                color: '#9c27b0',
                notificationMethods: { browser: true, email: false }
            },
            {
                type: 'sleep',
                title: 'Bedtime Reminder',
                description: 'Time to prepare for restful sleep',
                time: '22:00',
                days: ['everyday'],
                icon: 'nightlight',
                color: '#5c6bc0',
                notificationMethods: { browser: true, email: false }
            }
        ];

        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('/api/reminders/bulk', { reminders: defaultReminders }, {
                headers: { 'x-auth-token': token }
            });
            setReminders(res.data);
            toast.success('Default reminders created!');
            return res.data;
        } catch (error) {
            console.error('Error creating default reminders:', error);
            toast.error('Failed to create default reminders');
            throw error;
        }
    };

    // Check for due reminders (called every minute)
    const checkDueReminders = () => {
        const now = new Date();
        const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        const today = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

        reminders.forEach(reminder => {
            if (!reminder.enabled) return;
            if (reminder.time !== currentTime) return;
            if (!reminder.days.includes('everyday') && !reminder.days.includes(today)) return;

            // Check if snoozed
            if (reminder.snoozeUntil && new Date(reminder.snoozeUntil) > now) return;

            // Show notification
            if (reminder.notificationMethods.browser && notificationPermission === 'granted') {
                showNotification(reminder.title, {
                    body: reminder.description,
                    tag: reminder._id,
                    requireInteraction: true
                });
            }

            // Play sound (optional)
            const audio = new Audio('/notification.mp3');
            audio.play().catch(e => console.log('Audio play failed:', e));
        });
    };

    // Set up interval to check for due reminders
    useEffect(() => {
        if (!isAuthenticated || reminders.length === 0) return;

        const interval = setInterval(checkDueReminders, 60000); // Check every minute

        // Also check immediately
        checkDueReminders();

        return () => clearInterval(interval);
    }, [isAuthenticated, reminders, notificationPermission]);

    // Fetch reminders on mount
    useEffect(() => {
        if (isAuthenticated) {
            fetchReminders();
        }
    }, [isAuthenticated]);

    const value = {
        reminders,
        loading,
        notificationPermission,
        requestNotificationPermission,
        showNotification,
        fetchReminders,
        createReminder,
        updateReminder,
        toggleReminder,
        snoozeReminder,
        deleteReminder,
        createDefaultReminders
    };

    return (
        <ReminderContext.Provider value={value}>
            {children}
        </ReminderContext.Provider>
    );
};
