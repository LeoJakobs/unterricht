/* Thema 4: Mittelsenkrechte und Umkreis */
var A=[170,320],B=[430,320],S1=[300,210.5],S2=[300,429.5];
var msNotes=[["0. Strecke AB mit dem","Geodreieck zeichnen."],["1. Zirkel in A einstechen,","Radius größer als ½ AB,","Bogen oben und unten."],["2. Zirkel nicht verstellen!","In B einstechen und","zweiten Bogen ziehen."],["3. Schnittpunkte S₁ und S₂","markieren."],["4. S₁ und S₂ mit dem Geodreieck","verbinden – fertig!"]];
var msSteps=[
async function(){var r=ruler(140,320,460,320);await fade(r,1);await stroke(linePts(140,320,460,320),{w:2.4,ms:1100});await fade(r,0);r.remove();
await cross(A[0],A[1]);await cross(B[0],B[1]);await write(150,360,'A',{size:36});await write(434,360,'B',{size:36});await note(0)},
async function(){await arcWithCompass(A,170,-50,50);await note(1)},
async function(){await arcWithCompass(B,170,230,130);await note(2)},
async function(){await cross(S1[0],S1[1]);await write(310,178,'S₁',{size:34});await cross(S2[0],S2[1]);await write(310,478,'S₂',{size:34});await note(3)},
async function(){var r=ruler(300,120,300,530);await fade(r,1);await stroke(linePts(300,120,300,530),{c:BLUE,w:3,ms:1300});await fade(r,0);r.remove();
await stroke([[300,300],[320,300],[320,320]],{c:BLUE,w:1.8,j:0.3,ms:400});el('circle',{cx:310,cy:310,r:2.2,fill:BLUE});
await write(268,352,'M',{size:32,c:BLUE});await note(4);await wait(300);
await merke('Merke: Jeder Punkt darauf ist','von A und B gleich weit weg.')}
];

var PA=[122,398],PB=[463,459],PC=[293,131];
var dist=function(p,q){return Math.hypot(q[0]-p[0],q[1]-p[1])};
function circ(a,b,c){var d=2*(a[0]*(b[1]-c[1])+b[0]*(c[1]-a[1])+c[0]*(a[1]-b[1])),a2=a[0]*a[0]+a[1]*a[1],b2=b[0]*b[0]+b[1]*b[1],c2=c[0]*c[0]+c[1]*c[1];
return[(a2*(b[1]-c[1])+b2*(c[1]-a[1])+c2*(a[1]-b[1]))/d,(a2*(c[0]-b[0])+b2*(a[0]-c[0])+c2*(b[0]-a[0]))/d]}
function bis(p,q){var d=dist(p,q),r=d*0.65,m=[(p[0]+q[0])/2,(p[1]+q[1])/2],h=Math.sqrt(r*r-d*d/4),ux=(q[0]-p[0])/d,uy=(q[1]-p[1])/d;
var T1=[m[0]-uy*h,m[1]+ux*h],T2=[m[0]+uy*h,m[1]-ux*h],ph=Math.acos(d/2/r)*180/Math.PI+10,
ap=Math.atan2(m[1]-p[1],m[0]-p[0])*180/Math.PI,aq=Math.atan2(m[1]-q[1],m[0]-q[0])*180/Math.PI;
return{r:r,S1:T1,S2:T2,ap0:ap-ph,ap1:ap+ph,aq0:aq-ph,aq1:aq+ph}}
async function bisect(p,q){var b=bis(p,q);await arcWithCompass(p,b.r,b.ap0,b.ap1);await arcWithCompass(q,b.r,b.aq0,b.aq1);
await cross(b.S1[0],b.S1[1]);await cross(b.S2[0],b.S2[1]);
var L=dist(b.S1,b.S2),ex=(b.S1[0]-b.S2[0])/L*40,ey=(b.S1[1]-b.S2[1])/L*40,x1=b.S1[0]+ex,y1=b.S1[1]+ey,x2=b.S2[0]-ex,y2=b.S2[1]-ey;
var r=ruler(x1,y1,x2,y2);await fade(r,1);await stroke(linePts(x1,y1,x2,y2),{c:BLUE,w:3,ms:1300});await fade(r,0);r.remove()}
var PM=circ(PA,PB,PC);
var ukNotes=[["0. Dreieck ABC mit dem","Geodreieck zeichnen."],["1. Mittelsenkrechte von AB:","je ein Bogen um A und B,","Schnittpunkte verbinden."],["2. Ebenso die Mittelsenkrechte","von BC konstruieren."],["3. Die beiden Geraden","schneiden sich in M.","Das ist der Mittelpunkt."],["4. Zirkel in M einstechen,","bis A aufziehen und","den Kreis zeichnen."]];
var ukSteps=[
async function(){for(var pq of [[PA,PB],[PB,PC],[PC,PA]]){var p=pq[0],q=pq[1];var r=ruler(p[0],p[1],q[0],q[1]);await fade(r,1);await stroke(linePts(p[0],p[1],q[0],q[1]),{w:2.4,ms:800});await fade(r,0);r.remove()}
await cross(PA[0],PA[1]);await cross(PB[0],PB[1]);await cross(PC[0],PC[1]);
await write(82,424,'A',{size:36});await write(474,488,'B',{size:36});await write(284,108,'C',{size:36});await note(0)},
async function(){await bisect(PA,PB);await note(1)},
async function(){await bisect(PB,PC);await note(2)},
async function(){await cross(PM[0],PM[1],BLUE);await write(PM[0]+14,PM[1]+36,'M',{size:34,c:BLUE});await note(3)},
async function(){var R=dist(PM,PA),a0=Math.atan2(PA[1]-PM[1],PA[0]-PM[0])*180/Math.PI;
await arcWithCompass(PM,R,a0,a0+360,{c:BLUE,w:2.6,ms:3200});await note(4);await wait(300);
await merke('Merke: M ist von A, B und C','gleich weit entfernt.')}
];

SCN={
ms:{pre:'s',label:'Teil 1 · Mittelsenkrechte',notes:msNotes,ys:ysOf(msNotes),steps:msSteps,red:true,nextLabel:'Weiter: Umkreis',after:'uk',aria:'Animierte Konstruktion der Mittelsenkrechten einer Strecke AB mit Zirkel und Geodreieck'},
uk:{pre:'u',label:'Teil 2 · Umkreis',notes:ukNotes,ys:ysOf(ukNotes),steps:ukSteps,red:false,nextLabel:'Von vorn',after:null,aria:'Animierte Konstruktion des Umkreises eines Dreiecks ABC mit Zirkel und Geodreieck'}
};
var SCN_ORDER=['ms','uk'];
