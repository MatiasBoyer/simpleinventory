import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'url';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // eslint-disable-next-line no-undef
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const allowedHosts = // eslint-disable-next-line no-undef
    (process.env.VITE_ALLOWED_HOSTS ?? ['https://localhost:5173']).split('|');

  return {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        // Folder-specific aliases for convenience
        '@components': fileURLToPath(
          new URL('./src/components', import.meta.url)
        ),
        '@atoms': fileURLToPath(
          new URL('./src/components/atoms', import.meta.url)
        ),
        '@molecules': fileURLToPath(
          new URL('./src/components/molecules', import.meta.url)
        ),
        '@organisms': fileURLToPath(
          new URL('./src/components/organisms', import.meta.url)
        ),
        '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
        '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
        '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      },
    },
    plugins: [
      tailwindcss(),
      react({
        babel: {
          plugins: [['babel-plugin-react-compiler']],
        },
      }),
    ],
    server: {
      allowedHosts,
    },
  };
});
