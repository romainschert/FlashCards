#!/bin/sh
set -e

echo "Attente du démarrage de MySQL..."
sleep 10

echo "Build AdonisJS (bin/server.js)..."
node ace build --ignore-ts-errors

echo "Démarrage de l'application..."
node bin/server.js
