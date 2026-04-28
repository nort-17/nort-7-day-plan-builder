import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/nort-7-day-plan-builder/",
  plugins: [react()],
});
