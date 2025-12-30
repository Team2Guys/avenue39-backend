import { env } from '#config/index.js';

const { FRONTEND_URL, DASHBOARD_URL } = env;

export const corsOptions = {
  origin: [FRONTEND_URL, DASHBOARD_URL, 'http://localhost:3000'],
  credentials: true
};
