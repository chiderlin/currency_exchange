import express, { Express, Request, Response } from 'express';
import router from './routes';
import helment from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();

app.use(helment());
app.use(cors());
app.use(router);

export default app;
