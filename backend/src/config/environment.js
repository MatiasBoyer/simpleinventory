import 'dotenv/config.js';

const config = {
  PORT: process.env.PORT || 3000,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || null,
  MAX_FILE_SIZE: Number(process.env.MAX_FILE_SIZE) || 1000000,
  DATABASE: {
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT || 5432,
    USER: process.env.DB_USER,
    PASS: process.env.DB_PASS,
    DBNAME: process.env.DB_NAME,
  },
  CORS: process.env.CORS.split('|') ?? ['http://localhost:5173'],
  API_PATH: process.env.API_PATH ?? '/simpleinventory',
};

if (!config.GEMINI_API_KEY) {
  throw new Error('Please configure GEMINI_API_KEY in .env');
}

if (
  !config.DATABASE.HOST ||
  !config.DATABASE.PORT ||
  !config.DATABASE.USER ||
  !config.DATABASE.PASS ||
  !config.DATABASE.DBNAME
) {
  throw new Error('Missing database info in .env');
}

export default config;
