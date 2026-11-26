/* Thema 2: Winkel an Geradenkreuzungen */
var X=[310,270];
var gN=[["1. Zwei Geraden f und g","kreuzen sich."],["2. Es entstehen 4 Winkel:","α, β, γ und δ."],["3. Scheitelwinkel liegen","gegenüber: α = γ."],["4. Beispiel: α = 50°.","Dann ist γ = 50°."],["5. Nebenwinkel: α + β = 180°.","β = 180° − 50° = 130°."],["6. δ ist Nebenwinkel von α.","Auch δ = 130°."]];
var gS=[
async function(){var d=pol([0,0],230,-50);await line2([60,270],[560,270]);await line2([X[0]-d[0],X[1]-d[1]],[X[0]+d[0],X[1]+d[1]]);
await write(566,262,'g',{size:36});await write(X[0]+d[0]+6,X[1]+d[1]+8,'f',{size:36});await cross(X[0],X[1]);await note(0)},
async function(){await arcAt(X,60,-50,0);await arcAt(X,60,-180,-50);await arcAt(X,60,130,180);await arcAt(X,60,0,130);
await greekAt(X,86,-25,'α');await greekAt(X,86,-115,'β');await greekAt(X,86,155,'γ');await greekAt(X,86,65,'δ');await note(1)},
async function(){await arcAt(X,70,-50,0,GR,3.2);await arcAt(X,70,130,180,GR,3.2);await write(60,520,'Scheitelwinkel: α = γ',{size:40,c:BLUE,bold:true});await note(2)},
async function(){await valAt(X,128,-25,'50°');await valAt(X,128,155,'50°',34);await note(3)},
async function(){await arcAt(X,70,-180,-50,GN,3.2);await write(60,565,'Nebenwinkel: α + β = 180°',{size:36,c:BLUE,bold:true});await write(60,605,'β = 180° − 50° = 130°',{size:36});await valAt(X,128,-115,'130°',30);await note(4)},
async function(){await valAt(X,128,65,'130°',20);await note(5);await wait(300);await merke('Merke: Gegenüber = gleich groß.','Nebeneinander = zusammen 180°.')}
];
var P1=[400,170],P2=[279,380];
var wN=[["1. Die Geraden g und h","sind parallel: g ∥ h."],["2. Die Gerade f schneidet","beide Geraden."],["3. Stufenwinkel liegen an der","gleichen Stelle: α = α₁."],["4. Wechselwinkel liegen über","Kreuz: α = γ₁."],["5. Beispiel: α = 60°. Dann","α₁ = 60° und γ₁ = 60°."],["6. Tipp: γ₁ ist der","Scheitelwinkel von α₁."]];
var wS=[
async function(){await line2([60,170],[580,170]);await line2([60,380],[580,380]);for(var y of [170,380])await stroke([[535,y-9],[546,y],[535,y+9]],{w:2.4,j:0.2,ms:300});
await write(40,160,'g',{size:36});await write(40,370,'h',{size:36});await note(0)},
async function(){var d=pol([0,0],95,-60);await line2([P2[0]-d[0],P2[1]-d[1]],[P1[0]+d[0],P1[1]+d[1]]);await write(P1[0]+d[0]+8,P1[1]+d[1]+4,'f',{size:36});await cross(P1[0],P1[1]);await cross(P2[0],P2[1]);await note(1)},
async function(){await arcAt(P1,52,-60,0,GR,3.2);await greekAt(P1,78,-30,'α',GR);await arcAt(P2,52,-60,0,GR,3.2);await greekAt(P2,80,-30,'α₁',GR);await write(60,520,'Stufenwinkel: α = α₁',{size:40,c:BLUE,bold:true});await note(2)},
async function(){await arcAt(P2,52,120,180,GN,3.2);await greekAt(P2,84,150,'γ₁',GN);await write(60,565,'Wechselwinkel: α = γ₁',{size:40,c:BLUE,bold:true});await note(3)},
async function(){await valAt(P1,104,-30,'60°',-4);await valAt(P2,108,-30,'60°',-4);await valAt(P2,130,150,'60°',44);await note(4)},
async function(){await note(5);await write(60,605,'γ₁ = Scheitelwinkel von α₁',{size:34});await wait(300);await merke('Merke: Bei Parallelen sind Stufen-','und Wechselwinkel gleich groß.')}
];
SCN={
kr:{pre:'g',label:'Teil 1 · Scheitel- und Nebenwinkel',notes:gN,ys:ysOf(gN),steps:gS,red:false,nextLabel:'Weiter: Parallele Geraden',after:'pa',aria:'Animierte Erklärung: Scheitelwinkel und Nebenwinkel an zwei sich kreuzenden Geraden'},
pa:{pre:'w',label:'Teil 2 · Stufen- und Wechselwinkel',notes:wN,ys:ysOf(wN),steps:wS,red:false,nextLabel:'Von vorn',after:null,aria:'Animierte Erklärung: Stufenwinkel und Wechselwinkel an parallelen Geraden'}
};
var SCN_ORDER=['kr','pa'];
