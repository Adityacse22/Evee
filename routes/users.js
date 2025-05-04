const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/users/me
// @desc    Get current user profile
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   PUT /api/users/me
// @desc    Update user profile
// @access  Private
router.put('/me', protect, async (req, res) => {
  try {
    // Fields to update
    const fieldsToUpdate = {};
    
    // Only allow updating specific fields
    if (req.body.name) fieldsToUpdate.name = req.body.name;
    if (req.body.profileImage) fieldsToUpdate.profileImage = req.body.profileImage;
    if (req.body.vehicle) fieldsToUpdate.vehicle = req.body.vehicle;
    if (req.body.paymentMethods) fieldsToUpdate.paymentMethods = req.body.paymentMethods;
    
    // Update user
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: fieldsToUpdate },
      { new: true, runValidators: true }
    ).select('-password');
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   PUT /api/users/password
// @desc    Update password
// @access  Private
router.put('/password', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    // Get user with password
    const user = await User.findById(req.user._id);
    
    // Check current password
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }
    
    // Set new password
    user.password = newPassword;
    await user.save();
    
    res.status(200).json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   POST /api/users/favorites/:stationId
// @desc    Add station to favorites
// @access  Private
router.post('/favorites/:stationId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    // Check if station is already in favorites
    if (user.favoriteStations.includes(req.params.stationId)) {
      return res.status(400).json({
        success: false,
        message: 'Station already in favorites'
      });
    }
    
    // Add to favorites
    user.favoriteStations.push(req.params.stationId);
    await user.save();
    
    res.status(200).json({
      success: true,
      data: user.favoriteStations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   DELETE /api/users/favorites/:stationId
// @desc    Remove station from favorites
// @access  Private
router.delete('/favorites/:stationId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    // Filter out the station
    user.favoriteStations = user.favoriteStations.filter(
      station => station.toString() !== req.params.stationId
    );
    
    await user.save();
    
    res.status(200).json({
      success: true,
      data: user.favoriteStations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/users
// @desc    Get all users (admin only)
// @access  Private (Admin)
router.get('/', protect, authorize('admin', 'superadmin'), async (req, res) => {
  try {
    const users = await User.find().select('-password');
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   PUT /api/users/:id
// @desc    Update user role (admin only)
// @access  Private (SuperAdmin)
router.put('/:id', protect, authorize('superadmin'), async (req, res) => {
  try {
    const { role } = req.body;
    
    // Validate role
    if (!['user', 'admin', 'superadmin'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role'
      });
    }
    
    // Update user
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router; 