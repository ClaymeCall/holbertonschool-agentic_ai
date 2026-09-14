# QA Instructions - Security & Code Quality Review

## Objectifs
Ce document définit les exigences strictes pour une revue de code orientée sécurité et qualité. Toute anomalie doit être corrigée avant toute merge ou déploiement.

---

## 1. Analyse du code JavaScript/TypeScript
### 1.1 Gestion des erreurs et robustesse
- [ ] Vérifier que **toutes** les fonctions asynchrones (promesses, `async/await`) ont une gestion d'erreur explicite avec `try/catch` ou `.catch()`.
- [ ] Confirmer que le code ne plante pas si des fichiers critiques (ex: `tasks.json`, `.env`, `package.json`) sont manquants, corrompus ou supprimés. Simuler leur absence.
- [ ] Tester les cas limites : entrées utilisateur vides, valeurs `null`/`undefined`, types inattendus.
- [ ] Vérifier que les logs ne contiennent **jamais** de données sensibles (mots de passe, tokens, clés API).

### 1.2 Sécurité des dépendances
- [ ] Exécuter `npm audit` (ou équivalent) et corriger **toutes** les vulnérabilités critiques/hautes. Aucune exception.
- [ ] Vérifier que les dépendances sont à jour (utiliser `npm outdated`). Justifier toute dépendance obsolète.
- [ ] Confirmer que `package-lock.json` ou `yarn.lock` est synchronisé avec `package.json`.

### 1.3 Bonnes pratiques
- [ ] Vérifier l'absence de `eval()`, `Function()`, ou `innerHTML` non sanitizé.
- [ ] S'assurer que les secrets (clés API, mots de passe) sont **uniquement** chargés via des variables d'environnement (`.env`).
- [ ] Vérifier que les variables d'environnement sont validées au démarrage (ex: `if (!process.env.API_KEY) throw new Error(...)`).
- [ ] Confirmer que le code n'utilise **pas** de modules dépréciés ou non maintenus.

---

## 2. Analyse du Dockerfile
### 2.1 Sécurité de l'image
- [ ] Vérifier que l'image **n'est pas** exécutée en tant que `root`. Utiliser un utilisateur non privilégié (ex: `USER node`).
- [ ] Confirmer que les dépendances système sont à jour (ex: `apt-get update && apt-get upgrade -y`).
- [ ] Vérifier que les paquets inutiles sont supprimés (ex: `rm -rf /var/lib/apt/lists/*`).
- [ ] S'assurer que les secrets ne sont **jamais** passés via des arguments de build (`ARG`) ou des variables d'environnement dans le Dockerfile.

### 2.2 Optimisation et robustesse
- [ ] Vérifier que l'image est multi-stage pour réduire sa taille finale.
- [ ] Confirmer que les layers sont optimisés (ex: `COPY` après `RUN npm install`).
- [ ] Tester la reconstruction de l'image avec `--no-cache` pour détecter les dépendances manquantes.
- [ ] Vérifier que les fichiers sensibles (`.env`, `*.pem`) sont **exclus** via `.dockerignore`.

### 2.3 Configuration réseau
- [ ] Vérifier que les ports exposés sont **uniquement** ceux nécessaires (ex: `EXPOSE 3000`).
- [ ] Confirmer que les services externes (bases de données, APIs) sont accessibles via des variables d'environnement configurables.

---

## 3. Tests obligatoires
- [ ] **Test de résilience** : Supprimer `tasks.json` (ou équivalent) et vérifier que le code gère l'erreur sans crash.
- [ ] **Test de sécurité** : Exécuter `docker scan` (ou `trivy`) et corriger les vulnérabilités critiques.
- [ ] **Test de performance** : Vérifier que l'image Docker fait **moins de 200 Mo** (hors données).
- [ ] **Test de conformité** : Exécuter `npm run lint` et `npm run typecheck` (ou équivalents) et corriger **toutes** les erreurs.

---

## 4. Documentation des anomalies
Toute faille ou non-conformité doit être documentée dans un rapport markdown (`QA-report.md`) avec :
- Description précise de l'anomalie.
- Étapes pour reproduire.
- Niveau de criticité (critique/haut/moyen/faible).
- Proposition de correction.

> **Note** : Aucune merge n'est autorisée tant que ce rapport n'est pas vide.