const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  }
});

const availabilitySchema = new mongoose.Schema({
  total: {
    type: Number,
    required: true
  },
  available: {
    type: Number,
    required: true
  }
});

const stationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: locationSchema,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  plugTypes: [{
    type: String,
    enum: ['Type 1', 'Type 2', 'CHAdeMO', 'CCS', 'Tesla'],
    required: true
  }],
  chargingSpeed: [{
    type: String,
    enum: ['Level 1', 'Level 2', 'DC Fast'],
    required: true
  }],
  price: {
    type: Number,
    required: true
  },
  priceUnit: {
    type: String,
    default: 'kWh'
  },
  availability: {
    type: availabilitySchema,
    required: true
  },
  waitTime: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  amenities: [{
    type: String
  }],
  images: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field on save
stationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Station', stationSchema); 