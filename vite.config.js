import { defineConfig } from "vite"
import { ViteMinifyPlugin } from "vite-plugin-minify"
export default defineConfig({
  base: "https://lopezitodev.github.io/peliculas-omdb-frontend",
  plugins: [
    ViteMinifyPlugin({})
  ]
})