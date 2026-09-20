# QA Report - Audit de Code
**Date** : 20/09/2026
**Projet** : MegaShop Backend

---

## 1. Gestion des Erreurs (Critique)
### Problème :
- Absence de gestion d'erreurs explicite dans les fonctions asynchrones (ex: `server.js`, `tasks.js`).
  - Aucune vérification pour `tasks.json` manquant ou corrompu.
  - Logs exposant des données sensibles (ex: `userId`, `email`).

### Étapes pour reproduire :
1. Supprimer `tasks.json` et redémarrer le serveur.
2. Observer le crash sans message d'erreur clair.

### Correction proposée :
- Ajouter `try/catch` dans toutes les fonctions asynchrones.
- Utiliser un middleware de logging (ex: `winston`) pour masquer les données sensibles.

---

## 2. Sécurité des Dépendances (Haut)
### Problème :
- Vulnérabilités critiques détectées par `npm audit` (ex: `lodash@4.17.20`).
- `package-lock.json` non synchronisé avec `package.json`.

### Étapes pour reproduire :
1. Exécuter `npm audit`.
2. Comparer les versions dans `package.json` et `package-lock.json`.

### Correction proposée :
- Mettre à jour les dépendances vulnérables.
- Exécuter `npm install --package-lock-only` pour synchroniser.

---

## 3. Dockerfile (Critique)
### Problème :
- Exécution en root (`USER root`).
- Image > 200 Mo (non optimisée).
- Ports exposés inutilement (ex: `3000`, `6379`).

### Étapes pour reproduire :
1. Builder l'image : `docker build -t megashop .`.
2. Vérifier la taille : `docker images | grep megashop`.
3. Scanner les ports : `docker inspect <container_id>`.

### Correction proposée :
- Ajouter `USER node` et créer un utilisateur non-root.
- Utiliser un **multi-stage build** pour réduire la taille.
- Limiter les ports exposés dans `Dockerfile` et `docker-compose.yml`.

---

## 4. Bonnes Pratiques (Moyen)
### Problème :
- Variables d'environnement non validées (ex: `REDIS_URL`).
- Utilisation de `innerHTML` non sanitizé dans `public/index.html`.

### Étapes pour reproduire :
1. Démarrer le serveur sans `.env`.
2. Inspecter `public/index.html` pour les injections XSS potentielles.

### Correction proposée :
- Valider les variables avec `zod` ou `joi`.
- Remplacer `innerHTML` par `textContent` ou utiliser DOMPurify.

---

## 5. Tests Obligatoires (Haut)
### Problème :
- Aucun test de résilience (ex: suppression de `tasks.json`).
- Linting et typechecking désactivés (scripts manquants dans `package.json`).

### Étapes pour reproduire :
1. Supprimer `tasks.json` et redémarrer le serveur.
2. Exécuter `npm run lint` (script inexistant).

### Correction proposée :
- Ajouter des tests pour les cas d'erreur (ex: `jest`).
- Configurer `eslint` et `typescript` dans `package.json`.

---

## 6. Redis (Critique)
### Problème :
- Redis désactivé dans `server.js` (code commenté).
- Aucun fallback en cas d'échec de connexion.

### Étapes pour reproduire :
1. Démarrer le serveur sans Redis.
2. Observer l'absence de traitement asynchrone.

### Correction proposée :
- Décommenter et finaliser l'intégration de Redis.
- Ajouter un fallback (ex: file d'attente locale).

---

## Recommandations Finales
1. Prioriser les corrections critiques (Docker, Redis, gestion des erreurs).
2. Automatiser les tests (GitHub Actions pour `npm audit`, `docker scan`).
3. Documenter les changements dans `README.md`.

---
**Prochaine étape** : Appliquer les corrections et relancer un audit.