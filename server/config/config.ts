import env from 'dotenv';

env.config();

const mongourl = process.env.MONGO_URL || '';
const mongourlOnline = process.env.ONLINE_MONGO_URL || '';
const acces_token = process.env.ACCESS || '';
const config = {
  MONGO_URL: mongourlOnline,
  ACCESS: acces_token,
} as const;

export default config;
