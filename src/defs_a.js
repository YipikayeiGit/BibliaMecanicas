// ================= MOVIMIENTO =================
def('mov','Movimiento en 8 direcciones','El personaje se desplaza libremente en horizontal, vertical y diagonal. Se normaliza el vector para que ir en diagonal no sea más rápido.','The Legend of Zelda, Hades, Enter the Gungeon','Cruceta para moverte. Recoge las gemas.','D',()=>{
let x=160,y=100,g=[],s=0;const n=()=>g.push({x:R(20,300),y:R(30,180)});for(let i=0;i<4;i++)n();
return dt=>{const[dx,dy]=dir();x=cl(x+dx*110*dt,8,312);y=cl(y+dy*110*dt,8,192);let k=0;for(let i=g.length;i--;)if(dist(x,y,g[i].x,g[i].y)<12){g.splice(i,1);s++;k++}while(k--)n();
clr();for(const o of g)circ(o.x,o.y,5,Y);circ(x,y,8,BL);if(dx||dy)line(x,y,x+dx*14,y+dy*14,WH,2);txt('Gemas: '+s,8,10)}});

def('mov','Movimiento por casillas','El mundo es una cuadrícula y el personaje avanza casilla a casilla, con una pequeña animación entre ellas. Hace el movimiento predecible y fácil de leer.','Pokémon, Into the Breach, roguelikes clásicos','Cruceta: una casilla por paso.','D',()=>{
const S=20;let gx=8,gy=5,px=160,py=100,mv=0;const wall=new Set();for(let i=0;i<28;i++)wall.add(RI(0,15)+','+RI(0,9));wall.delete('8,5');
return dt=>{if(mv<=0){let dx=0,dy=0;if(key('l'))dx=-1;else if(key('r'))dx=1;else if(key('u'))dy=-1;else if(key('d'))dy=1;const nx=gx+dx,ny=gy+dy;if((dx||dy)&&nx>=0&&nx<16&&ny>=0&&ny<10&&!wall.has(nx+','+ny)){gx=nx;gy=ny;mv=.13}}mv-=dt;px=lerp(px,gx*S,.35);py=lerp(py,gy*S,.35);
clr();for(let i=0;i<16;i++)for(let j=0;j<10;j++){if(wall.has(i+','+j))rect(i*S,j*S,S,S,'#3a3f5c');else srect(i*S+.5,j*S+.5,S-1,S-1,'#1f2333')}rect(px+3,py+3,14,14,GR)}});

def('mov','Control tipo tanque','Izquierda y derecha giran al personaje sobre sí mismo y arriba avanza hacia donde mira. Típico del survival horror clásico para crear tensión.','Resident Evil (1996), Silent Hill, Grim Fandango','▲ avanza, ▼ retrocede, ◀▶ giran.','D',()=>{
let x=160,y=100,a=0;return dt=>{if(key('l'))a-=3*dt;if(key('r'))a+=3*dt;const v=(key('u')?90:0)-(key('d')?60:0);x=cl(x+Math.cos(a)*v*dt,10,310);y=cl(y+Math.sin(a)*v*dt,10,190);
clr();G.save();G.translate(x,y);G.rotate(a);rect(-12,-9,24,18,OR);rect(4,-3,12,6,Y);G.restore();txt('Gira sobre ti mismo y avanza hacia donde miras',8,10,10,GY)}});

def('mov','Salto','Un impulso vertical contra la gravedad. Es la base de los plataformas: la altura y el tiempo en el aire definen todo el diseño de niveles.','Super Mario Bros., Celeste, Hollow Knight','◀▶ moverse, A saltar.','H|A:Saltar',()=>{
const S=[...lvl(),{x:80,y:140,w:60,h:10},{x:180,y:105,w:60,h:10},{x:250,y:65,w:50,h:10}],b=body(20,160);
return dt=>{walk(b);if(hit('a')&&b.g)b.vy=-330;phys(b,S,dt);clr();drawS(S);hero(b);txt('Sube hasta la plataforma más alta',8,10,10,GY)}});

def('mov','Salto de altura variable','Soltar el botón antes corta la subida. El jugador controla la altura con la duración de la pulsación.','Super Mario World, Celeste, Super Meat Boy','Toque corto = salto bajo; mantén = salto alto.','H|A:Saltar',()=>{
const S=lvl(),b=body(150,160);let tr=[];return dt=>{walk(b);if(hit('a')&&b.g){b.vy=-360;tr=[]}if(!key('a')&&b.vy<-100)b.vy=-100;phys(b,S,dt);if(!b.g)tr.push([b.x+6,b.y+8]);if(tr.length>200)tr.shift();
clr();for(let h=1;h<5;h++){const yy=184-h*20;line(0,yy,320,yy,'#222638',1)}for(const t of tr)circ(t[0],t[1],1.2,GY);drawS(S);hero(b);txt('Compara toques cortos y largos',8,10,10,GY)}});

def('mov','Tiempo de coyote','Durante unas centésimas tras salir de un borde todavía puedes saltar. Es invisible para el jugador pero hace que el control se sienta justo.','Celeste, Hollow Knight, casi cualquier plataformas moderno','Corre y salta justo después del borde. B activa o desactiva la ayuda.','H|A:Saltar|B:Ayuda',()=>{
const S=[{x:0,y:184,w:120,h:16},{x:178,y:184,w:142,h:16},{x:-10,y:-200,w:10,h:400},{x:320,y:-200,w:10,h:400}],b=body(20,160);let on=true,co=0;
return dt=>{if(hit('b'))on=!on;walk(b,130);co=b.g?(on?.15:0):co-dt;if(hit('a')&&(b.g||co>0)){b.vy=-300;co=0}phys(b,S,dt);if(b.y>220){b.x=20;b.y=150;b.vy=0}
clr();drawS(S);hero(b,co>0&&!b.g?Y:BL);txt('Coyote time: '+(on?'ACTIVADO':'desactivado'),8,10,11,on?GR:RD);txt('Amarillo = aún puedes saltar en el aire',8,26,10,GY)}});

def('mov','Búfer de salto','Si pulsas saltar un poco antes de tocar el suelo, el juego guarda la orden y salta al aterrizar. Evita la sensación de que el botón no respondió.','Celeste, Ori, Dead Cells','Pulsa saltar justo antes de aterrizar. B activa o desactiva el búfer.','H|A:Saltar|B:Búfer',()=>{
const S=[...lvl(),{x:60,y:120,w:200,h:10}],b=body(150,60);let on=true,buf=0,n=0;
return dt=>{if(hit('b'))on=!on;walk(b);if(hit('a')){if(on)buf=.15;else if(b.g){b.vy=-330;n++}}buf-=dt;if(on&&buf>0&&b.g){b.vy=-330;buf=0;n++}phys(b,S,dt);
clr();drawS(S);hero(b,buf>0?Y:BL);txt('Búfer de salto: '+(on?'ACTIVADO':'desactivado'),8,10,11,on?GR:RD);txt('Saltos encadenados: '+n,8,26,10,GY)}});

def('mov','Doble salto','Un segundo impulso en el aire que permite corregir la trayectoria o alcanzar más altura.','Castlevania: SotN, Hollow Knight, Kirby','A en el suelo y otra vez en el aire.','H|A:Saltar',()=>{
const S=[...lvl(),{x:200,y:70,w:100,h:10}],b=body(20,160),fx=PX();let j=0;
return dt=>{walk(b);if(b.g)j=0;if(hit('a')&&(b.g||j<2)){if(!b.g){j=2;fx.add(b.x+6,b.y+16,10,WH,60,.4)}else j=1;b.vy=-310}phys(b,S,dt);
clr();drawS(S);fx.run(dt);hero(b,j==2?PU:BL);txt('Saltos en el aire disponibles: '+(j<2?1:0),8,10)}});

def('mov','Salto en pared','Pegado a una pared caes más despacio y puedes impulsarte hacia el lado contrario para escalar entre muros.','Mega Man X, Celeste, Super Meat Boy','Pégate a una pared (morado) y pulsa A.','H|A:Saltar',()=>{
const S=[{x:0,y:184,w:320,h:16},{x:60,y:40,w:20,h:144},{x:160,y:0,w:20,h:140},{x:250,y:50,w:20,h:134},{x:-10,y:-200,w:10,h:400},{x:320,y:-200,w:10,h:400}],b=body(100,160);let lock=0;
return dt=>{lock-=dt;if(lock<=0)walk(b);const wl=touch(b,S,-1,0),wr=touch(b,S,1,0),sl=!b.g&&(wl&&key('l')||wr&&key('r'));
if(hit('a')){if(b.g)b.vy=-320;else if(wl){b.vy=-300;b.vx=170;lock=.18;b.face=1}else if(wr){b.vy=-300;b.vx=-170;lock=.18;b.face=-1}}phys(b,S,dt);if(sl&&b.vy>50)b.vy=50;
clr();drawS(S);hero(b,sl?PU:BL);txt('Rebota entre paredes para subir',100,10,10,GY)}});

def('mov','Acometida (dash)','Un estallido corto de velocidad en la dirección que miras, normalmente con enfriamiento. Sirve para esquivar, cruzar huecos o recolocarse.','Celeste, Hyper Light Drifter, Hades','◀▶ moverse, A saltar, B dash.','H|A:Saltar|B:Dash',()=>{
const S=[...lvl(),{x:120,y:120,w:80,h:10}],b=body(30,160);let d=0,cd=0,tr=[];
return dt=>{cd-=dt;if(d>0){d-=dt;b.vy=0;b.vx=b.face*420;tr.push({x:b.x,y:b.y,l:.25})}else walk(b);if(hit('a')&&b.g)b.vy=-320;if(hit('b')&&cd<=0){d=.14;cd=.5;shake(2)}phys(b,S,dt,d>0?0:900);
clr();drawS(S);for(const t of tr){t.l-=dt;G.globalAlpha=Math.max(0,t.l*3);rect(t.x,t.y,b.w,b.h,PU)}G.globalAlpha=1;tr=tr.filter(t=>t.l>0);hero(b);bar(8,8,60,5,1-cd/.5,PU);txt('Enfriamiento',74,10,9,GY)}});

def('mov','Inercia y aceleración','El personaje tarda en arrancar y en frenar. Cuanta más velocidad acumulas, más lejos y alto llegas.','Sonic the Hedgehog, Super Mario 64, Mirror’s Edge','Corre en una dirección y salta con velocidad.','H|A:Saltar',()=>{
const S=lvl(),b=body(150,160);return dt=>{const m=(key('r')?1:0)-(key('l')?1:0);if(m){b.vx+=m*(Math.sign(b.vx)==-m?900:350)*dt;b.face=m}else b.vx-=Math.sign(b.vx)*Math.min(Math.abs(b.vx),400*dt);b.vx=cl(b.vx,-260,260);if(hit('a')&&b.g)b.vy=-260-Math.abs(b.vx)*.5;phys(b,S,dt);
clr();drawS(S);hero(b);txt('Velocidad',8,10,10,GY);bar(64,6,120,7,Math.abs(b.vx)/260,OR);txt('Más velocidad = salto más alto',8,26,10,GY)}});

def('mov','Superficies resbaladizas','En el hielo la aceleración y el rozamiento bajan mucho: cuesta arrancar y no puedes frenar en seco.','Super Mario Bros. 3, Celeste (cap. 8), Donkey Kong Country','Prueba a frenar en la tierra y en el hielo.','H|A:Saltar',()=>{
const S=[{x:0,y:184,w:160,h:16},{x:160,y:184,w:160,h:16,ice:1},{x:-10,y:-200,w:10,h:400},{x:320,y:-200,w:10,h:400}],b=body(40,160);
return dt=>{const m=(key('r')?1:0)-(key('l')?1:0),ice=b.g&&b.on&&b.on.ice;const acc=ice?120:1500;if(m){b.vx=cl(b.vx+m*acc*dt,-150,150);b.face=m}else{const f=(ice?30:1500)*dt;b.vx-=Math.sign(b.vx)*Math.min(Math.abs(b.vx),f)}if(hit('a')&&b.g)b.vy=-300;phys(b,S,dt);
clr();rect(0,184,160,16,'#3a3f5c');rect(160,184,160,16,'#a8e6ff');txt('tierra',60,192,10,WH);txt('hielo',220,192,10,BG);hero(b)}});

def('mov','Planear','Mantener un botón en el aire reduce la velocidad de caída y permite recorrer grandes distancias horizontales.','Super Mario World (capa), Zelda: BotW (paravela), Spyro','Salta y mantén A en el aire.','H|A:Saltar',()=>{
const S=[...lvl(),{x:0,y:40,w:70,h:10},{x:260,y:150,w:60,h:10}],b=body(20,20);
return dt=>{walk(b,100);if(hit('a')&&b.g)b.vy=-300;const gl=!b.g&&key('a')&&b.vy>0;phys(b,S,dt,gl?150:900);if(gl)b.vy=Math.min(b.vy,45);
clr();drawS(S);if(gl){G.fillStyle=Y;G.beginPath();G.moveTo(b.x-10,b.y);G.lineTo(b.x+6,b.y-10);G.lineTo(b.x+22,b.y);G.fill()}hero(b);txt('Planea desde la plataforma alta hasta la otra',8,10,10,GY)}});

def('mov','Nado y flotabilidad','En el agua cambian las reglas: menos gravedad, movimiento más lento y brazadas para subir.','Super Mario Bros. (1-2), Rayman Legends, Ori','Entra en el agua y pulsa A para bracear.','H|A:Nadar',()=>{
const S=[...lvl(),{x:0,y:80,w:60,h:10}],b=body(20,50);
return dt=>{const w=b.y+b.h>100;walk(b,w?70:120);if(w){if(hit('a'))b.vy=b.y<104?-290:-140;phys(b,S,dt,180);b.vy=cl(b.vy,-290,60)}else{if(hit('a')&&b.g)b.vy=-300;phys(b,S,dt)}
clr();G.globalAlpha=.35;rect(0,100,320,84,BL);G.globalAlpha=1;drawS(S);hero(b);txt(w?'Bajo el agua: A para bracear':'Salta al agua',8,10,10,GY)}});

def('mov','Escaleras y trepar','Zonas donde el control cambia: la gravedad se anula y te mueves en vertical.','Donkey Kong, Mega Man, Castlevania','Colócate en una escalera y pulsa ▲▼.','D|A:Saltar',()=>{
const S=[...lvl(),{x:0,y:110,w:140,h:8,oneway:1},{x:180,y:50,w:140,h:8,oneway:1}],L=[{x:110,y:106,w:16,h:78},{x:250,y:46,w:16,h:64}],b=body(20,160);let cl_=false;
return dt=>{const on=L.find(l=>ov(b,l));if(on&&(key('u')||key('d')))cl_=true;if(!on)cl_=false;b.drop=cl_;
if(cl_){b.vx=0;b.vy=((key('d')?1:0)-(key('u')?1:0))*80;b.x=lerp(b.x,on.x+2,.3);phys(b,S,dt,0)}else{walk(b);if(hit('a')&&b.g)b.vy=-260;phys(b,S,dt)}
clr();for(const l of L){for(let yy=l.y+4;yy<l.y+l.h;yy+=8)line(l.x,yy,l.x+16,yy,OR,2);line(l.x,l.y,l.x,l.y+l.h,OR,2);line(l.x+16,l.y,l.x+16,l.y+l.h,OR,2)}drawS(S);hero(b,cl_?OR:BL);txt('Sube hasta arriba del todo',8,10,10,GY)}});

def('mov','Gancho (grappling hook)','Te enganchas a un punto y te balanceas como un péndulo, conservando el impulso al soltarte.','Bionic Commando, Just Cause, Worms (cuerda ninja)','Mantén el dedo sobre un anclaje amarillo para colgarte; suelta para salir disparado.','H|A:Saltar',()=>{
const A=[{x:80,y:30},{x:170,y:40},{x:260,y:30}],S=[{x:0,y:184,w:60,h:16},{x:270,y:184,w:50,h:16}];let x=20,y=170,vx=0,vy=0,hk=null,len=0,g=false;
return dt=>{if(PT){let best=null;for(const a of A)if(dist(P.x,P.y,a.x,a.y)<34)best=a;if(best&&dist(x,y,best.x,best.y)<170){hk=best;len=dist(x,y,best.x,best.y)}}if(!P.down)hk=null;
if(g&&!hk){vx=((key('r')?1:0)-(key('l')?1:0))*100;if(hit('a'))vy=-250}vy+=700*dt;x+=vx*dt;y+=vy*dt;
if(hk){const d=dist(x,y,hk.x,hk.y);if(d>len){const nx=(x-hk.x)/d,ny=(y-hk.y)/d;x=hk.x+nx*len;y=hk.y+ny*len;const vd=vx*nx+vy*ny;if(vd>0){vx-=vd*nx;vy-=vd*ny}}if(key('l'))vx-=150*dt;if(key('r'))vx+=150*dt}
g=false;for(const s of S)if(x>s.x&&x<s.x+s.w&&y>s.y-7&&y<s.y+10&&vy>=0){y=s.y-6;vy=0;g=true;if(!hk)vx*=.8}if(y>230||x<-30||x>350){x=20;y=170;vx=vy=0;hk=null}
clr();for(const s of S)rect(s.x,s.y,s.w,s.h,'#3a3f5c');for(const a of A){circ(a.x,a.y,6,dist(x,y,a.x,a.y)<170?Y:GY);ring(a.x,a.y,11,'#ffd44755')}if(hk)line(x,y,hk.x,hk.y,WH,1.5);circ(x,y,6,BL);txt('Cruza el abismo balanceándote',8,190,10,GY)}});

def('mov','Teletransporte corto (blink)','Apareces instantáneamente en otro punto dentro de un alcance limitado. Sustituye al desplazamiento físico y permite cruzar obstáculos.','Dishonored, Overwatch (Tracer), Hollow Knight (Sombra)','Cruceta para andar; toca la pantalla para teletransportarte.','D',()=>{
let x=60,y=100,cd=0;const fx=PX(),r=90;return dt=>{cd-=dt;const[dx,dy]=dir();x=cl(x+dx*70*dt,8,312);y=cl(y+dy*70*dt,8,192);if(PT&&cd<=0){const d=dist(x,y,P.x,P.y),t=d?Math.min(1,r/d):1;fx.add(x,y,14,PU,60);x+=(P.x-x)*t;y+=(P.y-y)*t;fx.add(x,y,14,WH,60);cd=.6}
clr();ring(x,y,r,'#b388ff44');fx.run(dt);circ(x,y,7,PU);bar(8,8,60,5,1-cd/.6,PU);txt('Alcance limitado (círculo)',74,10,9,GY)}});

def('mov','Inversión de gravedad','En lugar de saltar, el personaje invierte la gravedad y cae hacia el techo. Todo el nivel se piensa en dos sentidos.','VVVVVV, Gravity Rush, Super Mario Galaxy','A invierte la gravedad (solo apoyado).','H|A:Invertir',()=>{
const S=[{x:0,y:184,w:320,h:16},{x:0,y:0,w:320,h:16},{x:100,y:16,w:20,h:60},{x:200,y:124,w:20,h:60},{x:-10,y:-200,w:10,h:400},{x:320,y:-200,w:10,h:400}],b=body(20,160);let gr=1;
return dt=>{walk(b);const on=gr>0?b.g:b.c;if(hit('a')&&on)gr*=-1;phys(b,S,dt,900*gr);clr();drawS(S);hero(b,gr>0?BL:RD);txt('Suelo y techo son igual de válidos',90,100,10,GY)}});

def('mov','Trampolines y rebotes','Superficies que devuelven al jugador hacia arriba con más fuerza que un salto normal.','Sonic, Super Mario Odyssey, Crash Bandicoot','Pisa los trampolines; el rojo lanza más.','H|A:Saltar',()=>{
const S=lvl(),Tr=[{x:60,y:176,w:40,h:8,p:450},{x:200,y:176,w:40,h:8,p:620}],b=body(20,160);let sq=0;
return dt=>{walk(b);if(hit('a')&&b.g)b.vy=-250;phys(b,S,dt);for(const t of Tr)if(ov(b,t)&&b.vy>=0){b.y=t.y-b.h;b.vy=-t.p;sq=.15}sq-=dt;
clr();drawS(S);for(const t of Tr)rect(t.x,t.y+(sq>0?3:0),t.w,t.h-(sq>0?3:0),t.p>500?RD:GR);hero(b);txt('Altura según la fuerza del trampolín',8,10,10,GY)}});

def('mov','Plataformas móviles','Plataformas que se desplazan y te transportan. Exigen calcular el momento justo para subir y bajar.','Super Mario Bros., Rayman, Crash Bandicoot','Sube a las plataformas amarillas.','H|A:Saltar',()=>{
const S=lvl(),Mv=[{x:60,y:140,w:50,h:8,ax:50,bx:190,ay:140,by:140},{x:230,y:150,w:40,h:8,ax:240,bx:240,ay:160,by:60}],b=body(20,160);let tt=0;
return dt=>{tt+=dt;walk(b);if(hit('a')&&b.g)b.vy=-300;for(const m of Mv){const k=(Math.sin(tt*1.2+(m.ax==m.bx?1.5:0))+1)/2,nx=lerp(m.ax,m.bx,k),ny=lerp(m.ay,m.by,k);m.dx=nx-m.x;m.dy=ny-m.y;m.x=nx;m.y=ny;if(b.on===m&&b.g){b.x+=m.dx;b.y+=m.dy}}phys(b,[...S,...Mv],dt);
clr();drawS(S);for(const m of Mv)rect(m.x,m.y,m.w,m.h,Y);hero(b);txt('Las plataformas te llevan consigo',8,10,10,GY)}});

def('mov','Plataformas atravesables','Se pueden cruzar desde abajo al saltar y permiten dejarse caer pulsando abajo.','Super Smash Bros., Terraria, Kirby','Salta a través; ▼ para dejarte caer.','D|A:Saltar',()=>{
const S=[...lvl(),{x:40,y:140,w:240,h:6,oneway:1},{x:40,y:96,w:240,h:6,oneway:1},{x:40,y:52,w:240,h:6,oneway:1}],b=body(150,160);let dr=0;
return dt=>{walk(b);dr-=dt;if(hit('d')&&b.g&&b.on&&b.on.oneway)dr=.2;b.drop=dr>0;if(hit('a')&&b.g)b.vy=-300;phys(b,S,dt);clr();drawS(S);hero(b);txt('Sube por dentro y baja con ▼',8,10,10,GY)}});

def('mov','Carrera automática','El personaje corre solo y el jugador únicamente decide cuándo saltar. Todo el reto está en el tiempo.','Canabalt, Geometry Dash, juego del dinosaurio de Chrome','Toca o pulsa A para saltar los obstáculos.','A:Saltar',()=>{
let y=0,vy=0,ob=[],t=0,sp=150,sc=0,dead=false;return dt=>{if(dead){if(hit('a')||PT){ob=[];sc=0;sp=150;dead=false}}else{t-=dt;sp+=dt*4;sc+=dt*10;if(t<=0){ob.push({x:330,h:RI(14,30)});t=R(.7,1.6)}vy+=1000*dt;y+=vy*dt;if(y>0){y=0;vy=0}if((hit('a')||PT)&&y===0)vy=-360;for(const o of ob){o.x-=sp*dt;if(o.x<50&&o.x+12>38&&-y<o.h)dead=true}ob=ob.filter(o=>o.x>-20)}
clr();rect(0,170,320,30,'#3a3f5c');for(const o of ob)rect(o.x,170-o.h,12,o.h,RD);rect(38,154+y,12,16,BL);txt('Puntos: '+(sc|0),8,10);if(dead)txt('¡Choque! Toca para reiniciar',160,90,13,Y,'center')}});

def('mov','Cambio de carril','El avance es automático y el jugador solo cambia entre carriles fijos para esquivar y recoger.','Subway Surfers, Temple Run, Beat Saber (en cierto modo)','▲▼ o toca un carril.','V',()=>{
let l=1,y=100,ob=[],t=0,sc=0,dead=0;const Y0=[60,100,140];return dt=>{if(dead){if(PT){dead=0;ob=[];sc=0}}else{if(hit('u'))l=Math.max(0,l-1);if(hit('d'))l=Math.min(2,l+1);if(PT)l=P.y<80?0:P.y<120?1:2;sc+=dt;t-=dt;if(t<=0){ob.push({x:330,l:RI(0,2),c:Math.random()<.3});t=R(.4,.9)}for(const o of ob){o.x-=(170+sc*5)*dt;if(o.x<70&&o.x>40&&o.l==l){if(o.c){sc+=3;o.x=-99}else dead=1}}ob=ob.filter(o=>o.x>-30)}
y=lerp(y,Y0[l],.3);clr();for(const yy of Y0)line(0,yy+16,320,yy+16,'#262a3d',1);for(const o of ob)o.c?circ(o.x+10,Y0[o.l],6,Y):rect(o.x,Y0[o.l]-12,20,24,RD);rect(48,y-10,16,20,BL);txt('Puntos: '+(sc|0),8,10);if(dead)txt('Toca para reiniciar',160,182,12,Y,'center')}});

def('mov','Agacharse y deslizarse','Reducir la altura del personaje para pasar por huecos o esquivar. Con velocidad se convierte en un deslizamiento.','Mega Man 3, Apex Legends, Titanfall 2','Corre y pulsa ▼ para deslizarte bajo el bloque.','D|A:Saltar',()=>{
const S=[...lvl(),{x:150,y:150,w:60,h:20}],b=body(20,160);let sl=0;
return dt=>{const crouch=key('d')&&b.g;if(crouch&&sl<=0&&Math.abs(b.vx)>50&&b.h==16)sl=.45;sl-=dt;const low=crouch||sl>0;if(low&&b.h==16){b.h=8;b.y+=8}if(!low&&b.h==8&&!touch(b,S,0,-8)){b.h=16;b.y-=8}
if(sl>0)b.vx=b.face*230;else walk(b,crouch?40:120);if(hit('a')&&b.g&&b.h==16)b.vy=-300;phys(b,S,dt);clr();drawS(S);hero(b,sl>0?OR:BL);txt('Deslízate bajo el bloque',8,10,10,GY)}});

def('mov','Moverse con un toque','El jugador señala un destino y el personaje camina solo hasta allí. Base de las aventuras gráficas, los RTS y los ARPG.','Diablo, Monkey Island, League of Legends','Toca donde quieras ir.','',()=>{
let x=160,y=100,tx=160,ty=100,mk=0;return dt=>{if(PT||P.down){tx=P.x;ty=P.y;mk=.5}mk-=dt;const d=dist(x,y,tx,ty);if(d>2){x+=(tx-x)/d*Math.min(d,100*dt);y+=(ty-y)/d*Math.min(d,100*dt)}
clr();if(mk>0)ring(tx,ty,10*(1-mk)+4,Y);circ(x,y+10,7,'#0006');circ(x,y,7,GR);txt('Toca donde quieras ir',8,10,10,GY)}});

def('mov','Salto cargado','Mantener el botón acumula fuerza y al soltar saltas con la dirección elegida, sin poder corregir en el aire.','Jump King, Getting Over It (en espíritu), Pogostuck','Mantén A, elige dirección con ◀▶ y suelta.','H|A:Cargar',()=>{
const S=[...lvl(),{x:220,y:130,w:60,h:10},{x:60,y:80,w:60,h:10},{x:200,y:35,w:80,h:10}],b=body(30,160);let ch=0;
return dt=>{if(b.g){b.vx=0;if(key('a'))ch=Math.min(1,ch+dt*1.4);else if(ch>0){b.vy=-150-ch*300;b.vx=((key('r')?1:0)-(key('l')?1:0))*120;ch=0}else walk(b,60)}phys(b,S,dt);
clr();drawS(S);hero(b);if(ch>0)bar(b.x-8,b.y-10,28,4,ch,Y);txt('Sin control en el aire: calcula bien',8,10,10,GY)}});

// ================= COMBATE =================
def('com','Disparo con apuntado libre','Te mueves con una mano y apuntas con la otra, de forma independiente. Base de los twin-stick shooters.','Geometry Wars, Enter the Gungeon, Nuclear Throne','Cruceta para moverte; mantén el dedo en la pantalla para disparar hacia allí.','D',()=>{
let x=160,y=100,bs=[],en=[],t=0,k=0,cd=0;const fx=PX();return dt=>{const[dx,dy]=dir();x=cl(x+dx*100*dt,8,312);y=cl(y+dy*100*dt,8,192);cd-=dt;
if(P.down&&cd<=0){const d=dist(x,y,P.x,P.y)||1;bs.push({x,y,vx:(P.x-x)/d*300,vy:(P.y-y)/d*300});cd=.12}t-=dt;if(t<=0){const a=R(0,6.28);en.push({x:160+Math.cos(a)*200,y:100+Math.sin(a)*200,h:2});t=.8}
for(const b of bs){b.x+=b.vx*dt;b.y+=b.vy*dt}for(const e of en){const d=dist(e.x,e.y,x,y)||1;e.x+=(x-e.x)/d*40*dt;e.y+=(y-e.y)/d*40*dt;if(d<12){e.h=0;shake(4)}for(const b of bs)if(!b.d&&e.h>0&&dist(b.x,b.y,e.x,e.y)<10){b.d=1;e.h--;if(e.h<=0){k++;fx.add(e.x,e.y,10,RD)}}}
bs=bs.filter(b=>!b.d&&b.x>-10&&b.x<330&&b.y>-10&&b.y<210);en=en.filter(e=>e.h>0);
clr();fx.run(dt);for(const e of en)circ(e.x,e.y,8,RD);for(const b of bs)circ(b.x,b.y,2,Y);circ(x,y,7,BL);if(P.down)line(x,y,P.x,P.y,'#ffffff22',1);txt('Bajas: '+k,8,10)}});

def('com','Combos cuerpo a cuerpo','Pulsaciones encadenadas dentro de una ventana de tiempo producen una secuencia de golpes con un remate final más fuerte.','Devil May Cry, Bayonetta, God of War','Pulsa A al ritmo para encadenar tres golpes.','A:Atacar',()=>{
let c=0,win=0,anim=0,hp=100,sh=0;const ft=FT(),names=['Golpe','Golpe','¡Remate!'];return dt=>{win-=dt;anim-=dt;sh-=dt;if(win<=0)c=0;
if(hit('a')&&anim<=0){c=c%3+1;anim=.18;win=.55;const dmg=c==3?25:8;hp-=dmg;sh=.1;ft.add('-'+dmg,220,60,c==3?Y:WH);if(c==3)shake(4);if(hp<=0)hp=100}
clr();rect(0,160,320,40,'#262a3d');const dx=sh>0?R(-3,3):0;rect(205+dx,110,30,50,RD);bar(195,100,50,5,hp/100,RD);rect(120,120,20,40,BL);
if(anim>0){G.strokeStyle=c==3?Y:WH;G.lineWidth=c==3?5:3;G.beginPath();if(c==2)G.arc(140,135,35,.8,-.8,true);else G.arc(140,135,35,-.8,.8);G.stroke()}
ft.run(dt);for(let i=0;i<3;i++)rect(20+i*22,20,18,8,i<c?Y:'#2a2e44');txt(c?names[c-1]:'',20,40,12,Y);bar(20,50,62,3,win/.55,GY)}});

def('com','Bloqueo y parada (parry)','Mantener la guardia reduce el daño; pulsarla en el instante exacto del impacto lo anula y deja al enemigo vendido.','Sekiro, Dark Souls, Street Fighter III (parry)','Mantén B para bloquear; púlsalo justo cuando golpea para hacer parry.','B:Guardia',()=>{
let st='idle',t=1.5,hp=100,bt=-9,msg='',mt=0,stag=0;return dt=>{t-=dt;mt-=dt;stag-=dt;if(hit('b'))bt=0;bt+=dt;
if(st=='idle'&&t<=0&&stag<=0){st='wind';t=R(.5,1)}else if(st=='wind'&&t<=0){st='hit';t=.15;if(bt<.18){msg='¡PARRY!';stag=1.2;shake(5)}else if(key('b')){msg='Bloqueado (-2)';hp-=2}else{msg='¡Golpe! (-12)';hp-=12;shake(3)}mt=.8}else if(st=='hit'&&t<=0){st='idle';t=R(.8,1.6)}if(hp<=0)hp=100;
clr();rect(0,160,320,40,'#262a3d');const ex=st=='wind'?215:st=='hit'?170:200;rect(ex,110,30,50,stag>0?GY:RD);if(st=='wind')circ(ex+15,100,6+Math.sin(T*40)*2,Y);if(stag>0)txt('aturdido',ex+15,100,10,Y,'center');
rect(110,110,20,50,BL);if(key('b'))rect(132,105,6,50,WH);bar(20,20,100,6,hp/100,GR);if(mt>0)txt(msg,160,60,16,msg=='¡PARRY!'?Y:WH,'center');txt('El destello amarillo avisa del ataque',8,190,10,GY)}});

def('com','Esquiva con invulnerabilidad','Durante la voltereta el personaje es intocable unos fotogramas (i-frames). Atravesar el ataque es mejor que alejarse.','Dark Souls, Bloodborne, Enter the Gungeon','B para rodar a través de los proyectiles.','H|B:Rodar',()=>{
let x=80,r=0,cd=0,ps=[],t=0,hits=0,ok=0;return dt=>{r-=dt;cd-=dt;if(hit('b')&&cd<=0){r=.35;cd=.6}const m=(key('r')?1:0)-(key('l')?1:0);x=cl(x+(r>0?m*160:m*80)*dt,10,300);t-=dt;if(t<=0){ps.push({x:330,y:R(115,150)});t=R(.4,.9)}
for(const p of ps){p.x-=200*dt;if(!p.d&&Math.abs(p.x-x)<10){p.d=1;if(r>0)ok++;else{hits++;shake(3)}}}ps=ps.filter(p=>p.x>-10);
clr();rect(0,160,320,40,'#262a3d');for(const p of ps)rect(p.x-6,p.y-3,12,6,p.d?GY:RD);G.globalAlpha=r>0?.4:1;rect(x-8,r>0?140:120,16,r>0?20:40,BL);G.globalAlpha=1;bar(8,26,60,4,1-cd/.6,PU);txt('Esquivados: '+ok+' · impactos: '+hits,8,10)}});

def('com','Ataque cargado','Mantener el botón acumula potencia en varios niveles. Arriesgas tiempo a cambio de daño.','Mega Man (Mega Buster), Zelda (giratorio), Monster Hunter','Mantén A y suelta (tres niveles).','A:Cargar',()=>{
let ch=0,sw=0,lv=0;const ft=FT(),fx=PX(),C=[WH,OR,Y];return dt=>{sw-=dt;if(key('a'))ch=Math.min(1.5,ch+dt);else if(ch>0){lv=ch<.5?1:ch<1.2?2:3;const d=[5,15,40][lv-1];ft.add('-'+d,230,80,C[lv-1],10+lv*4);fx.add(230,120,lv*8,C[lv-1],60*lv);if(lv==3)shake(6);sw=.2;ch=0}
clr();rect(0,160,320,40,'#262a3d');rect(215,110,30,50,RD);const c=ch<.5?WH:ch<1.2?OR:Y;rect(120,110,20,50,BL);if(ch>0){ring(130,135,30-ch*12,c,2);bar(100,95,80,6,ch/1.5,c)}if(sw>0)line(140,110,205,135,C[lv-1],lv*3);fx.run(dt);ft.run(dt);txt('Más carga, más daño',8,10,10,GY)}});

def('com','Retroceso (knockback)','Los golpes empujan a los enemigos. Sirve para controlar el espacio y da sensación de fuerza.','Hades, Super Smash Bros., Vampire Survivors','◀▶ moverte, A golpear, B recolocar.','H|A:Golpe|B:Reset',()=>{
let x=100,f=1,es=[],sw=0;const reset=()=>{es=[{x:180,vx:0,fl:0},{x:230,vx:0,fl:0},{x:270,vx:0,fl:0}]};reset();
return dt=>{const m=(key('r')?1:0)-(key('l')?1:0);if(m)f=m;x=cl(x+m*90*dt,10,300);sw-=dt;if(hit('a')){sw=.12;for(const e of es)if(Math.abs(e.x-(x+f*20))<20){e.vx=f*350;e.fl=.1;shake(2)}}if(hit('b'))reset();
for(const e of es){e.x+=e.vx*dt;e.vx*=Math.pow(.02,dt);e.fl-=dt;if(e.x<8||e.x>312){e.x=cl(e.x,8,312);e.vx*=-.5}}
clr();rect(0,160,320,40,'#262a3d');for(const e of es)rect(e.x-10,130,20,30,e.fl>0?WH:RD);rect(x-8,120,16,40,BL);if(sw>0)rect(f>0?x+8:x-30,130,22,8,Y);txt('Empuja a los enemigos contra la pared',8,10,10,GY)}});

def('com','Fijar objetivo (lock-on)','El juego mantiene la atención sobre un enemigo concreto y los ataques se dirigen a él aunque se mueva.','Zelda: Ocarina of Time (Z-targeting), Dark Souls, Star Fox','B cambia de objetivo; A dispara.','D|A:Disparar|B:Fijar',()=>{
const es=[{x:240,y:50},{x:260,y:150},{x:180,y:100}];let i=-1,bs=[],x=60,y=100;for(const e of es)e.t=R(0,6);
return dt=>{const[dx,dy]=dir();x=cl(x+dx*90*dt,8,312);y=cl(y+dy*90*dt,8,192);for(const e of es){e.t+=dt;e.cx=e.x+Math.cos(e.t)*20;e.cy=e.y+Math.sin(e.t*1.3)*15}
if(hit('b'))i=(i+1)%es.length;const tg=es[i];if(hit('a'))bs.push({x,y,a:tg?Math.atan2(tg.cy-y,tg.cx-x):0,tg});
for(const b of bs){if(b.tg)b.a=Math.atan2(b.tg.cy-b.y,b.tg.cx-b.x);b.x+=Math.cos(b.a)*260*dt;b.y+=Math.sin(b.a)*260*dt;if(b.tg&&dist(b.x,b.y,b.tg.cx,b.tg.cy)<8)b.d=1}bs=bs.filter(b=>!b.d&&b.x<330&&b.x>-10&&b.y>-10&&b.y<210);
clr();for(const e of es)circ(e.cx,e.cy,9,RD);if(tg){ring(tg.cx,tg.cy,15+Math.sin(T*8)*2,Y,2);line(x,y,tg.cx,tg.cy,'#ffd44733',1)}for(const b of bs)circ(b.x,b.y,2.5,Y);circ(x,y,7,BL);txt(tg?'Objetivo fijado':'Sin objetivo: pulsa B',8,10,10,GY)}});

def('com','Munición y recarga','El cargador limita los disparos seguidos y recargar te deja expuesto. Obliga a gestionar el ritmo del combate.','Resident Evil, Counter-Strike, DOOM','▲▼ apuntar, A disparar, B recargar.','V|A:Disparar|B:Recargar',()=>{
let am=6,rl=0,bs=[],ts=[],t=0,sc=0,nc=0,py=100;return dt=>{if(rl>0){rl-=dt;if(rl<=0)am=6}nc-=dt;py=cl(py+((key('d')?1:0)-(key('u')?1:0))*120*dt,10,180);if(P.down)py=cl(lerp(py,P.y,.2),10,180);
if(hit('a')&&rl<=0){if(am>0){am--;bs.push({x:40,y:py})}else nc=.5}if(hit('b')&&rl<=0&&am<6)rl=1.2;t-=dt;if(t<=0){ts.push({x:330,y:R(20,175)});t=.7}
for(const o of ts)o.x-=50*dt;for(const b of bs){b.x+=400*dt;for(const o of ts)if(!o.d&&!b.d&&Math.abs(b.x-o.x)<10&&Math.abs(b.y-o.y)<10){o.d=b.d=1;sc++}}bs=bs.filter(b=>!b.d&&b.x<330);ts=ts.filter(o=>!o.d&&o.x>-10);
clr();rect(20,py-6,20,12,BL);for(const o of ts){circ(o.x,o.y,9,WH);circ(o.x,o.y,5,RD)}for(const b of bs)rect(b.x,b.y-1,6,2,Y);for(let i=0;i<6;i++)rect(8+i*8,186,5,10,i<am?Y:'#2a2e44');if(rl>0){bar(60,188,80,5,1-rl/1.2,OR);txt('Recargando…',148,190,10,OR)}if(nc>0)txt('*clic* ¡sin balas!',160,100,14,RD,'center');txt('Aciertos '+sc,8,10)}});

def('com','Golpes críticos y números de daño','Una probabilidad de multiplicar el daño, mostrada con números flotantes más grandes. Da picos de emoción a cada golpe.','Borderlands, Diablo, Final Fantasy','Toca al muñeco de prácticas.','A:Golpe',()=>{
const ft=FT(),fx=PX();let tot=0,n=0;return dt=>{if(PT||hit('a')){const cr=Math.random()<.2,d=Math.round(R(8,12)*(cr?2.5:1));tot+=d;n++;ft.add(d+(cr?'!':''),160+R(-20,20),70,cr?Y:WH,cr?22:13);if(cr){shake(4);fx.add(160,100,14,Y,120)}}
clr();rect(140,70,40,70,RD);circ(160,60,14,RD);fx.run(dt);ft.run(dt);txt('Prob. de crítico 20% · daño ×2,5',8,10,10,GY);txt('Daño medio por golpe: '+(n?(tot/n).toFixed(1):'–'),8,26,10)}});

def('com','Combate por turnos','Jugador y enemigo actúan alternadamente eligiendo acciones de un menú. Prima la planificación sobre los reflejos.','Pokémon, Final Fantasy, Dragon Quest','Elige una acción.','',()=>{
let php=40,ehp=50,log='¡Aparece un limo salvaje!',turn='p',t=0,def_=false,pots=2;const opts=[['Atacar',()=>{const d=RI(6,10);ehp-=d;log='Atacas: -'+d}],['Defender',()=>{def_=true;log='Te pones en guardia'}],['Poción',()=>{if(pots>0){pots--;php=Math.min(40,php+15);log='Recuperas 15 PV'}else log='¡No quedan pociones!'}]];
return dt=>{if(turn=='e'){t-=dt;if(t<=0){if(ehp<=0){ehp=50;log='Aparece otro limo'}else{const d=Math.round(RI(5,9)*(def_?.4:1));php-=d;log='El limo ataca: -'+d;shake(2);if(php<=0){php=40;pots=2;log='Derrota… vuelves a empezar'}}def_=false;turn='p'}}
clr();circ(230,80,26,GR);circ(222,74,3,BG);circ(238,74,3,BG);bar(195,40,70,5,ehp/50,RD);rect(50,70,20,30,BL);bar(30,40,60,5,php/40,GR);txt('PV '+php+'/40 · pociones '+pots,20,28,9);txt(log,160,125,12,Y,'center');
let pk=-1;opts.forEach((o,i)=>{if(btn(15+i*100,150,92,32,o[0],turn=='p'?'#2f3550':'#1b1e2e')&&turn=='p')pk=i});if(pk>=0){opts[pk][1]();turn='e';t=.8}}});

def('com','Barra de tiempo activo (ATB)','Cada personaje tiene una barra que se llena en tiempo real; cuando está llena puede actuar. Turnos con presión de tiempo.','Final Fantasy VI, Final Fantasy VII, Final Fantasy IX, Chrono Trigger','Actúa cuando la barra de un personaje esté llena.','',()=>{
const Hh=[{n:'Guerrero',s:.35,a:0,c:BL},{n:'Maga',s:.22,a:0,c:PU}];const e={a:0,hp:100},ft=FT();let log='';
return dt=>{for(const h of Hh)h.a=Math.min(1,h.a+h.s*dt);e.a+=.28*dt;if(e.a>=1){e.a=0;log='¡El enemigo ataca!';shake(2)}
clr();rect(230,60,40,50,RD);bar(220,40,60,5,e.hp/100,RD);bar(220,48,60,3,e.a,GY);ft.run(dt);
Hh.forEach((h,i)=>{const y=130+i*32;rect(20,y,10,22,h.c);txt(h.n,38,y+11,11);bar(110,y+7,90,8,h.a,h.a>=1?Y:h.c);if(btn(212,y,96,26,h.a>=1?'¡Actuar!':'esperando…',h.a>=1?'#3b4a2f':'#1b1e2e')&&h.a>=1){h.a=0;const d=i?22:14;e.hp-=d;ft.add('-'+d,250,60,Y);if(e.hp<=0)e.hp=100}});txt(log,20,20,11,Y)}});

def('com','Debilidades elementales','Cada enemigo resiste unos elementos y es vulnerable a otros. Recompensa observar y experimentar.','Pokémon, Persona, Shin Megami Tensei','Descubre a qué elemento es débil cada enemigo.','',()=>{
const EL=[['Fuego',OR],['Hielo',BL],['Rayo',Y]];let en;const ft=FT();const nw=()=>{const el=RI(0,2);en={el,w:(el+1)%3,hp:30}};nw();
return dt=>{clr();circ(200,75,26,EL[en.el][1]);bar(170,36,60,5,en.hp/30,RD);txt('Limo de '+EL[en.el][0].toLowerCase(),200,116,11,WH,'center');ft.run(dt);
EL.forEach((e,i)=>{if(btn(15+i*100,150,92,32,e[0],e[1]+'55')){let d=8,m='Normal';if(i==en.w){d=20;m='¡Muy eficaz!'}else if(i==en.el){d=2;m='Lo resiste…'}en.hp-=d;ft.add(m+' -'+d,200,55,i==en.w?Y:WH,12);if(en.hp<=0)nw()}});txt('Fuego > hielo > rayo > fuego',8,12,10,GY)}});

def('com','Artillería con parábola','Eliges ángulo y potencia y el proyectil sigue una curva afectada por la gravedad y el viento.','Worms, Angry Birds, Gunbound','Arrastra desde el cañón hacia donde quieras apuntar y suelta.','',()=>{
let pr=null,tx=R(200,300),aim=null,res='',w=R(-40,40);return dt=>{if(PT&&!pr)aim={x:P.x,y:P.y};if(aim&&P.down){aim.x=P.x;aim.y=P.y}if(PR&&aim&&!pr){pr={x:40,y:165,vx:(aim.x-40)*2.4,vy:(aim.y-165)*2.4};aim=null}
if(pr){pr.vy+=300*dt;pr.vx+=w*dt;pr.x+=pr.vx*dt;pr.y+=pr.vy*dt;if(pr.x>140&&pr.x<160&&pr.y>90){res='Contra el muro';pr=null}else if(pr.y>=170){if(Math.abs(pr.x-tx)<14){res='¡Impacto!';tx=R(200,300);w=R(-40,40);shake(4)}else res='Fallo por '+Math.round(Math.abs(pr.x-tx))+' px';pr=null}else if(pr.x>360||pr.x<-40)pr=null}
clr();rect(0,170,320,30,'#3a3f5c');rect(140,90,20,80,'#6b7290');rect(tx-12,160,24,10,RD);rect(30,160,20,10,BL);if(aim){line(40,165,aim.x,aim.y,'#ffffff66',1);let qx=40,qy=165,vx=(aim.x-40)*2.4,vy=(aim.y-165)*2.4;for(let i=0;i<12;i++){vy+=300*.04;vx+=w*.04;qx+=vx*.04;qy+=vy*.04;circ(qx,qy,1.5,'#ffffff55')}}if(pr)circ(pr.x,pr.y,4,Y);
txt('Viento '+(w>0?'→':'←')+' '+Math.abs(w).toFixed(0),8,10,10,BL);txt(res,8,26,11,Y)}});

def('com','Bumerán','Un proyectil que sale y vuelve a su lanzador, pudiendo golpear a la ida y a la vuelta.','Zelda, Mega Man (Quick Boomerang), Kirby','Cruceta para moverte; toca para lanzar en esa dirección.','D|A:Lanzar',()=>{
let x=60,y=100,bm=null,ts=[],sc=0;const nt=()=>ts.push({x:R(150,300),y:R(20,180)});for(let i=0;i<3;i++)nt();
return dt=>{const[dx,dy]=dir();x=cl(x+dx*90*dt,8,312);y=cl(y+dy*90*dt,8,192);if((hit('a')||PT)&&!bm){const ax=PT?P.x-x:1,ay=PT?P.y-y:0,d=Math.hypot(ax,ay)||1;bm={x,y,vx:ax/d*300,vy:ay/d*300,t:0}}
if(bm){bm.t+=dt;if(bm.t>.45){const d=dist(bm.x,bm.y,x,y)||1;bm.vx+=(x-bm.x)/d*900*dt;bm.vy+=(y-bm.y)/d*900*dt;const s=Math.hypot(bm.vx,bm.vy);if(s>340){bm.vx*=340/s;bm.vy*=340/s}if(d<10)bm=null}if(bm){bm.x+=bm.vx*dt;bm.y+=bm.vy*dt}}
let k=0;for(let i=ts.length;i--;)if(bm&&dist(bm.x,bm.y,ts[i].x,ts[i].y)<12){ts.splice(i,1);sc++;k++}while(k--)nt();
clr();for(const t of ts)circ(t.x,t.y,8,RD);if(bm){G.save();G.translate(bm.x,bm.y);G.rotate(T*20);rect(-8,-2,16,4,Y);rect(-2,-8,4,16,Y);G.restore()}circ(x,y,7,BL);txt('Dianas: '+sc,8,10,10,GY)}});

def('com','Daño en área (explosivos)','Un ataque que afecta a todo lo que está dentro de un radio, a menudo con retardo. Ideal contra grupos.','Bomberman, Worms, Vampire Survivors','Toca para soltar una bomba con mecha.','',()=>{
let es=[],bombs=[],k=0;const fx=PX(),sp=()=>{while(es.length<8)es.push({x:R(20,300),y:R(30,190)})};sp();
return dt=>{if(PT)bombs.push({x:P.x,y:P.y,t:1});for(const b of bombs){b.t-=dt;if(b.t<=0){fx.add(b.x,b.y,30,OR,160,.5);shake(5);for(const e of es)if(dist(e.x,e.y,b.x,b.y)<45){e.d=1;k++}}}bombs=bombs.filter(b=>b.t>0);es=es.filter(e=>!e.d);if(es.length<4)sp();for(const e of es){e.x=cl(e.x+R(-30,30)*dt,5,315);e.y=cl(e.y+R(-30,30)*dt,20,195)}
clr();for(const b of bombs){ring(b.x,b.y,45,'#ff9f4366',1);circ(b.x,b.y,6,b.t%.2<.1?RD:'#222')}for(const e of es)circ(e.x,e.y,6,PU);fx.run(dt);txt('Eliminados: '+k,8,10,10,GY)}});

def('com','Patrones de balas (bullet hell)','El enemigo llena la pantalla de proyectiles en formas geométricas; el reto es leer el patrón y colarse por los huecos. La zona de impacto del jugador es diminuta.','Touhou, Ikaruga, Enter the Gungeon','Cruceta o arrastra para moverte. B = modo lento y preciso.','D|B:Lento',()=>{
let x=160,y=170,bs=[],t=0,ph=0,hits=0,inv=0,lb=0;return dt=>{const[dx,dy]=dir();const sl=key('b')?.45:1;x=cl(x+dx*130*sl*dt,6,314);y=cl(y+dy*130*sl*dt,6,194);if(P.down){x=lerp(x,P.x,.2);y=lerp(y,P.y-20,.2)}
t+=dt;ph+=dt;lb-=dt;if(t>.08){t=0;const k=Math.floor(ph/4)%3;if(k==0)for(let i=0;i<2;i++){const a=ph*3+i*Math.PI;bs.push({x:160,y:50,vx:Math.cos(a)*90,vy:Math.sin(a)*90})}else if(k==1){if(lb<=0){lb=.5;for(let i=0;i<14;i++){const a=i/14*6.283+ph;bs.push({x:160,y:50,vx:Math.cos(a)*70,vy:Math.sin(a)*70})}}}else{const a=Math.atan2(y-50,x-160)+R(-.2,.2);bs.push({x:160,y:50,vx:Math.cos(a)*150,vy:Math.sin(a)*150})}}
inv-=dt;for(const b of bs){b.x+=b.vx*dt;b.y+=b.vy*dt;if(inv<=0&&dist(b.x,b.y,x,y)<4){hits++;inv=1;shake(3)}}bs=bs.filter(b=>b.x>-10&&b.x<330&&b.y>-10&&b.y<210);
clr();circ(160,50,14,PU);for(const b of bs)circ(b.x,b.y,3,'#ff9fd0');G.globalAlpha=inv>0&&T%.2<.1?.3:1;circ(x,y,6,BL);circ(x,y,2,WH);G.globalAlpha=1;txt('Impactos: '+hits+' · solo cuenta el punto blanco',8,10,10,GY)}});

def('com','Devolver proyectiles','Golpear un proyectil en el momento justo lo manda de vuelta contra quien lo lanzó.','Zelda (Ganondorf), Hades, Hollow Knight','Pulsa A cuando el proyectil entre en la zona clara.','A:Golpe',()=>{
let p=null,sw=0,ehp=5,t=1,sc='';return dt=>{sw-=dt;t-=dt;if(!p&&t<=0)p={x:255,v:-R(150,250)};if(hit('a')||PT)sw=.15;if(p){p.x+=p.v*dt;if(p.v<0&&sw>0&&p.x<120&&p.x>80){p.v=-p.v*1.4;shake(2)}if(p.x<70){p=null;t=1;sc='¡Te dio!';shake(3)}else if(p.x>260){p=null;t=1;ehp--;sc='¡Devuelto!';if(ehp<=0)ehp=5}}
clr();rect(0,160,320,40,'#262a3d');rect(260,110,30,50,RD);bar(255,100,40,4,ehp/5,RD);rect(60,120,16,40,BL);rect(80,90,40,70,'#ffffff10');if(sw>0){G.strokeStyle=Y;G.lineWidth=4;G.beginPath();G.arc(76,135,30,-1.2,1.2);G.stroke()}if(p)circ(p.x,135,6,p.v>0?Y:OR);txt(sc,160,60,14,Y,'center')}});

def('com','Coberturas','Esconderse tras objetos bloquea el fuego enemigo. Agacharse o asomarse se convierte en una decisión constante.','Gears of War, Uncharted, XCOM','◀▶ moverte; mantén ▼ para agacharte tras la cobertura.','D',()=>{
let x=40,hp=100,bs=[],t=0;const C=[{x:110,w:22},{x:200,w:22}];return dt=>{const m=(key('r')?1:0)-(key('l')?1:0);x=cl(x+m*90*dt,10,285);const cr=key('d');t-=dt;if(t<=0){bs.push({x:300,y:R(122,158)});t=.25}
for(const b of bs){b.x-=260*dt;for(const c of C)if(b.x>c.x&&b.x<c.x+c.w&&b.y>135)b.d=1;const top=cr?145:120;if(!b.d&&Math.abs(b.x-x)<8&&b.y>top){b.d=1;hp-=5;shake(2)}}bs=bs.filter(b=>!b.d&&b.x>-5);if(hp<=0)hp=100;
clr();rect(0,160,320,40,'#262a3d');rect(300,110,16,50,RD);for(const c of C)rect(c.x,135,c.w,25,'#6b7290');for(const b of bs)rect(b.x-3,b.y-1,6,2,Y);rect(x-8,cr?145:120,16,cr?15:40,BL);bar(8,8,80,6,hp/100,GR);txt('Agáchate detrás de un bloque gris',8,24,10,GY)}});

def('com','Fases de un ataque','Todo golpe tiene anticipación, fotogramas activos (cuando hace daño) y recuperación. Ajustar estas fases define el peso y la justicia del combate.','Street Fighter, Monster Hunter, Dark Souls','Pulsa A y observa la línea de tiempo.','A:Atacar',()=>{
let t=-1,hd=0;const ft=FT(),D=[.25,.1,.3],N=['Anticipación','Activo','Recuperación'],C=[Y,RD,BL];
return dt=>{if(hit('a')&&t<0){t=0;hd=0}let ph=-1;if(t>=0){t+=dt;ph=t<D[0]?0:t<D[0]+D[1]?1:t<D[0]+D[1]+D[2]?2:-1;if(ph<0)t=-1}if(ph==1&&!hd){hd=1;ft.add('¡Golpe!',200,80,Y)}
clr();rect(0,160,320,40,'#262a3d');rect(190,110,24,50,RD);rect(120,110,20,50,BL);srect(120.5,110.5,19,49,GR);const ang=ph==0?-2.2-(t/D[0])*.3:ph==1?-.3:ph==2?.4:-1.6;G.save();G.translate(135,125);G.rotate(ang);rect(0,-2,45,4,WH);G.restore();if(ph==1)srect(150,105,45,40,RD,2);
let x=20;for(let i=0;i<3;i++){const w=D[i]*300;rect(x,25,w,10,ph==i?C[i]:C[i]+'44');txt(N[i],x+2,44,9,C[i]);x+=w}ft.run(dt);txt('Solo la caja roja hace daño',8,190,10,GY)}});

def('com','Asistencia de apuntado','El juego corrige ligeramente la puntería hacia el objetivo cercano. Imprescindible con mandos y pantallas táctiles.','Halo, Destiny, casi cualquier shooter de consola','Toca cerca del objetivo para disparar. B activa o desactiva la ayuda.','B:Ayuda',()=>{
let ex=200,ey=100,on=true,ac=0,sh=0,bs=[];return dt=>{if(hit('b'))on=!on;ex=160+Math.sin(T*1.7)*110;ey=90+Math.cos(T*1.1)*60;
if(PT){let a=Math.atan2(P.y-180,P.x-160);if(on){const ta=Math.atan2(ey-180,ex-160);if(angD(ta,a)<.25)a=ta}bs.push({x:160,y:180,a});sh++}
for(const b of bs){b.x+=Math.cos(b.a)*400*dt;b.y+=Math.sin(b.a)*400*dt;if(!b.d&&dist(b.x,b.y,ex,ey)<10){b.d=1;ac++}}bs=bs.filter(b=>!b.d&&b.y>-10&&b.x>-10&&b.x<330);
clr();if(on)ring(ex,ey,16,'#ffd44733',14);circ(ex,ey,9,RD);for(const b of bs)circ(b.x,b.y,2,Y);rect(152,176,16,20,BL);txt('Asistencia: '+(on?'SÍ':'NO')+' · precisión '+(sh?Math.round(ac/sh*100):0)+'%',8,10,11,on?GR:RD)}});

def('com','Cambio de armas','Llevar varias armas con perfiles distintos (cadencia, dispersión, daño) y alternarlas según la situación.','DOOM, Ratchet & Clank, Halo','A dispara (mantén), B cambia de arma.','A:Disparar|B:Cambiar',()=>{
const Wp=[['Pistola',.25,1,0,Y],['Escopeta',.7,6,.5,OR],['Ametralladora',.07,1,.12,BL]];let w=0,cd=0,bs=[];
return dt=>{if(hit('b'))w=(w+1)%3;cd-=dt;const q=Wp[w];if((key('a')||P.down)&&cd<=0){cd=q[1];for(let i=0;i<q[2];i++){const a=R(-q[3],q[3]);bs.push({x:52,y:100,vx:Math.cos(a)*380,vy:Math.sin(a)*380,c:q[4]})}}
for(const b of bs){b.x+=b.vx*dt;b.y+=b.vy*dt}bs=bs.filter(b=>b.x<330&&b.y>-5&&b.y<205);clr();rect(30,92,22,16,BL);for(const b of bs)circ(b.x,b.y,2,b.c);Wp.forEach((p,i)=>txt(p[0],10+i*100,190,10,i==w?p[4]:GY));txt('Cadencia y dispersión distintas',8,10,10,GY)}});

def('com','Jefe con fases','Al bajar su vida, el jefe cambia de patrón de ataque. Cada fase es un examen nuevo.','Cuphead, Hollow Knight, Mega Man','Disparo automático; esquiva con ◀▶ o arrastrando.','H',()=>{
let hp=100,x=160,bs=[],t=0,px=160,pb=[],cd=0;const fx=PX();return dt=>{const ph=hp>66?1:hp>33?2:3;x=160+Math.sin(T*ph*.8)*(60+ph*20);t-=dt;
if(t<=0){if(ph==1){bs.push({x,y:50,vx:0,vy:120});t=.6}else if(ph==2){for(let i=-2;i<=2;i++)bs.push({x,y:50,vx:i*40,vy:120});t=.9}else{for(let i=0;i<10;i++){const a=i/10*6.283+T;bs.push({x,y:50,vx:Math.cos(a)*100,vy:Math.sin(a)*100})}t=.7}}
px=cl(px+((key('r')?1:0)-(key('l')?1:0))*150*dt,10,310);if(P.down)px=lerp(px,P.x,.2);cd-=dt;if(cd<=0){pb.push({x:px,y:170});cd=.15}
for(const b of pb){b.y-=300*dt;if(Math.abs(b.x-x)<20&&Math.abs(b.y-50)<16){b.d=1;hp--;fx.add(b.x,b.y,2,Y,40,.2)}}pb=pb.filter(b=>!b.d&&b.y>0);
for(const b of bs){b.x+=b.vx*dt;b.y+=b.vy*dt;if(dist(b.x,b.y,px,175)<7){b.d=1;shake(3)}}bs=bs.filter(b=>!b.d&&b.y<210&&b.y>-10&&b.x>-10&&b.x<330);if(hp<=0)hp=100;
clr();circ(x,50,20,[0,PU,OR,RD][ph]);bar(60,8,200,6,hp/100,RD);for(const q of[33,66])rect(60+q*2,6,1,10,WH);txt('FASE '+ph,160,22,11,WH,'center');for(const b of bs)circ(b.x,b.y,3.5,'#ff9fd0');for(const b of pb)rect(b.x-1,b.y-4,2,6,Y);fx.run(dt);rect(px-7,170,14,10,BL)}});

def('com','Ataques telegrafiados','Antes de golpear, el enemigo marca en el suelo la zona que va a castigar. Convierte el combate en lectura del espacio.','World of Warcraft, Final Fantasy XIV, Furi','Sal de las zonas rojas antes de que estallen.','D',()=>{
let x=160,y=100,Z=[],t=0,hits=0;const fx=PX();return dt=>{const[dx,dy]=dir();x=cl(x+dx*110*dt,6,314);y=cl(y+dy*110*dt,6,194);if(P.down){x=lerp(x,P.x,.15);y=lerp(y,P.y,.15)}t-=dt;
if(t<=0){t=.7;const k=RI(0,2);Z.push(k==0?{c:1,x:x+R(-30,30),y:y+R(-30,30),r:35,t:1.1}:k==1?{l:1,y:R(20,180),t:1.1}:{l:2,x:R(20,300),t:1.1})}
for(const z of Z){z.t-=dt;if(z.t<=0&&!z.done){z.done=1;const hp=z.c?dist(x,y,z.x,z.y)<z.r:z.l==1?Math.abs(y-z.y)<14:Math.abs(x-z.x)<14;if(hp){hits++;shake(4)}fx.add(z.c?z.x:z.l==1?x:z.x,z.c?z.y:z.l==1?z.y:y,14,OR,100)}}Z=Z.filter(z=>z.t>-.15);
clr();for(const z of Z){G.fillStyle=z.t>0?'rgba(255,90,95,'+(.15+(1-z.t/1.1)*.35)+')':Y;if(z.c){G.beginPath();G.arc(z.x,z.y,z.r,0,7);G.fill()}else if(z.l==1)G.fillRect(0,z.y-14,320,28);else G.fillRect(z.x-14,0,28,200)}fx.run(dt);circ(x,y,6,BL);txt('Impactos: '+hits,8,10,10,GY)}});
