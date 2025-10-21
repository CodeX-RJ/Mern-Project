import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const URI = process.env.URI;

const connectDB = async () => {
  try {
    await mongoose.connect(URI)
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};  

export default connectDB;


// password - q0RZja3R7eVAtiK8 
// ramakantjai91_db_user

