# Webhook de Notification de Paiement - Spécifications

## Contexte
Ce document décrit les spécifications techniques et fonctionnelles pour l'implémentation d'un **webhook** destiné à recevoir des notifications de paiement en provenance d'une banque. Ce webhook sera intégré au backend **MegaShop** (Node.js/Express).

---

## Objectifs
- Recevoir des notifications de paiement au format **JSON** depuis un système bancaire externe.
- Enregistrer une trace de la notification dans la **console** pour audit.
- Répondre immédiatement avec un **statut HTTP 200 (OK)** à la banque pour confirmer la réception.

---

## Exigences Fonctionnelles
### 1. Point d'Entrée API
- **Méthode HTTP** : `POST`
- **Endpoint** : `/api/webhooks/payments`
- **Format des données** : JSON
- **Authentification** : Aucune (pour l'instant, sous réserve de validation métier)

### 2. Traitement de la Notification
- **Validation** : Vérifier que le payload JSON contient les champs obligatoires (voir [Structure des Données](#structure-des-données)).
- **Journalisation** : Enregistrer le payload complet dans la **console** (pour audit et débogage).
- **Réponse** : Retourner un statut HTTP **200 (OK)** immédiatement après la réception, sans traitement supplémentaire.

### 3. Gestion des Erreurs
- **Payload invalide** : Si le JSON est mal formé ou manque de champs obligatoires, retourner un statut HTTP **400 (Bad Request)** avec un message d'erreur clair.
- **Erreur interne** : En cas d'erreur serveur, retourner un statut HTTP **500 (Internal Server Error)**.

---

## Structure des Données
### Payload JSON (Exemple)
```json
{
  "transaction_id": "string",       // Identifiant unique de la transaction (obligatoire)
  "amount": number,                 // Montant de la transaction (obligatoire)
  "currency": "string",            // Devise (ex: "EUR", "USD") (obligatoire)
  "status": "string",              // Statut de la transaction (ex: "completed", "failed") (obligatoire)
  "timestamp": "string",           // Date et heure de la transaction (ISO 8601) (obligatoire)
  "customer_id": "string",         // Identifiant du client (optionnel)
  "merchant_reference": "string"   // Référence marchand (optionnel)
}
```

### Champs Obligatoires
| Champ            | Type     | Description                                  |
|------------------|----------|----------------------------------------------|
| `transaction_id` | string   | Identifiant unique de la transaction.        |
| `amount`         | number   | Montant de la transaction.                   |
| `currency`       | string   | Devise (ex: "EUR").                        |
| `status`         | string   | Statut de la transaction (ex: "completed"). |
| `timestamp`      | string   | Date et heure (ISO 8601).                    |

---

## Exigences Fonctionnelles (Mise à Jour)
### 4. Traitement Asynchrone
- **Réponse immédiate** : Le webhook doit répondre avec un statut HTTP **200 (OK)** immédiatement après la réception de la notification, sans attendre la fin du traitement métier.
- **File d'attente** : Les notifications valides doivent être placées dans une file d'attente pour un traitement asynchrone par un **service Worker** dédié.
- **Validation synchrone** : Seule la validation des champs obligatoires et la vérification de la structure JSON sont effectuées de manière synchrone.

---

## Exigences Techniques
### 1. Framework et Langage
- **Langage** : JavaScript/TypeScript
- **Framework** : Express.js (Node.js)

### 2. Middleware
- Utiliser le middleware `express.json()` pour parser le payload JSON.
- Ne pas utiliser de middleware d'authentification pour l'instant.

### 3. Journalisation
- Utiliser `console.log()` pour enregistrer le payload reçu.
- Exemple de format de journalisation :
  ```
  [PAYMENT WEBHOOK] Received payment notification: {"transaction_id": "123", ...}
  ```

### 4. Réponse HTTP
- Répondre avec un statut **200 (OK)** pour toute notification valide (après validation synchrone).
- Répondre avec un statut **400 (Bad Request)** si le payload est invalide.

### 5. Architecture Asynchrone
- **Message Broker** : Utiliser **Redis** comme file d'attente pour le traitement asynchrone des notifications.
- **Service Worker** : Développer un service **Worker** séparé pour consommer les notifications depuis la file d'attente Redis et effectuer les traitements métiers (ex: validation de la commande, mise à jour de la base de données).
- **Conteneurisation** : Intégrer Redis dans le fichier `docker-compose.yml` pour une exécution locale et en environnement de développement.
- **Communication** : Le webhook et le Worker communiquent via Redis (pub/sub ou liste FIFO).

---

## Tests
### Scénarios de Test
1. **Notification valide** : Envoyer un payload JSON complet et valide.
   - **Résultat attendu** : Statut HTTP 200 + journalisation dans la console.

2. **Payload incomplet** : Envoyer un payload JSON manquant d'un champ obligatoire.
   - **Résultat attendu** : Statut HTTP 400 + message d'erreur.

3. **Payload mal formé** : Envoyer un payload JSON invalide (ex: syntaxe incorrecte).
   - **Résultat attendu** : Statut HTTP 400 + message d'erreur.

---

## Livrables
- Fichier de code source pour le webhook (ex: `webhookPayments.js` ou `webhookPayments.ts`).
- Intégration du webhook dans le routeur Express principal.
- Documentation mise à jour (ce fichier).

---

## Notes
- Ce webhook est une **première version** et pourra évoluer (ex: ajout d'authentification, traitement asynchrone des notifications).
