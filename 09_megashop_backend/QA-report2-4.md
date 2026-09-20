# QA Report - Audit de Code (2-4)

## Introduction
Ce rapport documente les anomalies identifiées lors de l'audit du webhook de notification de paiement et des composants associés, par rapport aux spécifications `@specifications.md`.

---

## **1. Webhook Endpoint (`/api/webhooks/payments`)**
**Fichier** : `server.js` (lignes 61–120)

### **Anomalies Identifiées**

#### **1.1. Traitement Asynchrone Manquant**
**Criticité** : **Critique**
**Description** : 
- Le webhook répond avec un statut **200 (OK)** immédiatement après la réception, mais **ne pousse pas les notifications dans la file d'attente Redis** pour un traitement asynchrone (exigence [§4](#exigences-fonctionnelles-mise-à-jour)).
- Le code actuel **ignore complètement la file d'attente** et ne communique pas avec le worker.

**Étapes pour reproduire** :
1. Envoyer une requête `POST` à `/api/webhooks/payments` avec un payload valide.
2. Vérifier les logs du worker (`worker.js`) : **aucune transaction n'est traitée**.

**Correction proposée** :
- Ajouter l'envoi du payload vers la file d'attente Redis (`TRANSACTION_QUEUE`) avant de répondre avec un **200 (OK)**.
- Exemple de correction :
  ```javascript
  await redisClient.lPush(TRANSACTION_QUEUE, JSON.stringify(sanitizedPayload));
  ```

---

#### **1.2. Gestion des Erreurs Incomplète**
**Criticité** : **Haute**
**Description** :
- **Erreur 1** : Le bloc `try/catch` dans l'événement `req.on('data')` (lignes 68–77) est **redondant** et **mal placé**. Il duplique le traitement des chunks de données (voir ligne 64–66) et ne gère pas correctement les erreurs de parsing JSON.
- **Erreur 2** : Aucune gestion d'erreur n'est prévue pour l'envoi vers Redis (si Redis est indisponible, le webhook échoue silencieusement).

**Étapes pour reproduire** :
1. Simuler une panne Redis (`docker stop redis`).
2. Envoyer une requête `POST` à `/api/webhooks/payments`.
3. Observer : **le webhook répond avec un 200 (OK)** même si Redis est indisponible.

**Correction proposée** :
- Supprimer le bloc `try/catch` redondant (lignes 68–77).
- Ajouter une gestion d'erreur pour l'envoi vers Redis :
  ```javascript
  try {
    await redisClient.lPush(TRANSACTION_QUEUE, JSON.stringify(sanitizedPayload));
  } catch (redisError) {
    console.error(`[${timestamp}] Redis error: ${redisError.message}`);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal server error' }));
    return;
  }
  ```

---

#### **1.3. Validation des Champs Obligatoires Incomplète**
**Criticité** : **Moyenne**
**Description** :
- La validation des champs obligatoires (lignes 85–93) **ne vérifie pas le type des champs** (ex: `amount` doit être un `number`, `timestamp` doit être une date ISO 8601 valide).
- **Risque** : Un payload avec `amount: "100"` (string) passerait la validation mais pourrait causer des erreurs dans le worker.

**Étapes pour reproduire** :
1. Envoyer un payload avec `amount: "100"` (string au lieu de number).
2. Observer : **le webhook accepte le payload** et répond avec un 200 (OK).

**Correction proposée** :
- Ajouter une validation des types pour chaque champ obligatoire.
- Exemple pour `amount` :
  ```javascript
  if (typeof payload.amount !== 'number') {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Field "amount" must be a number' }));
    return;
  }
  ```

---

#### **1.4. Journalisation Incomplète**
**Criticité** : **Faible**
**Description** :
- La journalisation du payload (ligne 102) **n'inclut pas l'ID de la requête**, ce qui rend le débogage difficile en cas de problèmes.

**Correction proposée** :
- Ajouter un `requestId` unique pour chaque requête et l'inclure dans les logs.
- Exemple :
  ```javascript
  const requestId = crypto.randomUUID();
  console.log(`[${timestamp}] [PAYMENT WEBHOOK] [RequestID: ${requestId}] Received payment notification: ${JSON.stringify(sanitizedPayload)}`);
  ```

---

## **2. Worker (`worker.js`)**
**Fichier** : `worker.js`

### **Anomalies Identifiées**

#### **2.1. Gestion des Erreurs Redis Incomplète**
**Criticité** : **Haute**
**Description** :
- Le worker **ne gère pas correctement les erreurs de parsing JSON** (ligne 147). Si le payload est corrompu, le worker **plante** au lieu de logger l'erreur et continuer.
- **Risque** : Une seule transaction corrompue peut bloquer toute la file d'attente.

**Étapes pour reproduire** :
1. Pousser un payload invalide dans Redis (ex: `LPUSH transactions:queue "{invalid_json}"`).
2. Observer : **le worker plante** et ne traite plus les transactions suivantes.

**Correction proposée** :
- Ajouter un `try/catch` autour du `JSON.parse` et logger l'erreur sans planter :
  ```javascript
  let transactionData;
  try {
    transactionData = JSON.parse(transaction.element);
  } catch (err) {
    log(`[ERROR] Failed to parse transaction data: ${err.message}. Skipping...`);
    return;
  }
  ```

---

#### **2.2. Redondance de Code**
**Criticité** : **Moyenne**
**Description** :
- Les lignes 17–34 **dupliquent** la validation des variables d'environnement (déjà faite aux lignes 17–24).

**Correction proposée** :
- Supprimer les lignes 26–34.

---

#### **2.3. Circuit Breaker Incomplet**
**Criticité** : **Moyenne**
**Description** :
- Le **circuit breaker** (lignes 176–207) **ne couvre pas les erreurs LLM** (ex: échec de l'appel à OpenAI). Si OpenAI est indisponible, le worker **plante** au lieu de fonctionner en mode dégradé.

**Étapes pour reproduire** :
1. Simuler une panne OpenAI (ex: désactiver `OPENAI_API_KEY`).
2. Envoyer une transaction valide.
3. Observer : **le worker plante** et ne traite plus les transactions.

**Correction proposée** :
- Ajouter un `try/catch` autour de `processTransaction` et basculer en mode dégradé si OpenAI échoue :
  ```javascript
  let analysis;
  try {
    analysis = await processTransaction(transactionData);
  } catch (err) {
    log(`[ERROR] LLM processing failed: ${err.message}. Skipping analysis...`);
    analysis = { isFraud: false, reason: "LLM unavailable" };
  }
  ```

---

## **3. Docker**
### **3.1. Taille de l'Image**
**Criticité** : **Haute**
**Description** :
- L'image Docker (`megashop_express:latest`) fait **258 Mo**, dépassant la limite de **200 Mo** spécifiée.

**Correction proposée** :
- Utiliser une image multi-stage pour réduire la taille.
- Exemple :
  ```dockerfile
  FROM node:18-alpine AS builder
  WORKDIR /app
  COPY package*.json ./
  RUN npm ci --only=production
  
  FROM node:18-alpine
  WORKDIR /app
  COPY --from=builder /app/node_modules ./node_modules
  COPY . .
  CMD ["node", "server.js"]
  ```

---

## **4. Sécurité des Dépendances**
**Criticité** : **Faible**
**Description** :
- `npm audit` ne rapporte **aucune vulnérabilité**, mais le projet utilise des dépendances obsolètes (ex: `redis@6.2.1`).

**Correction proposée** :
- Mettre à jour les dépendances critiques :
  ```bash
  npm update redis
  ```

---

## **5. Qualité de Code**
### **5.1. Linting**
**Criticité** : **Moyenne**
**Description** :
- **23 erreurs** de linting, principalement liées à l'utilisation de `require` au lieu de `import` (CommonJS vs ES6).

**Correction proposée** :
- Migrer vers ES6 (`import/export`) pour uniformiser le codebase.

---

## **6. Tests Manquants**
**Criticité** : **Critique**
**Description** :
- Aucun test n'est implémenté pour valider les scénarios décrits dans `@specifications.md` (§ [Tests](#tests)).
- **Scénarios critiques non testés** :
  1. Notification valide.
  2. Payload incomplet.
  3. Payload mal formé.

**Correction proposée** :
- Implémenter des tests unitaires et d'intégration avec `Jest` ou `Mocha`.
- Exemple de test pour un payload incomplet :
  ```javascript
  test('should return 400 for missing required fields', async () => {
    const response = await request(app)
      .post('/api/webhooks/payments')
      .send({ transaction_id: '123' }); // Missing other fields
    expect(response.status).toBe(400);
  });
  ```

---

## **Résumé des Criticités**
| **Criticité**  | **Nombre d'Anomalies** |
|---------------|-----------------------|
| Critique      | 3                     |
| Haute         | 3                     |
| Moyenne       | 4                     |
| Faible        | 2                     |

---

## **Recommandations Prioritaires**
1. **Corriger le traitement asynchrone** (exigence critique non implémentée).
2. **Ajouter des tests** pour valider les scénarios de `@specifications.md`.
3. **Réduire la taille de l'image Docker** (258 Mo → < 200 Mo).
4. **Améliorer la gestion des erreurs** (Redis, LLM, parsing JSON).

---

## **Statut**
❌ **Non conforme** aux spécifications. Aucune merge autorisée tant que les anomalies critiques ne sont pas corrigées.