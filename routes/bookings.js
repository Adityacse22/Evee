const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Station = require('../models/Station');
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/bookings
// @desc    Get user bookings
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate('stationId')
      .sort('-createdAt');
    
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/bookings/all
// @desc    Get all bookings (admin only)
// @access  Private (Admin)
router.get('/all', protect, authorize('admin', 'superadmin'), async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('userId', 'name email')
      .populate('stationId', 'name address')
      .sort('-createdAt');
    
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/bookings/:id
// @desc    Get booking by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('stationId');
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    // Check if booking belongs to user or user is admin
    if (booking.userId.toString() !== req.user._id.toString() && 
        !['admin', 'superadmin'].includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this booking'
      });
    }
    
    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   POST /api/bookings
// @desc    Create a booking
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { stationId, plugType, startTime, endTime } = req.body;
    
    // Check if station exists
    const station = await Station.findById(stationId);
    if (!station) {
      return res.status(404).json({
        success: false,
        message: 'Station not found'
      });
    }
    
    // Check if station has available spots
    if (station.availability.available === 0) {
      return res.status(400).json({
        success: false,
        message: 'No available charging spots at this station'
      });
    }
    
    // Check if plug type is available at station
    if (!station.plugTypes.includes(plugType)) {
      return res.status(400).json({
        success: false,
        message: `This station does not support ${plugType} charging`
      });
    }
    
    // Calculate total price based on duration and station price
    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationHours = (end - start) / (1000 * 60 * 60);
    const totalPrice = parseFloat((durationHours * station.price).toFixed(2));
    
    // Create booking
    const booking = await Booking.create({
      userId: req.user._id,
      stationId,
      plugType,
      startTime,
      endTime,
      status: 'pending',
      totalPrice
    });
    
    // Update station availability
    station.availability.available -= 1;
    await station.save();
    
    // Return booking with populated station
    const populatedBooking = await Booking.findById(booking._id)
      .populate('stationId');
    
    res.status(201).json({
      success: true,
      data: populatedBooking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   PUT /api/bookings/:id
// @desc    Update booking status
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const { status } = req.body;
    
    // Find booking
    let booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    // Check if booking belongs to user or user is admin
    if (booking.userId.toString() !== req.user._id.toString() && 
        !['admin', 'superadmin'].includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this booking'
      });
    }
    
    // If cancelling booking, update station availability
    if (status === 'cancelled' && booking.status !== 'cancelled') {
      const station = await Station.findById(booking.stationId);
      if (station) {
        station.availability.available += 1;
        await station.save();
      }
    }
    
    // Update booking
    booking.status = status;
    await booking.save();
    
    // Return updated booking with populated station
    const updatedBooking = await Booking.findById(booking._id)
      .populate('stationId');
    
    res.status(200).json({
      success: true,
      data: updatedBooking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   DELETE /api/bookings/:id
// @desc    Delete booking (admin only)
// @access  Private (Admin)
router.delete('/:id', protect, authorize('admin', 'superadmin'), async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    // If booking is not cancelled, update station availability
    if (booking.status !== 'cancelled') {
      const station = await Station.findById(booking.stationId);
      if (station) {
        station.availability.available += 1;
        await station.save();
      }
    }
    
    await booking.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
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