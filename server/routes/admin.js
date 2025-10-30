const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

const User = require('../models/User');
const Assessment = require('../models/Assessment');

// @route   GET api/admin/dashboard
// @desc    Get admin dashboard data
// @access  Private/Admin
router.get('/dashboard', protect, authorize('admin'), async (req, res) => {
  try {
    // Get total users count
    const totalUsers = await User.countDocuments({ role: 'user' });
    
    // Get total assessments count
    const totalAssessments = await Assessment.countDocuments();
    
    // Get dosha distribution
    const users = await User.find({ 'prakrutiResult.dominantDosha': { $ne: '' } });
    
    const doshaDistribution = {
      vata: 0,
      pitta: 0,
      kapha: 0,
      'vata-pitta': 0,
      'pitta-kapha': 0,
      'vata-kapha': 0,
      'vata-pitta-kapha': 0
    };
    
    users.forEach(user => {
      if (user.prakrutiResult.dominantDosha) {
        doshaDistribution[user.prakrutiResult.dominantDosha]++;
      }
    });
    
    // Get recent assessments
    const recentAssessments = await Assessment.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'name email');
    
    // Get new users (registered in the last 7 days)
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const newUsers = await User.countDocuments({
      createdAt: { $gte: oneWeekAgo }
    });
    
    res.json({
      totalUsers,
      totalAssessments,
      doshaDistribution,
      recentAssessments,
      newUsers
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/admin/users
// @desc    Get all users with pagination
// @access  Private/Admin
router.get('/users', protect, authorize('admin'), async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    const users = await User.find()
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);
    
    const total = await User.countDocuments();
    
    res.json({
      users,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/admin/assessments
// @desc    Get all assessments with pagination
// @access  Private/Admin
router.get('/assessments', protect, authorize('admin'), async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    const assessments = await Assessment.find()
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
      .populate('user', 'name email');
    
    const total = await Assessment.countDocuments();
    
    res.json({
      assessments,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/admin/users/:id
// @desc    Update user role
// @access  Private/Admin
router.put('/users/:id/role', protect, authorize('admin'), async (req, res) => {
  try {
    const { role } = req.body;
    
    if (!role || !['user', 'admin'].includes(role)) {
      return res.status(400).json({ msg: 'Invalid role' });
    }
    
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    user.role = role;
    await user.save();
    
    res.json(user);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/admin/assessments/:id
// @desc    Delete an assessment
// @access  Private/Admin
router.delete('/assessments/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id);
    
    if (!assessment) {
      return res.status(404).json({ msg: 'Assessment not found' });
    }
    
    await assessment.remove();
    
    res.json({ msg: 'Assessment removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Assessment not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;