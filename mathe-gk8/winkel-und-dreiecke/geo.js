/* Hilfen: Winkelbögen, Beschriftung, Geodreieck als Winkelmesser */
var GR='#b23b2a',GN='#2e7d32';
async function arcAt(c,r,a0,a1,col,w){await stroke(arcPts(c[0],c[1],r,a0,a1),{c:col||BLUE,w:w||2.4,j:0.3,ms:600})}
async function greekAt(c,r,mid,s,col,size){var p=pol(c,r,mid);await write(p[0]-12,p[1]+11,s,{size:size||34,c:col||BLUE})}
async function valAt(c,r,mid,s,dx){var p=pol(c,r,mid);await write(p[0]-(dx==null?18:dx),p[1]+10,s,{size:36,c:GR,bold:true})}
async function line2(p,q,col){var r=ruler(p[0],p[1],q[0],q[1]);await fade(r,1);await stroke(linePts(p[0],p[1],q[0],q[1]),{c:col,w:col?3:2.4,ms:900});await fade(r,0);r.remove()}
async function rightAngle(c,a0,a1,r){r=r||26;await stroke(arcPts(c[0],c[1],r,a0,a1),{c:BLUE,w:2.4,j:0.2,ms:500});var p=pol(c,r*0.55,(a0+a1)/2);el('circle',{cx:p[0],cy:p[1],r:2.8,fill:BLUE})}
