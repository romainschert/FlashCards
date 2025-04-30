
echo "Arrêt des conteneurs..."
docker compose down -v


echo "Construction de l'image docker..."
docker compose build --no-cache


echo "Démarrage des conteneurs..."
docker compose up -d

echo "Terminé !"