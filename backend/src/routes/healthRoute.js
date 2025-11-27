import express from 'express';
import { getHealth } from '#controllers/healthController.js';
const healthRouter = express.Router();

healthRouter.get('/health', getHealth);

export default healthRouter;
