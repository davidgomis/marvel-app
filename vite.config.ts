import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { configDefaults } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@api": path.resolve(__dirname, "src/api"),
      "@routers": path.resolve(__dirname, "src/routers"),
      "@context": path.resolve(__dirname, "src/context"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@styles/colors.scss" as *; @use "@styles/breakpoints.scss" as *;`,
      },
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
        },
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@api": path.resolve(__dirname, "src/api"),
      "@routers": path.resolve(__dirname, "src/routers"),
      "@context": path.resolve(__dirname, "src/context"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
    },
    exclude: [...configDefaults.exclude, "node_modules"],
  },
});
