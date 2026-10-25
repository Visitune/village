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
