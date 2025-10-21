import express from 'express';
import postRoutes from './routes/postRoutes.js';  
import connectDB from './confi/db.js';  
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // your React app
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));





app.use(express.json());
app.use('/api/posts', postRoutes);


connectDB().then(() => {
  console.log('Connected to the database');
  app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
}).catch((error) => {
  console.error('Database connection error:', error);
});





