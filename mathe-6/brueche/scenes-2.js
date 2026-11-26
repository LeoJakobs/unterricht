/* Thema 2: Brüche vergleichen und ordnen */
var nN=[["1. Zwei Fünftel:","2 von 5 Teilen."],["2. Vier Fünftel:","4 von 5 Teilen."],["3. Gleich große Teile:","mehr Teile ist mehr."],["4. Die Spitze von < zeigt","zur kleineren Zahl."]];
var nS=[
async function(){await bar(40,80,300,56,5,2);await frac(440,108,2,5);await note(0)},
async function(){await bar(40,220,300,56,5,4,{fill:FILL2});await frac(440,248,4,5);await note(1)},
async function(){await frac(180,460,2,5);await sym(260,460,'<',{c:GR});await frac(340,460,4,5);await note(2)},
async function(){await circ(180,434,22);await circ(340,434,22);await note(3);await wait(300);await merke('Gleicher Nenner: Vergleiche','nur die Zähler.')}
];
var zN=[["1. Ein Drittel:","1 von 3 Teilen."],["2. Ein Fünftel:","1 von 5 Teilen."],["3. Mehr Teile heißt:","kleinere Stücke."],["4. Kleinerer Nenner:","größerer Bruch."]];
var zS=[
async function(){await bar(40,80,300,56,3,1);await frac(440,108,1,3);await note(0)},
async function(){await bar(40,220,300,56,5,1,{fill:FILL2});await frac(440,248,1,5);await note(1)},
async function(){await frac(180,460,1,3);await sym(260,460,'>',{c:GR});await frac(340,460,1,5);await note(2)},
async function(){await circ(180,481,22);await circ(340,481,22);await note(3);await wait(300);await merke('Gleicher Zähler: Kleinerer','Nenner = größerer Bruch.')}
];
var vN=[["1. Nenner und Zähler","sind verschieden."],["2. Gemeinsamer Nenner:","12 ist in beiden Reihen."],["3. Zwei Drittel mit 4","erweitern: 8 Zwölftel."],["4. Drei Viertel mit 3","erweitern: 9 Zwölftel."],["5. Jetzt Zähler vergleichen:","8 ist kleiner als 9."]];
var R3=[3,6,9,12],R4=[4,8,12];
var vS=[
async function(){await frac(160,100,2,3);await sym(240,100,'?',{c:GR});await frac(320,100,3,4);await note(0)},
async function(){await write(40,226,'3er-Reihe:',{size:30,c:BLUE});for(var i=0;i<4;i++)await write(210+i*58,226,R3[i]+(i<3?',':''),{size:32,anchor:'middle'});
await write(40,280,'4er-Reihe:',{size:30,c:BLUE});for(var i=0;i<3;i++)await write(210+i*58,280,R4[i]+(i<2?',':''),{size:32,anchor:'middle'});
await circ(386,216,24);await circ(326,270,24);await note(1)},
async function(){await frac(90,420,2,3);await sym(170,420,'=');await frac(250,420,8,12);await eqBows(90,250,420,'· 4');await note(2)},
async function(){await frac(380,420,3,4);await sym(460,420,'=');await frac(540,420,9,12);await eqBows(380,540,420,'· 3');await note(3)},
async function(){var s={size:32};await frac(80,580,8,12,s);await sym(140,580,'<',{c:GR,size:32});await frac(200,580,9,12,s);await write(290,590,'also',{size:30,c:BLUE,anchor:'middle'});await frac(370,580,2,3,s);await sym(425,580,'<',{c:GR,size:32});await frac(480,580,3,4,s);await note(4);await wait(300);await merke('Erst gleichnamig machen,','dann die Zähler vergleichen.')}
];
var X0=50,ST=44,YL=290;
var px=function(k){return X0+k*ST};
async function hops(a,b,c){for(var k=a;k<b;k++){var p=[];for(var i=0;i<=10;i++){var t=i/10;p.push([px(k)+4+(ST-8)*t,YL-6-16*Math.sin(Math.PI*t)])}await stroke(p,{c:c||GR,w:2,j:0.2,ms:220})}}
var sN=[["1. Von 0 bis 1 sind es","6 gleiche Schritte."],["2. Fünf Sechstel:","5 Schritte nach rechts."],["3. Sieben Sechstel liegt","hinter der 1."],["4. Weiter rechts heißt:","größer."]];
var sS=[
async function(){await stroke(linePts(px(0)-14,YL,px(12)+26,YL),{w:2.4,j:0.3,ms:900});await stroke(linePts(px(12)+14,YL-8,px(12)+26,YL),{w:2.4,j:0.1,ms:150});await stroke(linePts(px(12)+14,YL+8,px(12)+26,YL),{w:2.4,j:0.1,ms:150});
for(var k=0;k<=12;k++){var L=k%6===0?16:9;await stroke(linePts(px(k),YL-L,px(k),YL+L),{w:k%6===0?2.6:1.8,j:0.2,ms:110})}
for(var k=0;k<=12;k+=6)await write(px(k),YL+50,String(k/6),{size:36,anchor:'middle',bold:true});await note(0)},
async function(){await hops(0,5,BLUE);await stroke(arcPts(px(5),YL,7,0,360),{c:BLUE,w:3,j:0.1,ms:250});await frac(px(5),190,5,6,{size:34,c:BLUE});await note(1)},
async function(){await hops(5,7,GR);await stroke(arcPts(px(7),YL,7,0,360),{c:GR,w:3,j:0.1,ms:250});await frac(px(7),190,7,6,{size:34,c:GR});
await sym(px(7)+48,190,'=',{size:34});await write(px(7)+84,204,'1',{size:42,anchor:'middle'});await frac(px(7)+114,190,1,6,{size:34,c:GR});await note(2)},
async function(){var s={size:34};await frac(200,540,5,6,s);await sym(260,540,'<',{c:GR,size:34});await frac(320,540,7,6,s);await note(3);await wait(300);await merke('Am Zahlenstrahl liegt die','größere Zahl immer rechts.')}
];
SCN={
gn:{pre:'n',label:'Teil 1 · Gleicher Nenner',notes:nN,ys:ysOf(nN),steps:nS,nextLabel:'Weiter: Gleicher Zähler',after:'gz',aria:'Animierte Erklärung: zwei Fünftel und vier Fünftel vergleichen'},
gz:{pre:'z',label:'Teil 2 · Gleicher Zähler',notes:zN,ys:ysOf(zN),steps:zS,nextLabel:'Weiter: Verschiedene Nenner',after:'vn',aria:'Animierte Erklärung: ein Drittel und ein Fünftel vergleichen'},
vn:{pre:'v',label:'Teil 3 · Verschiedene Nenner',notes:vN,ys:ysOf(vN),steps:vS,nextLabel:'Weiter: Zahlenstrahl',after:'zs',aria:'Animierte Erklärung: zwei Drittel und drei Viertel gleichnamig machen und vergleichen'},
zs:{pre:'s',label:'Teil 4 · Zahlenstrahl',notes:sN,ys:ysOf(sN),steps:sS,nextLabel:'Von vorn',after:null,aria:'Animierte Erklärung: fünf Sechstel und sieben Sechstel am Zahlenstrahl'}
};
var SCN_ORDER=['gn','gz','vn','zs'];
