const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['meal', 'hydration', 'meditation', 'supplement', 'exercise', 'sleep', 'assessment', 'custom'],
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    time: {
        type: String, // Format: "HH:MM" (24-hour format)
        required: true
    },
    days: {
        type: [String], // Array of days: ['monday', 'tuesday', etc.] or ['everyday']
        required: true,
        validate: {
            validator: function (days) {
                const validDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'everyday'];
                return days.every(day => validDays.includes(day.toLowerCase()));
            },
            message: 'Invalid day specified'
        }
    },
    enabled: {
        type: Boolean,
        default: true
    },
    notificationMethods: {
        browser: {
            type: Boolean,
            default: true
        },
        email: {
            type: Boolean,
            default: false
        },
        sms: {
            type: Boolean,
            default: false
        }
    },
    icon: {
        type: String, // Icon name for UI
        default: 'notifications'
    },
    color: {
        type: String, // Color code for UI
        default: '#064e3b'
    },
    lastTriggered: {
        type: Date
    },
    snoozeUntil: {
        type: Date
    },
    metadata: {
        // Additional data specific to reminder type
        doshaRelevance: [String], // ['vata', 'pitta', 'kapha']
        recipeId: String,
        supplementName: String,
        customData: mongoose.Schema.Types.Mixed
    }
}, {
    timestamps: true
});

// Index for efficient queries
reminderSchema.index({ user: 1, enabled: 1 });
reminderSchema.index({ user: 1, type: 1 });

// Virtual for checking if reminder should trigger today
reminderSchema.virtual('shouldTriggerToday').get(function () {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    return this.enabled && (this.days.includes('everyday') || this.days.includes(today));
});

// Method to check if reminder is snoozed
reminderSchema.methods.isSnoozed = function () {
    if (!this.snoozeUntil) return false;
    return new Date() < this.snoozeUntil;
};

// Method to snooze reminder
reminderSchema.methods.snooze = function (minutes = 15) {
    this.snoozeUntil = new Date(Date.now() + minutes * 60 * 1000);
    return this.save();
};

// Static method to get active reminders for a user
reminderSchema.statics.getActiveReminders = function (userId) {
    return this.find({ user: userId, enabled: true }).sort({ time: 1 });
};

// Static method to get reminders due now
reminderSchema.statics.getDueReminders = function () {
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const today = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

    return this.find({
        enabled: true,
        time: currentTime,
        $or: [
            { days: 'everyday' },
            { days: today }
        ],
        $or: [
            { snoozeUntil: { $exists: false } },
            { snoozeUntil: null },
            { snoozeUntil: { $lt: now } }
        ]
    }).populate('user', 'name email');
};

module.exports = mongoose.model('Reminder', reminderSchema);
