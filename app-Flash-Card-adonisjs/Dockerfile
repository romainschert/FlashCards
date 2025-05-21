# Étape 1 : Builder
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# Étape 2 : Runtime
FROM node:20-alpine

WORKDIR /app

# Installer uniquement les dépendances nécessaires à l'exécution
COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev

# Copier les fichiers nécessaires
COPY --from=builder /appbuild ./build
COPY --from=builder /apppublic ./public
COPY --from=builder /app/resources ./resources

# Lancer l'application
CMD ["node", "build/server.js"]
