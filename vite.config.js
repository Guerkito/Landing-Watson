import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const BUILD_ID = "20260827-r2";

function cacheBust() {
  return {
    name: "cache-bust",
    transformIndexHtml(html) {
      return html
        .replace("./assets/watson.js", `./assets/watson.js?v=${BUILD_ID}`)
        .replace("./assets/watson.css", `./assets/watson.css?v=${BUILD_ID}`);
    },
  };
}

export default defineConfig({
  base: "./",
  define: {
    __BUILD_ID__: JSON.stringify(BUILD_ID),
  },
  plugins: [react(), cacheBust()],
  server: {
    port: 5173,
    host: true,
    open: false,
  },
  build: {
    target: "es2022",
    sourcemap: false,
    rollupOptions: {
      output: {
        entryFileNames: "assets/watson.js",
        chunkFileNames: "assets/watson-[name].js",
        assetFileNames: "assets/watson.[ext]",
      },
    },
  },
});