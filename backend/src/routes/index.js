import express from 'express';
import healthRouter from '#routes/healthRoute.js';
const router = express.Router();

router.use(healthRouter);

export default router;
