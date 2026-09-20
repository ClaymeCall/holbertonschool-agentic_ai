# Stage 1: Build
FROM node:lts-alpine AS builder
WORKDIR /home/node/app
COPY package.json ./
# Use minimal node_modules with only required dependencies
COPY minimal_node_modules/node_modules ./node_modules

# Stage 2: Runtime
FROM node:lts-alpine

# Crée un utilisateur non-root
RUN if ! id -u node > /dev/null 2>&1; then adduser -D node; fi
WORKDIR /home/node/app

# Copy all required files in a single layer
COPY --chown=node:node minimal_node_modules/node_modules ./node_modules
COPY --chown=node:node server.js package.json ./

# Limite les ports exposés
EXPOSE 3000

# Passe à l'utilisateur non-root
USER node

# Lance le serveur
CMD ["node", "server.js"]