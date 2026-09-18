# Utilise l'image officielle Node.js LTS
FROM node:lts-slim

# Crée un utilisateur non-root s'il n'existe pas
RUN if ! id -u node > /dev/null 2>&1; then useradd -m node; fi

# Définit le répertoire de travail
WORKDIR /home/node/app

# Copie les fichiers nécessaires
COPY --chown=node:node package.json ./
COPY --chown=node:node server.js ./

# Installe les dépendances (si package.json existe)
RUN npm install --production

# Expose le port 3000
EXPOSE 3000

# Passe à l'utilisateur non-root
USER node

# Lance le serveur
CMD ["node", "server.js"]