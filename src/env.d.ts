/// <reference types="astro/client" />

// Starlight 的组件覆盖会用到这些虚拟模块，但 Starlight 未随包提供类型声明。
// 这里做最小声明，保证 `astro check` 通过。
declare module 'virtual:starlight/components/*' {
  import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
  const Component: AstroComponentFactory;
  export default Component;
}

declare module 'virtual:starlight/user-config' {
  const config: {
    credits?: boolean;
  };
  export default config;
}
