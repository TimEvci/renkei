import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  vite: {
    build: {
      target: "esnext",
      polyfillDynamicImport: false,
    },
  },
});
