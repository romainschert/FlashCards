#!/bin/sh
set -e

echo "Attente du démarrage de MySQL..."
sleep 10

# Exécuter les migrations
echo "Exécution des migrations..."
node ace migration:run --force

# Exécuter les seeds
echo "Exécution des seeds..."
node ace db:seed

# Build de l'application
echo "Build de l'application..."
npm run build

echo "Copie des ressources..."

# Créer les dossiers de destination (avec -p pour créer les parents)
mkdir -p build/resources/css
mkdir -p build/resources/js

# Copier les fichiers CSS (syntaxe shell/bash)
echo "Copie des fichiers CSS..."

[ -f "./resources/css/app.css" ] && cp "./resources/css/app.css" "./build/resources/css/app.css"
[ -f "./resources/css/decks_created.css" ] && cp "./resources/css/decks_created.css" "./build/resources/css/decks_created.css"
[ -f "./resources/css/flashcard-detail.css" ] && cp "./resources/css/flashcard-detail.css" "./build/resources/css/flashcard-detail.css"
[ -f "./resources/css/flashcards_create.css" ] && cp "./resources/css/flashcards_create.css" "./build/resources/css/flashcards_create.css"
[ -f "./resources/css/flashcards.css" ] && cp "./resources/css/flashcards.css" "./build/resources/css/flashcards.css"
[ -f "./resources/css/home.css" ] && cp "./resources/css/home.css" "./build/resources/css/home.css"
[ -f "./resources/css/login.css" ] && cp "./resources/css/login.css" "./build/resources/css/login.css"
[ -f "./resources/css/register.css" ] && cp "./resources/css/register.css" "./build/resources/css/register.css"
[ -f "./resources/css/decks.css" ] && cp "./resources/css/decks.css" "./build/resources/css/decks.css"

echo "Copie des fichiers JS..."
[ -f "./resources/js/app.js" ] && cp "./resources/js/app.js" "./build/resources/js/app.js"

echo "Installation des dépendances de production..."
npm ci --omit=dev

echo "Démarrage de l'application..."
cd build
exec node bin/server.js