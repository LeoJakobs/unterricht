/* Thema 1: Brüche erweitern und kürzen */
var eN=[["1. Zwei von drei Teilen","sind gefärbt."],["2. Jedes Teil halbieren.","Jetzt gibt es 6 Teile."],["3. Gefärbt: 4 von 6 Teilen.","Genauso viel wie vorher!"],["4. Zähler und Nenner","mal 2 rechnen."]];
var eS=[
async function(){await bar(40,80,300,56,3,2);await frac(440,108,2,3);await note(0)},
async function(){await bar(40,220,300,56,3,2);await split(40,220,300,56,3,2);await note(1)},
async function(){await frac(440,248,4,6);await note(2)},
async function(){await frac(170,470,2,3);await sym(250,470,'=');await frac(330,470,4,6);await eqBows(170,330,470,'· 2');await note(3);await wait(300);await merke('Erweitern: oben und unten','mit derselben Zahl mal.')}
];
var kN=[["1. Sechs von acht Teilen","sind gefärbt."],["2. Je zwei Teile","zusammenfassen."],["3. Gefärbt: 3 von 4 Teilen.","Genauso viel wie vorher!"],["4. Zähler und Nenner","durch 2 teilen."]];
var kS=[
async function(){await bar(40,80,320,56,8,6,{fill:FILL2});await frac(450,108,6,8);await note(0)},
async function(){await bar(40,220,320,56,4,3,{fill:FILL2});for(var i=0;i<4;i++){var x=40+i*80;await stroke(linePts(x+8,290,x+72,290),{c:GR,w:2.4,j:0.3,ms:260})}await note(1)},
async function(){await frac(450,248,3,4);await note(2)},
async function(){await frac(170,470,6,8);await sym(250,470,'=');await frac(330,470,3,4);await eqBows(170,330,470,': 2');await note(3);await wait(300);await merke('Kürzen: oben und unten','durch dieselbe Zahl teilen.')}
];
var gN=[["1. Welche Zahl passt in","12 und in 18?"],["2. Beide sind gerade:","durch 2 teilen."],["3. 6 und 9 sind in der","3er-Reihe: durch 3."],["4. 2 und 3: Keine Zahl","passt mehr. Fertig!"],["5. Schneller: gleich","durch 6 teilen."]];
var gS=[
async function(){await frac(80,160,12,18);await note(0)},
async function(){await sym(170,160,'=');await frac(260,160,6,9);await eqBows(80,260,160,': 2');await note(1)},
async function(){await sym(350,160,'=');await frac(440,160,2,3);await eqBows(260,440,160,': 3');await note(2)},
async function(){await ell(440,160,30,56,GN);await write(510,176,'fertig!',{size:36,c:GN,bold:true});await note(3)},
async function(){await frac(140,450,12,18);await sym(230,450,'=');await frac(320,450,2,3);await eqBows(140,320,450,': 6',{c:BLUE});await note(4);await wait(300);await merke('Kürze, bis keine Zahl mehr','oben und unten passt.')}
];
SCN={
er:{pre:'e',label:'Teil 1 · Erweitern',notes:eN,ys:ysOf(eN),steps:eS,nextLabel:'Weiter: Kürzen',after:'ku',aria:'Animierte Erklärung: zwei Drittel zu vier Sechsteln erweitern'},
ku:{pre:'k',label:'Teil 2 · Kürzen',notes:kN,ys:ysOf(kN),steps:kS,nextLabel:'Weiter: Ganz kürzen',after:'gk',aria:'Animierte Erklärung: sechs Achtel zu drei Vierteln kürzen'},
gk:{pre:'g',label:'Teil 3 · So weit wie möglich kürzen',notes:gN,ys:ysOf(gN),steps:gS,nextLabel:'Von vorn',after:null,aria:'Animierte Erklärung: zwölf Achtzehntel schrittweise vollständig kürzen'}
};
var SCN_ORDER=['er','ku','gk'];
