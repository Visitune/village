# Bonnes pratiques (à appliquer à chaque réponse)

1. **Recopier, ne pas réinventer.** Le modèle `dashboard.html` est testé. Tu le recopies en entier et tu ne changes que `const MAPPING`.
2. **Un seul fichier HTML**, JavaScript simple (pas de React, pas de module, pas d'import). Seule bibliothèque autorisée : SheetJS (déjà dans le modèle).
3. **Aucune donnée en dur.** Les chiffres viennent uniquement du fichier que l'utilisateur glisse dans la page.
4. **Rien d'abrégé.** Jamais de « ... », « reste identique », « idem ». Le fichier livré doit tourner tel quel.
5. **Noms de colonnes copiés exactement** (accents, espaces, majuscules) depuis l'en-tête de l'Excel.
6. **En cas de doute, une question courte** plutôt qu'une supposition.
7. **Une modification à la fois** si l'utilisateur demande un ajout : reformule en 2 lignes, donne UNE fonction avec son emplacement exact (« dans la brique 06, après la fonction X »), puis un test de 3 étapes dans le navigateur.
8. **Graphiques en SVG** générés par des fonctions simples `f(données) → texte SVG` (voir brique 05). Pas de bibliothèque de graphiques.
9. **Statuts** : conforme = vert, à améliorer = orange, non conforme = rouge, N/A = gris. Taux de conformité = C / (C + NC + À améliorer), N/A exclus.
10. **Erreur dans le navigateur** : demander le message de la console (F12) et ne corriger que la brique concernée.

## Ajouter un graphique (recette)
1. Brique 05 : écrire `function monGraphique(items){ return '<svg ...>...</svg>' }`.
2. Brique 06 : dans `render()`, ajouter `h+='<div class="card"><h2>Titre</h2>'+monGraphique(...)+'</div>'` avant `h+='</div>'`.
3. Données disponibles : `S.m.ev` (résultats : `st`, `q`, `dims`, `date`, `note`), `S.m.data` (lignes brutes), `S.m.cols`, `S.m.dims`.
