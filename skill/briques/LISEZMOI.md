# Briques de code

`dashboard.html` = ces briques mises bout à bout (00 dans `<style>`, 01 à 08 dans `<script>`, dans l'ordre des numéros).
Ne modifier qu'UNE brique à la fois.

| Brique | Rôle | Quand la modifier |
|---|---|---|
| 00-style.css | Couleurs et mise en page | Presque jamais (couleur = `accent` dans le MAPPING) |
| 01-mapping.js | Réglages du fichier du client | **Toujours** : c'est la seule brique à adapter d'habitude |
| 02-utilitaires.js | Fonctions de base, reconnaissance des statuts | Pour ajouter des mots de statut |
| 03-lecture-fichier.js | Lit Excel/CSV, trouve la ligne d'en-tête | Fichier à plusieurs lignes de titre, formats exotiques |
| 04-analyse-colonnes.js | Devine le type de chaque colonne et construit les résultats | Une colonne est mal classée |
| 05-dessin-graphiques.js | Camembert, barres, courbe (SVG) | Ajouter un nouveau type de graphique |
| 06-rendu-page.js | Assemble la page (indicateurs, cartes, tableaux) | Ajouter / retirer une carte |
| 07-evenements.js | Clics, glisser-déposer, exports | Ajouter un bouton |
| 08-demarrage.js | Initialisation | Jamais |
