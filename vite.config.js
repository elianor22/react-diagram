/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
  },
  resolve: {
    alias: [
      {
        find: "@core",
        replacement: resolve(__dirname, "src/core"),
      },
    ],
  },
});
