FROM node:20.11.1-alpine3.19

# Créer le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json
COPY package.json package-lock.json* ./ 

# Installer les dépendances de production et de développement
RUN npm install --production
RUN npm install --only=dev  # Installer les dépendances de dev, y compris ts-node-maintained

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
CMD ["node", "bin/server.js"]
