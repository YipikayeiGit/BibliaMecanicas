const fs=require('fs');const files=process.argv.slice(2);
let src=fs.readFileSync(__dirname+'/engine.js','utf8');for(const f of files)src+='\n'+fs.readFileSync(f,'utf8');
src+=`
const mk=()=>{const ret={width:10,addColorStop(){}};const t={};return new Proxy(t,{get:(o,p)=>p in o?o[p]:(o[p]=(...a)=>ret),set:(o,p,v)=>{o[p]=v;return true}})};
let bad=0;const ks=['l','r','u','d','a','b'];
for(const m of M){G=mk();let f,t0=Date.now();try{f=m.f();for(let i=0;i<1500;i++){K={};KP={};for(const k of ks){if(Math.random()<.3)K[k]=true;if(Math.random()<.08)KP[k]=true}
if(i%40<20){P.down=true;P.x=Math.random()*320;P.y=Math.random()*200}else P.down=false;PT=Math.random()<.08;PR=Math.random()<.06;if(PT){P.x=Math.random()*320;P.y=Math.random()*200}
T+=1/60;f(i==0?0:1/60);if(Date.now()-t0>3000)throw new Error('lento')}}catch(e){bad++;console.log('ERROR',m.c,m.n,e.stack.split('\\n').slice(0,3).join(' | '))}
const ms=Date.now()-t0;if(ms>600)console.log('lento',m.n,ms)}
console.log('total',M.length,'fallos',bad);const by={};for(const m of M)by[m.c]=(by[m.c]||0)+1;console.log(JSON.stringify(by));
`;
fs.writeFileSync('/tmp/t.js',src);require('/tmp/t.js');
