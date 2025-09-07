// global.d.ts 또는 env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    API_BASE_URL: string;
    NODE_ENV_MODE: string;
  }
}
