// ================= RITMO Y TIEMPO DE REACCIÓN =================
def('tim','Notas que caen (ritmo)','Las notas bajan por carriles y hay que pulsarlas cuando cruzan la línea. La precisión decide la puntuación y el combo.','Guitar Hero, osu!mania, Friday Night Funkin’','Toca el carril (mitad inferior) o usa ◀▼▲▶.','D',()=>{
const lw=60,ox=40,cs=[RD,BL,GR,Y],ks=['l','d','u','r'];let notes=[],beat=0,sc=0,cb=0,msg='',mt=0,fl=[0,0,0,0];
return dt=>{beat-=dt;if(beat<=0){beat=60/140*(Math.random()<.3?.5:1);notes.push({l:RI(0,3),y:-10})}for(const n of notes)n.y+=160*dt;const press=ks.map(k=>hit(k));if(PT&&P.y>90){const l=Math.floor((P.x-ox)/lw);if(l>=0&&l<4)press[l]=true}
press.forEach((p,l)=>{if(!p)return;fl[l]=.1;const n=notes.filter(n=>n.l==l&&!n.h).sort((a,b)=>Math.abs(a.y-170)-Math.abs(b.y-170))[0];if(n&&Math.abs(n.y-170)<28){n.h=1;const d=Math.abs(n.y-170);msg=d<8?'¡PERFECTO!':d<16?'Bien':'Regular';sc+=d<8?100:d<16?50:20;cb++;mt=.4}});
for(const n of notes)if(!n.h&&n.y>200){n.h=1;cb=0;msg='Fallo';mt=.4}notes=notes.filter(n=>!n.h);mt-=dt;
clr();for(let l=0;l<4;l++){rect(ox+l*lw+2,0,lw-4,200,fl[l]>0?'#ffffff18':'#1b1e2e');fl[l]-=dt}line(ox,170,ox+4*lw,170,WH,2);for(const n of notes)rect(ox+n.l*lw+8,n.y-5,lw-16,10,cs[n.l]);for(let l=0;l<4;l++)txt('←↓↑→'[l],ox+l*lw+lw/2,186,12,cs[l],'center');txt(sc,312,20,12,WH,'right');txt('×'+cb,312,36,11,Y,'right');if(mt>0)txt(msg,160,110,16,Y,'center')}});

def('tim','Barra de potencia en tres toques','Un cursor recorre una barra: el primer toque la inicia, el segundo fija la potencia y el tercero, al volver, la precisión.','Mario Golf, Everybody’s Golf, Tiger Woods PGA Tour','Toca tres veces: empezar, potencia y precisión (línea blanca).','A:Toque',()=>{
let st=0,v=.1,d=1,pow=0,res='',b=null,flag=R(180,290);return dt=>{if(st>0){v+=d*dt*1.3;if(v>=1){v=1;d=-1}if(v<=0){st=0;res='¡Te pasaste!'}}
if(hit('a')||PT){if(st==0&&!b){st=1;v=.1;d=1;res=''}else if(st==1&&d>0){pow=v;st=2}else if(st==2&&d<0){const err=v-.1;st=0;b={x:20,y:170,vx:pow*230,vy:-pow*230,c:err*600}}}
if(b){b.vy+=300*dt;b.x+=b.vx*dt;b.y+=b.vy*dt;if(b.y>=170){const dd=Math.abs(b.x-flag);res='Potencia '+Math.round(pow*100)+'% · desvío '+b.c.toFixed(0)+' · a '+dd.toFixed(0)+' m';if(dd<14&&Math.abs(b.c)<15){res='¡Al green! '+res;flag=R(180,290)}b=null}}
clr();rect(0,170,320,30,'#2d6a4f');line(flag,130,flag,170,WH,1.5);rect(flag,130,14,9,RD);if(b)circ(b.x,b.y,3,WH);rect(20,20,280,16,'#262a3d');if(pow&&st!=1)rect(20,20,pow*280,16,OR+'88');rect(20+.1*280-2,18,4,20,WH);rect(20+v*280-1,15,3,26,Y);txt(res||'Empieza con un toque',8,52,10,res?WH:GY)}});

def('tim','Detener en la zona','Un indicador oscila y hay que pararlo dentro de una franja que se estrecha con cada acierto.','Fable (cerraduras), Zelda (pesca), Mario Party (minijuegos)','Toca cuando el cursor esté en la zona verde.','A:Parar',()=>{
let v=0,d=1,z=.3,zw=.25,lv=1,msg='',mt=0,sp=1;return dt=>{v+=d*sp*dt;if(v>1){v=1;d=-1}if(v<0){v=0;d=1}mt-=dt;if(hit('a')||PT){if(v>z&&v<z+zw){lv++;zw=Math.max(.04,zw*.8);sp*=1.12;msg='¡Dentro!';shake(2)}else{msg='Fuera';lv=1;zw=.25;sp=1}z=R(0,1-zw);mt=.6}
clr();rect(20,90,280,20,'#262a3d');rect(20+z*280,90,zw*280,20,GR);rect(20+v*280-2,82,4,36,WH);txt('Nivel '+lv,160,60,14,WH,'center');if(mt>0)txt(msg,160,140,14,msg=='Fuera'?RD:Y,'center')}});

def('tim','Prueba de reflejos','Esperar una señal impredecible y reaccionar lo antes posible; pulsar antes de tiempo penaliza.','Wario Ware, Samurai Kirby, Rhythm Heaven','Toca para empezar y vuelve a tocar en cuanto se ponga verde.','A:Toque',()=>{
let st=0,t=0,rt=0,best=99,msg='Toca para empezar';return dt=>{t-=dt;if(st==1&&t<=0){st=2;rt=0}if(st==2)rt+=dt;
if(hit('a')||PT){if(st==0){st=1;t=R(1,3);msg='Espera al verde…'}else if(st==1){st=0;msg='¡Demasiado pronto! Toca para repetir'}else{st=0;best=Math.min(best,rt);msg=Math.round(rt*1000)+' ms · mejor '+Math.round(best*1000)+' ms'}}
clr(st==2?'#1f7a3a':st==1?'#7a1f2b':BG);txt(st==2?'¡YA!':st==1?'…':'',160,90,30,WH,'center');txt(msg,160,140,12,WH,'center')}});

def('tim','Machacar el botón','Pulsar lo más rápido posible para vencer una fuerza contraria.','Track & Field, Mario Party, Metal Gear Solid (tortura)','¡Pulsa A o toca sin parar!','A:Tirar',()=>{
let r=0,win='';return dt=>{if(!win){if(hit('a')||PT)r-=.045;r+=dt*.32;if(r>1)win='Gana la CPU · toca para repetir';if(r<-1)win='¡Ganaste! Toca para repetir'}else if(hit('a')||PT){r=0;win=''}
clr();line(20,100,300,100,'#c9a36b',4);rect(160+r*120-3,85,6,30,RD);rect(155,80,10,40,'#ffffff22');rect(20,85,20,30,BL);rect(280,85,20,30,PU);txt(win||'¡Tira de la cuerda!',160,40,13,win?Y:WH,'center')}});

def('tim','Mantener el equilibrio','Una inclinación que se acelera sola y que hay que compensar continuamente.','QWOP, Tony Hawk’s (manuals), Octodad','◀▶ o toca a cada lado para compensar.','H',()=>{
let a=0,v=0,t=0,best=0,fell=0;return dt=>{if(fell){if(PT||hit('a')){a=0;v=0;t=0;fell=0}}else{t+=dt;v+=(Math.sin(a)*3+R(-1,1)*(1+t*.15))*dt;if(key('l'))v-=3*dt;if(key('r'))v+=3*dt;if(P.down)v+=(P.x<160?-3:3)*dt;a+=v*dt;if(Math.abs(a)>1){fell=1;best=Math.max(best,t);shake(4)}}
clr();line(0,150,320,150,'#c9a36b',2);G.save();G.translate(160,150);G.rotate(a);rect(-3,-60,6,60,BL);circ(0,-66,8,BL);line(-40,-50,40,-50,Y,3);G.restore();bar(110,20,100,6,.5+a/2,Math.abs(a)>.7?RD:GR);txt(t.toFixed(1)+' s · mejor '+best.toFixed(1),160,40,11,WH,'center');if(fell)txt('¡Caíste! Toca para reintentar',160,90,12,Y,'center')}});

def('tim','Mantener y soltar','Mantienes pulsado mientras algo crece y sueltas en el momento justo. Hay que estimar distancias a ojo.','Stick Hero, Worms (potencia), Kingdom Hearts (carga)','Mantén para alargar el palo y suelta para que caiga sobre el siguiente pilar.','A:Mantener',()=>{
let p1,p2,len,st,ang,hx,sc=0,best=0,hy=0;const nw=k=>{p1={x:20,w:k||50};p2={x:R(110,240),w:R(18,50)};len=0;st=0;ang=0;hx=p1.x+p1.w-10;hy=0};nw();
return dt=>{const hold=key('a')||P.down;if(st==0&&hold)st=1;if(st==1){len+=160*dt;if(!hold)st=2}if(st==2){ang=Math.min(Math.PI/2,ang+dt*5);if(ang>=Math.PI/2)st=3}
if(st==3){hx+=120*dt;const end=p1.x+p1.w+len,ok=end>=p2.x&&end<=p2.x+p2.w,stop=ok?p2.x+p2.w-10:end;if(hx>=stop){hx=stop;if(ok){sc+=Math.abs(end-(p2.x+p2.w/2))<3?2:1;best=Math.max(best,sc);nw(p2.w)}else st=4}}if(st==4){hy+=200*dt;if(hy>80&&(PT||hit('a'))){sc=0;nw()}}
clr();rect(p1.x,140,p1.w,60,'#3a3f5c');rect(p2.x,140,p2.w,60,'#3a3f5c');rect(p2.x+p2.w/2-2,140,4,3,RD);const bx=p1.x+p1.w;line(bx,140,bx+Math.sin(ang)*len,140-Math.cos(ang)*len,Y,3);rect(hx,128+hy,10,12,BL);txt('Puntos '+sc+' · récord '+best,8,12,11);if(st==4&&hy>80)txt('Toca para reintentar',160,90,12,Y,'center')}});

def('tim','Moverse al ritmo','Solo puedes actuar en el pulso de la música; moverte fuera de tiempo rompe el combo.','Crypt of the NecroDancer, Hi-Fi Rush, Cadence of Hyrule','Muévete con la cruceta justo cuando late el círculo rojo.','D',()=>{
const bp=60/110;let t=0,x=7,y=4,cb=0,msg='',mt=0;return dt=>{t+=dt;const ph=t%bp,near=Math.min(ph,bp-ph),pulse=1-ph/bp;mt-=dt;let d=null;if(hit('l'))d=[-1,0];if(hit('r'))d=[1,0];if(hit('u'))d=[0,-1];if(hit('d'))d=[0,1];if(d){if(near<.13){x=cl(x+d[0],0,15);y=cl(y+d[1],0,8);cb++;msg='¡En ritmo!'}else{cb=0;msg='Fuera de ritmo';shake(2)}mt=.4}
clr();const bt=Math.floor(t/bp);for(let i=0;i<16;i++)for(let j=0;j<9;j++)rect(i*20+1,j*20+1,18,18,(i+j+bt)%2?'#1f2333':'#262a3d');rect(x*20+3,y*20+3,14,14,BL);circ(300,188,8+pulse*6,'#ff5a5f66');circ(300,188,7,RD);txt('Combo ×'+cb,8,190,11,Y);if(mt>0)txt(msg,160,100,13,msg=='Fuera de ritmo'?RD:GR,'center')}});

def('tim','Eventos rápidos (QTE)','Aparece un botón en pantalla y hay que pulsarlo antes de que se agote el tiempo. Habitual en escenas cinemáticas.','Shenmue, God of War, Detroit: Become Human','Pulsa el botón que aparece antes de que se cierre el círculo.','D|A|B',()=>{
const B=['l','r','u','d','a','b'],N={l:'◀',r:'▶',u:'▲',d:'▼',a:'A',b:'B'};let cur=null,t=0,sc=0,ms=0,gap=1,msg='';
return dt=>{t-=dt;gap-=dt;if(!cur&&gap<=0){cur=B[RI(0,5)];t=1.2}if(cur){if(t<=0){ms++;msg='¡Tarde!';cur=null;gap=.8;shake(3)}else for(const k of B)if(hit(k)){if(k==cur){sc++;msg='¡Bien!'}else{ms++;msg='¡Botón equivocado!'}cur=null;gap=.6;break}}
clr();if(cur){circ(160,95,32,'#2f3550');G.strokeStyle=Y;G.lineWidth=5;G.beginPath();G.arc(160,95,36,-Math.PI/2,-Math.PI/2+6.283*(t/1.2));G.stroke();txt(N[cur],160,96,26,WH,'center')}txt(msg,160,160,13,msg=='¡Bien!'?GR:RD,'center');txt('Aciertos '+sc+' · fallos '+ms,8,12)}});

def('tim','Recarga activa','Al recargar aparece una zona: acertarla acelera la recarga y da bonificación; fallarla la atasca.','Gears of War, Battlefield (en parte), Enter the Gungeon','A dispara; B recarga y vuelve a pulsar B en la zona.','A:Disparar|B:Recargar',()=>{
let st=0,v=0,z=.5,res='',am=8,mx=8;return dt=>{if(st==1){v+=dt*.6;if(v>=1){st=0;am=8;mx=8;res='Recarga normal (lenta)'}}else if(st==2){v+=dt*.3;if(v>=1){st=0;am=8;mx=8;res='Recarga tras atasco'}}else if(hit('a')&&am>0)am--;
if(hit('b')){if(st==0&&am<mx){st=1;v=0;z=R(.35,.6);res=''}else if(st==1){if(v>z&&v<z+.06){res='¡Recarga perfecta! +daño';am=10;mx=10;st=0;shake(2)}else if(v>z-.06&&v<z+.18){res='Buena';am=8;mx=8;st=0}else{res='¡Atasco!';st=2}}}
clr();for(let i=0;i<mx;i++)rect(20+i*14,40,10,24,i<am?Y:'#2a2e44');if(st){rect(20,100,280,14,'#262a3d');rect(20+(z-.06)*280,100,.24*280,14,'#7ae58255');rect(20+z*280,100,.06*280,14,Y);rect(20+v*280-1,94,3,26,st==2?RD:WH)}txt(res,20,140,12,res=='¡Atasco!'?RD:GR);txt('Munición',20,26,10,GY)}});

// ================= PROGRESIÓN Y RPG =================
def('rpg','Experiencia y niveles','Derrotar enemigos da puntos de experiencia; al llenar la barra subes de nivel y mejoran tus estadísticas. Cada nivel cuesta más.','Dragon Quest, Pokémon, Diablo','Toca a los limos para atacarlos.','',()=>{
let lv=1,xp=0,need=10,hp=20,atk=3,lu=0,en=[];const fx=PX(),ft=FT(),sp=()=>en.push({x:R(40,280),y:R(60,170),hp:3,mx:3});for(let i=0;i<4;i++)sp();
return dt=>{lu-=dt;if(PT){for(const e of en)if(dist(P.x,P.y,e.x,e.y)<14){e.hp-=atk/3;ft.add('-'+atk,e.x,e.y-10);if(e.hp<=0){e.d=1;const g=RI(3,6);xp+=g;ft.add('+'+g+' XP',e.x,e.y-24,Y);fx.add(e.x,e.y,10,GR)}}let k=0;for(let i=en.length;i--;)if(en[i].d){en.splice(i,1);k++}while(k--)sp();while(xp>=need){xp-=need;lv++;need=Math.round(need*1.5);hp+=5;atk+=1;lu=1.2;shake(3)}}
clr();for(const e of en){circ(e.x,e.y,10,GR);bar(e.x-10,e.y-16,20,3,e.hp/e.mx,RD)}fx.run(dt);ft.run(dt);txt('Nv '+lv,8,12,13,Y);bar(50,8,150,8,xp/need,Y);txt(xp+'/'+need+' XP',206,12,10);txt('PV '+hp+' · ATQ '+atk,8,30,10,GY);if(lu>0)txt('¡SUBES DE NIVEL!',160,100,18,Y,'center')}});

def('rpg','Árbol de habilidades','Gastas puntos en nodos que desbloquean otros. Obliga a elegir una especialización.','Skyrim, Path of Exile, Diablo II','Toca un nodo disponible (borde amarillo). B reinicia.','B:Reiniciar',()=>{
const N=[{n:'Fuerza',x:160,y:28,p:[]},{n:'Tajo',x:80,y:78,p:[0]},{n:'Escudo',x:240,y:78,p:[0]},{n:'Torbellino',x:45,y:128,p:[1]},{n:'Furia',x:125,y:128,p:[1]},{n:'Muro',x:200,y:128,p:[2]},{n:'Espinas',x:278,y:128,p:[2]},{n:'Titán',x:160,y:166,p:[4,5]}];let on,pts;const reset=()=>{on=N.map(()=>0);pts=5};reset();
return dt=>{if(PT)N.forEach((n,i)=>{if(dist(P.x,P.y,n.x,n.y)<15&&!on[i]&&pts>0&&n.p.every(j=>on[j])){on[i]=1;pts--}});if(hit('b'))reset();
clr();N.forEach((n,i)=>n.p.forEach(j=>line(n.x,n.y,N[j].x,N[j].y,on[i]?Y:'#3a3f5c',2)));N.forEach((n,i)=>{const av=!on[i]&&n.p.every(j=>on[j]);circ(n.x,n.y,11,on[i]?Y:av?'#4a5275':'#23263a');ring(n.x,n.y,11,av?Y:'#3a3f5c',1.5);txt(n.n,n.x,n.y+19,9,on[i]?Y:av?WH:GY,'center')});txt('Puntos: '+pts,8,12,11,Y)}});

def('rpg','Botín aleatorio por rareza','Cada recompensa sale de una tabla de probabilidades con niveles de rareza codificados por color. La variabilidad engancha.','Diablo, Borderlands, Destiny','Toca el cofre para abrirlo.','A:Abrir',()=>{
const Ra=[['Común',GY,60],['Poco común',GR,25],['Raro',BL,10],['Épico',PU,4],['Legendario',OR,1]],it=['Espada','Escudo','Anillo','Botas','Casco','Arco','Báculo'];let drop=null,t=0,cnt=[0,0,0,0,0];const fx=PX();
return dt=>{t-=dt;if((PT||hit('a'))&&t<=0){let r=Math.random()*100,k=0;while(k<4&&r>Ra[k][2]){r-=Ra[k][2];k++}cnt[k]++;drop={k,n:it[RI(0,6)]};t=.25;fx.add(160,90,8+k*8,Ra[k][1],60+k*30);if(k>=3)shake(k)}
clr();rect(135,95,50,30,'#8d6e4c');rect(135,88,50,10,'#a07850');rect(156,100,8,8,Y);fx.run(dt);if(drop){txt(drop.n,160,52,16,Ra[drop.k][1],'center');txt(Ra[drop.k][0],160,70,11,Ra[drop.k][1],'center')}Ra.forEach((r,i)=>{txt(r[0]+' '+r[2]+'%',10,145+i*11,9,r[1]);txt(cnt[i],125,145+i*11,9)})}});

def('rpg','Inventario en cuadrícula','Cada objeto ocupa una forma en una rejilla limitada. Organizar el espacio es un puzle en sí mismo.','Resident Evil 4, Diablo, Escape from Tarkov','Arrastra los objetos a la rejilla. B gira el objeto que sostienes.','B:Girar',()=>{
const S=22,gx=12,gy=30,gw=7,gh=5;let items,hold=null,off=[0,0];const reset=()=>{items=[[2,3,'Rifle',OR,180,26],[1,2,'Poción',RD,232,26],[2,2,'Botiquín',GR,262,26],[1,1,'Llave',Y,232,78],[1,1,'Gema',PU,262,78],[3,1,'Espada',BL,180,104],[2,1,'Balas',WH,254,104]].map(q=>({w:q[0],h:q[1],n:q[2],c:q[3],x:q[4],y:q[5],g:null}))};reset();
const fits=(it,cx,cy)=>cx>=0&&cy>=0&&cx+it.w<=gw&&cy+it.h<=gh&&!items.some(o=>o!==it&&o.g&&cx<o.g[0]+o.w&&cx+it.w>o.g[0]&&cy<o.g[1]+o.h&&cy+it.h>o.g[1]);
return dt=>{if(PT)for(let i=items.length;i--;){const o=items[i];if(inR(P.x,P.y,o.x,o.y,o.w*S,o.h*S)){hold=o;o.g=null;off=[P.x-o.x,P.y-o.y];items.splice(i,1);items.push(o);break}}
if(hold&&hit('b')){[hold.w,hold.h]=[hold.h,hold.w];off=[Math.min(off[0],hold.w*S-4),Math.min(off[1],hold.h*S-4)]}if(hold&&P.down){hold.x=P.x-off[0];hold.y=P.y-off[1]}
if(hold&&!P.down){const cx=Math.round((hold.x-gx)/S),cy=Math.round((hold.y-gy)/S);if(fits(hold,cx,cy)){hold.g=[cx,cy];hold.x=gx+cx*S;hold.y=gy+cy*S}hold=null}
clr();for(let i=0;i<gw;i++)for(let j=0;j<gh;j++)srect(gx+i*S+.5,gy+j*S+.5,S-1,S-1,'#3a3f5c');if(hold){const cx=Math.round((hold.x-gx)/S),cy=Math.round((hold.y-gy)/S);if(cx>=0&&cy>=0&&cx<gw&&cy<gh)rect(gx+cx*S,gy+cy*S,hold.w*S,hold.h*S,fits(hold,cx,cy)?'#7ae58233':'#ff5a5f33')}
for(const o of items){rect(o.x+1,o.y+1,o.w*S-2,o.h*S-2,o.c+'cc');txt(o.n,o.x+o.w*S/2,o.y+o.h*S/2,8,BG,'center')}const used=items.filter(o=>o.g).reduce((a,o)=>a+o.w*o.h,0);txt('Ocupado '+used+'/'+gw*gh,8,12,10,GY)}});

def('rpg','Fabricación (crafteo)','Combinar materiales según recetas para obtener objetos nuevos. Convierte la recolección en progreso.','Minecraft, Terraria, Zelda: BotW (cocina)','Toca dos materiales y pulsa Fabricar.','',()=>{
const M0={Madera:[4,'#c77d4f'],Piedra:[3,'#9aa3c7'],Hierro:[2,'#cfd6e6'],Cuerda:[2,'#e9c46a']},RC={'Madera+Piedra':'Hacha','Cuerda+Madera':'Arco','Hierro+Madera':'Espada','Cuerda+Piedra':'Honda','Hierro+Hierro':'Armadura','Madera+Madera':'Escudo'};let sl=[],inv=[],msg='';
return dt=>{clr();const ks=Object.keys(M0);let pk=null;ks.forEach((k,i)=>{if(btn(8,14+i*34,104,28,k+' ×'+M0[k][0],M0[k][1]+'44'))pk=k});if(pk&&M0[pk][0]>0&&sl.length<2){sl.push(pk);M0[pk][0]--}
for(let i=0;i<2;i++){srect(130+i*52,30,42,42,WH,1.5);if(sl[i])txt(sl[i],151+i*52,51,9,M0[sl[i]][1],'center')}txt('+',176,51,14,WH,'center');const res=sl.length==2?RC[[...sl].sort().join('+')]:null;srect(250.5,30.5,61,41,res?Y:GY,1.5);txt(res||'?',281,51,10,res?Y:GY,'center');
if(btn(130,84,96,28,'Fabricar',res?'#3b4a2f':'#23263a')&&res){inv.push(res);sl=[];msg='¡'+res+' fabricado!'}if(btn(232,84,80,28,'Vaciar')){sl.forEach(k=>M0[k][0]++);sl=[]}if(btn(8,152,104,28,'Recolectar','#3b4a2f'))ks.forEach(k=>M0[k][0]+=RI(0,2));
txt(msg,130,128,10,GR);wrap('Inventario: '+(inv.slice(-4).join(', ')||'vacío'),130,152,180,9,WH)}});

def('rpg','Equipo y estadísticas','Cada pieza equipada modifica tus atributos, a veces con ventajas y penalizaciones a la vez.','Dark Souls, Diablo, Monster Hunter','Toca un objeto para equiparlo o quitarlo.','',()=>{
const IT=[['Espada corta','arma',{atq:5}],['Hacha','arma',{atq:9,vel:-2}],['Daga','arma',{atq:3,vel:3}],['Cota de malla','armadura',{def:6,vel:-1}],['Túnica','armadura',{def:2,mag:4}],['Anillo','accesorio',{mag:3,vel:1}],['Amuleto','accesorio',{def:2,atq:2}]],base={atq:2,def:1,mag:1,vel:5},NM={atq:'Ataque',def:'Defensa',mag:'Magia',vel:'Velocidad'};const eq={arma:null,armadura:null,accesorio:null};
return dt=>{const s={...base};for(const k in eq)if(eq[k])for(const st in eq[k][2])s[st]+=eq[k][2][st];clr();IT.forEach(it=>{const on=eq[it[1]]===it,i=IT.indexOf(it);if(btn(8,8+i*26,126,22,it[0],on?'#3b4a2f':'#23263a'))eq[it[1]]=on?null:it});
Object.keys(base).forEach((k,i)=>{txt(NM[k],146,24+i*22,10,GY);bar(206,20+i*22,84,8,s[k]/15,[RD,BL,PU,GR][i]);txt(s[k],296,24+i*22,11)});['arma','armadura','accesorio'].forEach((k,i)=>txt(k+': '+(eq[k]?eq[k][0]:'—'),146,124+i*16,10,eq[k]?Y:GY))}});

def('rpg','Durabilidad','Las herramientas y armas se desgastan con el uso y acaban rompiéndose si no se reparan.','Zelda: BotW, Minecraft, Dying Light','Toca las rocas para picar. Repara con mineral.','',()=>{
let dur=10,ore=0,msg='',rocks=[];const sp=()=>{while(rocks.length<5)rocks.push({x:R(30,290),y:R(55,170),hp:3})};sp();
return dt=>{if(PT){const r=rocks.find(r=>dist(P.x,P.y,r.x,r.y)<16);if(r){if(dur>0){dur--;r.hp--;shake(1);if(r.hp<=0){ore++;rocks.splice(rocks.indexOf(r),1);sp()}if(dur==0)msg='¡El pico se ha roto!'}else msg='Necesitas reparar el pico'}}
clr();for(const r of rocks){circ(r.x,r.y,14,'#6b7290');for(let i=0;i<3-r.hp;i++)line(r.x-6+i*5,r.y-8,r.x-2+i*5,r.y+6,BG,2)}txt('Mineral: '+ore,8,12);txt('Pico',8,30,10,GY);bar(40,26,80,7,dur/10,dur>3?GR:RD);txt(msg,128,30,10,RD);if(btn(226,4,88,24,'Reparar (2)')&&ore>=2&&dur<10){ore-=2;dur=10;msg=''}}});

def('rpg','Mejora con riesgo','Cada mejora cuesta recursos y tiene una probabilidad de éxito que baja según subes; fallar puede hacerte retroceder.','Lineage, MapleStory, Black Desert','Pulsa Mejorar y cruza los dedos.','',()=>{
let lv=0,gold=1000,msg='',best=0;const fx=PX();return dt=>{clr();const c=Math.max(.1,1-lv*.12),cost=50+lv*30;txt('Espada +'+lv,160,50,22,lv>=7?OR:lv>=4?PU:WH,'center');fx.run(dt);txt('Éxito '+Math.round(c*100)+'% · coste '+cost+' oro',160,80,11,GY,'center');txt('Oro: '+gold,8,12,11,Y);txt('Récord +'+best,8,28,10,GY);
if(btn(110,98,100,30,'Mejorar')&&gold>=cost){gold-=cost;if(Math.random()<c){lv++;best=Math.max(best,lv);msg='¡Éxito!';fx.add(160,50,20,Y,100)}else if(lv>=4&&Math.random()<.5){lv=0;msg='¡La espada se rompió!';shake(5)}else{lv=Math.max(0,lv-1);msg='Fallo: baja un nivel'}}
txt(msg,160,148,13,msg=='¡Éxito!'?GR:RD,'center');if(gold<200&&btn(110,166,100,24,'Más oro'))gold+=1000}});

def('rpg','Tiradas gacha con garantía','Gastas moneda en tiradas aleatorias; un contador de “piedad” garantiza un premio raro tras cierto número de intentos.','Genshin Impact, Fire Emblem Heroes, Fate/Grand Order','Pulsa para tirar. Observa el contador de garantía.','',()=>{
let pity=0,hist=[],gems=3000;const fx=PX(),roll=()=>{pity++;let r;if(pity>=20||Math.random()<.02){r=5;pity=0}else r=Math.random()<.15?4:3;hist.unshift(r);if(hist.length>10)hist.pop();if(r==5){fx.add(160,80,40,OR,140);shake(4)}};
return dt=>{clr();fx.run(dt);txt('Gemas '+gems,8,12,11,BL);txt('5★ garantizado en '+(20-pity)+' tiradas',8,28,10,Y);hist.forEach((r,i)=>{const x=16+i*29;rect(x,52,25,40,r==5?OR:r==4?PU:'#3a3f5c');txt(r+'★',x+12,72,10,WH,'center')});
if(btn(30,118,120,30,'Tirar ×1 (160)')&&gems>=160){gems-=160;roll()}if(btn(170,118,120,30,'Tirar ×10 (1600)')&&gems>=1600){gems-=1600;for(let i=0;i<10;i++)roll()}if(gems<160&&btn(110,162,100,24,'Recargar'))gems=3000;txt('Prob. base 5★: 2%',8,186,9,GY)}});

def('rpg','Estados alterados','Efectos temporales que dañan, curan o limitan durante unos segundos, con su propio temporizador.','Pokémon, Final Fantasy, Elden Ring','Aplica estados al muñeco y observa su efecto.','',()=>{
const E=[['Veneno','veneno',GR,4],['Quemar','quemadura',OR,3],['Congelar','congelación',BL,2],['Regenerar','regeneración',PU,5]];let hp=100,st={},tick=0,ex=160;const ft=FT();
return dt=>{tick-=dt;for(const k in st){st[k]-=dt;if(st[k]<=0)delete st[k]}if(tick<=0){tick=.5;if(st.veneno){hp-=1;ft.add('-1',ex,70,GR,11)}if(st.quemadura){hp-=2;ft.add('-2',ex,70,OR,11)}if(st['regeneración']){hp=Math.min(100,hp+1.5);ft.add('+1,5',ex,70,PU,11)}}if(hp<=0)hp=100;if(!st['congelación'])ex=160+Math.sin(T*2)*60;
clr();rect(ex-12,90,24,36,st['congelación']?BL:RD);if(st.quemadura)for(let i=0;i<3;i++)circ(ex-8+i*8,86-Math.random()*8,3,OR);if(st.veneno)circ(ex,82,3,GR);bar(110,50,100,6,hp/100,GR);ft.run(dt);let i=0;for(const k in st){txt(k+' '+st[k].toFixed(1)+' s',8,12+i*12,9,E.find(e=>e[1]==k)[2]);i++}
let pk=-1;E.forEach((e,j)=>{if(btn(4+j*79,160,75,30,e[0],e[2]+'44'))pk=j});if(pk>=0)st[E[pk][1]]=E[pk][3]}});

def('rpg','Peso y carga','Cada objeto pesa y llevar demasiado te ralentiza o te inmoviliza. Obliga a elegir qué cargar.','Skyrim, Fallout, Dark Souls (equilibrio de equipo)','Toca objetos para cogerlos o soltarlos y camina con ◀▶.','H',()=>{
const IT=[['Espada',4],['Armadura',12],['Oro',6],['Poción',1],['Escudo',8],['Libro',2]],car=new Set();let x=40;
return dt=>{const w=[...car].reduce((a,i)=>a+IT[i][1],0),cap=20,sp=w>cap*1.5?0:w>cap?25:w>cap*.6?60:100;x+=((key('r')?1:0)-(key('l')?1:0))*sp*dt;if(x>310)x=10;if(x<10)x=310;
clr();let pk=-1;IT.forEach((it,i)=>{if(btn(8+(i%3)*104,8+Math.floor(i/3)*28,100,24,it[0]+' '+it[1]+' kg',car.has(i)?'#3b4a2f':'#23263a'))pk=i});if(pk>=0)car.has(pk)?car.delete(pk):car.add(pk);
txt('Carga '+w+'/'+cap+' kg',8,80,11);bar(110,76,150,8,w/(cap*1.5),w>cap?RD:w>cap*.6?Y:GR);txt(sp?'Velocidad '+sp+'%':'¡No puedes moverte!',8,98,10,sp<60?RD:GR);rect(0,170,320,30,'#262a3d');rect(x-6,150,12,20,BL);if(w)rect(x-9,146,18,8,'#8d6e4c')}});

def('rpg','Reparto de atributos','Al subir de nivel repartes puntos entre atributos que influyen en estadísticas derivadas.','Fallout, Dark Souls, Diablo II','Usa − y + para repartir los puntos.','',()=>{
const A=['Fuerza','Agilidad','Intelecto','Vitalidad'],C=[RD,GR,PU,Y];let v,pts;const reset=()=>{v=[3,3,3,3];pts=6};reset();
return dt=>{clr();A.forEach((a,i)=>{const y=12+i*30;txt(a,8,y+11,11,C[i]);bar(84,y+7,100,8,v[i]/12,C[i]);txt(v[i],192,y+11,11);if(btn(216,y,34,24,'−')&&v[i]>1){v[i]--;pts++}if(btn(256,y,34,24,'+')&&pts>0){v[i]++;pts--}});
txt('Puntos libres: '+pts,8,138,11,Y);txt('PV '+(50+v[3]*10)+' · Daño '+v[0]*2+' · Crít. '+v[1]*3+'% · Maná '+v[2]*8,8,158,10);if(btn(240,172,74,24,'Reiniciar'))reset()}});

def('rpg','Misiones y registro','Un personaje encarga una tarea con objetivos medibles; el registro muestra el progreso y la recompensa al entregarla.','World of Warcraft, The Witcher 3, Animal Crossing','Acércate al aldeano (amarillo) y pulsa A. Recoge las flores.','D|A:Hablar',()=>{
let x=60,y=100,st=0,fl=[],got=0,msg='';const sp=()=>{fl=[];for(let i=0;i<3;i++)fl.push({x:R(140,300),y:R(60,180)})};
return dt=>{const[dx,dy]=dir();x=cl(x+dx*100*dt,8,312);y=cl(y+dy*100*dt,8,192);const nN=dist(x,y,40,40)<26;if(nN&&hit('a')){if(st==0){st=1;sp();got=0;msg='Misión aceptada'}else if(st==1&&got>=3){st=2;msg='¡Recompensa: 50 monedas!'}else if(st==2){st=0;msg=''}}
if(st==1)for(let i=fl.length;i--;)if(dist(x,y,fl[i].x,fl[i].y)<12){fl.splice(i,1);got++}
clr();circ(40,40,10,Y);if(st!=1||got>=3)txt(st==1?'?':'!',40,22,14,Y,'center');for(const f of fl)circ(f.x,f.y,5,'#ff8fd0');circ(x,y,7,BL);rect(168,4,148,40,'#000a');txt('Misiones',174,14,9,GY);txt(st==0?'Habla con el aldeano':st==1?'Flores: '+got+'/3'+(got>=3?' → vuelve':''):'Completada ✓',174,31,10,st==2?GR:WH);txt(msg,8,190,10,Y)}});

// ================= ECONOMÍA E INCREMENTALES =================
def('eco','Clicker','Cada toque genera recursos que se reinvierten en multiplicar lo que obtienes por toque.','Cookie Clicker, Clicker Heroes, Tap Titans','Toca la galleta y compra mejoras.','',()=>{
let c=0,pc=1,cost=10,sc=1;const ft=FT();return dt=>{sc=lerp(sc,1,.2);if(PT&&dist(P.x,P.y,110,100)<45){c+=pc;sc=.85;ft.add('+'+pc,P.x,P.y-10,Y)}
clr();G.save();G.translate(110,100);G.scale(sc,sc);circ(0,0,42,OR);circ(-12,-10,6,'#a0522d');circ(14,8,7,'#a0522d');circ(-4,18,5,'#a0522d');G.restore();ft.run(dt);txt(fmt(c)+' galletas',110,20,14,WH,'center');if(btn(196,80,118,40,'+1 por toque ('+cost+')',c>=cost?'#3b4a2f':'#23263a')&&c>=cost){c-=cost;pc++;cost=Math.round(cost*1.6)}txt('Por toque: '+pc,200,136,10,GY)}});

def('eco','Generadores pasivos (idle)','Compras edificios que producen solos; cada uno cuesta un poco más que el anterior (crecimiento exponencial).','Adventure Capitalist, Cookie Clicker, Universal Paperclips','Compra generadores y mira cómo crece la producción.','',()=>{
const Gn=[['Granjero',.5,15],['Molino',4,100],['Fábrica',30,1100],['Banco',200,12000]];let c=20;const n=[0,0,0,0];
return dt=>{let ps=0;Gn.forEach((g,i)=>ps+=g[1]*n[i]);c+=ps*dt;clr();txt(fmt(c)+' monedas',8,14,14,Y);txt(fmt(ps)+'/s',8,32,10,GY);let pk=-1;
Gn.forEach((g,i)=>{const cost=Math.round(g[2]*Math.pow(1.15,n[i])),y=48+i*36;if(btn(8,y,206,30,g[0]+' ×'+n[i]+' — '+fmt(cost),c>=cost?'#3b4a2f':'#23263a')&&c>=cost)pk=i;txt('+'+g[1]+'/s c.u.',222,y+15,9,GY)});if(pk>=0){c-=Math.round(Gn[pk][2]*Math.pow(1.15,n[pk]));n[pk]++}}});

def('eco','Prestigio (renacer)','Reinicias el progreso a cambio de una moneda permanente que multiplica todo en la siguiente partida.','Clicker Heroes, AdVenture Capitalist, Rogue Legacy','Acumula 1.000 de oro y renace para multiplicar la producción.','',()=>{
let c=0,gen=0,pr=0,mult=1;return dt=>{const ps=gen*mult;c+=ps*dt;const gain=Math.floor(Math.sqrt(c/1000));clr();txt(fmt(c)+' oro',8,14,14,Y);txt('Mineros '+gen+' · ×'+mult.toFixed(1)+' · '+fmt(ps)+'/s',8,32,10,GY);
const cost=Math.round(10*Math.pow(1.2,gen));if(btn(8,48,150,30,'Minero ('+fmt(cost)+')',c>=cost?'#3b4a2f':'#23263a')&&c>=cost){c-=cost;gen++}if(btn(164,48,150,30,'Picar +'+mult.toFixed(0)))c+=mult;
txt('Gemas de prestigio: '+pr,8,100,11,PU);if(btn(8,114,306,34,gain?'Renacer: reinicia y gana '+gain+' gemas':'Necesitas 1.000 de oro para renacer',gain?'#4a2f5a':'#23263a')&&gain){pr+=gain;mult=1+pr*.5;c=0;gen=0;shake(4)}txt('Cada gema: +50% de producción para siempre',8,170,10,GY)}});

def('eco','Mercado con precios fluctuantes','El precio de un bien cambia con el tiempo; compras barato y vendes caro asumiendo riesgo.','Animal Crossing (nabos), EVE Online, Recettear','Compra y vende siguiendo la gráfica.','',()=>{
let pr=[50],t=0,cash=500,own=0,avg=0;return dt=>{t-=dt;if(t<=0){t=.25;const p=pr[pr.length-1];pr.push(Math.max(5,p+R(-4,4)+(50-p)*.02));if(pr.length>80)pr.shift()}const p=pr[pr.length-1];
clr();const mx=Math.max(...pr),mn=Math.min(...pr);G.strokeStyle=Y;G.lineWidth=1.5;G.beginPath();pr.forEach((v,i)=>{const X=10+i*3.7,Yy=110-(v-mn)/(mx-mn||1)*90;i?G.lineTo(X,Yy):G.moveTo(X,Yy)});G.stroke();txt('Precio: '+p.toFixed(1),8,128,11,Y);txt('Dinero '+cash.toFixed(0)+' · acciones '+own+(own?' (media '+avg.toFixed(1)+')':''),8,144,10);
if(btn(8,156,146,34,'Comprar',cash>=p?'#3b4a2f':'#23263a')&&cash>=p){avg=(avg*own+p)/(own+1);own++;cash-=p}if(btn(166,156,146,34,'Vender',own?'#5a2f2f':'#23263a')&&own){own--;cash+=p;if(!own)avg=0}}});

def('eco','Precio y demanda','Fijas el precio en tu tienda: si es alto, menos clientes compran; si es bajo, vendes más pero ganas menos por unidad.','Recettear, Moonlighter, Shop Titans','Ajusta el precio y repón stock.','',()=>{
let price=10,stock=30,cash=0,cust=[],t=0,sold=0,lost=0;return dt=>{t-=dt;if(t<=0){t=.6;cust.push({x:-10,buy:Math.random()<cl(1.4-price/12,0,1)})}for(const c of cust){c.x+=60*dt;if(!c.done&&c.x>160){c.done=1;if(c.buy&&stock>0){stock--;cash+=price;sold++;c.ok=1}else lost++}}cust=cust.filter(c=>c.x<330);
clr();rect(140,60,40,50,'#8d6e4c');txt('Tienda',160,50,10,Y,'center');for(const c of cust)circ(c.x,120,6,c.done?(c.ok?GR:RD):WH);txt('Precio '+price+' €',8,150,12,Y);if(btn(110,138,32,24,'−')&&price>1)price--;if(btn(146,138,32,24,'+'))price++;txt('Stock '+stock,190,150,11);if(btn(246,138,68,24,'Reponer'))stock+=10;
txt('Caja '+cash+' € · vendidos '+sold+' · se fueron '+lost,8,182,10,GY)}});

def('eco','Granja: plantar, regar, cosechar','Ciclos de cultivo en tiempo real con varias acciones por parcela. El tiempo de espera es parte del juego.','Stardew Valley, Harvest Moon, FarmVille','Elige herramienta abajo y toca las parcelas.','',()=>{
const pl=Array.from({length:8},()=>({s:0,g:0,w:0})),TL=['Plantar (2)','Regar','Cosechar'];let coins=10,tool=0;
return dt=>{for(const p of pl)if(p.s==1&&p.w>0){p.g+=dt*.25;p.w-=dt*.2;if(p.g>=1)p.s=2}clr();pl.forEach((p,i)=>{const x=12+(i%4)*76,y=18+Math.floor(i/4)*64;rect(x,y,68,56,p.w>0?'#5c3b1e':'#8d6e4c');if(p.s==1){const h=6+p.g*24;rect(x+32,y+48-h,4,h,GR);circ(x+34,y+48-h,4+p.g*4,GR)}if(p.s==2){circ(x+34,y+28,12,OR);rect(x+32,y+12,4,6,GR)}if(p.s==1&&p.w<=0)txt('¡sed!',x+34,y+8,9,BL,'center');
if(PT&&inR(P.x,P.y,x,y,68,56)){if(tool==0&&p.s==0&&coins>=2){p.s=1;p.g=0;p.w=0;coins-=2}else if(tool==1&&p.s==1)p.w=1;else if(tool==2&&p.s==2){p.s=0;coins+=6}}});
TL.forEach((t,i)=>{if(btn(8+i*76,160,72,30,t,tool==i?'#3b4a2f':'#23263a'))tool=i});txt(coins+' monedas',312,175,11,Y,'right')}});

def('eco','Recolección con reaparición','Los recursos se agotan al usarlos y vuelven a aparecer tras un tiempo. Crea rutas y ritmos de juego.','Minecraft, Valheim, World of Warcraft','Acércate a un árbol y pulsa A para talar.','D|A:Talar',()=>{
let x=160,y=100,wood=0;const tr=[],ft=FT();for(let i=0;i<6;i++)tr.push({x:R(20,300),y:R(40,180),hp:3,re:0});
return dt=>{const[dx,dy]=dir();x=cl(x+dx*90*dt,8,312);y=cl(y+dy*90*dt,8,192);for(const t of tr)if(t.re>0){t.re-=dt;if(t.re<=0)t.hp=3}if(hit('a')){const t=tr.find(t=>t.re<=0&&dist(x,y,t.x,t.y)<24);if(t){t.hp--;shake(1);if(t.hp<=0){t.re=5;wood+=3;ft.add('+3',t.x,t.y-20,Y)}}}
clr('#1e2a1e');for(const t of tr){if(t.re>0){rect(t.x-4,t.y,8,6,'#8d6e4c');bar(t.x-10,t.y+10,20,3,1-t.re/5,GY)}else{rect(t.x-3,t.y,6,10,'#8d6e4c');circ(t.x,t.y-6,12-(3-t.hp)*2,GR)}}circ(x,y,7,BL);ft.run(dt);txt('Madera: '+wood,8,12)}});

def('eco','Cadena de producción','Una máquina alimenta a la siguiente; la más lenta marca el ritmo de toda la línea (cuello de botella).','Factorio, Satisfactory, Shapez','Toca una máquina para mejorarla (cuesta 10).','',()=>{
const Mc=[{n:'Mina',x:20,r:1,c:GY,in:0,p:0},{n:'Horno',x:125,r:.6,c:OR,in:0,p:0},{n:'Taller',x:230,r:.4,c:BL,in:0,p:0}];let items=[],money=0;
return dt=>{Mc.forEach((m,i)=>{if(i==0||m.in>0){m.p+=m.r*dt;if(m.p>=1){m.p=0;if(i>0)m.in--;items.push({x:m.x+60,to:i+1})}}});for(const it of items){it.x+=50*dt;const dest=it.to<3?Mc[it.to].x:316;if(it.x>=dest){it.d=1;if(it.to<3)Mc[it.to].in++;else money+=5}}items=items.filter(i=>!i.d);
clr();rect(0,100,320,8,'#3a3f5c');Mc.forEach((m,i)=>{if(PT&&inR(P.x,P.y,m.x,60,60,70)&&money>=10){money-=10;m.r+=.3}rect(m.x,70,60,50,m.c+'88');txt(m.n,m.x+30,82,10,WH,'center');txt(m.r.toFixed(1)+'/s',m.x+30,96,9,WH,'center');if(i)txt('cola '+m.in,m.x+30,136,9,m.in>5?RD:GY,'center')});for(const it of items)rect(it.x-3,99,6,6,[0,GY,OR,BL][it.to]);txt('Dinero '+money,8,12,11,Y);txt('El eslabón más lento marca el ritmo',8,190,10,GY)}});

// ================= ESTRATEGIA Y TÁCTICA =================
def('est','Defensa de torres','Los enemigos siguen un camino fijo y colocas torres a su alrededor para frenarlos antes de que lleguen.','Kingdom Rush, Bloons TD, Plants vs. Zombies','Toca fuera del camino para construir una torre (25 de oro).','',()=>{
const Wp=[[0,40],[240,40],[240,110],[60,110],[60,170],[320,170]];let en=[],tw=[],bs=[],t=0,gold=60,lives=10,wave=0,sp=0;
return dt=>{t-=dt;if(t<=0){en.push({d:0,hp:3+wave*.5,mx:3+wave*.5,x:-10,y:40});sp++;t=.9;if(sp%10==0)wave++}
if(PT&&gold>=25&&P.y>20){let ok=true;for(let i=0;i<Wp.length-1;i++)if(segD(P.x,P.y,Wp[i][0],Wp[i][1],Wp[i+1][0],Wp[i+1][1])<15)ok=false;for(const q of tw)if(dist(q.x,q.y,P.x,P.y)<16)ok=false;if(ok){tw.push({x:P.x,y:P.y,cd:0});gold-=25}}
for(const e of en){e.d+=40*dt;const p=pathAt(Wp,e.d);if(!p){e.out=1;lives--}else{e.x=p[0];e.y=p[1]}}en=en.filter(e=>!e.out&&e.hp>0);
for(const q of tw){q.cd-=dt;if(q.cd<=0){const tg=en.find(e=>dist(e.x,e.y,q.x,q.y)<55);if(tg){bs.push({x:q.x,y:q.y,tg});q.cd=.6}}}
for(const b of bs){const d=dist(b.x,b.y,b.tg.x,b.tg.y);if(d<5||b.tg.hp<=0){b.d=1;if(b.tg.hp>0){b.tg.hp--;if(b.tg.hp<=0)gold+=5}}else{b.x+=(b.tg.x-b.x)/d*250*dt;b.y+=(b.tg.y-b.y)/d*250*dt}}bs=bs.filter(b=>!b.d);if(lives<=0){en=[];lives=10;gold=60;tw=[];wave=0;sp=0}
clr('#1a2a1f');G.strokeStyle='#5c4a32';G.lineWidth=18;G.lineJoin='round';G.beginPath();Wp.forEach((p,i)=>i?G.lineTo(p[0],p[1]):G.moveTo(p[0],p[1]));G.stroke();for(const q of tw){ring(q.x,q.y,55,'#ffffff12',1);rect(q.x-7,q.y-7,14,14,BL)}for(const e of en){circ(e.x,e.y,6,RD);bar(e.x-6,e.y-10,12,2,e.hp/e.mx,GR)}for(const b of bs)circ(b.x,b.y,2,Y);txt('Oro '+gold+' · vidas '+lives+' · oleada '+(wave+1),6,10,10)}});

def('est','Selección de unidades (RTS)','Arrastras un rectángulo para seleccionar un grupo de unidades y luego les das una orden de movimiento.','StarCraft, Age of Empires, Command & Conquer','Arrastra para seleccionar; toca para enviar a las seleccionadas.','',()=>{
const U=[];for(let i=0;i<8;i++)U.push({x:R(30,150),y:R(40,170),tx:null,ty:null,s:0});let box=null,mk=null;
return dt=>{if(PT)box={x:P.x,y:P.y,x2:P.x,y2:P.y};if(box&&P.down){box.x2=P.x;box.y2=P.y}
if(box&&!P.down){const w=Math.abs(box.x2-box.x),h=Math.abs(box.y2-box.y);if(w<8&&h<8){const sel=U.filter(u=>u.s);if(sel.length){sel.forEach((u,i)=>{u.tx=box.x+(i%3-1)*14;u.ty=box.y+(Math.floor(i/3)-1)*14});mk={x:box.x,y:box.y,t:.5}}}else{const x0=Math.min(box.x,box.x2),y0=Math.min(box.y,box.y2);U.forEach(u=>u.s=inR(u.x,u.y,x0,y0,w,h))}box=null}
for(const u of U)if(u.tx!=null){const d=dist(u.x,u.y,u.tx,u.ty);if(d>1){u.x+=(u.tx-u.x)/d*Math.min(d,60*dt);u.y+=(u.ty-u.y)/d*Math.min(d,60*dt)}}
clr('#1a2a1f');if(mk){mk.t-=dt;if(mk.t>0)ring(mk.x,mk.y,12*(1-mk.t*2)+4,GR)}for(const u of U){circ(u.x,u.y+2,6,'#0005');circ(u.x,u.y,6,BL);if(u.s)ring(u.x,u.y,9,GR,1.5)}if(box){const x0=Math.min(box.x,box.x2),y0=Math.min(box.y,box.y2),w=Math.abs(box.x2-box.x),h=Math.abs(box.y2-box.y);rect(x0,y0,w,h,'#7ae58222');srect(x0,y0,w,h,GR)}txt('Seleccionadas: '+U.filter(u=>u.s).length,8,10,10,GY)}});

def('est','Táctica por casillas','Cada unidad tiene un rango de movimiento y de ataque; tras tu turno, el enemigo responde. Posicionarse lo es todo.','Fire Emblem, XCOM, Into the Breach','Toca una unidad tuya, luego una casilla azul; si queda junto a un enemigo, tócalo para atacar.','',()=>{
const w=10,h=6,S=26,ox=30,oy=24;let U,E,wall,sel=null,ph='p',msg='',te=0;const reset=()=>{U=[{x:1,y:1,hp:10,a:0,c:BL},{x:1,y:4,hp:10,a:0,c:GR}];E=[{x:8,y:2,hp:6},{x:7,y:4,hp:6}];wall=new Set(['4,1','4,2','5,4','4,4','6,0']);ph='p';sel=null};reset();
const md=(a,b)=>Math.abs(a.x-b.x)+Math.abs(a.y-b.y),occ=(x,y)=>wall.has(x+','+y)||U.some(u=>u.hp>0&&u.x==x&&u.y==y)||E.some(e=>e.hp>0&&e.x==x&&e.y==y);
const range=(u,n)=>{const D={[u.x+','+u.y]:0},q=[[u.x,u.y]];while(q.length){const[x,y]=q.shift(),d=D[x+','+y];if(d==n)continue;for(const[a,b]of[[1,0],[-1,0],[0,1],[0,-1]]){const X=x+a,Yy=y+b,k=X+','+Yy;if(X<0||Yy<0||X>=w||Yy>=h||k in D||occ(X,Yy))continue;D[k]=d+1;q.push([X,Yy])}}return D};
return dt=>{if(PT&&ph=='p'){const x=Math.floor((P.x-ox)/S),y=Math.floor((P.y-oy)/S),u=U.find(u=>u.hp>0&&u.x==x&&u.y==y&&!u.a),e=E.find(e=>e.hp>0&&e.x==x&&e.y==y);
if(u)sel={u,R:range(u,3)};else if(sel&&e&&md(e,sel.u)==1){e.hp-=4;msg='¡Ataque! −4';sel.u.a=1;sel=null}else if(sel&&!sel.u.a&&(x+','+y)in sel.R){sel.u.x=x;sel.u.y=y;sel.u.a=1;sel.R={};if(!E.some(e=>e.hp>0&&md(e,sel.u)==1))sel=null}else sel=null;if(U.every(u=>u.a||u.hp<=0)&&!sel){ph='e';te=.6}}
if(ph=='e'){te-=dt;if(te<=0){for(const e of E){if(e.hp<=0)continue;const tg=U.filter(u=>u.hp>0).sort((a,b)=>md(a,e)-md(b,e))[0];if(!tg)continue;for(let s=0;s<2;s++){if(md(tg,e)<=1)break;const op=[[1,0],[-1,0],[0,1],[0,-1]].map(([a,b])=>[e.x+a,e.y+b]).filter(([X,Yy])=>X>=0&&Yy>=0&&X<w&&Yy<h&&!occ(X,Yy)).sort((p,q)=>(Math.abs(p[0]-tg.x)+Math.abs(p[1]-tg.y))-(Math.abs(q[0]-tg.x)+Math.abs(q[1]-tg.y)));if(op[0]){e.x=op[0][0];e.y=op[0][1]}}if(md(tg,e)==1){tg.hp-=3;msg='El enemigo ataca: −3';shake(2)}}U.forEach(u=>u.a=0);ph='p';const vic=E.every(e=>e.hp<=0),der=U.every(u=>u.hp<=0);if(vic||der){reset();msg=vic?'¡Victoria! Nueva partida':'Derrota. Nueva partida'}}}
clr();for(let i=0;i<w;i++)for(let j=0;j<h;j++){const k=i+','+j;rect(ox+i*S+1,oy+j*S+1,S-2,S-2,wall.has(k)?'#3a3f5c':sel&&k in sel.R?'#4cc9f044':'#1f2333')}
for(const u of U)if(u.hp>0){rect(ox+u.x*S+4,oy+u.y*S+4,S-8,S-8,u.a?GY:u.c);bar(ox+u.x*S+3,oy+u.y*S+1,S-6,3,u.hp/10,GR);if(sel&&sel.u===u)srect(ox+u.x*S+2,oy+u.y*S+2,S-4,S-4,Y,2)}for(const e of E)if(e.hp>0){circ(ox+e.x*S+S/2,oy+e.y*S+S/2,9,RD);bar(ox+e.x*S+3,oy+e.y*S+1,S-6,3,e.hp/6,GR)}txt(ph=='p'?'Tu turno':'Turno enemigo…',8,12,10,ph=='p'?GR:RD);txt(msg,312,12,10,Y,'right')}});

def('est','Triángulo de ventajas','Cada tipo de unidad vence a uno y pierde contra otro. Ninguna opción domina, todo depende de la lectura del rival.','Fire Emblem (armas), Pokémon (tipos), Age of Empires','Elige tu unidad contra la de la CPU.','',()=>{
const N=['Caballería','Lanceros','Arqueros'],C=[OR,BL,GR],beats=[2,0,1];let cpu=-1,me=-1,res='',sc=[0,0];
return dt=>{clr();let pk=-1;N.forEach((n,i)=>{if(btn(10+i*102,150,96,34,n,C[i]+'55'))pk=i});if(pk>=0){me=pk;cpu=RI(0,2);res=me==cpu?'Empate':beats[me]==cpu?'¡Ganas!':'Pierdes';if(res=='¡Ganas!')sc[0]++;if(res=='Pierdes')sc[1]++}
txt('Caballería > Arqueros > Lanceros > Caballería',160,14,10,GY,'center');txt(sc[0]+' – '+sc[1],160,36,14,WH,'center');if(me>=0){rect(70,56,40,40,C[me]);txt(N[me],90,106,10,WH,'center');rect(210,56,40,40,C[cpu]);txt(N[cpu]+' (CPU)',230,106,10,WH,'center');txt('vs',160,76,12,GY,'center');txt(res,160,128,14,Y,'center')}}});

def('est','Construcción de mazo','Robas cartas de un mazo, las juegas con un límite de energía por turno y ves la intención del enemigo para planificar.','Slay the Spire, Monster Train, Inscryption','Toca cartas para jugarlas; luego Fin de turno.','',()=>{
const CD={Golpe:[1,'6 de daño',RD],Defensa:[1,'5 de escudo',BL],Tajo:[2,'12 de daño',OR],Veneno:[1,'3 de veneno',GR],Foco:[0,'+1 energía',PU]};let deck,hand,disc,en,me,energy,msg,intent;
const draw_=n=>{for(let i=0;i<n;i++){if(!deck.length){deck=disc.sort(()=>Math.random()-.5);disc=[]}if(deck.length)hand.push(deck.pop())}};const newI=()=>intent=Math.random()<.7?['atk',RI(5,11)]:['def',6];
const turn=()=>{disc.push(...hand);hand=[];energy=3;me.bl=0;draw_(5);newI()};const reset=()=>{deck=['Golpe','Golpe','Golpe','Golpe','Defensa','Defensa','Defensa','Tajo','Veneno','Foco'].sort(()=>Math.random()-.5);hand=[];disc=[];en={hp:40,bl:0,ps:0,mx:40};me={hp:40,bl:0};msg='';turn()};reset();
const dmg=n=>{const b=Math.min(en.bl,n);en.bl-=b;en.hp-=n-b};
const play=i=>{const c=hand[i],d=CD[c];if(d[0]>energy)return;energy-=d[0];hand.splice(i,1);disc.push(c);if(c=='Golpe')dmg(6);if(c=='Tajo')dmg(12);if(c=='Defensa')me.bl+=5;if(c=='Veneno')en.ps+=3;if(c=='Foco')energy++;if(en.hp<=0){msg='¡Victoria! Nuevo enemigo';const m=40+RI(0,10);en={hp:m,bl:0,ps:0,mx:m}}};
const end=()=>{if(en.ps>0){en.hp-=en.ps;en.ps--}en.bl=0;if(intent[0]=='atk'){const b=Math.min(me.bl,intent[1]);me.hp-=intent[1]-b;shake(3)}else en.bl+=intent[1];if(me.hp<=0){reset();msg='Derrota. Nueva partida';return}turn()};
return dt=>{clr();circ(240,48,22,PU);bar(215,76,50,5,en.hp/en.mx,RD);txt(en.hp+' PV'+(en.bl?' · esc. '+en.bl:'')+(en.ps?' · ven. '+en.ps:''),240,88,9,WH,'center');txt(intent[0]=='atk'?'Intención: atacar '+intent[1]:'Intención: defender '+intent[1],240,14,10,intent[0]=='atk'?RD:BL,'center');
rect(50,36,20,34,BL);bar(35,76,50,5,me.hp/40,GR);txt(me.hp+' PV'+(me.bl?' · esc. '+me.bl:''),60,88,9,WH,'center');txt('Energía '+energy+'/3',8,12,11,Y);let pk=-1;
hand.forEach((c,i)=>{const d=CD[c],x=8+i*60;if(btn(x,104,56,64,'',d[0]<=energy?d[2]+'55':'#23263a'))pk=i;txt(c,x+28,122,10,WH,'center');wrap(d[1],x+4,142,50,8,WH);circ(x+8,110,7,Y);txt(d[0],x+8,110,9,BG,'center')});if(pk>=0)play(pk);
if(btn(236,174,80,22,'Fin de turno'))end();txt(msg,8,186,9,Y)}});

def('est','Conquista de planetas','Envías tropas entre nodos que producen unidades solos; capturas los débiles y defiendes los tuyos.','Galcon, Eufloria, Auralux','Toca un planeta azul y luego un destino: envía la mitad de sus naves.','',()=>{
let Pl,fl=[],sel=null,ai=2;const reset=()=>{Pl=[{x:40,y:100,r:16,o:1,n:20},{x:280,y:100,r:16,o:2,n:20}];for(let i=0;i<7;i++)Pl.push({x:R(90,230),y:R(25,175),r:R(8,14),o:0,n:RI(3,12)});fl=[];sel=null};reset();
const send=(a,b)=>{const k=Math.floor(a.n/2);if(k<1)return;a.n-=k;fl.push({x:a.x,y:a.y,t:b,n:k,o:a.o})};
return dt=>{for(const p of Pl)if(p.o)p.n+=p.r*.06*dt;ai-=dt;if(ai<=0){ai=2.5;const mine=Pl.filter(p=>p.o==2).sort((a,b)=>b.n-a.n)[0];if(mine){const tg=Pl.filter(p=>p.o!=2&&p.n<mine.n/2).sort((a,b)=>dist(a.x,a.y,mine.x,mine.y)-dist(b.x,b.y,mine.x,mine.y))[0];if(tg)send(mine,tg)}}
if(PT){const p=Pl.find(p=>dist(P.x,P.y,p.x,p.y)<p.r+8);if(p){if(sel&&sel!==p){send(sel,p);sel=null}else if(p.o==1)sel=p}else sel=null}
for(const f of fl){const d=dist(f.x,f.y,f.t.x,f.t.y);if(d<f.t.r){f.d=1;if(f.t.o==f.o)f.t.n+=f.n;else{f.t.n-=f.n;if(f.t.n<0){f.t.n=-f.t.n;f.t.o=f.o}}}else{f.x+=(f.t.x-f.x)/d*60*dt;f.y+=(f.t.y-f.y)/d*60*dt}}fl=fl.filter(f=>!f.d);
const alive=o=>Pl.some(p=>p.o==o)||fl.some(f=>f.o==o);if(!alive(1)||!alive(2))reset();
clr('#070814');const C=[GY,BL,RD];for(const p of Pl){circ(p.x,p.y,p.r,C[p.o]+'aa');if(p===sel)ring(p.x,p.y,p.r+4,Y,2);txt(Math.floor(p.n),p.x,p.y,10,WH,'center')}for(const f of fl){circ(f.x,f.y,3,C[f.o]);txt(f.n,f.x+6,f.y-6,8,C[f.o])}txt('Tú: azul · CPU: rojo',8,10,10,GY)}});

def('est','Combate automático (autobattler)','Preparas y colocas tu equipo antes de la ronda; luego el combate se resuelve solo. La estrategia está en la composición.','Teamfight Tactics, Super Auto Pets, Dota Underlords','Toca las casillas para elegir unidades y pulsa ¡Luchar!','',()=>{
const TY=[['Guerrero',BL,30,4,20],['Arquero',GR,15,3,90],['Mago',PU,12,6,70]],ES=()=>[RI(0,2),RI(0,2),RI(0,2)];let slots=[-1,-1,-1],ph='prep',A=[],res='',wins=0,enemy=ES();
const mk=(t,x,y,side)=>({t,x,y,side,hp:TY[t][2],cd:R(0,.5),fx:0,tg:null});
return dt=>{clr();if(ph=='prep'){txt('Prepara tu equipo · rival a la derecha',8,12,10,GY);slots.forEach((s,i)=>{if(btn(30,28+i*44,96,36,s<0?'vacío':TY[s][0],s<0?'#23263a':TY[s][1]+'66'))slots[i]=(s+2)%4-1});enemy.forEach((t,i)=>{rect(214,30+i*44,52,32,TY[t][1]+'66');txt(TY[t][0],240,46+i*44,9,WH,'center')});
if(btn(120,164,84,28,'¡Luchar!','#3b4a2f')&&slots.some(s=>s>=0)){A=[];slots.forEach((s,i)=>{if(s>=0)A.push(mk(s,60,46+i*44,0))});enemy.forEach((t,i)=>A.push(mk(t,260,46+i*44,1)));ph='fight';res=''}}
else{for(const u of A){if(u.hp<=0)continue;const foes=A.filter(o=>o.side!=u.side&&o.hp>0);if(!foes.length)continue;const tg=foes.sort((a,b)=>dist(u.x,u.y,a.x,a.y)-dist(u.x,u.y,b.x,b.y))[0],d=dist(u.x,u.y,tg.x,tg.y);if(d>TY[u.t][4]){u.x+=(tg.x-u.x)/d*40*dt;u.y+=(tg.y-u.y)/d*40*dt}else{u.cd-=dt;if(u.cd<=0){u.cd=1;tg.hp-=TY[u.t][3];u.fx=.15;u.tg=tg}}u.fx-=dt}
const l=A.some(u=>u.side==0&&u.hp>0),r=A.some(u=>u.side==1&&u.hp>0);for(const u of A){if(u.hp<=0)continue;circ(u.x,u.y,9,TY[u.t][1]);if(u.side)ring(u.x,u.y,11,RD,1.5);bar(u.x-9,u.y-15,18,3,u.hp/TY[u.t][2],GR);if(u.fx>0&&u.tg)line(u.x,u.y,u.tg.x,u.tg.y,Y,1)}
if(!l||!r){if(!res){res=l?'¡Victoria!':'Derrota';if(l)wins++}txt(res+' · toca para otra ronda',160,100,13,Y,'center');if(PT){ph='prep';enemy=ES()}}txt('Victorias '+wins,8,12,10)}}});
