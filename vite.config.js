import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // When you add API routes to server.js later, requests to /api/... are forwarded to Express.
    proxy: { "/api": "http://localhost:3000" }
  }
});
