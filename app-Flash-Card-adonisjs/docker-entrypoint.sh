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

# Démarrer l'application
echo "Démarrage de l'application..."
npm run build
npm ci --omit='dev'
mkdir ./build/resources/css
cp ./resources/css/app.css ./build/resources/css/app.css
cd build
node bin/server.js
