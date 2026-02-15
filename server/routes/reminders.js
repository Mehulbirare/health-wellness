const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Reminder = require('../models/Reminder');

// @route   GET /api/reminders
// @desc    Get all reminders for authenticated user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const reminders = await Reminder.find({ user: req.user.id }).sort({ time: 1 });
        res.json(reminders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET /api/reminders/active
// @desc    Get active reminders for authenticated user
// @access  Private
router.get('/active', auth, async (req, res) => {
    try {
        const reminders = await Reminder.getActiveReminders(req.user.id);
        res.json(reminders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET /api/reminders/:id
// @desc    Get reminder by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {
        const reminder = await Reminder.findById(req.params.id);

        if (!reminder) {
            return res.status(404).json({ msg: 'Reminder not found' });
        }

        // Check if reminder belongs to user
        if (reminder.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        res.json(reminder);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Reminder not found' });
        }
        res.status(500).send('Server error');
    }
});

// @route   POST /api/reminders
// @desc    Create a new reminder
// @access  Private
router.post(
    '/',
    [
        auth,
        [
            body('type', 'Type is required').notEmpty(),
            body('title', 'Title is required').notEmpty(),
            body('time', 'Time is required').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
            body('days', 'Days must be an array').isArray({ min: 1 })
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const {
                type,
                title,
                description,
                time,
                days,
                notificationMethods,
                icon,
                color,
                metadata
            } = req.body;

            const reminder = new Reminder({
                user: req.user.id,
                type,
                title,
                description,
                time,
                days,
                notificationMethods,
                icon,
                color,
                metadata
            });

            await reminder.save();
            res.json(reminder);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

// @route   PUT /api/reminders/:id
// @desc    Update a reminder
// @access  Private
router.put(
    '/:id',
    [
        auth,
        [
            body('time', 'Invalid time format').optional().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
            body('days', 'Days must be an array').optional().isArray({ min: 1 })
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let reminder = await Reminder.findById(req.params.id);

            if (!reminder) {
                return res.status(404).json({ msg: 'Reminder not found' });
            }

            // Check if reminder belongs to user
            if (reminder.user.toString() !== req.user.id) {
                return res.status(401).json({ msg: 'Not authorized' });
            }

            const {
                type,
                title,
                description,
                time,
                days,
                enabled,
                notificationMethods,
                icon,
                color,
                metadata
            } = req.body;

            // Build update object
            const updateFields = {};
            if (type !== undefined) updateFields.type = type;
            if (title !== undefined) updateFields.title = title;
            if (description !== undefined) updateFields.description = description;
            if (time !== undefined) updateFields.time = time;
            if (days !== undefined) updateFields.days = days;
            if (enabled !== undefined) updateFields.enabled = enabled;
            if (notificationMethods !== undefined) updateFields.notificationMethods = notificationMethods;
            if (icon !== undefined) updateFields.icon = icon;
            if (color !== undefined) updateFields.color = color;
            if (metadata !== undefined) updateFields.metadata = metadata;

            reminder = await Reminder.findByIdAndUpdate(
                req.params.id,
                { $set: updateFields },
                { new: true }
            );

            res.json(reminder);
        } catch (err) {
            console.error(err.message);
            if (err.kind === 'ObjectId') {
                return res.status(404).json({ msg: 'Reminder not found' });
            }
            res.status(500).send('Server error');
        }
    }
);

// @route   PUT /api/reminders/:id/toggle
// @desc    Toggle reminder enabled/disabled
// @access  Private
router.put('/:id/toggle', auth, async (req, res) => {
    try {
        let reminder = await Reminder.findById(req.params.id);

        if (!reminder) {
            return res.status(404).json({ msg: 'Reminder not found' });
        }

        // Check if reminder belongs to user
        if (reminder.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        reminder.enabled = !reminder.enabled;
        await reminder.save();

        res.json(reminder);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Reminder not found' });
        }
        res.status(500).send('Server error');
    }
});

// @route   PUT /api/reminders/:id/snooze
// @desc    Snooze a reminder
// @access  Private
router.put('/:id/snooze', auth, async (req, res) => {
    try {
        let reminder = await Reminder.findById(req.params.id);

        if (!reminder) {
            return res.status(404).json({ msg: 'Reminder not found' });
        }

        // Check if reminder belongs to user
        if (reminder.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        const { minutes = 15 } = req.body;
        await reminder.snooze(minutes);

        res.json(reminder);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Reminder not found' });
        }
        res.status(500).send('Server error');
    }
});

// @route   DELETE /api/reminders/:id
// @desc    Delete a reminder
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const reminder = await Reminder.findById(req.params.id);

        if (!reminder) {
            return res.status(404).json({ msg: 'Reminder not found' });
        }

        // Check if reminder belongs to user
        if (reminder.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await reminder.deleteOne();

        res.json({ msg: 'Reminder deleted' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Reminder not found' });
        }
        res.status(500).send('Server error');
    }
});

// @route   POST /api/reminders/bulk
// @desc    Create multiple default reminders
// @access  Private
router.post('/bulk', auth, async (req, res) => {
    try {
        const { reminders } = req.body;

        if (!Array.isArray(reminders) || reminders.length === 0) {
            return res.status(400).json({ msg: 'Reminders array is required' });
        }

        // Add user ID to each reminder
        const remindersWithUser = reminders.map(reminder => ({
            ...reminder,
            user: req.user.id
        }));

        const createdReminders = await Reminder.insertMany(remindersWithUser);
        res.json(createdReminders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
