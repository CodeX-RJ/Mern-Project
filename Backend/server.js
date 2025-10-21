import express from 'express';
import postRoutes from './routes/postRoutes.js';  
import connectDB from './confi/db.js';  
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

dotenv.config();

const app = express();
const __dirname = path.resolve();

app.use(cors({ origin: '*' }));
app.use(express.json());

// API routes
app.use('/api/posts', postRoutes);

// Serve React frontend (static files)
const buildPath = path.join(__dirname, '../Frontend/dist');
app.use(express.static(buildPath));

// React frontend fallback
app.use((req, res, next) => {
  // Only handle requests that are not API
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(buildPath, 'index.html'));
  } else {
    next();
  }
});

// Connect DB and start server
connectDB()
  .then(() => {
    console.log('Connected to the database');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });
