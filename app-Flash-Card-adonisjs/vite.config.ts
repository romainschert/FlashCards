import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  // Assurez-vous que vous utilisez le bon mode de build pour AdonisJS
  build: {
    manifest: true, // Générez le manifeste pour une gestion facile des assets
    rollupOptions: {
      input: [
        path.resolve(__dirname, 'resources/js/app.js'),
        ...getCssFiles(), // Cette fonction récupère tous les fichiers CSS
      ],
    },
  },
})

// Fonction pour récupérer tous les fichiers CSS dans le dossier `resources/css`
function getCssFiles() {
  const fs = require('fs')
  const path = require('path')

  const cssDir = path.resolve(__dirname, 'resources/css')
  const files = fs.readdirSync(cssDir)

  return files.filter((file) => file.endsWith('.css')).map((file) => path.resolve(cssDir, file))
}
