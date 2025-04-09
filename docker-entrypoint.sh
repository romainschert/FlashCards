#!/bin/sh
set -e

echo "Waiting for MySQL to start..."
# Attendre que MySQL soit prêt à accepter des connexions
while ! nc -z db 3306; do
  sleep 1
  echo "Still waiting for MySQL..."
done
echo "MySQL started"

# Exécuter les migrations
echo "Running migrations..."
node ace migration:run --force

# Exécuter les seeds
echo "Running seeds..."
node ace db:seed

# Démarrer l'application
echo "Starting application..."
node ace serve --watch