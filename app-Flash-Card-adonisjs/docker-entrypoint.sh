#!/bin/sh
set -e

echo "Attente du démarrage de MySQL..."
sleep 10

echo "Build AdonisJS (bin/server.js)..."
node ace build --ignore-ts-errors

# Vérifier si le fichier bin/server.js existe après le build
echo "Vérification de la présence de bin/server.js..."
ls -l build/bin

echo "Démarrage de l'application..."
node bin/server.js
