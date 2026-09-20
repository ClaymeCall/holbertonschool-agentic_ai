# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Runtime
FROM node:18-alpine
WORKDIR /app

# Crée un utilisateur non-root
RUN adduser -D node

# Copy production dependencies and app files
COPY --from=builder /app/node_modules ./node_modules
COPY --chown=node:node server.js worker.js package*.json ./

# Limite les ports exposés
EXPOSE 3000

# Passe à l'utilisateur non-root
USER node

# Lance le serveur
CMD ["node", "server.js"]