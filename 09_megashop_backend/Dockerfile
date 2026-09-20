# Stage 1: Build
FROM node:lts-slim AS builder
WORKDIR /home/node/app
COPY package.json ./
RUN npm install --production

# Stage 2: Runtime
FROM node:lts-slim

# Crée un utilisateur non-root
RUN if ! id -u node > /dev/null 2>&1; then useradd -m node; fi
WORKDIR /home/node/app

# Copie les fichiers depuis le stage builder
COPY --chown=node:node --from=builder /home/node/app/node_modules ./node_modules
COPY --chown=node:node server.js ./
COPY --chown=node:node package.json ./

# Limite les ports exposés
EXPOSE 3000

# Passe à l'utilisateur non-root
USER node

# Lance le serveur
CMD ["node", "server.js"]