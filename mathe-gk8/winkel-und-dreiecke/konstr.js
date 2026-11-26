/* Gemeinsame Hilfen für Thema 5-7: Konstruktionen mit Geodreieck und Zirkel */
var KS=36;
var RED='#b23b2a',GRN='#2e7d32';
function angD(p,q){return Math.atan2(q[1]-p[1],q[0]-p[0])*180/Math.PI}
function pt2(o,a,d){return[o[0]+d*Math.cos(a*Math.PI/180),o[1]+d*Math.sin(a*Math.PI/180)]}
async function gegeben(txt,y){await write(20,y||52,txt,{size:34,c:BLUE,bold:true})}
/* Planfigur: Skizze links oben. sides = rot markierte Seiten (a,b,c), angs = rot markierte Winkel (alpha,beta) */
async function planfigur(sides,angs){var P=[[40,222],[200,222],[96,132]];
var seg=[[0,1,'c'],[0,2,'b'],[1,2,'a']];
for(var s of seg){var red=sides.indexOf(s[2])>=0;await stroke(linePts(P[s[0]][0],P[s[0]][1],P[s[1]][0],P[s[1]][1]),{c:red?RED:'#3b3b3e',w:red?3.2:2,j:0.5,ms:520})}
await write(P[0][0]-30,P[0][1]+10,'A',{size:26});await write(P[1][0]+8,P[1][1]+10,'B',{size:26});await write(P[2][0]-8,P[2][1]-8,'C',{size:26});
var cl=function(k){return sides.indexOf(k)>=0?RED:'#2f2f33'};
await write(112,248,'c',{size:26,c:cl('c')});await write(54,176,'b',{size:26,c:cl('b')});await write(158,176,'a',{size:26,c:cl('a')});
if(angs.indexOf('alpha')>=0){await stroke(arcPts(P[0][0],P[0][1],28,angD(P[0],P[2]),0),{c:RED,w:2.6,j:0.2,ms:420});await write(P[0][0]+34,P[0][1]-8,'α',{size:26,c:RED,bold:true})}
if(angs.indexOf('beta')>=0){await stroke(arcPts(P[1][0],P[1][1],28,180,360+angD(P[1],P[2])),{c:RED,w:2.6,j:0.2,ms:420});await write(P[1][0]-48,P[1][1]-8,'β',{size:26,c:RED,bold:true})}}
async function eckenAB(A,B){await line2(A,B);await cross(A[0],A[1]);await cross(B[0],B[1]);await write(A[0]-34,A[1]+42,'A',{size:36});await write(B[0]+10,B[1]+42,'B',{size:36})}
/* Winkel mit dem Geodreieck abtragen. side 'r': 0 rechts (äußere Skala), 'l': 0 links (innere Skala) */
var KP=null,KH=[],KT=[];
async function geoAn(c,R,side,deg){KH=[];var n0=G.ink.children.length,t0=G.txt.children.length;KP=protractor(c,R);await fade(KP,1);
await stroke(arcPts(c[0],c[1],12,0,360),{c:GR,w:2.6,j:0.2,ms:450});
if(side==='r'){await stroke(arcPts(c[0],c[1],R+8,-180,0),{c:GR,w:3.2,j:0.3,ms:650});var p0=pol(c,R*0.965,0);await stroke(arcPts(p0[0],p0[1],14,0,360),{c:GR,w:2.8,j:0.2,ms:420})}
else{await stroke(arcPts(c[0],c[1],R*0.66,-180,0),{c:GR,w:3.2,j:0.3,ms:650});var q0=pol(c,R*0.77,-180);await stroke(arcPts(q0[0],q0[1],13,0,360),{c:GR,w:2.8,j:0.2,ms:420})}
var dir=side==='r'?-deg:-(180-deg);var p=pol(c,R+4,dir);await cross(p[0],p[1],GR);
var v=pol(c,R+52,dir);await write(v[0]-20,v[1]+10,deg+'°',{size:38,c:GR,bold:true});
KH=Array.from(G.ink.children).slice(n0);KT=Array.from(G.txt.children).slice(t0)}
async function geoWeg(){await fade(KP,0);KP.remove();KP=null;KH.forEach(function(e){e.remove()});KT.forEach(function(e){e.remove()});KH=[];KT=[]}
/* Linie vom Punkt c in Richtung dir (Grad), Länge len */
async function strahl(c,dir,len,col){var q=pt2(c,dir,len);await line2(c,q,col||BLUE)}
