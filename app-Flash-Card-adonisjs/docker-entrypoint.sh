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
echo "Copie des ressources"
mkdir ./build/resources/css
cp ./resources/css/app.css ./build/resources/css/app.css
mkdir ./build/resources/js
cp ./resources/js/app.js ./build/resources/js/app.js


# Démarrer l'application
echo "Démarrage de l'application..."
npm run build
npm ci --omit='dev'
mkdir ./build/resources/css
cp ./resources/css/app.css ./build/resources/css/app.css
cd build
node bin/server.js
