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

# Copie des fichiers css et js



# Démarrer l'application
echo "Démarrage de l'application..."
npm run build

echo "Copie des ressources"
mkdir ./build/resources/css
cp ./resources/css/app.css ./build/resources/css/app.css
cp ./resources/css/decks_created.css ./build/resources/css/decks_created.css
cp ./resources/css/decks.css./build/resources/css/decks.css
cp ./resources/css/flashcard-detail.css ./build/resources/css/flashcard-detail.css
cp ./resources/css/flashcards_create.css ./build/resources/css/flashcards_create.css
cp ./resources/css/flashcards.css ./build/resources/css/flashcards.css
cp ./resources/css/home.css ./build/resources/css/home.css
cp ./resources/css/login.css ./build/resources/css/login.css
cp ./resources/css/register.css ./build/resources/css/register.css
mkdir ./build/resources/js
cp ./resources/js/app.js ./build/resources/js/app.js


npm ci --omit='dev'
cd build
node bin/server.js
