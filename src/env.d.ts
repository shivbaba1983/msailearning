/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SPEECH_TOKEN_KEY: string;
  readonly VITE_SPEECH_REGION_KEY: string;
  // add more env vars here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
