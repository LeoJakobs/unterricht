/* Hilfen für Dezimalzahlen: Raster, Ziffern in Spalten, Zahlenstrahl, Markierungen */
var GOLD='#b58a00';
/* Gitter mit Spaltenbreiten ws (Array) und Zeilenhöhen hs (Array) */
async function grid(x,y,ws,hs,o){o=o||{};var W=ws.reduce(function(a,b){return a+b},0),H=hs.reduce(function(a,b){return a+b},0);
await stroke(rectPts(x,y,W,H),{w:2.2,j:0.4,ms:o.ms||800});
var cx=x;for(var i=0;i<ws.length-1;i++){cx+=ws[i];await stroke(linePts(cx,y,cx,y+H),{w:i===(o.thick==null?-1:o.thick)?3.2:1.8,j:0.3,ms:160})}
var cy=y;for(var j=0;j<hs.length-1;j++){cy+=hs[j];await stroke(linePts(x,cy,x+W,cy),{w:1.8,j:0.3,ms:220})}}
/* Ziffern einer Zeichenkette in festen Spalten (für Komma unter Komma) */
async function digits(x,ly,str,cw,o){o=o||{};var ch=Array.from(str);for(var i=0;i<ch.length;i++){if(ch[i]===' ')continue;var c=(o.cols&&o.cols[i])||o.c;await write(x+i*cw+cw/2,ly,ch[i],{size:o.size||44,c:c,anchor:'middle',bold:o.bold,ms:110})}}
/* Kasten um eine Spalte (Spalte i, zwei Zeilen von ly1 bis ly2) */
async function colBox(x,i,cw,ly1,ly2,size,c){var s=size||44;await stroke(rectPts(x+i*cw+2,ly1-s*0.85,cw-4,ly2-ly1+s*1.05),{c:c||BLUE,w:2.6,j:0.3,ms:600})}
/* Unterstreichen einer Spalte */
async function colUnder(x,i,cw,ly,c){await stroke(linePts(x+i*cw+4,ly+9,x+(i+1)*cw-4,ly+9),{c:c||GN,w:3.4,j:0.2,ms:300})}
/* Kreis um eine Spalte */
async function colCirc(x,i,cw,ly,size,c){var s=size||44;await ell(x+i*cw+cw/2,ly-s*0.32,cw*0.62,s*0.62,c||GR)}
/* Zahlenstrahl von x0 bis x0+w mit n Teilen auf Höhe y; Beschriftungen [[i,text]] */
async function numline(x0,y,w,n,labs,o){o=o||{};await stroke(linePts(x0-14,y,x0+w+28,y),{w:2.4,j:0.3,ms:800});
await stroke(linePts(x0+w+16,y-8,x0+w+28,y),{w:2.4,j:0.1,ms:120});await stroke(linePts(x0+w+16,y+8,x0+w+28,y),{w:2.4,j:0.1,ms:120});
for(var i=0;i<=n;i++){var big=i===0||i===n||(o.mid&&i===o.mid),L=big?15:8;await stroke(linePts(x0+w*i/n,y-L,x0+w*i/n,y+L),{w:big?2.6:1.8,j:0.2,ms:90})}
for(var k=0;k<labs.length;k++)await write(x0+w*labs[k][0]/n,y+44,labs[k][1],{size:o.size||30,anchor:'middle',bold:true})}
async function dot(x,y,c,lab){var d=el('circle',{cx:x,cy:y,r:0,fill:c||BLUE},G.over);await anim(260,function(k){d.setAttribute('r',8*k)});if(lab)await write(x,y-24,lab,{size:30,c:c||BLUE,anchor:'middle',bold:true})}
/* Kasten um einen Bereich */
async function boxAt(x,y,w,h,c){await stroke(rectPts(x,y,w,h),{c:c||BLUE,w:2.4,j:0.4,ms:600})}
/* letztes geschriebenes Textstück: Lage eines Zeichens */
function lastChar(i){var t=G.txt.lastChild;try{var b=t.getExtentOfChar(i);return{x:b.x,y:b.y,w:b.width,h:b.height}}catch(e){return null}}
async function strike(i,c){var b=lastChar(i);if(!b)return;await stroke(linePts(b.x+2,b.y+b.h*0.78,b.x+b.w-2,b.y+b.h*0.28),{c:c||GR,w:3,j:0.2,ms:300})}
