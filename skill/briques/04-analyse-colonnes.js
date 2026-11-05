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
