import express from 'express';
import cors from 'cors';
import { appRouter } from './routes/app.routes';
import { userRoutes } from './routes/user.routes';
import { authRoutes } from './routes/session.routes';
import { characterRoutes } from './routes/character.routes';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', appRouter);
app.use('/api', userRoutes);
app.use('/api', authRoutes);
app.use('/api', characterRoutes);

export default app;