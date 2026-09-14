# Specifications

## Script de Surveillance des Tâches en Temps Réel

### Objectif
Créer un script qui surveille en boucle un fichier `tasks.json` toutes les 5 secondes et affiche dans la console l'action de la première tâche ayant le statut `pending`.

### Contraintes Techniques
- Le script doit être exécuté dans un conteneur Docker.
- Le fichier `tasks.json` doit être monté en volume dans le conteneur pour permettre la lecture.
- Le script doit être écrit en **Python** pour optimiser le poids et la simplicité.
- Le conteneur doit redémarrer automatiquement en cas d'échec.

### Fonctionnalités Requises (Format Gherkin)

```gherkin
Feature: Surveillance des tâches en temps réel
  Scenario: Détection d'une tâche en attente
    Given un fichier tasks.json contenant une tâche avec le statut "pending"
    When le script lit le fichier
    Then il affiche l'action de la première tâche "pending" dans la console

  Scenario: Aucune tâche en attente
    Given un fichier tasks.json sans tâche "pending"
    When le script lit le fichier
    Then il affiche "Aucune tâche en attente"

  Scenario: Fichier introuvable ou corrompu
    Given un fichier tasks.json introuvable ou corrompu
    When le script tente de le lire
    Then il affiche un message d'erreur clair dans la console
```

1. **Lecture Périodique** :
   - Lire le fichier `tasks.json` toutes les 5 secondes.
   - Vérifier la présence d'une tâche avec le statut `pending`.

2. **Affichage en Console** :
   - Dès qu'une tâche `pending` est détectée, afficher son champ `action` dans la console.
   - Si aucune tâche `pending` n'est trouvée, afficher un message indiquant qu'aucune tâche n'est en attente.

3. **Gestion des Erreurs** :
   - Gérer les cas où le fichier `tasks.json` est introuvable ou corrompu.
   - Afficher des messages d'erreur clairs dans la console.

4. **Dockerisation** :
   - Créer un `Dockerfile` optimisé pour la **sécurité**, le **poids** et le **temps de build**.
   - **Sécurité** :
     - Utiliser une image de base **minimale** (ex: `alpine` pour Python ou `node:alpine` pour Node.js).
     - Exécuter le conteneur avec un utilisateur non-root (`USER node` ou `USER nobody`).
     - Scanner l'image pour les vulnérabilités avec `docker scan`.
     - Ne pas inclure de secrets ou de fichiers sensibles dans l'image.
   - **Poids** :
     - Utiliser des couches multi-étapes (`multi-stage build`) pour réduire la taille finale.
     - Supprimer les dépendances inutiles et les fichiers temporaires après installation.
     - Utiliser `.dockerignore` pour exclure les fichiers non nécessaires.
   - **Temps de Build** :
     - Minimiser le nombre de couches (`RUN` groupés).
     - Utiliser des caches pour les dépendances (ex: `npm ci` ou `pip install --no-cache-dir`).
   - **Volume** :
     - Monter le fichier `tasks.json` en lecture seule (`ro`) pour éviter les modifications accidentelles.
   - **Redémarrage** :
     - Configurer le conteneur pour qu'il redémarre automatiquement (`restart: unless-stopped`).

### Structure Attendue du Fichier `tasks.json`
```json
[
  {
    "action": "Exemple d'action",
    "status": "pending"
  },
  {
    "action": "Autre action",
    "status": "completed"
  }
]
```

### Livrables
1. Script (Node.js ou Python) respectant les fonctionnalités requises.
2. `Dockerfile` pour construire l'image.
3. Instructions pour builder et exécuter le conteneur.

### Exemple de Sortie Console
```
[2026-09-14 12:00:00] Aucune tâche en attente.
[2026-09-14 12:00:05] Action détectée: "Exemple d'action"
```
