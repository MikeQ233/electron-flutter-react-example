declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /**
       * Development: port for flutter web
       */
      FLUTTER_PORT: string;
    }
  }
}

export {};
