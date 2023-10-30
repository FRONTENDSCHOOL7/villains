import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@lib', replacement: './lib' },
      { find: '@data', replacement: './data' },
      { find: '@components', replacement: './components' },
    ],
  },
  base: process.env.NODE_ENV === 'production' ? '/VILLAINS/' : '/',
});
