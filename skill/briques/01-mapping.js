/* =====================================================================
   MAPPING — SEUL BLOC À ADAPTER (voir COPILOT-INSTRUCTIONS.md, étape 3)
   Tout ce qui est null / vide est DÉTECTÉ AUTOMATIQUEMENT.
   Les noms de colonnes doivent être copiés EXACTEMENT de l'en-tête de l'Excel.
   ===================================================================== */
const MAPPING={
 title:'Tableau de bord',      // titre affiché
 accent:'#0f766e',             // couleur principale #RRGGBB
 target:85,                    // objectif de conformité en % (ignoré s'il n'y a pas de statuts)
 sheet:null,                   // nom de la feuille à lire (null = la première qui contient des données)
 headerRow:null,               // n° de la ligne d'en-tête (0 = première ligne) ; null = détection auto
 dateCol:null,                 // nom de la colonne date (null = auto)
 statusCols:null,              // liste de colonnes « résultat » ex ['Résultat'] ; null = auto
 groupCols:null,               // liste de colonnes pour les graphiques par catégorie ex ['Zone','Auditeur'] ; null = auto
 valueCols:null,               // liste de colonnes numériques à totaliser ; null = auto
 labelCol:null,                // colonne qui nomme une ligne (question, produit, n° audit…) ; null = auto
 groupSep:'_',                 // séparateur dans les en-têtes « Section_Question » (format large) ; null = aucun
 statusWords:{C:[],NC:[],OBS:[],NA:[]} // libellés propres au client, en minuscules sans accents
};
/* ===================== FIN DU BLOC MAPPING ===================== */
