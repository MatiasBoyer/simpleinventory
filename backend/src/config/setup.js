import errorHandler from '#middlewares/errorhandler.js';
import routesIndex from '#routes/index.js';

/**
 * @param {import('express').Application} app - express app
 */
function setup(app) {
  app.use(routesIndex);
  app.use(errorHandler);
}

export default setup;
