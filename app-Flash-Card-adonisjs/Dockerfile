
# Étape 1 : Utilisation de l'image Node.js
FROM node:20.11.1-alpine3.19 AS builder

# Créer le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json pour installer les dépendances
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier tout le reste du code dans le conteneur
COPY . .

# Compiler le code TypeScript
RUN npx tsc

# Étape 2 : Créer une image finale pour la production
FROM node:20.11.1-alpine3.19

# Install dependencies
RUN npm install


# Copier uniquement les fichiers compilés de l'étape précédente
COPY --from=builder /app /app

# Exposer le port 3333
EXPOSE 3333

# Entrée du conteneur (point d'entrée)
CMD ["node", "build/bin/server.js"]
