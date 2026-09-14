'use strict';
/* ── CONSTANTS ── */
const LANES=3,PLAYER_Y=0.78,POST_H=40,HEART_R=11,NEAR_MISS=34;
const PART_POOL_SIZE=64;
const WAVES=[[0,2],[1],[0,1],[2],[0,2],[1,2],[0],[0,1,2]];
const STAGES=['Egg','Hatchling','Timeline Cub','Thread Beast','Viral Legend'];
const STAGE_EMOJI=['🥚','🐣','🐻','🐉','👑'];
const STAGE_TIP=['A warm little egg. Feed it your best runs.','Peeking out! Keep the treats coming.','Timeline Cub is learning the lanes.','Thread Beast rules the feed.','Viral Legend. You raised a star ✨'];
const STAGE_PALETTE=[
  {body0:'#93c5fd',body1:'#3b82f6',glow:'rgba(147,197,253,0.5)',accent:'#60a5fa'},
  {body0:'#7dd3fc',body1:'#0ea5e9',glow:'rgba(125,211,252,0.5)',accent:'#38bdf8'},
  {body0:'#6ee7b7',body1:'#059669',glow:'rgba(110,231,183,0.45)',accent:'#34d399'},
  {body0:'#c4b5fd',body1:'#7c3aed',glow:'rgba(196,181,253,0.5)',accent:'#a78bfa'},
  {body0:'#fcd34d',body1:'#f59e0b',glow:'rgba(252,211,77,0.55)',accent:'#fbbf24'}
];
const STORAGE_KEY='nix_dodge_v24';/* v2.4.2 touch-menu fix */
const SPEED_MIN=2.6,SPEED_MAX=7.8;
const MAX_LIVES=3,MAX_MULT=8,SHIELD_FRAMES=120;
const INVULN_FRAMES_START=40,INVULN_FRAMES_HIT=55,INVULN_FRAMES_SHIELD=30;
const SPAWN_BASE=780,SPAWN_MIN=320,SPAWN_DECAY=9;
const HIT_RADIUS_REDUCTION=5;

/* ── PURE FUNCTIONS (testable) ── */
function recomputeLanes(W){
  if(!W)return[0,0,0];
  const m=W*0.13,step=(W-m*2)/LANES;
  return [m+0.5*step, m+1.5*step, m+2.5*step];
}
function laneX(lane,laneXs){
  if(!laneXs||!laneXs.length)laneXs=[0,0,0];
  const i=lane|0;
  if(lane===i)return laneXs[i]||0;
  const a=laneXs[i]||0,b=laneXs[Math.min(i+1,LANES-1)]||a;
  return a+(b-a)*(lane-i);
}
function circleRect(px,py,pr,rx,ry,rw,rh){
  const cx=Math.max(rx,Math.min(px,rx+rw)),cy=Math.max(ry,Math.min(py,ry+rh)),dx=px-cx,dy=py-cy;
  return dx*dx+dy*dy<pr*pr;
}
function scoreOf(dist,hearts,mult,nearMisses){
  return Math.floor(dist*0.14+hearts*30*mult+nearMisses*24);
}
function stageThreshold(s){const v=[0,110,200,310,450][s];return v!=null?v:9999}
function powerOf(care){return care.att+care.ene+care.mood+care.total*0.02}
function clampCare(v){return Math.max(0,Math.min(100,Math.round(v)))}
function computeSpeed(dist){
  if(dist<900)return SPEED_MIN+dist/2200;
  if(dist<2400)return 3.3+(dist-900)/2000;
  return Math.min(SPEED_MAX,4.0+(dist-2400)/1600);
}
function spawnInterval(dist){return Math.max(SPAWN_MIN,SPAWN_BASE-dist/SPAWN_DECAY)}
function validateCareData(raw){
  if(!raw||typeof raw!=='object')return{att:40,ene:40,mood:40,stage:0,total:0};
  const c={att:40,ene:40,mood:40,stage:0,total:0};
  if(typeof raw.att==='number')c.att=clampCare(raw.att);
  if(typeof raw.ene==='number')c.ene=clampCare(raw.ene);
  if(typeof raw.mood==='number')c.mood=clampCare(raw.mood);
  if(typeof raw.stage==='number'&&raw.stage>=0)c.stage=Math.min(4,raw.stage|0);
  if(typeof raw.total==='number'&&raw.total>=0)c.total=raw.total;
  return c;
}
function validateStorage(raw){
  if(!raw||typeof raw!=='object')return{best:0, care:validateCareData(null)};
  const b=typeof raw.best==='number'&&raw.best>=0?Math.floor(raw.best):0;
  return{best:b, care:validateCareData(raw.care)};
}

/* ── CANVAS + AUDIO ── */
const canvas=document.getElementById('c');
let ctx,W=0,H=0,dpr;
try{ctx=canvas.getContext('2d');dpr=Math.min(devicePixelRatio||1,2)}catch(e){ctx=null;dpr=1}
const laneXs=[0,0,0];
function recomputeLanesInPlace(){if(!W)return;const m=W*0.13,step=(W-m*2)/LANES;for(let i=0;i<LANES;i++)laneXs[i]=m+(i+0.5)*step}
function laneXLocal(lane){return laneX(lane,laneXs)}
function resize(){
  const par=canvas.parentElement;
  if(!par)return;
  const r=par.getBoundingClientRect();
  W=r.width||380;H=r.height||640;
  if(ctx){canvas.width=(W*dpr)|0;canvas.height=(H*dpr)|0;ctx.setTransform(dpr,0,0,dpr,0,0);ctx.imageSmoothingEnabled=false}
  recomputeLanesInPlace();
}
resize();
addEventListener('resize',resize);

let actx=null;
function beep(f,d,type,vol){
  try{
    if(!actx)actx=new(window.AudioContext||window.webkitAudioContext)();
    if(actx.state==='suspended')actx.resume();
    const o=actx.createOscillator(),g=actx.createGain();
    o.type=type||'sine';o.frequency.value=f;
    g.gain.setValueAtTime(vol||0.06,actx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001,actx.currentTime+d);
    o.connect(g);g.connect(actx.destination);
    o.start();o.stop(actx.currentTime+d);
  }catch(e){}
}
/* Respect reduced motion */
const prefersReducedMotion=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function playBeep(f,d,type,vol){if(!prefersReducedMotion)beep(f,d,type,vol)}

/* ── PERSISTENCE ── */
let best=0;
let care={att:40,ene:40,mood:40,stage:0,total:0};
try{
  const parsed=JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}');
  const validated=validateStorage(parsed);
  best=validated.best;
  care=validated.care;
}catch(e){}
function save(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify({best,care}))}catch(e){}}

/* ── STATE ── */
let spentThisRun=false;
let mode='menu',targetLane=1,visualLane=1,lives=MAX_LIVES;
let dist=0,hearts=0,mult=1,nearMisses=0,speed=SPEED_MIN;
let posts=[],floats=[];
let inv=0,shake=0,spawnT=0,runScore=0,streak=0,shield=0,slowmo=0;
let wave=0,waveT=0,maxMult=1;
let cleanFlash=0,hitFlash=0,collectFlash=0,laneFlash=0;

/* ── PARTICLE POOL (fixed-size, no allocations in hot loop) ── */
const partPool=new Array(PART_POOL_SIZE);
const freeList=new Array(PART_POOL_SIZE);
let freeTop=PART_POOL_SIZE;
for(let i=0;i<PART_POOL_SIZE;i++){
  partPool[i]={x:0,y:0,vx:0,vy:0,life:0,color:'#fff',size:3,active:false,_i:i};
  freeList[i]=PART_POOL_SIZE-1-i;
}
function acquirePart(x,y,vx,vy,color,size){
  let pt;
  if(freeTop>0){const idx=freeList[--freeTop];pt=partPool[idx]}
  else pt=partPool[0];
  pt.x=x;pt.y=y;pt.vx=vx;pt.vy=vy;pt.life=1;pt.color=color;pt.size=size||3;pt.active=true;
  return pt;
}
function releasePart(pt){if(!pt.active)return;pt.active=false;if(freeTop<PART_POOL_SIZE)freeList[freeTop++]=pt._i}
function resetPool(){for(let i=0;i<PART_POOL_SIZE;i++){partPool[i].active=false;freeList[i]=PART_POOL_SIZE-1-i}freeTop=PART_POOL_SIZE}
function activeParticleCount(){let c=0;for(let i=0;i<PART_POOL_SIZE;i++)if(partPool[i].active)c++;return c}

/* ── DOM HELPERS ── */
const $=id=>document.getElementById(id);
function addPop(text,x,y,color){
  const root=$('root');if(!root)return;
  const el=document.createElement('div');
  el.className='pop';el.textContent=text;
  el.style.left=(x-20)+'px';el.style.top=y+'px';el.style.color=color||'#fff';
  root.appendChild(el);
  setTimeout(()=>{if(el.parentNode)el.remove()},700);
}
function spawnCareFloat(txt,color,xOff){
  const panel=$('carePanel');if(!panel)return;
  const el=document.createElement('div');
  el.className='care-float';el.textContent=txt;
  el.style.color=color||'#fbbf24';
  el.style.left=(48+(xOff||0))+'%';el.style.top='38%';
  panel.appendChild(el);
  setTimeout(()=>{if(el.parentNode)el.remove()},950);
}
function spawnCareBurst(){
  const host=$('careBurst');if(!host)return;
  /* Remove any lingering children safely */
  while(host.firstChild)host.removeChild(host.firstChild);
  const colors=['#f91880','#1d9bf0','#fbbf24','#34d399','#fb7185','#a78bfa'];
  for(let i=0;i<14;i++){
    const d=document.createElement('i');
    const ang=Math.random()*Math.PI*2;
    const dist=28+Math.random()*50;
    d.style.position='absolute';
    d.style.width=(4+Math.random()*5)+'px';
    d.style.height=d.style.width;
    d.style.borderRadius='50%';
    d.style.background=colors[i%colors.length];
    d.style.left='50%';d.style.top='40%';
    d.style.transform='translate(-50%,-50%)';
    try{d.animate([
      {transform:'translate(-50%,-50%) scale(1)',opacity:1},
      {transform:'translate(calc(-50% + '+Math.cos(ang)*dist+'px), calc(-50% + '+Math.sin(ang)*dist+'px)) scale(0)',opacity:0}
    ],{duration:700,easing:'ease-out',fill:'forwards'})}catch(e){}
    host.appendChild(d);
  }
  setTimeout(()=>{while(host.firstChild)host.removeChild(host.firstChild)},800);
}

