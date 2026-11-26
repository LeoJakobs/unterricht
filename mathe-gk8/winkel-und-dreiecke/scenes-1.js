/* Thema 1: Winkel messen und zeichnen */
var aN=[["1. Spitz: kleiner als 90°."],["2. Rechter Winkel: genau 90°.","Bogen mit Punkt."],["3. Stumpf: größer als 90°","und kleiner als 180°."],["4. Gestreckt: genau 180°.","Das ist eine gerade Linie."]];
var C1=[90,190],C2=[350,190],C3=[110,440],C4=[400,440];
async function legs(c,deg,len){await line2(c,[c[0]+len,c[1]]);var q=pol(c,len,-deg);await line2(c,q)}
var aS=[
async function(){await legs(C1,45,150);await arcAt(C1,40,-45,0);await write(C1[0]+10,C1[1]+50,'spitz',{size:32,c:BLUE,bold:true});await note(0)},
async function(){await legs(C2,90,150);await rightAngle(C2,-90,0,34);await write(C2[0]+10,C2[1]+50,'rechter Winkel',{size:32,c:BLUE,bold:true});await note(1)},
async function(){await legs(C3,125,150);await arcAt(C3,36,-125,0);await write(C3[0]+10,C3[1]+50,'stumpf',{size:32,c:BLUE,bold:true});await note(2)},
async function(){await line2([C4[0]-70,C4[1]],[C4[0]+150,C4[1]]);await arcAt(C4,36,-180,0);await write(C4[0]-60,C4[1]+50,'gestreckt',{size:32,c:BLUE,bold:true});await note(3);await wait(300);await merke('Merke: spitz < 90°, rechter = 90°,','stumpf > 90°, gestreckt = 180°.')}
];
var S=[300,440],RR=180;
var mN=[["1. Das ist der Winkel.","S ist der Scheitelpunkt."],["2. Nullpunkt des Geodreiecks","genau auf S legen."],["3. Lange Seite genau auf","den ersten Schenkel legen."],["4. Zwei Skalen! Nimm die mit","der 0 am ersten Schenkel."],["5. Am zweiten Schenkel","ablesen: α = 50°."],["6. Kontrolle: spitz, also","kleiner als 90°. Stimmt!"]];
var PRO=null,HL=[];
var mark=function(n0){HL=HL.concat(Array.from(G.ink.children).slice(n0))};
async function skalaMarkieren(){await arcAt(S,RR+8,-180,0,GR,3.4);await stroke(arcPts(S[0]+RR*0.965,S[1],14,0,360),{c:GR,w:2.8,j:0.2,ms:500})}
var mS=[
async function(){await line2(S,[S[0]+300,S[1]]);await line2(S,pol(S,320,-50));await cross(S[0],S[1]);await write(S[0]-40,S[1]+46,'S',{size:36});await arcAt(S,50,-50,0);await greekAt(S,76,-25,'α');await note(0)},
async function(){PRO=protractor(S,RR);await fade(PRO,1);await stroke(arcPts(S[0],S[1],14,0,360),{c:GR,w:2.6,j:0.2,ms:500});await note(1)},
async function(){await stroke(linePts(S[0]+20,S[1]+10,S[0]+T0(),S[1]+10),{c:GR,w:3,ms:800,j:0.3});await note(2)},
async function(){await skalaMarkieren();await write(40,530,'Die Skala mit der 0 am Schenkel!',{size:36,c:GR,bold:true});await note(3)},
async function(){var p=pol(S,RR*0.965,-50);await stroke(arcPts(p[0],p[1],13,0,360),{c:GR,w:2.8,j:0.2,ms:500});await valAt(S,235,-50,'50°',0);await write(40,590,'α = 50°',{size:46,c:GR,bold:true});await note(4)},
async function(){await write(250,592,'(130° wäre falsch: andere Skala)',{size:26,c:GR,bold:true});await note(5);await wait(300);await merke('Merke: Nimm die Skala, die beim','ersten Schenkel mit 0 beginnt.')}
];
function T0(){return RR/0.63-20}
var zN=[["1. Zeichne einen Schenkel mit","dem Lineal. Markiere S."],["2. Nullpunkt auf S, lange Seite","auf den Schenkel legen."],["3. Skala mit der 0 am Schenkel:","bei 50° einen Punkt machen."],["4. Geodreieck weg. Verbinde S","mit dem Punkt."],["5. Zeichne den Winkelbogen","und schreibe 50° dazu."]];
var zS=[
async function(){await line2(S,[S[0]+300,S[1]]);await cross(S[0],S[1]);await write(S[0]-40,S[1]+46,'S',{size:36});await note(0)},
async function(){HL=[];var n0=G.ink.children.length;PRO=protractor(S,RR);await fade(PRO,1);await stroke(arcPts(S[0],S[1],14,0,360),{c:GR,w:2.6,j:0.2,ms:500});mark(n0);await note(1)},
async function(){var n0=G.ink.children.length;await skalaMarkieren();mark(n0);var p=pol(S,RR+4,-50);await cross(p[0],p[1],GR);await valAt(S,235,-50,'50°',0);await note(2)},
async function(){await fade(PRO,0);PRO.remove();HL.forEach(function(e){e.remove()});var p=pol(S,RR+4,-50);await line2(S,[S[0]+(p[0]-S[0])*1.8,S[1]+(p[1]-S[1])*1.8],BLUE);await note(3)},
async function(){await arcAt(S,50,-50,0);await greekAt(S,80,-25,'50°',GR,32);await note(4);await wait(300);await merke('Merke: Nimm die Skala, die beim','Schenkel mit 0 beginnt.')}
];
SCN={
wa:{pre:'a',label:'Teil 1 · Winkelarten',notes:aN,ys:ysOf(aN),steps:aS,red:false,nextLabel:'Weiter: Winkel messen',after:'me',aria:'Animierte Erklärung: spitze, rechte, stumpfe und gestreckte Winkel'},
me:{pre:'m',label:'Teil 2 · Winkel messen',notes:mN,ys:ysOf(mN),steps:mS,red:false,nextLabel:'Weiter: Winkel zeichnen',after:'ze',aria:'Animierte Erklärung: einen Winkel mit dem Geodreieck messen'},
ze:{pre:'z',label:'Teil 3 · Winkel zeichnen',notes:zN,ys:ysOf(zN),steps:zS,red:false,nextLabel:'Von vorn',after:null,aria:'Animierte Erklärung: einen Winkel von 50 Grad mit dem Geodreieck zeichnen'}
};
var SCN_ORDER=['wa','me','ze'];
