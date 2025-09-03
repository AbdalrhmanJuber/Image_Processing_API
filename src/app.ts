import express from 'express';
import imageRoutes from './routes/images';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(express.json());

app.use('/api/images', imageRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Image Processing API is running' });
});

app.use(errorHandler);

export default app;
