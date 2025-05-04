# Evee Backend

Backend API for the Evee Electric Vehicle Charging Station Finder application.

## Setup Instructions

1. Clone the repository
2. Create a `.env` file in the root directory using the `env.example` as a template
3. Install dependencies:
   ```
   npm install
   ```
4. Make sure MongoDB is running locally
5. Seed the database with sample data:
   ```
   npm run seed
   ```
6. Start the development server:
   ```
   npm run server:dev
   ```

## API Endpoints

### Authentication

- **POST /api/auth/register** - Register a new user
  - Request body: `{ name, email, password }`
  - Returns: User data and JWT token

- **POST /api/auth/login** - Login a user
  - Request body: `{ email, password }`
  - Returns: User data and JWT token

### Stations

- **GET /api/stations** - Get all stations with optional filtering
  - Query parameters:
    - `plugTypes` (comma-separated list)
    - `chargingSpeed` (comma-separated list)
    - `availability` (boolean)
    - `maxPrice` (number)
    - `rating` (number)
    - `lat` and `lng` (for distance calculation)
    - `sortByDistance` (boolean)

- **GET /api/stations/:id** - Get a single station

- **POST /api/stations** - Create a station (admin only)
  - Request body: Station data

- **PUT /api/stations/:id** - Update a station (admin only)
  - Request body: Station data

- **DELETE /api/stations/:id** - Delete a station (admin only)

### Bookings

- **GET /api/bookings** - Get user's bookings

- **GET /api/bookings/all** - Get all bookings (admin only)

- **GET /api/bookings/:id** - Get a single booking

- **POST /api/bookings** - Create a booking
  - Request body: `{ stationId, plugType, startTime, endTime }`

- **PUT /api/bookings/:id** - Update booking status
  - Request body: `{ status }`

- **DELETE /api/bookings/:id** - Delete a booking (admin only)

### Users

- **GET /api/users/me** - Get current user profile

- **PUT /api/users/me** - Update user profile
  - Request body: User data

- **PUT /api/users/password** - Update password
  - Request body: `{ currentPassword, newPassword }`

- **POST /api/users/favorites/:stationId** - Add station to favorites

- **DELETE /api/users/favorites/:stationId** - Remove station from favorites

- **GET /api/users** - Get all users (admin only)

- **PUT /api/users/:id** - Update user role (superadmin only)
  - Request body: `{ role }`

## Data Models

### User

```javascript
{
  name: String,
  email: String,
  password: String (hashed),
  profileImage: String,
  vehicle: {
    make: String,
    model: String,
    year: Number,
    plugType: String
  },
  paymentMethods: [
    {
      type: String,
      last4: String,
      expiryDate: String
    }
  ],
  favoriteStations: [ObjectId],
  role: String,
  createdAt: Date
}
```

### Station

```javascript
{
  name: String,
  location: {
    lat: Number,
    lng: Number
  },
  address: String,
  plugTypes: [String],
  chargingSpeed: [String],
  price: Number,
  priceUnit: String,
  availability: {
    total: Number,
    available: Number
  },
  waitTime: Number,
  rating: Number,
  amenities: [String],
  images: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### Booking

```javascript
{
  userId: ObjectId,
  stationId: ObjectId,
  plugType: String,
  startTime: Date,
  endTime: Date,
  status: String,
  totalPrice: Number,
  createdAt: Date
}
```