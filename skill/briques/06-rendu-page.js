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
