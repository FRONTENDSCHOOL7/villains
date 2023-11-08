import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, 'env');

  const htmlPlugin = () => {
    return {
      name: 'html-transform',
      transformIndexHtml(html) {
        return html.replace(/%(.*?)%/g, function (match, p1) {
          return env[p1];
        });
      },
    };
  };
  return {
    // Vite 설정
    base: env.NODE_ENV === 'production' ? '/villains/' : '/',
    plugins: [react(), htmlPlugin()], // vendor code spliting 설정
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    resolve: {
      alias: [
        { find: '@view', replacement: './view' },
        { find: '@data', replacement: './data' },
        { find: '@components', replacement: './components' },
      ],
    },
    build: {
      //console 제거
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      watch: {
        // https://rollupjs.org/configuration-options/#watch
      },
      rollupOptions: {
        output: {
          entryFileNames: '[name].js',
          assetFileNames: '[name].[ext]',
        },
      },
    },
  };
});
