const W=320,H=200;let G=null,K={},KP={},P={x:0,y:0,down:false},PT=false,PR=false,SH=0,T=0;
const Y='#ffd447',RD='#ff5a5f',BL='#4cc9f0',GR='#7ae582',PU='#b388ff',OR='#ff9f43',WH='#f4f1ea',GY='#5a6078',BG='#12141f';
const key=k=>!!K[k],hit=k=>!!KP[k];
const R=(a=0,b=1)=>a+Math.random()*(b-a),RI=(a,b)=>Math.floor(R(a,b+1)),cl=(v,a,b)=>v<a?a:v>b?b:v,dist=(a,b,c,d)=>Math.hypot(c-a,d-b),lerp=(a,b,t)=>a+(b-a)*t;
const ov=(a,b)=>a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;
const inR=(px,py,x,y,w,h)=>px>=x&&px<x+w&&py>=y&&py<y+h;
function clr(c=BG){G.fillStyle=c;G.fillRect(-30,-30,W+60,H+60)}
function rect(x,y,w,h,c){G.fillStyle=c;G.fillRect(x,y,w,h)}
function srect(x,y,w,h,c,lw=1){G.strokeStyle=c;G.lineWidth=lw;G.strokeRect(x,y,w,h)}
function circ(x,y,r,c){G.fillStyle=c;G.beginPath();G.arc(x,y,Math.max(0,r),0,7);G.fill()}
function ring(x,y,r,c,lw=1){G.strokeStyle=c;G.lineWidth=lw;G.beginPath();G.arc(x,y,Math.max(0,r),0,7);G.stroke()}
function line(a,b,c,d,col,lw=2){G.strokeStyle=col;G.lineWidth=lw;G.beginPath();G.moveTo(a,b);G.lineTo(c,d);G.stroke()}
function txt(s,x,y,sz=11,c=WH,al='left'){G.fillStyle=c;G.font='600 '+sz+'px Inter,system-ui,sans-serif';G.textAlign=al;G.textBaseline='middle';G.fillText(String(s),x,y)}
function bar(x,y,w,h,f,c,bg='#2a2e44'){rect(x,y,w,h,bg);rect(x,y,w*cl(f||0,0,1),h,c)}
function shake(n){SH=Math.max(SH,n)}
function dir(){let x=(key('r')?1:0)-(key('l')?1:0),y=(key('d')?1:0)-(key('u')?1:0);const m=Math.hypot(x,y)||1;return[x/m,y/m]}
function btn(x,y,w,h,label,c='#2f3550'){const o=inR(P.x,P.y,x,y,w,h);rect(x,y,w,h,o&&P.down?'#ffffff33':c);srect(x+.5,y+.5,w-1,h-1,'#ffffff40');if(label!=='')txt(label,x+w/2,y+h/2,10,WH,'center');return PT&&o}
function wrap(s,x,y,mw,sz=11,c=WH){G.font='600 '+sz+'px Inter,system-ui,sans-serif';const ws=String(s).split(' ');let ln='',yy=y;for(const w of ws){const t=ln?ln+' '+w:w;const mt=G.measureText(t);if(mt&&mt.width>mw&&ln){txt(ln,x,yy,sz,c);ln=w;yy+=sz*1.35}else ln=t}if(ln)txt(ln,x,yy,sz,c);return yy}
function fmt(n){return n<1e3?Math.floor(n)+'':n<1e6?(n/1e3).toFixed(1)+'K':n<1e9?(n/1e6).toFixed(2)+'M':(n/1e9).toFixed(2)+'B'}
function segD(px,py,x1,y1,x2,y2){const dx=x2-x1,dy=y2-y1,L=dx*dx+dy*dy||1,t=cl(((px-x1)*dx+(py-y1)*dy)/L,0,1);return dist(px,py,x1+dx*t,y1+dy*t)}
function segX(a,b,c,d,e,f,g,h){const r=(c-a)*(h-f)-(d-b)*(g-e);if(!r)return false;const t=((e-a)*(h-f)-(f-b)*(g-e))/r,u=((e-a)*(d-b)-(f-b)*(c-a))/r;return t>=0&&t<=1&&u>=0&&u<=1}
function pathAt(Wp,d){for(let i=0;i<Wp.length-1;i++){const l=dist(Wp[i][0],Wp[i][1],Wp[i+1][0],Wp[i+1][1]);if(d<=l){const t=d/l;return[lerp(Wp[i][0],Wp[i+1][0],t),lerp(Wp[i][1],Wp[i+1][1],t)]}d-=l}return null}
function bseg(b,r,x1,y1,x2,y2,vx2=0,vy2=0,e=.6){const dx=x2-x1,dy=y2-y1,L=dx*dx+dy*dy||1,t=cl(((b.x-x1)*dx+(b.y-y1)*dy)/L,0,1),px=x1+dx*t,py=y1+dy*t,ex=b.x-px,ey=b.y-py,d=Math.hypot(ex,ey);if(d<r&&d>0){const nx=ex/d,ny=ey/d;b.x=px+nx*r;b.y=py+ny*r;const rv=(b.vx-vx2)*nx+(b.vy-vy2)*ny;if(rv<0){b.vx-=(1+e)*rv*nx;b.vy-=(1+e)*rv*ny}return{t,px,py}}return false}
function PX(){const a=[];return{a,add(x,y,n=8,c=Y,s=80,l=.5){for(let i=0;i<n;i++){const t=R(0,6.283),v=R(.3,1)*s;a.push({x,y,vx:Math.cos(t)*v,vy:Math.sin(t)*v,l,m:l,c})}},run(dt,gr=0){for(let i=a.length;i--;){const p=a[i];p.l-=dt;if(p.l<=0){a.splice(i,1);continue}p.vy+=gr*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;circ(p.x,p.y,2*p.l/p.m+.5,p.c)}}}}
function FT(){const a=[];return{add(s,x,y,c=WH,sz=14){a.push({s,x:x+R(-8,8),y,l:.8,c,sz})},run(dt){for(let i=a.length;i--;){const o=a[i];o.l-=dt;o.y-=30*dt;if(o.l<=0){a.splice(i,1);continue}G.globalAlpha=Math.min(1,o.l*2);txt(o.s,o.x,o.y,o.sz,o.c,'center');G.globalAlpha=1}}}}
function VR(){const p=[],s=[];return{p,s,pt(x,y,pin){const o={x,y,ox:x,oy:y,pin};p.push(o);return o},st(a,b,l){s.push({a,b,l:l==null?dist(a.x,a.y,b.x,b.y):l})},step(dt,g=500,it=6){for(const o of p){if(o.pin)continue;const vx=(o.x-o.ox)*.995,vy=(o.y-o.oy)*.995;o.ox=o.x;o.oy=o.y;o.x+=vx;o.y+=vy+g*dt*dt}for(let k=0;k<it;k++)for(const c of s){if(c.cut)continue;const dx=c.b.x-c.a.x,dy=c.b.y-c.a.y,d=Math.hypot(dx,dy)||1,df=(d-c.l)/d/2;if(!c.a.pin){c.a.x+=dx*df;c.a.y+=dy*df}if(!c.b.pin){c.b.x-=dx*df;c.b.y-=dy*df}}}}}
function body(x,y,w=12,h=16){return{x,y,w,h,vx:0,vy:0,g:false,c:false,face:1,on:null,drop:false}}
function phys(b,S,dt,gr=900){b.vy=cl(b.vy+gr*dt,-600,600);b.x+=b.vx*dt;for(const s of S)if(!s.oneway&&ov(b,s)){if(b.vx>0)b.x=s.x-b.w;else if(b.vx<0)b.x=s.x+s.w;b.vx=0}const py=b.y;b.y+=b.vy*dt;b.g=false;b.c=false;for(const s of S){if(!ov(b,s))continue;if(s.oneway){if(b.vy>0&&py+b.h<=s.y+1&&!b.drop){b.y=s.y-b.h;b.vy=0;b.g=true;b.on=s}continue}if(b.vy>0){b.y=s.y-b.h;b.g=true;b.on=s}else if(b.vy<0){b.y=s.y+s.h;b.c=true;b.on=s}b.vy=0}}
function walk(b,sp=120){const m=(key('r')?1:0)-(key('l')?1:0);b.vx=m*sp;if(m)b.face=m}
function touch(b,S,dx,dy){const q={x:b.x+dx,y:b.y+dy,w:b.w,h:b.h};return S.some(s=>!s.oneway&&ov(q,s))}
function lvl(){return[{x:0,y:184,w:320,h:16},{x:-10,y:-200,w:10,h:400},{x:320,y:-200,w:10,h:400}]}
function drawS(S,c='#3a3f5c'){for(const s of S){if(s.oneway){rect(s.x,s.y,s.w,3,c);for(let i=s.x+4;i<s.x+s.w;i+=10)rect(i,s.y+3,2,3,c)}else{rect(s.x,s.y,s.w,s.h,c);rect(s.x,s.y,s.w,2,'#4e557a')}}}
function hero(b,c=BL){rect(b.x,b.y,b.w,b.h,c);rect(b.x+(b.face>0?b.w-5:2),b.y+4,3,3,BG)}
const turnTo=(a,b,r)=>{const d=((b-a+Math.PI*3)%(Math.PI*2))-Math.PI;return a+cl(d,-r,r)};
const angD=(a,b)=>Math.abs(((a-b+Math.PI*3)%(Math.PI*2))-Math.PI);
const M=[];let CG=null;function def(c,n,d,e,h,p,f){M.push({c,n,d,e,h,p,f,g:CG})}
function group(id,fn){CG=id;fn();CG=null}
function tag(id,cat,names){for(const n of names){const m=M.find(m=>m.n==n);if(!m)throw new Error('falta '+n);m.g=id;if(cat)m.c=cat}}
function rename(a,b){const m=M.find(m=>m.n==a);if(!m)throw new Error('falta '+a);m.n=b}
