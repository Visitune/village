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
