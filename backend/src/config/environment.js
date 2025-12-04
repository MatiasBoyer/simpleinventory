import 'dotenv/config.js';

const config = {
  PORT: process.env.PORT || 3000,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || null,
  MAX_FILE_SIZE: Number(process.env.MAX_FILE_SIZE) || 1000000,
};

if (!config.GEMINI_API_KEY) {
  throw new Error('Please configure GEMINI_API_KEY in .env');
}

export default config;
