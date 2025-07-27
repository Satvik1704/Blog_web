import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './configs/db.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send("API is working"));
app.use('/api/admin', adminRouter);
app.use('/api/blog', blogRouter);

// Connect to DB on server start
// Note: In serverless functions, this might be called on every cold start
async function startDB() {
  try {
    await connectDB();
    console.log('Connected to DB');
  } catch (error) {
    console.error('Failed to connect to DB:', error);
  }
}

// Run the DB connection function once
startDB();

export default app;
