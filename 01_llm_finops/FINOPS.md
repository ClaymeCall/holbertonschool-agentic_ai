# FINOPS.md — Coût d'un agent de documentation de code

## 1. Tokenisation du prompt système

| Mesure | Valeur |
|---|---|
| Tokens | 76 |
| Caractères | 334 |

**Tokenizer** : outil de tokenization fourni (résultat brut : 76 tokens). Ratio ~4,4 car/token → cohérent avec un BPE type `cl100k_base`, à confirmer selon le modèle réellement utilisé.

## 2. Hypothèses

- System prompt : 76 tokens
- Code injecté : 15 000 tokens
- Réponse générée : 500 tokens
- Tarifs : 5 $/M input · 15 $/M output

## 3. Coût d'une exécution unique

- Input = 76 + 15 000 = **15 076 tokens** → 15 076 × 5/1M = 0,075 38 $
- Output = 500 × 15/1M = 0,007 50 $
- **Total = 0,082 88 $**

## 4. Boucle de 10 itérations (historique cumulé)

Formule : `input_n = 15 076 + 500 × (n−1)`

| Itération | Input | Output | Coût itération ($) | Cumulé ($) |
|---|---|---|---|---|
| 1 | 15 076 | 500 | 0,082 88 | 0,082 88 |
| 2 | 15 576 | 500 | 0,085 38 | 0,168 26 |
| 3 | 16 076 | 500 | 0,087 88 | 0,256 14 |
| 4 | 16 576 | 500 | 0,090 38 | 0,346 52 |
| 5 | 17 076 | 500 | 0,092 88 | 0,439 40 |
| 6 | 17 576 | 500 | 0,095 38 | 0,534 78 |
| 7 | 18 076 | 500 | 0,097 88 | 0,632 66 |
| 8 | 18 576 | 500 | 0,100 38 | 0,733 04 |
| 9 | 19 076 | 500 | 0,102 88 | 0,835 92 |
| 10 | 19 576 | 500 | 0,105 38 | **0,941 30** |

**Vérification globale** : Σinput = 10×15 076 + 500×45 = 173 260 → coût 0,866 30 $. Σoutput = 5 000 → coût 0,075 00 $. Total = **0,941 30 $** ✓ (cohérent avec la somme ligne par ligne).

Surcoût vs 10 appels indépendants (0,8288 $) : **+13,6 %**, dû uniquement à la ré-transmission du contexte cumulé.

## 5. Auto-évaluation

Calcul vérifié par deux méthodes convergentes (0,9413 $). La croissance de l'input est linéaire (+500 tokens/itération) mais le coût cumulé croît en n² à cause de l'historique complet réinjecté à chaque appel — risque FinOps classique des boucles de retry.

**Optimisation** : fenêtre glissante ne conservant que la dernière réponse (au lieu de tout l'historique) → input quasi constant (~15 576 tokens/itération) → coût cumulé ≈ 0,8538 $, soit **-9,3 %**, gain croissant avec le nombre d'itérations (n au lieu de n²).