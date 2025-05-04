const express = require('express');
const router = express.Router();
const Station = require('../models/Station');
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/stations
// @desc    Get all stations with optional filtering
// @access  Public
router.get('/', async (req, res) => {
  try {
    let query = {};
    
    // Apply filters if they exist
    if (req.query.plugTypes) {
      query.plugTypes = { $in: req.query.plugTypes.split(',') };
    }
    
    if (req.query.chargingSpeed) {
      query.chargingSpeed = { $in: req.query.chargingSpeed.split(',') };
    }
    
    if (req.query.availability === 'true') {
      query['availability.available'] = { $gt: 0 };
    }
    
    if (req.query.maxPrice) {
      query.price = { $lte: parseFloat(req.query.maxPrice) };
    }
    
    if (req.query.rating) {
      query.rating = { $gte: parseFloat(req.query.rating) };
    }
    
    // Get stations
    const stations = await Station.find(query);
    
    // Add distance calculation if user location provided
    if (req.query.lat && req.query.lng) {
      const userLat = parseFloat(req.query.lat);
      const userLng = parseFloat(req.query.lng);
      
      // Simple distance calculation for each station
      const stationsWithDistance = stations.map(station => {
        const stationObj = station.toObject();
        stationObj.distance = calculateDistance(
          userLat, 
          userLng, 
          station.location.lat, 
          station.location.lng
        );
        return stationObj;
      });
      
      // Sort by distance if requested
      if (req.query.sortByDistance === 'true') {
        stationsWithDistance.sort((a, b) => a.distance - b.distance);
      }
      
      return res.status(200).json({
        success: true,
        count: stationsWithDistance.length,
        data: stationsWithDistance
      });
    }
    
    res.status(200).json({
      success: true,
      count: stations.length,
      data: stations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/stations/:id
// @desc    Get single station
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const station = await Station.findById(req.params.id);
    
    if (!station) {
      return res.status(404).json({
        success: false,
        message: 'Station not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: station
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   POST /api/stations
// @desc    Create a station
// @access  Private (Admin only)
router.post('/', protect, authorize('admin', 'superadmin'), async (req, res) => {
  try {
    const station = await Station.create(req.body);
    
    res.status(201).json({
      success: true,
      data: station
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   PUT /api/stations/:id
// @desc    Update a station
// @access  Private (Admin only)
router.put('/:id', protect, authorize('admin', 'superadmin'), async (req, res) => {
  try {
    let station = await Station.findById(req.params.id);
    
    if (!station) {
      return res.status(404).json({
        success: false,
        message: 'Station not found'
      });
    }
    
    station = await Station.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: station
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   DELETE /api/stations/:id
// @desc    Delete a station
// @access  Private (Admin only)
router.delete('/:id', protect, authorize('admin', 'superadmin'), async (req, res) => {
  try {
    const station = await Station.findById(req.params.id);
    
    if (!station) {
      return res.status(404).json({
        success: false,
        message: 'Station not found'
      });
    }
    
    await station.deleteOne();
    
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

// Function to calculate distance between two points using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const distance = R * c; // Distance in km
  return parseFloat(distance.toFixed(1));
}

function deg2rad(deg) {
  return deg * (Math.PI/180);
}

module.exports = router; 