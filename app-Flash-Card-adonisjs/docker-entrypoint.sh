#!/bin/sh
set -e

# Attente du démarrage de MySQL
echo "Attente du démarrage de MySQL..."
sleep 10

# Vérifiez si le fichier bin/server.js existe après compilation
if [ ! -f "/app/bin/server.js" ]; then
  echo "Erreur : le fichier bin/server.js est introuvable."
  exit 1
fi

# Démarrer l'application
echo "Démarrage de l'application..."
node bin/server.js
