import errorHandler from '#middlewares/errorhandler.js';
import routesIndex from '#routes/index.js';
import { GetAIClient } from '#config/ai.js';
import { json } from 'express';
import cors from 'cors';
import corsConfig from '#config/cors.js';

/**
 * @param {import('express').Application} app - express app
 */
function setup(app) {
  GetAIClient();
  app.use(cors(corsConfig));
  app.use(json({ limit: '10mb' }));
  app.use(routesIndex);
  app.use(errorHandler);
}

export default setup;
