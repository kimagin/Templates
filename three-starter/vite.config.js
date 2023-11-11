import { defineConfig } from 'vite'
import glsl from 'vite-plugin-glsl'
import vitePluginString from 'vite-plugin-string'
// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vitePluginString()],
})
