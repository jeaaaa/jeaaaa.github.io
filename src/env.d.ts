/// <reference types="astro/client" />
/// <reference types="react" />
/// <reference types="react-dom" />

interface ImportMeta {
  readonly env: {
    readonly PROD: boolean;
    readonly DEV: boolean;
    // Add other environment variables as needed
    readonly MODE: string;
    readonly BASE_URL: string;
    readonly SITE: string;
    readonly ASSETS_PREFIX: string;
    [key: string]: string | boolean | undefined;
  };
}

// 确保JSX命名空间可用
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
