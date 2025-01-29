import { defineConfig } from 'vite';

// https://vitejs.dev/config
// https://github.com/electron/forge/issues/682#issuecomment-2507653029
export default defineConfig({
  resolve: {
    // For Node.js native modules
    conditions: ['node'], // this is the change
    mainFields: ['module', 'jsnext:main', 'jsnext'],
  },
  plugins: [
    {
      name: 'restart',
      closeBundle() {
        process.stdin.emit('data', 'rs');
      },
    },
  ],
});
