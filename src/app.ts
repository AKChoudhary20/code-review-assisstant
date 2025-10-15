import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import reviewRoutes from './api/routes/reviewRoutes';
import { connectDB } from './config/config';

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || '3000', 10);

// Middleware
app.use(cors());
app.use(express.json({ limit: process.env.MAX_REQUEST_SIZE || '50mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/reviews', reviewRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server only if not in test environment
if (process.env.NODE_ENV !== 'test') {
  // Database connection
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    }).on('error', (error: Error) => {
      console.error('Server failed to start:', error);
    });
  }).catch((error: Error) => {
    console.error('Database connection failed:', error);
    process.exit(1);
  });
}

export default app;
