/* Thema 3: Brüche addieren und subtrahieren */
var aN=[["1. Drei Achtel."],["2. Zwei Achtel kommen dazu."],["3. Zähler + Zähler.","Der Nenner bleibt gleich."],["4. Die Nenner nie","addieren!"]];
var aS=[
async function(){await bar(40,60,320,46,8,3);await frac(450,84,3,8);await note(0)},
async function(){await bar(40,150,320,46,8,2,{fill:FILL2});await frac(450,174,2,8);await note(1)},
async function(){await bar(40,260,320,46,8,3);await shade(40,260,320,46,8,3,5,FILL2);await frac(450,284,5,8,{bold:true});
var x=await expr(60,420,[[3,8],'+',[2,8],'=',[5,8]],{boldLast:true});await write(x+10,432,'(3 + 2 = 5)',{size:30,c:BLUE});await note(2)},
async function(){await expr(60,560,[[3,8],'+',[2,8],'=',[5,16]],{c:GR});await stroke(linePts(40,600,330,525),{c:GR,w:3,j:0.3,ms:500});await write(360,572,'falsch!',{size:36,c:GR,bold:true});await note(3);await wait(300);await merke('Gleicher Nenner: Rechne','nur mit den Zählern.')}
];
var bN=[["1. Vier Fünftel."],["2. Ein Fünftel wegnehmen:","durchstreichen."],["3. Zähler − Zähler.","Der Nenner bleibt gleich."]];
var bS=[
async function(){await bar(40,90,350,52,5,4);await frac(480,116,4,5);await note(0)},
async function(){await xpart(40,90,350,52,5,3);await frac(480,236,1,5,{c:GR});await write(405,248,'−',{size:40,c:GR,bold:true});await note(1)},
async function(){var x=await expr(60,420,[[4,5],'−',[1,5],'=',[3,5]],{boldLast:true});await write(x+10,432,'(4 − 1 = 3)',{size:30,c:BLUE});await note(2);await wait(300);await merke('Minus geht genauso: Rechne','nur mit den Zählern.')}
];
var cN=[["1. Verschiedene Nenner:","6 und 3."],["2. Passt die 3 in die 6?","Ja: 3 · 2 = 6."],["3. Zwei Drittel mit 2","erweitern: vier Sechstel."],["4. Jetzt gleicher Nenner:","1 + 4 = 5."]];
var cS=[
async function(){await expr(40,100,[[1,6],'+',[2,3],'=','?']);await note(0)},
async function(){await write(330,112,'3 · 2 = 6',{size:38,c:BLUE,bold:true});await under(330,480,124,BLUE);await note(1)},
async function(){await bar(40,210,300,46,3,2,{fill:FILL2});await split(40,210,300,46,3,2,GN);await expr(380,234,[[2,3],'=',[4,6]],{cols:[null,null,GN]});await note(2)},
async function(){var x=await expr(40,400,[[1,6],'+',[2,3],'=',[1,6],'+',['2 · 2','3 · 2']]);await expr(40,530,['=',[1,6],'+',[4,6],'=',[5,6]],{boldLast:true});await note(3);await wait(300);await merke('Erst einen Bruch erweitern,','dann die Zähler rechnen.')}
];
var dN=[["1. Die 3 passt nicht","in die 5."],["2. Nenner malnehmen:","5 · 3 = 15."],["3. Zwei Fünftel","mit 3 erweitern."],["4. Ein Drittel","mit 5 erweitern."],["5. Jetzt rechnen:","6 − 5 = 1."]];
var dS=[
async function(){await expr(40,100,[[2,5],'−',[1,3],'=','?']);await note(0)},
async function(){await write(330,112,'5 · 3 = 15',{size:38,c:BLUE,bold:true});await under(330,500,124,BLUE);await note(1)},
async function(){await expr(40,230,[[2,5],'=',['2 · 3','5 · 3'],'=',[6,15]],{cols:[null,null,GN,null,GN]});await note(2)},
async function(){await expr(40,360,[[1,3],'=',['1 · 5','3 · 5'],'=',[5,15]],{cols:[null,null,GN,null,GN]});await note(3)},
async function(){await expr(40,500,[[6,15],'−',[5,15],'=',[1,15]],{boldLast:true});await note(4);await wait(300);await merke('Kein Nenner passt? Dann','beide Brüche erweitern.')}
];
var fN=[["1. Drei Brüche."],["2. Zwei haben den gleichen","Nenner: Fünftel."],["3. Vertauschen:","die Fünftel zuerst."],["4. Zusammenrechnen,","dann erweitern."]];
var fS=[
async function(){await expr(40,100,[[1,5],'+',[1,10],'+',[2,5]],{gap:26});await note(0)},
async function(){await ell(56,102,30,54,BLUE);await ell(293,102,30,54,BLUE);await note(1)},
async function(){await expr(40,250,['=',[1,5],'+',[2,5],'+',[1,10]]);await note(2)},
async function(){await expr(40,390,['=',[3,5],'+',[1,10]]);await expr(40,520,['=',[6,10],'+',[1,10],'=',[7,10]],{boldLast:true});await note(3);await wait(300);await merke('Gleiche Nenner zuerst','zusammenrechnen.')}
];
SCN={
gn:{pre:'a',label:'Teil 1 · Plus',notes:aN,ys:ysOf(aN),steps:aS,nextLabel:'Weiter: Minus',after:'mi',aria:'Animierte Erklärung: drei Achtel plus zwei Achtel'},
mi:{pre:'b',label:'Teil 2 · Minus',notes:bN,ys:ysOf(bN),steps:bS,nextLabel:'Weiter: Einen Bruch erweitern',after:'ee',aria:'Animierte Erklärung: vier Fünftel minus ein Fünftel'},
ee:{pre:'c',label:'Teil 3 · Einen Bruch erweitern',notes:cN,ys:ysOf(cN),steps:cS,nextLabel:'Weiter: Beide erweitern',after:'be',aria:'Animierte Erklärung: ein Sechstel plus zwei Drittel'},
be:{pre:'d',label:'Teil 4 · Beide erweitern',notes:dN,ys:ysOf(dN),steps:dS,nextLabel:'Weiter: Geschickt rechnen',after:'gr',aria:'Animierte Erklärung: zwei Fünftel minus ein Drittel'},
gr:{pre:'f',label:'Teil 5 · Geschickt rechnen',notes:fN,ys:ysOf(fN),steps:fS,nextLabel:'Von vorn',after:null,aria:'Animierte Erklärung: Brüche vertauschen und geschickt addieren'}
};
var SCN_ORDER=['gn','mi','ee','be','gr'];
