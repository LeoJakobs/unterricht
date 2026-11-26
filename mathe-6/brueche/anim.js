/* Gemeinsame Zeichen-Engine: Stift, Schrift, Ton */
var $=function(i){return document.getElementById(i)},NS='http://www.w3.org/2000/svg';
var G={tools:$('tools'),ink:$('ink'),txt:$('txt'),over:$('over')};
var seed=7,run=0,step=0,busy=false,voice=true,cur=null,sc=null,SCN={};
var FONTS=Promise.race([Promise.all([document.fonts.load('500 30px Caveat','A?°'),document.fonts.load('700 30px Caveat','A?°')]),new Promise(function(r){setTimeout(r,4000)})]).catch(function(){});
var skip=false,audioRes=null;
var AU=new Audio();AU.preload='auto';
function say(i){if(!voice)return Promise.resolve();try{var a=AU;a.onended=a.onerror=null;a.pause();cur=a;return new Promise(function(r0){var r=function(){audioRes=null;r0()};audioRes=r;a.onended=r;a.onerror=r;a.src='audio/'+SCN[sc].pre+i+'.mp3';a.load();var p=a.play();if(p&&p.catch)p.catch(r)})}catch(e){return Promise.resolve()}}
var rnd=function(){return (seed=seed*16807%2147483647)/2147483647-0.5};
var sp=function(){return +$('spd').value};
var f=function(p){return p[0].toFixed(1)+','+p[1].toFixed(1)};
var ease=function(k){return k<0.5?2*k*k:1-Math.pow(-2*k+2,2)/2};

function el(t,a,p){var e=document.createElementNS(NS,t);for(var k in a)e.setAttribute(k,a[k]);if(t==='text')e.setAttribute('text-rendering','geometricPrecision');(p||G.ink).appendChild(e);return e}
function linePts(x1,y1,x2,y2){var n=Math.max(6,Math.round(Math.hypot(x2-x1,y2-y1)/14)),p=[];for(var i=0;i<=n;i++){var t=i/n;p.push([x1+(x2-x1)*t,y1+(y2-y1)*t])}return p}
function arcPts(cx,cy,r,a0,a1){var n=Math.max(8,Math.round(Math.abs(a1-a0)/3)),p=[];for(var i=0;i<=n;i++){var a=(a0+(a1-a0)*i/n)*Math.PI/180;p.push([cx+r*Math.cos(a),cy+r*Math.sin(a)])}return p}
function wob(p,j){var dx=0,dy=0;var q=p.map(function(P){dx=dx*0.7+rnd()*j;dy=dy*0.7+rnd()*j;return[P[0]+dx,P[1]+dy]});var d='M'+f(q[0]);for(var i=1;i<q.length-1;i++){var m=[(q[i][0]+q[i+1][0])/2,(q[i][1]+q[i+1][1])/2];d+=' Q'+f(q[i])+' '+f(m)}return d+' L'+f(q[q.length-1])}

function anim(ms,fn,mode){var my=run;ms*=sp();return new Promise(function(res,rej){if(skip||ms<16){fn(1);return res()}var t0=performance.now();var fr=function(t){if(run!==my)return rej('abort');if(skip){fn(1);return res()}var k=Math.min(1,(t-t0)/ms);fn(k<1?(mode==='lin'?k:mode==='s'?0.8*k+0.2*ease(k):ease(k)):1);k<1?requestAnimationFrame(fr):res()};requestAnimationFrame(fr)})}
var wait=function(ms){return anim(ms,function(){})};
var fade=function(g,to){var from=+g.getAttribute('opacity');return anim(280,function(k){g.setAttribute('opacity',from+(to-from)*k)})};

async function stroke(pts,o){o=o||{};var c=o.c||'#3b3b3e',w=o.w||2,j=o.j!=null?o.j:0.9;
var a=el('path',{d:wob(pts,j),fill:'none',stroke:c,'stroke-width':w,'stroke-linecap':'round','stroke-linejoin':'round',opacity:0.9});
var b=el('path',{d:wob(pts,j*1.5),fill:'none',stroke:c,'stroke-width':w*0.6,'stroke-linecap':'round',opacity:0.35});
var L=a.getTotalLength(),L2=b.getTotalLength();
a.style.strokeDasharray=L;a.style.strokeDashoffset=L;b.style.strokeDasharray=L2;b.style.strokeDashoffset=L2;
var tip=el('circle',{r:3.2,fill:c},G.over);
await anim(o.ms||1000,function(k){a.style.strokeDashoffset=L*(1-k);b.style.strokeDashoffset=L2*(1-k);var q=a.getPointAtLength(L*k);tip.setAttribute('cx',q.x);tip.setAttribute('cy',q.y);if(o.onTip)o.onTip(q)},'s');
tip.remove()}

async function write(x,y,s,o){o=o||{};var size=o.size||26,ch=Array.from(s),n=ch.length;
var t=el('text',{x:x,y:y,'text-anchor':o.anchor||'start','font-family':'Caveat, Arial, sans-serif','font-size':size,'font-weight':o.bold?700:500,fill:o.c||'#2f2f33'},G.txt);
t.textContent='';
await anim(o.ms||Math.max(300,n*42),function(k){t.textContent=ch.slice(0,Math.round(n*k)).join('')},'lin');
t.textContent=s}

async function cross(x,y,c){await Promise.all([stroke(linePts(x-7,y-7,x+7,y+7),{c:c,w:2.2,j:0.4,ms:320}),stroke(linePts(x-7,y+7,x+7,y-7),{c:c,w:2.2,j:0.4,ms:320})])}

var BLUE='#2b5f8a';
var ysOf=function(notes){var y=118;return notes.map(function(n){var r=y;y+=n.length*27+16;return r})};
async function note(i){var N=SCN[sc];for(var j=0;j<N.notes[i].length;j++)await write(j?671:645,N.ys[i]+j*27,N.notes[i][j],{size:25,c:N.red&&i===2&&j===0?'#b23b2a':'#2f2f33'})}
async function merke(l1,l2){var box=[].concat(linePts(640,548,978,548),linePts(978,548,978,628).slice(1),linePts(978,628,640,628).slice(1),linePts(640,628,640,548).slice(1));
await stroke(box,{c:BLUE,w:1.6,j:0.6,ms:1100});
await write(656,580,l1,{size:25,c:BLUE,bold:true});await write(656,610,l2,{size:25,c:BLUE,bold:true})}
