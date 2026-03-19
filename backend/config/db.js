/**
 * DIY UNIVERSITY - Database Configuration
 * MongoDB connection with fallback to in-memory
 */

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/diy-university';

    const conn = await mongoose.connect(mongoURI, {
      // MongoDB driver options
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.log('⚠️  Running in demo mode with mock data');
    return null;
  }
};

export default connectDB;
