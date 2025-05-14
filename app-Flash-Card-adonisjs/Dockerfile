
# Install dependencies
RUN npm install


# Compile TypeScript code
RUN npx tsc

# Copier le reste des fichiers
COPY . .

# Assurez-vous que les fichiers JavaScript générés sont là
RUN ls -la /app/bin

# Expose the port
EXPOSE 3333

# Script d'entrée
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Démarrer l'application
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
