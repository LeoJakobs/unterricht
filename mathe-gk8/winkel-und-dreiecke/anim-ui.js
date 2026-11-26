/* Bedienung der Animation: Schritte, Abspielen, Ton, Tempo */
var steps=function(){return SCN[sc].steps};
function base(){var t=el('text',{x:645,y:66,'font-family':'Caveat, Arial, sans-serif','font-size':38,'font-weight':700,fill:'#2f2f33'},G.txt);t.textContent="So geht's:";
el('path',{d:wob(linePts(643,76,790,78),0.8),fill:'none',stroke:'#2f2f33','stroke-width':2,'stroke-linecap':'round',opacity:0.8})}
function upd(){var n=steps().length,done=step>=n;$('prog').textContent=done?'Fertig: alle '+n+' Schritte':'Schritt '+(step+1)+' von '+n+(busy?' läuft …':'');$('next').textContent=done?SCN[sc].nextLabel:'Nächster Schritt'}
var want=false;
function skipNow(){skip=true;if(cur)cur.pause();if(audioRes)audioRes()}
function reset(){if(cur){cur.pause();cur=null}run++;busy=false;skip=false;want=false;seed=7;step=0;for(var k in G)G[k].innerHTML='';base();upd()}
function pick(k){sc=k;$('sv').setAttribute('aria-label',SCN[k].aria);document.querySelectorAll('#scnbtns button').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.k===k)});reset()}
async function next(){if(busy){want=true;skipNow();return}busy=true;await FONTS;want=false;if(step>=steps().length){busy=false;if(SCN[sc].after)pick(SCN[sc].after);else reset();return}upd();var my=run;try{var s=say(step);await steps()[step]();await s;if(run!==my)throw 0;step++}catch(e){}if(run===my){busy=false;skip=false;upd();if(want){want=false;if(step<steps().length)next()}}}
async function playAll(){busy=true;await FONTS;reset();busy=true;upd();var my=run;try{while(step<steps().length){var s=say(step);await steps()[step]();await s;if(run!==my)throw 0;step++;skip=false;upd();if(step<steps().length)await wait(650)}}catch(e){}if(run===my){busy=false;upd()}}

(function(){
var box=$('scnbtns');
SCN_ORDER.forEach(function(k){var b=document.createElement('button');b.type='button';b.dataset.k=k;b.textContent=SCN[k].label;box.appendChild(b)});
box.addEventListener('click',function(e){var b=e.target.closest('button');if(b&&b.dataset.k!==sc)pick(b.dataset.k)});
$('next').addEventListener('click',next);
$('play').addEventListener('click',playAll);
$('reset').addEventListener('click',reset);
$('voice').addEventListener('click',function(e){voice=!voice;if(!voice&&cur)cur.pause();e.currentTarget.setAttribute('aria-pressed',voice);e.currentTarget.textContent='Vorlesen: '+(voice?'an':'aus')});
document.addEventListener('keydown',function(e){var tg=e.target.tagName;if(tg==='BUTTON'||tg==='SELECT'||tg==='A')return;if(e.key==='ArrowRight'||e.key===' '||e.key==='PageDown'){if($('anim').hidden)return;var r=$('anim').getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;e.preventDefault();next()}});
pick(SCN_ORDER[0]);
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){if(!busy&&step===0)reset()});
})();
