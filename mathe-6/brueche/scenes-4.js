/* Thema 4: Gemischte Zahlen addieren und subtrahieren */
var mN=[["1. Ein Ganzes und","ein Viertel."],["2. Ein Ganzes sind","vier Viertel."],["3. Zurück: Zähler durch","Nenner teilen, mit Rest."],["4. 2 Ganze, und 3 Fünftel","bleiben übrig."]];
var mS=[
async function(){await bar(40,70,220,46,4,4);await write(150,150,'1 Ganzes',{size:30,anchor:'middle',c:BLUE});await bar(320,70,220,46,4,1);await frac(430,160,1,4,{size:34,c:BLUE});await note(0)},
async function(){await expr(40,280,[{g:1,z:1,n:4},'=',[4,4],'+',[1,4],'=',[5,4]],{boldLast:true});await note(1)},
async function(){await expr(40,420,[[13,5],'→']);await write(170,432,'13 : 5 = 2 Rest 3',{size:38,c:BLUE,bold:true});await note(2)},
async function(){await expr(40,550,[[13,5],'=',{g:2,z:3,n:5}],{boldLast:true,gap:22});await ell(190,552,46,56,GN);await note(3);await wait(300);await merke('Ein Ganzes sind alle Teile,','z. B. vier Viertel.')}
];
var X0=230;
var pN=[["1. Zwei gemischte Zahlen."],["2. Trennen: Ganze","und Brüche."],["3. Vertauschen:","die Ganzen nach vorn."],["4. Ein Halb sind","zwei Viertel."],["5. Erst die Ganzen,","dann die Brüche."]];
var pS=[
async function(){await expr(40,70,[{g:1,z:1,n:4},'+',{g:1,z:1,n:2}]);await note(0)},
async function(){await label(20,185,'trennen');await expr(X0,185,['=',1,'+',[1,4],'+',1,'+',[1,2]]);await note(1)},
async function(){await label(20,300,'vertauschen');await expr(X0,300,['=',1,'+',1,'+',[1,4],'+',[1,2]],{cols:[null,BLUE,null,BLUE]});await note(2)},
async function(){await label(20,415,'erweitern');await expr(X0,415,['=',1,'+',1,'+',[1,4],'+',[2,4]],{cols:[null,null,null,null,null,null,null,GN]});await note(3)},
async function(){await label(20,545,'addieren');var x=await expr(X0,545,['=',2,'+',[3,4]]);await expr(x,545,['=',{g:2,z:3,n:4}],{boldLast:true});await note(4);await wait(300);await merke('Erst die Ganzen, dann','die Brüche addieren.')}
];
var qN=[["1. Jetzt minus."],["2. Trennen: Das Minus steht","vor der 1 und vor dem Bruch."],["3. Vertauschen:","die Ganzen nach vorn."],["4. Zwei Drittel sind","vier Sechstel."],["5. Erst die Ganzen,","dann die Brüche."]];
var qS=[
async function(){await expr(40,70,[{g:2,z:5,n:6},'−',{g:1,z:2,n:3}]);await note(0)},
async function(){await label(20,185,'trennen');await expr(X0,185,['=',2,'+',[5,6],'−',1,'−',[2,3]],{cols:[null,null,null,null,GR,null,GR]});await note(1)},
async function(){await label(20,300,'vertauschen');await expr(X0,300,['=',2,'−',1,'+',[5,6],'−',[2,3]]);await note(2)},
async function(){await label(20,415,'erweitern');await expr(X0,415,['=',2,'−',1,'+',[5,6],'−',[4,6]],{cols:[null,null,null,null,null,null,null,GN]});await note(3)},
async function(){await label(20,545,'rechnen');var x=await expr(X0,545,['=',1,'+',[1,6]]);await expr(x,545,['=',{g:1,z:1,n:6}],{boldLast:true});await note(4);await wait(300);await merke('Achte beim Trennen auf','das Minuszeichen.')}
];
SCN={
gz:{pre:'m',label:'Teil 1 · Gemischte Zahl',notes:mN,ys:ysOf(mN),steps:mS,nextLabel:'Weiter: Addieren',after:'ad',aria:'Animierte Erklärung: gemischte Zahl und unechter Bruch'},
ad:{pre:'p',label:'Teil 2 · Addieren',notes:pN,ys:ysOf(pN),steps:pS,nextLabel:'Weiter: Subtrahieren',after:'su',aria:'Animierte Erklärung: eins ein Viertel plus eins ein Halb'},
su:{pre:'q',label:'Teil 3 · Subtrahieren',notes:qN,ys:ysOf(qN),steps:qS,nextLabel:'Von vorn',after:null,aria:'Animierte Erklärung: zwei fünf Sechstel minus eins zwei Drittel'}
};
var SCN_ORDER=['gz','ad','su'];
