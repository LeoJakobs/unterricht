/* Thema 1: Dezimalzahlen kennenlernen */
var TX=40,TW=[100,100,100,100,100],TY=70,TH=[78,62];
function tcx(i){var x=TX;for(var k=0;k<i;k++)x+=TW[k];return x+TW[i]/2}
var aN=[["1. Die Stellenwerttafel:","Ganze und Teile."],["2. 12,835 eintragen."],["3. Nach dem Komma:","Zehntel, Hundertstel,","Tausendstel."],["4. Lesen: Die Ziffern nach","dem Komma einzeln."]];
var aS=[
async function(){await grid(TX,TY,TW,TH,{thick:1});
await write(tcx(0),TY+50,'Z',{size:36,anchor:'middle',bold:true});await write(tcx(1),TY+50,'E,',{size:36,anchor:'middle',bold:true});
var hd=[['z',10],['h',100],['t',1000]];for(var i=0;i<3;i++){await write(tcx(i+2),TY+30,hd[i][0],{size:32,c:BLUE,anchor:'middle',bold:true});await frac(tcx(i+2),TY+52,1,hd[i][1],{size:20,c:BLUE})}
await note(0)},
async function(){var y=TY+TH[0]+45,d=['1','2,','8','3','5'];for(var i=0;i<5;i++)await write(tcx(i),y,d[i],{size:44,anchor:'middle',ms:200});await note(1)},
async function(){var y=TY+TH[0]+TH[1]+20;await stroke(linePts(TX+200+8,y,TX+500-8,y),{c:GN,w:3,j:0.3,ms:500});
await write(TX+350,y+34,'Nachkommastellen',{size:30,c:GN,anchor:'middle',bold:true});await write(TX+100,y+34,'Ganze',{size:30,c:BLUE,anchor:'middle',bold:true});await note(2)},
async function(){await write(60,370,'12,835',{size:52,bold:true});await write(60,430,'„zwölf Komma acht drei fünf“',{size:34,c:BLUE});
await write(60,510,'0,05',{size:52,bold:true});await write(60,565,'„null Komma null fünf“',{size:34,c:BLUE});await note(3);await wait(300);await merke('Nach dem Komma: Ziffern','einzeln sprechen.')}
];
var bN=[["1. 7 von 10 Teilen","sind gefärbt."],["2. Eine Stelle nach dem","Komma: Nenner 10."],["3. Zwei Stellen:","Nenner 100."],["4. Drei Stellen:","Nenner 1000."]];
var bS=[
async function(){await bar(40,60,440,52,10,7);await write(510,98,'0,7',{size:40,bold:true});await note(0)},
async function(){await expr(60,210,['0,7','=',[7,10]],{boldLast:true});await label(300,210,'1 Stelle → 10');await note(1)},
async function(){await expr(60,325,['0,13','=',[13,100]],{boldLast:true});await label(300,325,'2 Stellen → 100');await note(2)},
async function(){await expr(60,440,['0,017','=',[17,1000]],{boldLast:true});await label(330,440,'3 Stellen → 1000');
await expr(60,555,['19,526','=',{g:19,z:526,n:1000}],{boldLast:true});await note(3);await wait(300);await merke('Stellen nach dem Komma','= Nullen im Nenner.')}
];
var cN=[["1. Nenner 10:","eine Stelle."],["2. Nenner 100:","zwei Stellen."],["3. Lücke? Mit 0 füllen!"],["4. Nullen am Ende darf","man weglassen."]];
var cS=[
async function(){await expr(60,100,[[9,10],'=','0,9'],{boldLast:true});await note(0)},
async function(){await expr(60,220,[[23,100],'=','0,23'],{boldLast:true});await expr(330,220,[{g:1,z:23,n:100},'=','1,23'],{boldLast:true});await note(1)},
async function(){await expr(60,340,[[7,100],'=','0,07'],{boldLast:true});var b=lastChar(2);if(b)await ell(b.x+b.w/2,b.y+b.h*0.55,b.w*0.75,b.h*0.48,GN);await write(300,352,'nicht 0,7!',{size:32,c:GR,bold:true});await note(2)},
async function(){await write(60,490,'0,40',{size:44,bold:true});await strike(3);await write(170,490,'= 0,4',{size:44,bold:true});
await expr(320,478,['denn',[40,100],'=',[4,10]],{size:34,c:BLUE});await note(3);await wait(300);await merke('Nullen im Nenner =','Stellen nach dem Komma.')}
];
SCN={
st:{pre:'a',label:'Teil 1 · Stellenwerttafel',notes:aN,ys:ysOf(aN),steps:aS,nextLabel:'Weiter: Dezimalzahl → Bruch',after:'db',aria:'Animierte Erklärung: zwölf Komma acht drei fünf in der Stellenwerttafel'},
db:{pre:'b',label:'Teil 2 · Dezimalzahl → Bruch',notes:bN,ys:ysOf(bN),steps:bS,nextLabel:'Weiter: Bruch → Dezimalzahl',after:'bd',aria:'Animierte Erklärung: Dezimalzahlen als Brüche mit Nenner 10, 100 und 1000'},
bd:{pre:'c',label:'Teil 3 · Bruch → Dezimalzahl',notes:cN,ys:ysOf(cN),steps:cS,nextLabel:'Von vorn',after:null,aria:'Animierte Erklärung: Brüche mit Nenner 10 und 100 als Dezimalzahlen'}
};
var SCN_ORDER=['st','db','bd'];
