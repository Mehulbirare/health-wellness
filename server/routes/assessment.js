const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

const Assessment = require('../models/Assessment');
const User = require('../models/User');

// @route   POST api/assessment
// @desc    Create a new assessment
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const {
      physicalTraits,
      mentalTraits,
      dailyHabits,
      environmentalReactions
    } = req.body;

    // Calculate dosha scores
    const vataScore = calculateVataScore(physicalTraits, mentalTraits, dailyHabits, environmentalReactions);
    const pittaScore = calculatePittaScore(physicalTraits, mentalTraits, dailyHabits, environmentalReactions);
    const kaphaScore = calculateKaphaScore(physicalTraits, mentalTraits, dailyHabits, environmentalReactions);

    // Determine dominant and secondary doshas
    const { dominantDosha, secondaryDosha } = determineDoshas(vataScore, pittaScore, kaphaScore);

    // Generate recommendations
    const recommendations = generateRecommendations(dominantDosha, secondaryDosha);

    // Create assessment
    const assessment = new Assessment({
      user: req.user.id,
      physicalTraits,
      mentalTraits,
      dailyHabits,
      environmentalReactions,
      results: {
        vata: vataScore,
        pitta: pittaScore,
        kapha: kaphaScore,
        dominantDosha,
        secondaryDosha
      },
      recommendations
    });

    await assessment.save();

    // Update user's prakruti result
    await User.findByIdAndUpdate(req.user.id, {
      prakrutiResult: {
        vata: vataScore,
        pitta: pittaScore,
        kapha: kaphaScore,
        dominantDosha,
        lastAssessmentDate: Date.now()
      }
    });

    res.json(assessment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/assessment
// @desc    Get all assessments for current user
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const assessments = await Assessment.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(assessments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/assessment/:id
// @desc    Get assessment by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id);

    if (!assessment) {
      return res.status(404).json({ msg: 'Assessment not found' });
    }

    // Make sure user owns assessment
    if (assessment.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    res.json(assessment);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Assessment not found' });
    }
    res.status(500).send('Server Error');
  }
});

// Helper functions for dosha calculations
function calculateVataScore(physicalTraits, mentalTraits, dailyHabits, environmentalReactions) {
  let score = 0;
  
  // Physical traits
  if (physicalTraits.skin === 'dry') score += 2;
  if (physicalTraits.bodyBuild === 'thin') score += 2;
  if (physicalTraits.hair === 'dry_thin') score += 2;
  
  // Mental traits
  if (mentalTraits.mindset === 'restless') score += 2;
  if (mentalTraits.memory === 'forgetful') score += 2;
  if (mentalTraits.emotions === 'anxious') score += 2;
  
  // Daily habits
  if (dailyHabits.diet === 'warm_dry') score += 2;
  if (dailyHabits.sleep === 'light') score += 2;
  if (dailyHabits.energy === 'variable') score += 2;
  
  // Environmental reactions
  if (environmentalReactions.weatherPreference === 'warm') score += 2;
  if (environmentalReactions.stressResponse === 'anxious') score += 2;
  
  return score;
}

function calculatePittaScore(physicalTraits, mentalTraits, dailyHabits, environmentalReactions) {
  let score = 0;
  
  // Physical traits
  if (physicalTraits.skin === 'oily') score += 2;
  if (physicalTraits.bodyBuild === 'muscular') score += 2;
  if (physicalTraits.hair === 'oily_thinning') score += 2;
  
  // Mental traits
  if (mentalTraits.mindset === 'intense') score += 2;
  if (mentalTraits.memory === 'sharp') score += 2;
  if (mentalTraits.emotions === 'angry') score += 2;
  
  // Daily habits
  if (dailyHabits.diet === 'cold_spicy' || dailyHabits.diet === 'hot_spicy') score += 2;
  if (dailyHabits.sleep === 'moderate') score += 2;
  if (dailyHabits.energy === 'high_bursts') score += 2;
  
  // Environmental reactions
  if (environmentalReactions.weatherPreference === 'cool') score += 2;
  if (environmentalReactions.stressResponse === 'irritable') score += 2;
  
  return score;
}

function calculateKaphaScore(physicalTraits, mentalTraits, dailyHabits, environmentalReactions) {
  let score = 0;
  
  // Physical traits
  if (physicalTraits.skin === 'balanced' || physicalTraits.skin === 'balanced_moisturized') score += 2;
  if (physicalTraits.bodyBuild === 'heavier') score += 2;
  if (physicalTraits.hair === 'thick_oily') score += 2;
  
  // Mental traits
  if (mentalTraits.mindset === 'calm') score += 2;
  if (mentalTraits.memory === 'slow_long_term') score += 2;
  if (mentalTraits.emotions === 'content') score += 2;
  
  // Daily habits
  if (dailyHabits.diet === 'light_sweet') score += 2;
  if (dailyHabits.sleep === 'deep') score += 2;
  if (dailyHabits.energy === 'steady' || dailyHabits.energy === 'balanced') score += 2;
  
  // Environmental reactions
  if (environmentalReactions.weatherPreference === 'warm_dry') score += 2;
  if (environmentalReactions.stressResponse === 'calm' || environmentalReactions.stressResponse === 'calm_anxious') score += 2;
  
  return score;
}

function determineDoshas(vataScore, pittaScore, kaphaScore) {
  const scores = [
    { dosha: 'vata', score: vataScore },
    { dosha: 'pitta', score: pittaScore },
    { dosha: 'kapha', score: kaphaScore }
  ];
  
  // Sort by score in descending order
  scores.sort((a, b) => b.score - a.score);
  
  let dominantDosha;
  let secondaryDosha;
  
  // If the highest score is significantly higher than the others
  if (scores[0].score >= scores[1].score + 3) {
    dominantDosha = scores[0].dosha;
    secondaryDosha = 'none';
  } 
  // If the top two scores are close and significantly higher than the third
  else if (scores[0].score >= scores[2].score + 3 && scores[1].score >= scores[2].score + 3) {
    dominantDosha = `${scores[0].dosha}-${scores[1].dosha}`;
    secondaryDosha = 'none';
  }
  // If all three scores are close
  else if (Math.abs(scores[0].score - scores[2].score) < 3) {
    dominantDosha = 'vata-pitta-kapha';
    secondaryDosha = 'none';
  }
  // Otherwise, the highest is dominant and second highest is secondary
  else {
    dominantDosha = scores[0].dosha;
    secondaryDosha = scores[1].dosha;
  }
  
  return { dominantDosha, secondaryDosha };
}

function generateRecommendations(dominantDosha, secondaryDosha) {
  const recommendations = {
    diet: [],
    lifestyle: [],
    exercise: [],
    herbs: []
  };
  
  // Recommendations for Vata
  if (dominantDosha === 'vata' || dominantDosha.includes('vata')) {
    recommendations.diet.push(
      'Favor warm, cooked, moist foods',
      'Include healthy oils and fats',
      'Avoid cold, dry, or raw foods',
      'Use warming spices like ginger and cinnamon'
    );
    recommendations.lifestyle.push(
      'Maintain regular daily routine',
      'Get plenty of rest',
      'Practice gentle yoga',
      'Avoid excessive travel or movement'
    );
    recommendations.exercise.push(
      'Gentle, grounding exercises',
      'Walking in nature',
      'Swimming in warm water',
      'Avoid excessive or intense exercise'
    );
    recommendations.herbs.push(
      'Ashwagandha',
      'Brahmi',
      'Licorice',
      'Ginger'
    );
  }
  
  // Recommendations for Pitta
  if (dominantDosha === 'pitta' || dominantDosha.includes('pitta')) {
    recommendations.diet.push(
      'Favor cooling, sweet, bitter foods',
      'Include plenty of fresh vegetables',
      'Avoid spicy, sour, or fermented foods',
      'Limit salt and oil'
    );
    recommendations.lifestyle.push(
      'Avoid excessive heat and sun exposure',
      'Practice moderation in all activities',
      'Make time for relaxation and play',
      'Avoid competitive or intense situations'
    );
    recommendations.exercise.push(
      'Moderate exercise during cooler times of day',
      'Swimming',
      'Moon salutations in yoga',
      'Avoid exercising in hot conditions'
    );
    recommendations.herbs.push(
      'Aloe vera',
      'Coriander',
      'Mint',
      'Shatavari'
    );
  }
  
  // Recommendations for Kapha
  if (dominantDosha === 'kapha' || dominantDosha.includes('kapha')) {
    recommendations.diet.push(
      'Favor light, dry, warm foods',
      'Include plenty of spices',
      'Avoid heavy, oily, or sweet foods',
      'Limit dairy and wheat'
    );
    recommendations.lifestyle.push(
      'Rise early in the morning',
      'Stay active and engaged',
      'Seek variety and stimulation',
      'Avoid excessive sleep or rest'
    );
    recommendations.exercise.push(
      'Vigorous, stimulating exercise',
      'Jogging or brisk walking',
      'Sun salutations in yoga',
      'Regular cardio workouts'
    );
    recommendations.herbs.push(
      'Ginger',
      'Black pepper',
      'Turmeric',
      'Triphala'
    );
  }
  
  return recommendations;
}

module.exports = router;