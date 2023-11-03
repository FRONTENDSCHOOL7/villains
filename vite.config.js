import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    // Vite 설정
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    plugins: [react()],
    resolve: {
      alias: [
        { find: '@lib', replacement: './lib' },
        { find: '@data', replacement: './data' },
        { find: '@components', replacement: './components' },
      ],
    },
    base: process.env.NODE_ENV === 'production' ? '/VILLAINS/' : '/',
  };
});
