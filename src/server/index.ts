import express from 'express';
import cors from 'cors';
import courseRoutes from './routes/courseRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', courseRoutes);

// Error handling
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`);
});