(function(){
const X00 = { ctx:null, out:null, rev:null, on:false, timer:null, mood:(window.MOOD||'calme') };
const RM = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

function X01(k,d){ try{ const v=localStorage.getItem(k); return v===null?d:v }catch(e){ return d } }
function X02(k,v){ try{ localStorage.setItem(k,v) }catch(e){} }

function X03(){
  if(X00.ctx) return;
  const C = window.AudioContext||window.webkitAudioContext; if(!C) return;
  const c = X00.ctx = new C();
  X00.out = c.createGain(); X00.out.gain.value = 0; X00.out.connect(c.destination);
  X00.rev = c.createConvolver(); X00.rev.buffer = X04(c,4.5,2.2);
  const rg = c.createGain(); rg.gain.value = .55; X00.rev.connect(rg); rg.connect(X00.out);
  X05(); X06(); X07();
}
function X04(c,sec,dec){
  const n=c.sampleRate*sec, b=c.createBuffer(2,n,c.sampleRate);
  for(let ch=0;ch<2;ch++){ const d=b.getChannelData(ch); for(let i=0;i<n;i++) d[i]=(Math.random()*2-1)*Math.pow(1-i/n,dec); }
  return b;
}
function X05(){
  const c=X00.ctx, f=c.createBiquadFilter(), g=c.createGain();
  f.type='lowpass'; f.frequency.value=260; f.Q.value=6; g.gain.value=.07;
  const base = X00.mood==='tension'?41.2:55;
  [base, base*1.007, base*1.5*0.997, base/2].forEach((hz,i)=>{
    const o=c.createOscillator(); o.type=i===3?'sine':'sawtooth'; o.frequency.value=hz;
    const og=c.createGain(); og.gain.value=i===3?.9:.35; o.connect(og); og.connect(f); o.start();
  });
  const l=c.createOscillator(), lg=c.createGain(); l.frequency.value=.05; lg.gain.value=140; l.connect(lg); lg.connect(f.frequency); l.start();
  f.connect(g); g.connect(X00.out); g.connect(X00.rev);
}
function X06(){
  const c=X00.ctx, n=c.sampleRate*3, b=c.createBuffer(1,n,c.sampleRate), d=b.getChannelData(0);
  for(let i=0;i<n;i++) d[i]=Math.random()*2-1;
  const s=c.createBufferSource(); s.buffer=b; s.loop=true;
  const f=c.createBiquadFilter(); f.type='bandpass'; f.frequency.value=500; f.Q.value=.8;
  const g=c.createGain(); g.gain.value=.025;
  const l=c.createOscillator(), lg=c.createGain(); l.frequency.value=.09; lg.gain.value=.02; l.connect(lg); lg.connect(g.gain); l.start();
  const l2=c.createOscillator(), lg2=c.createGain(); l2.frequency.value=.031; lg2.gain.value=300; l2.connect(lg2); lg2.connect(f.frequency); l2.start();
  s.connect(f); f.connect(g); g.connect(X00.out); s.start();
}
const MEL = [69,72,76,74,72,71,69,68, 69,72,76,77,76,74,72,71];
let mi = 0;
function X07(){
  clearTimeout(X00.timer);
  const step=()=>{
    if(X00.ctx && X00.on){
      const m = MEL[mi++ % MEL.length] + (Math.random()<.12?-12:0);
      X08(440*Math.pow(2,(m-69)/12), Math.random()<.18);
      if(Math.random()<.25) setTimeout(()=>X08(440*Math.pow(2,(m-57)/12)*.5,false,.04),180);
    }
    const t = X00.mood==='tension' ? 900+Math.random()*1600 : 1700+Math.random()*3200;
    X00.timer=setTimeout(step, mi%8===0 ? t+4000 : t);
  };
  step();
}
function X08(hz,wob,vol){
  const c=X00.ctx, t=c.currentTime, v=vol||.07;
  [1,2.01,3.98].forEach((h,i)=>{
    const o=c.createOscillator(), g=c.createGain();
    o.type=i?'sine':'triangle'; o.frequency.value=hz*h;
    if(wob){ o.frequency.setValueAtTime(hz*h,t); o.frequency.linearRampToValueAtTime(hz*h*.94,t+1.6); }
    g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(v/(i+1),t+.005); g.gain.exponentialRampToValueAtTime(.0001,t+2.4-i*.5);
    o.connect(g); g.connect(X00.rev); g.connect(X00.out); o.start(t); o.stop(t+2.6);
  });
}
function X09(){
  if(!X00.ctx||!X00.on) return;
  const c=X00.ctx, t=c.currentTime;
  const n=c.sampleRate*.35, b=c.createBuffer(1,n,c.sampleRate), d=b.getChannelData(0);
  for(let i=0;i<n;i++) d[i]=(Math.random()*2-1)*(Math.random()<.3?1:.2);
  const s=c.createBufferSource(); s.buffer=b; const g=c.createGain(); g.gain.value=.18;
  const f=c.createBiquadFilter(); f.type='highpass'; f.frequency.value=1200;
  s.connect(f); f.connect(g); g.connect(X00.out); s.start(t);
  const o=c.createOscillator(), og=c.createGain(); o.type='sine';
  o.frequency.setValueAtTime(90,t); o.frequency.exponentialRampToValueAtTime(30,t+1.2);
  og.gain.setValueAtTime(.35,t); og.gain.exponentialRampToValueAtTime(.001,t+1.4);
  o.connect(og); og.connect(X00.out); og.connect(X00.rev); o.start(t); o.stop(t+1.5);
}
function X10(on){
  X00.on=on; X02('lina_snd',on?'1':'0');
  if(on){ X03(); if(!X00.ctx) return; X00.ctx.resume(); X00.out.gain.cancelScheduledValues(X00.ctx.currentTime); X00.out.gain.linearRampToValueAtTime(.9,X00.ctx.currentTime+3); }
  else if(X00.ctx){ X00.out.gain.linearRampToValueAtTime(0,X00.ctx.currentTime+.6); }
  X11();
}
function X11(){
  const b=document.getElementById('x-snd'); if(!b) return;
  b.textContent = X00.on ? '♪ son : ON' : '♪ son : OFF';
  b.classList.toggle('x-off',!X00.on);
}

function X12(){
  const st=document.createElement('style');
  st.textContent=`
#x-snd{position:fixed;right:14px;bottom:14px;z-index:1001;font:12px "Courier New",monospace;background:rgba(10,10,12,.85);color:#d9a441;border:1px solid #3a2a10;padding:7px 11px;border-radius:3px;cursor:pointer;letter-spacing:.1em}
#x-snd.x-off{color:#777;border-color:#333}
#x-snd.x-pulse{animation:xp 1.6s infinite}
@keyframes xp{50%{box-shadow:0 0 0 6px rgba(217,164,65,.15)}}
.x-glitch{animation:xg .32s steps(2) 1}
@keyframes xg{0%{filter:none;transform:none}20%{filter:contrast(1.8) hue-rotate(80deg);transform:translate(-6px,2px) skewX(4deg)}40%{filter:invert(1) contrast(1.4);transform:translate(5px,-3px)}60%{filter:saturate(3) hue-rotate(-60deg);transform:translate(-2px,4px) skewX(-6deg)}80%{filter:contrast(2);transform:translate(3px,0)}100%{filter:none;transform:none}}
.x-glitch *{text-shadow:2px 0 rgba(255,0,60,.7),-2px 0 rgba(0,220,255,.7)!important}
#x-sub{position:fixed;inset:0;z-index:2000;display:none;place-items:center;background:#000;color:#b3261e;font:bold clamp(28px,9vw,90px) Georgia,serif;letter-spacing:.1em;text-align:center;pointer-events:none}
#x-sub.on{display:grid}
#x-scan{position:fixed;inset:0;pointer-events:none;z-index:997;background:repeating-linear-gradient(0deg,rgba(0,0,0,.08) 0 1px,transparent 1px 3px);mix-blend-mode:multiply}
#x-red{position:fixed;inset:0;pointer-events:none;z-index:996;background:radial-gradient(ellipse at center,transparent 50%,rgba(120,0,0,.35));opacity:0;animation:xr 9s ease-in-out infinite}
@keyframes xr{0%,100%{opacity:0}50%{opacity:1}}
.x-swap{color:#b3261e!important;font-style:italic}
#x-warn{position:fixed;inset:0;z-index:3000;background:#000;color:#bbb;display:grid;place-items:center;font:14px "Courier New",monospace;text-align:center;padding:20px}
#x-warn button{margin-top:22px;background:#111;color:#d9a441;border:1px solid #3a2a10;padding:10px 18px;font:inherit;letter-spacing:.2em;cursor:pointer}
`;
  document.head.appendChild(st);
  const s=document.createElement('div'); s.id='x-scan'; document.body.appendChild(s);
  const r=document.createElement('div'); r.id='x-red'; document.body.appendChild(r);
  const sub=document.createElement('div'); sub.id='x-sub'; document.body.appendChild(sub);
  const b=document.createElement('button'); b.id='x-snd'; b.onclick=e=>{e.stopPropagation(); X10(!X00.on); b.classList.remove('x-pulse')}; document.body.appendChild(b);
  X11();
}
function X13(){
  if(RM) return;
  document.body.classList.add('x-glitch'); X09();
  setTimeout(()=>document.body.classList.remove('x-glitch'),340);
}
const SUBS = ['ELLE TE VOIT','LUCIOLE','REVIENS','🦋','ÉLISE EST RENTRÉE','03:33','TU ES DANS SA CHAMBRE'];
function X14(){
  if(RM) return;
  const s=document.getElementById('x-sub');
  s.textContent=SUBS[Math.floor(Math.random()*SUBS.length)];
  s.classList.add('on'); setTimeout(()=>s.classList.remove('on'),70+Math.random()*60);
}
function X15(){
  const loop=()=>{
    const r=Math.random();
    if(r<.6) X13(); else X14();
    setTimeout(loop, (X00.mood==='tension'?14000:26000)+Math.random()*30000);
  };
  setTimeout(loop, 9000+Math.random()*12000);
}
function X16(){
  const orig=document.title, alt=['reviens…','🦋','elle t\'attend','tu as oublié quelque chose'];
  document.addEventListener('visibilitychange',()=>{ document.title = document.hidden ? alt[Math.floor(Math.random()*alt.length)] : orig; });
}
function X17(){
  const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode:n=>/\bLina\b/.test(n.nodeValue)&&!n.parentElement.closest('script,style,input,textarea,svg')?1:2});
  const nodes=[]; while(w.nextNode()) nodes.push(w.currentNode);
  nodes.forEach(n=>{
    const parts=n.nodeValue.split(/(\bLina\b)/); if(parts.length<2) return;
    const fr=document.createDocumentFragment();
    parts.forEach(p=>{ if(p==='Lina'){ const s=document.createElement('span'); s.textContent='Lina'; s.className='x-n'; fr.appendChild(s);} else fr.appendChild(document.createTextNode(p)); });
    n.parentNode.replaceChild(fr,n);
  });
  document.addEventListener('mouseover',e=>{
    const t=e.target.closest&&e.target.closest('.x-n'); if(!t||t.dataset.b) return;
    if(Math.random()<.35){ t.dataset.b=1; t.textContent='Élise'; t.classList.add('x-swap'); setTimeout(()=>{t.textContent='Lina';t.classList.remove('x-swap');delete t.dataset.b},420); }
  });
}
function X18(){
  try{
    console.log('%c🦋','font-size:60px');
    console.log('%cTu fouilles dans le code ?\nElle aussi, elle fouillait partout.\nElle a fini par trouver la chambre.','color:#b3261e;font:16px Georgia');
  }catch(e){}
}
function X19(){
  if(X01('lina_warn','0')==='1') return;
  const w=document.createElement('div'); w.id='x-warn';
  w.innerHTML='<div>⚠ AVERTISSEMENT ⚠<br><br>Cette expérience contient des images clignotantes,<br>des sons inquiétants et des thèmes d\'enlèvement d\'enfant (fiction).<br><br>Casque recommandé. Joue la nuit si tu l\'oses.<br><button>J\'AI COMPRIS — ENTRER</button></div>';
  document.body.appendChild(w);
  w.querySelector('button').onclick=()=>{ X02('lina_warn','1'); X10(true); w.remove(); };
}
window.LinaFX = { glitch:X13, flash:X14, sting:X09, note:(hz)=>X00.ctx&&X00.on&&X08(hz,true), mood:m=>{X00.mood=m} };

function X20(){
  X12(); X16(); X17(); X18(); X15();
  if(X01('lina_snd','1')==='1'){
    const b=document.getElementById('x-snd'); b.textContent='♪ cliquer pour le son'; b.classList.add('x-pulse','x-off');
    const go=()=>{ if(!X00.on) X10(true); b.classList.remove('x-pulse'); document.removeEventListener('pointerdown',go,true); document.removeEventListener('keydown',go,true); };
    document.addEventListener('pointerdown',go,true); document.addEventListener('keydown',go,true);
  }
  if(document.body.dataset.warn!==undefined) X19();
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',X20); else X20();
})();
