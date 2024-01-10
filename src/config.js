// config.js
import dotenv from 'dotenv';

dotenv.config();

const config = {
  GEOAPIFY_API_KEY: process.env.GEOAPIFY_API_KEY,
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 8000,
};

export default config;
