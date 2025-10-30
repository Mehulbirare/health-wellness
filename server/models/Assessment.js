const mongoose = require('mongoose');

const AssessmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  physicalTraits: {
    skin: {
      type: String,
      enum: ['dry', 'oily', 'balanced', 'balanced_moisturized'],
      required: true
    },
    bodyBuild: {
      type: String,
      enum: ['thin', 'muscular', 'heavier'],
      required: true
    },
    hair: {
      type: String,
      enum: ['dry_thin', 'oily_thinning', 'thick_oily', 'slightly_dry_thin'],
      required: true
    }
  },
  mentalTraits: {
    mindset: {
      type: String,
      enum: ['restless', 'intense', 'calm'],
      required: true
    },
    memory: {
      type: String,
      enum: ['forgetful', 'sharp', 'slow_long_term'],
      required: true
    },
    emotions: {
      type: String,
      enum: ['anxious', 'angry', 'content'],
      required: true
    }
  },
  dailyHabits: {
    diet: {
      type: String,
      enum: ['warm_dry', 'cold_spicy', 'light_sweet', 'hot_spicy'],
      required: true
    },
    sleep: {
      type: String,
      enum: ['light', 'moderate', 'deep'],
      required: true
    },
    energy: {
      type: String,
      enum: ['variable', 'high_bursts', 'steady', 'balanced'],
      required: true
    }
  },
  environmentalReactions: {
    weatherPreference: {
      type: String,
      enum: ['warm', 'cool', 'warm_dry'],
      required: true
    },
    stressResponse: {
      type: String,
      enum: ['anxious', 'irritable', 'calm', 'calm_anxious'],
      required: true
    }
  },
  results: {
    vata: {
      type: Number,
      required: true
    },
    pitta: {
      type: Number,
      required: true
    },
    kapha: {
      type: Number,
      required: true
    },
    dominantDosha: {
      type: String,
      enum: ['vata', 'pitta', 'kapha', 'vata-pitta', 'pitta-kapha', 'vata-kapha', 'vata-pitta-kapha'],
      required: true
    },
    secondaryDosha: {
      type: String,
      enum: ['vata', 'pitta', 'kapha', 'none'],
      required: true
    }
  },
  recommendations: {
    diet: [String],
    lifestyle: [String],
    exercise: [String],
    herbs: [String]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Assessment', AssessmentSchema);