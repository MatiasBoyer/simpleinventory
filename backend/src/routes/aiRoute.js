import express from 'express';
// services
import service from '#controllers/aiController.js';

// mw
import authenticationHandler from '#middlewares/authenticationHandler.js';
import aiUsageHandler from '#middlewares/aiUsageHandler.js';

const router = express.Router();

router.use(authenticationHandler);
router.get('/uses', service.getUses);

router.use(aiUsageHandler);
router.post('/imageAnalysis', service.getImageAnalysis);

export default router;
