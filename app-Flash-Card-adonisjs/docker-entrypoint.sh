#!/bin/sh
set -e

echo "Attente du démarrage de MySQL..."
sleep 10

echo "Build AdonisJS (bin/server.js)..."
node ace build --ignore-ts-errors

# Vérification de la présence du fichier server.js avant démarrage
if [ ! -f "bin/server.js" ]; then
  echo "Erreur : Le fichier bin/server.js est introuvable"
  exit 1
fi

echo "Démarrage de l'application..."
node bin/server.js
