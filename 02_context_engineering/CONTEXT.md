## Synthèse
- Prompt utilisé :
    >   Role: Tu es un dévelopeur js expérimenté.
    >
    >   Contexte:
    >   #attachment:user.repository.js #attachment:user.service.js
    >
    >   Tâche:
    >   implémente un nouveau service d'export de données
    >
    >   Contraintes: reproduire exactement le pattern d'accès au repository ainsi que la gestion des exceptions déjà utilisés dans les services du projet.
- Fichiers fournis : src/repositories/user.repository.js et src/services/user.service.js
- Service généré : `DataExportService`, situé dans `02_context_engineering/src/services/data-export.service.js`.
- Architecture reprise : import du singleton `userRepository`, accès aux données via sa méthode `findAll()`, méthode de service `async` et levée d’une `Error` métier lorsque le repository ne contient aucune donnée à exporter.