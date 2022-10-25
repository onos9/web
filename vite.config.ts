import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	server: {
		host: 'localhost',
		// port: 5173,
		// strictPort: false,
	},
	optimizeDeps: {
		include: ['lodash.get', 'lodash.isequal', 'lodash.clonedeep']
	},
	ssr: {
		noExternal: ['@popperjs/core']
	},
};

export default config;
