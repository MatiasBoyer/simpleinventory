import express from 'express';
import healthRouter from '#routes/healthRoute.js';
import aiRouter from '#routes/aiRoute.js';
const router = express.Router();

router.use(healthRouter);
router.use('/ai', aiRouter);

export default router;
