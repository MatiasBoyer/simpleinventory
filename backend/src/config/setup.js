import errorHandler from '#middlewares/errorhandler.js';
import routesIndex from '#routes/index.js';
import { GetAIClient } from '#config/ai.js';
import { json } from 'express';
import cors from 'cors';
import environment from '#config/environment.js';

/**
 * @param {import('express').Application} app - express app
 */
function setup(app) {
  GetAIClient();
  app.use(
    cors({
      origin: environment.CORS,
      credentials: true,
      methods: ['GET', 'POST', 'PATCH', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );
  app.use(json({ limit: '10mb' }));
  app.use(routesIndex);
  app.use(errorHandler);
}

export default setup;
