/* Thema 2: Dezimalzahlen vergleichen und runden */
var VX=70,VC=34;
var vN=[["1. Komma unter Komma","schreiben."],["2. Lücke mit 0 füllen."],["3. Von links vergleichen:","erster Unterschied 3 > 2."],["4. Also ist 43,03","größer."],["5. Achtung: Mehr Stellen","heißt nicht größer!"]];
var vS=[
async function(){await digits(VX,110,'43,03',VC);await digits(VX,175,'43,028',VC);await note(0)},
async function(){await write(VX+5*VC+VC/2,110,'0',{size:44,c:GN,anchor:'middle',bold:true});await note(1)},
async function(){await colBox(VX,4,VC,110,175,44,BLUE);await write(VX+7*VC,150,'3 > 2',{size:40,c:BLUE,bold:true});await note(2)},
async function(){await write(VX,310,'43,03',{size:44,bold:true});await sym(VX+140,298,'>',{size:44});await write(VX+180,310,'43,028',{size:44,bold:true});await note(3)},
async function(){await digits(VX,450,'5,8',VC);await write(VX+3*VC+VC/2,450,'0',{size:44,c:GN,anchor:'middle',bold:true});await digits(VX,515,'5,79',VC);
await colBox(VX,2,VC,450,515,44,BLUE);await write(VX+6*VC,490,'5,8 > 5,79',{size:40,c:BLUE,bold:true});await note(4);await wait(300);await merke('Von links vergleichen:','erster Unterschied zählt.')}
];
var NX=50,NW=500;
var sN=[["1. Von 0 bis 1:","10 gleiche Teile."],["2. 0,7 sind sieben","Zehntel-Schritte."],["3. Genauer: 0,70 bis 0,80","in Hundertstel-Schritten."],["4. Weiter rechts","heißt größer."]];
var sS=[
async function(){await numline(NX,140,NW,10,[[0,'0'],[5,'0,5'],[10,'1']],{mid:5});await note(0)},
async function(){await dot(NX+NW*0.7,140,GOLD,'0,7');await note(1)},
async function(){await stroke(linePts(NX+NW*0.7,150,NX,320),{c:'#999999',w:1.6,j:0.3,ms:500});await stroke(linePts(NX+NW*0.8,150,NX+NW,320),{c:'#999999',w:1.6,j:0.3,ms:500});
await numline(NX,340,NW,10,[[0,'0,70'],[5,'0,75'],[10,'0,80']],{mid:5});await dot(NX+NW*0.5,340,GOLD,'0,75');await note(2)},
async function(){await write(NX,520,'0,7',{size:46,bold:true});await sym(NX+95,508,'<',{size:46});await write(NX+130,520,'0,75',{size:46,bold:true});await write(NX+250,520,'0,75 liegt weiter rechts.',{size:30,c:BLUE});await note(3);await wait(300);await merke('Am Zahlenstrahl liegt','die größere Zahl rechts.')}
];
var RX=60,RC=32;
var rN=[["1. 2,731 auf Zehntel","runden."],["2. Rundungsstelle","unterstreichen."],["3. Rechts daneben: 3.","0 bis 4: abrunden."],["4. 2,7564: rechts daneben","eine 5. 5 bis 9: aufrunden."],["5. Aus 9 + 1 wird 10:","2,96 ≈ 3,0"]];
var rS=[
async function(){await digits(RX,110,'2,731',RC);await label(RX+6*RC,104,'auf Zehntel');await note(0)},
async function(){await colUnder(RX,2,RC,110);await note(1)},
async function(){await colCirc(RX,3,RC,110,44,GR);await write(RX+6*RC,165,'3 → abrunden',{size:30,c:GR,bold:true});await write(RX,220,'2,731 ≈ 2,7',{size:44,bold:true});await note(2)},
async function(){await digits(RX,330,'2,7564',RC);await colUnder(RX,2,RC,330);await colCirc(RX,3,RC,330,44,GR);await write(RX+7*RC,325,'5 → aufrunden',{size:30,c:GR,bold:true});await write(RX,395,'2,7564 ≈ 2,8',{size:44,bold:true});await note(3)},
async function(){await digits(RX,500,'2,96',RC);await colUnder(RX,2,RC,500);await colCirc(RX,3,RC,500,44,GR);await write(RX+5*RC,495,'9 + 1 = 10',{size:32,c:GR,bold:true});await write(RX,575,'2,96 ≈ 3,0',{size:44,bold:true});await note(4);await wait(300);await merke('0 bis 4: abrunden.','5 bis 9: aufrunden.')}
];
SCN={
vg:{pre:'v',label:'Teil 1 · Vergleichen',notes:vN,ys:ysOf(vN),steps:vS,nextLabel:'Weiter: Zahlenstrahl',after:'zs',aria:'Animierte Erklärung: 43,03 und 43,028 vergleichen'},
zs:{pre:'s',label:'Teil 2 · Zahlenstrahl',notes:sN,ys:ysOf(sN),steps:sS,nextLabel:'Weiter: Runden',after:'rd',aria:'Animierte Erklärung: 0,7 und 0,75 am Zahlenstrahl'},
rd:{pre:'r',label:'Teil 3 · Runden',notes:rN,ys:ysOf(rN),steps:rS,nextLabel:'Von vorn',after:null,aria:'Animierte Erklärung: Dezimalzahlen auf Zehntel runden'}
};
var SCN_ORDER=['vg','zs','rd'];
