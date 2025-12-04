import errorHandler from '#middlewares/errorhandler.js';
import routesIndex from '#routes/index.js';
import { GetAIClient } from '#config/ai.js';
import { json } from 'express';

/**
 * @param {import('express').Application} app - express app
 */
function setup(app) {
  GetAIClient();
  app.use(json({ limit: '10mb' }));
  app.use(routesIndex);
  app.use(errorHandler);
}

export default setup;
