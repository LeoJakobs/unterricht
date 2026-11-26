/* Thema 3: Summe der Innenwinkel */
var TA=[100,440],TB=[480,440],TC=[337.4,203];
var QA=[130,450],QB=[500,450],QC=[404,187],QD=[84,187];
var GR='#b23b2a';
function angOf(v,u){return Math.atan2(u[1]-v[1],u[0]-v[0])*180/Math.PI}
/* Winkelbogen im Inneren: Ecke v, Nachbarn u und w */
function angMark(v,u,w,r){var a0=angOf(v,u),a1=angOf(v,w),d=a1-a0;while(d>180)d-=360;while(d<-180)d+=360;return{a0:a0,a1:a0+d,mid:(a0+d/2)*Math.PI/180,r:r,v:v}}
async function drawAng(m,c){await stroke(arcPts(m.v[0],m.v[1],m.r,m.a0,m.a1),{c:c||BLUE,w:2.4,j:0.3,ms:600})}
function lblPos(m,k){return[m.v[0]+Math.cos(m.mid)*(m.r+k),m.v[1]+Math.sin(m.mid)*(m.r+k)]}
var tM=[angMark(TA,TB,TC,44),angMark(TB,TC,TA,44),angMark(TC,TA,TB,36)];
var qM=[angMark(QA,QB,QD,44),angMark(QB,QC,QA,44),angMark(QC,QD,QB,40),angMark(QD,QA,QC,40)];
async function poly(P){for(var i=0;i<P.length;i++){var p=P[i],q=P[(i+1)%P.length];var r=ruler(p[0],p[1],q[0],q[1]);await fade(r,1);await stroke(linePts(p[0],p[1],q[0],q[1]),{w:2.4,ms:700});await fade(r,0);r.remove()}}
async function greek(M,names,k){for(var i=0;i<M.length;i++){var p=lblPos(M[i],k||24);await write(p[0]-10,p[1]+10,names[i],{size:34,c:BLUE})}}

var dNotes=[["1. Ein Dreieck hat 3 Ecken –","also 3 Innenwinkel: α, β, γ."],["2. Beispiel: α = 45° und β = 59°.","Wie groß ist γ?"],["3. Alle 3 Winkel zusammen","sind immer 180°."],["4. Rechne 180° minus die","beiden bekannten Winkel."],["5. Probe: alles zusammen","muss 180° ergeben."]];
var dSteps=[
async function(){await poly([TA,TB,TC]);for(var m of tM)await drawAng(m);await greek(tM,['α','β','γ']);await note(0)},
async function(){var a=lblPos(tM[0],56),b=lblPos(tM[1],56);
await write(a[0]-6,a[1]+8,'45°',{size:36,c:GR,bold:true});await write(b[0]-32,b[1]+8,'59°',{size:36,c:GR,bold:true});
var c=lblPos(tM[2],40);await write(c[0]+8,c[1]+48,'?',{size:50,c:GR,bold:true});await note(1)},
async function(){await write(120,505,'α + β + γ = 180°',{size:42,c:BLUE,bold:true});await note(2)},
async function(){await write(120,555,'γ = 180° − 45° − 59°',{size:36});await write(120,600,'γ = 76°',{size:40,c:GR,bold:true});await note(3)},
async function(){await note(4);await write(270,600,'45° + 59° + 76° = 180° ✓',{size:30,c:'#2e7d32',bold:true});await wait(300);
await merke('Merke: Im Dreieck sind alle','Winkel zusammen 180°.')}
];

var vNotes=[["1. Ein Viereck hat 4 Ecken und","4 Innenwinkel: α, β, γ, δ."],["2. Eine Diagonale teilt das","Viereck in 2 Dreiecke."],["3. Jedes Dreieck hat 180°.","Also: 2 · 180° = 360°."],["4. Beispiel: α = 100°, β = 70°,","γ = 110°. Wie groß ist δ?"],["5. Rechne 360° minus die","drei bekannten Winkel."],["6. Probe: alles zusammen","muss 360° ergeben."]];
var vSteps=[
async function(){await poly([QA,QB,QC,QD]);for(var m of qM)await drawAng(m);await greek(qM,['α','β','γ','δ'],22);await note(0)},
async function(){var r=ruler(QA[0],QA[1],QC[0],QC[1]);await fade(r,1);await stroke(linePts(QA[0],QA[1],QC[0],QC[1]),{c:BLUE,w:3,ms:1100});await fade(r,0);r.remove();await note(1)},
async function(){await write(330,390,'180°',{size:38,c:BLUE,bold:true});await write(140,260,'180°',{size:38,c:BLUE,bold:true});await write(120,515,'180° + 180° = 360°',{size:40,c:BLUE,bold:true});await note(2)},
async function(){await write(40,490,'100°',{size:36,c:GR,bold:true});await write(505,490,'70°',{size:36,c:GR,bold:true});await write(414,172,'110°',{size:36,c:GR,bold:true});await write(20,170,'δ = ?',{size:36,c:GR,bold:true});await note(3)},
async function(){await write(100,560,'δ = 360° − 100° − 70° − 110°',{size:32});await write(100,604,'δ = 80°',{size:40,c:GR,bold:true});await note(4)},
async function(){await note(5);await write(270,604,'100° + 70° + 110° + 80° = 360° ✓',{size:27,c:'#2e7d32',bold:true});await wait(300);
await merke('Merke: Im Viereck sind alle','Winkel zusammen 360°.')}
];

SCN={
dr:{pre:'d',label:'Teil 1 · Dreieck',notes:dNotes,ys:ysOf(dNotes),steps:dSteps,red:false,nextLabel:'Weiter: Viereck',after:'vi',aria:'Animierte Erklärung: Die Winkelsumme im Dreieck ist 180 Grad'},
vi:{pre:'v',label:'Teil 2 · Viereck',notes:vNotes,ys:ysOf(vNotes),steps:vSteps,red:false,nextLabel:'Von vorn',after:null,aria:'Animierte Erklärung: Die Winkelsumme im Viereck ist 360 Grad'}
};
var SCN_ORDER=['dr','vi'];
