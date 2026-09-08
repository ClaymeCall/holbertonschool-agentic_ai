## Synthèse
### Prompt utilisé :
Refactorise le fichier `src/legacy_auth.js` pour corriger la vulnérabilité d'injection SQL.

**Rôle** : Tu es un expert en sécurité informatique spécialisé dans la correction des vulnérabilités d'injection SQL.

**Contexte** :
Le fichier `src/legacy_auth.js` contient une vulnérabilité critique d'injection SQL. Une suite de tests (`test_security.js`) valide le comportement fonctionnel légitime et révèle la vulnérabilité via un test dédié. Le code utilise actuellement des requêtes SQL construites dynamiquement avec des chaînes de caractères, ce qui permet l'injection de code malveillant.

**Tâche** :

1. Identifie la requête SQL vulnérable dans `src/legacy_auth.js`.
2. Remplace-la par une requête préparée (prepared statement) ou paramétrée pour neutraliser l'injection.
3. Conserve la signature de la fonction et la structure de l'objet retourné en cas de succès pour garantir la compatibilité avec le **Test 1** (comportement légitime).
**Contraintes** :

- Ne modifie pas la signature des fonctions existantes.
- Ne modifie pas la structure de l'objet retourné en cas de succès.
- Utilise uniquement des requêtes préparées ou des paramètres pour sécuriser les entrées utilisateur.
- Le code doit passer tous les tests existants, y compris le test de détection de vulnérabilité (qui doit échouer après correction, car la faille est corrigée).
**Format de sortie attendu** :

- Code JavaScript valide et fonctionnel.

### Vulnérabilité identifiée :
    >   La fonction `authenticateUser` construisait la requête SQL par concaténation directe de l’adresse e-mail et du mot de passe. Une entrée malveillante pouvait ainsi modifier la requête et contourner l’authentification par injection SQL.

### Modifications proposées par l’Agent :
    >   Remplacement de la concaténation par une requête paramétrée avec des espaces réservés `?`, puis transmission de `email` et `password` via le tableau de paramètres de `db.query`.

### Résultat des tests avant correction :
```sh
Test 1 : Connexion légitime...
[DB ENGINE] Exécution de la requête : SELECT * FROM users WHERE email = 'dev@entreprise.com' AND password = 'password123'
-> OK

Test 2 : Tentative d'injection SQL...
[DB ENGINE] Exécution de la requête : SELECT * FROM users WHERE email = 'admin@entreprise.com' OR '1'='1' AND password = 'hack'
❌ FAILED: FAILLE CRITIQUE DÉTECTÉE : L'injection SQL a réussi ! Votre prompt IA n'a pas sécurisé la requête.

true !== false
```

### Résultat des tests après correction :
```sh
> agentic-ops-tp2@1.0.0 test:security
> node test_security.js

=== Début de la suite de tests de sécurité (Tâche 2) ===

Test 1 : Connexion légitime...
[DB ENGINE] Exécution de la requête : SELECT * FROM users WHERE email = ? AND password = ? [ 'dev@entreprise.com', 'password123' ]
-> OK

Test 2 : Tentative d'injection SQL...
[DB ENGINE] Exécution de la requête : SELECT * FROM users WHERE email = ? AND password = ? [ "admin@entreprise.com' OR '1'='1", 'hack' ]
-> OK

✅ PASSED: Le code a été correctement sécurisé par l'agent IA.
```