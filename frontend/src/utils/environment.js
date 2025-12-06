const config = {
  API_BASEURL: import.meta.env.VITE_API_BASEURL ?? 'http://localhost:3000',
  ALLOWED_HOSTS: (import.meta.env.VITE_ALLOWED_HOSTS ?? []).split('|'),
};

export default config;
