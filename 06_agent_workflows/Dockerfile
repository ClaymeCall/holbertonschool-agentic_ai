# Dockerfile
# Image optimisée pour la sécurité, le poids et le temps de build

# Étape 1: Build (utilisation d'une image Node.js Alpine pour minimiser la taille)
FROM node:20-alpine AS builder
WORKDIR /app

# Copie des fichiers nécessaires pour le build
COPY package.json .
COPY package-lock.json .

# Installation des dépendances (sans cache)
RUN npm ci --only=production

# Étape 2: Runtime (image finale minimale)
FROM node:20-alpine
WORKDIR /app

# Création d'un utilisateur non-root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Copie des artefacts depuis l'étape de build
COPY --from=builder --chown=appuser:appgroup /app/node_modules ./node_modules
COPY --chown=appuser:appgroup monitor.js .

# Commande par défaut
CMD ["node", "monitor.js"]