import express from 'express';
import urlRoutes from './routes/routes';
import pinoHttp from 'pino-http';
import { logger } from './utils/logger';

const app = express();

app.use(express.json());
app.use('/api', urlRoutes);
app.use(pinoHttp({ logger }));


export { app };

