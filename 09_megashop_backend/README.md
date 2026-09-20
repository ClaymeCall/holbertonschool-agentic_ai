# MegaShop Backend - L'Usine Logicielle Auditable

Projet final du module **Agentic AI** pour le backend de MegaShop. Trois fonctionnalités clés ont été livrées sans écrire manuellement la logique métier : le code est généré par une équipe de trois agents (PO, Dev, QA) pilotée depuis GitHub Copilot en mode Agent.

Rôle : **Lead Agentic Engineer**. Conception des *system prompts*, arbitrage des décisions techniques, revue et validation des livrables, et supervision du budget.

---

## 1. Architecture
```
banque --HTTP--> webhook (Express) --lpush--> Redis (`payment_queue`) --brpop--> worker
                                                             |
                                                        analyse LLM (Mistral)
                                                             |
                                                        traces + scores Langfuse
```

| Service  | Rôle                                                                                     |
|----------|------------------------------------------------------------------------------------------|
| webhook  | Reçoit les notifications sur `POST /webhook/payment`, dépose en file Redis (`payment_queue`), répond `200 OK` si les champs `orderId`, `amount` et `type` sont présents |
| worker   | Consomme la file (`payment_queue`), analyse via LLM, applique un **pre-hook** pour les transactions de type `refund` et un garde-fou HITL pour les transactions à risque **moyen/haut** |
| redis    | File d'attente `payment_queue` avec healthcheck                                  |

**Stack technique** : 
Node.js 20 (Alpine), Express, ioredis, Redis 7, Docker Compose, Mistral (`mistral-medium-latest`) via endpoint compatible OpenAI, Langfuse v3.

---

## 2. Équipe d'agents
Trois personas définis dans `.github/`, chargés au début de chaque session :

| Fichier               | Rôle                                      | Contraintes                                  |
|-----------------------|-------------------------------------------|---------------------------------------------|
| `PO-instructions.md`  | Rédige les User Stories INVEST et critères Gherkin | Aucun code, aucun choix technique          |
| `DEV-instructions.md` | Implémente les fonctionnalités            | Respect strict de `specifications.md`      |
| `QA-instructions.md`  | Audit sécurité, tests, preuves             | Interdit de modifier les règles métier     |

**Améliorations clés** :
- Les personas décrivent uniquement le **rôle**, pas la mission. La fonctionnalité est injectée dynamiquement dans le prompt.
- **Isolation des contextes** : un nouveau chat par rôle pour garantir que `specifications.md` reste la source unique de vérité.

---

## 3. Fonctionnalités Livrées

### Sprint 1 : Webhook de Paiement
**Route** : `POST /webhook/payment`
**Comportement** : Répond `200 OK` si les champs `orderId`, `amount` et `type` sont présents. Sinon, répond `400 Bad Request`.

**Validation** :
| Cas                     | Attendu | Résultat |
|-------------------------|---------|----------|
| JSON valide             | 200     | ✅       |
| Corps vide              | 400     | ✅       |
| JSON malformé           | 400     | ✅       |
| Exécution dans conteneur| `node`  | ✅       |

---

### Sprint 2 : Worker Asynchrone
Le webhook dépose les notifications dans Redis (`payment_queue`). Le worker les consomme via `brpop` et produit une décision : `low`, `medium`, ou `high`.

**Optimisations** :
- Les transactions de type `refund` déclenchent un **pre-hook** avant l'analyse LLM.
- Healthcheck Redis avec `depends_on` et retry applicatif.

**Validation** :
- Intégrité des notifications entre webhook et worker ✅
- Reprise après redémarrage de Redis ✅
- Traces Langfuse complètes (modèle, tokens, coût) ✅

---

### Sprint 3 : Garde-fou HITL
Les notifications contenant `"type": "refund"` déclenchent un **pre-hook** demandant une confirmation interactive :
```
Notification <id> : remboursement détecté. Autoriser le remboursement ? [o/n]
```

**Décision** : Enregistrée dans Langfuse comme score `gouvernance_hitl` pour les transactions à risque **moyen/haut**. Les transactions de type `refund` sont annulées si la réponse n'est pas `o`.

**Validation** :
| Réponse | Décision               | Statut   | Score Langfuse |
|---------|------------------------|----------|-----------------|
| `o`     | Traitement autorisé    | succès   | `1`             |
| `n`     | Traitement annulé      | échec    | `0`             |
| `xyz`   | Traitement annulé      | échec    | `0`             |

---

## 4. Décisions Techniques
Tracées dans `specifications.md` (section *Décisions validées par le lead*) :

| Décision                          | Rationale                                                                 |
|-----------------------------------|---------------------------------------------------------------------------|
| Payload invalide → `400 Bad Request` | Évite les traitements inutiles côté worker                                |
| Corps vide → `400 Bad Request`    | Protection contre les requêtes malformées                                |
| JSON malformé → `400 Bad Request` | Protection contre les erreurs de parsing                                 |
| `type: "refund"` → pre-hook       | Garde-fou humain pour les opérations financières sensibles              |
| Réponse ≠ `o` → refus             | Précaution pour les opérations financières                                |

---

## 5. Revue FinOps
Données Langfuse à la clôture :

| Indicateur          | Valeur               |
|--------------------|----------------------|
| Traces             | 5                   |
| Observations        | 7                   |
| Coût total          | ~0,0075 $            |
| Modèle             | `mistral-large-latest`   |
| Coût moyen/analyse  | ~0,0015 $          |

---

## 6. Limites Connues
- **Mode détaché** : Les remboursements (`action=refund`) ne sont pas traités en `docker compose up -d`. Le mode interactif est requis.
- **Format de décision** : Le worker rejette toute réponse LLM non conforme (`conforme`, `non_conforme`, `a_verifier`).
- **Erreurs Redis** : Les reconnexions génèrent des logs bruts sans message utilisateur.
- **Observabilité** : Les exports Langfuse contiennent les payloads (risque de données sensibles).

---

## 7. Installation
### Prérequis
- Node.js 20+, Docker Desktop
- Compte Langfuse Cloud + clé API Mistral

### Configuration
```bash
cp .env.example .env
```
Variables à renseigner (sans guillemets) :
```
LANGFUSE_PUBLIC_KEY=
LANGFUSE_SECRET_KEY=
LANGFUSE_BASE_URL=https://cloud.langfuse.com
OPENAI_API_KEY=
OPENAI_BASE_URL=
OPENAI_MODEL=mistral-medium-latest
```

### Démarrage
```bash
docker compose up -d --build
docker compose ps
```

### Mode Interactif (Remboursements)
```bash
docker compose stop async-worker
docker compose run --rm async-worker
```

### Tests
```bash
npm test
```

### Exemples d'Appels
**Notification normale** :
```bash
curl -i -X POST http://localhost:3000/webhook/payment \
  -H "Content-Type: application/json" \
  -d '{"orderId":"ORDER-001","amount":150.00,"type":"payment"}'
```

**Remboursement** (mode interactif) :
```bash
curl -i -X POST http://localhost:3000/webhook/payment \
  -H "Content-Type: application/json" \
  -d '{"orderId":"9999","amount":1050000,"type":"refund"}'
```

**Example de Pre-hook HITL** (mode interactif) :
```bash
[2026-09-20 20:06:12] Processing transaction: 9999
[PRE-HOOK] Transaction 9999 is a refund. Continue? (o/n) o
igh\"\n- comment: string explaining the risk level"},{"role":"user","cont
ent":"{\"orderId\":\"9999\",\"amount\":1050000,\"type\":\"refund\"}"}]}
[2026-09-20 20:06:17] [LLM] Transaction 9999 risk analysis: {"riskLevel":
"high","comment":"Refund transaction with an unusually high amount (1,050
,000) and a suspicious order ID (9999) suggests potential fraud or error.
"}
[HITL] Transaction 9999 has risk level: high. Comment: Refund transaction
 with an unusually high amount (1,050,000) and a suspicious order ID (999
9) suggests potential fraud or error.
Autoriser (o) ou Refuser (n)? o
[2026-09-20 20:06:25] [HITL] Transaction 9999 autorisée
[2026-09-20 20:06:25] Transaction 9999 processed successfully
```

---

## 8. Structure du Projet
```
09_megashop_backend/
├── .github/               # Personas agents (PO, Dev, QA)
├── api.js                 # Webhook Express
├── worker.js              # Worker Redis + LLM
├── utils/
│   └── validateEnv.ts     # Validation des variables d'environnement
├── docker-compose.yml     # Orchestration Redis + services
├── Dockerfile             # Image Node.js sécurisée
├── .env.example           # Modèle de configuration
└── README.md              # Documentation (ce fichier)
```

---

## 9. Sécurité du Conteneur
Corrections validées :

| Point                     | Correction                          | Preuve                          |
|---------------------------|-------------------------------------|---------------------------------|
| Exécution en root         | `USER node`                         | `whoami` → `node`               |
| Build reproductible       | `npm ci`                            | Lockfile respecté               |
| Secrets dans l'image      | `.env` dans `.dockerignore`         | Fichier absent dans le build    |

---

## 10. Modèle Utilisé
- **Copilot en mode Agent** : Utilisation du modèle `mistral-large-latest`.
