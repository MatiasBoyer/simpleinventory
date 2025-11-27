import express from 'express';
import setup from '#config/setup.js';
import config from '#config/environment.js';

const app = express();

setup(app);

app.listen(config.PORT, (err) => {
  console.info(`Server running on port ${config.PORT}`);
});
