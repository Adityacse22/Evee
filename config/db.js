const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
  let retries = 5;
  let mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/evee';
  let useMemoryServer = false;
  
  // Try connecting to MongoDB
  while (retries) {
    try {
      if (useMemoryServer) {
        console.log('Attempting to use MongoDB Memory Server...');
        const mongod = await MongoMemoryServer.create();
        mongoUri = mongod.getUri() + 'evee';
        console.log(`Using in-memory MongoDB instance at: ${mongoUri}`);
        process.env.MONGO_MEMORY_SERVER_INSTANCE = mongod.getUri();
        
        // Add shutdown handler for memory server
        process.on('SIGINT', async () => {
          await mongod.stop();
          process.exit(0);
        });
      }
      
      console.log(`Attempting to connect to MongoDB at: ${mongoUri}`);
      const conn = await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
      
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return;
    } catch (error) {
      console.error(`Error connecting to MongoDB: ${error.message}`);
      retries -= 1;
      console.log(`Retries left: ${retries}`);
      
      // Only try memory server as a last resort
      if (retries === 1 && !useMemoryServer) {
        useMemoryServer = true;
        console.log('Local MongoDB connection failed. Switching to MongoDB Memory Server...');
      } else if (retries === 0) {
        console.error('Failed to connect to MongoDB after multiple attempts');
        console.log('Server will continue running but database operations will fail');
        return;
      }
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
};

module.exports = connectDB; 