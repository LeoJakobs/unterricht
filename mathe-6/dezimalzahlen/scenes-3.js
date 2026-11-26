/* Thema 3: Brüche in Dezimal- und Prozentzahlen */
var eN=[["1. Nenner 4. Wir wollen","10, 100 oder 1000."],["2. 4 · 25 = 100"],["3. Oben und unten","mal 25."],["4. 75 Hundertstel","sind 0,75."]];
var eS=[
async function(){await expr(60,130,[[3,4],'=','?']);await note(0)},
async function(){await write(300,142,'4 · 25 = 100',{size:40,c:BLUE,bold:true});await under(300,500,156,BLUE);await note(1)},
async function(){await frac(110,350,3,4);await sym(190,350,'=');await frac(280,350,75,100);await eqBows(110,280,350,'· 25');await note(2)},
async function(){await write(345,362,'= 0,75',{size:44,bold:true});await note(3);await wait(300);await merke('Nenner zu 10, 100','oder 1000 machen.')}
];
var kN=[["1. Nenner 40 ist keine","Stufenzahl."],["2. Durch 4 kürzen:","Nenner 10."],["3. 2 Zehntel sind 0,2."],["4. Manchmal: erst kürzen,","dann erweitern."]];
var kS=[
async function(){await frac(110,140,8,40);await note(0)},
async function(){await sym(190,140,'=');await frac(270,140,2,10);await eqBows(110,270,140,': 4');await note(1)},
async function(){await write(330,152,'= 0,2',{size:44,bold:true});await note(2)},
async function(){await frac(80,430,6,40);await sym(148,430,'=');await frac(215,430,3,20);await eqBows(80,215,430,': 2');await sym(285,430,'=');await frac(360,430,15,100);await eqBows(215,360,430,'· 5');await write(418,442,'= 0,15',{size:44,bold:true});
await note(3);await wait(300);await merke('Kürzen oder erweitern,','bis 10, 100 oder 1000.')}
];
var DX=110,DC=30,DY=200,DR=45;
async function dc(c,r,s,o){o=o||{};await write(DX+c*DC+DC/2,DY+r*DR,s,{size:40,anchor:'middle',c:o.c,bold:o.bold,ms:120})}
async function dline(c0,c1,r){await stroke(linePts(DX+c0*DC+2,DY+r*DR+10,DX+(c1+1)*DC-2,DY+r*DR+10),{w:1.8,j:0.2,ms:200})}
var dN=[["1. Der Bruchstrich heißt","geteilt durch."],["2. Komma und Nullen","anhängen: 7,000."],["3. 7 : 8 = 0. Im Ergebnis","jetzt das Komma setzen!"],["4. 70 : 8 = 8, Rest 6."],["5. 60 : 8 = 7, Rest 4.","40 : 8 = 5. Fertig!"]];
var dS=[
async function(){await expr(60,90,[[7,8],'=','7 : 8'],{boldLast:true});await note(0)},
async function(){await dc(0,0,'7');await dc(1,0,',',{c:GN});await dc(2,0,'0',{c:GN});await dc(3,0,'0',{c:GN});await dc(4,0,'0',{c:GN});await dc(5.4,0,':');await dc(6.4,0,'8');await dc(7.6,0,'=');await note(1)},
async function(){await dc(8.8,0,'0',{bold:true});await dc(9.6,0,',',{c:GN,bold:true});await dc(-1,1,'−');await dc(0,1,'0');await dline(-1,0,1);await dc(0,2,'7');await dc(2,2,'0');await note(2)},
async function(){await dc(10.4,0,'8',{bold:true});await dc(-1,3,'−');await dc(0,3,'6');await dc(2,3,'4');await dline(-1,2,3);await dc(2,4,'6');await dc(3,4,'0');await note(3)},
async function(){await dc(11.4,0,'7',{bold:true});await dc(1,5,'−');await dc(2,5,'5');await dc(3,5,'6');await dline(1,3,5);await dc(3,6,'4');await dc(4,6,'0');
await dc(12.4,0,'5',{bold:true});await dc(2,7,'−');await dc(3,7,'4');await dc(4,7,'0');await dline(2,4,7);await dc(4,8,'0');
await write(380,420,'7 : 8 = 0,875',{size:40,c:BLUE,bold:true});await note(4);await wait(300);await merke('Zähler : Nenner.','Komma und Nullen anhängen.')}
];
var PX=40,PY=60,PS=300;
var pN=[["1. Ein Hunderterfeld:","100 Kästchen."],["2. 15 von 100 sind","gefärbt."],["3. Prozent heißt","von hundert: 15 %."],["4. Erst auf Nenner 100,","dann Prozent."]];
var pS=[
async function(){await stroke(rectPts(PX,PY,PS,PS),{w:2.4,j:0.3,ms:700});for(var i=1;i<10;i++){await stroke(linePts(PX+PS*i/10,PY,PX+PS*i/10,PY+PS),{w:1.2,j:0.2,ms:70})}for(var j=1;j<10;j++){await stroke(linePts(PX,PY+PS*j/10,PX+PS,PY+PS*j/10),{w:1.2,j:0.2,ms:70})}await note(0)},
async function(){var r=[];for(var i=0;i<15;i++){var q=i%10,w=Math.floor(i/10);r.push(el('rect',{x:PX+q*PS/10,y:PY+w*PS/10,width:PS/10,height:PS/10,fill:'#8fcf93',opacity:0},G.tools))}await anim(600,function(k){r.forEach(function(e){e.setAttribute('opacity',0.85*k)})});
await frac(440,160,15,100,{size:44});await note(1)},
async function(){await write(380,260,'= 15 %',{size:46,c:GN,bold:true});await write(380,330,'= 0,15',{size:46,bold:true});await note(2)},
async function(){await expr(40,450,[[3,4],'=',[75,100],'=','75 %'],{boldLast:true});await expr(40,565,['0,08','=',[8,100],'=','8 %'],{boldLast:true});await note(3);await wait(300);await merke('Prozent heißt','Hundertstel.')}
];
SCN={
er:{pre:'e',label:'Teil 1 · Erweitern',notes:eN,ys:ysOf(eN),steps:eS,nextLabel:'Weiter: Kürzen',after:'ku',aria:'Animierte Erklärung: drei Viertel mit 25 erweitern'},
ku:{pre:'k',label:'Teil 2 · Kürzen',notes:kN,ys:ysOf(kN),steps:kS,nextLabel:'Weiter: Dividieren',after:'dv',aria:'Animierte Erklärung: acht Vierzigstel kürzen'},
dv:{pre:'d',label:'Teil 3 · Dividieren',notes:dN,ys:ysOf(dN),steps:dS,nextLabel:'Weiter: Prozent',after:'pz',aria:'Animierte Erklärung: sieben Achtel schriftlich dividieren'},
pz:{pre:'p',label:'Teil 4 · Prozent',notes:pN,ys:ysOf(pN),steps:pS,nextLabel:'Von vorn',after:null,aria:'Animierte Erklärung: Prozent am Hunderterfeld'}
};
var SCN_ORDER=['er','ku','dv','pz'];
