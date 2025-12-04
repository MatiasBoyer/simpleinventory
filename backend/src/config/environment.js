import 'dotenv/config.js';

const config = {
  PORT: process.env.PORT || 3000,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || null,
};

export default config;
