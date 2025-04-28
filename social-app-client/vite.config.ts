import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
		react(),
		tailwindcss(),
	],
	define: {
    'global': 'window',
  },
	optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'window',
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
      ],
    },
  },
})
