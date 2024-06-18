import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // will need to remove this if then we set up GH pages with a custom domain
  base: "/climate-lies-viz/",
});
