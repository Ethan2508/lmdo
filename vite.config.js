import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // Cible compatible avec le Chromium embarqué dans react-snap (v77)
    // Permet de transpiler l'optional chaining (?.) et nullish coalescing (??)
    target: "es2019"
  }
});
