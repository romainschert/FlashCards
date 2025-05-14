import { defineConfig } from 'vite'
import adonisjs from '@adonisjs/vite/client'
import path from 'path'
import fs from 'fs'

// Fonction pour récupérer tous les fichiers CSS dans le dossier 'resources/css'
function getCssFiles() {
  const cssDir = path.resolve(__dirname, 'resources/css')
  const files = fs.readdirSync(cssDir)

  return files
    .filter((file) => file.endsWith('.css')) // Filtrer pour ne garder que les fichiers .css
    .map((file) => path.resolve(cssDir, file)) // Créer un tableau avec les chemins complets des fichiers CSS
}

export default defineConfig({
  plugins: [
    adonisjs({
      /**
       * Entrypoints de l'application. Chaque entrée crée un bundle distinct.
       * Inclure tous les fichiers CSS dans 'resources/css'
       */
      entrypoints: [
        ...getCssFiles(), // Récupérer tous les fichiers CSS
        'resources/js/app.js', // Ajouter le fichier JavaScript principal
      ],

      /**
       * Dossiers à surveiller et recharger le navigateur lors de changements de fichiers
       */
      reload: ['resources/views/**/*.edge'],
    }),
  ],
})
