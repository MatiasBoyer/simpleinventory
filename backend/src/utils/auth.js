import environment from '#config/environment.js';
import { betterAuth } from 'better-auth';
import { Pool } from 'pg';

export const auth = betterAuth({
  database: new Pool({
    user: environment.DATABASE.USER,
    password: environment.DATABASE.PASS,
    host: environment.DATABASE.HOST,
    port: environment.DATABASE.PORT,
    database: 'auth',
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: environment.CORS,
  basePath: '/auth',
});
