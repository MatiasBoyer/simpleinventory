import { createAuthClient } from 'better-auth/react';
import environment from './environment';

export const authClient = createAuthClient({
  baseURL: environment.API_BASEURL + '/auth',
});
