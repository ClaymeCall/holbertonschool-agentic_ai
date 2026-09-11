Je n'ai pas réussi à saturer le contexte du modèle au point de lui faire perdre l'information du début.

Voici la methode que j'ai tentée :
(modèle utilisé: Mistral Small 3.2 pour avoir plus de chances de surcharger)

1. Demander l'information initiale
> Quelle et la règle exacte de nommage de nos tests selon les guidelines de l'entreprise ? 
> Les tests doivent suivre la convention de nommage :
> should_[EXPECTED_BEHAVIOR]_when_[CONDITION]
> Exemple : should_return_zero_when_cart_is_empty
> (voir /home/clement/Code/Holberton/holberton-agentic_ai/03_specialized_agent/TESTING_GUIDELINES.md:7)


2. Surcharger le contexte à >70% avec du Lorem ipsum

3. Poser la question à nouveau
> Rapelle moi quelle est la convention de nommage pour les tests. Tu n'as pas le droit d'aller vérifier un quelconque fichier
> La convention de nommage pour les tests est :
> should_[EXPECTED_BEHAVIOR]_when_[CONDITION]
> Exemple : should_return_zero_when_cart_is_empty


Sinon, j'ai tenté une autre methode qui surcharge le contexte mais ne permet pas le test du maintien de l'information.
J'ai demandé au modèle d'analyser la réponse d'un requête HTTP qui demande une vidéo.
Le modèle n'y arrive pas et répond la chose suivante :
> Prompt 858678 > 262144 maximum context length
