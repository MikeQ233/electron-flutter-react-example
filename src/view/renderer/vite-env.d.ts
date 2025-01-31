/// <reference types="vite/client" />
/// <reference types="../../bridge.d.ts" />

interface ImportMetaEnv {
  readonly VITE_TITLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
