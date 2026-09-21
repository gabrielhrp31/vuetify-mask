import { defineConfig } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";
import path from "path";

export default defineConfig(({ mode }) => {
  const base =
    process.env.VITE_BASE ||
    (mode === "pages" ? "/vuetify-mask/" : "/");

  return {
    base,
    plugins: [createVuePlugin()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        vue: "vue/dist/vue.esm.js"
      }
    },
    server: {
      port: 8081
    },
    build: {
      outDir: "dist",
      emptyOutDir: true
    }
  };
});
