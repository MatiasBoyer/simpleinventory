import environment from '#config/environment.js';

const corsConfig = {
  origin: environment.CORS,
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

export default corsConfig;
