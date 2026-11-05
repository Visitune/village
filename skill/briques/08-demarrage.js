/* ---------- démarrage ---------- */
document.documentElement.style.setProperty('--accent',MAPPING.accent);
$('#ttl').textContent=MAPPING.title;document.title=MAPPING.title;
let t0='light';try{t0=localStorage.getItem('theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}catch(e){}
setTheme(t0);render();
