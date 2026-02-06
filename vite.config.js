import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  root: "demo",
  base: "/demo/",
  publicDir: "../docs/assets",
  server: {
    open: true,
  },
  build: {
    outDir: "../docs/demo",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "demo/index.html"),
      },
    },
  },
});
