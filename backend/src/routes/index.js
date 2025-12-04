import express from 'express';
import healthRouter from '#routes/healthRoute.js';
import aiRouter from '#routes/aiRoute.js';
import inventoryRouter from '#routes/inventoryRoute.js';
const router = express.Router();

router.use(healthRouter);
router.use(inventoryRouter);
router.use('/ai', aiRouter);

export default router;
