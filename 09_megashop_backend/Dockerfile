FROM node:20.12.0-alpine
WORKDIR /app

# Copie les fichiers nécessaires
COPY package*.json ./
COPY api.js ./
COPY worker.js ./

# Installe les dépendances
RUN npm ci --only=production --legacy-peer-deps

# Change ownership to node user
RUN chown -R node:node /app

# Switch to non-root user
USER node

# Limite les ports exposés
EXPOSE 3000

# Lance le serveur
CMD ["node", "api.js"]