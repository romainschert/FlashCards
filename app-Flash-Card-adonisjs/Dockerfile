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
COPY --from=builder build ./build
COPY --from=builder public ./public
COPY --from=builder resources ./resources
COPY --from=builder start ./start
COPY --from=builder config ./config
COPY --from=builder app ./app
COPY --from=builder contracts ./contracts
COPY --from=builder .adonisrc.ts ./
COPY --from=builder tsconfig.json ./
COPY --from=builder /.env ./

# Lancer l'application
CMD ["node", "build/server.js"]
