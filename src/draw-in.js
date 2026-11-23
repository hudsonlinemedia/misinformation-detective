/* Prof Honey pencil draw-in (from The Misinformation Detective).
   Usage: put her art in a <g mask="url(#scribMask)">, where the mask holds a white <path id="scrib">
   whose d = scribble(300,360,12) and stroke-width ~30; add a pencil <g> built with PENCIL(scale).
   Then: drawIn(document.getElementById('scrib'), pencilG, 1300, ()=>true, -40)  // top-to-bottom reveal */
const reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const PENCIL=s=>`<g class="pen" opacity="0"><g transform="scale(${s})"><polygon points="0,0 9,-3.5 9,3.5" fill="#333"/><polygon points="9,-3.5 24,-8 24,8 9,3.5" fill="#e9d3a6" stroke="#111" stroke-width="1.2" stroke-linejoin="round"/><rect x="24" y="-8" width="72" height="16" fill="#8f8f8f" stroke="#111" stroke-width="1.2"/><rect x="96" y="-8" width="11" height="16" fill="#bbb" stroke="#111" stroke-width="1.2"/><rect x="107" y="-8" width="13" height="16" rx="3" fill="#c0202b" stroke="#111" stroke-width="1.2"/></g></g>`;
function scribble(w,h,step){let seed=11;const rnd=()=>{seed=(seed*9301+49297)%233280;return seed/233280};let d='M-12 -8',y=-8,left=true;while(y<h+12){y+=step+rnd()*3;const x=left?w+12-rnd()*8:-12+rnd()*8;d+=` L${x.toFixed(1)} ${y.toFixed(1)}`;left=!left}return d}
function drawIn(path,pencil,dur,alive,rot){return new Promise(res=>{const len=path.getTotalLength();path.style.strokeDasharray=len;
 if(reduce||dur<=0){path.style.strokeDashoffset=0;if(pencil)pencil.setAttribute('opacity',0);res();return}
 path.style.strokeDashoffset=len;if(pencil)pencil.setAttribute('opacity',1);const t0=performance.now();
 const step=now=>{if(!alive()){path.style.strokeDashoffset=0;if(pencil)pencil.setAttribute('opacity',0);res();return}
  const t=Math.min((now-t0)/dur,1),k=t*len;path.style.strokeDashoffset=len-k;
  if(pencil){const p=path.getPointAtLength(k);pencil.setAttribute('transform',`translate(${p.x.toFixed(1)},${p.y.toFixed(1)}) rotate(${rot||-40})`)}
  if(t<1)requestAnimationFrame(step);else{if(pencil){let o=1;const fade=()=>{o-=.1;pencil.setAttribute('opacity',Math.max(o,0));if(o>0)requestAnimationFrame(fade)};fade()}res()}};
 requestAnimationFrame(step)})}
