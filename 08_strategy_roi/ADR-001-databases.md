
# Justification technique

## 1. Panier < 50ms, résilient à une panne DB
Le panier utilise Redis (cluster multi-AZ) comme **source de vérité**, pas comme simple cache.
- Latence sub-milliseconde, largement sous les 50ms exigés.
- Découplage total de PostgreSQL : si la DB primaire tombe, le panier continue de fonctionner sans dégradation.
- La persistance vers PostgreSQL se fait en asynchrone (best-effort, pour reporting/historisation), jamais sur le chemin critique d'écriture.
- Un pattern "cache-aside" classique aurait été insuffisant : en cas de cache miss il retombe sur la DB, ce qui viole l'exigence de disponibilité.

## 2. Logs d'audit inaltérables
Toute action métier (panier, commande, paiement) est publiée comme événement sur un bus (Kafka/SNS-SQS), consommé par un service Audit dédié qui écrit en mode append-only vers un stockage WORM (S3 Object Lock en mode compliance, ou une ledger DB type QLDB, cryptographiquement vérifiable).
- Le découplage par bus évite la perte d'événements en cas de pic de charge sur les services métier.
- WORM/ledger suffit à garantir l'inaltérabilité légale : une solution plus lourde (blockchain, etc.) serait du sur-dimensionnement non justifié par le besoin.

## 3. API bancaire lente (4s)
Un appel synchrone bloquant à 50 000 utilisateurs simultanés saturerait les pools de threads/connexions. Le paiement est donc traité en asynchrone :
- Le service Commande répond immédiatement (202 Accepted) et place la demande dans une queue dédiée.
- Un pool de workers Paiement appelle l'API bancaire avec retry, timeout et circuit breaker, isolant le reste du système d'une éventuelle dégradation de l'API externe.
- Le résultat est poussé au client via webhook, polling ou notification push, sans jamais bloquer l'UX pendant les 4 secondes.

## Choix dimensionnés au strict nécessaire
- Auto-scaling horizontal des services stateless (LB devant) : nécessaire dès le départ pour absorber 50 000 utilisateurs simultanés, difficile à ajouter a posteriori sans refonte de l'architecture de déploiement.
- Read replicas PostgreSQL pour le catalogue (lecture intensive) : ajoutées maintenant car router les lectures a posteriori impose de revoir toute la couche d'accès aux données, changement risqué en production.
- Aucun sharding DB, aucun multi-région, aucune architecture event-sourcing généralisée : non demandés par le cahier des charges et non nécessaires pour répondre aux trois contraintes.
