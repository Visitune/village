# 🤖 COPILOT : LIS CETTE PAGE EN ENTIER ET APPLIQUE-LA À LA LETTRE

L'utilisateur t'a joint un fichier Excel/CSV et t'a donné le lien de ce dépôt. Il veut en retour **un fichier `dashboard.html` complet** (HTML + CSS + JavaScript, une seule page) qui construit un tableau de bord à partir de son Excel.
**Tout ce dont tu as besoin est sur cette page : instructions, bonnes pratiques et code du modèle. N'ouvre aucun autre fichier. Ne demande rien à l'utilisateur sauf si une information manque.**
Ta réponse finale = le fichier HTML complet dans un seul bloc de code. Pas de bloc « CONFIG ».

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

---

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

---

## LE MODÈLE À RECOPIER (fichier `dashboard.html`)

```html
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Tableau de bord</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
<style>
/* ===== STYLE : ne pas modifier sauf la couleur --accent (voir MAPPING.accent) ===== */
:root{--accent:#0f766e;--bg:#f4f6f8;--card:#fff;--ink:#0f172a;--mute:#64748b;--line:#e2e8f0;--ok:#16a34a;--nc:#dc2626;--obs:#d97706;--na:#94a3b8}
:root[data-theme=dark]{--bg:#0b1120;--card:#141c2f;--ink:#e6edf7;--mute:#93a4bd;--line:#26324b;--ok:#4ade80;--nc:#f87171;--obs:#fbbf24;--na:#64748b}
*{box-sizing:border-box}body{margin:0;font:14px/1.45 system-ui,Segoe UI,Arial,sans-serif;background:var(--bg);color:var(--ink)}
header{display:flex;flex-wrap:wrap;gap:10px;align-items:center;padding:12px 20px;background:var(--card);border-bottom:1px solid var(--line);position:sticky;top:0;z-index:5}
header h1{font-size:18px;margin:0;flex:1;color:var(--accent)}
button,select,input{font:inherit;color:inherit;background:var(--card);border:1px solid var(--line);border-radius:8px;padding:6px 12px}
button{cursor:pointer}button.pri{background:var(--accent);color:#fff;border-color:var(--accent)}
main{padding:16px 20px;max-width:1300px;margin:auto}
.drop{border:2px dashed var(--accent);border-radius:14px;padding:60px 20px;text-align:center;color:var(--mute);background:var(--card)}
.drop.over{background:color-mix(in srgb,var(--accent) 10%,var(--card))}
.grid{display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));margin-bottom:14px}
.card{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:14px;min-width:0}
.card h2{font-size:14px;margin:0 0 10px}.wide{grid-column:1/-1}
.kpi b{display:block;font-size:28px;line-height:1.1}.kpi span{color:var(--mute);font-size:12px}
.bar{display:flex;align-items:center;gap:8px;margin:3px 0;cursor:pointer;font-size:12px}.bar:hover{background:var(--bg)}
.bar .lab{width:38%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.bar .trk{flex:1;height:14px;display:flex;border-radius:4px;overflow:hidden;background:var(--line)}
.bar .num{width:48px;text-align:right;color:var(--mute)}
table{border-collapse:collapse;width:100%;font-size:12px}th,td{text-align:left;padding:5px 8px;border-bottom:1px solid var(--line);vertical-align:top}
th{cursor:pointer;position:sticky;top:0;background:var(--card)}.scroll{max-height:420px;overflow:auto}
.chip{display:inline-block;padding:2px 8px;border-radius:99px;font-size:11px;color:#fff}
.chip.C{background:var(--ok)}.chip.NC{background:var(--nc)}.chip.OBS{background:var(--obs)}.chip.NA{background:var(--na)}
.legend span{margin-right:12px;font-size:12px}.legend i{display:inline-block;width:10px;height:10px;border-radius:2px;margin-right:4px}
.warn{background:color-mix(in srgb,var(--obs) 15%,var(--card));border:1px solid var(--obs);border-radius:8px;padding:8px 12px;margin-bottom:12px;font-size:12px}
@media print{header button,.drop,.noprint{display:none}}
</style>
</head>
<body>
<header>
 <h1 id="ttl"></h1>
 <select id="sheetSel" style="display:none"></select>
 <button class="pri" id="btnUp">Charger un Excel / CSV</button>
 <button id="btnCsv">Exporter CSV</button>
 <button id="btnPrint">Imprimer</button>
 <button id="btnTheme">Thème</button>
 <input type="file" id="file" accept=".xlsx,.xlsm,.xls,.csv" multiple hidden>
</header>
<main id="app"></main>

<script>
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

/* ---------- utilitaires ---------- */
const $=s=>document.querySelector(s);
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const norm=s=>String(s==null?'':s).normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().trim();
const isDate=v=>Object.prototype.toString.call(v)==='[object Date]'&&!isNaN(v);
const fmtD=d=>d.toLocaleDateString('fr-FR');
const ST={C:'Conforme',NC:'Non conforme',OBS:'À améliorer',NA:'N/A'};
const KNOWN={
 C:['conforme','c','ok','oui','satisfaisant','bon','valide','conforme '],
 NC:['non conforme','non-conforme','nc','non','non satisfaisant','insatisfaisant','mauvais','ko'],
 OBS:['a ameliorer','amelioration','a corriger','partiel','partiellement conforme','observation','a surveiller'],
 NA:['n/a','na','n.a.','non applicable','sans objet','non audite','non evalue']};
function statusOf(v){const n=norm(v);if(!n)return null;
 for(const k of ['C','NC','OBS','NA']){if(((MAPPING.statusWords||{})[k]||[]).map(norm).includes(n)||KNOWN[k].includes(n))return k}return null}
const TITRE_AUTO=MAPPING.title==='Tableau de bord';
const S={sheets:{},cur:null,filter:null,q:'',sort:null,page:0,theme:'light',m:null};

/* ---------- lecture du fichier ---------- */
async function readFile(f){
 const buf=await f.arrayBuffer();let wb;
 if(/\.csv$/i.test(f.name)){let t=new TextDecoder('utf-8').decode(buf);if(t.includes('�'))t=new TextDecoder('windows-1252').decode(buf);
  const l=t.split(/\r?\n/)[0]||'',FS=[';','\t',','].map(s=>[s,l.split(s).length]).sort((a,b)=>b[1]-a[1])[0][0];
  wb=XLSX.read(t.replace(/^﻿/,''),{type:'string',FS,cellDates:true,raw:true});
 }else wb=XLSX.read(buf,{type:'array',cellDates:true});
 wb.SheetNames.forEach(n=>{const rows=XLSX.utils.sheet_to_json(wb.Sheets[n],{header:1,raw:true,defval:null,blankrows:false});
  if(rows.length>=2){const k=S.sheets[n]?n+' ('+f.name+')':n;S.sheets[k]=rows}});
}
function findHeader(rows){
 if(MAPPING.headerRow!=null)return MAPPING.headerRow;
 const sc=rows.slice(0,15).map(r=>r.filter(v=>typeof v==='string'&&v.trim()).length),mx=Math.max(...sc);
 return Math.max(0,sc.findIndex(c=>c>=mx*0.6&&c>=2));
}

/* ---------- analyse des colonnes (profilage) ---------- */
function toDate(v){
 if(isDate(v))return v;
 if(typeof v==='string'){let m=v.match(/^(\d{4})-(\d{2})-(\d{2})/);if(m)return new Date(+m[1],m[2]-1,+m[3]);
  m=v.match(/^(\d{1,2})[\/.](\d{1,2})[\/.](\d{4})/);if(m)return new Date(+m[3],m[2]-1,+m[1])}
 return null}
function build(name){
 const rows=S.sheets[name],h=findHeader(rows);
 const head=rows[h].map((x,i)=>x==null||String(x).trim()===''?'Col'+(i+1):String(x).trim());
 const data=rows.slice(h+1).filter(r=>r&&r.some(v=>v!=null&&String(v).trim()!==''));
 const n=data.length;
 const cols=head.map((name,i)=>{
  const vals=data.map(r=>r[i]).filter(v=>v!=null&&String(v).trim()!=='');
  const d=new Set(vals.map(v=>isDate(v)?v.getTime():norm(v)));
  const st=vals.length?vals.filter(v=>statusOf(v)).length/vals.length:0;
  const dt=vals.length?vals.filter(v=>toDate(v)).length/vals.length:0;
  const nu=vals.length?vals.filter(v=>typeof v==='number').length/vals.length:0;
  let type='text';
  if(!vals.length)type='empty';
  else if(st>=0.6)type='status';
  else if(dt>=0.8)type='date';
  else if(nu>=0.8&&d.size>Math.min(12,n*0.3))type='num';
  else if(d.size>=2&&d.size<=Math.max(12,n*0.3)&&d.size<=vals.length*0.6&&vals.length>=n*0.5&&typeof vals[0]==='string')type='cat';
  else if(nu>=0.8)type='num';
  return{i,name,type,distinct:d.size,filled:vals.length}});
 const pick=(arr,type)=>arr?arr.map(x=>cols.find(c=>c.name===x)).filter(Boolean):cols.filter(c=>c.type===type);
 const m={name,head,data,cols,n,
  statusCols:pick(MAPPING.statusCols,'status'),
  groupCols:pick(MAPPING.groupCols,'cat').filter(c=>MAPPING.groupCols||!/question|point|libelle|designation|exigence|controle|critere|remarque|commentaire|note/i.test(norm(c.name))).slice(0,4),
  valueCols:pick(MAPPING.valueCols,'num').slice(0,3),
  dateCol:MAPPING.dateCol?cols.find(c=>c.name===MAPPING.dateCol):(cols.find(c=>c.type==='date'&&/date|jour|debut|start/i.test(c.name))||cols.find(c=>c.type==='date')),
  labelCol:MAPPING.labelCol?cols.find(c=>c.name===MAPPING.labelCol):(cols.find(c=>/question|point|libelle|designation|exigence|controle|critere/i.test(norm(c.name))&&['text','cat'].includes(c.type))||cols.find(c=>c.type==='text'))};
 m.mode=m.statusCols.length>1?'large':m.statusCols.length===1?'long':'stats';
 m.dims=m.groupCols.map(c=>c.name);
 if(m.mode==='large'&&MAPPING.groupSep&&m.statusCols.some(c=>c.name.includes(MAPPING.groupSep)))m.dims.unshift('Section');
 /* événements : 1 événement = 1 résultat (une cellule en format large, une ligne en format long) */
 m.ev=[];
 data.forEach((r,ri)=>{
  const dv=m.dateCol?toDate(r[m.dateCol.i]):null;
  const base={};m.groupCols.forEach(c=>{base[c.name]=r[c.i]==null?'(vide)':String(r[c.i]).trim()});
  m.statusCols.forEach(sc=>{const st=statusOf(r[sc.i]);if(!st)return;
   const dims=Object.assign({},base);
   let q=m.labelCol&&m.mode==='long'?String(r[m.labelCol.i]??''):sc.name;
   if(m.mode==='large'&&MAPPING.groupSep&&sc.name.includes(MAPPING.groupSep)){const p=sc.name.split(MAPPING.groupSep).map(s=>s.trim());dims.Section=p[0]||'Général';q=p.slice(1).join(' – ')}
   else if(m.mode==='large')dims.Section='Général';
   const note=m.mode==='large'?(m.head.indexOf(sc.name+'_notes')>=0?r[m.head.indexOf(sc.name+'_notes')]:''):'';
   m.ev.push({ri,st,q,dims,date:dv,note:note||''})})});
 return m}

/* ---------- dessin ---------- */
const rate=(c,nc,o)=>c+nc+o?Math.round(1000*c/(c+nc+o))/10:null;
const cnt=ev=>{const c={C:0,NC:0,OBS:0,NA:0};ev.forEach(e=>c[e.st]++);return c};
function donut(c){const t=c.C+c.NC+c.OBS+c.NA;if(!t)return'';let a=-Math.PI/2,s='';
 ['C','OBS','NC','NA'].forEach(k=>{if(!c[k])return;const f=c[k]/t,b=a+f*2*Math.PI,l=f>.5?1:0,R=60,r=38;
  const p=(R,x)=>[(70+R*Math.cos(x)).toFixed(1),(70+R*Math.sin(x)).toFixed(1)];
  if(f>=0.9999){s+=`<circle cx="70" cy="70" r="49" fill="none" stroke="var(--${k.toLowerCase()})" stroke-width="22"/>`}
  else s+=`<path d="M${p(R,a)}A${R},${R} 0 ${l} 1 ${p(R,b)}L${p(r,b)}A${r},${r} 0 ${l} 0 ${p(r,a)}Z" fill="var(--${k.toLowerCase()})"/>`;a=b});
 const r=rate(c.C,c.NC,c.OBS);
 return`<svg viewBox="0 0 140 140" width="150"><g>${s}</g><text x="70" y="76" text-anchor="middle" font-size="20" font-weight="700" fill="currentColor">${r==null?'–':r+'%'}</text></svg>`}
function legend(c){return`<div class="legend">${['C','OBS','NC','NA'].map(k=>`<span><i style="background:var(--${k.toLowerCase()})"></i>${ST[k]} ${c[k]}</span>`).join('')}</div>`}
function stackBars(groups,dim){ // groups: [{label,c}]
 return groups.map(g=>{const t=g.c.C+g.c.NC+g.c.OBS+g.c.NA||1,r=rate(g.c.C,g.c.NC,g.c.OBS);
  return`<div class="bar" data-dim="${esc(dim)}" data-val="${esc(g.label)}" title="${esc(g.label)}"><div class="lab">${esc(g.label)}</div>
  <div class="trk">${['C','OBS','NC','NA'].map(k=>`<div style="width:${100*g.c[k]/t}%;background:var(--${k.toLowerCase()})"></div>`).join('')}</div><div class="num">${r==null?'–':r+'%'}</div></div>`}).join('')}
function simpleBars(items,dim,unit){const mx=Math.max(...items.map(i=>i.v),1);
 return items.map(i=>`<div class="bar" ${dim?`data-dim="${esc(dim)}" data-val="${esc(i.label)}"`:''} title="${esc(i.label)}"><div class="lab">${esc(i.label)}</div>
 <div class="trk"><div style="width:${100*i.v/mx}%;background:var(--accent)"></div></div><div class="num">${Math.round(i.v*10)/10}${unit||''}</div></div>`).join('')}
function trend(pts,pct){if(pts.length<1)return'<p>Pas de date exploitable.</p>';const W=560,H=150,p=28,mx=pct?100:Math.max(...pts.map(x=>x.v),1);
 const X=i=>p+(pts.length===1?(W-2*p)/2:i*(W-2*p)/(pts.length-1)),Y=v=>H-p-(H-2*p)*v/mx;
 const line=pts.map((q,i)=>`${i?'L':'M'}${X(i).toFixed(1)},${Y(q.v).toFixed(1)}`).join('');
 const tg=pct?`<line x1="${p}" x2="${W-p}" y1="${Y(MAPPING.target)}" y2="${Y(MAPPING.target)}" stroke="var(--obs)" stroke-dasharray="4"/>`:'';
 return`<svg viewBox="0 0 ${W} ${H}" width="100%">${tg}<path d="${line}" fill="none" stroke="var(--accent)" stroke-width="2.5"/>`+
  pts.map((q,i)=>`<circle cx="${X(i)}" cy="${Y(q.v)}" r="3.5" fill="var(--accent)"><title>${esc(q.k)} : ${q.v}${pct?'%':''}</title></circle><text x="${X(i)}" y="${H-8}" font-size="10" text-anchor="middle" fill="var(--mute)">${esc(q.k)}</text>`).join('')+`</svg>`}

/* ---------- rendu principal ---------- */
function filtered(){const m=S.m;let ev=m.ev;if(S.filter)ev=ev.filter(e=>e.dims[S.filter.dim]===S.filter.val);return ev}
function render(){
 const app=$('#app');
 if(!S.m){app.innerHTML=`<div class="drop" id="drop"><h2>Déposez votre fichier Excel ou CSV ici</h2><p>ou cliquez sur « Charger un Excel / CSV ». Le tableau de bord se construit automatiquement à partir des colonnes du fichier. Aucune donnée n'est envoyée sur internet.</p></div>`;return}
 const m=S.m,ev=filtered(),c=cnt(ev);let h='';
 const rowsF=S.filter&&m.mode==='long'?m.data.filter((r,ri)=>ev.some(e=>e.ri===ri)):m.data;
 if(m.mode==='stats'&&!m.cols.some(x=>x.type==='cat'||x.type==='num'))h+=`<div class="warn">Aucune colonne de statut, de catégorie ou de nombre détectée : seul le tableau de données est affiché.</div>`;
 if(S.filter)h+=`<p><span class="chip C" style="background:var(--accent)">${esc(S.filter.dim)} = ${esc(S.filter.val)}</span> <button id="clr">Effacer le filtre</button></p>`;
 /* KPI */
 h+='<div class="grid">';
 h+=`<div class="card kpi"><b>${m.n}</b><span>lignes · feuille « ${esc(m.name)} »</span></div>`;
 if(m.ev.length){const r=rate(c.C,c.NC,c.OBS);
  h+=`<div class="card kpi"><b style="color:var(--${r!=null&&r>=MAPPING.target?'ok':'nc'})">${r==null?'–':r+'%'}</b><span>taux de conformité (objectif ${MAPPING.target}%)</span></div>`;
  h+=`<div class="card kpi"><b style="color:var(--nc)">${c.NC}</b><span>non-conformités</span></div><div class="card kpi"><b style="color:var(--obs)">${c.OBS}</b><span>à améliorer</span></div>`}
 m.valueCols.forEach(v=>{const xs=rowsF.map(r=>r[v.i]).filter(x=>typeof x==='number'),s=xs.reduce((a,b)=>a+b,0);
  h+=`<div class="card kpi"><b>${Math.round(s*100)/100}</b><span>${esc(v.name)} · total (moy. ${xs.length?Math.round(s/xs.length*100)/100:0})</span></div>`});
 h+='</div><div class="grid">';
 /* statuts */
 if(m.ev.length)h+=`<div class="card"><h2>Répartition des résultats</h2><div style="display:flex;gap:14px;align-items:center;flex-wrap:wrap">${donut(c)}${legend(c)}</div></div>`;
 /* tendance */
 if(m.dateCol){const by={};
  if(m.ev.length)ev.forEach(e=>{if(!e.date)return;const k=e.date.getFullYear()+'-'+String(e.date.getMonth()+1).padStart(2,'0');(by[k]=by[k]||[]).push(e)});
  else rowsF.forEach(r=>{const d=toDate(r[m.dateCol.i]);if(!d)return;const k=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0');(by[k]=by[k]||[]).push(1)});
  const pts=Object.keys(by).sort().map(k=>({k,v:m.ev.length?(rate(...['C','NC','OBS'].map(s=>by[k].filter(e=>e.st===s).length))??0):by[k].length}));
  h+=`<div class="card"><h2>${m.ev.length?'Évolution du taux de conformité (par mois)':'Nombre de lignes par mois'}</h2>${trend(pts,!!m.ev.length)}</div>`}
 /* dimensions */
 m.dims.forEach(d=>{
  if(m.ev.length){const g={};m.ev.forEach(e=>{const k=e.dims[d];g[k]=g[k]||[];g[k].push(e)});
   const gr=Object.keys(g).map(k=>({label:k,c:cnt(g[k])})).sort((a,b)=>(rate(a.c.C,a.c.NC,a.c.OBS)??101)-(rate(b.c.C,b.c.NC,b.c.OBS)??101)).slice(0,14);
   h+=`<div class="card"><h2>Conformité par ${esc(d)} <small style="color:var(--mute)">(cliquez pour filtrer)</small></h2>${stackBars(gr,d)}</div>`}
  else{const g={};const col=m.cols.find(x=>x.name===d);m.data.forEach(r=>{const k=r[col.i]==null?'(vide)':String(r[col.i]).trim();g[k]=(g[k]||0)+1});
   const it=Object.keys(g).map(k=>({label:k,v:g[k]})).sort((a,b)=>b.v-a.v).slice(0,12);
   h+=`<div class="card"><h2>Répartition par ${esc(d)}</h2>${simpleBars(it,d)}</div>`}});
 /* valeurs numériques par catégorie */
 if(m.valueCols.length&&m.groupCols.length){const gc=m.groupCols[0];m.valueCols.slice(0,2).forEach(v=>{const g={};
  m.data.forEach(r=>{const k=r[gc.i]==null?'(vide)':String(r[gc.i]).trim(),x=r[v.i];if(typeof x==='number')g[k]=(g[k]||0)+x});
  const it=Object.keys(g).map(k=>({label:k,v:g[k]})).sort((a,b)=>b.v-a.v).slice(0,12);
  h+=`<div class="card"><h2>${esc(v.name)} par ${esc(gc.name)}</h2>${simpleBars(it,null)}</div>`})}
 h+='</div>';
 /* non-conformités */
 if(m.ev.length){const nc=ev.filter(e=>e.st==='NC'||e.st==='OBS');
  h+=`<div class="card wide"><h2>Points à traiter (${nc.length})</h2><div class="scroll"><table><tr><th>Statut</th><th>Point</th>${m.dims.map(d=>`<th>${esc(d)}</th>`).join('')}<th>Date</th><th>Commentaire</th></tr>`+
  nc.slice(0,300).map(e=>`<tr><td><span class="chip ${e.st}">${ST[e.st]}</span></td><td>${esc(e.q)}</td>${m.dims.map(d=>`<td>${esc(e.dims[d]??'')}</td>`).join('')}<td>${e.date?fmtD(e.date):''}</td><td>${esc(e.note)}</td></tr>`).join('')+`</table></div></div>`}
 /* données brutes */
 let rows=rowsF;const q=norm(S.q);if(q)rows=rows.filter(r=>r.some(v=>norm(isDate(v)?fmtD(v):v).includes(q)));
 if(S.sort)rows=[...rows].sort((a,b)=>{const x=a[S.sort.i],y=b[S.sort.i];const r=(typeof x==='number'&&typeof y==='number')?x-y:String(x??'').localeCompare(String(y??''),'fr');return S.sort.dir*r});
 const PG=50,pages=Math.max(1,Math.ceil(rows.length/PG));S.page=Math.min(S.page,pages-1);
 h+=`<div class="card wide"><h2>Données (${rows.length})</h2><p class="noprint"><input id="q" placeholder="Rechercher…" value="${esc(S.q)}"> <button id="pv">◀</button> ${S.page+1}/${pages} <button id="nx">▶</button></p>
 <div class="scroll"><table><tr>${m.head.map((x,i)=>`<th data-i="${i}">${esc(x)}${S.sort&&S.sort.i===i?(S.sort.dir>0?' ▲':' ▼'):''}</th>`).join('')}</tr>`+
 rows.slice(S.page*PG,S.page*PG+PG).map(r=>`<tr>${m.head.map((x,i)=>{const v=r[i];const st=m.cols[i].type==='status'?statusOf(v):null;return`<td>${st?`<span class="chip ${st}">${esc(v)}</span>`:esc(isDate(v)?fmtD(v):v)}</td>`}).join('')}</tr>`).join('')+`</table></div></div>`;
 app.innerHTML=h;
 const qi=$('#q');if(qi){qi.oninput=e=>{S.q=e.target.value;S.page=0;const p=e.target.selectionStart;render();const n=$('#q');n.focus();n.setSelectionRange(p,p)}}
}
function load(name){S.cur=name;S.filter=null;S.q='';S.sort=null;S.page=0;S.m=build(name);
 const sel=$('#sheetSel');const names=Object.keys(S.sheets);sel.style.display=names.length>1?'':'none';sel.innerHTML=names.map(n=>`<option ${n===name?'selected':''}>${esc(n)}</option>`).join('');render()}
async function handleFiles(files){
 if(TITRE_AUTO&&files[0]){const t=files[0].name.replace(/\.[^.]+$/,'').replace(/[_-]+/g,' ');$('#ttl').textContent=t;document.title=t}
 files=[...files].filter(f=>/\.(xlsx|xlsm|xls|csv)$/i.test(f.name));if(!files.length){alert('Aucun fichier Excel/CSV détecté');return}
 S.sheets={};for(const f of files){try{await readFile(f)}catch(e){console.error(e);alert('Lecture impossible : '+f.name)}}
 const names=Object.keys(S.sheets);if(!names.length){alert('Aucune feuille avec des données');return}
 load(MAPPING.sheet&&S.sheets[MAPPING.sheet]?MAPPING.sheet:names[0])}

/* ---------- évènements ---------- */
function setTheme(t){S.theme=t;document.documentElement.dataset.theme=t;try{localStorage.setItem('theme',t)}catch(e){}}
document.addEventListener('click',e=>{
 const b=e.target.closest('.bar[data-dim]');if(b){S.filter={dim:b.dataset.dim,val:b.dataset.val};S.page=0;render();return}
 if(e.target.id==='clr'){S.filter=null;render()}
 if(e.target.id==='pv'){S.page=Math.max(0,S.page-1);render()}
 if(e.target.id==='nx'){S.page++;render()}
 const th=e.target.closest('th[data-i]');if(th){const i=+th.dataset.i;S.sort=S.sort&&S.sort.i===i?{i,dir:-S.sort.dir}:{i,dir:1};render()}
 if(e.target.id==='btnUp'||e.target.closest('#drop'))$('#file').click();
});
$('#file').onchange=e=>handleFiles(e.target.files);
$('#sheetSel').onchange=e=>load(e.target.value);
$('#btnTheme').onclick=()=>setTheme(S.theme==='dark'?'light':'dark');
$('#btnPrint').onclick=()=>window.print();
$('#btnCsv').onclick=()=>{if(!S.m)return;const m=S.m,L=['Statut;Point;'+m.dims.join(';')+';Date;Commentaire'];
 filtered().forEach(e=>L.push([ST[e.st],e.q,...m.dims.map(d=>e.dims[d]??''),e.date?fmtD(e.date):'',e.note].map(x=>'"'+String(x).replace(/"/g,'""')+'"').join(';')));
 if(!m.ev.length){L.length=0;L.push(m.head.join(';'));m.data.forEach(r=>L.push(m.head.map((x,i)=>'"'+String(isDate(r[i])?fmtD(r[i]):r[i]??'').replace(/"/g,'""')+'"').join(';')))}
 const a=document.createElement('a');a.href=URL.createObjectURL(new Blob(['﻿'+L.join('\n')],{type:'text/csv'}));a.download='export.csv';a.click()};
['dragover','dragenter'].forEach(t=>document.addEventListener(t,e=>{e.preventDefault();$('#drop')?.classList.add('over')}));
document.addEventListener('dragleave',()=>$('#drop')?.classList.remove('over'));
document.addEventListener('drop',e=>{e.preventDefault();handleFiles(e.dataTransfer.files)});

/* ---------- démarrage ---------- */
document.documentElement.style.setProperty('--accent',MAPPING.accent);
$('#ttl').textContent=MAPPING.title;document.title=MAPPING.title;
let t0='light';try{t0=localStorage.getItem('theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}catch(e){}
setTheme(t0);render();
</script>
</body>
</html>

```


---
*Autres fichiers du dépôt (inutiles pour toi) : `dashboard.html` (même modèle), `skill/` (briques de code), `archive/` (ancienne méthode abandonnée).*
