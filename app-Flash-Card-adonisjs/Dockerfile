FROM node:20.11.1-alpine3.19

# Création du répertoire de travail
WORKDIR /app

# Copie des fichiers de configuration
COPY package.json package-lock.json* ./

# Installation des dépendances avec npm directement
RUN npm install

# Copie du script d'entrée avant la construction
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Vérifier que le script existe bien et est exécutable
RUN ls -la /usr/local/bin/docker-entrypoint.sh

# Copie du code source
COPY . .

# Construction de l'application en ignorant les erreurs TypeScript
RUN NODE_ENV=production node ace build --ignore-ts-errors

# Exposition du port
EXPOSE 3333

# Exécuter le script directement avec le chemin complet
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["node", "build/bin/server.js"]