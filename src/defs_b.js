// ================= FÍSICA =================
def('fis','Tirachinas','Tiras hacia atrás, sueltas y el proyectil sale con una fuerza proporcional a la tensión. Derribar estructuras es la recompensa.','Angry Birds, Crush the Castle, Cut the Rope 2','Arrastra la bola azul hacia atrás y suelta. B reconstruye la torre.','B:Reset',()=>{
const ax=60,ay=140;let bird,dr=false,B,msg='';const nb=()=>bird={x:ax,y:ay,vx:0,vy:0,fly:false,t:0};const reset=()=>{nb();B=[];for(let i=0;i<3;i++)B.push({x:220,y:160-i*20,w:14,h:20,vx:0,vy:0},{x:262,y:160-i*20,w:14,h:20,vx:0,vy:0});B.push({x:216,y:110,w:64,h:10,vx:0,vy:0});B.push({x:240,y:92,w:16,h:18,vx:0,vy:0,tg:1});msg=''};reset();
return dt=>{if(hit('b'))reset();if(!bird.fly){if(PT&&dist(P.x,P.y,bird.x,bird.y)<34)dr=true;if(dr&&P.down){const dx=P.x-ax,dy=P.y-ay,d=Math.hypot(dx,dy),m=Math.min(d,50)/(d||1);bird.x=ax+dx*m;bird.y=ay+dy*m}if(dr&&!P.down){dr=false;bird.vx=(ax-bird.x)*9;bird.vy=(ay-bird.y)*9;bird.fly=Math.hypot(bird.vx,bird.vy)>30;if(!bird.fly){bird.x=ax;bird.y=ay}}}
else{bird.t+=dt;bird.vy+=400*dt;bird.x+=bird.vx*dt;bird.y+=bird.vy*dt;if(bird.y>174){bird.y=174;bird.vy*=-.3;bird.vx*=.8}for(const b of B){if(inR(bird.x,bird.y,b.x-6,b.y-6,b.w+12,b.h+12)){b.vx+=bird.vx*.35;b.vy+=bird.vy*.2-40;bird.vx*=-.3;bird.vy*=.5;bird.x+=bird.vx*dt*2}}if(bird.x>340||bird.x<-20||bird.t>4)nb()}
for(const b of B){b.vy+=400*dt;b.x+=b.vx*dt;b.y+=b.vy*dt;if(b.y+b.h>180){b.y=180-b.h;b.vy=0;b.vx*=Math.pow(.05,dt)}}
for(let k=0;k<3;k++)for(let i=0;i<B.length;i++)for(let j=i+1;j<B.length;j++){const a=B[i],c=B[j];if(!ov(a,c))continue;const ox=Math.min(a.x+a.w,c.x+c.w)-Math.max(a.x,c.x),oy=Math.min(a.y+a.h,c.y+c.h)-Math.max(a.y,c.y);if(oy<ox){const top=a.y<c.y?a:c,bot=top===a?c:a;top.y=bot.y-top.h;if(top.vy>bot.vy)top.vy=bot.vy;top.vx=lerp(top.vx,bot.vx,.1)}else{const l=a.x<c.x?a:c,r=l===a?c:a;l.x-=ox/2;r.x+=ox/2;const v=(l.vx+r.vx)/2;l.vx=r.vx=v}}
const tg=B.find(b=>b.tg);if(tg&&tg.y+tg.h>=179&&!msg)msg='¡Objetivo derribado!';
clr('#7ec8e3');rect(0,180,320,20,'#4caf50');line(ax-6,ay+40,ax-4,ay-6,'#5c3b1e',4);line(ax+6,ay+40,ax+4,ay-6,'#5c3b1e',4);if(!bird.fly&&dr){line(ax-4,ay-6,bird.x,bird.y,'#3a2414',2);line(ax+4,ay-6,bird.x,bird.y,'#3a2414',2)}
for(const b of B)rect(b.x,b.y,b.w,b.h,b.tg?GR:'#c77d4f');circ(bird.x,bird.y,6,BL);txt(msg||'Derriba el bloque verde',8,10,11,msg?'#12141f':'#12141f')}});

def('fis','Billar y colisiones elásticas','Las bolas intercambian velocidad al chocar conservando la energía y pierden fuerza con el rozamiento.','Pool / billar, Peggle (en parte), Golf It','Arrastra desde la bola blanca hacia atrás y suelta. B recoloca.','B:Reset',()=>{
let bl,aim=0;const PK=[[16,16],[160,12],[304,16],[16,184],[160,188],[304,184]],cs=[RD,Y,BL,PU,OR,GR];const reset=()=>{bl=[{x:80,y:100,vx:0,vy:0,c:WH}];let k=0;for(let r=0;r<3;r++)for(let i=0;i<=r;i++)bl.push({x:210+r*12,y:100+(i-r/2)*13,vx:0,vy:0,c:cs[k++]})};reset();
return dt=>{const q=bl[0],moving=bl.some(b=>Math.hypot(b.vx,b.vy)>3);if(!moving&&PT)aim=1;if(aim&&!P.down){q.vx=(q.x-P.x)*4;q.vy=(q.y-P.y)*4;aim=0}if(hit('b'))reset();
for(let s=0;s<3;s++){const h=dt/3;for(const b of bl){b.x+=b.vx*h;b.y+=b.vy*h;const f=Math.pow(.6,h);b.vx*=f;b.vy*=f;if(b.x<20||b.x>300){b.vx*=-1;b.x=cl(b.x,20,300)}if(b.y<20||b.y>180){b.vy*=-1;b.y=cl(b.y,20,180)}}
for(let i=0;i<bl.length;i++)for(let j=i+1;j<bl.length;j++){const a=bl[i],c=bl[j],dx=c.x-a.x,dy=c.y-a.y,d=Math.hypot(dx,dy);if(d<12&&d>0){const nx=dx/d,ny=dy/d,o=(12-d)/2;a.x-=nx*o;a.y-=ny*o;c.x+=nx*o;c.y+=ny*o;const p=(a.vx-c.vx)*nx+(a.vy-c.vy)*ny;if(p>0){a.vx-=p*nx;a.vy-=p*ny;c.vx+=p*nx;c.vy+=p*ny}}}}
for(const b of bl)for(const k of PK)if(dist(b.x,b.y,k[0],k[1])<11){if(b===q){b.x=80;b.y=100;b.vx=b.vy=0}else b.in=1}bl=bl.filter(b=>!b.in);if(bl.length==1)reset();
clr('#0b3d2e');srect(14,14,292,172,'#5c3b1e',6);for(const k of PK)circ(k[0],k[1],9,'#000');for(const b of bl)circ(b.x,b.y,6,b.c);if(aim&&P.down){line(q.x,q.y,q.x+(q.x-P.x),q.y+(q.y-P.y),'#ffffff55',1);line(P.x,P.y,q.x,q.y,'#c9a36b',3)}}});

def('fis','Cortar cuerdas','Objetos colgados de cuerdas simuladas que el jugador corta con un gesto; la física hace el resto.','Cut the Rope, Where’s My Water?, Bad Piggies','Desliza el dedo para cortar y deja caer el caramelo en la boca verde. B reinicia.','B:Reset',()=>{
let V,cd,last=null,sc=0,t=0;const reset=()=>{V=VR();cd=V.pt(160,110);for(const ax of[[90,20],[240,30]]){let pr=V.pt(ax[0],ax[1],1);const n=8;for(let i=1;i<=n;i++){const q=i==n?cd:V.pt(lerp(ax[0],160,i/n),lerp(ax[1],110,i/n));V.st(pr,q);pr=q}}t=0};reset();
return dt=>{if(hit('b'))reset();if(P.down&&last){for(const c of V.s)if(!c.cut&&segX(last.x,last.y,P.x,P.y,c.a.x,c.a.y,c.b.x,c.b.y))c.cut=1}last=P.down?{x:P.x,y:P.y}:null;V.step(dt);const mx=160+Math.sin(T*.8)*100;
if(dist(cd.x,cd.y,mx,178)<16){sc++;reset()}if(cd.y>230){t+=dt;if(t>.3)reset()}
clr('#2a2140');for(const c of V.s)if(!c.cut)line(c.a.x,c.a.y,c.b.x,c.b.y,'#c9a36b',2);for(const p of V.p)if(p.pin)circ(p.x,p.y,4,GY);circ(mx,178,16,GR);circ(mx,174,8,'#1b3a24');circ(cd.x,cd.y,8,'#ff8fd0');ring(cd.x,cd.y,8,WH,1);txt('Caramelos: '+sc,8,10,10,GY)}});

def('fis','Flotabilidad','Cada objeto flota o se hunde según su densidad comparada con la del agua.','Raft, Subnautica, Fe (en parte)','Toca para soltar objetos de distinta densidad.','',()=>{
let O=[];const C=['#e9c46a',OR,'#c77d4f',GY],N=['corcho','madera','roble','piedra'],D=[.3,.6,.9,1.5];return dt=>{if(PT){const k=RI(0,3);O.push({x:P.x,y:Math.min(P.y,60),vy:0,k,s:RI(12,18)})}if(O.length>12)O.shift();
for(const o of O){const sub=cl((o.y+o.s/2-110)/o.s,0,1);o.vy+=(400-400*sub/D[o.k])*dt;if(sub>0)o.vy*=Math.pow(.2,dt);o.y+=o.vy*dt;if(o.y>184-o.s/2){o.y=184-o.s/2;o.vy=0}}
clr();G.globalAlpha=.4;rect(0,110,320,90,BL);G.globalAlpha=1;rect(0,184,320,16,'#3a3f5c');for(const o of O)rect(o.x-o.s/2,o.y-o.s/2,o.s,o.s,C[o.k]);N.forEach((n,i)=>{rect(8+i*76,8,8,8,C[i]);txt(n,20+i*76,12,10)})}});

def('fis','Imanes','Fuerzas de atracción o repulsión que actúan a distancia y disminuyen con ella.','Magnetic: Cage Closed, Portal 2 (geles), Zelda: TotK (Ultramano)','Arrastra el imán. B cambia la polaridad.','B:Polaridad',()=>{
let pol=1;const bs=[];for(let i=0;i<14;i++)bs.push({x:R(20,300),y:R(20,180),vx:0,vy:0});return dt=>{if(hit('b'))pol*=-1;const mx=P.down?P.x:160,my=P.down?P.y:100;
for(const b of bs){const dx=mx-b.x,dy=my-b.y,d=Math.max(15,Math.hypot(dx,dy)),f=pol*60000/(d*d);b.vx+=dx/d*f*dt;b.vy+=dy/d*f*dt;b.vx*=.97;b.vy*=.97;b.x+=b.vx*dt;b.y+=b.vy*dt;if(b.x<5||b.x>315){b.vx*=-.6;b.x=cl(b.x,5,315)}if(b.y<5||b.y>195){b.vy*=-.6;b.y=cl(b.y,5,195)}}
clr();for(const b of bs)circ(b.x,b.y,5,'#9aa3c7');circ(mx,my,12,pol>0?RD:BL);txt(pol>0?'N':'S',mx,my,11,WH,'center');txt(pol>0?'Atrae':'Repele',8,10,11,pol>0?RD:BL)}});

def('fis','Portales','Dos aberturas conectadas: lo que entra por una sale por la otra conservando la velocidad.','Portal, Portal 2, Splitgate','Toca una pared para colocar un portal (se alternan los colores). B relanza la bola.','B:Bola',()=>{
const pt=[{s:3,u:80},{s:1,u:120}];let nx_=0,b={x:60,y:40,vx:70,vy:0},cd=0;const surf=(s,u)=>[[u,10,0,1],[310,u,-1,0],[u,190,0,-1],[10,u,1,0]][s];
return dt=>{if(hit('b'))b={x:160,y:40,vx:R(-80,80),vy:0};if(PT){const d=[P.y-10,310-P.x,190-P.y,P.x-10];const s=d.indexOf(Math.min(...d));pt[nx_]={s,u:cl(s%2?P.y:P.x,30,s%2?170:290)};nx_^=1}
cd-=dt;b.vy+=300*dt;b.x+=b.vx*dt;b.y+=b.vy*dt;const sp=Math.hypot(b.vx,b.vy);if(sp>520){b.vx*=520/sp;b.vy*=520/sp}
if(cd<=0)for(let i=0;i<2;i++){const[px,py,nx,ny]=surf(pt[i].s,pt[i].u);if(dist(b.x,b.y,px,py)<16&&b.vx*nx+b.vy*ny<0){const[qx,qy,mx,my]=surf(pt[1-i].s,pt[1-i].u),v=Math.max(Math.hypot(b.vx,b.vy),120);b.x=qx+mx*14;b.y=qy+my*14;b.vx=mx*v;b.vy=my*v;cd=.15;break}}
if(b.x<16){b.x=16;b.vx=Math.abs(b.vx)*.9}if(b.x>304){b.x=304;b.vx=-Math.abs(b.vx)*.9}if(b.y<16){b.y=16;b.vy=Math.abs(b.vy)*.9}if(b.y>184){b.y=184;b.vy=-Math.abs(b.vy)*.9;b.vx*=.98}
clr();srect(10,10,300,180,'#3a3f5c',2);pt.forEach((p,i)=>{const[px,py,nx]=surf(p.s,p.u);G.save();G.translate(px,py);G.fillStyle=i?BL:OR;G.beginPath();G.ellipse(0,0,nx?4:18,nx?18:4,0,0,7);G.fill();G.restore()});circ(b.x,b.y,6,WH);txt('Siguiente: '+(nx_?'azul':'naranja'),20,24,10,nx_?BL:OR)}});

def('fis','Gravedad orbital','Los cuerpos con masa curvan la trayectoria del proyectil; se puede aprovechar la honda gravitatoria para llegar más lejos.','Angry Birds Space, Kerbal Space Program, Super Mario Galaxy','Arrastra desde la nave hacia la dirección de lanzamiento y suelta. Llega al círculo verde.','',()=>{
const PL=[{x:130,y:90,m:9000,r:16},{x:220,y:135,m:6000,r:12}];let pr=null,tr=[],tg={x:290,y:40},res='',aim=0;
return dt=>{if(!pr&&PT)aim=1;if(aim&&!P.down){pr={x:20,y:170,vx:(P.x-20)*1.2,vy:(P.y-170)*1.2};tr=[];aim=0}
if(pr){for(let k=0;k<2;k++){if(!pr)break;const h=dt/2;for(const p of PL){const dx=p.x-pr.x,dy=p.y-pr.y,d2=Math.max(dx*dx+dy*dy,100),d=Math.sqrt(d2);pr.vx+=dx/d*p.m*20/d2*h;pr.vy+=dy/d*p.m*20/d2*h;if(d<p.r){res='¡Estrellado!';pr=null;break}}if(pr){pr.x+=pr.vx*h;pr.y+=pr.vy*h}}
if(pr){tr.push([pr.x,pr.y]);if(tr.length>500)tr.shift();if(dist(pr.x,pr.y,tg.x,tg.y)<12){res='¡Llegaste!';pr=null;tg={x:R(230,300),y:R(20,180)}}else if(pr.x<-60||pr.x>380||pr.y<-60||pr.y>260){res='Perdido en el espacio';pr=null}}}
clr('#070814');for(const p of PL){ring(p.x,p.y,p.r*3,'#b388ff22',1);circ(p.x,p.y,p.r,PU)}circ(tg.x,tg.y,6,GR);ring(tg.x,tg.y,10,GR);for(const t of tr)circ(t[0],t[1],.8,'#ffffff66');if(pr)circ(pr.x,pr.y,3,Y);circ(20,170,5,BL);if(aim&&P.down)line(20,170,P.x,P.y,'#ffffff44',1);txt(res||'Usa la gravedad de los planetas',8,10,10,res?Y:GY)}});

def('fis','Restitución (rebote)','Cada material devuelve una fracción distinta de la energía al chocar. Define si algo se siente de goma, de madera o de plomo.','Rocket League, Peggle, cualquier juego con pelotas','Toca para soltar las bolas de nuevo.','A:Soltar',()=>{
let bs;const C=[GY,OR,Y,GR];const reset=()=>bs=[.3,.6,.85,1].map((e,i)=>({x:60+i*65,y:30,vy:0,e}));reset();return dt=>{if(PT||hit('a'))reset();for(const b of bs){b.vy+=500*dt;b.y+=b.vy*dt;if(b.y>172){b.y=172;b.vy=-b.vy*b.e}}
clr();rect(0,180,320,20,'#3a3f5c');bs.forEach((b,i)=>{circ(b.x,b.y,8,C[i]);txt('e = '+b.e,b.x,192,10,WH,'center')});txt('Coeficiente de restitución',8,10,10,GY)}});

def('fis','Pinball','Una bola sometida a gravedad que el jugador devuelve con aletas. Los parachoques añaden energía y puntos.','Pinball 3D (Space Cadet), Pokémon Pinball, Sonic Spinball','◀ y ▶ (o tocar cada mitad) mueven las aletas.','H',()=>{
let b,sc=0,balls=3;const F=[{x:105,y:172,l:44,s:1,a:.5,av:0},{x:215,y:172,l:44,s:-1,a:.5,av:0}],BU=[{x:110,y:70},{x:210,y:70},{x:160,y:115}],WL=[[10,125,105,172],[310,125,215,172]];const nb=()=>{b={x:R(60,260),y:20,vx:R(-60,60),vy:0}};nb();
return dt=>{const pl=key('l')||P.down&&P.x<160,pr=key('r')||P.down&&P.x>=160;F.forEach((f,i)=>{const tg=(i?pr:pl)?-.5:.5,na=f.a+cl(tg-f.a,-16*dt,16*dt);f.av=dt?(na-f.a)/dt:0;f.a=na});
for(let s=0;s<4;s++){const h=dt/4;b.vy+=380*h;b.x+=b.vx*h;b.y+=b.vy*h;if(b.x<16){b.x=16;b.vx=Math.abs(b.vx)*.8}if(b.x>304){b.x=304;b.vx=-Math.abs(b.vx)*.8}if(b.y<16){b.y=16;b.vy=Math.abs(b.vy)*.8}
for(const w of WL)bseg(b,5,w[0],w[1],w[2],w[3],0,0,.4);for(const f of F){const ex=f.x+Math.cos(f.a)*f.l*f.s,ey=f.y+Math.sin(f.a)*f.l;const r=bseg(b,5,f.x,f.y,ex,ey,0,0,.3);if(r&&Math.abs(f.av)>1){const rx=r.px-f.x,ry=r.py-f.y,w=f.s*f.av;b.vx+=-w*ry*.9;b.vy+=w*rx*.9}}
for(const u of BU){const d=dist(b.x,b.y,u.x,u.y);if(d<17&&d>0){const nx=(b.x-u.x)/d,ny=(b.y-u.y)/d;b.x=u.x+nx*17;b.y=u.y+ny*17;b.vx=nx*320;b.vy=ny*320;sc+=10;u.f=.15}}}
const sp=Math.hypot(b.vx,b.vy);if(sp>650){b.vx*=650/sp;b.vy*=650/sp}if(b.y>215){balls--;if(balls<=0){balls=3;sc=0}nb()}for(const u of BU)u.f=(u.f||0)-dt;
clr('#1b1430');for(const w of WL)line(w[0],w[1],w[2],w[3],GY,3);for(const u of BU){circ(u.x,u.y,12,u.f>0?WH:PU);ring(u.x,u.y,12,Y,2)}for(const f of F)line(f.x,f.y,f.x+Math.cos(f.a)*f.l*f.s,f.y+Math.sin(f.a)*f.l,OR,6);circ(b.x,b.y,5,WH);txt(sc+'',8,12,12,Y);txt('Bolas '+balls,312,12,10,WH,'right')}});

def('fis','Apilar bloques','Un bloque oscila sobre la torre y lo sueltas; la parte que sobresale se corta. Precisión con tensión creciente.','Stack, Tower Bloxx, Tricky Towers','Toca para soltar el bloque.','A:Soltar',()=>{
let st,cur,d,sp,over;const reset=()=>{st=[{x:110,w:100}];cur={x:0,w:100};d=1;sp=120;over=false};reset();return dt=>{if(over){if(PT||hit('a'))reset()}else{cur.x+=d*sp*dt;if(cur.x<0||cur.x+cur.w>320){d*=-1;cur.x=cl(cur.x,0,320-cur.w)}
if(PT||hit('a')){const t=st[st.length-1],l=Math.max(cur.x,t.x),r=Math.min(cur.x+cur.w,t.x+t.w);if(r<=l)over=true;else{if(Math.abs(r-l-t.w)<3)shake(2);st.push({x:l,w:r-l});cur={x:0,w:r-l};sp+=12}}}
const n=st.length,off=Math.max(0,n-8)*14;clr();st.forEach((s,i)=>rect(s.x,186-i*14+off,s.w,13,'hsl('+(i*25)+',70%,60%)'));if(!over)rect(cur.x,186-n*14+off,cur.w,13,WH);txt('Altura: '+(n-1),8,10);if(over)txt('Fin · toca para reiniciar',160,90,13,Y,'center')}});

def('fis','Golf (golpe con fuerza)','Apuntar y dosificar la potencia; la bola rueda, frena por rozamiento y rebota en las paredes.','Golf Story, What the Golf?, Desert Golfing','Arrastra hacia atrás desde la bola y suelta.','',()=>{
let b,hole,sh=0,aim=0,Wl,tot=0;const lv=()=>{b={x:40,y:100,vx:0,vy:0};hole={x:R(220,290),y:R(40,160)};Wl=[{x:140,y:R(20,90),w:14,h:90}];sh=0};lv();
return dt=>{const st=Math.hypot(b.vx,b.vy)<4;if(st&&PT)aim=1;if(aim&&!P.down){b.vx=(b.x-P.x)*3;b.vy=(b.y-P.y)*3;aim=0;sh++}const ox=b.x,oy=b.y;b.x+=b.vx*dt;b.y+=b.vy*dt;const f=Math.pow(.35,dt);b.vx*=f;b.vy*=f;
if(b.x<15||b.x>305){b.vx*=-1;b.x=cl(b.x,15,305)}if(b.y<15||b.y>185){b.vy*=-1;b.y=cl(b.y,15,185)}for(const w of Wl)if(inR(b.x,b.y,w.x-4,w.y-4,w.w+8,w.h+8)){if(ox<w.x-4||ox>w.x+w.w+4)b.vx*=-1;else b.vy*=-1;b.x=ox;b.y=oy}
if(dist(b.x,b.y,hole.x,hole.y)<7&&Math.hypot(b.vx,b.vy)<160){tot+=sh;lv()}
clr('#2d6a4f');srect(10,10,300,180,'#1b4332',8);for(const w of Wl)rect(w.x,w.y,w.w,w.h,'#8d6e4c');circ(hole.x,hole.y,7,'#081c15');circ(b.x,b.y,4,WH);if(aim&&P.down)line(b.x,b.y,b.x+(b.x-P.x),b.y+(b.y-P.y),'#ffffff88',1.5);txt('Golpes: '+sh,16,22,10)}});

def('fis','Explosiones con onda expansiva','Una explosión empuja todo lo que tiene alrededor con una fuerza que decrece con la distancia.','Half-Life 2, Worms, Teardown','Toca para hacer estallar. B recoloca las cajas.','B:Reset',()=>{
let C=[],rg=[];const fx=PX(),reset=()=>{C=[];for(let i=0;i<5;i++)for(let j=0;j<3;j++)C.push({x:80+i*34,y:168-j*16,vx:0,vy:0})};reset();
return dt=>{if(PT){fx.add(P.x,P.y,25,OR,180);rg.push({x:P.x,y:P.y,r:0});shake(6);for(const c of C){const dx=c.x+7-P.x,dy=c.y+7-P.y,d=Math.max(10,Math.hypot(dx,dy));if(d<120){const f=(1-d/120)*600;c.vx+=dx/d*f;c.vy+=dy/d*f}}}if(hit('b'))reset();
for(const c of C){c.vy+=500*dt;c.x+=c.vx*dt;c.y+=c.vy*dt;if(c.y>169){c.y=169;c.vy*=-.3;c.vx*=.85}if(c.y<0){c.y=0;c.vy=Math.abs(c.vy)}if(c.x<0||c.x>305){c.vx*=-.5;c.x=cl(c.x,0,305)}}
clr();rect(0,184,320,16,'#3a3f5c');for(const c of C){rect(c.x,c.y,15,15,'#c77d4f');srect(c.x+.5,c.y+.5,14,14,'#8d5a3a')}for(const r of rg){r.r+=300*dt;ring(r.x,r.y,r.r,'rgba(255,200,100,'+Math.max(0,1-r.r/120)+')',2)}rg=rg.filter(r=>r.r<120);fx.run(dt)}});

def('fis','Cuerdas y telas (Verlet)','Cadenas de puntos unidos por restricciones de distancia que imitan cuerdas, telas o cadenas.','Hitman (cuerdas), Worms, Limbo','Agarra la cuerda y lánzala.','',()=>{
const V=VR();let pr=V.pt(160,20,1);const ch=[pr];for(let i=1;i<20;i++){const q=V.pt(160,20+i*8);V.st(pr,q);pr=q;ch.push(q)}let gr=null;
return dt=>{if(PT)gr=ch.reduce((a,c)=>dist(c.x,c.y,P.x,P.y)<dist(a.x,a.y,P.x,P.y)?c:a);if(!P.down)gr=null;if(gr&&!gr.pin){gr.x=P.x;gr.y=P.y}V.step(dt);
clr();for(let i=1;i<ch.length;i++)line(ch[i-1].x,ch[i-1].y,ch[i].x,ch[i].y,OR,3);circ(160,20,4,GY);circ(ch[19].x,ch[19].y,7,Y);txt('Arrastra y suelta',8,10,10,GY)}});

def('fis','Ragdoll','Al perder el control, el cuerpo se convierte en un muñeco articulado que cae según la física.','Totally Accurate Battle Simulator, Human: Fall Flat, GTA','Agarra cualquier parte del muñeco. B lo recoloca.','B:Reset',()=>{
let V,gr=null;const mk=()=>{V=VR();const q=(x,y)=>V.pt(160+x,40+y),h=q(0,0),n=q(0,12),p=q(0,40),el=q(-12,22),hl=q(-20,36),er=q(12,22),hr=q(20,36),kl=q(-6,56),fl=q(-8,74),kr=q(6,56),fr=q(8,74);V.parts=[[h,n],[n,p],[n,el],[el,hl],[n,er],[er,hr],[p,kl],[kl,fl],[p,kr],[kr,fr]];V.parts.forEach(s=>V.st(s[0],s[1]));[[h,p],[el,p],[er,p],[kl,kr],[fl,p],[fr,p]].forEach(s=>V.st(s[0],s[1]));V.h=h};mk();
return dt=>{if(PT)gr=V.p.reduce((a,c)=>dist(c.x,c.y,P.x,P.y)<dist(a.x,a.y,P.x,P.y)?c:a);if(!P.down)gr=null;if(gr){gr.x=P.x;gr.y=P.y}if(hit('b'))mk();V.step(dt,600,8);
for(const o of V.p){if(o.y>182){o.y=182;o.ox=lerp(o.ox,o.x,.3)}if(o.x<4||o.x>316){o.x=cl(o.x,4,316)}}
clr();rect(0,184,320,16,'#3a3f5c');for(const s of V.parts)line(s[0].x,s[0].y,s[1].x,s[1].y,WH,4);circ(V.h.x,V.h.y,7,WH)}});

def('fis','Corrientes de aire','Zonas con fuerza constante que empujan al jugador: ventiladores, corrientes térmicas o viento.','Zelda: BotW (corrientes), Celeste (cap. 4), Ori','Entra en la corriente para elevarte. B enciende/apaga el ventilador.','H|A:Saltar|B:Ventilador',()=>{
const S=[...lvl(),{x:220,y:78,w:100,h:10}],b=body(30,160);let on=true,ps=[];return dt=>{if(hit('b'))on=!on;walk(b);if(hit('a')&&b.g)b.vy=-250;const inF=on&&b.x+b.w>150&&b.x<190;phys(b,S,dt,inF?(b.y>50?-500:300):900);if(inF)b.vy*=Math.pow(.3,dt);
if(on)ps.push({x:R(150,190),y:184});for(const p of ps)p.y-=200*dt;ps=ps.filter(p=>p.y>20);
clr();for(const p of ps)line(p.x,p.y,p.x,p.y+6,'#ffffff44',1);drawS(S);rect(146,178,48,8,on?BL:GY);hero(b);rect(300,62,10,16,Y);txt('Usa la corriente para llegar a la estrella',8,10,10,GY)}});

def('fis','Masa y empuje','Los objetos pesados cuestan más de mover que los ligeros. La masa cambia el ritmo del puzle.','Limbo, Inside, Trine','Empuja las cajas caminando contra ellas.','H|A:Saltar',()=>{
const S=lvl(),b=body(20,160),Bx=[{x:90,y:164,w:20,h:20,m:1,vx:0},{x:160,y:154,w:30,h:30,m:3,vx:0},{x:240,y:144,w:40,h:40,m:8,vx:0}];
return dt=>{walk(b,110);if(hit('a')&&b.g)b.vy=-300;for(const o of Bx){const push=(key('r')&&touch(b,[o],1,0))?1:(key('l')&&touch(b,[o],-1,0))?-1:0;o.vx=push?push*110/Math.pow(o.m,.8):o.vx*Math.pow(.001,dt);const nx=o.x+o.vx*dt,others=[...S,...Bx.filter(q=>q!==o)];if(!others.some(s=>ov({x:nx,y:o.y,w:o.w,h:o.h},s)))o.x=nx;else o.vx=0}
phys(b,[...S,...Bx],dt);clr();drawS(S);for(const o of Bx){rect(o.x,o.y,o.w,o.h,'#8d6e4c');txt(o.m+' kg',o.x+o.w/2,o.y+o.h/2,9,WH,'center')}hero(b);txt('Compara lo que cuesta mover cada caja',8,10,10,GY)}});

// ================= PUZLES =================
def('puz','Empujar cajas (Sokoban)','Solo puedes empujar, nunca tirar, y de una en una. Un mal empujón contra la pared puede dejar el nivel sin solución.','Sokoban, Baba Is You, Stephen’s Sausage Roll','Cruceta. Lleva cada caja a una marca. B reinicia.','D|B:Reiniciar',()=>{
const M0=['#########','#   #   #','# $ . $ #','#  ### .#','# .$    #','#   @   #','#########'],S=22,ox=61,oy=23,GL=[];M0.forEach((r,y)=>[...r].forEach((c,x)=>{if(c=='.')GL.push([x,y])}));let m,px,py,mv;
const reset=()=>{mv=0;m=M0.map((r,y)=>[...r].map((c,x)=>{if(c=='@'){px=x;py=y;return' '}return c=='.'?' ':c}))};reset();
return dt=>{let dx=0,dy=0;if(hit('l'))dx=-1;if(hit('r'))dx=1;if(hit('u'))dy=-1;if(hit('d'))dy=1;if(hit('b'))reset();
if(dx||dy){const c=m[py+dy][px+dx];if(c=='$'){const c2=m[py+2*dy][px+2*dx];if(c2==' '){m[py+2*dy][px+2*dx]='$';m[py+dy][px+dx]=' ';px+=dx;py+=dy;mv++}}else if(c!='#'){px+=dx;py+=dy;mv++}}const won=GL.every(g=>m[g[1]][g[0]]=='$');
clr();m.forEach((r,y)=>r.forEach((c,x)=>{const X=ox+x*S,Yy=oy+y*S;if(c=='#')rect(X,Yy,S,S,'#3a3f5c')}));for(const g of GL)ring(ox+g[0]*S+11,oy+g[1]*S+11,6,Y,2);m.forEach((r,y)=>r.forEach((c,x)=>{if(c=='$')rect(ox+x*S+3,oy+y*S+3,S-6,S-6,GL.some(g=>g[0]==x&&g[1]==y)?GR:'#c77d4f')}));circ(ox+px*S+11,oy+py*S+11,7,BL);txt(won?'¡Resuelto en '+mv+' movimientos!':'Movimientos: '+mv,8,12,10,won?GR:GY)}});

def('puz','Combinar tres (match-3)','Intercambias piezas adyacentes para formar líneas de tres o más iguales, que desaparecen y dejan caer otras nuevas.','Bejeweled, Candy Crush, Puzzle Quest','Toca una pieza y luego una vecina para intercambiarlas.','',()=>{
const C=[RD,Y,BL,GR,PU],w=8,h=6,S=26,ox=56,oy=32;let g=[],sel=null,sc=0,first=true;const fx=PX(),rnd=()=>RI(0,4);for(let i=0;i<w*h;i++)g.push(rnd());const at=(x,y)=>g[y*w+x];
const find=()=>{const k=new Set();for(let y=0;y<h;y++)for(let x=0;x<w-2;x++){const v=at(x,y);if(v>=0&&v==at(x+1,y)&&v==at(x+2,y))[0,1,2].forEach(i=>k.add(y*w+x+i))}for(let x=0;x<w;x++)for(let y=0;y<h-2;y++){const v=at(x,y);if(v>=0&&v==at(x,y+1)&&v==at(x,y+2))[0,1,2].forEach(i=>k.add((y+i)*w+x))}return k};
const settle=()=>{let k,n=0;while((k=find()).size&&n++<50){sc+=k.size;k.forEach(i=>{fx.add(ox+(i%w)*S+S/2,oy+Math.floor(i/w)*S+S/2,4,C[g[i]],60);g[i]=-1});for(let x=0;x<w;x++){const col=[];for(let y=h-1;y>=0;y--)if(at(x,y)>=0)col.push(at(x,y));for(let y=h-1,i=0;y>=0;y--,i++)g[y*w+x]=i<col.length?col[i]:rnd()}}};
return dt=>{if(first){settle();sc=0;first=false;fx.a.length=0}if(PT){const x=Math.floor((P.x-ox)/S),y=Math.floor((P.y-oy)/S);if(x>=0&&x<w&&y>=0&&y<h){const i=y*w+x;if(sel===null)sel=i;else{const j=sel,adj=Math.abs(i%w-j%w)+Math.abs(Math.floor(i/w)-Math.floor(j/w))==1;if(adj){[g[i],g[j]]=[g[j],g[i]];if(find().size)settle();else[g[i],g[j]]=[g[j],g[i]];sel=null}else sel=i}}}
clr();for(let i=0;i<w*h;i++){const x=ox+(i%w)*S,y=oy+Math.floor(i/w)*S;rect(x+1,y+1,S-2,S-2,'#1b1e2e');if(g[i]>=0)circ(x+S/2,y+S/2,9,C[g[i]]);if(i===sel)srect(x+1.5,y+1.5,S-3,S-3,WH,2)}fx.run(dt);txt('Puntos: '+sc,8,14)}});

def('puz','Puzle deslizante','Fichas en una cuadrícula con un hueco; solo puedes mover las que están junto a él. Ordenar requiere pensar varios pasos por delante.','Puzle del 15, Professor Layton, Zelda (bloques)','Toca una ficha junto al hueco. B baraja.','B:Barajar',()=>{
let b,mv;const S=54,ox=79,oy=17;const sh=()=>{b=[1,2,3,4,5,6,7,8,0];mv=0;for(let k=0;k<200;k++){const z=b.indexOf(0),n=[z-3,z+3,z%3?z-1:-1,z%3<2?z+1:-1].filter(i=>i>=0&&i<9);const j=n[RI(0,n.length-1)];[b[z],b[j]]=[b[j],b[z]]}};sh();
return dt=>{if(PT){const x=Math.floor((P.x-ox)/S),y=Math.floor((P.y-oy)/S);if(x>=0&&x<3&&y>=0&&y<3){const i=y*3+x,z=b.indexOf(0);if(Math.abs(i%3-z%3)+Math.abs(Math.floor(i/3)-Math.floor(z/3))==1){[b[z],b[i]]=[b[i],b[z]];mv++}}}if(hit('b'))sh();const won=b.join()=='1,2,3,4,5,6,7,8,0';
clr();b.forEach((v,i)=>{if(!v)return;const x=ox+(i%3)*S,y=oy+Math.floor(i/3)*S;rect(x+2,y+2,S-4,S-4,won?GR:'hsl('+(v*40)+',60%,55%)');txt(v,x+S/2,y+S/2,20,BG,'center')});txt('Mov.: '+mv,8,12);if(won)txt('¡Resuelto!',8,30,12,GR)}});

def('puz','Apagar luces','Cada casilla que pulsas cambia ella y sus cuatro vecinas. Hay que apagar todo el tablero.','Lights Out, Zelda (puzles de interruptores), The Witness','Toca las casillas. B genera otro tablero.','B:Nuevo',()=>{
let L,mv;const S=32,ox=80,oy=18;const tog=(x,y)=>{for(const[a,c]of[[0,0],[1,0],[-1,0],[0,1],[0,-1]]){const i=x+a,j=y+c;if(i>=0&&i<5&&j>=0&&j<5)L[j*5+i]^=1}};const nw=()=>{L=Array(25).fill(0);for(let k=0;k<6;k++)tog(RI(0,4),RI(0,4));mv=0;if(!L.some(v=>v))nw()};nw();
return dt=>{if(PT){const x=Math.floor((P.x-ox)/S),y=Math.floor((P.y-oy)/S);if(x>=0&&x<5&&y>=0&&y<5){tog(x,y);mv++}}if(hit('b'))nw();const won=!L.some(v=>v);
clr();L.forEach((v,i)=>rect(ox+(i%5)*S+2,oy+Math.floor(i/5)*S+2,S-4,S-4,v?Y:'#262a3d'));txt('Pulsaciones: '+mv,8,12,10,GY);if(won)txt('¡Todo apagado!',8,30,12,GR)}});

def('puz','Memoria de parejas','Las cartas están boca abajo; levantas dos por turno y se quedan si coinciden. Pone a prueba la memoria a corto plazo.','Memory / Concentration, Super Mario Bros. 3 (minijuego), Pokémon (Ruleta)','Toca dos cartas. B reparte de nuevo.','B:Repartir',()=>{
let c,op=[],t=0,tries=0;const sy=['★','●','▲','■','♦','♥'],cs=[Y,BL,GR,PU,OR,RD],S=50,ox=60,oy=18,HH=56;const nw=()=>{c=[0,1,2,3,4,5,0,1,2,3,4,5].sort(()=>Math.random()-.5).map(v=>({v,m:0}));tries=0;op=[]};nw();
return dt=>{t-=dt;if(op.length==2&&t<=0){if(c[op[0]].v==c[op[1]].v)op.forEach(i=>c[i].m=1);op=[]}if(PT&&op.length<2){const x=Math.floor((P.x-ox)/S),y=Math.floor((P.y-oy)/HH);if(x>=0&&x<4&&y>=0&&y<3){const i=y*4+x;if(!c[i].m&&!op.includes(i)){op.push(i);if(op.length==2){t=.7;tries++}}}}if(hit('b'))nw();
clr();c.forEach((q,i)=>{const x=ox+(i%4)*S,y=oy+Math.floor(i/4)*HH,up=q.m||op.includes(i);rect(x+3,y+3,S-6,HH-6,up?'#2f3550':PU);if(up)txt(sy[q.v],x+S/2,y+HH/2,22,cs[q.v],'center')});txt('Intentos: '+tries,8,12);if(c.every(q=>q.m))txt('¡Completo!',8,30,12,GR)}});

def('puz','Girar tuberías','Cada pieza se gira para conectar un flujo desde la entrada hasta la salida.','Pipe Mania, BioShock (hackeo), Plumber','Toca las piezas para girarlas; conecta la izquierda con la derecha. B: nuevo tablero.','B:Nuevo',()=>{
const w=6,h=4,S=40,ox=40,oy=22,arms=[[0,-1,1],[1,0,2],[0,1,4],[-1,0,8]],rot=m=>((m<<1)|(m>>3))&15;let g,sr,er,fill;
const gen=()=>{g=Array(w*h).fill(0);const path=[];let y=RI(0,h-1);sr=y;for(let x=0;x<w;x++){const t=RI(0,h-1);path.push([x,y]);while(y!=t){y+=Math.sign(t-y);path.push([x,y])}}er=y;
for(let i=0;i<path.length-1;i++){const[a,b]=path[i],[c,d]=path[i+1];if(c>a){g[b*w+a]|=2;g[d*w+c]|=8}else if(d>b){g[b*w+a]|=4;g[d*w+c]|=1}else{g[b*w+a]|=1;g[d*w+c]|=4}}g[sr*w]|=8;g[er*w+w-1]|=2;for(let i=0;i<w*h;i++){if(!g[i])g[i]=[5,3,7][RI(0,2)];for(let k=RI(0,3);k--;)g[i]=rot(g[i])}};gen();
const flow=()=>{fill=new Set();if(!(g[sr*w]&8))return;const q=[sr*w];fill.add(sr*w);while(q.length){const i=q.pop(),x=i%w,y=(i/w)|0;for(const[a,b,bit]of arms){if(!(g[i]&bit))continue;const X=x+a,Yy=y+b;if(X<0||Yy<0||X>=w||Yy>=h)continue;const j=Yy*w+X,opp=bit<4?bit<<2:bit>>2;if(g[j]&opp&&!fill.has(j)){fill.add(j);q.push(j)}}}};
return dt=>{if(PT){const x=Math.floor((P.x-ox)/S),y=Math.floor((P.y-oy)/S);if(x>=0&&x<w&&y>=0&&y<h)g[y*w+x]=rot(g[y*w+x])}if(hit('b'))gen();flow();const won=fill.has(er*w+w-1)&&(g[er*w+w-1]&2);
clr();for(let i=0;i<w*h;i++){const x=ox+(i%w)*S+S/2,y=oy+Math.floor(i/w)*S+S/2;rect(x-S/2+1,y-S/2+1,S-2,S-2,'#1b1e2e');const c=fill.has(i)?BL:GY;circ(x,y,5,c);for(const[a,b,bit]of arms)if(g[i]&bit)line(x,y,x+a*S/2,y+b*S/2,c,8)}
rect(ox-14,oy+sr*S+12,14,16,BL);rect(ox+w*S,oy+er*S+12,14,16,won?BL:GY);txt(won?'¡El agua llega a la salida!':'Conecta la entrada con la salida',8,12,10,won?GR:GY)}});

def('puz','Láseres y espejos','Un rayo viaja en línea recta y rebota en los espejos que orientas para llevarlo hasta el objetivo.','The Talos Principle, Zelda (espejos), Laser Maze','Toca los espejos para girarlos.','',()=>{
const w=8,h=5,S=34,ox=24,oy=18,Mi={'3,1':0,'3,4':0,'6,4':0,'6,2':0,'5,1':0,'1,3':0,'4,2':0},tg=[7,2];for(const k in Mi)Mi[k]=RI(0,1);
return dt=>{if(PT){const x=Math.floor((P.x-ox)/S),y=Math.floor((P.y-oy)/S),k=x+','+y;if(k in Mi)Mi[k]^=1}let x=0,y=1,dx=1,dy=0,pts=[[ox,oy+S*1.5]],won=false;
for(let s=0;s<60;s++){pts.push([ox+x*S+S/2,oy+y*S+S/2]);if(x==tg[0]&&y==tg[1]){won=true;break}const m=Mi[x+','+y];if(m===0){[dx,dy]=[-dy,-dx]}else if(m===1){[dx,dy]=[dy,dx]}x+=dx;y+=dy;if(x<0||y<0||x>=w||y>=h){pts.push([ox+(x+.5)*S,oy+(y+.5)*S]);break}}
clr();for(let i=0;i<w;i++)for(let j=0;j<h;j++)srect(ox+i*S+.5,oy+j*S+.5,S-1,S-1,'#1f2333');for(const k in Mi){const[a,b]=k.split(',').map(Number),cx=ox+a*S+S/2,cy=oy+b*S+S/2;Mi[k]?line(cx-11,cy-11,cx+11,cy+11,WH,4):line(cx-11,cy+11,cx+11,cy-11,WH,4)}
rect(ox+tg[0]*S+8,oy+tg[1]*S+8,S-16,S-16,won?GR:'#2f5a3a');G.strokeStyle=RD;G.lineWidth=2.5;G.beginPath();pts.forEach((p,i)=>i?G.lineTo(p[0],p[1]):G.moveTo(p[0],p[1]));G.stroke();rect(ox-12,oy+S+10,12,14,RD);txt(won?'¡Objetivo alcanzado!':'Lleva el láser al cuadro verde',8,10,10,won?GR:GY)}});

def('puz','Inundar de color','Desde una esquina eliges un color y tu zona absorbe las casillas vecinas de ese color. Hay que cubrir todo con pocos movimientos.','Flood-It, Color Flood, Splatoon (en espíritu)','Toca los colores de abajo.','',()=>{
const w=12,h=7,S=18,ox=52,oy=8,C=[RD,Y,BL,GR,PU];let g,mv;const nw=()=>{g=Array.from({length:w*h},()=>RI(0,4));mv=0};nw();
const fill=c=>{const o=g[0];if(o==c)return;const st=[0],seen=new Set([0]);while(st.length){const i=st.pop();g[i]=c;const x=i%w,y=(i/w)|0;for(const[a,b]of[[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+a,ny=y+b,j=ny*w+nx;if(nx>=0&&nx<w&&ny>=0&&ny<h&&!seen.has(j)&&g[j]==o){seen.add(j);st.push(j)}}}mv++};
return dt=>{clr();g.forEach((c,i)=>rect(ox+(i%w)*S,oy+((i/w)|0)*S,S,S,C[c]));srect(ox+.5,oy+.5,S-1,S-1,WH,1.5);const won=g.every(c=>c==g[0]);let pk=-1;C.forEach((c,i)=>{if(btn(40+i*50,148,42,28,'',c))pk=i});if(pk>=0&&!won)fill(pk);txt(won?'¡Completado en '+mv+'! Toca arriba para otro':'Movimientos: '+mv+' / 20',8,190,10,won?GR:WH);if(won&&PT&&P.y<140)nw()}});

def('puz','2048','Deslizas todo el tablero y las fichas iguales se fusionan sumándose. Cada movimiento añade una ficha nueva.','2048, Threes!, Triple Town','Desliza el dedo o usa la cruceta. B reinicia.','D|B:Nuevo',()=>{
let g,sc,sx=null,sy=0;const add=()=>{const e=g.map((v,i)=>v?-1:i).filter(i=>i>=0);if(e.length)g[e[RI(0,e.length-1)]]=Math.random()<.9?2:4},nw=()=>{g=Array(16).fill(0);add();add();sc=0};nw();
const slide=(dx,dy)=>{let moved=false;for(let k=0;k<4;k++){const ln=[];for(let s=0;s<4;s++){const t=(dx>0||dy>0)?3-s:s;ln.push(dx?k*4+t:t*4+k)}const v=ln.map(i=>g[i]).filter(x=>x),o=[];for(let i=0;i<v.length;i++){if(v[i]==v[i+1]){o.push(v[i]*2);sc+=v[i]*2;i++}else o.push(v[i])}ln.forEach((idx,i)=>{const nv=o[i]||0;if(g[idx]!=nv)moved=true;g[idx]=nv})}if(moved)add()};
return dt=>{if(hit('l'))slide(-1,0);if(hit('r'))slide(1,0);if(hit('u'))slide(0,-1);if(hit('d'))slide(0,1);if(PT){sx=P.x;sy=P.y}if(!P.down&&sx!=null){const dx=P.x-sx,dy=P.y-sy;if(Math.max(Math.abs(dx),Math.abs(dy))>20){if(Math.abs(dx)>Math.abs(dy))slide(Math.sign(dx),0);else slide(0,Math.sign(dy))}sx=null}if(hit('b'))nw();
clr();const S=44,ox=72,oy=10;g.forEach((v,i)=>{const x=ox+(i%4)*S,y=oy+((i/4)|0)*S,l=v?Math.log2(v):0;rect(x+2,y+2,S-4,S-4,v?'hsl('+(40-l*12)+',80%,'+(75-l*3)+'%)':'#262a3d');if(v)txt(v,x+S/2,y+S/2,v>512?12:15,BG,'center')});txt('Puntos',258,20,10,GY);txt(sc,258,36,13)}});

def('puz','Buscaminas','Cada número indica cuántas minas hay alrededor. Deducción pura con algo de riesgo.','Buscaminas (Windows), Hexcells, Mine Sweeper Arcade','Toca para abrir. B alterna el modo bandera.','B:Bandera',()=>{
const w=12,h=7,S=22,ox=28,oy=26;let g,st,flag=false;const nw=()=>{g=[];for(let i=0;i<w*h;i++)g.push({m:Math.random()<.15,o:0,f:0});g.forEach((c,i)=>{let n=0;const x=i%w,y=(i/w)|0;for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++){const X=x+a,Yy=y+b;if(X>=0&&X<w&&Yy>=0&&Yy<h&&g[Yy*w+X].m)n++}c.n=n});st=0};nw();
const open=i=>{const c=g[i];if(c.o||c.f)return;c.o=1;if(c.m){st=-1;g.forEach(q=>{if(q.m)q.o=1});return}if(!c.n){const x=i%w,y=(i/w)|0;for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++){const X=x+a,Yy=y+b;if(X>=0&&X<w&&Yy>=0&&Yy<h)open(Yy*w+X)}}};
return dt=>{if(hit('b'))flag=!flag;if(PT){if(st)nw();else{const x=Math.floor((P.x-ox)/S),y=Math.floor((P.y-oy)/S);if(x>=0&&x<w&&y>=0&&y<h){const c=g[y*w+x];if(flag){if(!c.o)c.f^=1}else open(y*w+x)}}if(!st&&g.every(c=>c.m||c.o))st=1}
clr();const NC=[0,BL,GR,Y,OR,RD,PU,WH,WH];g.forEach((c,i)=>{const x=ox+(i%w)*S,y=oy+((i/w)|0)*S;rect(x+1,y+1,S-2,S-2,c.o?'#262a3d':'#3e4566');if(c.o&&c.m)circ(x+S/2,y+S/2,6,RD);else if(c.o&&c.n)txt(c.n,x+S/2,y+S/2,12,NC[c.n],'center');if(c.f&&!c.o)txt('⚑',x+S/2,y+S/2,12,RD,'center')});
txt('Modo: '+(flag?'bandera':'abrir'),8,12,10,flag?RD:GY);if(st)txt(st>0?'¡Ganaste!':'¡Boom! Toca para otra',312,12,10,st>0?GR:RD,'right')}});

def('puz','Nonograma','Las pistas numéricas de filas y columnas indican bloques consecutivos que hay que pintar. Al terminar aparece un dibujo.','Picross, Murder by Numbers, Pictopix','Toca para pintar o borrar. B: otro tablero.','B:Nuevo',()=>{
let sol,cur;const S=24,ox=130,oy=60;const nw=()=>{sol=Array.from({length:25},()=>Math.random()<.55?1:0);cur=Array(25).fill(0)};nw();const runs=a=>{const r=[];let n=0;for(const v of a){if(v)n++;else if(n){r.push(n);n=0}}if(n)r.push(n);return r.length?r:[0]};
return dt=>{if(PT){const x=Math.floor((P.x-ox)/S),y=Math.floor((P.y-oy)/S);if(x>=0&&x<5&&y>=0&&y<5)cur[y*5+x]^=1}if(hit('b'))nw();const ok=cur.every((v,i)=>v==sol[i]);
clr();for(let i=0;i<5;i++){txt(runs(sol.slice(i*5,i*5+5)).join(' '),ox-8,oy+i*S+S/2,11,WH,'right');const col=[0,1,2,3,4].map(j=>sol[j*5+i]),r=runs(col);r.forEach((n,k)=>txt(n,ox+i*S+S/2,oy-8-(r.length-1-k)*12,11,WH,'center'))}
cur.forEach((v,i)=>rect(ox+(i%5)*S+1,oy+((i/5)|0)*S+1,S-2,S-2,v?(ok?GR:PU):'#262a3d'));txt(ok?'¡Resuelto!':'Pinta según las pistas',8,190,10,ok?GR:GY)}});

def('puz','Placas de presión','Una placa abre una puerta solo mientras algo la pisa. Obliga a usar objetos (o clones) para mantenerla pulsada.','Portal, Zelda, Trine','Empuja la caja sobre la placa para abrir la puerta.','H|A:Saltar',()=>{
const S=[...lvl(),{x:200,y:0,w:14,h:150}],plate={x:120,y:180,w:30,h:4},bx={x:60,y:164,w:20,h:20};let b=body(20,160),dp=0,win=false;
return dt=>{walk(b);if(hit('a')&&b.g)b.vy=-280;const D={x:200,y:150,w:14,h:34*(1-dp)};const push=(key('r')&&touch(b,[bx],1,0))?1:(key('l')&&touch(b,[bx],-1,0))?-1:0;if(push){const nx=bx.x+push*80*dt;if(!ov({x:nx,y:bx.y,w:bx.w,h:bx.h},D)&&nx>0&&nx<300)bx.x=nx}
const pr=ov(b,plate)||ov(bx,plate);dp=cl(dp+(pr?2:-2)*dt,0,1);phys(b,[...S,D,bx],dt);if(b.x>270)win=true;
clr();drawS(S);rect(plate.x,plate.y,plate.w,plate.h,pr?GR:Y);rect(D.x,D.y,D.w,D.h,RD);rect(bx.x,bx.y,bx.w,bx.h,'#8d6e4c');rect(290,164,10,20,Y);hero(b);txt(win?'¡Lo conseguiste!':'La puerta solo se abre mientras la placa está pulsada',8,10,10,win?GR:GY)}});

def('puz','Secuencia de memoria','El juego muestra una secuencia que crece y debes repetirla sin fallar.','Simon, Brain Age, Mass Effect (desencriptado)','Mira la secuencia y repítela tocando los colores.','',()=>{
const C=[GR,RD,Y,BL],Q=[[80,24],[165,24],[80,109],[165,109]];let seq=[],i=0,show=1,t=.8,lit=-1,lt=0,best=0,msg='';const next=()=>{seq.push(RI(0,3));i=0;show=1;t=.8};next();
return dt=>{lt-=dt;if(lt<=0)lit=-1;if(show){t-=dt;if(t<=0){if(i<seq.length){lit=seq[i];lt=.4;i++;t=.6}else{show=0;i=0}}}else if(PT){const k=Q.findIndex(q=>inR(P.x,P.y,q[0],q[1],75,75));if(k>=0){lit=k;lt=.2;if(seq[i]==k){i++;if(i==seq.length){best=Math.max(best,seq.length);next();t=1.2}}else{msg='¡Fallo! Récord: '+best;seq=[];next();t=1.5}}}
clr();Q.forEach((q,k)=>rect(q[0],q[1],75,75,lit==k?C[k]:C[k]+'44'));txt(show?'Observa…':'Repite ('+i+'/'+seq.length+')',8,12,10,GY);txt(msg,312,12,10,RD,'right')}});

def('puz','Torres de Hanói','Mueve la torre a otra varilla de disco en disco, sin poner nunca uno grande sobre uno pequeño.','Torres de Hanói, Mass Effect (Noveria), Professor Layton','Toca una varilla para coger y otra para soltar. B reinicia.','B:Reiniciar',()=>{
let Tw,sel=-1,mv;const nw=()=>{Tw=[[4,3,2,1],[],[]];mv=0;sel=-1};nw();const C=[0,RD,Y,BL,GR];
return dt=>{if(PT){const k=Math.min(2,Math.floor(P.x/107));if(sel<0){if(Tw[k].length)sel=k}else{const d=Tw[sel][Tw[sel].length-1],top=Tw[k][Tw[k].length-1];if(k!=sel&&(!top||top>d)){Tw[k].push(Tw[sel].pop());mv++}sel=-1}}if(hit('b'))nw();
clr();for(let k=0;k<3;k++){const cx=53+k*107;rect(cx-2,60,4,120,GY);rect(cx-45,178,90,4,GY);Tw[k].forEach((d,j)=>{const lift=sel==k&&j==Tw[k].length-1?-30:0;rect(cx-d*10,166-j*14+lift,d*20,12,C[d])})}txt('Movimientos: '+mv+' (mínimo 15)',8,12,10,GY);if(Tw[2].length==4)txt('¡Resuelto!',8,28,12,GR)}});

def('puz','Unir puntos de colores','Traza caminos que unan cada par de puntos del mismo color sin cruzarse, llenando todo el tablero.','Flow Free, Two Dots, The Witness (en parte)','Arrastra desde un punto hasta su pareja.','',()=>{
const S=32,ox=80,oy=20,E={A:[[0,0],[2,3]],B:[[0,4],[3,3]],C:[[1,0],[3,2]],D:[[2,1],[4,0]],E:[[3,1],[4,2]]},CC={A:RD,B:BL,C:Y,D:GR,E:PU};let path={},cur=null;
const ep=(r,c)=>{for(const k in E)for(const e of E[k])if(e[0]==r&&e[1]==c)return k;return null},owner=(r,c)=>{for(const k in path)if(path[k].some(p=>p[0]==r&&p[1]==c))return k;return null};
return dt=>{const c=Math.floor((P.x-ox)/S),r=Math.floor((P.y-oy)/S),inside=r>=0&&r<5&&c>=0&&c<5;
if(PT&&inside){const k=ep(r,c);if(k){cur=k;path[k]=[[r,c]]}else{const o=owner(r,c);if(o){cur=o;const i=path[o].findIndex(p=>p[0]==r&&p[1]==c);path[o]=path[o].slice(0,i+1)}}}
if(P.down&&cur&&inside){const p=path[cur],l=p[p.length-1];if((l[0]!=r||l[1]!=c)&&Math.abs(l[0]-r)+Math.abs(l[1]-c)==1){const i=p.findIndex(q=>q[0]==r&&q[1]==c);if(i>=0)path[cur]=p.slice(0,i+1);else{const e=ep(r,c),done=p.length>1&&ep(l[0],l[1])==cur;if(!done&&(!e||e==cur)){const o=owner(r,c);if(o&&o!=cur){const j=path[o].findIndex(q=>q[0]==r&&q[1]==c);path[o]=path[o].slice(0,j)}p.push([r,c])}}}}if(!P.down)cur=null;
let cells=0,ok=true;for(const k in E){const p=path[k];if(!p||p.length<2)ok=false;else{const a=p[0],b=p[p.length-1];if(ep(a[0],a[1])!=k||ep(b[0],b[1])!=k||(a[0]==b[0]&&a[1]==b[1]))ok=false}if(p)cells+=p.length}const won=ok&&cells==25;
clr();for(let i=0;i<5;i++)for(let j=0;j<5;j++)srect(ox+j*S+.5,oy+i*S+.5,S-1,S-1,'#262a3d');for(const k in path){const p=path[k];G.strokeStyle=CC[k];G.lineWidth=12;G.lineCap='round';G.lineJoin='round';G.beginPath();p.forEach((q,i)=>{const x=ox+q[1]*S+S/2,y=oy+q[0]*S+S/2;i?G.lineTo(x,y):G.moveTo(x,y)});G.stroke()}
for(const k in E)for(const e of E[k])circ(ox+e[1]*S+S/2,oy+e[0]*S+S/2,11,CC[k]);txt(won?'¡Tablero completo!':'Llena todas las casillas',8,190,10,won?GR:GY)}});

def('puz','Deslizar sobre hielo','El personaje no se detiene hasta chocar con algo. El reto es encontrar la secuencia de deslizamientos que lleva a la salida.','Pokémon (cuevas de hielo), Zelda, Ice Slide puzzles','Cruceta: te deslizas hasta chocar. B: nuevo nivel.','D|B:Nuevo',()=>{
const w=12,h=7,S=22,ox=28,oy=24;let rk,s,e,p,ax=0,ay=0,mv=0,best=0;const slide=(x,y,dx,dy)=>{for(;;){const nx=x+dx,ny=y+dy;if(nx<0||ny<0||nx>=w||ny>=h||rk.has(nx+','+ny))return[x,y];x=nx;y=ny;if(x==e[0]&&y==e[1])return[x,y]}};
const gen=()=>{for(let tr=0;tr<300;tr++){rk=new Set();for(let i=0;i<16;i++)rk.add(RI(0,w-1)+','+RI(0,h-1));s=[RI(0,w-1),RI(0,h-1)];e=[RI(0,w-1),RI(0,h-1)];if(rk.has(s+'')||rk.has(e+'')||s+''==e+'')continue;const D={[s]:0},q=[s];while(q.length){const c=q.shift();for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const n=slide(c[0],c[1],dx,dy);if(!(n in D)){D[n]=D[c]+1;q.push(n)}}}if(D[e]>=4){best=D[e];break}}p=[...s];ax=p[0];ay=p[1];mv=0};gen();
return dt=>{const moving=dist(ax,ay,p[0],p[1])>.05;if(!moving){let d=null;if(hit('l'))d=[-1,0];if(hit('r'))d=[1,0];if(hit('u'))d=[0,-1];if(hit('d'))d=[0,1];if(d){const n=slide(p[0],p[1],d[0],d[1]);if(n+''!=p+''){p=n;mv++}}}ax+=(p[0]-ax)*Math.min(1,dt*12);ay+=(p[1]-ay)*Math.min(1,dt*12);
const won=!moving&&p[0]==e[0]&&p[1]==e[1];if(hit('b')||won&&PT)gen();
clr('#16324a');for(let i=0;i<w;i++)for(let j=0;j<h;j++)rect(ox+i*S+1,oy+j*S+1,S-2,S-2,'#244a66');rk.forEach(k=>{const[a,b]=k.split(',');rect(ox+a*S+2,oy+b*S+2,S-4,S-4,'#6b7290')});rect(ox+e[0]*S+3,oy+e[1]*S+3,S-6,S-6,GR);circ(ox+ax*S+S/2,oy+ay*S+S/2,7,Y);txt(won?'¡Salida! Toca para otro':'Movimientos '+mv+' · mínimo '+best,8,12,10,won?GR:WH)}});

def('puz','Ordenar por colores','Viertes la parte superior de un tubo en otro hasta que cada tubo contenga un único color.','Water Sort Puzzle, Ball Sort, Hexa Sort','Toca un tubo y luego otro para verter. B: nuevo.','B:Nuevo',()=>{
const C=[RD,Y,BL,GR];let Tb,sel=-1;const nw=()=>{const a=[];for(let c=0;c<4;c++)for(let i=0;i<4;i++)a.push(c);a.sort(()=>Math.random()-.5);Tb=[0,1,2,3].map(i=>a.slice(i*4,i*4+4));Tb.push([],[]);sel=-1};nw();
return dt=>{if(PT){const k=Math.floor((P.x-10)/50);if(k>=0&&k<6&&P.y>40){if(sel<0){if(Tb[k].length)sel=k}else{if(k!=sel){const s=Tb[sel],d=Tb[k],c=s[s.length-1];while(s.length&&s[s.length-1]==c&&d.length<4&&(!d.length||d[d.length-1]==c))d.push(s.pop())}sel=-1}}}if(hit('b'))nw();const won=Tb.every(t=>!t.length||t.length==4&&t.every(v=>v==t[0]));
clr();Tb.forEach((t,k)=>{const x=22+k*50,y=sel==k?48:60;srect(x,y,26,110,WH,2);t.forEach((v,j)=>rect(x+3,y+110-3-(j+1)*26,20,25,C[v]))});txt(won?'¡Ordenado!':'Un color por tubo',8,12,10,won?GR:GY)}});

def('puz','Sudoku','Cada número debe aparecer una sola vez por fila, columna y bloque. Lógica pura de descarte.','Sudoku, Nikoli, Brain Training','Toca una casilla vacía para cambiar su número. B: otro.','B:Nuevo',()=>{
let sol,g,fix;const S=36,ox=88,oy=18;const nw=()=>{const base=[[1,2,3,4],[3,4,1,2],[2,1,4,3],[4,3,2,1]],p=[1,2,3,4].sort(()=>Math.random()-.5);sol=base.flat().map(v=>p[v-1]);fix=sol.map(()=>Math.random()<.45);g=sol.map((v,i)=>fix[i]?v:0)};nw();
const bad=i=>{const v=g[i];if(!v)return false;const r=(i/4)|0,c=i%4;for(let j=0;j<16;j++){if(j==i||g[j]!=v)continue;const r2=(j/4)|0,c2=j%4;if(r2==r||c2==c||((r2>>1)==(r>>1)&&(c2>>1)==(c>>1)))return true}return false};
return dt=>{if(PT){const c=Math.floor((P.x-ox)/S),r=Math.floor((P.y-oy)/S);if(r>=0&&r<4&&c>=0&&c<4&&!fix[r*4+c])g[r*4+c]=(g[r*4+c]+1)%5}if(hit('b'))nw();const won=g.every((v,i)=>v&&!bad(i));
clr();g.forEach((v,i)=>{const x=ox+(i%4)*S,y=oy+((i/4)|0)*S;rect(x+1,y+1,S-2,S-2,fix[i]?'#2f3550':'#1f2333');if(v)txt(v,x+S/2,y+S/2,16,bad(i)?RD:fix[i]?WH:BL,'center')});line(ox+72,oy,ox+72,oy+144,WH,2);line(ox,oy+72,ox+144,oy+72,WH,2);txt(won?'¡Resuelto!':'En rojo: números repetidos',8,190,10,won?GR:GY)}});

def('puz','Cambio de dimensión','Un botón alterna entre dos versiones del mundo; las plataformas de una existen solo en ella.','Titanfall 2 (Efecto y causa), Fez, Giana Sisters: Twisted Dreams','B cambia de dimensión. Llega a la estrella.','H|A:Saltar|B:Cambiar',()=>{
const base=lvl(),Ra=[{x:60,y:140,w:50,h:8},{x:180,y:80,w:50,h:8}],Bb=[{x:120,y:110,w:50,h:8},{x:240,y:50,w:60,h:8}];let m=0;const b=body(20,160);
return dt=>{if(hit('b')){const nx=m?Ra:Bb;if(!nx.some(s=>ov(b,s)))m^=1}walk(b);if(hit('a')&&b.g)b.vy=-300;phys(b,[...base,...(m?Bb:Ra)],dt);
clr(m?'#101a2a':'#1f1218');drawS(base);for(const s of Ra)m?srect(s.x+.5,s.y+.5,s.w-1,s.h-1,RD):rect(s.x,s.y,s.w,s.h,RD);for(const s of Bb)!m?srect(s.x+.5,s.y+.5,s.w-1,s.h-1,BL):rect(s.x,s.y,s.w,s.h,BL);hero(b,m?BL:RD);rect(265,36,10,12,Y);txt('Dimensión '+(m?'azul':'roja'),8,10,10,m?BL:RD)}});
