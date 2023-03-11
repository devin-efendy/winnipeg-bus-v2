import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import * as path from 'path';

export default defineConfig({
	plugins: [svelte({ hot: !process.env.VITEST })],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@types-transit': path.resolve(__dirname, './src/types.ts'),
			'@utils': path.resolve(__dirname, './src/utils'),
			'@components': path.resolve(__dirname, './src/components'),
			'@context': path.resolve(__dirname, './src/context')
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
	}
});
