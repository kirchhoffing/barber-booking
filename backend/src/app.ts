import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import barberRoutes from './routes/barber.routes';
import adminRoutes from './routes/admin.routes';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/api/barber', barberRoutes);
app.use('/api/admin', adminRoutes);

export default app; 