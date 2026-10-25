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
