import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { PluginOption } from 'vite';
import { exec } from 'child_process';
import * as util from 'util';

// https://vitejs.dev/config
export default defineConfig({
  plugins: [tailwindcss(), react(), myPluginFlutterBuild()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@view': path.resolve(__dirname, 'src/view'),
      '@flutter': path.resolve(__dirname, 'src/flutter'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        index: path.resolve('index.html'),
      },
    },
    target: 'esnext',
  },
});

function myPluginFlutterBuild(): PluginOption {
  return {
    name: 'my:flutter-build',
    apply: 'build',
    enforce: 'post',

    // need to override in closeBundle to copy flutter web build to build folder
    async closeBundle() {
      const flutterRoot = path.join(
        this.environment.config.root,
        'src/flutter',
      );
      const targetBuildPath = path.resolve(
        __dirname,
        path.join(
          this.environment.config.base,
          this.environment.config.build.outDir,
          'flutter',
        ),
      );

      // build flutter web and copy to build folder
      const cpCommand =
        process.platform === 'win32'
          ? `xcopy ${path.normalize('build/web')} ${path.normalize(targetBuildPath)} /s /i /y`
          : `cp -r build/web/* ${targetBuildPath}`;

      // run build command
      await util.promisify(exec)(
        `cd ${flutterRoot} && flutter build web --wasm && ${cpCommand}`,
      );
    },
  };
}
