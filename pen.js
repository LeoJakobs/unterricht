/* Stift-Werkzeug für den Beamer: Stift, Textmarker, Laser, Radierer, Lasso, Tafel, Präsentation.
   Einbinden in jede Webseite: <script src="pen.js"></script> vor </body>.
   iPad: nur der Apple Pencil malt, der Finger scrollt und tippt Knöpfe an.
   Mac: Maus/Trackpad malt im Stift-Modus.
   Tasten: S Stift · M Textmarker · L Laser · R Radierer · A Lasso · T Tafel · P Präsentation ·
 G Lineal ([ ] drehen) ·
   1–4 Farbe · D Strichstärke · Z Rückgängig · Entf löschen · Esc aus
   Stift am Ende still halten = gerade Linie (rastet an Linienenden bzw. waagerecht/senkrecht ein)
   oder bei geschlossenem Strich: Kreis, Ellipse, Dreieck, Rechteck, Vieleck.
   Notizen hängen an Animation (pro Teil), Arbeitsblättern oder der Seite und werden im Browser gespeichert. */
(function(){
'use strict';
if(window.__pzLoaded)return;window.__pzLoaded=true;
var NS='http://www.w3.org/2000/svg';
var COLORS=[['#1d1d22','Schwarz'],['#1f5fd1','Blau'],['#d32f2f','Rot'],['#2e7d32','Grün']];
var MARK=['#ffd84d','#86b6ff','#ff9cbd','#8fe08f'];
var PALETTE=['#1d1d22','#5b6178','#9aa0b5','#ffffff','#1f5fd1','#0ea5e9','#14b8a6','#2e7d32','#65a30d','#facc15','#f59e0b','#ea580c','#d32f2f','#e11d48','#db2777','#c026d3','#7c3aed','#4f46e5','#92400e','#a16207','#ffd84d','#86b6ff','#ff9cbd','#8fe08f'];
var STICKERS=['⭐','🌟','👍','👏','✅','❌','❓','❗','💡','😀','🙂','😮','🤔','🥳','🎉','❤️','⚠️','➡️','🏆','💯','📌','✏️','👀','🧠'];
var BADGES=['Super!','Prima!','Merke!','Achtung!','Richtig','Falsch','?'];
var PFX='pz1:'+(location.pathname.split('/').pop()||'index')+':';
var st={mode:'off',color:0,pw:3,mw:18,sw:56,tw:28,stk:'⭐',tafel:false,pres:false};
try{var sv=JSON.parse(localStorage.getItem('pz1:settings')||'{}');['color','pw','mw','sw','tw'].forEach(function(k){if(typeof sv[k]==='number')st[k]=sv[k]});if(typeof sv.stk==='string')st.stk=sv.stk;
 if(Array.isArray(sv.cols))sv.cols.forEach(function(c,i){if(COLORS[i]&&/^#[0-9a-f]{6}$/i.test(c))COLORS[i][0]=c});if(Array.isArray(sv.marks))sv.marks.forEach(function(c,i){if(i<4&&/^#[0-9a-f]{6}$/i.test(c))MARK[i]=c})}catch(e){}
function saveSettings(){try{localStorage.setItem('pz1:settings',JSON.stringify({color:st.color,pw:st.pw,mw:st.mw,sw:st.sw,tw:st.tw,stk:st.stk,cols:COLORS.map(function(c){return c[0]}),marks:MARK}))}catch(e){}}
function inkMode(){return st.mode==='pen'||st.mode==='mark'}

/* ---------- Stil ---------- */
var css=document.createElement('style');
css.textContent=[
'#pz-layer{position:absolute;left:0;top:0;z-index:50;pointer-events:none;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}',
'#pz-layer.on{pointer-events:auto;touch-action:none;cursor:crosshair}',
'#pz-layer.laser,#pz-tafel.laser{cursor:none}',
'#pz-layer.lasso,#pz-tafel.lasso{cursor:default}',
'#pz-layer>svg{position:absolute;left:0;top:0;width:100%;height:100%;overflow:visible;pointer-events:none}',
'.pz-ov{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;overflow:visible;z-index:5}',
'#anim .paper{position:relative}',
'#pz-tafel svg{position:absolute;left:0;top:0;width:100%;height:100%;overflow:visible}',
'#pz-laser{position:fixed;left:0;top:0;z-index:80;pointer-events:none}',
'#pz-tafel{position:fixed;inset:0;z-index:60;background-color:#fff;background-image:linear-gradient(#c9dcec 1px,transparent 1px),linear-gradient(90deg,#c9dcec 1px,transparent 1px);background-size:28px 28px;touch-action:none;-webkit-user-select:none;user-select:none;cursor:crosshair}',
'#pz-tafel[hidden]{display:none}',
'#pz-thead{position:absolute;left:16px;top:14px;display:flex;gap:8px;align-items:center;z-index:2;font:600 17px/1 system-ui,sans-serif;color:#16192B}',
'#pz-thead button{min-width:44px;height:44px;border-radius:12px;border:2px solid #D5DAEC;background:#fff;font:600 17px/1 system-ui,sans-serif;color:#16192B;padding:0 12px;cursor:pointer}',
'#pz-thead button:disabled{opacity:.4}',
'#pz-thead .pz-pg{background:rgba(255,255,255,.9);padding:12px;border-radius:12px;border:2px solid #D5DAEC}',
'#pz-bar{position:fixed;right:14px;bottom:14px;z-index:90;display:flex;flex-direction:column-reverse;align-items:flex-end;gap:10px;font-family:system-ui,sans-serif}',
'#pz-fab{width:58px;height:58px;border-radius:50%;border:0;background:#6D3FE8;color:#fff;box-shadow:0 8px 22px -8px rgba(20,30,90,.6);cursor:pointer;display:grid;place-items:center;padding:0}',
'#pz-fab[aria-expanded=true]{background:#16192B}',
'#pz-panel{position:relative;display:grid;grid-template-columns:48px 48px;gap:6px;background:#fff;border:2px solid #D5DAEC;border-radius:18px;padding:8px;box-shadow:0 10px 28px -14px rgba(20,30,90,.45)}',
'#pz-panel[hidden]{display:none}',
'#pz-panel button{width:48px;height:48px;border-radius:12px;border:2px solid transparent;background:#F1F3FB;color:#16192B;cursor:pointer;display:grid;place-items:center;padding:0}',
'#pz-panel button[aria-pressed=true]{border-color:#16192B;background:#fff}',
'#pz-panel .pz-sep{grid-column:1/-1;height:2px;background:#E4E7F3;margin:1px 4px}',
'#pz-panel .pz-cols{grid-column:1/-1;display:flex;justify-content:space-between;padding:4px 3px}',
'#pz-panel .pz-cols button{width:20px;height:20px;border-radius:50%;border:3px solid #fff;box-shadow:0 0 0 2px #D5DAEC}',
'#pz-panel .pz-cols button[aria-pressed=true]{box-shadow:0 0 0 3px #16192B}',
'#pz-panel svg{width:26px;height:26px}',
'#pz-wpop{position:absolute;right:calc(100% + 10px);bottom:60px;width:230px;background:#fff;border:2px solid #D5DAEC;border-radius:16px;padding:12px 14px;box-shadow:0 10px 28px -14px rgba(20,30,90,.45);font:600 15px/1.2 system-ui,sans-serif;color:#16192B}',
'#pz-wpop[hidden]{display:none}',
'.pz-pop{position:absolute;right:calc(100% + 10px);bottom:0;width:248px;background:#fff;border:2px solid #D5DAEC;border-radius:16px;padding:12px;box-shadow:0 10px 28px -14px rgba(20,30,90,.45);font:600 14px/1.25 system-ui,sans-serif;color:#16192B}',
'.pz-pop[hidden]{display:none}',
'.pz-pop .pz-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:6px;margin:8px 0}',
'#pz-panel .pz-pop .pz-grid button{width:32px;height:32px;border-radius:50%;border:2px solid #D5DAEC;padding:0}',
'#pz-panel #pz-spop .pz-grid button{border-radius:10px;border:2px solid transparent;background:#F1F3FB;font-size:20px;line-height:1;font-family:"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif}',
'#pz-panel #pz-spop .pz-badges{display:flex;flex-wrap:wrap;gap:6px;margin-top:4px}',
'#pz-panel #pz-spop .pz-badges button{width:auto;height:34px;padding:0 10px;font:800 14px system-ui,sans-serif;border-radius:10px}',
'#pz-panel .pz-pop button[aria-pressed=true]{border-color:#16192B}',
'.pz-pop label{display:flex;align-items:center;gap:10px;margin-top:4px;cursor:pointer}',
'.pz-pop input[type=color]{width:44px;height:34px;border:2px solid #D5DAEC;border-radius:8px;padding:0;background:#fff}',
'.pz-pop .pz-hint{font-weight:500;color:#5B6178;font-size:13px;margin:0}',
'#pz-wpop input{width:100%;margin:10px 0 6px;accent-color:#6D3FE8;height:28px}',
'#pz-wpop .pz-prev{height:44px;display:flex;align-items:center;justify-content:center;background:#F7F8FC;border-radius:10px}',
'#pz-wpop .pz-prev span{display:block;width:150px;border-radius:99px}',
/* Präsentationsmodus */
'body.pz-pres{background:#fff}',
'body.pz-pres .hero,body.pz-pres .jump,body.pz-pres .pdfrow,body.pz-pres .sh h3,body.pz-pres footer{display:none!important}',
'body.pz-pres .wrap{max-width:none;padding:0 10px}',
'body.pz-pres main{padding:calc(8px + env(safe-area-inset-top)) 0 calc(8px + env(safe-area-inset-bottom))}',
'body.pz-pres .seg{margin:0 0 6px;gap:6px;justify-content:center}',
'body.pz-pres .seg button{min-height:34px;padding:4px 14px;font-size:14px}',
'body.pz-pres #anim .paper{width:min(100%,calc((var(--pz-vh,100vh) - 150px - env(safe-area-inset-top) - env(safe-area-inset-bottom))*1000/640));margin:0 auto;border-radius:10px}',
'body.pz-pres .bar{margin-top:6px;gap:6px;justify-content:center}',
'body.pz-pres .bar button,body.pz-pres .bar select{min-height:36px;font-size:14px;padding:0 12px;border-radius:10px}',
'body.pz-pres .bar button.pri{font-size:15px}',
'body.pz-pres .prog{margin-left:8px;width:auto;font-size:14px}',
'body.pz-pres .sheets{width:min(100%,calc((var(--pz-vh,100vh) - 80px - env(safe-area-inset-top) - env(safe-area-inset-bottom))*1588/1123 + 12px));margin:0 auto;gap:12px;grid-template-columns:1fr 1fr}',
'body.pz-pres #pz-bar{right:8px;bottom:calc(8px + env(safe-area-inset-bottom));gap:6px}',
'#pz-back{position:fixed;left:calc(10px + env(safe-area-inset-left));top:calc(10px + env(safe-area-inset-top));z-index:85;display:none;height:36px;padding:0 12px;align-items:center;border-radius:10px;border:2px solid #D5DAEC;background:rgba(255,255,255,.92);color:#16192B;font:600 14px/1 system-ui,sans-serif;text-decoration:none}',
'body.pz-pres #pz-back{display:inline-flex}',
'body.pz-pres #pz-fab{width:40px;height:40px;opacity:.6}',
'body.pz-pres #pz-fab svg{width:20px;height:20px}',
'body.pz-pres #pz-panel{padding:5px;gap:4px;border-radius:14px;grid-template-columns:36px 36px;opacity:.9}',
'body.pz-pres #pz-panel button{width:36px;height:36px;border-radius:10px}',
'body.pz-pres #pz-panel .pz-cols button{width:15px;height:15px}',
'body.pz-pres #pz-panel svg{width:20px;height:20px}',
'body.pz-pres #pz-wpop{bottom:40px}',
'#pz-blatt{position:fixed;inset:0;z-index:60;background:#dfe3ee;overflow:hidden;touch-action:none;-webkit-user-select:none;user-select:none;cursor:crosshair}',
'#pz-blatt[hidden]{display:none}','#pz-blatt.laser{cursor:none}','#pz-blatt.lasso{cursor:default}',
'#pz-bv{position:absolute!important;left:0;top:0;width:794px!important;height:1123px!important;overflow:hidden;border-radius:0!important;transform-origin:0 0;background:#fff;box-shadow:0 10px 40px -12px rgba(20,30,90,.5)}',
'#pz-bv>.pz-clone{position:absolute!important;left:0!important;top:0!important;transform:none!important;pointer-events:none}',
'#pz-blatt>svg.pz-bsv{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;overflow:visible;z-index:3}',
'.pz-head{position:absolute;left:16px;top:14px;display:flex;gap:8px;align-items:center;z-index:4}',
'.pz-head button{min-width:44px;height:44px;border-radius:12px;border:2px solid #D5DAEC;background:#fff;font:600 17px/1 system-ui,sans-serif;color:#16192B;padding:0 12px;cursor:pointer}',
'.pz-big{position:absolute;right:8px;top:8px;z-index:6;height:34px;padding:0 12px;border-radius:10px;border:2px solid #D5DAEC;background:rgba(255,255,255,.95);font:600 14px/1 system-ui,sans-serif;color:#16192B;cursor:pointer;box-shadow:0 3px 10px -4px rgba(20,30,90,.4)}',
'@media print{#pz-layer,#pz-laser,#pz-tafel,#pz-blatt,#pz-bar,#pz-ruler,.pz-ov,.pz-big{display:none!important}}'
].join('\n');
document.head.appendChild(css);

/* ---------- Symbole ---------- */
function ic(d,w){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="'+(w||2.2)+'" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+d+'</svg>'}
var I={
 pen:ic('<path d="M4 20l4-1L19 8l-3-3L5 16z"/><path d="M14 7l3 3"/>'),
 mark:ic('<path d="M9 15l-4 5h6l2-2"/><path d="M9 15l8-11 4 3-8 11z"/><path d="M4 21h16" stroke="#e8b800" stroke-width="3"/>'),
 hand:ic('<path d="M8 13V5a1.5 1.5 0 013 0v6"/><path d="M11 10V4a1.5 1.5 0 013 0v7"/><path d="M14 10V5.5a1.5 1.5 0 013 0V14a7 7 0 01-7 7 6 6 0 01-5-3l-2.5-4a1.4 1.4 0 012.3-1.6L8 15"/>'),
 laser:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="#d32f2f" opacity=".18"/><circle cx="12" cy="12" r="5" fill="#d32f2f"/></svg>',
 erase:ic('<path d="M7 20h12"/><path d="M4.5 14.5l9-9a2 2 0 012.8 0l3.2 3.2a2 2 0 010 2.8L13 18H8z"/><path d="M9 10l5 5"/>'),
 lasso:ic('<path d="M12 4c4.4 0 8 2.2 8 5s-3.6 5-8 5-8-2.2-8-5 3.6-5 8-5z" stroke-dasharray="3 2.6"/><path d="M7 13c-1 2-.5 4 1.5 4.5S10 20 9 21"/>'),
 undo:ic('<path d="M9 14L4 9l5-5"/><path d="M4 9h11a5 5 0 010 10h-3"/>'),
 trash:ic('<path d="M4 7h16"/><path d="M10 11v6M14 11v6"/><path d="M6 7l1 13h10l1-13"/><path d="M9 7V4h6v3"/>'),
 tafel:ic('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M3 15h18M9 4v16M15 4v16" stroke-width="1.2"/>'),
 pres:ic('<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>'),
 text:ic('<path d="M5 6V4h14v2"/><path d="M12 4v16"/><path d="M9 20h6"/>'),
 sticker:ic('<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5a4.5 4.5 0 007 0"/><path d="M9 9.5h.01M15 9.5h.01" stroke-width="3"/>'),
 palette:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="#7c3aed"/><path d="M12 2a10 10 0 010 20z" fill="#1f5fd1"/><path d="M12 2a10 10 0 00-8.66 15H12z" fill="#d32f2f"/><path d="M3.34 17A10 10 0 0012 22V17z" fill="#facc15"/><path d="M12 12h10a10 10 0 01-10 10z" fill="#2e7d32"/><circle cx="12" cy="12" r="4" fill="#fff"/></svg>',
 presOff:ic('<path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"/>')
};
function big(svg,n){return svg.replace('aria-hidden','width="'+n+'" height="'+n+'" aria-hidden')}

/* ---------- Speichern im Browser ---------- */
function load(k){try{var v=localStorage.getItem(PFX+k);return v?JSON.parse(v):null}catch(e){return null}}
function store(k,v){try{if(v==null)localStorage.removeItem(PFX+k);else localStorage.setItem(PFX+k,JSON.stringify(v))}catch(e){}}
var dirty={},saveT=0;
function markDirty(s){dirty[s.key]=s;clearTimeout(saveT);saveT=setTimeout(flush,250)}
function flush(){for(var k in dirty){var s=dirty[k];if(s.key==='tafel')saveTafel();else store(k,s.strokes.length?s.dump():null)}dirty={}}
addEventListener('pagehide',flush);
document.addEventListener('visibilitychange',function(){if(document.hidden)flush()});

/* ---------- Flächen ---------- */
function mk(tag,at,par){var e=document.createElementNS(NS,tag);for(var k in at)e.setAttribute(k,at[k]);if(par)par.appendChild(e);return e}
function pathD(p,str){
 if(str&&p.length>1)return 'M'+p.map(function(q){return (+q[0].toFixed(1))+' '+(+q[1].toFixed(1))}).join('L');
 if(p.length===1)return 'M'+p[0][0]+' '+p[0][1]+'l0.01 0';
 var f=function(v){return +v.toFixed(1)};var d='M'+f(p[0][0])+' '+f(p[0][1]);
 for(var i=1;i<p.length-1;i++){var mx=(p[i][0]+p[i+1][0])/2,my=(p[i][1]+p[i+1][1])/2;d+='Q'+f(p[i][0])+' '+f(p[i][1])+' '+mx.toFixed(1)+' '+my.toFixed(1)}
 var l=p[p.length-1];return d+'L'+f(l[0])+' '+f(l[1])}
function r1(v){return Math.round(v*10)/10}
/* svg: Zeichenfläche; box(): Bildschirmrechteck; W: Breite in Flächen-Einheiten (null = Pixel) */
function Surface(key,svg,box,W,data){this.key=key;this.box=box;this.W=W;this.g=mk('g',{},svg);this.strokes=[];
 var me=this;(data||[]).forEach(function(d){me.make(d.p,d.c,d.w,d.m,d.l,d.e,d.b)})}
Surface.prototype.scale=function(){if(this.W==='z')return 1/tv.z;if(!this.W)return 1;var r=this.box();return r.width?this.W/r.width:1};
Surface.prototype.pt=function(e){var r=this.box(),k=this.scale();return [r1((e.clientX-r.left)*k),r1((e.clientY-r.top)*k)]};
Surface.prototype.make=function(p,c,w,m,l,e,b){var s={pts:p,c:c,w:w,m:m?1:0,l:l||0};
 if(e){s.e=e;s.b=b||0;s.el=mk('text',{'text-anchor':'middle','dominant-baseline':'central'});s.el.textContent=e;
  s.el.style.fontFamily=b?'system-ui,-apple-system,"Segoe UI",sans-serif':'"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';
  if(b===2){s.el.style.fontFamily='system-ui,-apple-system,"Segoe UI",sans-serif';s.el.style.fontWeight='600';s.el.setAttribute('text-anchor','start');s.el.removeAttribute('dominant-baseline')}
  else if(b){s.el.style.fontWeight='800';s.el.setAttribute('stroke','#fff');s.el.setAttribute('stroke-linejoin','round');s.el.style.paintOrder='stroke'}
  upd(s);this.place(s);this.strokes.push(s);return s}
 s.el=mk('path',{d:pathD(p,l),fill:'none',stroke:c,'stroke-width':w,'stroke-linecap':'round','stroke-linejoin':'round'});
 if(m){s.el.setAttribute('stroke-opacity','0.45');s.el.style.mixBlendMode='multiply'}
 this.place(s);this.strokes.push(s);return s};
/* Textmarker liegt immer unter der Schrift */
Surface.prototype.place=function(s){if(s.m){var f=null;for(var i=0;i<this.g.childNodes.length;i++){var n=this.g.childNodes[i];if(!n._mk){f=n;break}}s.el._mk=1;this.g.insertBefore(s.el,f)}else this.g.appendChild(s.el)};
/* Stärken hängen am Blatt, nicht am Bildschirm: beim Zoomen bleibt der Stift relativ zum Inhalt gleich dick */
Surface.prototype.unit=function(){return 1};
Surface.prototype.begin=function(e){var m=st.mode==='mark';
 return this.make([this.pt(e)],m?MARK[st.color]:COLORS[st.color][0],r1((m?st.mw:st.pw)*this.unit()),m,0)};
Surface.prototype.add=function(s,e){var p=this.pt(e),l=s.pts[s.pts.length-1];if(Math.abs(l[0]-p[0])+Math.abs(l[1]-p[1])<1.2*this.scale())return;s.pts.push(p);s.el.setAttribute('d',pathD(s.pts))};
Surface.prototype.redraw=function(s){upd(s)};
function upd(s){if(s.e&&s.b===2){var x=r1(s.pts[0][0]),y=s.pts[0][1],fs=r1(s.w);s.el.setAttribute('font-size',fs);s.el.setAttribute('fill',s.c);s.el.setAttribute('x',x);s.el.setAttribute('y',r1(y+fs*0.9));
  while(s.el.firstChild)s.el.removeChild(s.el.firstChild);s.e.split('\n').forEach(function(t,i){var sp=mk('tspan',{x:x,dy:i?'1.25em':'0'},s.el);sp.textContent=t||'\u00a0'});return}
 if(s.e){s.el.setAttribute('x',r1(s.pts[0][0]));s.el.setAttribute('y',r1(s.pts[0][1]));s.el.setAttribute('font-size',r1(s.w));if(s.b){s.el.setAttribute('fill',s.c);s.el.setAttribute('stroke-width',r1(s.w*0.16))}return}s.el.setAttribute('d',pathD(s.pts,s.l))}
Surface.prototype.drop=function(s){var i=this.strokes.indexOf(s);if(i>=0)this.strokes.splice(i,1);s.el.remove()};
Surface.prototype.erase=function(e){var p=this.pt(e),k=this.scale(),hit=[];
 this.strokes.forEach(function(s){var r=12*k+s.w/2;
  if(s.e){var bb=ibox(s),pd=10*k;if(p[0]>=bb[0]-pd&&p[0]<=bb[2]+pd&&p[1]>=bb[1]-pd&&p[1]<=bb[3]+pd)hit.push(s);return}
  if(s.l){for(var j=0;j<s.pts.length;j++){if(segDist(p,s.pts[j],s.pts[j+1]||s.pts[j])<r){hit.push(s);return}}return}
  for(var i=0;i<s.pts.length;i++){var dx=s.pts[i][0]-p[0],dy=s.pts[i][1]-p[1];if(dx*dx+dy*dy<r*r){hit.push(s);break}}});
 var me=this;hit.forEach(function(s){me.drop(s)});return hit};
Surface.prototype.restore=function(list){var me=this;list.forEach(function(s){me.place(s);me.strokes.push(s)})};
Surface.prototype.dump=function(){return this.strokes.map(function(s){var o={c:s.c,w:s.w,p:s.pts.map(function(q){return [r1(q[0]),r1(q[1])]})};if(s.m)o.m=1;if(s.l)o.l=s.l;if(s.e){o.e=s.e;if(s.b)o.b=s.b}return o})};
Surface.prototype.show=function(on){this.g.style.display=on?'':'none'};
function segDist(p,a,b){if(!b)b=a;var dx=b[0]-a[0],dy=b[1]-a[1],L=dx*dx+dy*dy,t=L?((p[0]-a[0])*dx+(p[1]-a[1])*dy)/L:0;t=Math.max(0,Math.min(1,t));
 var x=a[0]+t*dx-p[0],y=a[1]+t*dy-p[1];return Math.sqrt(x*x+y*y)}
/* Rechteck eines Eintrags in Flächen-Einheiten */
function ibox(s){if(s.e){try{var b=s.el.getBBox();if(b.width||b.height)return [b.x,b.y,b.x+b.width,b.y+b.height]}catch(e){}var h=s.w/2;return [s.pts[0][0]-h,s.pts[0][1]-h,s.pts[0][0]+h,s.pts[0][1]+h]}
 var x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;s.pts.forEach(function(q){x0=Math.min(x0,q[0]);y0=Math.min(y0,q[1]);x1=Math.max(x1,q[0]);y1=Math.max(y1,q[1])});return [x0,y0,x1,y1]}
function move(s,dx,dy){s.pts.forEach(function(q){q[0]+=dx;q[1]+=dy});upd(s)}
function recolor(s,c){if(s.e&&!s.b)return;s.c=c;if(s.b)s.el.setAttribute('fill',c);else s.el.setAttribute('stroke',c)}

/* Rückgängig: eine Liste für alles, wirkt auf das, was gerade zu sehen ist */
var hist=[];
function push(h){hist.push(h);if(hist.length>300)hist.shift()}
function undo(){clearSel();var vis=visible();for(var i=hist.length-1;i>=0;i--){var h=hist[i];
 if(h.parts.every(function(p){return vis.indexOf(p.s)>=0})){hist.splice(i,1);
  h.parts.forEach(function(p){
   if(p.add)p.s.drop(p.add);
   if(p.addL)p.addL.forEach(function(x){p.s.drop(x)});
   if(p.tx){p.tx.item.e=p.tx.old;upd(p.tx.item)}
   if(p.snap)p.snap.forEach(function(o){o.s.pts=o.pts;o.s.w=o.w;if(!o.s.e)o.s.el.setAttribute('stroke-width',o.w);p.s.redraw(o.s)});
   if(p.del)p.s.restore(p.del);
   if(p.mv)p.mv.list.forEach(function(s){move(s,-p.mv.dx,-p.mv.dy)});
   if(p.rc)p.rc.list.forEach(function(s,j){recolor(s,p.rc.old[j])});
   if(p.ln){p.ln.s.pts=p.ln.old;p.ln.s.l=0;p.s.redraw(p.ln.s)}
   markDirty(p.s)});return}}}
function clearAll(){if(sel){deleteSel();return}var parts=[];visible().forEach(function(s){if(!s.strokes.length)return;var l=s.strokes.slice();l.forEach(function(x){s.drop(x)});parts.push({s:s,del:l});markDirty(s)});if(parts.length)push({parts:parts})}

/* Notizflächen: Animation (je Teil), Arbeitsblätter und die ganze Seite */
var paper=document.querySelector('#anim .paper'),animOv=null,animS={};
if(paper)animOv=mk('svg',{'class':'pz-ov',viewBox:'0 0 1000 640',preserveAspectRatio:'none'},paper);
function animOn(){return paper&&!document.getElementById('anim').hidden}
function animSurf(){var k='anim-'+(window.sc||'x');
 if(!animS[k])animS[k]=new Surface(k,animOv,function(){return paper.getBoundingClientRect()},1000,load(k));
 for(var j in animS)animS[j].show(j===k);return animS[k]}
var sheetS=[];
document.querySelectorAll('[data-sheet]').forEach(function(w,i){
 var box=w.closest('.sheets')||document.body,idx=Array.prototype.indexOf.call(box.querySelectorAll('[data-sheet]'),w);
 var k='sheet-'+(box.id||'x')+'-'+idx,ov=mk('svg',{'class':'pz-ov',viewBox:'0 0 794 1123',preserveAspectRatio:'none'},w);
 var s=new Surface(k,ov,function(){return w.getBoundingClientRect()},794,load(k));s.wrap=w;w._pz=s;sheetS.push(s)});

var layer=document.createElement('div');layer.id='pz-layer';document.body.appendChild(layer);
var lsv=mk('svg',{},layer),pageS={};
function pageKey(){return 'page'+(location.hash||'').replace(/[^\w-]/g,'-')}
function pageBox(){var r=layer.getBoundingClientRect();return {left:r.left,top:r.top,width:0}}
function pageSurf(){var k=pageKey();if(!pageS[k])pageS[k]=new Surface(k,lsv,pageBox,null,load(k));for(var j in pageS)pageS[j].show(j===k);return pageS[k]}
function ovHost(){return st.blatt?blatt:st.tafel?tafel:null}
function hostEl(){return ovHost()||layer}
function visible(){if(st.blatt)return [st.blatt];if(st.tafel)return [pages[pi]];var v=[pageSurf()];
 if(animOn())v.push(animSurf());
 sheetS.forEach(function(s){if(s.wrap.offsetParent!==null)v.push(s)});return v}
pageSurf();
if(paper){animSurf();var lastSc=window.sc;setInterval(function(){if(window.sc!==lastSc){lastSc=window.sc;clearSel();animSurf()}},300)}
addEventListener('hashchange',function(){clearSel();pageSurf();setTimeout(sizeLayer,80)});
function surfAt(e){if(st.blatt)return st.blatt;if(st.tafel)return pages[pi];var el=under(e);
 if(el){if(paper&&paper.contains(el)&&animOn())return animSurf();var w=el.closest('[data-sheet]');if(w&&w._pz)return w._pz}
 return pageSurf()}
function sizeLayer(){layer.style.height='0px';layer.style.width='0px';var de=document.documentElement;layer.style.width=de.scrollWidth+'px';layer.style.height=de.scrollHeight+'px'}
sizeLayer();addEventListener('resize',sizeLayer);addEventListener('load',sizeLayer);
if(window.ResizeObserver)new ResizeObserver(function(){requestAnimationFrame(sizeLayer)}).observe(document.body);

/* Tafel: leere Karo-Seiten */
var tafel=document.createElement('div');tafel.id='pz-tafel';tafel.hidden=true;
tafel.innerHTML='<div id="pz-thead"><button type="button" id="pz-tclose" title="Tafel schließen (Esc)">✕ Schließen</button><button type="button" id="pz-tprev" title="Vorige Seite">‹</button><span class="pz-pg" id="pz-tpg">Seite 1 / 1</span><button type="button" id="pz-tnext" title="Nächste Seite">›</button><button type="button" id="pz-tnew" title="Neue leere Seite">+ Neue Seite</button><button type="button" id="pz-tzoom" title="Zoom zurücksetzen (zwei Finger zum Zoomen, ein Finger zum Verschieben)">100 %</button><button type="button" id="pz-tsave" title="Diese Seite als Bild speichern">Als Bild speichern</button><span id="pz-tmsg" style="font-size:14px;color:#5B6178"></span></div>';
var tsv=mk('svg',{});tafel.appendChild(tsv);document.body.appendChild(tafel);
var tw=mk('g',{},tsv),tv={z:1,x:0,y:0};
var tbox=function(){return {left:tv.x,top:tv.y,width:0}};
function tview(){tw.setAttribute('transform','translate('+tv.x+' '+tv.y+') scale('+tv.z+')');
 tafel.style.backgroundSize=(28*tv.z)+'px '+(28*tv.z)+'px';tafel.style.backgroundPosition=tv.x+'px '+tv.y+'px';
 var zb=document.getElementById('pz-tzoom');if(zb)zb.textContent=Math.round(tv.z*100)+' %';if(sel)selBox()}
function tzoom(nz,cx,cy){nz=Math.max(0.3,Math.min(5,nz));tv.x=cx-(cx-tv.x)/tv.z*nz;tv.y=cy-(cy-tv.y)/tv.z*nz;tv.z=nz;tview()}
var tdata=load('tafel')||[[]],pages=tdata.map(function(d){return new Surface('tafel',tw,tbox,'z',d)}),pi=0;
function saveTafel(){var any=pages.some(function(p){return p.strokes.length});store('tafel',any?pages.map(function(p){return p.dump()}):null)}
function showPage(){pages.forEach(function(p,i){p.show(i===pi)});
 document.getElementById('pz-tpg').textContent='Seite '+(pi+1)+' / '+pages.length;
 document.getElementById('pz-tprev').disabled=pi===0;document.getElementById('pz-tnext').disabled=pi===pages.length-1}
document.getElementById('pz-tclose').onclick=function(){setTafel(false)};
document.getElementById('pz-tprev').onclick=function(){clearSel();if(pi>0){pi--;showPage()}};
document.getElementById('pz-tnext').onclick=function(){clearSel();if(pi<pages.length-1){pi++;showPage()}};
document.getElementById('pz-tnew').onclick=function(){clearSel();pages.push(new Surface('tafel',tw,tbox,'z'));pi=pages.length-1;showPage()};
document.getElementById('pz-tzoom').onclick=function(){tv={z:1,x:0,y:0};tview()};
document.getElementById('pz-tsave').onclick=function(){exportPage()};
showPage();tview();

/* Tafel-Seite als PNG speichern (Inhalt mit Rand, Karo-Hintergrund) */
function saveBlob(blob,name,msg){
 (async function(){try{var d=window.claude&&window.claude.use&&await window.claude.use('downloads');
  if(d){await d.save({filename:name,data:blob});msg('Gespeichert.');return}}catch(e){if(e&&e.code==='declined'){msg('Abgebrochen.');return}}
  try{var u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(u)},4000);msg('Gespeichert.')}
  catch(e){msg('Speichern hat nicht geklappt.')}})()}
function exportPage(){var pg=pages[pi],m=document.getElementById('pz-tmsg');function msg(t){m.textContent=t;setTimeout(function(){m.textContent=''},3000)}
 if(!pg.strokes.length){msg('Die Seite ist leer.');return}
 var x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;pg.strokes.forEach(function(s){s.pts.forEach(function(q){x0=Math.min(x0,q[0]-s.w);y0=Math.min(y0,q[1]-s.w);x1=Math.max(x1,q[0]+s.w);y1=Math.max(y1,q[1]+s.w)})});
 x0=Math.floor((x0-40)/28)*28;y0=Math.floor((y0-40)/28)*28;x1=Math.ceil((x1+40)/28)*28;y1=Math.ceil((y1+40)/28)*28;
 var W=x1-x0,H=y1-y0,S=Math.min(2,4000/Math.max(W,H));
 var svg='<svg xmlns="http://www.w3.org/2000/svg" width="'+Math.round(W*S)+'" height="'+Math.round(H*S)+'" viewBox="'+x0+' '+y0+' '+W+' '+H+'"><defs><pattern id="g" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M28 0H0V28" fill="none" stroke="#c9dcec" stroke-width="1"/></pattern></defs><rect x="'+x0+'" y="'+y0+'" width="'+W+'" height="'+H+'" fill="#fff"/><rect x="'+x0+'" y="'+y0+'" width="'+W+'" height="'+H+'" fill="url(#g)"/>'+
  pg.strokes.map(function(s){if(s.e){var c=s.el.cloneNode(true);c.removeAttribute('style');c.setAttribute('font-family',s.el.style.fontFamily||'sans-serif');if(s.el.style.fontWeight)c.setAttribute('font-weight',s.el.style.fontWeight);if(s.b===1)c.setAttribute('paint-order','stroke');return new XMLSerializer().serializeToString(c).replace(/ xmlns="[^"]*"/,'')}return '<path d="'+pathD(s.pts,s.l)+'" fill="none" stroke="'+s.c+'" stroke-width="'+s.w+'" stroke-linecap="round" stroke-linejoin="round"'+(s.m?' stroke-opacity="0.45"':'')+'/>'}).join('')+'</svg>';
 var img=new Image();img.onload=function(){var c=document.createElement('canvas');c.width=Math.round(W*S);c.height=Math.round(H*S);c.getContext('2d').drawImage(img,0,0,c.width,c.height);
  c.toBlob(function(b){var d=new Date(),ds=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');saveBlob(b,'Tafel_'+ds+'_Seite'+(pi+1)+'.png',msg)},'image/png')};
 img.onerror=function(){msg('Speichern hat nicht geklappt.')};
 img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg)}

/* Tafel: ein Finger verschiebt, zwei Finger zoomen; Mac: Scrollen verschiebt, Pinch/Strg+Scrollen zoomt */
var tt={};
tafel.addEventListener('pointerdown',function(e){if(e.pointerType!=='touch'||e.target.closest('#pz-thead'))return;tt0=[e.clientX,e.clientY,performance.now(),Object.keys(tt).filter(function(k){return k!=='_s'}).length];tt[e.pointerId]=[e.clientX,e.clientY];tt._s=null});
tafel.addEventListener('pointermove',function(e){if(e.pointerType!=='touch'||!tt[e.pointerId])return;var o=tt[e.pointerId],ids=Object.keys(tt).filter(function(k){return k!=='_s'});
 if(ids.length===1){tv.x+=e.clientX-o[0];tv.y+=e.clientY-o[1];tt[e.pointerId]=[e.clientX,e.clientY];tview();return}
 tt[e.pointerId]=[e.clientX,e.clientY];var a=tt[ids[0]],b=tt[ids[1]],cx=(a[0]+b[0])/2,cy=(a[1]+b[1])/2,d=Math.hypot(a[0]-b[0],a[1]-b[1]);
 if(!tt._s){tt._s={d:d,cx:cx,cy:cy};return}
 tv.x+=cx-tt._s.cx;tv.y+=cy-tt._s.cy;tzoom(tv.z*d/tt._s.d,cx,cy);tt._s={d:d,cx:cx,cy:cy}});
var tt0=null;
function ttEnd(e){if(e.type==='pointerup'&&tt0&&tt0[3]===0&&tt[e.pointerId]&&st.mode==='text'&&Math.abs(e.clientX-tt0[0])+Math.abs(e.clientY-tt0[1])<8&&performance.now()-tt0[2]<500&&!e.target.closest('#pz-thead'))textTap(e,true);delete tt[e.pointerId];tt._s=null}
tafel.addEventListener('pointerup',ttEnd);tafel.addEventListener('pointercancel',ttEnd);
tafel.addEventListener('wheel',function(e){e.preventDefault();if(e.ctrlKey)tzoom(tv.z*Math.exp(-e.deltaY*0.01),e.clientX,e.clientY);else{tv.x-=e.deltaX;tv.y-=e.deltaY;tview()}},{passive:false});

/* ---------- Lineal mit Winkelanzeige ----------
   Finger/Maus ziehen = verschieben, runder Griff = drehen, zwei Finger = drehen;
   Stift oder Textmarker nahe einer Kante zeichnet exakt an der Kante entlang. */
var RL={on:false,x:0,y:0,a:0,L:640,H:76};
var rul=document.createElement('div');rul.id='pz-ruler';
rul.style.cssText='position:fixed;left:0;top:0;width:'+RL.L+'px;height:'+RL.H+'px;z-index:70;display:none;touch-action:none;cursor:move;-webkit-user-select:none;user-select:none';
(function(){var t='';for(var i=0;i<=RL.L-40;i+=8){var cm=i%40===0,h=cm?18:(i%20===0?12:7);t+='<path d="M'+(20+i)+' 0v'+h+'M'+(20+i)+' '+RL.H+'v-'+h+'" stroke="#2b3150" stroke-width="'+(cm?1.6:1)+'"/>';if(cm&&i>0)t+='<text x="'+(20+i)+'" y="32" font-size="12" text-anchor="middle" fill="#2b3150" font-family="system-ui,sans-serif">'+(i/40)+'</text>'}
 rul.innerHTML='<svg width="'+RL.L+'" height="'+RL.H+'" style="display:block;overflow:visible"><rect x="0" y="0" width="'+RL.L+'" height="'+RL.H+'" rx="8" fill="rgba(240,244,255,.82)" stroke="#6D3FE8" stroke-width="2"/>'+t+
 '<text id="pz-rang" x="'+(RL.L/2)+'" y="56" font-size="18" font-weight="700" text-anchor="middle" fill="#6D3FE8" font-family="system-ui,sans-serif">0°</text></svg>'+
 '<div id="pz-rrot" title="Drehen" style="position:absolute;right:-22px;top:50%;width:40px;height:40px;margin-top:-20px;border-radius:50%;background:#6D3FE8;color:#fff;display:grid;place-items:center;cursor:grab;box-shadow:0 4px 12px -4px rgba(20,30,90,.5)">'+ic('<path d="M20 12a8 8 0 11-3-6.2"/><path d="M20 4v5h-5"/>')+'</div>'})();
document.body.appendChild(rul);
function rview(){rul.style.transform='translate('+(RL.x-RL.L/2)+'px,'+(RL.y-RL.H/2)+'px) rotate('+RL.a+'deg)';
 var d=((Math.round(-RL.a)%180)+180)%180;document.getElementById('pz-rang').textContent=d+'°';
 document.getElementById('pz-rang').setAttribute('transform',Math.abs(((RL.a%360)+360)%360-180)<90?'rotate(180 '+RL.L/2+' 50)':'')}
function setRuler(on){RL.on=on;if(on&&!RL.x){RL.x=innerWidth/2;RL.y=innerHeight/2}rul.style.display=on?'block':'none';rview();sync()}
function snapAng(a){var r=Math.round(a/15)*15;return Math.abs(a-r)<2.5?r:a}
/* Kante in der Nähe? Liefert den Abstand der Kante von der Mittellinie */
function rulHit(e){if(!RL.on||st.tafel&&false)return null;var t=RL.a*Math.PI/180,ux=Math.cos(t),uy=Math.sin(t),px=e.clientX-RL.x,py=e.clientY-RL.y;
 var along=px*ux+py*uy,off=-px*uy+py*ux;if(Math.abs(along)>RL.L/2+10)return null;
 var w=(st.mode==='mark'?st.mw:st.pw)/2+1;
 if(Math.abs(off+RL.H/2)<30)return {o:-RL.H/2-w};if(Math.abs(off-RL.H/2)<30)return {o:RL.H/2+w};return null}
function rulProj(e,h){var t=RL.a*Math.PI/180,ux=Math.cos(t),uy=Math.sin(t),px=e.clientX-RL.x,py=e.clientY-RL.y,along=px*ux+py*uy;
 return [RL.x+along*ux-h.o*uy,RL.y+along*uy+h.o*ux]}
var rg={};
rul.addEventListener('pointerdown',function(e){e.preventDefault();e.stopPropagation();
 /* Stift auf dem Lineal: an der Kante zeichnen */
 if(inkMode()&&(e.pointerType==='pen'||(e.pointerType==='mouse'&&rulHit(e)&&!e.target.closest('#pz-rrot')))){rul.setPointerCapture(e.pointerId);rg.draw=e.pointerId;down(e,!!ovHost());return}
 rul.setPointerCapture(e.pointerId);rg[e.pointerId]=[e.clientX,e.clientY];
 rg.rot=!!e.target.closest('#pz-rrot');rg.two=null});
rul.addEventListener('pointermove',function(e){
 if(rg.draw===e.pointerId){moveEv(e);return}
 var o=rg[e.pointerId];if(!o)return;var ids=Object.keys(rg).filter(function(k){return /^\d+$/.test(k)});
 if(rg.rot){RL.a=snapAng(Math.atan2(e.clientY-RL.y,e.clientX-RL.x)*180/Math.PI);rview();return}
 if(ids.length>=2){rg[e.pointerId]=[e.clientX,e.clientY];var a=rg[ids[0]],b=rg[ids[1]],ang=Math.atan2(b[1]-a[1],b[0]-a[0])*180/Math.PI,cx=(a[0]+b[0])/2,cy=(a[1]+b[1])/2;
  if(rg.two){RL.a0+=ang-rg.two.ang;RL.a=snapAng(RL.a0);RL.x+=cx-rg.two.cx;RL.y+=cy-rg.two.cy;rview()}else RL.a0=RL.a;rg.two={ang:ang,cx:cx,cy:cy};return}
 RL.x+=e.clientX-o[0];RL.y+=e.clientY-o[1];rg[e.pointerId]=[e.clientX,e.clientY];rview()});
function rEnd(e){if(rg.draw===e.pointerId){rg.draw=null;up(e,!!ovHost());return}delete rg[e.pointerId];rg.two=null;rg.rot=false}
rul.addEventListener('pointerup',rEnd);rul.addEventListener('pointercancel',rEnd);
rul.addEventListener('wheel',function(e){e.preventDefault();e.stopPropagation();RL.a+=e.deltaY>0?1:-1;rview()},{passive:false});
rul.addEventListener('touchmove',function(e){e.preventDefault()},{passive:false});

/* ---------- Blatt-Ansicht: Arbeitsblatt bildschirmfüllend mit eigenem Zoom ----------
   Die Notizen-Ebene des Blatts wird hierher verschoben, es gibt also nur einen Datenstand. */
var blatt=document.createElement('div');blatt.id='pz-blatt';blatt.hidden=true;
blatt.innerHTML='<div class="pz-head"><button type="button" id="pz-bclose" title="Zurück zur Seite (Esc)">✕ Schließen</button><button type="button" id="pz-bfit" title="Ganzes Blatt zeigen">Ganzes Blatt</button><button type="button" id="pz-bwide" title="Auf Breite zoomen">Breite</button><button type="button" id="pz-bzoom" title="Zoom">100 %</button></div><div id="pz-bv"></div>';
var bsv=mk('svg',{'class':'pz-bsv'});blatt.appendChild(bsv);document.body.appendChild(blatt);
var bv=blatt.querySelector('#pz-bv'),bvw={z:1,x:0,y:0},bOld=null;
function bview(){bv.style.transform='translate('+bvw.x+'px,'+bvw.y+'px) scale('+bvw.z+')';document.getElementById('pz-bzoom').textContent=Math.round(bvw.z*100)+' %';if(sel)selBox()}
function bzoom(nz,cx,cy){nz=Math.max(0.2,Math.min(6,nz));bvw.x=cx-(cx-bvw.x)/bvw.z*nz;bvw.y=cy-(cy-bvw.y)/bvw.z*nz;bvw.z=nz;bview()}
function bfit(wide){var W=innerWidth,H=innerHeight,top=70;bvw.z=wide?(W-24)/794:Math.min((W-24)/794,(H-top-12)/1123);bvw.x=(W-794*bvw.z)/2;bvw.y=top;bview()}
function openBlatt(s){if(!s||!s.wrap)return;clearSel();hidePaste();if(st.tafel)setTafel(false);
 var src=s.wrap.querySelector('.sheet')||s.wrap.firstElementChild,cl=src.cloneNode(true);cl.classList.add('pz-clone');
 bv.className=s.wrap.className;
 bv.innerHTML='';bv.appendChild(cl);
 var ov=s.g.parentNode;bOld={s:s,ov:ov,box:s.box};bv.appendChild(ov);s.box=function(){return bv.getBoundingClientRect()};
 st.blatt=s;blatt.hidden=false;if(st.mode==='off'||st.mode==='erase'&&false)st.mode='pen';openPanel();bfit(innerWidth<innerHeight);sync()}
function closeBlatt(){if(!st.blatt)return;clearSel();hidePaste();var o=bOld;o.s.wrap.appendChild(o.ov);o.s.box=o.box;bv.innerHTML='';st.blatt=null;blatt.hidden=true;bOld=null;act=null;sync()}
document.getElementById('pz-bclose').onclick=closeBlatt;
document.getElementById('pz-bfit').onclick=function(){bfit(false)};
document.getElementById('pz-bwide').onclick=function(){bfit(true)};
document.getElementById('pz-bzoom').onclick=function(){var cx=innerWidth/2,cy=innerHeight/2;bzoom(1,cx,cy)};
/* ein Finger verschiebt, zwei Finger zoomen; Mac: Scrollen verschiebt, Pinch/Strg+Scrollen zoomt */
var bt={};
blatt.addEventListener('pointerdown',function(e){if(e.pointerType!=='touch'||e.target.closest('.pz-head'))return;bt0=[e.clientX,e.clientY,performance.now(),Object.keys(bt).filter(function(k){return k!=='_s'}).length];bt[e.pointerId]=[e.clientX,e.clientY];bt._s=null});
blatt.addEventListener('pointermove',function(e){if(e.pointerType!=='touch'||!bt[e.pointerId])return;var o=bt[e.pointerId],ids=Object.keys(bt).filter(function(k){return k!=='_s'});
 if(ids.length===1){bvw.x+=e.clientX-o[0];bvw.y+=e.clientY-o[1];bt[e.pointerId]=[e.clientX,e.clientY];bview();return}
 bt[e.pointerId]=[e.clientX,e.clientY];var a=bt[ids[0]],b=bt[ids[1]],cx=(a[0]+b[0])/2,cy=(a[1]+b[1])/2,d=Math.hypot(a[0]-b[0],a[1]-b[1]);
 if(!bt._s){bt._s={d:d,cx:cx,cy:cy};return}
 bvw.x+=cx-bt._s.cx;bvw.y+=cy-bt._s.cy;bzoom(bvw.z*d/bt._s.d,cx,cy);bt._s={d:d,cx:cx,cy:cy}});
var bt0=null;
function btEnd(e){if(e.type==='pointerup'&&bt0&&bt0[3]===0&&bt[e.pointerId]&&st.mode==='text'&&Math.abs(e.clientX-bt0[0])+Math.abs(e.clientY-bt0[1])<8&&performance.now()-bt0[2]<500&&!e.target.closest('.pz-head'))textTap(e,true);delete bt[e.pointerId];bt._s=null}
blatt.addEventListener('pointerup',btEnd);blatt.addEventListener('pointercancel',btEnd);
blatt.addEventListener('wheel',function(e){e.preventDefault();if(e.ctrlKey)bzoom(bvw.z*Math.exp(-e.deltaY*0.01),e.clientX,e.clientY);else{bvw.x-=e.deltaX;bvw.y-=e.deltaY;bview()}},{passive:false});
blatt.addEventListener('touchmove',function(e){if(!e.target.closest('.pz-head'))e.preventDefault()},{passive:false});
addEventListener('resize',function(){if(st.blatt&&sel)selBox()});
/* Knopf „Blatt groß“ auf jedem Arbeitsblatt */
sheetS.forEach(function(s){var b=document.createElement('button');b.type='button';b.className='pz-big';b.textContent='⤢ Blatt groß';b.title='Blatt bildschirmfüllend öffnen und zoomen';
 b.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();openBlatt(s)});s.wrap.appendChild(b)});

/* ---------- Leiste bleibt beim Reinzoomen (zwei Finger) sichtbar und gleich groß ---------- */
function pinVV(){var vv=window.visualViewport;if(!vv)return;
 if(vv.scale>1.02){bar.style.right='auto';bar.style.bottom='auto';bar.style.left='0';bar.style.top='0';bar.style.transformOrigin='0 0';
  bar.style.transform='translate('+(vv.offsetLeft+vv.width)+'px,'+(vv.offsetTop+vv.height)+'px) scale('+(1/vv.scale)+') translate(calc(-100% - 14px),calc(-100% - 14px))'}
 else{bar.style.right='';bar.style.bottom='';bar.style.left='';bar.style.top='';bar.style.transform='';bar.style.transformOrigin=''}}
if(window.visualViewport){visualViewport.addEventListener('resize',pinVV);visualViewport.addEventListener('scroll',pinVV)}

/* ---------- Laserpointer ---------- */
var lc=document.createElement('canvas');lc.id='pz-laser';document.body.appendChild(lc);
var cx=lc.getContext('2d'),lstr=[],dot=null,dotT=0,dotPen=false,raf=0;
function sizeLaser(){var dpr=window.devicePixelRatio||1;lc.style.width=innerWidth+'px';lc.style.height=innerHeight+'px';lc.width=innerWidth*dpr;lc.height=innerHeight*dpr;cx.setTransform(dpr,0,0,dpr,0,0)}
sizeLaser();addEventListener('resize',sizeLaser);if(window.visualViewport)visualViewport.addEventListener('resize',sizeLaser);
/* Laserlinie bleibt voll sichtbar, solange der Stift aufliegt, und verblasst erst nach dem Abheben */
var FADE=900;
function tick(){raf=0;var now=performance.now();cx.clearRect(0,0,innerWidth,innerHeight);
 lstr=lstr.filter(function(l){return !l.end||now-l.end<FADE});
 cx.lineCap='round';cx.lineJoin='round';
 lstr.forEach(function(l){if(l.p.length<2)return;var k=l.end?1-(now-l.end)/FADE:1;
  cx.strokeStyle='rgba(255,40,40,'+(0.9*k).toFixed(3)+')';cx.lineWidth=4+3*k;cx.shadowColor='rgba(255,0,0,.8)';cx.shadowBlur=14*k;
  cx.beginPath();cx.moveTo(l.p[0][0],l.p[0][1]);for(var i=1;i<l.p.length;i++)cx.lineTo(l.p[i][0],l.p[i][1]);cx.stroke()});
 cx.shadowBlur=0;
 /* Punkt: bei Maus sichtbar, bis sie die Seite verlässt; beim Stift nur, solange er da ist */
 var show=dot&&st.mode==='laser'&&(dotPen?now-dotT<120:now-dotT<4000);
 if(show){var g=cx.createRadialGradient(dot.x,dot.y,0,dot.x,dot.y,22);g.addColorStop(0,'rgba(255,60,60,.55)');g.addColorStop(1,'rgba(255,0,0,0)');
  cx.fillStyle=g;cx.beginPath();cx.arc(dot.x,dot.y,22,0,7);cx.fill();
  cx.fillStyle='#ff2a2a';cx.beginPath();cx.arc(dot.x,dot.y,7,0,7);cx.fill();
  cx.fillStyle='rgba(255,255,255,.85)';cx.beginPath();cx.arc(dot.x-2,dot.y-2,2.2,0,7);cx.fill()}
 if(lstr.length||show)raf=requestAnimationFrame(tick)}
function kick(){if(!raf)raf=requestAnimationFrame(tick)}
function laserMove(e,down,first){dot={x:e.clientX,y:e.clientY};dotT=performance.now();dotPen=e.pointerType==='pen'&&!down;
 if(down){if(first||!lstr.length||lstr[lstr.length-1].end)lstr.push({p:[],end:0});lstr[lstr.length-1].p.push([e.clientX,e.clientY])}kick()}
function laserUp(){lstr.forEach(function(l){if(!l.end)l.end=performance.now()});dotPen=true;dotT=0;kick()}
function laserHide(){dot=null;kick()}

/* ---------- Gerade Linien und Einrasten ---------- */
var HOLD=450,SNAP=16;
/* nächstes Linienende in der Nähe (andere gerade Linien derselben Fläche) */
function snapPt(surf,p,except){var r=SNAP*surf.scale(),best=null,bd=r;
 surf.strokes.forEach(function(s){if(s.l!==1||s===except)return;[s.pts[0],s.pts[1]].forEach(function(q){var d=Math.hypot(q[0]-p[0],q[1]-p[1]);if(d<bd){bd=d;best=q}})});
 return best?[best[0],best[1]]:p}
function holdArm(a,e){clearTimeout(a.holdT);a.hx=e.clientX;a.hy=e.clientY;
 a.holdT=setTimeout(function(){if(act!==a||!a.s||a.straight)return;var p=a.s.pts,f=p[0],l=p[p.length-1],k=a.surf.scale();
  var sh=closedShape(p,k);
  if(sh){a.shaped=true;a.s.l=2;a.s.pts=sh;a.surf.redraw(a.s);return}
  if(Math.hypot(l[0]-f[0],l[1]-f[1])<20*k)return;
  a.straight=true;a.s.l=1;var f2=snapPt(a.surf,f,a.s);a.s.pts=[f2,lineEnd(a.surf,f2,l,a.s)];a.surf.redraw(a.s)},HOLD)}
/* Linienende: erst an andere Linienenden einrasten, sonst waagerecht/senkrecht */
function lineEnd(surf,a,p,except){var q=snapPt(surf,p,except);if(q!==p)return q;
 var dx=p[0]-a[0],dy=p[1]-a[1],t=Math.tan(6*Math.PI/180);
 if(Math.abs(dy)<t*Math.abs(dx))return [p[0],a[1]];if(Math.abs(dx)<t*Math.abs(dy))return [a[0],p[1]];return p}
/* Formerkennung: geschlossener Strich wird Kreis/Ellipse, Dreieck, Rechteck oder Vieleck */
function rdp(pts,eps){if(pts.length<3)return pts.slice();var a=pts[0],b=pts[pts.length-1],mi=0,md=0;
 for(var i=1;i<pts.length-1;i++){var d=segDist(pts[i],a,b);if(d>md){md=d;mi=i}}
 if(md>eps){var l=rdp(pts.slice(0,mi+1),eps),r=rdp(pts.slice(mi),eps);return l.slice(0,-1).concat(r)}return [a,b]}
function closedShape(p,k){if(p.length<8)return null;
 var x0=1e9,y0=1e9,x1=-1e9,y1=-1e9,len=0;p.forEach(function(q,i){x0=Math.min(x0,q[0]);y0=Math.min(y0,q[1]);x1=Math.max(x1,q[0]);y1=Math.max(y1,q[1]);if(i)len+=Math.hypot(q[0]-p[i-1][0],q[1]-p[i-1][1])});
 var w=x1-x0,h=y1-y0,diag=Math.hypot(w,h),f=p[0],l=p[p.length-1];
 if(diag<30*k||len<80*k||Math.hypot(l[0]-f[0],l[1]-f[1])>Math.max(28*k,0.22*diag))return null;
 var cx=(x0+x1)/2,cy=(y0+y1)/2,rx=w/2,ry=h/2,err=0;
 p.forEach(function(q){var u=(q[0]-cx)/(rx||1),v=(q[1]-cy)/(ry||1);err+=Math.abs(Math.sqrt(u*u+v*v)-1)});err/=p.length;
 function ell(){if(Math.abs(rx-ry)<0.15*Math.max(rx,ry)){rx=ry=(rx+ry)/2}var o=[];for(var i=0;i<=72;i++){var t=i/72*2*Math.PI;o.push([cx+rx*Math.cos(t),cy+ry*Math.sin(t)])}return o}
 if(err<0.09)return ell();
 /* Ecken suchen: am weitesten entfernten Punkt teilen, dann vereinfachen */
 var fi=0,fd=0;p.forEach(function(q,i){var d=Math.hypot(q[0]-f[0],q[1]-f[1]);if(d>fd){fd=d;fi=i}});
 var eps=0.09*Math.max(w,h),c=rdp(p.slice(0,fi+1),eps).slice(0,-1).concat(rdp(p.slice(fi).concat([f]),eps).slice(0,-1));
 /* Ecken, die fast auf einer Geraden liegen, entfernen */
 var ch=true;while(ch&&c.length>3){ch=false;for(var i=0;i<c.length;i++){var A=c[(i+c.length-1)%c.length],B=c[i],C=c[(i+1)%c.length];
  if(segDist(B,A,C)<0.07*Math.max(w,h)){c.splice(i,1);ch=true;break}}}
 if(c.length===4){var ax=true;for(var j=0;j<4;j++){var P=c[j],Q=c[(j+1)%4],an=Math.abs(Math.atan2(Q[1]-P[1],Q[0]-P[0])*180/Math.PI)%90;if(an>12&&an<78)ax=false}
  if(ax)return [[x0,y0],[x1,y0],[x1,y1],[x0,y1],[x0,y0]]}
 if(c.length>=3&&c.length<=6)return c.concat([c[0]]);
 if(err<0.18)return ell();
 return null}
function holdMove(a,e){if(Math.abs(e.clientX-a.hx)+Math.abs(e.clientY-a.hy)>4)holdArm(a,e)}

/* ---------- Lasso: auswählen, verschieben, umfärben, löschen ----------
   Das Lasso arbeitet in Bildschirm-Koordinaten und kann Striche aus mehreren Flächen erfassen. */
var sel=null,selDiv=document.createElement('div');
selDiv.style.cssText='position:absolute;border:2px dashed #6D3FE8;background:rgba(109,63,232,.07);border-radius:8px;pointer-events:none;display:none';
var lassoG=null;
function toClient(surf,q){var r=surf.box(),k=surf.scale();return [r.left+q[0]/k,r.top+q[1]/k]}
function inPoly(p,poly){var c=false;for(var i=0,j=poly.length-1;i<poly.length;j=i++){var a=poly[i],b=poly[j];
 if((a[1]>p[1])!==(b[1]>p[1])&&p[0]<(b[0]-a[0])*(p[1]-a[1])/(b[1]-a[1])+a[0])c=!c}return c}
function selBox(){if(!sel)return;var x0=1e9,y0=1e9,x1=-1e9,y1=-1e9,pad=0;
 sel.items.forEach(function(it){var k=it.s.scale();it.list.forEach(function(s){var qs=s.pts;if(s.e){var bb=ibox(s);qs=[[bb[0],bb[1]],[bb[2],bb[3]]]}else pad=Math.max(pad,s.w/2/k);qs.forEach(function(q){var c=toClient(it.s,q);x0=Math.min(x0,c[0]);y0=Math.min(y0,c[1]);x1=Math.max(x1,c[0]);y1=Math.max(y1,c[1])})})});
 pad+=8;var H=hostR();sel.b=[x0-pad-H.left,y0-pad-H.top,x1+pad-H.left,y1+pad-H.top];
 var host=hostEl();if(selDiv.parentNode!==host)host.appendChild(selDiv);
 var ox=0,oy=0;
 selDiv.style.display='block';selDiv.style.left=(sel.b[0]-ox)+'px';selDiv.style.top=(sel.b[1]-oy)+'px';selDiv.style.width=(sel.b[2]-sel.b[0])+'px';selDiv.style.height=(sel.b[3]-sel.b[1])+'px';
 [selBar,selH].forEach(function(e){if(e.parentNode!==host)host.appendChild(e)});
 selH.style.display='block';selH.style.left=(sel.b[2]-ox-15)+'px';selH.style.top=(sel.b[3]-oy-15)+'px';
 selBar.style.display='flex';var bw=selBar.offsetWidth||320,bx=Math.max(-H.left+8,Math.min((sel.b[0]+sel.b[2])/2-bw/2,-H.left+innerWidth-bw-8)),by=sel.b[1]-58;
 if(by<-H.top+8)by=sel.b[3]+12;selBar.style.left=(bx-ox)+'px';selBar.style.top=(by-oy)+'px'}
function clearSel(){selDiv.style.display='none';selBar.style.display='none';selH.style.display='none';sel=null}
/* Auswahl-Leiste und Größen-Griff */
var selBar=document.createElement('div'),selH=document.createElement('div'),pasteBar=document.createElement('div');
selBar.style.cssText='position:absolute;display:none;gap:4px;padding:5px;background:#16192B;border-radius:12px;z-index:3;box-shadow:0 8px 20px -8px rgba(0,0,0,.5);touch-action:none';
function sbtn(id,txt){return '<button type="button" data-a="'+id+'" style="min-height:38px;padding:0 12px;border:0;border-radius:8px;background:transparent;color:#fff;font:600 14px system-ui,sans-serif;cursor:pointer;white-space:nowrap">'+txt+'</button>'}
selBar.innerHTML=sbtn('copy','Kopieren')+sbtn('cut','Ausschneiden')+sbtn('dup','Duplizieren')+sbtn('del','Löschen');
selH.style.cssText='position:absolute;display:none;width:30px;height:30px;border-radius:50%;background:#6D3FE8;border:3px solid #fff;box-shadow:0 3px 10px -3px rgba(0,0,0,.5);cursor:nwse-resize;z-index:3;touch-action:none';
selH.title='Ziehen: Größe ändern';
pasteBar.style.cssText=selBar.style.cssText;pasteBar.innerHTML=sbtn('paste','Einfügen');
[selBar,pasteBar].forEach(function(b){
 b.addEventListener('pointerdown',function(e){e.stopPropagation()});
 b.addEventListener('pointerup',function(e){e.stopPropagation()});
 b.addEventListener('click',function(e){e.stopPropagation();var t=e.target.closest('button');if(!t)return;var a=t.dataset.a;
  if(a==='copy'){copySel();clearSel()}else if(a==='cut'){copySel();deleteSel()}else if(a==='dup')dupSel();else if(a==='del')deleteSel();
  else if(a==='paste'){hidePaste();pasteAt(b._x,b._y)}})});
/* Größe ändern: Griff unten rechts, Ecke oben links bleibt stehen */
var rs=null;
selH.addEventListener('pointerdown',function(e){e.preventDefault();e.stopPropagation();if(!sel)return;try{selH.setPointerCapture(e.pointerId)}catch(_){}
 var H=hostR(),ax=sel.b[0]+H.left,ay=sel.b[1]+H.top;
 rs={id:e.pointerId,ax:ax,ay:ay,d0:Math.max(20,Math.hypot(e.clientX-ax,e.clientY-ay)),f:1,
  snap:sel.items.map(function(it){return it.list.map(function(x){return {s:x,pts:x.pts.map(function(q){return q.slice()}),w:x.w}})})}});
selH.addEventListener('pointermove',function(e){if(!rs||rs.id!==e.pointerId)return;e.stopPropagation();
 var f=Math.max(0.1,Math.min(10,Math.hypot(e.clientX-rs.ax,e.clientY-rs.ay)/rs.d0));rs.f=f;
 sel.items.forEach(function(it,i){var k=it.s.scale(),r=it.s.box(),ax=(rs.ax-r.left)*k,ay=(rs.ay-r.top)*k;
  rs.snap[i].forEach(function(o){o.s.pts=o.pts.map(function(q){return [ax+(q[0]-ax)*f,ay+(q[1]-ay)*f]});o.s.w=o.w*f;if(!o.s.e)o.s.el.setAttribute('stroke-width',o.s.w);it.s.redraw(o.s)})});
 selBox()});
function rsEnd(e){if(!rs||rs.id!==e.pointerId)return;e.stopPropagation();
 if(rs.f!==1){push({parts:sel.items.map(function(it,i){markDirty(it.s);return {s:it.s,snap:rs.snap[i]}})})}rs=null}
selH.addEventListener('pointerup',rsEnd);selH.addEventListener('pointercancel',rsEnd);
/* Zwischenablage: in Bildschirm-Pixeln, damit sie auf jede Fläche passt (auch auf andere Seiten) */
var clip=null;try{clip=JSON.parse(localStorage.getItem('pz1:clip')||'null')}catch(e){}
function copySel(){if(!sel)return;var H=hostR(),bx=sel.b[0]+H.left,by=sel.b[1]+H.top,out=[];
 sel.items.forEach(function(it){var k=it.s.scale();it.list.forEach(function(x){out.push({c:x.c,w:x.w/k,m:x.m,l:x.l,e:x.e,b:x.b,p:x.pts.map(function(q){var c=toClient(it.s,q);return [c[0]-bx,c[1]-by]})})})});
 clip={w:sel.b[2]-sel.b[0],h:sel.b[3]-sel.b[1],s:out};try{localStorage.setItem('pz1:clip',JSON.stringify(clip))}catch(e){}}
function placeClip(cl,x,y){var surf=surfAt({clientX:x+cl.w/2,clientY:y+cl.h/2})||visible()[0],k=surf.scale(),made=[];
 cl.s.forEach(function(o){made.push(surf.make(o.p.map(function(q){return surf.pt({clientX:x+q[0],clientY:y+q[1]})}),o.c,o.w*k,o.m,o.l,o.e,o.b))});
 push({parts:[{s:surf,addL:made.slice()}]});markDirty(surf);sel={items:[{s:surf,list:made}]};selBox()}
function pasteAt(x,y){if(!clip)return;clearSel();if(st.mode!=='lasso')setMode('lasso');placeClip(clip,x-clip.w/2,y-clip.h/2)}
function dupSel(){if(!sel)return;copySel();var H=hostR(),c=clip,x=sel.b[0]+H.left+24,y=sel.b[1]+H.top+24;clearSel();placeClip(c,x,y)}
function showPaste(x,y){if(!clip)return;var host=hostEl();if(pasteBar.parentNode!==host)host.appendChild(pasteBar);
 pasteBar._x=x;pasteBar._y=y;pasteBar.style.display='flex';var H=hostR();pasteBar.style.left=(x-H.left-45)+'px';pasteBar.style.top=(y-H.top-60)+'px'}
function hidePaste(){pasteBar.style.display='none'}
function inSel(e){if(!sel)return false;var H=hostR(),x=e.clientX-H.left,y=e.clientY-H.top;return x>=sel.b[0]&&x<=sel.b[2]&&y>=sel.b[1]&&y<=sel.b[3]}
/* Lage der Ebene, in der Auswahl, Leisten und Textfeld liegen (robust bei Scrollen und Zoomen) */
function hostR(){return hostEl().getBoundingClientRect()}
function deleteSel(){if(!sel)return;var parts=sel.items.map(function(it){it.list.forEach(function(x){it.s.drop(x)});markDirty(it.s);return {s:it.s,del:it.list.slice()}});push({parts:parts});clearSel()}
function recolorSel(){if(!sel)return;var parts=sel.items.map(function(it){var old=it.list.map(function(s){return s.c});
 it.list.forEach(function(s){recolor(s,s.m?MARK[st.color]:COLORS[st.color][0])});markDirty(it.s);return {s:it.s,rc:{list:it.list.slice(),old:old}}});push({parts:parts})}
function lassoSelect(poly){var items=[];
 visible().forEach(function(surf){var list=surf.strokes.filter(function(s){var pts=s.pts;
   if(s.e){var bb=ibox(s);pts=[[(bb[0]+bb[2])/2,(bb[1]+bb[3])/2]]}
   else if(s.l===1&&pts.length===2)pts=[pts[0],[(pts[0][0]+pts[1][0])/2,(pts[0][1]+pts[1][1])/2],pts[1]];
   var n=0;pts.forEach(function(q){if(inPoly(toClient(surf,q),poly))n++});return n/pts.length>=0.6});
  if(list.length)items.push({s:surf,list:list})});
 if(items.length){sel={items:items};selBox()}}
function lassoPath(poly){if(!lassoG)return;var H=hostR(),ox=-H.left,oy=-H.top;
 lassoG.setAttribute('d','M'+poly.map(function(q){return (q[0]+ox)+' '+(q[1]+oy)}).join('L')+'Z')}
function lassoStart(){var svg=st.blatt?bsv:st.tafel?tsv:lsv;lassoG=mk('path',{fill:'rgba(109,63,232,.06)',stroke:'#6D3FE8','stroke-width':2,'stroke-dasharray':'6 5'},svg)}
function lassoEnd(){if(lassoG)lassoG.remove();lassoG=null}

/* ---------- Textfelder ----------
   Antippen: neues Textfeld; vorhandenes Textfeld antippen: bearbeiten. Fertig mit ✓, Tippen daneben oder ⌘/Strg+Enter. */
var ed=null,edBox=document.createElement('div');
edBox.style.cssText='position:absolute;z-index:4;display:none;flex-direction:column;align-items:flex-start;gap:4px';
edBox.innerHTML='<textarea id="pz-ta" rows="1" spellcheck="true" style="min-width:160px;max-width:70vw;padding:4px 6px;border:2px dashed #6D3FE8;border-radius:8px;background:rgba(255,255,255,.92);outline:none;resize:none;overflow:hidden;font-family:system-ui,-apple-system,Segoe UI,sans-serif;font-weight:600;line-height:1.25;white-space:pre;-webkit-user-select:text;user-select:text"></textarea>'+
 '<div style="display:flex;gap:4px"><button type="button" data-ed="ok" style="height:36px;padding:0 14px;border:0;border-radius:9px;background:#16192B;color:#fff;font:600 14px system-ui,sans-serif;cursor:pointer">✓ Fertig</button><button type="button" data-ed="x" style="height:36px;padding:0 12px;border:2px solid #D5DAEC;border-radius:9px;background:#fff;color:#16192B;font:600 14px system-ui,sans-serif;cursor:pointer">Abbrechen</button></div>';
var ta=edBox.querySelector('textarea');
['pointerdown','pointerup','pointermove','touchmove','contextmenu'].forEach(function(t){edBox.addEventListener(t,function(e){e.stopPropagation()},{passive:true})});
edBox.addEventListener('click',function(e){var b=e.target.closest('[data-ed]');if(!b)return;e.stopPropagation();if(b.dataset.ed==='ok')edCommit();else edCancel()});
function edSize(){ta.style.height='auto';ta.style.height=ta.scrollHeight+'px';ta.style.width='auto';ta.style.width=Math.min(innerWidth*0.7,Math.max(160,ta.scrollWidth+4))+'px'}
ta.addEventListener('input',edSize);
ta.addEventListener('keydown',function(e){e.stopPropagation();if(e.key==='Escape'){e.preventDefault();edCancel()}else if(e.key==='Enter'&&(e.metaKey||e.ctrlKey)){e.preventDefault();edCommit()}});
function edOpen(surf,item,cx,cy){clearSel();hidePaste();var k=surf.scale(),fs,x,y;
 if(item){var c=toClient(surf,item.pts[0]);x=c[0];y=c[1];fs=item.w/k;item.el.style.visibility='hidden';ta.value=item.e;ta.style.color=item.c}
 else{fs=st.tw*surf.unit()/k;x=cx;y=cy-fs*0.7;ta.value='';ta.style.color=COLORS[st.color][0]}
 ed={surf:surf,item:item,fs:fs};var host=hostEl();if(edBox.parentNode!==host)host.appendChild(edBox);var H=host.getBoundingClientRect(),fx=-H.left,fy=-H.top;
 /* iOS zoomt bei Schrift unter 16 px ins Feld: dann mit 16 px schreiben und verkleinert anzeigen */
 var small=fs<16;ta.style.fontSize=(small?16:fs)+'px';edBox.style.transformOrigin='0 0';edBox.style.transform=small?'scale('+(fs/16)+')':'';
 edBox.style.display='flex';edBox.style.left=(x+fx-8)+'px';edBox.style.top=(y+fy-6)+'px';edSize();
 try{ta.focus({preventScroll:true})}catch(e){ta.focus()}
 setTimeout(function(){if(document.activeElement!==ta){try{ta.focus({preventScroll:true})}catch(e){ta.focus()}}},0)}
function edClose(){if(ed&&ed.item)ed.item.el.style.visibility='';edBox.style.display='none';ta.blur();ed=null}
function edCancel(){edClose()}
function edCommit(){if(!ed)return;var t=ta.value.replace(/\s+$/,''),e=ed,surf=e.surf,k=surf.scale(),r=edBox.getBoundingClientRect();edClose();
 if(e.item){if(t===e.item.e)return;if(!t){surf.drop(e.item);push({parts:[{s:surf,del:[e.item]}]})}else{var old=e.item.e;e.item.e=t;upd(e.item);push({parts:[{s:surf,tx:{item:e.item,old:old}}]})}markDirty(surf);return}
 if(!t)return;var p0=surf.pt({clientX:r.left+8+2,clientY:r.top+6+2});
 var it=surf.make([p0],COLORS[st.color][0],r1(e.fs*k),0,0,t,2);push({parts:[{s:surf,add:it}]});markDirty(surf)}

/* Textfeld unter dem Tipp? */
function textHit(s,e){var tp=s.pt(e),hitT=null;s.strokes.forEach(function(x){if(x.b===2){var bb=ibox(x),pd=6*s.scale();if(tp[0]>=bb[0]-pd&&tp[0]<=bb[2]+pd&&tp[1]>=bb[1]-pd&&tp[1]<=bb[3]+pd)hitT=x}});return {s:s,x:e.clientX,y:e.clientY,hit:hitT}}
/* Fingertipp im Text-Modus: Textfeld öffnen bzw. fertig machen */
function textTap(e,onOv){if(ed){edCommit();return}
 if(!onOv){var u=under(e),t=u&&u.closest(INTER);if(t&&!t.closest('#pz-bar')){fireTap(e);return}}
 var s=surfAt(e);if(!s)return;var h=textHit(s,e);edOpen(h.s,h.hit,h.x,h.y)}

/* ---------- Eingabe ---------- */
var INTER='button,a,select,input,textarea,label,summary,[role=button]';
var act=null,lastPt=[innerWidth/2,innerHeight/2];
addEventListener('pointermove',function(e){lastPt=[e.clientX,e.clientY]},true);
function under(e){var host=hostEl(),pe=host.style.pointerEvents,rp=rul.style.pointerEvents;host.style.pointerEvents='none';rul.style.pointerEvents='none';
 var el=document.elementFromPoint(e.clientX,e.clientY);host.style.pointerEvents=pe;rul.style.pointerEvents=rp;return el}
function fireTap(e){var el=under(e);if(!el)return false;var t=el.closest(INTER);if(!t||t.closest('#pz-bar'))return false;
 if(t.tagName==='SELECT'||t.tagName==='INPUT'||t.tagName==='TEXTAREA'){t.focus();return true}t.click();return true}
function down(e,onTafel){
 if(e.button>0)return;
 if(e.pointerType==='touch'){if(onTafel)return;act={touch:true,id:e.pointerId,x:e.clientX,y:e.clientY,sx:e.clientX,sy:e.clientY,moved:0};return}
 e.preventDefault();
 try{e.currentTarget.setPointerCapture(e.pointerId)}catch(_){}
 act={id:e.pointerId,sx:e.clientX,sy:e.clientY,t0:performance.now(),moved:0,gone:[]};
 if(st.mode==='laser'){laserMove(e,true,true);return}
 hidePaste();
 if(st.mode==='lasso'){if(inSel(e)){act.drag={x:e.clientX,y:e.clientY,dx:0,dy:0}}else{clearSel();act.poly=[[e.clientX,e.clientY]];lassoStart()}return}
 var s=surfAt(e);act.surf=s;if(!s)return;
 if(st.mode==='text'){if(ed){edCommit();act=null;return}act.txt=textHit(s,e);return}
 if(st.mode==='sticker'){clearSel();var bd=BADGES.indexOf(st.stk)>=0;act.s=s.make([s.pt(e)],bd?COLORS[st.color][0]:'#000',r1(st.sw*(bd?0.55:1)*s.unit()),0,0,st.stk,bd);return}
 if(inkMode()){clearSel();act.s=s.begin(e);var rp=rulHit(e);
  if(rp){act.rul=rp;var q=rulProj(e,rp);act.s.pts=[s.pt({clientX:q[0],clientY:q[1]})];act.s.l=1;s.redraw(act.s)}else holdArm(act,e)}
 else if(st.mode==='erase'){clearSel();var g=s.erase(e);if(g.length)act.gone.push({s:s,l:g})}
}
function moveEv(e){
 if(st.mode==='laser'&&e.pointerType!=='touch'&&!act)laserMove(e,false);
 if(!act||act.id!==e.pointerId)return;
 if(act.touch){var dy=e.clientY-act.y,dx=e.clientX-act.x;act.x=e.clientX;act.y=e.clientY;
  act.moved=Math.max(act.moved,Math.abs(e.clientX-act.sx)+Math.abs(e.clientY-act.sy));scrollBy(-dx,-dy);return}
 e.preventDefault();
 act.moved=Math.max(act.moved,Math.abs(e.clientX-act.sx)+Math.abs(e.clientY-act.sy));
 var list=e.getCoalescedEvents?e.getCoalescedEvents():[e];if(!list.length)list=[e];
 list.forEach(function(ev){
  if(st.mode==='laser')laserMove(ev,true,false);
  else if(st.mode==='sticker'&&act.s){act.s.pts=[act.surf.pt(ev)];upd(act.s)}
  else if(inkMode()&&act.s){
   if(act.shaped)return;
   if(act.rul){var q=rulProj(ev,act.rul);act.s.pts=[act.s.pts[0],act.surf.pt({clientX:q[0],clientY:q[1]})];act.surf.redraw(act.s)}
   else if(act.straight){act.s.pts=[act.s.pts[0],lineEnd(act.surf,act.s.pts[0],act.surf.pt(ev),act.s)];act.surf.redraw(act.s)}
   else{var sm=act.sm;if(!sm)sm=act.sm=[ev.clientX,ev.clientY];var al=st.mode==='mark'?0.3:0.42;sm[0]+=(ev.clientX-sm[0])*al;sm[1]+=(ev.clientY-sm[1])*al;
    act.surf.add(act.s,{clientX:sm[0],clientY:sm[1]});act.raw=ev;holdMove(act,ev)}}
  else if(st.mode==='erase'){var s=st.blatt||(st.tafel?pages[pi]:surfAt(ev));if(s){var g=s.erase(ev);if(g.length)act.gone.push({s:s,l:g})}}
  else if(st.mode==='lasso'){
   if(act.drag){var dx=ev.clientX-act.drag.x,dy=ev.clientY-act.drag.y;act.drag.x=ev.clientX;act.drag.y=ev.clientY;act.drag.dx+=dx;act.drag.dy+=dy;
    sel.items.forEach(function(it){var k=it.s.scale();it.list.forEach(function(s){move(s,dx*k,dy*k)})});selBox()}
   else if(act.poly){act.poly.push([ev.clientX,ev.clientY]);lassoPath(act.poly)}}});
}
function up(e,onTafel){
 if(!act||act.id!==e.pointerId)return;var a=act;act=null;clearTimeout(a.holdT);if(st.mode==='laser')laserUp();
 var tap=a.moved<8&&(a.touch||performance.now()-a.t0<400);
 if(a.touch){if(tap&&!onTafel){if(st.mode==='text')textTap(e,false);else fireTap(e)}return}
 if(a.txt){if(tap&&!onTafel&&!a.txt.hit&&fireTap(e))return;if(tap)edOpen(a.txt.s,a.txt.hit,a.txt.x,a.txt.y);return}
 if(tap&&!onTafel&&!a.drag&&fireTap(e)){lassoEnd();if(a.s)a.surf.drop(a.s);a.gone.forEach(function(x){x.s.restore(x.l)});return}
 if(st.mode==='lasso'){lassoEnd();
  if(a.drag){if(a.drag.dx||a.drag.dy){push({parts:sel.items.map(function(it){var k=it.s.scale();markDirty(it.s);return {s:it.s,mv:{list:it.list.slice(),dx:a.drag.dx*k,dy:a.drag.dy*k}}})})}return}
  if(a.poly&&a.poly.length>4)lassoSelect(a.poly);
  else if(tap&&!sel&&clip)showPaste(e.clientX,e.clientY);
  return}
 if(a.s&&!a.straight&&!a.shaped&&!a.rul&&a.raw){a.surf.add(a.s,a.raw)}
 if(a.s&&st.mode==='pen'&&!a.straight&&!a.shaped&&!a.rul&&scribble(a))return;
 commit(a)}
/* Wegkritzeln: Zickzack über Strichen löscht diese Striche (und das Gekritzel) */
function scribble(a){var p=a.s.pts;if(p.length<12)return false;
 var x0=1e9,y0=1e9,x1=-1e9,y1=-1e9,L=0;p.forEach(function(q,i){x0=Math.min(x0,q[0]);y0=Math.min(y0,q[1]);x1=Math.max(x1,q[0]);y1=Math.max(y1,q[1]);if(i)L+=Math.hypot(q[0]-p[i-1][0],q[1]-p[i-1][1])});
 var w=x1-x0,h=y1-y0,D=Math.hypot(w,h),k=a.surf.scale();if(D<14*k||L<3*D)return false;
 /* Richtungswechsel entlang der längeren Achse zählen */
 var ax=w>=h?0:1,ext=(ax?h:w),min=Math.max(6*k,ext*0.3),dir=0,piv=p[0][ax],rev=0;
 for(var i=1;i<p.length;i++){var v=p[i][ax],d=v-piv;
  if(dir>=0&&d<-min){if(dir>0)rev++;dir=-1;piv=v}else if(dir<=0&&d>min){if(dir<0)rev++;dir=1;piv=v}
  else if((dir>0&&v>piv)||(dir<0&&v<piv))piv=v}
 if(rev<3)return false;
 /* getroffen: Strich wird vom Gekritzel berührt und seine Mitte liegt im (etwas vergrößerten) Gekritzel-Bereich */
 var px=0.25*w+6*k,py=0.25*h+6*k,hit=a.surf.strokes.filter(function(s){if(s===a.s)return false;
  var sx0=1e9,sy0=1e9,sx1=-1e9,sy1=-1e9;s.pts.forEach(function(q){sx0=Math.min(sx0,q[0]);sy0=Math.min(sy0,q[1]);sx1=Math.max(sx1,q[0]);sy1=Math.max(sy1,q[1])});
  var cx_=(sx0+sx1)/2,cy_=(sy0+sy1)/2;if(cx_<x0-px||cx_>x1+px||cy_<y0-py||cy_>y1+py)return false;
  if((sx1-sx0)>3*w+40*k||(sy1-sy0)>3*h+40*k)return false;
  var r=Math.max(8*k,(s.w+a.s.w)/2+3*k);
  for(var i=0;i<s.pts.length;i++)for(var j=1;j<p.length;j++)if(segDist(s.pts[i],p[j-1],p[j])<r)return true;
  return false});
 if(!hit.length)return false;
 a.surf.drop(a.s);hit.forEach(function(s){a.surf.drop(s)});push({parts:[{s:a.surf,del:hit}]});markDirty(a.surf);return true}
function commit(a){var parts=[];
 if(a.s){parts.push({s:a.surf,add:a.s})}
 var m=[];a.gone.forEach(function(x){var f=m.filter(function(p){return p.s===x.s})[0];if(f)f.del=f.del.concat(x.l);else m.push({s:x.s,del:x.l.slice()})});parts=parts.concat(m);
 if(parts.length){push({parts:parts});parts.forEach(function(p){markDirty(p.s)})}}
function cancel(e){if(st.mode==='laser')laserUp();if(act&&act.id===e.pointerId){clearTimeout(act.holdT);lassoEnd();if(!act.touch&&!act.poly&&!act.drag)commit(act);act=null}}
[[layer,false],[tafel,true],[blatt,true]].forEach(function(h){var el=h[0],t=h[1];
 el.addEventListener('pointerdown',function(e){if(t&&e.target.closest('#pz-thead,.pz-head'))return;down(e,t)});
 el.addEventListener('pointermove',moveEv);
 el.addEventListener('pointerup',function(e){up(e,t)});
 el.addEventListener('pointercancel',cancel);
 el.addEventListener('pointerleave',function(e){if(!act&&st.mode==='laser')laserHide()});
 el.addEventListener('pointerout',function(e){if(e.pointerType==='pen'&&!act&&st.mode==='laser')laserHide()});
 el.addEventListener('contextmenu',function(e){if(st.mode!=='off')e.preventDefault()});
});
layer.addEventListener('touchmove',function(e){if(st.mode!=='off')e.preventDefault()},{passive:false});
tafel.addEventListener('touchmove',function(e){if(!e.target.closest('#pz-thead'))e.preventDefault()},{passive:false});

/* ---------- Präsentationsmodus ---------- */
var fsDoc=document.documentElement,usedFs=false;
function fsEl(){return document.fullscreenElement||document.webkitFullscreenElement}
/* tatsächlich sichtbare Höhe (iPad-Web-App, Safari-Leisten) statt 100vh */
/* beim Zoomen mit zwei Fingern nicht nachführen, sonst schrumpft das Blatt gegen den Zoom */
function setVH(){var vv=window.visualViewport;if(vv&&vv.scale>1.02)return;var h=vv?vv.height:innerHeight;document.documentElement.style.setProperty('--pz-vh',h+'px')}
addEventListener('resize',setVH);if(window.visualViewport)visualViewport.addEventListener('resize',setVH);setVH();
function setPres(on){if(on===st.pres)return;st.pres=on;document.body.classList.toggle('pz-pres',on);setVH();
 if(on&&!document.getElementById('pz-back')){var bk=document.querySelector('a.back');if(bk){var a=document.createElement('a');a.id='pz-back';a.href=bk.getAttribute('href');a.textContent=bk.textContent.trim()||'← Zurück';document.body.appendChild(a)}}
 if(on){scrollTo(0,0);try{var f=fsDoc.requestFullscreen||fsDoc.webkitRequestFullscreen;if(f&&!fsEl()){var r=f.call(fsDoc);usedFs=true;if(r&&r.catch)r.catch(function(){usedFs=false})}}catch(e){usedFs=false}}
 else{try{if(fsEl()){(document.exitFullscreen||document.webkitExitFullscreen).call(document)}}catch(e){}usedFs=false}
 dispatchEvent(new Event('resize'));setTimeout(function(){dispatchEvent(new Event('resize'));sizeLayer();if(sel)selBox()},150);sync()}
function onFs(){if(!fsEl()&&usedFs&&st.pres)setPres(false)}
document.addEventListener('fullscreenchange',onFs);document.addEventListener('webkitfullscreenchange',onFs);

/* ---------- Werkzeugleiste ---------- */
var bar=document.createElement('div');bar.id='pz-bar';
function B(attr,title,label,icon){return '<button type="button" '+attr+' title="'+title+'" aria-label="'+label+'">'+icon+'</button>'}
bar.innerHTML='<button type="button" id="pz-fab" aria-expanded="false" aria-controls="pz-panel" title="Stift-Werkzeug">'+big(I.pen,28)+'</button>'+
'<div id="pz-panel" hidden role="toolbar" aria-label="Stift-Werkzeug">'+
B('id="pz-pres-btn"','Präsentationsmodus (P)','Präsentationsmodus',I.pres)+
B('id="pz-tafel-btn"','Tafel: leere Karo-Seite (T)','Tafel',I.tafel)+
'<div class="pz-sep"></div>'+
B('data-m="off"','Normal: klicken und scrollen (Esc)','Normal',I.hand)+
B('data-m="pen"','Stift (S) – am Ende still halten = gerade Linie','Stift',I.pen)+
B('data-m="mark"','Textmarker (M)','Textmarker',I.mark)+
B('data-m="laser"','Laserpointer (L)','Laserpointer',I.laser)+
B('data-m="erase"','Radierer: Striche antippen oder überwischen (R)','Radierer',I.erase)+
B('data-m="lasso"','Lasso: Striche einkreisen, dann verschieben, umfärben oder löschen (A)','Lasso',I.lasso)+
'<div class="pz-sep"></div><div class="pz-cols">'+COLORS.map(function(c,i){return '<button type="button" data-c="'+i+'" title="'+c[1]+' ('+(i+1)+')" aria-label="Farbe '+c[1]+'"></button>'}).join('')+'</div>'+
B('data-m="text"','Textfeld (W): antippen und schreiben; vorhandenes Textfeld antippen zum Bearbeiten','Textfeld',I.text)+
B('id="pz-cbtn" aria-expanded="false"','Farbpalette','Farbpalette',I.palette)+
B('id="pz-sbtn" aria-expanded="false"','Sticker (E)','Sticker',I.sticker)+
B('id="pz-wbtn" aria-expanded="false"','Strichstärke (D)','Strichstärke','<svg viewBox="0 0 24 24" aria-hidden="true"><circle id="pz-wdot" cx="12" cy="12" r="3" fill="currentColor"/></svg>')+
B('id="pz-undo"','Rückgängig (Z)','Rückgängig',I.undo)+
B('id="pz-clear"','Löschen: Auswahl oder alles, was gerade zu sehen ist (Entf) – mit Rückgängig zurückholbar','Löschen',I.trash)+
B('id="pz-rbtn"','Lineal mit Winkelanzeige (G)','Lineal',ic('<rect x="2" y="8" width="20" height="8" rx="1.5" transform="rotate(-30 12 12)"/><path d="M7.5 13.8l-1-1.7M10.6 12l-1-1.7M13.7 10.2l-1-1.7M16.8 8.4l-1-1.7" transform="rotate(0)"/>'))+
'<div id="pz-cpop" class="pz-pop" hidden><p class="pz-hint">Ersetzt die gewählte deiner 4 Farben.</p><div class="pz-grid">'+PALETTE.map(function(c){return '<button type="button" data-pc="'+c+'" style="background:'+c+'" aria-label="Farbe '+c+'"></button>'}).join('')+'</div><label><input type="color" id="pz-ccustom"> Eigene Farbe</label></div>'+
'<div id="pz-spop" class="pz-pop" hidden><p class="pz-hint">Antippen, dann auf die Seite tippen. Größe über den Punkt-Knopf.</p><div class="pz-grid">'+STICKERS.map(function(t){return '<button type="button" data-st="'+t+'" aria-label="Sticker '+t+'">'+t+'</button>'}).join('')+'</div><div class="pz-badges">'+BADGES.map(function(t){return '<button type="button" data-st="'+t+'">'+t+'</button>'}).join('')+'</div></div>'+
'<div id="pz-wpop" hidden><div id="pz-wlab"></div><input type="range" id="pz-wrange" min="1" max="30" step="1" aria-label="Strichstärke"><div class="pz-prev"><span id="pz-wprev"></span></div></div>'+
'</div>';
document.body.appendChild(bar);
setTimeout(function(){if(typeof pinVV==='function')pinVV()},0);
var fab=document.getElementById('pz-fab'),panel=document.getElementById('pz-panel'),wpop=document.getElementById('pz-wpop'),wr=document.getElementById('pz-wrange');
function wKey(){return st.mode==='mark'?'mw':st.mode==='sticker'?'sw':st.mode==='text'?'tw':'pw'}
function sync(){
 panel.querySelectorAll('[data-m]').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.m===st.mode)});
 var mk_=st.mode==='mark';
 panel.querySelectorAll('[data-c]').forEach(function(b){var i=+b.dataset.c;b.style.background=mk_?MARK[i]:COLORS[i][0];b.setAttribute('aria-pressed',i===st.color)});
 document.getElementById('pz-tafel-btn').setAttribute('aria-pressed',st.tafel);
 var rb=document.getElementById('pz-rbtn');if(rb)rb.setAttribute('aria-pressed',RL.on);
 var pb=document.getElementById('pz-pres-btn');pb.setAttribute('aria-pressed',st.pres);pb.innerHTML=st.pres?I.presOff:I.pres;
 var w=st[wKey()];document.getElementById('pz-wdot').setAttribute('r',Math.max(2,Math.min(10,1.5+w/2.5)));
 document.getElementById('pz-wdot').setAttribute('fill',mk_?MARK[st.color]:COLORS[st.color][0]);
 var stk=st.mode==='sticker',txm=st.mode==='text';wr.min=stk?20:txm?12:1;wr.max=stk?160:txm?96:30;wr.value=w;document.getElementById('pz-wlab').textContent=(stk?'Sticker: Größe ':txm?'Text: Größe ':(mk_?'Textmarker':'Stift')+': Stärke ')+w;
 panel.querySelectorAll('[data-st]').forEach(function(b){b.setAttribute('aria-pressed',stk&&b.dataset.st===st.stk)});document.getElementById('pz-sbtn').setAttribute('aria-pressed',stk);
 var cc=document.getElementById('pz-ccustom');if(cc)cc.value=mk_?MARK[st.color]:COLORS[st.color][0];
 var pv=document.getElementById('pz-wprev');pv.style.height=w+'px';pv.style.background=mk_?MARK[st.color]:COLORS[st.color][0];pv.style.opacity=mk_?.6:1;
 layer.className=st.mode==='off'||ovHost()?'':'on'+(st.mode==='laser'?' laser':st.mode==='lasso'?' lasso':'');
 tafel.className=blatt.className=st.mode==='laser'?'laser':st.mode==='lasso'?'lasso':'';
 fab.innerHTML=st.mode==='sticker'?'<span style="font-size:26px;line-height:1;font-family:Apple Color Emoji,Segoe UI Emoji,Noto Color Emoji,sans-serif">'+(BADGES.indexOf(st.stk)>=0?'🏷️':st.stk)+'</span>':big(I[st.mode==='off'?'pen':st.mode]||I.pen,28);
 fab.style.boxShadow=st.mode==='off'?'':'0 0 0 4px '+(st.mode==='laser'?'#ff2a2a':st.mode==='mark'?MARK[st.color]:inkMode()?COLORS[st.color][0]:'#6D3FE8')+',0 8px 22px -8px rgba(20,30,90,.6)';
 if(st.mode!=='laser'){dot=null;kick()}}
function openPanel(){panel.hidden=false;fab.setAttribute('aria-expanded','true')}
function setMode(m){if(ed)edCommit();if(m!=='lasso')clearSel();hidePaste();st.mode=m;act=null;if(m!=='off')openPanel();sync()}
function setTafel(on){clearSel();if(on&&st.blatt)closeBlatt();st.tafel=on;tafel.hidden=!on;if(on&&st.mode!=='laser'&&st.mode!=='mark')st.mode='pen';act=null;if(on)openPanel();sync()}
function pickColor(i){st.color=i;saveSettings();if(ed)ta.style.color=COLORS[i][0];if(sel){recolorSel();sync();return}if(!inkMode()&&st.mode!=='text'&&st.mode!=='sticker')setMode('pen');else sync()}
function toggleW(on){if(on)closePops('w');wpop.hidden=!on;document.getElementById('pz-wbtn').setAttribute('aria-expanded',on)}
function togglePop(id,btn,on){if(on)closePops(id);var p=document.getElementById(id);p.hidden=!on;document.getElementById(btn).setAttribute('aria-expanded',on)}
function closePops(except){if(except!=='w'){wpop.hidden=true;document.getElementById('pz-wbtn').setAttribute('aria-expanded',false)}
 if(except!=='pz-cpop'){document.getElementById('pz-cpop').hidden=true;document.getElementById('pz-cbtn').setAttribute('aria-expanded',false)}
 if(except!=='pz-spop'){document.getElementById('pz-spop').hidden=true;document.getElementById('pz-sbtn').setAttribute('aria-expanded',false)}}
function setSlotColor(c){if(st.mode==='mark')MARK[st.color]=c;else COLORS[st.color][0]=c;saveSettings();if(sel)recolorSel();else if(!inkMode()&&st.mode!=='sticker'&&st.mode!=='text')setMode('pen');if(ed)ta.style.color=c;sync()}
fab.addEventListener('click',function(){var o=panel.hidden;panel.hidden=!o;fab.setAttribute('aria-expanded',o);if(!o){toggleW(false);if(!ovHost())setMode('off')}fab.blur()});
panel.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;b.blur();
 if(b.closest('#pz-cpop')){if(b.dataset.pc)setSlotColor(b.dataset.pc);return}
 if(b.closest('#pz-spop')){if(b.dataset.st){st.stk=b.dataset.st;saveSettings();setMode('sticker');closePops()}return}
 if(b.id==='pz-cbtn'){togglePop('pz-cpop','pz-cbtn',document.getElementById('pz-cpop').hidden);return}
 if(b.id==='pz-sbtn'){togglePop('pz-spop','pz-sbtn',document.getElementById('pz-spop').hidden);return}
 if(b.id!=='pz-wbtn')closePops();
 if(b.dataset.m)setMode(b.dataset.m);
 else if(b.dataset.c)pickColor(+b.dataset.c);
 else if(b.id==='pz-wbtn'){if(!inkMode()&&st.mode!=='sticker'&&st.mode!=='text')setMode('pen');toggleW(wpop.hidden)}
 else if(b.id==='pz-undo')undo();
 else if(b.id==='pz-clear')clearAll();
 else if(b.id==='pz-tafel-btn')setTafel(!st.tafel);
 else if(b.id==='pz-rbtn')setRuler(!RL.on);
 else if(b.id==='pz-pres-btn')setPres(!st.pres)});
wr.addEventListener('input',function(){st[wKey()]=+wr.value;saveSettings();sync()});
document.getElementById('pz-ccustom').addEventListener('input',function(e){setSlotColor(e.target.value)});
var PRE={pw:[2,3,5,8,12],mw:[10,14,18,24,30],sw:[32,48,64,90,130],tw:[18,24,28,36,48]};
document.addEventListener('keydown',function(e){
 var tg=e.target.tagName;if(tg==='INPUT'||tg==='TEXTAREA'||tg==='SELECT'||e.altKey)return;
 var k=e.key.toLowerCase(),mod=e.metaKey||e.ctrlKey,inkOn=st.mode!=='off'||!!ovHost();
 if(mod&&k==='z'){if(inkOn){e.preventDefault();undo()}return}
 if(mod&&sel&&(k==='c'||k==='x'||k==='d')){e.preventDefault();if(k==='c'){copySel();clearSel()}else if(k==='x'){copySel();deleteSel()}else dupSel();return}
 if(mod&&k==='v'&&clip&&inkOn){e.preventDefault();pasteAt(lastPt[0],lastPt[1]);return}
 if(mod)return;
 if(k==='s')setMode(st.mode==='pen'?'off':'pen');
 else if(k==='m')setMode(st.mode==='mark'?'off':'mark');
 else if(k==='l')setMode(st.mode==='laser'?'off':'laser');
 else if(k==='r')setMode(st.mode==='erase'?'off':'erase');
 else if(k==='a')setMode(st.mode==='lasso'?'off':'lasso');
 else if(k==='e')setMode(st.mode==='sticker'?'off':'sticker');
 else if(k==='w')setMode(st.mode==='text'?'off':'text');
 else if(k==='t')setTafel(!st.tafel);
 else if(k==='g')setRuler(!RL.on);
 else if((k==='['||k===']')&&RL.on){RL.a+=k===']'?1:-1;rview()}
 else if(k==='p')setPres(!st.pres);
 else if(k==='d'){var wk=wKey(),pr=PRE[wk],i=0;while(i<pr.length&&pr[i]<=st[wk])i++;st[wk]=pr[i%pr.length];saveSettings();sync()}
 else if(k>='1'&&k<='4')pickColor(+k-1);
 else if(k==='z'&&inkOn)undo();
 else if((k==='delete'||k==='backspace')&&inkOn){e.preventDefault();clearAll()}
 else if(k==='escape'){var anyPop=!wpop.hidden||!document.getElementById('pz-cpop').hidden||!document.getElementById('pz-spop').hidden;if(anyPop)closePops();else if(sel)clearSel();else if(st.blatt)closeBlatt();else if(st.tafel)setTafel(false);else if(st.mode!=='off')setMode('off');else if(st.pres)setPres(false)}
});
sync();
})();
