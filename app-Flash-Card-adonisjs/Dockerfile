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
COPY --from=builder /app/build ./build
COPY --from=builder /app/public ./public
COPY --from=builder /app/resources ./resources
COPY --from=builder /app/start ./start
COPY --from=builder /app/config ./config
COPY --from=builder /app/app ./app
COPY --from=builder /app/contracts ./contracts
COPY --from=builder /app/.adonisrc.ts ./
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/.env ./

# Lancer l'application
CMD ["node", "build/server.js"]
