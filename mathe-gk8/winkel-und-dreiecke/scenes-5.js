/* Thema 5: Dreiecke konstruieren mit SSS */
var SA=[110,480],SB=[350,480],SC=[200,347.7];
var pN=[["1. Gegeben aufschreiben, dazu","eine Planfigur skizzieren."],["2. Zeichne die Seite c = 6 cm.","Beschrifte A und B."],["3. Zirkel auf b = 4 cm. Kreis-","bogen um A ziehen."],["4. Zirkel auf a = 5 cm. Bogen","um B. Schnittpunkt = C."],["5. Verbinde C mit A und B.","Fertig!"]];
var pS=[
async function(){await gegeben('gegeben: a = 5 cm, b = 4 cm, c = 6 cm');await planfigur(['a','b','c'],[]);await note(0)},
async function(){await eckenAB(SA,SB);await write(190,565,'c = 6 cm',{size:32,c:RED,bold:true});await note(1)},
async function(){await arcWithCompass(SA,160,-75,-38);await write(52,322,'b = 4 cm',{size:30,c:RED,bold:true});await note(2)},
async function(){await arcWithCompass(SB,200,-160,-120);await cross(SC[0],SC[1],GR);await write(178,330,'C',{size:36});await write(262,330,'a = 5 cm',{size:30,c:RED,bold:true});await note(3)},
async function(){await line2(SA,SC,BLUE);await line2(SB,SC,BLUE);await write(128,410,'b',{size:32,c:RED,bold:true});await write(288,412,'a',{size:32,c:RED,bold:true});await note(4);await wait(300);await merke('Merke: Bei SSS brauchst du den','Zirkel für zwei Kreisbögen.')}
];
var QA=[110,420],QB=[310,420];
var qN=[["1. Gegeben: a = 1, b = 3, c = 5","(in cm). Zeichne zuerst c."],["2. Kreisbogen um A (b = 3 cm)","und um B (a = 1 cm)."],["3. Sie treffen sich nicht –","es gibt kein Dreieck!"],["4. Rechne: 1 + 3 = 4. Das ist","kleiner als 5 – geht nicht."],["5. Bei a=5, b=4, c=6 geht es:","5 + 4 = 9, und 9 > 6."]];
var qS=[
async function(){await gegeben('gegeben: a = 1 cm, b = 3 cm, c = 5 cm');await eckenAB(QA,QB);await write(170,500,'c = 5 cm',{size:32,c:RED,bold:true});await note(0)},
async function(){await arcWithCompass(QA,120,-70,-5);await write(120,318,'b = 3 cm',{size:30,c:RED,bold:true});await arcWithCompass(QB,40,-175,-95);await write(318,372,'a = 1 cm',{size:30,c:RED,bold:true});await note(1)},
async function(){await write(110,240,'Kein Schnittpunkt!',{size:44,c:GR,bold:true});await write(250,395,'?',{size:44,c:GR,bold:true});await note(2)},
async function(){await write(20,555,'1 cm + 3 cm = 4 cm',{size:34,c:BLUE,bold:true});await write(20,600,'4 cm < 5 cm  ✗ zu kurz',{size:34,c:GR,bold:true});await note(3)},
async function(){await write(300,515,'a=5, b=4, c=6:',{size:30});await write(300,555,'5 + 4 = 9 > 6  ✓',{size:34,c:'#2e7d32',bold:true});await note(4);await wait(300);await merke('Merke: Zwei Seiten zusammen müssen','länger sein als die dritte.')}
];
SCN={
sss:{pre:'p',label:'Teil 1 · Dreieck mit SSS',notes:pN,ys:ysOf(pN),steps:pS,red:false,nextLabel:'Weiter: Geht das Dreieck?',after:'du',aria:'Animierte Konstruktion eines Dreiecks aus drei Seiten mit Zirkel und Geodreieck'},
du:{pre:'q',label:'Teil 2 · Geht das Dreieck?',notes:qN,ys:ysOf(qN),steps:qS,red:false,nextLabel:'Von vorn',after:null,aria:'Animierte Erklärung der Dreiecksungleichung'}
};
var SCN_ORDER=['sss','du'];
