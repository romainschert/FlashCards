
FROM node:20.11.1-alpine3.19

# Créer le répertoire de travail
WORKDIR /app

# Copier package.json et lock
COPY package.json package-lock.json* ./

# Installer les dépendances y compris les dev
ENV NODE_ENV=development
RUN npm install

# Copier le reste des fichiers
COPY . .

# Build AdonisJS
RUN node ace build --ignore-ts-errors

# Passer en production
ENV NODE_ENV=production

# Script d’entrée
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 3333

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
# Entrée du conteneur (point d'entrée)
CMD ["node", "build/bin/server.js"]
