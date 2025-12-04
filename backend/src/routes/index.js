import express from 'express';
import healthRouter from '#routes/healthRoute.js';
import aiRouter from '#routes/aiRoute.js';
import inventoryRouter from '#routes/inventoryRoute.js';
import { toNodeHandler } from 'better-auth/node';
import { auth } from '#utils/auth.js';
const router = express.Router();

router.use(healthRouter);
router.use(inventoryRouter);
router.use('/ai', aiRouter);
router.use('/auth', toNodeHandler(auth));

export default router;
