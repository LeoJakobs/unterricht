/* Hilfen für Brüche: Streifen, Bruch schreiben, Bögen (Buch-Schreibweise), Zahlenstrahl */
var GR='#b23b2a',GN='#2e7d32',FILL1='#8fb8e8',FILL2='#f3b26a';
var FS=40;
function rectPts(x,y,w,h){return [].concat(linePts(x,y,x+w,y),linePts(x+w,y,x+w,y+h).slice(1),linePts(x+w,y+h,x,y+h).slice(1),linePts(x,y+h,x,y).slice(1))}
/* Streifen mit n Teilen, k davon gefärbt */
async function bar(x,y,w,h,n,k,o){o=o||{};var fills=[];
for(var i=0;i<k;i++)fills.push(el('rect',{x:x+w*i/n,y:y,width:w/n,height:h,fill:o.fill||FILL1,opacity:0}));
await stroke(rectPts(x,y,w,h),{w:2.2,j:0.5,ms:900});
for(var i=1;i<n;i++)await stroke(linePts(x+w*i/n,y,x+w*i/n,y+h),{w:1.8,j:0.4,ms:Math.max(140,420/n*2)});
if(k)await anim(500,function(q){fills.forEach(function(r){r.setAttribute('opacity',0.75*q)})})}
/* zusätzliche Teilungslinien (z. B. jedes Teil halbieren) */
async function split(x,y,w,h,n,by,c){for(var i=0;i<n;i++)for(var j=1;j<by;j++){var X=x+w*(i+j/by)/n;await stroke(linePts(X,y,X,y+h),{c:c||GR,w:2.2,j:0.4,ms:300})}}
/* Bruch: Mitte cx, Bruchstrich auf Höhe ly */
async function frac(cx,ly,n,d,o){o=o||{};var s=o.size||FS,c=o.c||'#2f2f33',wd=Math.max(String(n).length,String(d).length)*s*0.42+s*0.4;
await write(cx,ly-s*0.2,String(n),{size:s,c:c,anchor:'middle',bold:o.bold});
await stroke(linePts(cx-wd/2,ly,cx+wd/2,ly),{c:c,w:2.4,j:0.3,ms:300});
await write(cx,ly+s*0.78,String(d),{size:s,c:c,anchor:'middle',bold:o.bold})}
async function sym(x,ly,s,o){o=o||{};if(s==='<'||s==='>'){var d=s==='<'?1:-1,a=(o.size||FS)*0.3;await stroke([].concat(linePts(x+d*a,ly-a,x-d*a,ly),linePts(x-d*a,ly,x+d*a,ly+a).slice(1)),{c:o.c||'#2f2f33',w:3,j:0.2,ms:350});return}await write(x,ly+(o.size||FS)*0.3,s,{size:o.size||FS,c:o.c,anchor:'middle',bold:true})}
/* Bogen von x1 nach x2 über (top) oder unter (bot) dem Bruch, mit Pfeilspitze und Rechenzeichen */
async function bow(x1,x2,ly,lab,where,o){o=o||{};var s=o.size||FS,c=o.c||GR,up=where==='top',y0=up?ly-s*0.95:ly+s*0.98,h=up?-22:22,p=[];
x1+=16;x2-=16;
for(var i=0;i<=20;i++){var t=i/20;p.push([x1+(x2-x1)*t,y0+h*Math.sin(Math.PI*t)])}
await stroke(p,{c:c,w:2.4,j:0.25,ms:600});
var e=p[20],q=p[17],ang=Math.atan2(e[1]-q[1],e[0]-q[0]),L=11;
await Promise.all([-0.5,0.5].map(function(da){return stroke(linePts(e[0],e[1],e[0]-L*Math.cos(ang+da),e[1]-L*Math.sin(ang+da)),{c:c,w:2.4,j:0.1,ms:180})}));
await write((x1+x2)/2,up?y0+h-8:y0+h+26,lab,{size:30,c:c,anchor:'middle',bold:true})}
/* ganze Rechnung a/b = c/d mit Bögen */
async function eqBows(x1,x2,ly,lab,o){await bow(x1,x2,ly,lab,'top',o);await bow(x1,x2,ly,lab,'bot',o)}
async function circ(cx,cy,r,c){await stroke(arcPts(cx,cy,r,-200,170),{c:c||GR,w:2.4,j:0.4,ms:500})}
async function under(x1,x2,y,c){await stroke(linePts(x1,y,x2,y),{c:c||GR,w:3,j:0.4,ms:400})}
/* Teile eines Streifens färben (i0 bis i1-1) */
async function shade(x,y,w,h,n,i0,i1,fill){var r=[];for(var i=i0;i<i1;i++)r.push(el('rect',{x:x+w*i/n,y:y,width:w/n,height:h,fill:fill||FILL1,opacity:0},G.tools));await anim(450,function(q){r.forEach(function(e){e.setAttribute('opacity',0.75*q)})})}
/* ein Teil durchstreichen */
async function xpart(x,y,w,h,n,i,c){var a=x+w*i/n+5,b=x+w*(i+1)/n-5;await stroke(linePts(a,y+5,b,y+h-5),{c:c||GR,w:2.6,j:0.2,ms:250});await stroke(linePts(a,y+h-5,b,y+5),{c:c||GR,w:2.6,j:0.2,ms:250})}
/* Rechenzeile aus Bausteinen: Zahl/Zeichen als Text, [z,n] als Bruch, {g,z,n} als gemischte Zahl; gibt das Ende (x) zurück */
function tokW(t,s){if(Array.isArray(t))return Math.max(String(t[0]).length,String(t[1]).length)*s*0.42+s*0.4;if(typeof t==='object')return String(t.g).length*s*0.5+9+Math.max(String(t.z).length,String(t.n).length)*s*0.42+s*0.4;return String(t).length*s*0.48+6}
async function expr(x,ly,toks,o){o=o||{};var s=o.size||FS,gap=o.gap||10,c=o.c;
for(var i=0;i<toks.length;i++){var t=toks[i],w=tokW(t,s),tc=(o.cols&&o.cols[i])||c,b=o.boldLast&&i===toks.length-1;
if(Array.isArray(t))await frac(x+w/2,ly,t[0],t[1],{size:s,c:tc,bold:b});
else if(typeof t==='object'){var gw=String(t.g).length*s*0.5;await write(x+gw/2,ly+s*0.32,String(t.g),{size:s*1.1,c:tc,anchor:'middle',bold:b});var fw=w-gw-9;await frac(x+gw+9+fw/2,ly,t.z,t.n,{size:s,c:tc,bold:b})}
else await write(x+w/2,ly+s*0.3,String(t),{size:s,c:tc||(t==='−'||t==='+'||t==='='?'#2f2f33':undefined),anchor:'middle',bold:t==='='||t==='+'||t==='−'||b});
x+=w+gap}return x}
async function label(x,ly,s,c){await write(x,ly+9,s,{size:26,c:c||BLUE,bold:true})}
/* Ellipse um einen Bruch (höher als breit, damit nichts durchgestrichen wird) */
async function ell(cx,cy,rx,ry,c){var p=[];for(var i=0;i<=40;i++){var a=(-110+i*9.5)*Math.PI/180;p.push([cx+rx*Math.cos(a),cy+ry*Math.sin(a)])}await stroke(p,{c:c||GR,w:2.4,j:0.3,ms:500})}
