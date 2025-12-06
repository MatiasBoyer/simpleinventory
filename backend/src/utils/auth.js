import environment from '#config/environment.js';
import { betterAuth } from 'better-auth';
import { bearer } from 'better-auth/plugins';
import { Pool } from 'pg';
import corsConfig from '#config/cors.js';

export const auth = betterAuth({
  database: new Pool({
    user: environment.DATABASE.USER,
    password: environment.DATABASE.PASS,
    host: environment.DATABASE.HOST,
    port: environment.DATABASE.PORT,
    database: environment.DATABASE.DBNAME,
    options: '-c search_path=auth',
  }),
  emailAndPassword: {
    enabled: true,
  },
  //trustedOrigins: environment.CORS,
  basePath: '/auth',
  plugins: [bearer()],
  user: {
    additionalFields: {
      language: {
        type: 'string',
        required: false,
        defaultValue: 'english',
      },
      ai_uses: {
        type: 'number',
        required: false,
        defaultValue: 3,
        input: false,
      },
    },
  },
});
