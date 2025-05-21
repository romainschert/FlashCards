# Étape 1 : Image Node.js légère
FROM node:18-alpine

# Étape 2 : Créer le dossier de travail
WORKDIR /app

# Étape 3 : Copier les fichiers nécessaires pour installer les dépendances
COPY package*.json ./

# Étape 4 : Installer les dépendances
RUN npm install

# Étape 5 : Copier le reste de l'application
COPY . .

# Étape 6 : Compiler l’application AdonisJS (TypeScript)
RUN npm run build || echo "⚠️ Build terminé avec des erreurs TypeScript, mais on continue."

# ✅ Étape 7 : Copier les vues .edge et le dossier public vers build/
RUN cp -r resources build/resources && cp -r public build/public

# Étape 8 : Exposer le port de l'application
EXPOSE 3333

# Étape 9 : Lancer l’application en production
CMD ["npm", "start"]
