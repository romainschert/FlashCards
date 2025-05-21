import { defineConfig } from 'vite'
import adonisjs from '@adonisjs/vite/client'

export default defineConfig({
  plugins: [
    adonisjs({
      entrypoints: [
        'resources/css/app.css',
        'resources/css/decks_created.css',
        'resources/css/decks.css',
        'resources/css/flashcard-detail.css',
        'resources/css/flashcards.css',
        'resources/css/flashcards_create.css',
        'resources/css/home.css',
        'resources/css/login.css',
        'resources/css/register.css',
        'resources/js/app.js',
      ],
      reload: ['resources/views/**/*.edge'],
    }),
  ],
})
