import { createAuthClient } from 'better-auth/react';
import environment from './environment';

export const authClient = createAuthClient({
  baseURL: environment.API_BASEURL + '/auth',
  fetchOptions: {
    onSuccess: (ctx) => {
      const authToken = ctx.response.headers.get('set-auth-token');

      if (authToken) {
        localStorage.setItem('bearer_token', authToken);
      }
    },
    auth: {
      type: 'Bearer',
      token: () => localStorage.getItem('bearer_token') || '',
    },
  },
});
