// ===== Grupos (subcategorías) =====
const GROUPS={jump:['Saltos','El salto tiene decenas de matices; cada ajuste cambia cómo se siente un plataformas.'],aim:['Apuntar y disparar','Cómo se dirige, se ayuda y se dosifica el fuego.'],def:['Defenderse','Formas distintas de evitar o anular el daño.'],lock:['Forzar cerraduras','La misma acción, abrir una cerradura, resuelta con mecánicas muy diferentes según el juego.'],hack:['Hackeo','Minijuegos que representan entrar en un sistema informático.'],fish:['Pesca','Variantes del clásico minijuego de pescar.'],inv:['Inventarios','Cómo se guarda, ordena y limita lo que lleva el jugador.'],craft:['Fabricación','Maneras distintas de convertir materiales en objetos.'],dlg:['Diálogos','Sistemas para conversar y decidir qué decir.'],persp:['Perspectiva y proyección','Desde dónde se mira el mundo.'],seg:['Seguimiento','Cómo acompaña la cámara al jugador mientras se mueve.'],enc:['Encuadre y control','Quién maneja la cámara y qué parte del mundo enseña.']};

// ===== Utilidades de pseudo-3D (raycaster) =====
const RCM=['############','#....#.....#','#.##.#.###.#','#.#......#.#','#.#.####.#.#','#...#..#...#','###.#..#.###','#...#..#...#','#.#.####.#.#','#.#......#.#','#....##....#','############'];
const rcW=(x,y)=>{const r=RCM[Math.floor(y)];return!r||r[Math.floor(x)]!='.'};
function rcRay(px,py,a){const dx=Math.cos(a),dy=Math.sin(a);let mx=Math.floor(px),my=Math.floor(py);const ddx=Math.abs(1/dx),ddy=Math.abs(1/dy),sx=dx<0?-1:1,sy=dy<0?-1:1;let sdx=dx<0?(px-mx)*ddx:(mx+1-px)*ddx,sdy=dy<0?(py-my)*ddy:(my+1-py)*ddy,side=0;for(let i=0;i<64;i++){if(sdx<sdy){sdx+=ddx;mx+=sx;side=0}else{sdy+=ddy;my+=sy;side=1}if(rcW(mx+.5,my+.5))return[side?sdy-ddy:sdx-ddx,side,mx,my]}return[30,0,0,0]}
function rcView(px,py,pa,fov=1.1){rect(0,0,320,100,'#1c2244');rect(0,100,320,100,'#2a2a33');for(let i=0;i<80;i++){const a=pa+(i/80-.5)*fov,r=rcRay(px,py,a),d=r[0]*Math.cos(a-pa),h=Math.min(400,170/Math.max(d,.05)),l=Math.max(0,1-d/10),bs=(r[2]+r[3])%3==0?[200,120,90]:[120,140,200],k=(r[1]?.7:1)*l;rect(i*4,100-h/2,4.5,h,'rgb('+(bs[0]*k|0)+','+(bs[1]*k|0)+','+(bs[2]*k|0)+')')}}
function rcMove(o,dx,dy){if(!rcW(o.x+dx+Math.sign(dx)*.2,o.y))o.x+=dx;if(!rcW(o.x,o.y+dy+Math.sign(dy)*.2))o.y+=dy}
function rcMini(o,a){const s=4,ox=268,oy=4;rect(ox-2,oy-2,52,52,'#000a');RCM.forEach((r,y)=>[...r].forEach((c,x)=>{if(c=='#')rect(ox+x*s,oy+y*s,s,s,'#6b7290')}));circ(ox+o.x*s,oy+o.y*s,2,Y);line(ox+o.x*s,oy+o.y*s,ox+(o.x+Math.cos(a)*2)*s,oy+(o.y+Math.sin(a)*2)*s,Y,1)}
const ease=t=>t*t*(3-2*t);

// ================= TIPOS DE CÁMARA =================
group('persp',()=>{
def('cam','Primera persona','La cámara está en los ojos del personaje: máxima inmersión, pero no ves tu cuerpo ni lo que hay a tu espalda.','DOOM, Half-Life, Mirror’s Edge','▲▼ avanzar y retroceder, ◀▶ girar.','D',()=>{
const o={x:1.5,y:1.5};let a=.6;return dt=>{if(key('l'))a-=2.2*dt;if(key('r'))a+=2.2*dt;const v=(key('u')?2.2:0)-(key('d')?1.5:0);rcMove(o,Math.cos(a)*v*dt,Math.sin(a)*v*dt);rcView(o.x,o.y,a);rcMini(o,a);circ(160,100,2,WH)}});

def('cam','Tercera persona','La cámara va detrás del personaje y lo muestra en pantalla. Si choca con una pared se acerca para no atravesarla. La variante sobre el hombro lo desplaza a un lado para despejar la mira.','Tomb Raider, The Last of Us, Gears of War (sobre el hombro)','▲▼ avanzar, ◀▶ girar. B alterna centrada / sobre el hombro.','D|B:Hombro',()=>{
const o={x:1.5,y:1.5};let a=.6,sh=0;return dt=>{if(hit('b'))sh^=1;if(key('l'))a-=2.2*dt;if(key('r'))a+=2.2*dt;const v=(key('u')?2.2:0)-(key('d')?1.5:0);rcMove(o,Math.cos(a)*v*dt,Math.sin(a)*v*dt);
const back=rcRay(o.x,o.y,a+Math.PI)[0],cd=Math.max(.35,Math.min(1.4,back-.25)),lat=sh?.35:0,cx=o.x-Math.cos(a)*cd+Math.cos(a+Math.PI/2)*lat,cy=o.y-Math.sin(a)*cd+Math.sin(a+Math.PI/2)*lat;rcView(cx,cy,a);
const h=170/cd,sx=160-(lat/cd)/Math.tan(.55)*160,fy=100+h/2;rect(sx-h*.09,fy-h*.42,h*.18,h*.42,BL);circ(sx,fy-h*.48,h*.07,'#e9c46a');rcMini(o,a);if(cd<1.3)txt('Cámara acercada por la pared',8,190,10,Y);else txt(sh?'Sobre el hombro':'Centrada',8,190,10,GY)}});

def('cam','Isométrica con rotación','Vista en diagonal desde arriba con proyección sin perspectiva. Girar la cámara en pasos de 90° revela lo que tapaban los bloques.','Diablo, Fez, Monument Valley','Cruceta para moverte, B gira la cámara. Busca la gema escondida.','D|B:Girar',()=>{
const N=8,Hm=[];for(let i=0;i<N*N;i++)Hm.push(Math.random()<.18?RI(1,2):0);Hm[3*N+3]=4;Hm[3*N+4]=4;Hm[4*N+3]=4;let gem={x:4,y:4},px=0,py=7,r=0,got=0;Hm[gem.y*N+gem.x]=0;Hm[py*N+px]=0;
const rot=(x,y)=>[[x,y],[N-1-y,x],[N-1-x,N-1-y],[y,N-1-x]][r],un=(dX,dY)=>[[dX,dY],[dY,-dX],[-dX,-dY],[-dY,dX]][r];
return dt=>{if(hit('b'))r=(r+1)%4;let d=null;if(hit('u'))d=[0,-1];if(hit('d'))d=[0,1];if(hit('l'))d=[-1,0];if(hit('r'))d=[1,0];if(d){const[wx,wy]=un(d[0],d[1]),nx=px+wx,ny=py+wy;if(nx>=0&&ny>=0&&nx<N&&ny<N&&Math.abs(Hm[ny*N+nx]-Hm[py*N+px])<=1){px=nx;py=ny}}if(px==gem.x&&py==gem.y&&!got){got=1;shake(3)}
clr('#151729');const tiles=[];for(let y=0;y<N;y++)for(let x=0;x<N;x++){const[X,Yy]=rot(x,y);tiles.push([X,Yy,x,y])}tiles.sort((a,b)=>(a[0]+a[1])-(b[0]+b[1]));
for(const[X,Yy,x,y]of tiles){const h=Hm[y*N+x],sx=160+(X-Yy)*16,sy=46+(X+Yy)*8-h*10;G.fillStyle='#3e4566';G.beginPath();G.moveTo(sx-16,sy+8);G.lineTo(sx,sy+16);G.lineTo(sx,sy+16+h*10+4);G.lineTo(sx-16,sy+8+h*10+4);G.fill();G.fillStyle='#2c3150';G.beginPath();G.moveTo(sx+16,sy+8);G.lineTo(sx,sy+16);G.lineTo(sx,sy+16+h*10+4);G.lineTo(sx+16,sy+8+h*10+4);G.fill();G.fillStyle=h>2?'#8d6e4c':h?'#6a8a70':'#4f6f56';G.beginPath();G.moveTo(sx,sy);G.lineTo(sx+16,sy+8);G.lineTo(sx,sy+16);G.lineTo(sx-16,sy+8);G.fill();
if(!got&&x==gem.x&&y==gem.y){G.fillStyle=PU;G.beginPath();G.moveTo(sx,sy-6);G.lineTo(sx+5,sy+4);G.lineTo(sx,sy+10);G.lineTo(sx-5,sy+4);G.fill()}if(x==px&&y==py){rect(sx-4,sy-10,8,14,Y);circ(sx,sy-12,4,Y)}}txt('Vista '+(r*90)+'°',8,10,10,GY);txt(got?'¡Gema encontrada!':'',312,10,10,GR,'right')}});

def('cam','Cámaras fijas cinematográficas','Cada zona tiene una cámara colocada a mano, como en una película; al cruzar de zona cambia el plano. Permite encuadres dramáticos y ocultar lo que acecha.','Resident Evil (1996), Silent Hill, Final Fantasy VII (fondos prerrenderizados)','Camina con la cruceta y observa cómo cambia el plano. Arriba a la derecha, el mapa de cámaras.','D',()=>{
let x=3,y=6,cur=0,fl=0;const CAMS=[{x:-2,y:6,a:0,z:[0,8]},{x:11,y:-3.5,a:Math.PI/2,z:[8,15]},{x:24,y:14,a:Math.PI*1.25,z:[15,23]}],PIL=[[5,3],[5,9],[11,4],[12,9],[18,3],[19,8]];
return dt=>{const[dx,dy]=dir();x=cl(x+dx*3*dt,.5,21.5);y=cl(y+dy*3*dt,.5,11.5);const c=CAMS.findIndex(k=>x>=k.z[0]&&x<k.z[1]);if(c>=0&&c!=cur){cur=c;fl=.12}fl-=dt;const C=CAMS[cur],ca=Math.cos(C.a),sa=Math.sin(C.a);
const pr=(wx,wy,h)=>{const rx=wx-C.x,ry=wy-C.y,z=rx*ca+ry*sa,lx=-rx*sa+ry*ca;return z<.3?null:[160+lx/z*120,70+(2-(h||0))/z*120,z]};
clr('#101018');const seg=(a,b,c,d,col)=>{let prev=null;for(let k=0;k<=12;k++){const p=pr(lerp(a,c,k/12),lerp(b,d,k/12));if(p&&prev)line(prev[0],prev[1],p[0],p[1],col,1);prev=p}};
for(let gx=0;gx<=22;gx+=2)seg(gx,0,gx,12,'#2f3550');for(let gy=0;gy<=12;gy+=2)seg(0,gy,22,gy,'#2f3550');seg(0,0,22,0,GY);seg(0,12,22,12,GY);seg(0,0,0,12,GY);seg(22,0,22,12,GY);
const obj=PIL.map(p=>({x:p[0],y:p[1],h:2.4,w:.8,c:'#6b7290'}));obj.push({x,y,h:1.7,w:.5,c:Y});const pj=obj.map(o=>({o,p:pr(o.x,o.y,0),t:pr(o.x,o.y,o.h)})).filter(q=>q.p&&q.t).sort((a,b)=>b.p[2]-a.p[2]);
for(const q of pj){const w=q.o.w/q.p[2]*120;rect(q.p[0]-w/2,q.t[1],w,q.p[1]-q.t[1],q.o.c)}if(fl>0)rect(0,0,320,200,'#000');
const ox=240,oy=6,s=3.3;rect(ox-2,oy-2,78,44,'#000b');srect(ox,oy,22*s,12*s,GY);CAMS.forEach((k,i)=>{const cx=ox+cl(k.x,0,22)*s,cy=oy+cl(k.y,0,12)*s;circ(cx,cy,3,i==cur?RD:GY);line(cx,cy,cx+Math.cos(k.a)*8,cy+Math.sin(k.a)*8,i==cur?RD:GY,1)});circ(ox+x*s,oy+y*s,2,Y);txt('Plano '+(cur+1)+' de 3',8,10,10,GY)}});
});

group('seg',()=>{
def('cam','Sin vuelta atrás','La cámara solo avanza en un sentido y el borde de la pantalla bloquea el paso. Simplifica la memoria del nivel y empuja hacia delante.','Super Mario Bros. (1985), Contra, Kid Icarus','◀▶ y A para avanzar. B permite o bloquea volver.','H|A:Saltar|B:Bloqueo',()=>{
const WW=1400,S=[{x:0,y:184,w:WW,h:16},{x:WW,y:-200,w:10,h:400}];for(let i=0;i<16;i++)S.push({x:200+i*75,y:R(110,160),w:40,h:8});const b=body(40,160);let cx=0,lock=1;
return dt=>{if(hit('b'))lock^=1;walk(b,140);if(hit('a')&&b.g)b.vy=-320;phys(b,S,dt);const t=b.x-140;cx=cl(lock?Math.max(cx,t):t,0,WW-320);if(b.x<cx){b.x=cx;b.vx=0}if(b.x>WW-30){b.x=40;cx=0}
clr('#203060');G.save();G.translate(-Math.round(cx),0);for(let i=0;i<WW;i+=90)circ(i+40,40,14,'#ffffff18');drawS(S);hero(b);G.restore();if(lock)rect(0,0,3,200,RD);txt('Retroceso: '+(lock?'bloqueado':'permitido'),8,10,11,lock?RD:GR)}});

def('cam','Desplazamiento automático','La cámara avanza sola a velocidad fija y el jugador debe seguirle el ritmo; quedarse atrapado contra el borde es mortal.','Super Mario Bros. 3 (niveles de barco), Gradius, Rayman (persecuciones)','◀▶ y A. No te dejes aplastar por el borde izquierdo.','H|A:Saltar',()=>{
const S=[{x:-10,y:-200,w:10,h:400}];let x=0;while(x<3200){const l=R(200,380);S.push({x,y:184,w:l,h:16});const k=RI(0,2);for(let i=0;i<k;i++){const h=R(20,46);S.push({x:x+R(40,l-40),y:184-h,w:26,h})}x+=l+R(36,56)}S.push({x:3200,y:184,w:900,h:16});const b=body(60,160);let cx=0,dead=0,best=0;
return dt=>{if(dead>0){dead-=dt;if(dead<=0){cx=0;b.x=60;b.y=150;b.vy=0}}else{cx+=60*dt;walk(b,130);if(hit('a')&&b.g)b.vy=-330;phys(b,S,dt);if(b.x<cx){b.x=cx;if(touch(b,S,1,0)){dead=1;shake(5)}}if(b.x>cx+306)b.x=cx+306;if(b.y>210)dead=1;best=Math.max(best,cx/10);if(cx>3100){cx=0;b.x=60;b.y=150}}
clr('#2a1d3a');G.save();G.translate(-Math.round(cx),0);drawS(S);hero(b,dead>0?GY:BL);G.restore();rect(0,0,4,200,RD);txt(Math.floor(cx/10)+' m · récord '+Math.floor(best),8,10,11);if(dead>0)txt('¡Atrapado!',160,90,14,RD,'center')}});

def('cam','Solo hacia arriba','En los saltadores verticales la cámara sube contigo pero nunca baja: caer por debajo del borde inferior es perder.','Doodle Jump, Icy Tower, Kid Icarus','◀▶ o toca a los lados para moverte; los saltos son automáticos.','H',()=>{
let Pl,x,y,vy,cy,best,dead;const reset=()=>{Pl=[];for(let i=0;i<14;i++)Pl.push({x:R(20,260),y:180-i*45});x=140;y=160;vy=0;cy=0;best=0;dead=0};reset();
return dt=>{if(dead){if(PT||hit('a'))reset()}else{x=(x+((key('r')?1:0)-(key('l')?1:0)+(P.down?(P.x>160?1:-1):0))*160*dt+320)%320;const py=y;vy+=700*dt;y+=vy*dt;if(vy>0)for(const p of Pl)if(x>p.x-4&&x<p.x+44&&py<=p.y&&y>=p.y){y=p.y;vy=-420}cy=Math.min(cy,y-120);best=Math.max(best,-cy);for(const p of Pl)if(p.y>cy+210){p.y-=14*45;p.x=R(20,260)}if(y>cy+215){dead=1;shake(4)}}
clr();G.save();G.translate(0,-cy);for(const p of Pl)rect(p.x,p.y,40,6,GR);rect(x-6,y-14,12,14,Y);G.restore();txt(Math.floor(best/10)+' m',8,10,11);if(dead)txt('Toca para repetir',160,100,13,Y,'center')}});

def('cam','Cámara por salas','La cámara se limita a los bordes de la sala actual y, al cruzar una puerta, se desliza a la siguiente. Así nunca enseña lo que hay detrás de una pared.','Metroid, Hollow Knight, Celeste','◀▶ y A para cruzar las puertas. B quita los límites para comparar.','H|A:Saltar|B:Límites',()=>{
const RM=[[0,320,'#1c2140'],[320,960,'#24182e'],[960,1280,'#16302a']],S=[{x:0,y:184,w:1280,h:16},{x:-10,y:-200,w:10,h:400},{x:1280,y:-200,w:10,h:400},{x:316,y:0,w:8,h:150},{x:956,y:0,w:8,h:150},{x:420,y:130,w:60,h:8},{x:600,y:100,w:60,h:8},{x:780,y:140,w:60,h:8},{x:1100,y:120,w:60,h:8}],b=body(40,160);let cx=0,free=0;
return dt=>{if(hit('b'))free^=1;walk(b,140);if(hit('a')&&b.g)b.vy=-320;phys(b,S,dt);const r=RM.find(r=>b.x+6>=r[0]&&b.x+6<r[1])||RM[0];let tx=b.x-154;if(!free)tx=cl(tx,r[0],r[1]-320);tx=cl(tx,0,960);cx=lerp(cx,tx,1-Math.pow(.002,dt));
clr();G.save();G.translate(-Math.round(cx),0);for(const q of RM)rect(q[0],0,q[1]-q[0],200,q[2]);drawS(S);hero(b);G.restore();txt('Límites de sala: '+(free?'NO':'SÍ'),8,10,11,free?RD:GR)}});

def('cam','Cámara adelantada a la mira','La cámara se desplaza hacia donde apuntas para que veas más en esa dirección, a costa de ver menos a tu espalda.','Enter the Gungeon, Nuclear Throne, Hotline Miami','Cruceta para moverte; mantén el dedo para apuntar. B activa o desactiva el adelanto.','D|B:Adelanto',()=>{
const WW=1000,WH2=700,dots=[];for(let i=0;i<90;i++)dots.push([R(0,WW),R(0,WH2),R(4,12)]);let x=500,y=350,ax=1,ay=0,cx=340,cy=250,on=1;
return dt=>{if(hit('b'))on^=1;const[dx,dy]=dir();x=cl(x+dx*110*dt,0,WW);y=cl(y+dy*110*dt,0,WH2);if(P.down){const a=Math.atan2(P.y-(y-cy),P.x-(x-cx));ax=Math.cos(a);ay=Math.sin(a)}else if(dx||dy){ax=dx;ay=dy}
cx=lerp(cx,x-160+(on?ax*80:0),1-Math.pow(.01,dt));cy=lerp(cy,y-100+(on?ay*50:0),1-Math.pow(.01,dt));clr('#1f2333');G.save();G.translate(-cx,-cy);for(const d of dots)circ(d[0],d[1],d[2],'#2f3550');srect(0,0,WW,WH2,'#ffffff22',2);circ(x,y,7,BL);line(x,y,x+ax*22,y+ay*22,Y,2);G.restore();txt('Adelanto: '+(on?'SÍ':'NO'),8,10,11,on?GR:RD)}});
});

group('enc',()=>{
def('cam','Pantalla a pantalla','El mundo se divide en pantallas fijas; al salir por un borde la cámara salta a la siguiente, con corte seco o con deslizamiento.','The Legend of Zelda (1986), Prince of Persia (1989), Celeste','Cruceta para moverte. B alterna corte seco / deslizamiento.','D|B:Transición',()=>{
const obs=[];for(let i=0;i<30;i++)obs.push([R(0,960),R(0,400),R(6,16)]);let x=160,y=100,cx=0,cy=0,slide=1;
return dt=>{if(hit('b'))slide^=1;const[dx,dy]=dir();x=cl(x+dx*110*dt,4,956);y=cl(y+dy*110*dt,4,396);const tx=Math.floor(x/320)*320,ty=Math.floor(y/200)*200;if(slide){const k=1-Math.pow(.0005,dt);cx=lerp(cx,tx,k);cy=lerp(cy,ty,k);if(Math.abs(cx-tx)<.5)cx=tx;if(Math.abs(cy-ty)<.5)cy=ty}else{cx=tx;cy=ty}
clr('#1f3326');G.save();G.translate(-Math.round(cx),-Math.round(cy));for(let i=0;i<=3;i++)line(i*320,0,i*320,400,'#ffffff22',2);line(0,200,960,200,'#ffffff22',2);for(const o of obs)circ(o[0],o[1],o[2],'#3e5a44');circ(x,y,7,Y);G.restore();
for(let i=0;i<3;i++)for(let j=0;j<2;j++)rect(272+i*14,6+j*10,12,8,i==Math.floor(x/320)&&j==Math.floor(y/200)?Y:'#ffffff33');txt(slide?'Deslizamiento':'Corte seco',8,10,10,WH)}});

def('cam','Cámara sobre raíles','La cámara recorre un camino predefinido y el jugador solo apunta y dispara. Ritmo de atracción de feria muy controlado.','The House of the Dead, Star Fox, Rez','Toca las dianas antes de que te alcancen.','',()=>{
let t=0,Tg=[],sc=0,sp=0,ms=0,fl=0;return dt=>{t+=dt;sp-=dt;if(sp<=0){sp=R(.5,1.1);Tg.push({x:R(-1.2,1.2),y:R(-.6,.6),z:10})}const sway=Math.sin(t*.7)*.8,pj=(x,y,z)=>[160+(x-sway)/z*160,100+y/z*160];for(const o of Tg){o.z-=4*dt;if(o.z<.6){o.d=1;ms++;shake(3)}}
if(PT){fl=.12;let best=null;for(const o of Tg){const q=pj(o.x,o.y,o.z),r=.25/o.z*160;if(dist(P.x,P.y,q[0],q[1])<r+6&&(!best||o.z<best.z))best=o}if(best){best.d=1;sc++}}Tg=Tg.filter(o=>!o.d);fl-=dt;
clr('#0d0f1e');for(let i=0;i<10;i++){const z=10-((t*4+i)%10);if(z<.5)continue;const a=pj(-2,-1.2,z),b=pj(2,1.2,z);srect(a[0],a[1],b[0]-a[0],b[1]-a[1],'rgba(76,201,240,'+((1-z/10)*.6).toFixed(2)+')',1)}
for(const o of [...Tg].sort((a,b)=>b.z-a.z)){const q=pj(o.x,o.y,o.z),r=.25/o.z*160;circ(q[0],q[1],r,RD);circ(q[0],q[1],r*.55,WH);circ(q[0],q[1],r*.25,RD)}if(fl>0)ring(P.x,P.y,10,Y,2);txt('Aciertos '+sc+' · escapados '+ms,8,10,10)}});

def('cam','Pantalla dividida','Cada jugador tiene su propia ventana. La versión dinámica la une en una sola cuando los jugadores están cerca.','Mario Kart, Halo, LEGO Star Wars (división dinámica)','Mueve al jugador azul con la cruceta; el rojo va solo. B activa la fusión dinámica.','D|B:Fusión',()=>{
const WW=800,WH2=500,obs=[];for(let i=0;i<50;i++)obs.push([R(0,WW),R(0,WH2),R(5,14)]);const a={x:200,y:250},b={x:600,y:250,t:0};let dyn=1;
const view=(ox,oy,w,h,cx,cy)=>{G.save();G.beginPath();G.rect(ox,oy,w,h);G.clip();G.translate(ox+w/2-cx,oy+h/2-cy);rect(0,0,WW,WH2,'#1f3326');for(const o of obs)circ(o[0],o[1],o[2],'#3e5a44');circ(a.x,a.y,7,BL);circ(b.x,b.y,7,RD);G.restore()};
return dt=>{if(hit('b'))dyn^=1;const[dx,dy]=dir();a.x=cl(a.x+dx*120*dt,0,WW);a.y=cl(a.y+dy*120*dt,0,WH2);b.t+=dt;b.x=400+Math.cos(b.t*.5)*300;b.y=250+Math.sin(b.t*.8)*180;clr('#000');const near=dyn&&Math.abs(a.x-b.x)<260&&Math.abs(a.y-b.y)<160;
if(near)view(0,0,320,200,(a.x+b.x)/2,(a.y+b.y)/2);else{view(0,0,159,200,a.x,a.y);view(161,0,159,200,b.x,b.y);rect(159,0,2,200,WH)}txt((near?'Pantalla unida':'Pantalla dividida')+' · fusión '+(dyn?'SÍ':'NO'),8,10,10)}});

def('cam','Cámara libre de estrategia','La cámara no sigue a nadie: el jugador la desplaza y la acerca para supervisar todo el mapa.','StarCraft, Cities: Skylines, Civilization','Arrastra para desplazar. A acerca, B aleja.','D|A:Acercar|B:Alejar',()=>{
const WW=900,WH2=600,U=[];for(let i=0;i<40;i++)U.push([R(0,WW),R(0,WH2),[BL,RD,GR][RI(0,2)]]);let cx=450,cy=300,z=1,drag=null;
return dt=>{const[dx,dy]=dir();cx+=dx*200*dt/z;cy+=dy*200*dt/z;if(PT)drag={x:P.x,y:P.y,cx,cy};if(drag&&P.down){cx=drag.cx-(P.x-drag.x)/z;cy=drag.cy-(P.y-drag.y)/z}if(!P.down)drag=null;if(key('a'))z=Math.min(2.5,z*Math.pow(2,dt));if(key('b'))z=Math.max(.4,z/Math.pow(2,dt));cx=cl(cx,0,WW);cy=cl(cy,0,WH2);
clr('#101a14');G.save();G.translate(160,100);G.scale(z,z);G.translate(-cx,-cy);rect(0,0,WW,WH2,'#1a2a1f');for(let i=0;i<=WW;i+=50)line(i,0,i,WH2,'#ffffff10',1/z);for(let j=0;j<=WH2;j+=50)line(0,j,WW,j,'#ffffff10',1/z);for(const u of U)circ(u[0],u[1],6,u[2]);G.restore();
const s=72/WW;rect(242,148,76,50,'#000b');for(const u of U)rect(244+u[0]*s,150+u[1]*s,1.5,1.5,u[2]);srect(244+(cx-160/z)*s,150+(cy-100/z)*s,320/z*s,200/z*s,WH);txt('Zoom ×'+z.toFixed(1),8,10,10)}});

def('cam','Cámara cinemática','Al cruzar un punto concreto, el juego toma el control de la cámara para enseñar algo importante y luego te la devuelve. Las bandas negras avisan del cambio.','Uncharted, Halo, Super Mario Galaxy','Camina hacia la derecha. B reinicia la escena.','H|A:Saltar|B:Reset',()=>{
const WW=900,S=[{x:0,y:184,w:WW,h:16},{x:-10,y:-200,w:10,h:400},{x:WW,y:-200,w:10,h:400}];let b,cx,cin,done,door;const reset=()=>{b=body(40,160);cx=0;cin=-1;done=0;door=1};reset();
return dt=>{if(hit('b'))reset();let lb=0;if(cin>=0){cin+=dt;const dX=640,t=cin;b.vx=0;if(t<1.2)cx=lerp(b.x-154,dX,ease(t/1.2));else if(t<2.2){cx=dX;door=Math.max(0,1-(t-1.2))}else if(t<3.2)cx=lerp(dX,b.x-154,ease(t-2.2));else{cin=-1;done=1}lb=t<.3?t/.3:t>2.9?(3.2-t)/.3:1}else{walk(b,130);if(hit('a')&&b.g)b.vy=-300;cx=lerp(cx,b.x-154,.1);if(!done&&b.x>250)cin=0}
const D=door>0?[{x:800,y:184-90*door,w:16,h:90*door}]:[];phys(b,[...S,...D],dt);cx=cl(cx,0,WW-320);
clr('#1b1430');G.save();G.translate(-Math.round(cx),0);for(let i=0;i<WW;i+=60)rect(i,60,30,124,'#231a3d');drawS(S);if(!done)rect(256,180,4,4,Y);for(const d of D)rect(d.x,d.y,d.w,d.h,OR);rect(860,150,14,34,GR);hero(b);G.restore();rect(0,0,320,26*lb,'#000');rect(0,200-26*lb,320,26*lb,'#000');txt(cin>=0?'La cámara toma el control…':done?'Puerta abierta: sigue':'Camina hacia la derecha',8,cin>=0?190:10,10,cin>=0?WH:GY)}});
});

tag('seg','cam',['Cámara con zona muerta y anticipación','Zoom dinámico']);

// ================= VARIANTES: CERRADURAS =================
rename('Forzar cerraduras','Ángulo y tensión');
tag('lock',null,['Ángulo y tensión']);
group('lock',()=>{
def('act','Pines uno a uno','Cada pin sube al empujarlo y cae al poco tiempo; hay que fijarlo justo cuando está arriba. Fallar rompe la ganzúa y suelta un pin.','The Elder Scrolls IV: Oblivion, Thief: Deadly Shadows, Sea of Thieves (en espíritu)','◀▶ o toca un pin para empujarlo; vuelve a pulsar cuando esté arriba del todo (amarillo).','H|A:Pin',()=>{
const n=5;let pins,sel=0,broke=0,opened=0,msg='';const reset=()=>{pins=Array.from({length:n},()=>({s:0,h:0,t:0,lk:0,sp:R(2,6)}));sel=0};reset();
return dt=>{if(hit('l'))sel=Math.max(0,sel-1);if(hit('r'))sel=Math.min(n-1,sel+1);let act=hit('a');if(PT){const i=Math.floor((P.x-60)/40);if(i>=0&&i<n){sel=i;act=true}}
for(const p of pins){if(p.lk)continue;if(p.s==1){p.h+=dt*5;if(p.h>=1){p.h=1;p.s=2;p.t=R(.12,.4)}}else if(p.s==2){p.t-=dt;if(p.t<=0)p.s=3}else if(p.s==3){p.h-=dt*p.sp;if(p.h<=0){p.h=0;p.s=0;p.sp=R(2,6)}}}
if(act){const p=pins[sel];if(!p.lk){if(p.s==0)p.s=1;else if(p.s==2){p.lk=1;msg='Pin fijado'}else{broke++;msg='¡Ganzúa rota!';shake(3);const l=pins.filter(q=>q.lk);if(l.length){const q=l[l.length-1];q.lk=0;q.s=3}}}}if(pins.every(p=>p.lk)){opened++;reset();msg='¡Abierta!'}
clr();rect(46,40,228,130,'#6b7290');rect(52,46,216,118,'#2a2e44');pins.forEach((p,i)=>{const x=60+i*40;rect(x,52,24,100,'#1b1e2e');const h=p.lk?1:p.h,c=p.lk?GR:p.s==2?Y:'#c9a36b';rect(x+4,128-h*60,16,24,c);rect(x+8,152-h*60,8,h*60+0,'#8a6a3a');if(i==sel)srect(x-2.5,49.5,29,107,WH,1.5)});txt('Abiertas '+opened+' · ganzúas rotas '+broke,8,12,10,GY);txt(msg,312,12,10,msg[0]=='¡'&&msg[1]=='G'?RD:GR,'right')}});

def('act','Caja fuerte de combinación','Giras el dial escuchando: cuanto más cerca del número correcto, más fuerte suena el mecanismo. Tres números seguidos abren la caja.','Payday 2, Hitman, Splinter Cell','◀▶ o arrastra en círculo para girar. Pulsa Probar cuando la señal sea máxima.','H|A:Probar',()=>{
let ang=0,comb,step,msg='',opened=0,lastA=0;const nw=()=>{comb=[RI(0,39),RI(0,39),RI(0,39)];step=0};nw();
return dt=>{ang+=((key('r')?1:0)-(key('l')?1:0))*1.2*dt;if(P.down&&dist(P.x,P.y,140,100)<80){const a=Math.atan2(P.y-100,P.x-140);if(!PT){let d=a-lastA;if(d>Math.PI)d-=6.283;if(d<-Math.PI)d+=6.283;ang+=d}lastA=a}
const num=((Math.round(-ang/(6.283/40))%40)+40)%40,dd=Math.abs(num-comb[step]),cd=Math.min(dd,40-dd),close=Math.max(0,1-cd/7);let tryIt=hit('a');
clr();if(btn(240,150,72,30,'Probar'))tryIt=true;if(tryIt){if(cd==0){step++;msg='¡Clac! ('+step+'/3)';shake(2);if(step==3){opened++;msg='¡Caja abierta!';nw()}}else{msg='Nada… vuelve a empezar';step=0}}
circ(140,100,72,'#3a3f5c');circ(140,100,62,'#23263a');for(let i=0;i<40;i++){const a=ang+i*6.283/40-Math.PI/2,r1=i%5?56:50;line(140+Math.cos(a)*r1,100+Math.sin(a)*r1,140+Math.cos(a)*60,100+Math.sin(a)*60,'#9aa3c7',1);if(i%10==0)txt(i,140+Math.cos(a)*40,100+Math.sin(a)*40,9,WH,'center')}G.fillStyle=RD;G.beginPath();G.moveTo(134,24);G.lineTo(146,24);G.lineTo(140,32);G.fill();circ(140,100,10,'#6b7290');txt(num,140,100,9,WH,'center');
for(let i=0;i<8;i++){const h=(close*28+R(-2,2)*close)*(1-Math.abs(i-3.5)/5);rect(240+i*9,90-h,6,h*2,close>.95?GR:Y)}txt('Señal',240,60,10,GY);for(let i=0;i<3;i++)circ(250+i*16,124,5,i<step?GR:'#3a3f5c');txt(msg,8,190,10,msg[0]=='¡'?GR:GY);txt('Abiertas '+opened,8,12,10,GY)}});

def('act','Seguir el punto dulce','El punto exacto donde la ganzúa encaja se mueve mientras giras la cerradura; tienes que perseguirlo sin perderlo.','Kingdom Come: Deliverance, Kingdom Come: Deliverance II, Hogwarts Legacy (en espíritu)','Mantén el dedo encima del punto verde mientras gira (o cruceta + A).','D|A:Girar',()=>{
let cx=160,cy=100,sa=0,prog=0,dur=1,msg='',ok=0,t=0;return dt=>{t+=dt;sa+=dt*(.8+Math.sin(t*.7)*.6);const rr=40+Math.sin(t*1.3)*15,sx=160+Math.cos(sa)*rr,sy=100+Math.sin(sa)*rr*.8;const[dx,dy]=dir();cx=cl(cx+dx*100*dt,70,250);cy=cl(cy+dy*100*dt,20,180);if(P.down){cx=lerp(cx,P.x,.35);cy=lerp(cy,P.y,.35)}
const turning=key('a')||P.down,inside=dist(cx,cy,sx,sy)<15;if(turning){if(inside)prog+=dt*.22;else{dur-=dt*.5;prog=Math.max(0,prog-dt*.3)}}if(prog>=1){ok++;msg='¡Abierta!';prog=0}if(dur<=0){msg='Ganzúa rota';dur=1;prog=0}
clr();circ(160,100,82,'#6b7290');circ(160,100,74,'#2a2e44');G.save();G.translate(160,100);G.rotate(prog*Math.PI/2);rect(-5,-22,10,30,'#111');circ(0,-24,9,'#111');G.restore();circ(sx,sy,15,'#7ae58244');circ(sx,sy,4,GR);ring(cx,cy,6,inside?GR:Y,2);bar(8,8,80,5,dur,dur>.3?GR:RD);bar(8,18,80,5,prog,BL);txt('Ganzúa',94,10,9,GY);txt('Giro',94,20,9,GY);txt('Abiertas '+ok+' '+msg,8,190,10,Y)}});

def('act','Secuencia izquierda-derecha','La cerradura esconde una combinación de giros a izquierda y derecha. Un error la reinicia y puede partir la ganzúa: se resuelve por ensayo y memoria.','Gothic, Gothic II, Risen','Toca la mitad izquierda o derecha (o ◀▶).','H',()=>{
let seq,pos,picks=5,ok=0,msg='',fl=0,fc=GR;const nw=()=>{seq=Array.from({length:6},()=>RI(0,1));pos=0};nw();
return dt=>{fl-=dt;let k=-1;if(hit('l'))k=0;if(hit('r'))k=1;if(PT&&P.y<150)k=P.x<160?0:1;clr();if(picks<=0){if(btn(100,160,120,28,'Comprar 5 ganzúas'))picks=5}else if(k>=0){if(seq[pos]==k){pos++;fl=.2;fc=GR;if(pos==seq.length){ok++;msg='¡Abierta!';nw()}else msg='Clic…'}else{pos=0;fl=.3;fc=RD;msg='Se reinicia';if(Math.random()<.35){picks--;msg='¡Ganzúa rota!';shake(3)}}}
rect(0,0,160,150,'#ffffff06');rect(160,0,160,150,'#ffffff0c');txt('◀ Izquierda',80,40,13,GY,'center');txt('Derecha ▶',240,40,13,GY,'center');circ(160,85,30,fl>0?fc:'#6b7290');rect(156,85,8,22,'#111');circ(160,82,7,'#111');for(let i=0;i<6;i++)rect(100+i*20,128,14,8,i<pos?GR:'#3a3f5c');txt('Ganzúas '+picks+' · abiertas '+ok,8,190,10,GY);txt(msg,312,190,10,msg[0]=='¡'&&msg[1]=='G'?RD:Y,'right')}});

def('act','Anillos concéntricos','Varios anillos giran y hay que alinear sus muescas; mover uno arrastra a otro, así que es un pequeño puzle de combinaciones.','Starfield (digipick), Lockpick puzzles de Assassin’s Creed Valhalla (en espíritu), cajas fuertes de juegos de escape','Toca un anillo en su lado izquierdo o derecho para girarlo (o ▲▼ para elegir y ◀▶ para girar).','D',()=>{
const N=12;let k,sel=0,ok=0,mv=0;const nw=()=>{k=[0,0,0];for(let i=0;i<8;i++){const r=RI(0,2),d=Math.random()<.5?1:-1;k[r]=(k[r]+d+N)%N;k[(r+1)%3]=(k[(r+1)%3]-d+N)%N}if(k.every(v=>v==0))k[0]=1,k[1]=N-1;mv=0};nw();
return dt=>{if(hit('u'))sel=Math.min(2,sel+1);if(hit('d'))sel=Math.max(0,sel-1);let r=0;if(hit('l'))r=-1;if(hit('r'))r=1;if(PT){const d=dist(P.x,P.y,160,100),i=[34,56,78].findIndex(v=>Math.abs(d-v)<11);if(i>=0){sel=i;r=P.x<160?-1:1}}if(r){k[sel]=(k[sel]+r+N)%N;k[(sel+1)%3]=(k[(sel+1)%3]-r+N)%N;mv++}const won=k.every(v=>v==0);if(won&&mv&&(PT||hit('a'))){ok++;nw()}
clr();[34,56,78].forEach((rr,i)=>{const a=-Math.PI/2+k[i]*6.283/N;G.strokeStyle=i==sel?Y:'#9aa3c7';G.lineWidth=8;G.beginPath();G.arc(160,100,rr,a+.3,a+6.283-.3);G.stroke()});G.fillStyle=won?GR:RD;G.beginPath();G.moveTo(154,6);G.lineTo(166,6);G.lineTo(160,16);G.fill();txt(won?'¡Alineados! Toca para otra':'Movimientos '+mv,8,190,10,won?GR:GY);txt('Abiertas '+ok,8,12,10,GY)}});

def('act','Tirada de habilidad','No hay minijuego: se lanza un dado, se suma tu destreza y se compara con la dificultad de la cerradura. El reto está en decidir si arriesgar tus ganzúas.','Baldur’s Gate 3, Fallout (clásicos), Pathfinder','Pulsa Tirar. La ventaja tira dos dados y se queda con el mayor.','',()=>{
let bonus=3,dc=15,picks=5,roll=[0],msg='',adv=false,ok=0,anim=0;const chance=()=>{const need=dc-bonus,p=cl((21-need)/20,.05,.95);return adv?1-(1-p)*(1-p):p};
return dt=>{anim-=dt;clr();txt('Dificultad '+dc,8,14,13,Y);txt('Destreza +'+bonus+' · ganzúas '+picks,8,32,10,GY);txt('Probabilidad de éxito: '+Math.round(chance()*100)+'%',8,48,10,GR);
const show=anim>0?RI(1,20):Math.max(...roll);G.fillStyle=anim>0?'#3a3f5c':msg[0]=='¡'?'#2f5a3a':'#5a2f2f';G.beginPath();for(let i=0;i<6;i++){const a=i/6*6.283-Math.PI/2;G.lineTo(240+Math.cos(a)*38,62+Math.sin(a)*38)}G.fill();if(show)txt(show,240,62,22,WH,'center');
let pk=0;if(btn(8,110,100,30,'Tirar d20',picks?'#2f3550':'#1b1e2e')&&picks)pk=1;if(btn(116,110,100,30,'Ventaja: '+(adv?'sí':'no'),adv?'#4a2f5a':'#23263a'))adv=!adv;if(btn(224,110,90,30,'Otra cerradura')){dc=[10,15,20][RI(0,2)];msg=''}if(picks==0&&btn(8,150,140,26,'Recuperar ganzúas'))picks=5;
if(pk){roll=adv?[RI(1,20),RI(1,20)]:[RI(1,20)];anim=.5;const r=Math.max(...roll),tot=r+bonus;if(r==20){msg='¡Crítico! Abierta';ok++}else if(r==1){msg='Pifia: ganzúa rota';picks--}else if(tot>=dc){msg='¡Abierta! ('+r+'+'+bonus+'='+tot+')';ok++}else{msg='Fallo ('+r+'+'+bonus+'='+tot+'): ganzúa rota';picks--;shake(2)}}if(anim<=0)txt(msg,8,190,11,msg[0]=='¡'?GR:RD)}});
});

// ================= VARIANTES: HACKEO =================
tag('hack',null,['Conectar cables']);
group('hack',()=>{
def('act','Adivinar la contraseña','Una lista de palabras posibles; al probar una, el terminal dice cuántas letras coinciden en posición. Deducción con intentos limitados.','Fallout 3, Fallout: New Vegas, Fallout 4','Toca una palabra. Tienes 4 intentos.','',()=>{
const POOL=['PIEDRA','PUERTA','CAMINO','FUERZA','TIERRA','CIUDAD','MUNDOS','CARTAS','VENTAS','LLAVES','TIEMPO','HUELLA','CUERPO','MADERA','NOCHES','CENTRO'];let ws,pw,tries,log,done,used;const nw=()=>{ws=[...POOL].sort(()=>Math.random()-.5).slice(0,8);pw=ws[RI(0,7)];tries=4;log=[];done='';used=new Set()};nw();const lk=(a,b)=>[...a].filter((c,i)=>b[i]==c).length;
return dt=>{clr('#06140a');let pk=null;ws.forEach((w,i)=>{if(btn(8+(i%2)*100,24+Math.floor(i/2)*34,94,28,w,used.has(w)?'#0a2010':'#0f3a1c'))pk=w});if(pk){if(done)nw();else if(!used.has(pk)){used.add(pk);if(pk==pw)done='ACCESO PERMITIDO';else{tries--;log.unshift(pk+'  '+lk(pk,pw)+'/6');if(!tries)done='TERMINAL BLOQUEADO'}}}
txt('Intentos: '+'■ '.repeat(tries),8,12,10,'#7ae582');log.slice(0,6).forEach((l,i)=>txt(l,212,30+i*16,10,'#7ae582'));txt('Coinciden',212,14,9,'#3f8a54');if(done)txt(done+' · toca una palabra',8,184,11,done[0]=='A'?'#b7ffcf':RD)}});

def('act','Protocolo de intrusión','Una matriz de códigos: eliges alternando fila y columna desde tu última elección e intentas formar la secuencia objetivo antes de llenar el búfer.','Cyberpunk 2077','Elige en la línea resaltada; forma la secuencia de la derecha.','',()=>{
const CO=['1C','55','BD','E9','7A'],S=30,ox=10,oy=30;let g,tgt,buf,mode,idx,done,used;const nw=()=>{g=Array.from({length:25},()=>CO[RI(0,4)]);const c0=RI(0,4),r1=RI(1,4);let c2=RI(0,4);if(c2==c0)c2=(c2+1)%5;tgt=[g[c0],g[r1*5+c0],g[r1*5+c2]];buf=[];mode='row';idx=0;done='';used=new Set()};nw();
return dt=>{if(PT){if(done)nw();else{const x=Math.floor((P.x-ox)/S),y=Math.floor((P.y-oy)/S),i=y*5+x;if(x>=0&&x<5&&y>=0&&y<5&&!used.has(i)&&(mode=='row'?y==idx:x==idx)){buf.push(g[i]);used.add(i);if(mode=='row'){mode='col';idx=x}else{mode='row';idx=y}if(buf.join().includes(tgt.join()))done='¡Intrusión completada!';else if(buf.length>=6)done='Búfer lleno: fallo'}}}
clr('#0e0b1a');for(let i=0;i<25;i++){const x=i%5,y=Math.floor(i/5),al=!done&&(mode=='row'?y==idx:x==idx);rect(ox+x*S,oy+y*S,S-2,S-2,al?'#2a2f55':'#16142a');txt(used.has(i)?'[ ]':g[i],ox+x*S+S/2-1,oy+y*S+S/2-1,10,used.has(i)?GY:al?'#e7f56b':'#9aa3c7','center')}
txt('Búfer',170,30,9,GY);for(let i=0;i<6;i++){srect(170+i*24,38,20,18,'#3a3f5c');if(buf[i])txt(buf[i],180+i*24,47,9,'#e7f56b','center')}txt('Secuencia objetivo',170,74,9,GY);tgt.forEach((c,i)=>txt(c,180+i*26,90,11,'#4cc9f0','center'));txt(done||'Primera elección: fila superior',170,130,10,done?(done[0]=='¡'?GR:RD):WH);if(done)txt('Toca para otra',170,146,9,GY)}});

def('act','Capturar nodos contra el rastreo','Avanzas por una red capturando nodos conectados; cada captura puede alertar al sistema, que empieza a rastrearte. Gana la carrera hasta el servidor.','Deus Ex: Human Revolution, Deus Ex: Mankind Divided','Toca un nodo conectado a los tuyos (azules) para capturarlo hasta llegar al servidor.','',()=>{
const Nd=[{x:30,y:100},{x:100,y:45},{x:100,y:155},{x:170,y:100},{x:240,y:45},{x:240,y:155},{x:295,y:100}],E=[[0,1],[0,2],[1,3],[2,3],[1,4],[3,4],[3,5],[2,5],[4,6],[5,6]];let cap,cur,ct,det,tr,msg;const nw=()=>{cap=new Set([0]);cur=-1;ct=0;det=false;tr=0;msg=''};nw();const adj=a=>E.filter(e=>e.includes(a)).map(e=>e[0]==a?e[1]:e[0]);
return dt=>{if(msg){if(PT)nw()}else{if(PT&&cur<0){const i=Nd.findIndex(n=>dist(P.x,P.y,n.x,n.y)<18);if(i>=0&&!cap.has(i)&&[...cap].some(c=>adj(c).includes(i))){cur=i;ct=0}}if(cur>=0){ct+=dt/(cur==6?2.2:1.3);if(ct>=1){cap.add(cur);if(!det&&Math.random()<.35){det=true;shake(2)}if(cur==6)msg='¡Acceso concedido!';cur=-1}}if(det){tr+=dt*.12;if(tr>=1)msg='Rastreo completado: te han localizado'}}
clr('#0b1220');for(const[a,b]of E)line(Nd[a].x,Nd[a].y,Nd[b].x,Nd[b].y,cap.has(a)&&cap.has(b)?BL:'#2a3550',2);Nd.forEach((n,i)=>{circ(n.x,n.y,13,cap.has(i)?BL:i==6?'#5a2f2f':'#2f3550');if(i==cur){G.strokeStyle=Y;G.lineWidth=3;G.beginPath();G.arc(n.x,n.y,16,-Math.PI/2,-Math.PI/2+ct*6.283);G.stroke()}txt(i==6?'SRV':i==0?'TÚ':'',n.x,n.y,8,WH,'center')});
txt(det?'¡Detectado! Rastreo:':'Sin detectar',8,12,10,det?RD:GR);if(det)bar(120,8,120,6,tr,RD);if(msg)txt(msg+' · toca',160,190,10,msg[0]=='¡'?GR:RD,'center')}});

def('act','Sintonizar la señal','Ajustas frecuencia y amplitud de una onda hasta que encaja con la señal objetivo y la mantienes estable un momento.','Signalis (radio), Marvel’s Spider-Man (puzles de laboratorio)','Arrastra: horizontal = frecuencia, vertical = amplitud (o cruceta).','D',()=>{
let f=1.5,a=25,tf,ta,hold=0,ok=0;const nw=()=>{tf=R(.6,2.6);ta=R(10,40);f=1.5;a=25;hold=0};nw();
return dt=>{f=cl(f+((key('r')?1:0)-(key('l')?1:0))*.8*dt,.4,3);a=cl(a+((key('u')?1:0)-(key('d')?1:0))*20*dt,5,50);if(P.down){f=cl(.4+P.x/320*2.6,.4,3);a=cl(55-P.y/200*50,5,50)}const err=Math.abs(f-tf)/2.6+Math.abs(a-ta)/45,match=err<.04;hold=match?hold+dt:Math.max(0,hold-dt);if(hold>1){ok++;nw()}
clr('#0b1220');for(let x=0;x<320;x+=40)line(x,20,x,180,'#16203a',1);G.setLineDash([3,4]);G.strokeStyle=GY;G.lineWidth=2;G.beginPath();for(let x=0;x<=320;x+=4){const yy=100+Math.sin(x/320*6.283*tf*2+T*2)*ta;x?G.lineTo(x,yy):G.moveTo(x,yy)}G.stroke();G.setLineDash([]);G.strokeStyle=match?GR:BL;G.beginPath();for(let x=0;x<=320;x+=4){const yy=100+Math.sin(x/320*6.283*f*2+T*2)*a;x?G.lineTo(x,yy):G.moveTo(x,yy)}G.stroke();
bar(8,8,100,6,1-err*4,match?GR:Y);txt('Calidad de señal',114,10,9,GY);bar(8,186,100,6,hold,GR);txt('Señales fijadas: '+ok,114,189,10)}});
});

// ================= VARIANTES: PESCA =================
rename('Pesca con tensión','Tensión del sedal');tag('fish',null,['Tensión del sedal']);
group('fish',()=>{
def('act','Mantener al pez en la barra','El pez se mueve a saltos por una columna y tú controlas una barra con gravedad; mientras lo cubres, avanza la captura.','Stardew Valley, Sun Haven, Coral Island','Mantén el dedo o A para subir la barra verde.','A:Subir',()=>{
let fy=.5,fv=0,fT=.5,by=.3,bv=0,prog=.3,st=1,msg='',caught=0;const bh=.25;return dt=>{if(st){if(Math.random()<dt*1.5)fT=R(0,1);fv+=(fT-fy)*8*dt;fv*=Math.pow(.2,dt);fy=cl(fy+fv*dt,0,1);bv+=((key('a')||P.down)?2.2:-1.8)*dt;by+=bv*dt;if(by<0){by=0;bv=-bv*.3}if(by>1-bh){by=1-bh;bv=0}const inn=fy>=by&&fy<=by+bh;prog=cl(prog+(inn?.25:-.18)*dt,0,1);if(prog>=1){st=0;caught++;msg='¡Pez capturado!'}else if(prog<=0){st=0;msg='Se escapó'}}else if(PT||hit('a')){st=1;prog=.3;fy=.5;by=.3;bv=0;fv=0;msg=''}
clr('#0e3a5a');rect(130,18,40,164,'#1b1e2e');rect(132,180-(by+bh)*160,36,bh*160,'#7ae582aa');circ(150,180-fy*160,7,OR);rect(176,18,8,164,'#1b1e2e');rect(176,182-prog*164,8,prog*164,prog>.6?GR:Y);txt('Capturados '+caught,8,12,10);if(!st)txt(msg+' · toca para otro',160,100,12,Y,'center')}});

def('act','Esperar el picado real','El corcho se mueve varias veces con mordisqueos falsos; solo hay que tirar cuando se hunde de verdad. Paciencia contra reflejos.','Animal Crossing, Zelda: Ocarina of Time, Pokémon (caña)','Toca para lanzar y vuelve a tocar solo cuando el corcho se hunda del todo.','A:Tirar',()=>{
let st=0,t=0,msg='Toca para lanzar',bob=0,caught=0,rings=[];return dt=>{t-=dt;bob=Math.max(0,bob-dt*4);const tap=PT||hit('a');if(st==0){if(tap){st=1;t=R(1,2);msg='Espera…'}}else if(st==1){if(tap){st=0;msg='¡Demasiado pronto! Huyó. Toca para lanzar'}else if(t<=0){if(Math.random()<.35){st=2;t=.6;rings.push(0)}else{bob=.6;t=R(.5,1.2);rings.push(0)}}}else if(st==2){if(tap){st=0;caught++;msg='¡Lo pescaste! ('+caught+')'}else if(t<=0){st=0;msg='Tardaste demasiado. Toca para lanzar'}}
clr('#7ec8e3');rect(0,70,320,130,'#1f5f8a');G.globalAlpha=.25;G.fillStyle='#000';G.beginPath();G.ellipse(210,150,22,8,0,0,7);G.fill();G.globalAlpha=1;for(let i=rings.length;i--;){rings[i]+=dt*40;ring(200,100,rings[i],'rgba(255,255,255,'+Math.max(0,1-rings[i]/40)+')',1.5);if(rings[i]>40)rings.splice(i,1)}
if(st>0){const yy=st==2?110:96+bob*6;line(20,10,200,yy,'#ffffff88',1);circ(200,yy,5,st==2?'#a33':RD);if(st!=2)rect(195,yy-6,10,4,WH)}txt(msg,8,190,10,WH)}});
});

// ================= VARIANTES: INVENTARIO Y FABRICACIÓN =================
tag('inv',null,['Inventario en cuadrícula','Peso y carga','Equipo y estadísticas']);
group('inv',()=>{
def('rpg','Ranuras y pilas','Un número fijo de huecos donde los objetos iguales se apilan hasta un máximo distinto según su tipo. Simple y muy legible.','Minecraft, Terraria, The Legend of Zelda: BotW','Recoge objetos con los botones de arriba; toca una ranura para tirar uno.','',()=>{
const IT=[['Madera','#c77d4f',20],['Piedra','#9aa3c7',20],['Poción',RD,5],['Espada',BL,1],['Gema',PU,10]];const slots=Array(8).fill(null);let msg='';const add=k=>{const s=slots.find(s=>s&&s.k==k&&s.n<IT[k][2]);if(s){s.n++;return true}const i=slots.indexOf(null);if(i>=0){slots[i]={k,n:1};return true}return false};
return dt=>{clr();let pk=-1;IT.forEach((it,i)=>{if(btn(6+i*62,8,58,26,'+'+it[0],it[1]+'44'))pk=i});if(pk>=0)msg=add(pk)?'':'¡Inventario lleno!';
slots.forEach((s,i)=>{const x=24+(i%4)*70,y=50+Math.floor(i/4)*64;rect(x,y,60,56,'#1f2333');srect(x+.5,y+.5,59,55,'#3a3f5c');if(s){rect(x+14,y+10,32,28,IT[s.k][1]);txt(s.n,x+52,y+46,11,WH,'right');txt(IT[s.k][0],x+30,y+46,8,GY,'center')}if(PT&&s&&inR(P.x,P.y,x,y,60,56)){s.n--;if(!s.n)slots[i]=null}});txt(msg||'Pila máx.: madera y piedra 20 · gemas 10 · pociones 5 · espadas 1',8,190,9,msg?RD:GY)}});
});

rename('Fabricación (crafteo)','Recetas fijas');tag('craft',null,['Recetas fijas']);
group('craft',()=>{
def('rpg','Descubrir combinando','No hay lista de recetas: combinas elementos libremente y cada acierto desbloquea uno nuevo. La curiosidad es la mecánica.','Little Alchemy, Doodle God, Infinite Craft','Toca dos elementos para combinarlos.','',()=>{
const RC={},add=(a,b,c)=>RC[[a,b].sort().join('+')]=c;[['Agua','Fuego','Vapor'],['Agua','Tierra','Barro'],['Aire','Fuego','Energía'],['Fuego','Tierra','Lava'],['Agua','Aire','Lluvia'],['Aire','Tierra','Polvo'],['Barro','Fuego','Ladrillo'],['Agua','Lava','Piedra'],['Lluvia','Tierra','Planta'],['Energía','Planta','Vida'],['Ladrillo','Ladrillo','Muro'],['Muro','Muro','Casa'],['Fuego','Piedra','Metal'],['Energía','Metal','Robot']].forEach(r=>add(...r));
const known=['Agua','Fuego','Tierra','Aire'];let sel=[],msg='';const total=4+Object.keys(RC).length;
return dt=>{clr();let pk=null;known.forEach((k,i)=>{if(btn(6+(i%4)*78,6+Math.floor(i/4)*25,74,22,k,sel[0]==k?'#4a2f5a':'#23263a'))pk=k});if(pk){sel.push(pk);if(sel.length==2){const r=RC[[...sel].sort().join('+')];if(r&&!known.includes(r)){known.push(r);msg='¡Nuevo: '+r+'!'}else msg=r?r+' (ya lo tenías)':sel.join(' + ')+': no pasa nada';sel=[]}}
txt('Descubiertos '+known.length+'/'+total,8,178,10,Y);txt(msg,8,192,10,msg[0]=='¡'?GR:GY);if(sel[0])txt(sel[0]+' + …',312,178,10,PU,'right')}});

def('rpg','Patrón en rejilla','Colocas los materiales en una rejilla de 3×3 y la forma que dibujan decide el objeto, no solo los ingredientes.','Minecraft, Terraria (en parte), Valheim (en espíritu)','Elige material abajo y toca casillas. Prueba un pico: tres piedras arriba y dos palos en el centro.','',()=>{
const MT={M:['Madera','#c77d4f'],S:['Palo','#e9c46a'],P:['Piedra','#9aa3c7']},PT_={Pico:['PPP','.S.','.S.'],Hacha:['PP','PS','.S'],Espada:['P','P','S'],Mesa:['MM','MM'],Palos:['M','M']};let g=Array(9).fill('.'),mat='P',inv=[];
const norm_=()=>{let r0=3,r1=-1,c0=3,c1=-1;for(let i=0;i<9;i++)if(g[i]!='.'){const r=(i/3)|0,c=i%3;r0=Math.min(r0,r);r1=Math.max(r1,r);c0=Math.min(c0,c);c1=Math.max(c1,c)}if(r1<0)return'';const rows=[];for(let r=r0;r<=r1;r++){let s='';for(let c=c0;c<=c1;c++)s+=g[r*3+c];rows.push(s)}return rows.join('/')};
return dt=>{clr();for(let i=0;i<9;i++){const x=20+(i%3)*44,y=14+Math.floor(i/3)*44;if(btn(x,y,40,40,'',g[i]=='.'?'#1f2333':MT[g[i]][1]))g[i]=g[i]==mat?'.':mat}const sh=norm_(),res=Object.keys(PT_).find(k=>PT_[k].join('/')==sh);
txt('→',170,80,20,WH,'center');srect(196.5,58.5,60,44,res?Y:GY,1.5);txt(res||'?',226,80,11,res?Y:GY,'center');if(btn(196,110,80,26,'Fabricar',res?'#3b4a2f':'#23263a')&&res){inv.push(res);g=Array(9).fill('.')}
let x=20;for(const k in MT){if(btn(x,160,64,28,MT[k][0],k==mat?MT[k][1]+'aa':'#23263a'))mat=k;x+=70}wrap('Hecho: '+(inv.slice(-3).join(', ')||'nada'),236,150,80,9,GY)}});
});

// ================= VARIANTES: DIÁLOGOS =================
rename('Diálogo con opciones','Árbol de opciones');tag('dlg',null,['Árbol de opciones']);
group('dlg',()=>{
def('nar','Rueda de diálogo','Las respuestas se colocan siempre en la misma posición según su tono (amable arriba, agresiva abajo, preguntas a la izquierda), así eliges la intención sin leer cada frase entera.','Mass Effect, Dragon Age II, Fallout 4','Toca una opción de la rueda.','',()=>{
const ND=[['Un mercenario bloquea la puerta: «No pasas sin pagar.»',[['ur','Podemos llegar a un acuerdo.',[1,0],1],['r','Busco al capitán.',[0,0],1],['dr','(Apartarlo de un empujón)',[0,1],2],['l','¿Quién te paga?',[0,0],3]]],['«Cincuenta créditos y el paso es tuyo.»',[['ur','Toma, y cuídate.',[1,0],4],['r','Me lo pensaré.',[0,0],0],['dr','Ni un crédito.',[0,1],2]]],['«¡Eh, tranquilo!» Se aparta asustado.',[['r','Sigamos.',[0,0],0]]],['«El gremio. No hagas más preguntas.»',[['l','Volver',[0,0],0]]],['«Adelante. Y gracias.»',[['r','Empezar de nuevo',[0,0],0]]]],POS={ur:[178,100],r:[192,134],dr:[178,168],ul:[8,100],l:[8,134]};let n=0,pa=0,re=0;
return dt=>{clr('#141022');const d=ND[n];wrap(d[0],10,16,300,11);circ(160,134,8,'#3a3f5c');let pk=null;for(const o of d[1]){const p=POS[o[0]];if(btn(p[0],p[1]-12,124,24,'',o[0][0]=='u'?'#1f3a5a':o[0][0]=='d'?'#5a2f2f':o[0]=='l'?'#3a2f5a':'#2f3550'))pk=o;wrap(o[1],p[0]+5,p[1],116,8,WH);line(160,134,p[0]<160?p[0]+124:p[0],p[1],'#ffffff22',1)}if(pk){pa+=pk[2][0];re+=pk[2][1];n=pk[3]}
txt('Diplomacia '+pa,10,190,10,BL);txt('Intimidación '+re,110,190,10,RD);txt('Arriba: amable · abajo: duro · izquierda: preguntar',210,58,8,GY)}});

def('nar','Tiradas de habilidad en el diálogo','Algunas respuestas solo funcionan si superas una tirada basada en tus habilidades; el juego muestra la probabilidad antes de arriesgarte.','Disco Elysium, Baldur’s Gate 3, Pillars of Eternity','Elige una opción: verás la probabilidad y luego la tirada de 2d6.','',()=>{
const SK={'Lógica':3,'Empatía':2,'Autoridad':4},OPT=[['Empatía',10,'«Estás temblando. ¿Tienes miedo?»','Rompe a llorar y te cuenta lo que vio.','Te mira con desprecio: «No me psicoanalices.»'],['Lógica',12,'«Las huellas del barro no son tuyas.»','Palidece: «Vale… estaba con alguien.»','Se encoge de hombros: «Hay mucho barro aquí.»'],['Autoridad',13,'«Habla. Ahora.»','Da un respingo y suelta un nombre.','Se ríe en tu cara y se cruza de brazos.']];let res=null;
const ch=(s,d)=>{let c=0;for(let a=1;a<=6;a++)for(let b=1;b<=6;b++)if(a+b+s>=d||(a==6&&b==6))c++;return Math.round(c/36*100)};
return dt=>{clr('#17121c');txt('El testigo evita tu mirada.',10,14,11,'#e0aaff');let pk=-1;OPT.forEach((o,i)=>{const y=30+i*38;if(btn(8,y,304,34,''))pk=i;txt('['+o[0]+' · dif. '+o[1]+' · '+ch(SK[o[0]],o[1])+'%]',14,y+10,9,Y);txt(o[2],14,y+24,10,WH)});
if(pk>=0){const o=OPT[pk],a=RI(1,6),b=RI(1,6),ok=a+b+SK[o[0]]>=o[1]||(a==6&&b==6);res=[a,b,SK[o[0]],ok,ok?o[3]:o[4]]}if(res){txt('Dados '+res[0]+' + '+res[1]+' + '+res[2]+' → '+(res[3]?'ÉXITO':'FALLO'),10,152,11,res[3]?GR:RD);wrap(res[4],10,170,300,10)}}});

def('nar','Verdad, duda o mentira','Tras cada declaración juzgas si el sospechoso dice la verdad, duda o miente; acusar de mentir exige una prueba que lo contradiga.','L.A. Noire, Danganronpa, Ace Attorney (en espíritu)','Lee la declaración y elige. Mira las pruebas.','',()=>{
const Q=[['«Estuve en casa toda la noche.»','Mentira','El ticket del bar a las 23:40 dice lo contrario.'],['«No conocía a la víctima.»','Duda','Titubea, pero no hay pruebas en contra.'],['«Llegué a las nueve, como siempre.»','Verdad','El portero lo confirma.']],O=['Verdad','Duda','Mentira'];let q=0,sc=0,fb='';
return dt=>{clr('#16141c');txt('Pruebas: ticket del bar (23:40) · testimonio del portero',10,12,9,GY);if(q<Q.length){wrap(Q[q][0],10,40,300,13);let pk=-1;O.forEach((o,i)=>{if(btn(8+i*104,90,98,34,o,['#2f5a3a','#5a5a2f','#5a2f2f'][i]))pk=i});if(pk>=0){const ok=O[pk]==Q[q][1];if(ok)sc++;fb=(ok?'Correcto: ':'No: ')+Q[q][2];q++}}else{txt('Interrogatorio terminado: '+sc+'/3',10,60,13,Y);if(btn(100,90,120,30,'Repetir')){q=0;sc=0;fb=''}}wrap(fb,10,150,300,10,fb[0]=='C'?GR:RD)}});
});

// ================= AGRUPACIONES DE MECÁNICAS EXISTENTES =================
tag('jump',null,['Salto','Salto de altura variable','Tiempo de coyote','Búfer de salto','Doble salto','Salto en pared','Salto cargado','Planear','Trampolines y rebotes']);
tag('aim',null,['Disparo con apuntado libre','Fijar objetivo (lock-on)','Asistencia de apuntado','Munición y recarga','Cambio de armas','Artillería con parábola']);
tag('def',null,['Bloqueo y parada (parry)','Esquiva con invulnerabilidad','Devolver proyectiles','Coberturas']);
