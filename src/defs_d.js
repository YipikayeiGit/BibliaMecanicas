// ================= EXPLORACIÓN Y MUNDO =================
def('exp','Niebla de guerra','El mapa permanece oculto hasta que lo exploras; lo ya visto queda en penumbra y solo ves en tiempo real lo que tienes cerca.','Age of Empires, StarCraft, Civilization','Explora con la cruceta y encuentra los tesoros.','D',()=>{
let x=20,y=20,got=0;const F=new Uint8Array(32*20),it=[],trees=[];for(let i=0;i<6;i++)it.push({x:R(20,300),y:R(20,180)});for(let i=0;i<30;i++)trees.push({x:R(0,320),y:R(0,200),r:R(5,12)});
return dt=>{const[dx,dy]=dir();x=cl(x+dx*90*dt,6,314);y=cl(y+dy*90*dt,6,194);for(let i=0;i<32;i++)for(let j=0;j<20;j++){const k=j*32+i;if(dist(i*10+5,j*10+5,x,y)<40)F[k]=2;else if(F[k]==2)F[k]=1}for(let i=it.length;i--;)if(dist(x,y,it[i].x,it[i].y)<10){it.splice(i,1);got++}
clr('#24382a');for(const t of trees)circ(t.x,t.y,t.r,'#2f5d3a');for(const o of it)if(F[Math.floor(o.y/10)*32+Math.floor(o.x/10)]==2)circ(o.x,o.y,4,Y);circ(x,y,6,BL);for(let k=0;k<640;k++)if(F[k]<2)rect((k%32)*10,Math.floor(k/32)*10,10,10,F[k]?'#000a':'#05060b');txt('Tesoros '+got+'/6',8,10,10,Y)}});

def('exp','Minimapa','Una versión reducida del mundo en una esquina que muestra tu posición, objetivos y la zona que abarca la cámara.','GTA, League of Legends, Metroid','Usa el minimapa para encontrar la estrella.','D',()=>{
const WW=960,WH2=600;let x=480,y=300;const rocks=[];for(let i=0;i<40;i++)rocks.push({x:R(0,WW),y:R(0,WH2),r:R(6,20)});const gl={x:R(50,900),y:R(50,550)};
return dt=>{const[dx,dy]=dir();x=cl(x+dx*130*dt,0,WW);y=cl(y+dy*130*dt,0,WH2);if(dist(x,y,gl.x,gl.y)<14){gl.x=R(50,900);gl.y=R(50,550)}const cx=cl(x-160,0,WW-320),cy=cl(y-100,0,WH2-200);
clr('#24382a');G.save();G.translate(-cx,-cy);for(let i=0;i<WW;i+=40)line(i,0,i,WH2,'#ffffff08',1);for(const r of rocks)circ(r.x,r.y,r.r,'#3e5a44');circ(gl.x,gl.y,7,Y);circ(x,y,7,BL);G.restore();
const mx=236,my=6,s=80/WW;rect(mx,my,80,50,'#000b');srect(mx,my,80,50,WH);for(const r of rocks)rect(mx+r.x*s,my+r.y*s,1.5,1.5,'#6a8a70');rect(mx+gl.x*s-1.5,my+gl.y*s-1.5,3,3,Y);rect(mx+x*s-1.5,my+y*s-1.5,3,3,BL);srect(mx+cx*s,my+cy*s,320*s,200*s,'#ffffff66');txt('Busca la estrella',8,10,10,GY)}});

def('exp','Indicador de objetivo fuera de pantalla','Una flecha en el borde apunta hacia un objetivo que no se ve, con su distancia. Sustituye a la brújula.','Mass Effect, Fortnite, Crazy Taxi','Sigue la flecha amarilla.','D',()=>{
const WW=1200,WH2=800;let x=600,y=400,tg={x:R(0,WW),y:R(0,WH2)},n=0;const dots=[];for(let i=0;i<80;i++)dots.push([R(0,WW),R(0,WH2)]);
return dt=>{const[dx,dy]=dir();x=cl(x+dx*150*dt,0,WW);y=cl(y+dy*150*dt,0,WH2);if(dist(x,y,tg.x,tg.y)<14){n++;tg={x:R(0,WW),y:R(0,WH2)}}const cx=x-160,cy=y-100;
clr('#1c2433');G.save();G.translate(-cx,-cy);for(const d of dots)circ(d[0],d[1],2,'#2f3b55');srect(0,0,WW,WH2,'#ffffff22',2);circ(tg.x,tg.y,7,Y);circ(x,y,7,BL);G.restore();
const sx=tg.x-cx,sy=tg.y-cy;if(sx<0||sx>320||sy<0||sy>200){const a=Math.atan2(sy-100,sx-160),k=Math.min(Math.abs(146/(Math.cos(a)||1e-6)),Math.abs(86/(Math.sin(a)||1e-6))),ex=160+Math.cos(a)*k,ey=100+Math.sin(a)*k;G.save();G.translate(ex,ey);G.rotate(a);G.fillStyle=Y;G.beginPath();G.moveTo(10,0);G.lineTo(-6,-7);G.lineTo(-6,7);G.fill();G.restore();txt(Math.round(dist(x,y,tg.x,tg.y)/10)+' m',ex,ey+(ey>100?-14:14),9,Y,'center')}txt('Objetivos: '+n,8,10,10,GY)}});

def('exp','Generación procedural','El nivel se construye con algoritmos y azar en lugar de a mano; cada partida es distinta.','Spelunky, Minecraft, No Man’s Sky','Mira cómo se excava la mazmorra. Toca para generar otra.','',()=>{
let g,wk,steps;const nw=()=>{g=new Uint8Array(40*25);wk=[{x:20,y:12}];steps=0};nw();
return dt=>{if(PT||hit('a'))nw();for(let k=0;k<12&&steps<600;k++){steps++;for(const w of wk){g[w.y*40+w.x]=1;const d=[[1,0],[-1,0],[0,1],[0,-1]][RI(0,3)];w.x=cl(w.x+d[0],1,38);w.y=cl(w.y+d[1],1,23);if(Math.random()<.02&&wk.length<5)wk.push({x:w.x,y:w.y});if(Math.random()<.01)for(let a=-2;a<=2;a++)for(let b=-1;b<=1;b++)g[cl(w.y+b,1,23)*40+cl(w.x+a,1,38)]=1}}
clr('#0b0c14');for(let i=0;i<1000;i++)if(g[i])rect((i%40)*8,Math.floor(i/40)*8,8,8,'#3e4566');for(const w of wk)rect(w.x*8,w.y*8,8,8,Y);txt(steps<600?'Excavando con caminantes aleatorios…':'Mazmorra lista · toca para otra',8,10,10,WH)}});

def('exp','Llaves y puertas','Puertas que solo se abren con su llave correspondiente. Ordenan la exploración y crean pequeños objetivos.','Zelda, DOOM, Resident Evil','Cruceta. Recoge cada llave antes de su puerta. B reinicia.','D|B:Reiniciar',()=>{
const M0=['################','#   #   #   #  #','# r # b # g #  #','#   R   B   G E#','#   #   #   #  #','# @ #   #   #  #','################'],S=20,oy=30,CC={r:RD,b:BL,g:GR},NM={r:'roja',b:'azul',g:'verde'};let m,px,py,keys,msg,cd=0;
const reset=()=>{keys=new Set();msg='';m=M0.map((r,y)=>[...r].map((c,x)=>{if(c=='@'){px=x;py=y;return' '}return c}))};reset();
return dt=>{cd-=dt;let d=null;if(cd<=0){if(key('l'))d=[-1,0];else if(key('r'))d=[1,0];else if(key('u'))d=[0,-1];else if(key('d'))d=[0,1]}if(hit('b'))reset();
if(d){cd=.13;const nx=px+d[0],ny=py+d[1],c=m[ny][nx];if(c=='#'){}else if('RBG'.includes(c)){const k=c.toLowerCase();if(keys.has(k)){m[ny][nx]=' ';msg='Puerta '+NM[k]+' abierta';px=nx;py=ny}else msg='Necesitas la llave '+NM[k]}else{px=nx;py=ny;if('rbg'.includes(c)){keys.add(c);m[ny][nx]=' ';msg='¡Llave '+NM[c]+'!'}if(c=='E')msg='¡Salida! (B reinicia)'}}
clr();m.forEach((r,y)=>r.forEach((c,x)=>{const X=x*S,Yy=oy+y*S;if(c=='#')rect(X,Yy,S,S,'#3a3f5c');else if('RBG'.includes(c)){rect(X+2,Yy,S-4,S,CC[c.toLowerCase()]);rect(X+8,Yy+8,4,5,BG)}else if('rbg'.includes(c)){circ(X+7,Yy+10,4,CC[c]);rect(X+10,Yy+9,7,2,CC[c])}else if(c=='E')rect(X+3,Yy+3,S-6,S-6,Y)}));rect(px*S+4,oy+py*S+4,12,12,WH);txt('Llaves: '+([...keys].map(k=>NM[k]).join(', ')||'ninguna'),8,12,10,Y);txt(msg,8,186,10,GY)}});

def('exp','Habilidad que abre caminos','Zonas inalcanzables al principio que se vuelven accesibles al conseguir una habilidad nueva. Es el corazón del metroidvania.','Metroid, Hollow Knight, Ori and the Blind Forest','Coge las botas moradas para conseguir el doble salto y sube al saliente.','H|A:Saltar',()=>{
const S=[...lvl(),{x:200,y:100,w:120,h:10},{x:0,y:150,w:60,h:8}],b=body(100,160),boot={x:20,y:138};let has=0,j=0,msg='Ese saliente está demasiado alto…';
return dt=>{walk(b);if(b.g)j=0;if(hit('a')){if(b.g){b.vy=-300;j=1}else if(has&&j<2){b.vy=-300;j=2}}phys(b,S,dt);if(!has&&dist(b.x+6,b.y+8,boot.x,boot.y)<14){has=1;msg='¡Botas! Ahora tienes doble salto';shake(3)}if(b.y<100&&b.x>200)msg='¡Zona nueva desbloqueada!';
clr();drawS(S);if(!has){rect(boot.x-5,boot.y-5,10,10,PU);ring(boot.x,boot.y,10+Math.sin(T*5)*2,PU)}rect(290,82,12,18,Y);hero(b,has?PU:BL);txt(msg,8,10,10,Y)}});

def('exp','Coleccionables y secretos','Objetos opcionales repartidos por el nivel, algunos escondidos tras paredes falsas, con un porcentaje de completado.','Super Mario 64 (estrellas), Celeste (fresas), Banjo-Kazooie','Recoge las monedas. Una está tras una pared falsa.','H|A:Saltar',()=>{
const S=[...lvl(),{x:40,y:140,w:60,h:8},{x:140,y:110,w:60,h:8},{x:240,y:80,w:60,h:8}],fake={x:290,y:120,w:30,h:64},b=body(20,160),fx=PX();const C=[[70,125],[170,95],[270,65],[200,170],[306,170]].map(c=>({x:c[0],y:c[1],g:0}));
return dt=>{walk(b);if(hit('a')&&b.g)b.vy=-320;phys(b,S,dt);for(const c of C)if(!c.g&&dist(b.x+6,b.y+8,c.x,c.y)<12){c.g=1;fx.add(c.x,c.y,10,Y,70)}const n=C.filter(c=>c.g).length;
clr();drawS(S);for(const c of C)if(!c.g)circ(c.x,c.y+Math.sin(T*4+c.x)*2,4,Y);fx.run(dt);hero(b);G.globalAlpha=ov(b,fake)?.35:1;rect(fake.x,fake.y,fake.w,fake.h,'#3a3f5c');G.globalAlpha=1;txt('Monedas '+n+'/'+C.length+' ('+Math.round(n/C.length*100)+'%)',8,10,11,Y);if(n==C.length)txt('¡100%! Encontraste el secreto',8,26,10,GR)}});

def('exp','Puntos de control','Al caer vuelves al último punto de control alcanzado en lugar de al inicio. Regula la frustración.','Super Mario Bros., Celeste, Dark Souls (hogueras)','Cruza los huecos; las banderas guardan tu progreso.','H|A:Saltar',()=>{
const S=[{x:0,y:184,w:80,h:16},{x:120,y:184,w:60,h:16},{x:220,y:184,w:100,h:16},{x:-10,y:-200,w:10,h:400},{x:320,y:-200,w:10,h:400}],CP=[{x:30},{x:140},{x:250}],b=body(20,160);let cp=0,deaths=0,fl=0;
return dt=>{walk(b);if(hit('a')&&b.g)b.vy=-300;phys(b,S,dt);CP.forEach((c,i)=>{if(i>cp&&Math.abs(b.x-c.x)<12){cp=i;fl=.6}});if(b.y>210){deaths++;b.x=CP[cp].x;b.y=150;b.vy=0}fl-=dt;
clr();drawS(S);for(let x=80;x<320;x+=8)rect(x,196,4,4,RD);CP.forEach((c,i)=>{line(c.x,184,c.x,160,WH,2);rect(c.x,160,12,8,i<=cp?GR:GY)});hero(b);txt('Caídas '+deaths,8,10);if(fl>0)txt('¡Punto de control!',160,60,14,GR,'center')}});

def('exp','Viaje rápido','Los lugares descubiertos se convierten en destinos a los que viajar al instante desde el mapa.','The Elder Scrolls, Zelda: BotW, Hollow Knight (Ciervo)','Camina para descubrir lugares; toca uno ya descubierto para viajar.','D',()=>{
const N=[{n:'Aldea',x:40,y:160,d:1},{n:'Bosque',x:120,y:60},{n:'Torre',x:280,y:40},{n:'Lago',x:250,y:160},{n:'Cueva',x:170,y:120}];let x=40,y=160,fl=0;
return dt=>{const[dx,dy]=dir();x=cl(x+dx*60*dt,6,314);y=cl(y+dy*60*dt,6,194);for(const n of N)if(!n.d&&dist(x,y,n.x,n.y)<14){n.d=1;fl=.6}if(PT)for(const n of N)if(n.d&&dist(P.x,P.y,n.x,n.y)<18){x=n.x;y=n.y;fl=.4}fl-=dt;
clr('#2b3a2a');for(let i=1;i<N.length;i++)line(N[i-1].x,N[i-1].y,N[i].x,N[i].y,'#3e5a44',3);for(const n of N){circ(n.x,n.y,8,n.d?Y:GY);txt(n.d?n.n:'¿?',n.x,n.y+16,9,n.d?WH:GY,'center')}circ(x,y,5,BL);if(fl>0){G.fillStyle='rgba(255,255,255,'+fl+')';G.fillRect(0,0,320,200)}txt('Descubiertos: '+N.filter(n=>n.d).length+'/5',8,10,10,GY)}});

def('exp','Mundo envolvente','Salir por un borde de la pantalla te hace aparecer por el contrario. El espacio se convierte en un toro.','Asteroids, Pac-Man (túnel), Civilization (mapa)','▲ impulso, ◀▶ girar. Cruza los bordes.','D',()=>{
let x=160,y=100,vx=0,vy=0,a=0;return dt=>{if(key('l'))a-=4*dt;if(key('r'))a+=4*dt;if(key('u')){vx+=Math.cos(a)*150*dt;vy+=Math.sin(a)*150*dt}x=(x+vx*dt+320)%320;y=(y+vy*dt+200)%200;
clr('#070814');for(const ox of[-320,0,320])for(const oy of[-200,0,200]){G.save();G.translate(x+ox,y+oy);G.rotate(a);G.fillStyle=BL;G.beginPath();G.moveTo(10,0);G.lineTo(-7,-6);G.lineTo(-7,6);G.fill();G.restore()}srect(1,1,318,198,'#ffffff22');txt('Sal por un borde y aparecerás por el otro',8,10,10,GY)}});

def('exp','Visibilidad limitada','Solo ves un radio pequeño alrededor del personaje; el resto es oscuridad. Genera tensión y obliga a explorar con cuidado.','Darkwood, Teleglitch, Diablo (luz del jugador)','Explora con la cruceta y recoge los objetos.','D',()=>{
let x=40,y=100,got=0;const it=[],walls=[{x:100,y:0,w:10,h:120},{x:200,y:80,w:10,h:120}];for(let i=0;i<5;i++)it.push({x:R(60,300),y:R(20,180)});
return dt=>{const[dx,dy]=dir(),nx=cl(x+dx*80*dt,6,314),ny=cl(y+dy*80*dt,6,194);if(!walls.some(w=>inR(nx,ny,w.x-5,w.y-5,w.w+10,w.h+10))){x=nx;y=ny}for(let i=it.length;i--;)if(dist(x,y,it[i].x,it[i].y)<10){it.splice(i,1);got++}
clr('#2a2438');for(const w of walls)rect(w.x,w.y,w.w,w.h,'#4a4266');for(const o of it)circ(o.x,o.y,4,Y);circ(x,y,6,WH);const gr=G.createRadialGradient(x,y,15,x,y,60);gr.addColorStop(0,'rgba(0,0,0,0)');gr.addColorStop(1,'rgba(3,3,8,.97)');G.fillStyle=gr;G.fillRect(0,0,320,200);txt('Objetos '+got+'/5',8,10,10,Y)}});

def('exp','Ciclo de día y noche','El tiempo del mundo avanza y cambia la luz, los personajes activos, los peligros o las tiendas abiertas.','Minecraft, Zelda: Majora’s Mask, Dying Light','Mantén A (o el dedo) para acelerar el tiempo.','A:Acelerar',()=>{
let t=.3;return dt=>{const sp=key('a')||P.down?8:1;t=(t+dt*sp/30)%1;const day=Math.sin(t*Math.PI*2-Math.PI/2)*.5+.5;clr('rgb('+(lerp(10,120,day)|0)+','+(lerp(12,180,day)|0)+','+(lerp(30,230,day)|0)+')');const a=t*Math.PI*2+Math.PI/2;circ(160+Math.cos(a)*130,190+Math.sin(a)*150,12,Y);circ(160-Math.cos(a)*130,190-Math.sin(a)*150,9,'#e0e6ff');
rect(0,160,320,40,'rgb('+(lerp(10,50,day)|0)+','+(lerp(25,110,day)|0)+','+(lerp(15,50,day)|0)+')');rect(60,120,50,40,'#8d6e4c');rect(78,138,14,22,day<.4?Y:'#3a2a1a');txt(day>.4?'Tienda abierta':'Cerrado',85,112,9,WH,'center');if(day<.3)for(let i=0;i<3;i++){circ(200+i*30,150,2,RD);circ(206+i*30,150,2,RD)}
const h=Math.floor(t*24);txt('Hora '+String(h).padStart(2,'0')+':00',8,10,11,WH);txt(day<.3?'De noche salen criaturas':'',8,26,10,RD)}});

// ================= IA, SIGILO Y ENEMIGOS =================
def('ia','Cono de visión y estados de alerta','El guardia patrulla y solo te detecta dentro de su cono y sin obstáculos en medio. Pasa por sospecha, alerta y búsqueda antes de volver a su ruta.','Metal Gear Solid, Mark of the Ninja, Commandos','Evita el cono. B = moverse agachado (lento). Las cajas tapan la visión.','D|B:Agacharse',()=>{
const Bx=[{x:120,y:60,w:30,h:30},{x:200,y:120,w:40,h:24},{x:60,y:120,w:24,h:40}],WP=[[40,30],[280,30],[280,180],[40,180]];let gx=40,gy=30,ga=0,wi=1,st='Patrulla',sus=0,lx=0,ly=0,lt=0,x=160,y=170;
const los=(ax,ay,bx,by)=>{for(let i=0;i<=20;i++){const px=lerp(ax,bx,i/20),py=lerp(ay,by,i/20);if(Bx.some(b=>inR(px,py,b.x,b.y,b.w,b.h)))return false}return true},blocked=(px,py)=>Bx.some(b=>inR(px,py,b.x-5,b.y-5,b.w+10,b.h+10));
const mv=(tx,ty,s,dt)=>{const d=dist(gx,gy,tx,ty);if(d<2)return true;const nx=gx+(tx-gx)/d*s*dt,ny=gy+(ty-gy)/d*s*dt;if(!blocked(nx,gy))gx=nx;if(!blocked(gx,ny))gy=ny;ga=turnTo(ga,Math.atan2(ty-gy,tx-gx),5*dt);return false};
return dt=>{const[dx,dy]=dir(),sp=key('b')?35:80,nx=cl(x+dx*sp*dt,6,314),ny=cl(y+dy*sp*dt,6,194);if(!blocked(nx,y))x=nx;if(!blocked(x,ny))y=ny;
const d=dist(gx,gy,x,y),ang=Math.atan2(y-gy,x-gx),rng=key('b')?65:95,seen=d<rng&&angD(ang,ga)<.55&&los(gx,gy,x,y);if(seen){sus=Math.min(1,sus+dt*(st=='Alerta'?3:1.3));lx=x;ly=y}else sus=Math.max(0,sus-dt*.4);
if(st=='Patrulla'){if(mv(WP[wi][0],WP[wi][1],45,dt))wi=(wi+1)%4;if(sus>.35)st='Sospecha'}else if(st=='Sospecha'){ga=turnTo(ga,Math.atan2(ly-gy,lx-gx),2*dt);if(sus>=1)st='Alerta';else if(sus<=0)st='Patrulla'}else if(st=='Alerta'){if(mv(lx,ly,85,dt)&&!seen){st='Búsqueda';lt=3}}else{ga+=dt*2;lt-=dt;if(seen&&sus>.5)st='Alerta';else if(lt<=0)st='Patrulla'}
if(d<10){x=160;y=170;st='Patrulla';sus=0;shake(4)}
const C={Patrulla:'#ffd44726',Sospecha:'#ffd44755',Alerta:'#ff5a5f55','Búsqueda':'#ff9f4344'};clr();G.fillStyle=C[st];G.beginPath();G.moveTo(gx,gy);G.arc(gx,gy,rng,ga-.55,ga+.55);G.fill();for(const b of Bx)rect(b.x,b.y,b.w,b.h,'#6b7290');circ(gx,gy,8,RD);txt(st=='Sospecha'?'?':st=='Alerta'?'!':'',gx,gy-16,14,Y,'center');circ(x,y,6,BL);
txt('Guardia: '+st,8,10,10,WH);bar(110,6,60,6,sus,sus>.6?RD:Y)}});

def('ia','Perseguir, huir, deambular e interceptar','Comportamientos básicos de dirección: ir hacia el objetivo, alejarse, vagar al azar o anticipar dónde estará.','Pac-Man (fantasmas), Hitman, cualquier IA de enemigos','Muévete (cruceta o arrastrando). B cambia el comportamiento.','D|B:Modo',()=>{
const MD=['Perseguir','Huir','Deambular','Interceptar'],A=[];let m=0,x=160,y=100,pvx=0,pvy=0;for(let i=0;i<6;i++)A.push({x:R(0,320),y:R(0,200),vx:0,vy:0,w:R(0,6)});
return dt=>{if(hit('b'))m=(m+1)%4;const[dx,dy]=dir(),ox=x,oy=y;x=cl(x+dx*90*dt,6,314);y=cl(y+dy*90*dt,6,194);if(P.down){x=lerp(x,P.x,.2);y=lerp(y,P.y,.2)}pvx=dt?(x-ox)/dt:0;pvy=dt?(y-oy)/dt:0;
for(const a of A){let tx=x,ty=y;if(m==3){const k=dist(a.x,a.y,x,y)/70;tx=x+pvx*k;ty=y+pvy*k}const ddx=tx-a.x,ddy=ty-a.y,d=Math.hypot(ddx,ddy)||1;let ax=ddx/d,ay=ddy/d;if(m==1){ax=-ax;ay=-ay}if(m==2){a.w+=R(-3,3)*dt;ax=Math.cos(a.w);ay=Math.sin(a.w)}a.vx+=(ax*70-a.vx)*2*dt;a.vy+=(ay*70-a.vy)*2*dt;a.x=(a.x+a.vx*dt+320)%320;a.y=(a.y+a.vy*dt+200)%200}
clr();for(const a of A){circ(a.x,a.y,6,RD);line(a.x,a.y,a.x+a.vx*.15,a.y+a.vy*.15,WH,1)}circ(x,y,7,BL);txt('Comportamiento: '+MD[m],8,10,11,Y)}});

def('ia','Búsqueda de caminos','El agente calcula la ruta más corta alrededor de los obstáculos y la recalcula cuando el entorno cambia.','StarCraft, Civilization, Los Sims','Toca casillas para poner o quitar muros. El agente busca la estrella.','',()=>{
const w=16,h=10,S=20;const wall=new Set();let ag={x:0,y:0,px:0,py:0},gl={x:15,y:9},path=[],t=0;for(let i=0;i<30;i++)wall.add(RI(2,13)+','+RI(0,9));
const bfs=()=>{const k0=ag.x+','+ag.y,prev={[k0]:null},q=[[ag.x,ag.y]];while(q.length){const[x,y]=q.shift();if(x==gl.x&&y==gl.y)break;for(const[a,b]of[[1,0],[-1,0],[0,1],[0,-1]]){const X=x+a,Yy=y+b,k=X+','+Yy;if(X<0||Yy<0||X>=w||Yy>=h||wall.has(k)||k in prev)continue;prev[k]=[x,y];q.push([X,Yy])}}const p=[];let c=gl.x+','+gl.y;if(!(c in prev))return[];while(c&&c!=k0){p.unshift(c.split(',').map(Number));c=prev[c]&&prev[c].join(',')}return p};
return dt=>{if(PT){const x=Math.floor(P.x/S),y=Math.floor(P.y/S),k=x+','+y;if(!(x==gl.x&&y==gl.y)&&!(x==ag.x&&y==ag.y)){if(wall.has(k))wall.delete(k);else wall.add(k)}}path=bfs();t-=dt;if(t<=0&&path.length){t=.15;[ag.x,ag.y]=path[0]}if(ag.x==gl.x&&ag.y==gl.y){let n=0;do{gl={x:RI(0,15),y:RI(0,9)}}while(wall.has(gl.x+','+gl.y)&&n++<99)}
ag.px=lerp(ag.px,ag.x*S,.3);ag.py=lerp(ag.py,ag.y*S,.3);clr();wall.forEach(k=>{const[a,b]=k.split(',');rect(a*S,b*S,S,S,'#3a3f5c')});G.strokeStyle='#ffd44788';G.lineWidth=2;G.beginPath();G.moveTo(ag.x*S+10,ag.y*S+10);for(const p of path)G.lineTo(p[0]*S+10,p[1]*S+10);G.stroke();circ(gl.x*S+10,gl.y*S+10,6,Y);circ(ag.px+10,ag.py+10,7,GR);if(!path.length&&!(ag.x==gl.x&&ag.y==gl.y))txt('¡Sin camino!',160,100,14,RD,'center')}});

def('ia','Enjambres (boids)','Tres reglas locales (acercarse al grupo, alinearse y no chocar) producen bandadas y bancos de peces creíbles.','Pikmin, Flower, Half-Life (bancos de peces)','Toca para asustar al banco.','',()=>{
const B=[];for(let i=0;i<40;i++)B.push({x:R(0,320),y:R(0,200),vx:R(-40,40),vy:R(-40,40)});
return dt=>{for(const b of B){let cx=0,cy=0,ax=0,ay=0,sx=0,sy=0,n=0;for(const o of B){if(o===b)continue;const d=dist(b.x,b.y,o.x,o.y);if(d<40){cx+=o.x;cy+=o.y;ax+=o.vx;ay+=o.vy;n++;if(d<12){sx+=b.x-o.x;sy+=b.y-o.y}}}if(n){b.vx+=((cx/n-b.x)*.6+(ax/n-b.vx)*1.2+sx*4)*dt;b.vy+=((cy/n-b.y)*.6+(ay/n-b.vy)*1.2+sy*4)*dt}if(P.down){const d=dist(b.x,b.y,P.x,P.y)||1;if(d<60){b.vx+=(b.x-P.x)/d*300*dt;b.vy+=(b.y-P.y)/d*300*dt}}const s=Math.hypot(b.vx,b.vy)||1,ns=cl(s,30,80);b.vx*=ns/s;b.vy*=ns/s;b.x=(b.x+b.vx*dt+320)%320;b.y=(b.y+b.vy*dt+200)%200}
clr('#0e1a2b');for(const b of B){G.save();G.translate(b.x,b.y);G.rotate(Math.atan2(b.vy,b.vx));G.fillStyle=BL;G.beginPath();G.moveTo(6,0);G.lineTo(-4,-3);G.lineTo(-4,3);G.fill();G.restore()}txt('Cohesión + alineación + separación',8,10,10,GY)}});

def('ia','Ruido y distracciones','Los enemigos reaccionan a lo que oyen: puedes lanzar objetos para atraerlos y correr hace ruido.','Hitman, Metal Gear Solid, Thief','Toca para lanzar una piedra. Correr hace ruido; B = andar en silencio. Llega a la salida verde.','D|B:Silencio',()=>{
let gx=200,gy=100,ga=Math.PI,tx=null,ty=0,wait=0,x=20,y=180,ns=[],msg='';const ex={x:300,y:20};
return dt=>{const[dx,dy]=dir(),run=!key('b');x=cl(x+dx*(run?80:35)*dt,6,314);y=cl(y+dy*(run?80:35)*dt,6,194);if((dx||dy)&&run&&Math.random()<dt*3)ns.push({x,y,r:0,m:50});if(PT)ns.push({x:P.x,y:P.y,r:0,m:90});
for(const n of ns){n.r+=120*dt;if(!n.h&&dist(n.x,n.y,gx,gy)<n.r&&n.r<n.m){n.h=1;tx=n.x;ty=n.y;wait=0;msg='Guardia: «¿Qué ha sido eso?»'}}ns=ns.filter(n=>n.r<n.m);
if(tx!=null){const d=dist(gx,gy,tx,ty);ga=Math.atan2(ty-gy,tx-gx);if(d>3){gx+=(tx-gx)/d*45*dt;gy+=(ty-gy)/d*45*dt}else{wait+=dt;ga+=dt*2;if(wait>2){tx=null;msg=''}}}else{const d=dist(gx,gy,200,100);if(d>3){ga=Math.atan2(100-gy,200-gx);gx+=(200-gx)/d*40*dt;gy+=(100-gy)/d*40*dt}else ga+=Math.sin(T)*dt}
if(dist(x,y,gx,gy)<80&&angD(Math.atan2(y-gy,x-gx),ga)<.5){msg='¡Te ha visto!';x=20;y=180;shake(3)}if(dist(x,y,ex.x,ex.y)<12){msg='¡Escapaste!';x=20;y=180}
clr();G.fillStyle='#ffd44722';G.beginPath();G.moveTo(gx,gy);G.arc(gx,gy,80,ga-.5,ga+.5);G.fill();for(const n of ns)ring(n.x,n.y,n.r,'rgba(255,255,255,'+(1-n.r/n.m)+')',1.5);rect(ex.x-8,ex.y-8,16,16,GR);circ(gx,gy,8,RD);circ(x,y,6,BL);txt(msg,8,190,10,Y)}});

def('ia','Ataque por la espalda','Acercarse sin ser visto permite eliminar al enemigo de un golpe, pero solo desde detrás.','Assassin’s Creed, Dishonored, The Last of Us','Rodea al guardia y pulsa A estando en la zona verde.','D|A:Atacar',()=>{
let gx=200,gy=100,ga=0,x=40,y=100,ko=0,msg='';return dt=>{if(ko>0){ko-=dt;if(ko<=0){gx=R(120,280);gy=R(40,160);msg=''}}else ga+=Math.sin(T*.7)*1.5*dt;const[dx,dy]=dir();x=cl(x+dx*70*dt,6,314);y=cl(y+dy*70*dt,6,194);
const a=Math.atan2(y-gy,x-gx),df=angD(a,ga),d=dist(x,y,gx,gy),behind=df>2.2;if(ko<=0&&d<70&&df<.6){msg='¡Detectado!';x=40;y=100;shake(2)}if(hit('a')&&d<22&&ko<=0){if(behind){ko=2;msg='¡Eliminación silenciosa!';shake(2)}else msg='Tiene que ser por la espalda'}
clr();if(ko<=0){G.fillStyle='#ffd44722';G.beginPath();G.moveTo(gx,gy);G.arc(gx,gy,70,ga-.6,ga+.6);G.fill();G.fillStyle='#7ae58233';G.beginPath();G.moveTo(gx,gy);G.arc(gx,gy,22,ga+Math.PI-.95,ga+Math.PI+.95);G.fill()}circ(gx,gy,8,ko>0?GY:RD);if(ko<=0)line(gx,gy,gx+Math.cos(ga)*12,gy+Math.sin(ga)*12,WH,2);circ(x,y,6,BL);if(d<22&&behind&&ko<=0)txt('A',x,y-14,11,GR,'center');txt(msg,8,190,10,Y)}});

def('ia','Escondites','Zonas donde el jugador se vuelve invisible para los enemigos, que pierden el rastro.','Alien: Isolation, Outlast, Assassin’s Creed (pajares)','Métete en un arbusto para que el enemigo te pierda.','D',()=>{
const Bu=[{x:100,y:60},{x:180,y:140},{x:250,y:70}];let x=30,y=100,gx=300,gy=100,msg='';return dt=>{const[dx,dy]=dir();x=cl(x+dx*80*dt,6,314);y=cl(y+dy*80*dt,6,194);const hid=Bu.some(b=>dist(x,y,b.x,b.y)<16),d=dist(gx,gy,x,y);
if(!hid&&d<110){gx+=(x-gx)/d*55*dt;gy+=(y-gy)/d*55*dt;msg='¡Te persigue!'}else{gx+=Math.cos(T*.8)*40*dt;gy+=Math.sin(T*1.1)*40*dt;msg=hid?'Escondido…':''}gx=cl(gx,10,310);gy=cl(gy,10,190);if(d<10){x=30;y=100;shake(3)}
clr('#1a2a1f');circ(gx,gy,9,RD);G.globalAlpha=hid?.4:1;circ(x,y,6,BL);G.globalAlpha=1;for(const b of Bu){circ(b.x,b.y,18,'#2f6b3a');circ(b.x-8,b.y-6,10,'#3a8048')}txt(msg||'Escóndete en los arbustos',8,10,10,msg?Y:GY)}});

// ================= TIEMPO =================
def('tie','Rebobinar el tiempo','Puedes deshacer los últimos segundos y volver a intentarlo, incluso después de morir.','Braid, Prince of Persia: Las Arenas del Tiempo, Forza (rebobinado)','Mantén B para rebobinar. Esquiva la sierra.','H|A:Saltar|B:Rebobinar',()=>{
const S=[...lvl(),{x:100,y:130,w:60,h:8},{x:200,y:90,w:60,h:8}],b=body(20,160);let hist=[],tt=0,dead=false;
return dt=>{const rw=key('b')&&hist.length>0;if(rw){[b.x,b.y,b.vx,b.vy,tt]=hist.pop();dead=false}else if(!dead){tt+=dt;walk(b);if(hit('a')&&b.g)b.vy=-310;phys(b,S,dt);hist.push([b.x,b.y,b.vx,b.vy,tt]);if(hist.length>300)hist.shift()}
const sx=160+Math.sin(tt*2)*120;if(!rw&&!dead&&dist(b.x+6,b.y+8,sx,170)<16){dead=true;shake(4)}
clr(rw?'#1a1430':BG);drawS(S);circ(sx,170,12,RD);for(let i=0;i<8;i++){const a=tt*8+i*.785;line(sx,170,sx+Math.cos(a)*14,170+Math.sin(a)*14,RD,2)}hero(b,rw?PU:dead?GY:BL);bar(8,8,100,5,hist.length/300,PU);txt(rw?'◀◀ Rebobinando':dead?'¡Muerto! Mantén B para rebobinar':'Memoria de tiempo',116,10,10,rw||dead?PU:GY)}});

def('tie','Cámara lenta','El mundo se ralentiza mientras tú conservas tu velocidad, a cambio de un medidor que se agota.','Max Payne, F.E.A.R., Red Dead Redemption (Dead Eye)','Esquiva las balas; mantén B para ralentizar el tiempo.','D|B:Lento',()=>{
let sl=0,meter=1,bs=[],t=0,x=60,y=100,hits=0;return dt=>{const want=key('b')&&meter>0;sl=lerp(sl,want?1:0,.15);const wdt=dt*(1-sl*.8);if(want)meter=Math.max(0,meter-dt*.4);else meter=Math.min(1,meter+dt*.15);
const[dx,dy]=dir();x=cl(x+dx*100*dt,6,314);y=cl(y+dy*100*dt,6,194);t-=wdt;if(t<=0){t=.15;bs.push({x:330,y:R(0,200),vx:-R(150,260),vy:R(-30,30)})}for(const b of bs){b.x+=b.vx*wdt;b.y+=b.vy*wdt;if(dist(b.x,b.y,x,y)<7){b.d=1;hits++;shake(2)}}bs=bs.filter(b=>!b.d&&b.x>-10);
clr(sl>.3?'#16203a':BG);for(const b of bs)line(b.x,b.y,b.x-b.vx*.05,b.y-b.vy*.05,Y,2);circ(x,y,6,BL);bar(8,8,80,5,meter,BL);txt('Impactos '+hits,96,10,10,GY)}});

def('tie','Detener el tiempo','Congelas el mundo unos segundos mientras tú puedes moverte con libertad.','Dishonored (Doblar el tiempo), Quantum Break, Bayonetta (Witch Time)','B detiene el tiempo durante 2,5 s. Apártate de los cuchillos.','D|B:Parar',()=>{
let st=0,cd=0,ks=[],t=0,x=160,y=100,hits=0;return dt=>{if(hit('b')&&cd<=0){st=2.5;cd=5}st-=dt;cd-=dt;const on=st>0;const[dx,dy]=dir();x=cl(x+dx*100*dt,6,314);y=cl(y+dy*100*dt,6,194);
if(!on){t-=dt;if(t<=0){t=.5;const a=R(0,6.28);ks.push({x:x+Math.cos(a)*150,y:y+Math.sin(a)*150,a:a+Math.PI})}for(const k of ks){k.x+=Math.cos(k.a)*130*dt;k.y+=Math.sin(k.a)*130*dt;if(dist(k.x,k.y,x,y)<7){k.d=1;hits++;shake(3)}}}ks=ks.filter(k=>!k.d&&k.x>-200&&k.x<520&&k.y>-200&&k.y<400);
clr(on?'#262626':BG);for(const k of ks){G.save();G.translate(k.x,k.y);G.rotate(k.a);rect(-6,-1.5,12,3,on?'#aaa':WH);G.restore()}circ(x,y,6,on?Y:BL);if(on)txt('Tiempo detenido '+st.toFixed(1)+' s',160,20,11,Y,'center');bar(8,188,80,5,1-Math.max(0,cd)/5,Y);txt('Impactos '+hits,96,190,10,GY)}});

def('tie','El tiempo avanza si te mueves','El mundo casi se detiene cuando estás quieto y corre al moverte. Cada paso es una decisión.','SUPERHOT, Crypt of the NecroDancer (en parte), Into the Breach (en espíritu)','Muévete con la cruceta y fíjate en las balas.','D',()=>{
let x=160,y=150,bs=[],t=0,hits=0;return dt=>{const[dx,dy]=dir(),mv=(dx||dy)?1:.05,wdt=dt*mv;x=cl(x+dx*90*dt,6,314);y=cl(y+dy*90*dt,6,194);t-=wdt;if(t<=0){t=.6;const sx=R(0,320),a=Math.atan2(y+5,x-sx);bs.push({x:sx,y:-5,vx:Math.cos(a)*120,vy:Math.sin(a)*120})}for(const b of bs){b.x+=b.vx*wdt;b.y+=b.vy*wdt;if(dist(b.x,b.y,x,y)<6){b.d=1;hits++;shake(3)}}bs=bs.filter(b=>!b.d&&b.y<210&&b.x>-10&&b.x<330);
clr(mv<1?'#e4e4ea':'#ffffff');for(const b of bs)line(b.x,b.y,b.x-b.vx*.08,b.y-b.vy*.08,RD,2);circ(x,y,6,'#222');txt(mv<1?'Tiempo casi detenido':'El tiempo avanza',160,14,11,mv<1?'#777':RD,'center');txt('Impactos '+hits,8,190,10,'#555')}});

def('tie','Bucle temporal con ecos','Grabas tus acciones y en el siguiente intento una copia tuya las repite, lo que permite cooperar contigo mismo.','The Talos Principle, Braid (mundo 5), Super Time Force','Pisa la placa, pulsa B: tu eco repetirá lo que hiciste mientras tú cruzas la puerta.','H|A:Saltar|B:Nuevo bucle',()=>{
const S0=lvl(),plate={x:60,y:180,w:30,h:4},door={x:200,y:100,w:12,h:84};let b=body(20,160),rec=[],clones=[],win=false;
return dt=>{walk(b);if(hit('a')&&b.g)b.vy=-300;for(const c of clones){c.i=Math.min(c.i+1,c.r.length-1);c.pos={x:c.r[c.i][0],y:c.r[c.i][1],w:12,h:17}}const open=[b,...clones.map(c=>c.pos)].some(o=>ov({x:o.x,y:o.y,w:12,h:17},plate));phys(b,open?S0:[...S0,door],dt);if(rec.length<3000)rec.push([b.x,b.y]);
if(hit('b')&&rec.length){clones.push({r:rec,i:0,pos:{x:rec[0][0],y:rec[0][1],w:12,h:17}});if(clones.length>2)clones.shift();rec=[];b=body(20,160);clones.forEach(c=>c.i=0)}if(b.x>280)win=true;
clr();drawS(S0);rect(plate.x,plate.y,plate.w,plate.h,open?GR:Y);if(!open)rect(door.x,door.y,door.w,door.h,RD);G.globalAlpha=.5;for(const c of clones)rect(c.pos.x,c.pos.y,12,16,PU);G.globalAlpha=1;hero(b);rect(296,164,10,20,Y);txt(win?'¡Lo lograste con ayuda de tu eco!':'Ecos activos: '+clones.length,8,10,10,win?GR:GY)}});

def('tie','Contrarreloj con fantasma','Tu mejor vuelta se graba y se reproduce como un fantasma translúcido contra el que compites.','Mario Kart (contrarreloj), Trackmania, Forza','Da vueltas al circuito con la cruceta.','D',()=>{
let x=160,y=170,lap=[],best=null,t=0,half=false,last='';return dt=>{const[dx,dy]=dir(),nx=x+dx*120*dt,ny=y+dy*120*dt,inside=((nx-160)/100)**2+((ny-100)/45)**2<1,out=((nx-160)/150)**2+((ny-100)/95)**2>1,px=x;if(!inside&&!out){x=nx;y=ny}t+=dt;lap.push([x,y,t]);if(x<100)half=true;
if(half&&px<160&&x>=160&&y>100){if(!best||t<best.t){best={t,r:lap};last='¡Nuevo récord! '+t.toFixed(2)+' s'}else last='Vuelta '+t.toFixed(2)+' s';lap=[];t=0;half=false}if(lap.length>4000)lap.shift();
clr('#2d4a2d');G.fillStyle='#4a4a55';G.beginPath();G.ellipse(160,100,150,95,0,0,7);G.fill();G.fillStyle='#2d4a2d';G.beginPath();G.ellipse(160,100,100,45,0,0,7);G.fill();line(160,145,160,195,WH,2);
if(best){const g=best.r.find(p=>p[2]>=t)||best.r[best.r.length-1];G.globalAlpha=.4;circ(g[0],g[1],6,WH);G.globalAlpha=1}circ(x,y,6,OR);txt(t.toFixed(2)+' s',160,100,14,WH,'center');txt(best?'Récord '+best.t.toFixed(2)+' s':'Sin récord',160,116,10,GY,'center');txt(last,8,10,10,Y)}});

def('tie','Cuenta atrás con bonificaciones','Un reloj que se agota y que solo se recarga cumpliendo objetivos. Cada acierto compra unos segundos más.','OutRun, Crazy Taxi, Pac-Man Championship Edition','Recoge los relojes antes de que se acabe el tiempo.','D',()=>{
let x=160,y=100,tm=10,sc=0,o={x:80,y:60},over=0;return dt=>{const bonus=Math.max(.8,3-sc*.1);if(over){if(PT||hit('a')){tm=10;sc=0;over=0}}else{tm-=dt;const[dx,dy]=dir();x=cl(x+dx*110*dt,6,314);y=cl(y+dy*110*dt,6,194);if(P.down){x=lerp(x,P.x,.1);y=lerp(y,P.y,.1)}if(dist(x,y,o.x,o.y)<12){sc++;tm+=bonus;o={x:R(20,300),y:R(30,180)}}if(tm<=0)over=1}
clr(tm<3&&!over&&T%.5<.25?'#2a1218':BG);circ(o.x,o.y,8,Y);txt('+'+bonus.toFixed(1)+' s',o.x,o.y-14,8,Y,'center');circ(x,y,7,BL);txt(Math.max(0,tm).toFixed(1)+' s',160,20,18,tm<3?RD:WH,'center');txt('Relojes: '+sc,8,190,10,GY);if(over)txt('¡Tiempo! Toca para repetir',160,100,14,Y,'center')}});

// ================= VEHÍCULOS =================
def('veh','Conducción con derrape','El coche tiene inercia lateral: con poco agarre la trasera se desliza y hay que contravolantear.','Mario Kart, Ridge Racer, Micro Machines','▲ acelerar, ▼ frenar, ◀▶ girar, B freno de mano.','D|B:Freno mano',()=>{
let x=60,y=150,a=-Math.PI/2,vx=0,vy=0,sk=[];return dt=>{const th=key('u')?1:key('d')?-.5:0,st=(key('r')?1:0)-(key('l')?1:0);let fx=Math.cos(a),fy=Math.sin(a);const f0=vx*fx+vy*fy;a+=st*2.8*dt*cl(f0/100,-1,1);fx=Math.cos(a);fy=Math.sin(a);
let nf=(vx*fx+vy*fy)+th*200*dt;nf*=Math.pow(.6,dt);const lat=-vx*fy+vy*fx,grip=key('b')?.5:6,nl=lat*Math.exp(-grip*dt);vx=fx*nf-fy*nl;vy=fy*nf+fx*nl;x=(x+vx*dt+320)%320;y=(y+vy*dt+200)%200;if(Math.abs(nl)>40)sk.push([x,y,1]);
clr('#3b3b44');for(const s of sk){s[2]-=dt*.3;circ(s[0],s[1],1.5,'rgba(0,0,0,'+Math.max(0,s[2])*.6+')')}sk=sk.filter(s=>s[2]>0);G.save();G.translate(x,y);G.rotate(a);rect(-9,-5,18,10,RD);rect(2,-4,5,8,'#ffffff55');G.restore();txt('Las marcas negras indican derrape',8,10,10,GY)}});

def('veh','Aterrizaje con propulsor','Controlas el empuje y la orientación de una nave con combustible limitado para posarte suave sobre la plataforma.','Lunar Lander, Kerbal Space Program, Thrust','A propulsor, ◀▶ girar. Toca para reintentar.','H|A:Propulsor',()=>{
let x,y,vx,vy,a,fuel,st;const pad={x:R(40,240),w:40},terr=[];for(let i=0;i<=32;i++){const X=i*10;terr.push(X>=pad.x-5&&X<=pad.x+pad.w+5?175:170+Math.sin(i*1.3)*12+R(-6,6))}const ground=X=>{const i=cl(Math.floor(X/10),0,31),t=(X-i*10)/10;return lerp(terr[i],terr[i+1],t)};
const reset=()=>{x=160;y=20;vx=R(-20,20);vy=0;a=0;fuel=100;st=''};reset();
return dt=>{const th=!st&&key('a')&&fuel>0;if(!st){if(key('l'))a-=2*dt;if(key('r'))a+=2*dt;if(th){vx+=Math.sin(a)*80*dt;vy-=Math.cos(a)*80*dt;fuel-=15*dt}vy+=30*dt;x=cl(x+vx*dt,5,315);y+=vy*dt;const gy=ground(x);if(y+6>=gy){const onPad=x>pad.x&&x<pad.x+pad.w;st=onPad&&vy<30&&Math.abs(vx)<15&&Math.abs(a)<.25?'¡Aterrizaje perfecto!':'¡Estrellado!';if(st[1]=='E')shake(6);y=gy-6}}else if(PT||hit('b'))reset();
clr('#070814');G.fillStyle='#4a4a55';G.beginPath();G.moveTo(0,200);terr.forEach((h,i)=>G.lineTo(i*10,h));G.lineTo(320,200);G.fill();rect(pad.x,174,pad.w,3,GR);G.save();G.translate(x,y);G.rotate(a);G.fillStyle=WH;G.beginPath();G.moveTo(0,-8);G.lineTo(7,6);G.lineTo(-7,6);G.fill();if(th){G.fillStyle=OR;G.beginPath();G.moveTo(-4,6);G.lineTo(4,6);G.lineTo(0,14+Math.random()*6);G.fill()}G.restore();
bar(8,8,80,5,fuel/100,Y);txt('Vel. vertical '+vy.toFixed(0),96,10,10,vy>30?RD:GR);if(st)txt(st+' · toca para reintentar',160,90,12,st[1]=='E'?RD:GR,'center')}});

def('veh','Tanque con torreta independiente','El chasis y el cañón se controlan por separado: te mueves en una dirección mientras disparas en otra.','Battlefield, World of Tanks, Wii Play (Tanks!)','Cruceta = orugas; toca para apuntar y disparar.','D',()=>{
let x=160,y=100,a=0,ta=0,bs=[];const tg=[];for(let i=0;i<4;i++)tg.push({x:R(20,300),y:R(20,180)});
return dt=>{if(key('l'))a-=2.5*dt;if(key('r'))a+=2.5*dt;const v=key('u')?70:key('d')?-40:0;x=cl(x+Math.cos(a)*v*dt,10,310);y=cl(y+Math.sin(a)*v*dt,10,190);if(P.down)ta=Math.atan2(P.y-y,P.x-x);if(PT)bs.push({x:x+Math.cos(ta)*16,y:y+Math.sin(ta)*16,a:ta});
for(const b of bs){b.x+=Math.cos(b.a)*260*dt;b.y+=Math.sin(b.a)*260*dt;for(const t of tg)if(dist(b.x,b.y,t.x,t.y)<9){b.d=1;t.x=R(20,300);t.y=R(20,180)}}bs=bs.filter(b=>!b.d&&b.x>-5&&b.x<325&&b.y>-5&&b.y<205);
clr('#3a3a2a');for(const t of tg)ring(t.x,t.y,8,RD,3);for(const b of bs)circ(b.x,b.y,2,Y);G.save();G.translate(x,y);G.rotate(a);rect(-12,-9,24,18,'#6b7a3a');rect(-12,-11,24,3,'#222');rect(-12,8,24,3,'#222');G.restore();G.save();G.translate(x,y);G.rotate(ta);rect(0,-2,16,4,'#9aa860');G.restore();circ(x,y,6,'#9aa860')}});

def('veh','Control en el aire (aterrizajes)','En el aire puedes rotar el vehículo; hay que caer alineado con la pendiente o te estrellas.','Trials, Excitebike, Hill Climb Racing','▲ acelera; en el aire ◀▶ inclinan la moto.','D',()=>{
let wx=0,h=0,v=0,a=0,air=0,sp=100,crash=0,best=0,msg='';const gh=x=>{const m=((x%300)+300)%300;return m>150&&m<230?(m-150)*.6:0},sl=x=>{const m=((x%300)+300)%300;return m>150&&m<230?Math.atan(.6):0};
return dt=>{if(crash>0){crash-=dt;if(crash<=0){wx=0;h=0;v=0;a=0;air=0;sp=100;msg=''}}else{sp=cl(sp+(key('u')||P.down?80:-30)*dt,70,220);const pm=((wx%300)+300)%300;wx+=sp*dt;const m=((wx%300)+300)%300;
if(!air){h=gh(wx);a=sl(wx);if(pm<230&&m>=230){air=1;v=sp*.9}}else{if(key('l'))a+=4*dt;if(key('r'))a-=4*dt;v-=450*dt;h+=v*dt;if(h<=gh(wx)&&v<0){const d=angD(a,sl(wx));if(d<.45){air=0;msg=d<.15?'¡Aterrizaje perfecto!':'Buen aterrizaje'}else{crash=1.2;msg='¡Caída!';shake(6)}h=gh(wx)}}best=Math.max(best,wx/10)}
clr('#7ec8e3');G.fillStyle='#8d6e4c';G.beginPath();G.moveTo(0,200);for(let sx=0;sx<=320;sx+=4)G.lineTo(sx,160-gh(wx-80+sx));G.lineTo(320,200);G.fill();G.save();G.translate(80,160-h-8);G.rotate(-a);rect(-14,-6,28,8,crash>0?GY:RD);circ(-10,4,5,'#222');circ(10,4,5,'#222');rect(-2,-14,6,8,BL);G.restore();txt(Math.floor(wx/10)+' m · récord '+Math.floor(best),8,10,11,'#12141f');txt(msg,8,26,11,msg=='¡Caída!'?RD:'#1b4332')}});

// ================= CONSTRUCCIÓN Y SANDBOX =================
def('con','Poner y quitar bloques','El mundo está hecho de bloques que el jugador puede romper y colocar libremente, construyendo y modificando el terreno.','Minecraft, Terraria, Dragon Quest Builders','Toca para poner o quitar bloques. ◀▶ y A para moverte. B cambia de material.','H|A:Saltar|B:Material',()=>{
const S=16,w=20,h=12,C=[0,'#4caf50','#8d6e4c','#6b7290'],NM=['','hierba','tierra','piedra'];const g=new Uint8Array(w*h);let mode=1;for(let x=0;x<w;x++){const top=8+Math.round(Math.sin(x*.6)*1.5);for(let y=top;y<h;y++)g[y*w+x]=y==top?1:y<top+2?2:3}const b=body(40,20,10,14);
const solids=()=>{const s=[{x:-10,y:-200,w:10,h:400},{x:320,y:-200,w:10,h:400}];for(let i=0;i<w*h;i++)if(g[i])s.push({x:(i%w)*S,y:Math.floor(i/w)*S,w:S,h:S});return s};
return dt=>{if(hit('b'))mode=mode%3+1;if(PT){const x=Math.floor(P.x/S),y=Math.floor(P.y/S);if(x>=0&&x<w&&y>=0&&y<h){const i=y*w+x;if(g[i])g[i]=0;else if(!ov(b,{x:x*S,y:y*S,w:S,h:S}))g[i]=mode}}walk(b,90);if(hit('a')&&b.g)b.vy=-280;phys(b,solids(),dt);if(b.y>200){b.y=0;b.x=40;b.vy=0}
clr('#8ec5ff');for(let i=0;i<w*h;i++)if(g[i]){rect((i%w)*S,Math.floor(i/w)*S,S,S,C[g[i]]);srect((i%w)*S+.5,Math.floor(i/w)*S+.5,S-1,S-1,'#0002')}hero(b);txt('Material: '+NM[mode],8,10,10,BG)}});

def('con','Simulación de materiales','Cada píxel es una partícula con reglas sencillas: la arena se amontona, el agua fluye y la piedra queda fija.','Noita, The Powder Toy, Sandspiel','Arrastra para echar material. B cambia de material.','B:Material',()=>{
const w=80,h=50,S=4,g=new Uint8Array(w*h),C=[0,'#e9c46a',BL,'#6b7290'],NM=['','arena','agua','piedra'];let mat=1;
return dt=>{if(hit('b'))mat=mat%3+1;if(P.down){const cx=Math.floor(P.x/S),cy=Math.floor(P.y/S);for(let a=-2;a<=2;a++)for(let b=-2;b<=2;b++){const x=cx+a,y=cy+b;if(x>=0&&x<w&&y>=0&&y<h&&Math.random()<.5)g[y*w+x]=mat}}
for(let y=h-2;y>=0;y--){const lr=Math.random()<.5;for(let k=0;k<w;k++){const x=lr?k:w-1-k,i=y*w+x,v=g[i];if(v!=1&&v!=2)continue;const dn=i+w;if(!g[dn]||(v==1&&g[dn]==2)){g[i]=g[dn];g[dn]=v;continue}const s=Math.random()<.5?1:-1;if(x+s>=0&&x+s<w&&!g[dn+s]){g[i]=0;g[dn+s]=v;continue}if(x-s>=0&&x-s<w&&!g[dn-s]){g[i]=0;g[dn-s]=v;continue}if(v==2){if(x+s>=0&&x+s<w&&!g[i+s]){g[i]=0;g[i+s]=v}else if(x-s>=0&&x-s<w&&!g[i-s]){g[i]=0;g[i-s]=v}}}}
clr();for(let i=0;i<w*h;i++)if(g[i])rect((i%w)*S,Math.floor(i/w)*S,S,S,C[g[i]]);txt('Material: '+NM[mat],8,10,10,GY)}});

def('con','Circuitos lógicos','Interruptores y puertas lógicas (Y, O, O exclusiva, NO) que el jugador combina para encender mecanismos.','Minecraft (redstone), Factorio (combinadores), Turing Complete','Toca los interruptores de la izquierda.','',()=>{
const s=[0,0,0];return dt=>{if(PT)for(let i=0;i<3;i++)if(inR(P.x,P.y,10,30+i*55,40,30))s[i]^=1;const and=s[0]&&s[1],or=s[1]||s[2],xr=and^or,nt=!s[2];
clr();const off='#444a66',wl=(x1,y1,x2,y2,v)=>{const c=v?Y:off,m=(x1+x2)/2;line(x1,y1,m,y1,c,2);line(m,y1,m,y2,c,2);line(m,y2,x2,y2,c,2)},gate=(x,y,n,v)=>{rect(x,y,50,30,'#262a3d');srect(x,y,50,30,v?Y:GY);txt(n,x+25,y+15,10,v?Y:WH,'center')};
wl(50,45,110,50,s[0]);wl(50,100,110,60,s[1]);wl(50,100,110,105,s[1]);wl(50,155,110,115,s[2]);wl(50,155,210,160,s[2]);gate(110,40,'Y',and);gate(110,95,'O',or);wl(160,55,210,75,and);wl(160,110,210,85,or);gate(210,65,'O excl.',xr);wl(260,80,290,80,xr);circ(298,80,9,xr?Y:'#333');gate(210,145,'NO',nt);wl(260,160,290,160,nt);circ(298,160,9,nt?Y:'#333');
for(let i=0;i<3;i++){rect(10,30+i*55,40,30,s[i]?GR:'#2f3550');txt(s[i]?'ON':'OFF',30,45+i*55,10,WH,'center')}txt('Interruptores',8,12,10,GY)}});

def('con','Cintas transportadoras','Colocas y orientas cintas que mueven objetos automáticamente de un punto a otro. Base de los juegos de automatización.','Factorio, Satisfactory, Shapez','Toca casillas para poner o girar cintas. Lleva las cajas a la casilla verde.','',()=>{
const w=10,h=6,S=28,ox=20,oy=18,D=[[1,0],[0,1],[-1,0],[0,-1]],src={x:0,y:2},snk={x:9,y:4},g=Array(w*h).fill(-1);let it=[],t=0,sc=0;for(let x=0;x<5;x++)g[2*w+x]=0;
return dt=>{if(PT){const x=Math.floor((P.x-ox)/S),y=Math.floor((P.y-oy)/S);if(x>=0&&x<w&&y>=0&&y<h&&!(x==snk.x&&y==snk.y)){const i=y*w+x;g[i]=g[i]==3?-1:g[i]+1}}
t-=dt;if(t<=0){t=1;it.push({x:src.x,y:src.y,p:0,s:0})}for(const o of it){const d=g[o.y*w+o.x];if(d<0){o.s+=dt;if(o.s>3)o.dead=1;continue}o.p+=dt*1.6;if(o.p>=1){o.p=0;o.x+=D[d][0];o.y+=D[d][1];if(o.x==snk.x&&o.y==snk.y){o.dead=1;sc++}else if(o.x<0||o.y<0||o.x>=w||o.y>=h)o.dead=1}}it=it.filter(o=>!o.dead);
clr();for(let i=0;i<w*h;i++){const x=ox+(i%w)*S,y=oy+Math.floor(i/w)*S;rect(x+1,y+1,S-2,S-2,'#1f2333');const d=g[i];if(d>=0){rect(x+2,y+2,S-4,S-4,'#3a3f5c');const ph=(T*1.6)%1;G.save();G.translate(x+S/2,y+S/2);G.rotate(d*Math.PI/2);for(let k=0;k<2;k++){const px=-8+((ph+k*.5)%1)*16;line(px-3,-5,px+2,0,Y,2);line(px+2,0,px-3,5,Y,2)}G.restore()}}
srect(ox+src.x*S+2,oy+src.y*S+2,S-4,S-4,OR,2);rect(ox+snk.x*S+2,oy+snk.y*S+2,S-4,S-4,GR);for(const o of it){const d=g[o.y*w+o.x],q=d>=0?D[d]:[0,0];circ(ox+(o.x+.5+q[0]*o.p)*S,oy+(o.y+.5+q[1]*o.p)*S,6,OR)}txt('Entregadas: '+sc,8,9,10,Y)}});

def('con','Dibujar el nivel','Lo que dibujas se convierte en un objeto sólido con física. La creatividad del jugador es la solución.','Crayon Physics Deluxe, Scribblenauts, Brain It On!','Dibuja rampas para llevar la bola a la meta. B borra.','B:Borrar',()=>{
let L=[],cur=null,b,sc=0;const goal={x:290,y:170},reset=()=>{b={x:30,y:20,vx:0,vy:0}};reset();
return dt=>{if(PT)cur=[[P.x,P.y]];if(cur&&P.down){const l=cur[cur.length-1];if(dist(l[0],l[1],P.x,P.y)>6)cur.push([P.x,P.y])}if(cur&&!P.down){if(cur.length>1)L.push(cur);if(L.length>6)L.shift();cur=null}if(hit('b')){L=[];reset()}
b.vy+=300*dt;b.x+=b.vx*dt;b.y+=b.vy*dt;for(const l of L)for(let i=1;i<l.length;i++)bseg(b,6,l[i-1][0],l[i-1][1],l[i][0],l[i][1],0,0,.2);if(b.y>220||b.x<-20||b.x>340)reset();if(dist(b.x,b.y,goal.x,goal.y)<14){sc++;reset()}
clr('#f4f1ea');G.lineCap='round';for(const l of cur?[...L,cur]:L){G.strokeStyle='#2b2d42';G.lineWidth=3;G.beginPath();l.forEach((p,i)=>i?G.lineTo(p[0],p[1]):G.moveTo(p[0],p[1]));G.stroke()}circ(b.x,b.y,6,RD);rect(goal.x-12,goal.y-4,24,8,GR);txt('Metas: '+sc,8,10,10,'#555')}});

def('con','Terreno destructible','El escenario se puede excavar o volar en pedazos, cambiando los caminos posibles.','Worms, Terraria, Teardown','Toca para abrir cráteres. ◀▶ mueven al personaje. B regenera el terreno.','H|B:Reset',()=>{
const w=80,h=50,S=4;let g,cx=160,cy=0,vy=0;const fx=PX(),reset=()=>{g=new Uint8Array(w*h);for(let x=0;x<w;x++){const top=Math.floor(28+Math.sin(x*.12)*6+Math.sin(x*.31)*3);for(let y=top;y<h;y++)g[y*w+x]=1}};reset();const solid=(x,y)=>{const i=Math.floor(x/S),j=Math.floor(y/S);return i>=0&&i<w&&j>=0&&j<h&&g[j*w+i]};
return dt=>{if(PT){const px=Math.floor(P.x/S),py=Math.floor(P.y/S);for(let a=-6;a<=6;a++)for(let b=-6;b<=6;b++)if(a*a+b*b<=36){const x=px+a,y=py+b;if(x>=0&&x<w&&y>=0&&y<h)g[y*w+x]=0}fx.add(P.x,P.y,20,OR,120);shake(4)}if(hit('b'))reset();
const nx=cl(cx+((key('r')?1:0)-(key('l')?1:0))*50*dt,4,316);let k=0;while(solid(nx,cy-1-k)&&k<8)k++;if(k<8){cx=nx;cy-=k}vy+=300*dt;cy+=vy*dt;let n=0;while(solid(cx,cy)&&n<30){cy-=1;vy=0;n++}if(cy>210){cy=0;vy=0}
clr('#7ec8e3');for(let i=0;i<w*h;i++)if(g[i])rect((i%w)*S,Math.floor(i/w)*S,S,S,'#8d6e4c');rect(cx-4,cy-10,8,10,RD);fx.run(dt,200)}});

def('con','Pintar territorio','Tu personaje deja un rastro de color sobre el suelo y gana quien cubra más superficie al acabar el tiempo.','Splatoon, Paper.io, Snake.io','Muévete para pintar más que los rivales en 20 s.','D',()=>{
const w=32,h=20,S=10,g=new Int8Array(w*h);let x=40,y=100,t=20;const ex=[{x:280,y:40,a:0},{x:280,y:160,a:2}];const paint=(px,py,v)=>{const i=Math.floor(px/S),j=Math.floor(py/S);for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++){const X=i+a,Yy=j+b;if(X>=0&&X<w&&Yy>=0&&Yy<h)g[Yy*w+X]=v}};
return dt=>{if(t>0){t-=dt;const[dx,dy]=dir();x=cl(x+dx*100*dt,2,318);y=cl(y+dy*100*dt,2,198);if(P.down){x=lerp(x,P.x,.12);y=lerp(y,P.y,.12)}paint(x,y,1);for(const e of ex){e.a+=R(-3,3)*dt;e.x+=Math.cos(e.a)*80*dt;e.y+=Math.sin(e.a)*80*dt;if(e.x<4||e.x>316)e.a=Math.PI-e.a;if(e.y<4||e.y>196)e.a=-e.a;e.x=cl(e.x,4,316);e.y=cl(e.y,4,196);paint(e.x,e.y,2)}}else if(PT){g.fill(0);t=20}
let a=0,b=0;for(let i=0;i<w*h;i++){if(g[i]==1)a++;else if(g[i]==2)b++}clr();for(let i=0;i<w*h;i++)if(g[i])rect((i%w)*S,Math.floor(i/w)*S,S,S,g[i]==1?'#4cc9f088':'#ff5a5f88');for(const e of ex)circ(e.x,e.y,6,RD);circ(x,y,6,BL);txt('Tú '+Math.round(a/6.4)+'% · rivales '+Math.round(b/6.4)+'%',8,10,10);txt(t>0?Math.ceil(t)+' s':(a>b?'¡Ganaste!':'Ganan los rivales')+' · toca',312,10,10,Y,'right')}});
