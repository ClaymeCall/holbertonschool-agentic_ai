# STRATEGY REVIEW

## Compte rendu de ROI

En implémentant une approche agentic + HITL, on peut espérer des gains importants en time to ship, coûts et en disponibilité humaine pour des tâches à forte valeur ajoutée.

Time to ship: Entre **3 et 10 heures** selon la complexité de la tâche
Gains en coûts: Entre **638 € et 1775 €** en fonction des tâches

## Économies principales observées

Les gains les plus significatifs sont réalisés sur les tâches suivantes :

- **Refactoring de code legacy** : Économie de **1775 €** (réduction de 40h à 10h)
- **Scripts de migration BDD** : Économie de **638 €** (réduction de 16h à 3h)
- **Modules techniques répétitifs** (ex: authentification) : Économie de **1397,50 €** (réduction de 32h à 4h)

## Architecture choisie

- Stateless Services : Catalogue, Panier, Commande et Paiement (auto-scaling horizontal).
- Stockage chaud : Redis (cluster multi-AZ) comme source de vérité pour le panier, garantissant une latence < 5ms et résilience en cas de panne DB.
- Base transactionnelle : PostgreSQL (primaire + read replicas pour le catalogue).
- Bus d'événements : Kafka/SNS-SQS pour découpler les services et alimenter l'audit immuable (S3 WORM/Ledger DB).
- Paiement asynchrone : Queue SQS pour isoler les appels lents à l'API bancaire (~4s), avec retry, timeout et circuit breaker.
- Audit : Événements métier écrits en append-only sur stockage WORM pour garantir l'inaltérabilité légale.
Justifications clés :
- Redis comme source de vérité pour le panier (pas un cache) pour respecter la latence < 50ms et la résilience.
- Paiement asynchrone pour éviter la saturation des ressources face à 50 000 utilisateurs simultanés.
- Audit immuable via bus + WORM pour répondre aux exigences légales sans surdimensionnement.


## Compromis architecturaux

### Coût

L'architecture proposée introduit des coûts supplémentaires liés à l'infrastructure redondante et aux services managés (ex: Redis cluster multi-AZ, Kafka, SQS, stockage WORM). Cependant, ces coûts sont compensés par les économies réalisées sur le temps de développement et la maintenance. Par exemple, l'utilisation de Redis comme source de vérité pour le panier évite des coûts de scaling excessifs pour PostgreSQL, tout en garantissant une latence faible.

### Complexité

La complexité est augmentée par la nécessité de gérer plusieurs systèmes distribués (Redis, PostgreSQL, Kafka, SQS) et leurs interactions. Cela nécessite une expertise technique accrue pour le déploiement, la surveillance et le débogage. Cependant, cette complexité est justifiée par les gains en résilience et en performance, notamment pour les pics de charge.

### Performance

L'architecture privilégie la performance en utilisant des solutions optimisées pour chaque besoin : Redis pour le panier (latence < 5ms), Kafka pour le découplage des services, et SQS pour les paiements asynchrones. Ces choix permettent de respecter les contraintes de latence et de débit, même en cas de forte charge.

### Résilience

La résilience est un pilier central de cette architecture. En découplant les services via Kafka et SQS, et en utilisant Redis comme source de vérité pour le panier, l'architecture garantit une continuité de service même en cas de panne d'un composant critique (ex: PostgreSQL). Le stockage WORM pour l'audit assure également une résilience légale.

### Sécurité

La sécurité est renforcée par l'isolation des services (ex: paiement asynchrone via SQS) et l'utilisation de stockage immuable (WORM) pour l'audit. Cependant, la multiplication des composants augmente la surface d'attaque, nécessitant une gestion rigoureuse des accès et des communications entre services.


## Choix conservés vs modifiés

En premier lieu, l'architecture ne répondait pas correctement au critère 1 stipulant que la solution doit être résiliente à des pannes de DB. La base de données était toujours sur le chemin critique. J'ai donc modifié ce point pour répondre correctement au cahier des charges.

Pour ce qui est des choix conservés, Kafka comme Bus d'évènements est une bonne option pour gérer correctement la contrainte de l'API bancaire, je l'ai validé pour sa pertinence.


## Conclusion et recommandation

Cette approche est recommandée pour les entreprises cherchant à concilier **résilience, performance et scalabilité**, tout en acceptant une **complexité et des coûts initiaux plus élevés**. Elle est particulièrement adaptée aux environnements où :
- La latence et la disponibilité sont critiques (ex: e-commerce, services financiers).
- Les pics de charge sont fréquents et imprévisibles.
- Les exigences légales imposent un audit immuable.

En revanche, pour des projets de petite envergure ou avec des contraintes budgétaires strictes, une architecture plus simple et monolithique pourrait être préférable.

