import express from 'express';
import { clerkMiddleware } from '@clerk/express';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import cliRoutes from './routes/cliRoutes';

const app = express();

app.use(express.json());
app.use(clerkMiddleware());

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cli', cliRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default app;
