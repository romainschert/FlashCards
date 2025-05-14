import { defineConfig } from 'vite'
import adonisjs from '@adonisjs/vite/client'
import glob from 'fast-glob'

const cssFiles = glob.sync('resources/css/*.css')
const jsFiles = glob.sync('resources/js/*.js')

export default defineConfig({
  plugins: [
    adonisjs({
      entrypoints: [...cssFiles, ...jsFiles],
      reload: ['resources/views/**/*.edge'],
    }),
  ],
})
