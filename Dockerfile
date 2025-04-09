FROM node:22-alpine

WORKDIR /app

# Installer netcat pour vérifier la disponibilité de la BD
RUN apk add --no-cache netcat-openbsd

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code source
COPY . .

# Construire l'application pour la production si nécessaire
# RUN npm run build

# Exposer le port sur lequel AdonisJS fonctionne
EXPOSE 3333

# Script de démarrage
CMD ["sh", "./docker-entrypoint.sh"]