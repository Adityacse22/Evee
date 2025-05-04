const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Station = require('./models/Station');
const Booking = require('./models/Booking');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Connect to DB
console.log('Connecting to database...');
connectDB().then(() => {
  console.log('Database connected, starting seed operation...');
  
  // Continue with seeding after connection is established
  if (process.argv[2] === '-d') {
    deleteData();
  } else {
    importData();
  }
}).catch(err => {
  console.error('Failed to connect to database:', err);
  process.exit(1);
});

// Sample data
const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin',
    vehicle: {
      make: 'Tesla',
      model: 'Model S',
      year: 2023,
      plugType: 'Tesla'
    }
  },
  {
    name: 'Alex Johnson',
    email: 'alex@example.com',
    password: 'password123',
    vehicle: {
      make: 'Tesla',
      model: 'Model 3',
      year: 2022,
      plugType: 'Tesla'
    },
    paymentMethods: [
      {
        type: 'card',
        last4: '4242',
        expiryDate: '06/26'
      }
    ]
  },
  {
    name: 'Sam Wilson',
    email: 'sam@example.com',
    password: 'password123',
    vehicle: {
      make: 'Nissan',
      model: 'Leaf',
      year: 2021,
      plugType: 'Type 2'
    }
  },
  {
    name: 'Emma Davis',
    email: 'emma@example.com',
    password: 'password123',
    vehicle: {
      make: 'Ford',
      model: 'Mustang Mach-E',
      year: 2023,
      plugType: 'CCS'
    },
    paymentMethods: [
      {
        type: 'card',
        last4: '5678',
        expiryDate: '12/25'
      }
    ]
  },
  {
    name: 'Michael Chen',
    email: 'michael@example.com',
    password: 'password123',
    vehicle: {
      make: 'Porsche',
      model: 'Taycan',
      year: 2023,
      plugType: 'CCS'
    }
  }
];

const stations = [
  {
    name: 'Central Park EV Hub',
    location: { lat: 40.7829, lng: -73.9654 },
    address: 'Central Park North, New York, NY',
    plugTypes: ['Type 2', 'CCS'],
    chargingSpeed: ['Level 2', 'DC Fast'],
    price: 0.35,
    priceUnit: 'kWh',
    availability: { total: 8, available: 3 },
    waitTime: 15,
    rating: 4.5,
    amenities: ['Restrooms', 'Coffee Shop', 'WiFi'],
    images: ['/placeholder.svg']
  },
  {
    name: 'Downtown Express Charger',
    location: { lat: 40.7580, lng: -73.9855 },
    address: '123 Broadway, New York, NY',
    plugTypes: ['Type 2', 'CHAdeMO', 'CCS'],
    chargingSpeed: ['Level 2', 'DC Fast'],
    price: 0.40,
    priceUnit: 'kWh',
    availability: { total: 12, available: 0 },
    waitTime: 45,
    rating: 4.2,
    amenities: ['Restrooms', 'Shopping', 'Restaurants'],
    images: ['/placeholder.svg']
  },
  {
    name: 'Tesla Supercharger - SoHo',
    location: { lat: 40.7248, lng: -74.0018 },
    address: '456 West Broadway, New York, NY',
    plugTypes: ['Tesla'],
    chargingSpeed: ['DC Fast'],
    price: 0.36,
    priceUnit: 'kWh',
    availability: { total: 10, available: 6 },
    waitTime: 0,
    rating: 4.8,
    amenities: ['Restrooms'],
    images: ['/placeholder.svg']
  },
  {
    name: 'Brooklyn Bridge Charger',
    location: { lat: 40.7061, lng: -73.9969 },
    address: '78 Brooklyn Bridge Blvd, Brooklyn, NY',
    plugTypes: ['Type 1', 'Type 2'],
    chargingSpeed: ['Level 1', 'Level 2'],
    price: 0.25,
    priceUnit: 'kWh',
    availability: { total: 6, available: 2 },
    waitTime: 10,
    rating: 3.9,
    amenities: ['Park', 'Restaurants'],
    images: ['/placeholder.svg']
  },
  {
    name: 'Midtown Fast Charge',
    location: { lat: 40.7549, lng: -73.9840 },
    address: '555 5th Avenue, New York, NY',
    plugTypes: ['CCS', 'CHAdeMO'],
    chargingSpeed: ['DC Fast'],
    price: 0.45,
    priceUnit: 'kWh',
    availability: { total: 4, available: 4 },
    waitTime: 0,
    rating: 4.6,
    amenities: ['Restrooms', 'Coffee Shop', 'Shopping', 'WiFi'],
    images: ['/placeholder.svg']
  },
  {
    name: 'Queens Plaza Charging Station',
    location: { lat: 40.7505, lng: -73.9407 },
    address: 'Queens Plaza North, Long Island City, NY',
    plugTypes: ['Type 2', 'CCS', 'CHAdeMO'],
    chargingSpeed: ['Level 2', 'DC Fast'],
    price: 0.38,
    priceUnit: 'kWh',
    availability: { total: 6, available: 3 },
    waitTime: 20,
    rating: 4.3,
    amenities: ['Restrooms', 'Shopping Mall', 'Food Court'],
    images: ['/placeholder.svg']
  },
  {
    name: 'Bronx Community Charger',
    location: { lat: 40.8448, lng: -73.8648 },
    address: 'Bronx Community College, Bronx, NY',
    plugTypes: ['Type 2', 'CCS'],
    chargingSpeed: ['Level 2'],
    price: 0.30,
    priceUnit: 'kWh',
    availability: { total: 4, available: 2 },
    waitTime: 5,
    rating: 4.0,
    amenities: ['Restrooms', 'Campus WiFi'],
    images: ['/placeholder.svg']
  }
];

// Import data
const importData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Station.deleteMany();
    await Booking.deleteMany();

    console.log('Data cleared...');

    // Insert stations
    const createdStations = await Station.insertMany(stations);
    console.log(`${createdStations.length} stations imported`);

    // Hash passwords and create users
    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        return user;
      })
    );
    
    const createdUsers = await User.insertMany(hashedUsers);
    console.log(`${createdUsers.length} users imported`);

    // Create multiple bookings
    const bookings = [
      {
        userId: createdUsers[1]._id, // Alex's booking
        stationId: createdStations[2]._id, // Tesla Supercharger
        plugType: 'Tesla',
        startTime: new Date(Date.now() + 86400000), // Tomorrow
        endTime: new Date(Date.now() + 86400000 + 3600000), // Tomorrow + 1 hour
        status: 'confirmed',
        totalPrice: 18.75
      },
      {
        userId: createdUsers[3]._id, // Emma's booking
        stationId: createdStations[0]._id, // Central Park EV Hub
        plugType: 'CCS',
        startTime: new Date(Date.now() + 172800000), // Day after tomorrow
        endTime: new Date(Date.now() + 172800000 + 7200000), // Day after tomorrow + 2 hours
        status: 'pending',
        totalPrice: 25.20
      },
      {
        userId: createdUsers[4]._id, // Michael's booking
        stationId: createdStations[4]._id, // Midtown Fast Charge
        plugType: 'CCS',
        startTime: new Date(Date.now() + 43200000), // Tomorrow noon
        endTime: new Date(Date.now() + 43200000 + 5400000), // Tomorrow noon + 1.5 hours
        status: 'confirmed',
        totalPrice: 33.75
      }
    ];

    await Booking.insertMany(bookings);
    console.log(`${bookings.length} bookings created`);

    console.log('Data import complete!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await User.deleteMany();
    await Station.deleteMany();
    await Booking.deleteMany();

    console.log('Data destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}; 