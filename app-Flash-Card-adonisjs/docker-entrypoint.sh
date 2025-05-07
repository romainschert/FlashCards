#!/bin/sh
set -e

# Attendre que MySQL soit prêt
echo "Attente du démarrage de MySQL..."
sleep 10



# Exécuter les migrations
#echo "Exécution des migrations..."
#node ace migration:run --force

# Exécuter les seeds
#echo "Exécution des seeds..."
#node ace db:seed

# Démarrer l'application
echo "Démarrage de l'application..."
npm run dev