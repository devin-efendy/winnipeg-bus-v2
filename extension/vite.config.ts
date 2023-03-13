import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');

export default defineConfig({
  plugins: [svelte({ hot: !process.env.VITEST })],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@types-transit': resolve(__dirname, './src/types.ts'),
      '@utils': resolve(__dirname, './src/utils'),
      '@components': resolve(__dirname, './src/components'),
      '@context': resolve(__dirname, './src/context')
    }
  },
  test: {
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'istanbul', // or 'c8'
      reporter: ['text', 'json', 'html']
    }
  },
  build: {
    outDir,
    rollupOptions: {
      input: {
        background: resolve(root, 'background', 'index.ts'),
        popup: resolve(__dirname, 'index.html')
      },
      output: {
        entryFileNames: (chunk) => `${chunk.name}/index.js`
      }
    }
  }
});
