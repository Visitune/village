À partir de ton analyse, produis UNIQUEMENT le bloc CONFIG ci-dessous pour ce client.
Données client : Nom : [NOM] · Couleur : [#RRGGBB] · Site (facultatif) : [SITE] · Objectif de conformité : [85] %

Règles :
- `long` : si format « large » (SafetyCulture) → `long:null`. Si format « long » → objet avec les NOMS EXACTS des colonnes (copiés de l'en-tête, avec accents et espaces). Colonne absente → omets la clé.
- `statutsExtra` : place chaque valeur inconnue (point 6) dans C (conforme), NC (non conforme), OBS (à améliorer / partiel), NA (non applicable / non audité). Minuscules, sans accents. En cas de doute, pose-moi la question.

const CONFIG={
 brand:{name:'',logo:'',accent:'',site:'',target:85},
 statutsExtra:{C:[],NC:[],OBS:[],NA:[]},
 long:null
};
