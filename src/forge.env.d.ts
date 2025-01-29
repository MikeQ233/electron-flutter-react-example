/// <reference types="@electron-forge/plugin-vite/forge-vite-env" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
    }
  }
}

export {};
