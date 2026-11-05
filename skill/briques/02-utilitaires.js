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
