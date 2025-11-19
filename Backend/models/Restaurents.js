const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  cuisine: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  priceRange: {
    type: String,
    required: true,
    enum: ['$', '$$', '$$$', '$$$$']
  },
  deliveryTime: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    default: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg'
  },
  description: {
    type: String,
    trim: true
  },
  isOpen: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for search functionality
restaurantSchema.index({ name: 'text', cuisine: 'text', location: 'text' });

module.exports = mongoose.model('Restaurant', restaurantSchema);

