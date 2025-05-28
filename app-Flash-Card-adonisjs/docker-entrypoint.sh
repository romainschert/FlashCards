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

echo "Copie des ressources"
# Créer les dossiers de destination
md build\resources\css
md build\resources\js

# Copier les fichiers CSS un par un (avec vérification d'existence)
echo Copie des fichiers CSS...

echo Copier les fichiers CSS
if exist ".\resources\css\app.css" copy ".\resources\css\app.css" ".\build\resources\css\app.css"
if exist ".\resources\css\decks_created.css" copy ".\resources\css\decks_created.css" ".\build\resources\css\decks_created.css"
if exist ".\resources\css\flashcard-detail.css" copy ".\resources\css\flashcard-detail.css" ".\build\resources\css\flashcard-detail.css"
if exist ".\resources\css\flashcards_create.css" copy ".\resources\css\flashcards_create.css" ".\build\resources\css\flashcards_create.css"
if exist ".\resources\css\flashcards.css" copy ".\resources\css\flashcards.css" ".\build\resources\css\flashcards.css"
if exist ".\resources\css\home.css" copy ".\resources\css\home.css" ".\build\resources\css\home.css"
if exist ".\resources\css\login.css" copy ".\resources\css\login.css" ".\build\resources\css\login.css"
if exist ".\resources\css\register.css" copy ".\resources\css\register.css" ".\build\resources\css\register.css"
if exist ".\resources\css\decks.css" copy ".\resources\css\decks.css" ".\build\resources\css\decks.css"

echo  Copier les fichiers JS
if exist ".\resources\js\app.js" copy ".\resources\js\app.js" ".\build\resources\js\app.js"

echo "Installation des dépendances de production..."
npm ci --omit=dev

echo "Démarrage de l'application..."
cd build
node bin/server.js
