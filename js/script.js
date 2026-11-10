// preloader e nav
addEventListener('load',()=>setTimeout(()=>document.getElementById('pre').classList.add('done'),1300));
const nav=document.getElementById('nav');
addEventListener('scroll',()=>nav.classList.toggle('s',scrollY>40),{passive:true});
// reveal + contadores
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;
  const t=e.target;setTimeout(()=>t.classList.add('in'),(t.dataset.d||0));
  t.querySelectorAll('[data-n]').forEach(c=>{const to=+c.dataset.n,st=performance.now();
    (function f(n){const p=Math.min((n-st)/1800,1);c.textContent=Math.round(to*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(st)});
  io.unobserve(t)}),{threshold:.2});
document.querySelectorAll('.rv').forEach((el,i)=>{el.dataset.d=(i%3)*120;io.observe(el)});
// brilho e inclinação 3D nos cartões
const fine=matchMedia('(pointer:fine)').matches;
document.querySelectorAll('.card').forEach(c=>{
  c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
    c.style.setProperty('--x',x+'px');c.style.setProperty('--y',y+'px');
    if(fine)c.style.transform=`rotateX(${(.5-y/r.height)*10}deg) rotateY(${(x/r.width-.5)*10}deg)`});
  c.addEventListener('pointerleave',()=>c.style.transform='')});
// luz que segue o cursor + parallax do logo
const glow=document.getElementById('glow'),logo=document.getElementById('logo');
if(fine)addEventListener('pointermove',e=>{glow.style.transform=`translate(${e.clientX}px,${e.clientY}px)`;
  if(scrollY<innerHeight){logo.style.transform=`translate(${(e.clientX/innerWidth-.5)*-16}px,${(e.clientY/innerHeight-.5)*-12}px)`}});
else glow.style.display='none';
// partículas douradas
const cv=document.getElementById('fx'),cx=cv.getContext('2d');let W,H,ps=[];
function rs(){W=cv.width=cv.offsetWidth;H=cv.height=cv.offsetHeight;ps=Array.from({length:Math.min(70,W/18)},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.8+.4,v:Math.random()*.4+.15,a:Math.random()*6.28}))}
rs();addEventListener('resize',rs);
(function loop(){cx.clearRect(0,0,W,H);
  ps.forEach(p=>{p.y-=p.v;p.x+=Math.sin(p.a+=.01)*.3;if(p.y<-5){p.y=H+5;p.x=Math.random()*W}
    cx.beginPath();cx.fillStyle=`rgba(160,205,255,${.25+Math.sin(p.a*3)*.25+.25})`;cx.shadowColor='#a8d0ff';cx.shadowBlur=8;cx.arc(p.x,p.y,p.r,0,6.28);cx.fill()});
  requestAnimationFrame(loop)})();
// depoimentos
const qs=[["Melhor degradê que já fiz na vida. Cheguei por indicação e agora não troco mais.","Lucas M."],["Ambiente impecável e atendimento de primeira. A toalha quente é outro nível.","André S."],["Pontual, caprichoso e sem pressa. A barba nunca ficou tão bem alinhada.","Felipe R."]];
const q=document.getElementById('q'),dots=document.getElementById('dots');let qi=0,tm;
qs.forEach((_,i)=>{const b=document.createElement('button');b.setAttribute('aria-label','Depoimento '+(i+1));b.onclick=()=>{show(i);clearInterval(tm);tm=setInterval(()=>show((qi+1)%qs.length),6000)};dots.appendChild(b)});
function show(i){qi=i;q.style.opacity=0;setTimeout(()=>{q.innerHTML=`<div class="stars">★★★★★</div>“${qs[i][0]}”<br><small style="font:300 15px Roboto;color:var(--mute);letter-spacing:.1em">— ${qs[i][1]}</small>`;q.style.opacity=1},350);
  [...dots.children].forEach((d,k)=>d.classList.toggle('on',k===i))}
q.style.transition='opacity .35s';show(0);tm=setInterval(()=>show((qi+1)%qs.length),6000);
// agendamento via WhatsApp (troque o número abaixo)
const NUM='5581900000000';
document.getElementById('d').min=new Date().toISOString().split('T')[0];
document.getElementById('f').addEventListener('submit',e=>{e.preventDefault();
  const v=id=>document.getElementById(id).value,dt=v('d').split('-').reverse().join('/');
  const msg=`Olá! Sou ${v('n')} e gostaria de agendar: ${v('s')} no dia ${dt} às ${v('h')}.`;
  document.getElementById('ok').textContent='Abrindo o WhatsApp para confirmar…';
  window.open(`https://wa.me/${NUM}?text=${encodeURIComponent(msg)}`,'_blank')});
