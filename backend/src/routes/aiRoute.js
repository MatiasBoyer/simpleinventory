import express from 'express';
import { getImageAnalysis } from '#controllers/aiController.js';
const aiRouter = express.Router();

aiRouter.post('/imageAnalysis', getImageAnalysis);

export default aiRouter;
