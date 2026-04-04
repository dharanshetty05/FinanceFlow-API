import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import recordRoutes from './routes/record.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/records', recordRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);

app.get('/health', (req, res) => {
    res.json({ success: true, message: 'API is running' });
});

export default app;