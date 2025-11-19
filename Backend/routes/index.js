const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurents');

// GET all restaurants with search and filter
router.get('/', async (req, res) => {
  try {
    const { search, cuisine, priceRange, minRating, sortBy, isOpen } = req.query;
    
    // Build query
    let query = {};
    
    // Search filter (name, cuisine, location)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { cuisine: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Cuisine filter
    if (cuisine) {
      query.cuisine = { $regex: cuisine, $options: 'i' };
    }
    
    // Price range filter
    if (priceRange) {
      query.priceRange = priceRange;
    }
    
    // Minimum rating filter
    if (minRating) {
      query.rating = { $gte: parseFloat(minRating) };
    }
    
    // Open/Closed filter
    if (isOpen !== undefined) {
      query.isOpen = isOpen === 'true';
    }
    
    // Build sort
    let sort = {};
    if (sortBy) {
      switch (sortBy) {
        case 'rating':
          sort = { rating: -1 };
          break;
        case 'deliveryTime':
          sort = { deliveryTime: 1 };
          break;
        case 'priceLow':
          sort = { priceRange: 1 };
          break;
        case 'priceHigh':
          sort = { priceRange: -1 };
          break;
        default:
          sort = { createdAt: -1 };
      }
    } else {
      sort = { createdAt: -1 };
    }
    
    const restaurants = await Restaurant.find(query).sort(sort);
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET unique cuisines for filter dropdown
router.get('/cuisines', async (req, res) => {
  try {
    const cuisines = await Restaurant.distinct('cuisine');
    res.json(cuisines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create a restaurant (for seeding data)
router.post('/', async (req, res) => {
  try {
    const restaurant = new Restaurant(req.body);
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST seed sample data
router.post('/seed', async (req, res) => {
  try {
    const sampleRestaurants = [
      {
        name: 'Spice Garden',
        cuisine: 'Indian',
        location: 'Downtown',
        rating: 4.5,
        priceRange: '$$',
        deliveryTime: 30,
        description: 'Authentic Indian cuisine with a modern twist',
        isOpen: true
      },
      {
        name: 'Pizza Paradise',
        cuisine: 'Italian',
        location: 'Midtown',
        rating: 4.2,
        priceRange: '$$',
        deliveryTime: 25,
        description: 'Wood-fired pizzas and pasta',
        isOpen: true
      },
      {
        name: 'Sushi Master',
        cuisine: 'Japanese',
        location: 'Uptown',
        rating: 4.8,
        priceRange: '$$$',
        deliveryTime: 35,
        description: 'Fresh sushi and sashimi',
        isOpen: true
      },
      {
        name: 'Burger King',
        cuisine: 'American',
        location: 'Downtown',
        rating: 4.0,
        priceRange: '$',
        deliveryTime: 20,
        description: 'Classic American burgers and fries',
        isOpen: true
      },
      {
        name: 'Dragon Palace',
        cuisine: 'Chinese',
        location: 'Chinatown',
        rating: 4.3,
        priceRange: '$$',
        deliveryTime: 28,
        description: 'Traditional Chinese dishes',
        isOpen: true
      },
      {
        name: 'Taco Fiesta',
        cuisine: 'Mexican',
        location: 'Southside',
        rating: 4.6,
        priceRange: '$',
        deliveryTime: 22,
        description: 'Authentic Mexican street food',
        isOpen: true
      },
      {
        name: 'Le Bistro',
        cuisine: 'French',
        location: 'Uptown',
        rating: 4.7,
        priceRange: '$$$',
        deliveryTime: 40,
        description: 'Fine French dining',
        isOpen: true
      },
      {
        name: 'Thai Orchid',
        cuisine: 'Thai',
        location: 'Midtown',
        rating: 4.4,
        priceRange: '$$',
        deliveryTime: 32,
        description: 'Spicy and flavorful Thai cuisine',
        isOpen: true
      },
      {
        name: 'Mediterranean Delight',
        cuisine: 'Mediterranean',
        location: 'Downtown',
        rating: 4.5,
        priceRange: '$$',
        deliveryTime: 30,
        description: 'Fresh Mediterranean flavors',
        isOpen: true
      },
      {
        name: 'BBQ Smokehouse',
        cuisine: 'American',
        location: 'Northside',
        rating: 4.1,
        priceRange: '$$$',
        deliveryTime: 45,
        description: 'Slow-smoked meats and BBQ',
        isOpen: false
      }
    ];
    
    await Restaurant.insertMany(sampleRestaurants);
    res.json({ message: 'Sample data seeded successfully', count: sampleRestaurants.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

