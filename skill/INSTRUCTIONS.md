# INSTRUCTIONS POUR COPILOT — Créer un dashboard (SPA) à partir d'un fichier Excel

Lis ce fichier en entier, puis exécute les étapes DANS L'ORDRE. Ne saute aucune étape.

## IMPORTANT — ce qu'il ne faut PAS faire
- Ne produis PAS de bloc `const CONFIG = {...}`. Cette méthode est abandonnée (dossier `archive/`, à ignorer).
- N'utilise PAS d'autres noms de clés que celles de `MAPPING`.
- Ta réponse finale est un fichier HTML complet qui contient `const MAPPING`, pas un petit bloc de réglages.

## Le but
L'utilisateur t'a donné un fichier Excel/CSV (n'importe lequel). Tu dois lui livrer UN SEUL fichier `dashboard.html` (HTML + CSS + JavaScript, une page, sans framework). Quand l'utilisateur ouvre ce fichier et y glisse un Excel de même structure, un tableau de bord se construit tout seul.

## Règle d'or : tu ne pars JAMAIS d'une page blanche
Un modèle complet et déjà testé existe : **`dashboard.html`** de ce dépôt (https://github.com/Visitune/village).
Il détecte tout seul les colonnes (dates, nombres, catégories, statuts), construit les graphiques et gère le filtrage, la recherche, le tri, l'export CSV, l'impression et le thème sombre.
Ton travail : **copier ce modèle tel quel et ne modifier que le bloc `MAPPING`** (≈15 lignes, repéré par les commentaires `MAPPING`).
Si tu n'arrives pas à lire le modèle depuis GitHub, demande à l'utilisateur de te joindre `dashboard.html` ; n'invente pas un autre code.

## Étape 1 — Lire le fichier (ne produis encore aucun code)
Note, sans rien deviner :
1. Nom de chaque feuille, nombre de lignes et de colonnes.
2. Numéro de la ligne d'en-tête (0 = première ligne). Si les premières lignes sont un titre ou des cellules fusionnées, l'en-tête est plus bas.
3. La liste EXACTE des noms de colonnes (copie-les, avec accents, espaces et majuscules).
4. Pour 5 à 10 colonnes : 3 exemples de valeurs.

## Étape 2 — Classer le fichier dans un des 3 cas
| Cas | Comment le reconnaître | Ce que fait le modèle |
|---|---|---|
| **A. Statuts, format long** | UNE colonne contient des résultats (Conforme, Non-conforme, OK, NOK, Oui/Non, Satisfaisant…) et chaque ligne est un point de contrôle | Taux de conformité, répartition, graphique par zone/catégorie, tendance par mois, liste des non-conformités |
| **B. Statuts, format large** | PLUSIEURS colonnes contiennent des résultats (une colonne par question, typique SafetyCulture : colonnes `auditID`, `auditName`… puis `Zone_Question`, `Zone_Question_notes`) | Idem ; la partie avant `_` dans l'en-tête devient la section |
| **C. Pas de statuts** | Que des dates, nombres et catégories (ventes, stocks, production, RH…) | KPI (totaux, moyennes), répartition par catégorie, nombres par catégorie, évolution par mois |

## Étape 3 — Remplir le bloc MAPPING
Copie le modèle puis remplace UNIQUEMENT les valeurs dans `const MAPPING={...}`. Règles :
- Tu peux laisser `null` presque partout : le modèle détecte seul. Renseigne une clé seulement si le fichier ne suit pas la logique normale.
- `title` : titre du dashboard (nom du fichier ou du client). `accent` : couleur `#RRGGBB`. Si l'utilisateur ne l'a pas donnée, garde `#0f766e`.
- `target` : objectif de conformité en %. Garde 85 si inconnu.
- `headerRow` : numéro de la ligne d'en-tête SEULEMENT si ce n'est pas la première ligne.
- `statusCols` / `groupCols` / `valueCols` / `dateCol` / `labelCol` : noms de colonnes copiés EXACTEMENT de l'étape 1. `null` = auto.
- `statusWords` : si une valeur de résultat n'est pas reconnue (voir la liste du modèle : conforme, non conforme, a ameliorer, partiel, n/a, oui, non, ok, nc, satisfaisant…), ajoute-la en minuscules sans accents dans `C` (bon), `NC` (mauvais), `OBS` (à améliorer) ou `NA` (non applicable). Exemple : `statusWords:{C:['ok+'],NC:['nok'],OBS:[],NA:['hors perimetre']}`.
- `groupSep:'_'` pour le format large SafetyCulture ; `null` sinon.
- N'invente AUCUNE nouvelle clé dans MAPPING.

Exemples prêts à l'emploi :

Export SafetyCulture « FOR 05 Audit Propreté et Hygiène » (cas B) :
```js
const MAPPING={title:'Audit Propreté et Hygiène – Minoterie Girardeau',accent:'#0f766e',target:85,sheet:null,headerRow:null,dateCol:null,statusCols:null,groupCols:null,valueCols:null,labelCol:null,groupSep:'_',statusWords:{C:[],NC:[],OBS:[],NA:[]}};
```
Export « une ligne par contrôle » avec colonnes Réf, Date, Contrôleur, Zone, Point de contrôle, Résultat, Remarque (cas A) :
```js
const MAPPING={title:'Contrôles cuisine',accent:'#1d4ed8',target:90,sheet:null,headerRow:null,dateCol:'Date',statusCols:['Résultat'],groupCols:['Zone','Contrôleur'],valueCols:null,labelCol:'Point de contrôle',groupSep:null,statusWords:{C:[],NC:[],OBS:[],NA:[]}};
```
Tableau de ventes Date, Région, Produit, Quantité, CA (cas C) :
```js
const MAPPING={title:'Ventes',accent:'#7c3aed',target:85,sheet:null,headerRow:null,dateCol:'Date',statusCols:[],groupCols:['Région','Produit'],valueCols:['Quantité','CA'],labelCol:null,groupSep:null,statusWords:{C:[],NC:[],OBS:[],NA:[]}};
```
(`statusCols:[]` force « pas de statuts » ; `null` laisse le modèle détecter.)

## Étape 4 — Livrer
1. Réponds avec le fichier COMPLET `dashboard.html` (le modèle avec le MAPPING modifié), dans UN SEUL bloc de code `html`, sans le tronquer, sans « … ». Rien ne doit être retiré du modèle.
2. Ajoute au plus 5 lignes : le cas détecté (A/B/C), les colonnes choisies, les valeurs de statut ajoutées, et « Enregistrez ce texte dans un fichier dashboard.html, ouvrez-le dans Edge/Chrome, glissez votre Excel ».
3. Si une information manque ou si deux colonnes se ressemblent, pose UNE question courte avant de livrer.

## Interdits
- Ne réécris pas le modèle, ne change pas son CSS ni ses fonctions, ne remplace pas SheetJS (la ligne `<script src=".../xlsx.full.min.js">` doit rester).
- N'ajoute pas de framework, d'import ni d'appel serveur. Aucune donnée n'est envoyée ailleurs.
- N'invente aucune donnée. Les chiffres viennent uniquement du fichier chargé dans le navigateur.
- N'écris pas de données du fichier de l'utilisateur en dur dans le HTML : l'application doit marcher avec d'autres fichiers de même structure.

## Si l'utilisateur demande une vue en plus (graphique, indicateur)
Ne réécris pas tout. Suis `skill/BONNES-PRATIQUES.md` (seulement sa méthode « une fonction à la fois ») : une seule fonction ajoutée à la fois, avec son emplacement exact dans le modèle. Les données utiles sont dans `S.m` : `S.m.ev` (résultats : `st` C/NC/OBS/NA, `q`, `dims`, `date`, `note`), `S.m.data` (lignes brutes), `S.m.cols`, `S.m.dims`.

## Si le dashboard affiche mal le fichier
Demande à l'utilisateur de coller le message d'erreur (touche F12 → Console) ou de décrire ce qui est faux, puis corrige UNIQUEMENT le bloc MAPPING.

## Contrôle avant d'envoyer (réponds OUI à tout, sinon corrige)
- Ma réponse commence par `<!DOCTYPE html>` et finit par `</html>`.
- Elle contient `const MAPPING={` et ne contient pas `const CONFIG`.
- Elle contient la ligne `<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/...">` du modèle.
- Aucune partie du modèle n'est remplacée par « ... » ou « reste identique ».
