# Evee - EV Charging Station Finder

A full-stack application for finding and booking electric vehicle charging stations.

## Features

- Find EV charging stations on an interactive map
- Filter stations by various criteria (plug type, charging speed, etc.)
- Book charging slots at available stations
- User authentication and profile management
- Admin dashboard for managing stations and bookings

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS, Shadcn UI
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT

## Setup Instructions

### Prerequisites

- Node.js 18.x or higher
- MongoDB (running locally or accessible via URI)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with the following content:
   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/evee
   JWT_SECRET=your_custom_secret_key
   ```
4. Make sure MongoDB is running

### Database Setup

1. Seed the database with initial data:
   ```
   npm run seed
   ```

### Running the Application

1. Start both frontend and backend concurrently:
   ```
   npm run dev:full
   ```

   This will start:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

2. Alternatively, you can run them separately:
   - Frontend only: `npm run dev`
   - Backend only: `npm run server:dev`

## API Documentation

See [README-BACKEND.md](README-BACKEND.md) for detailed API documentation.

## Default Users

After seeding the database, you can log in with these credentials:

- Admin User:
  - Email: admin@example.com
  - Password: password123

- Regular User:
  - Email: alex@example.com
  - Password: password123

## License

MIT
