(function(){
  const nav=document.querySelector('nav.top');
  const setH=()=>document.documentElement.style.setProperty('--header-height',nav.offsetHeight+'px');
  setH();addEventListener('resize',setH);
  const b=document.getElementById('burger'),l=document.getElementById('links');
  if(b&&l){b.addEventListener('click',()=>{const o=l.classList.toggle('open');b.setAttribute('aria-expanded',o)});l.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{l.classList.remove('open');b.setAttribute('aria-expanded',false)}))}
  const here=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.links a').forEach(a=>{if(a.getAttribute('href')===here)a.classList.add('on')});
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
  document.querySelectorAll('.rv').forEach(el=>{const r=el.getBoundingClientRect();if(r.top<innerHeight*0.98)el.classList.add('in');else io.observe(el)});
  setTimeout(()=>document.querySelectorAll('.rv:not(.in)').forEach(el=>{if(el.getBoundingClientRect().top<innerHeight)el.classList.add('in')}),900);
  document.querySelectorAll('a[href$=".html"]').forEach(a=>a.addEventListener('click',e=>{if(e.metaKey||e.ctrlKey||a.target==='_blank')return;e.preventDefault();document.body.classList.add('leaving');setTimeout(()=>location.href=a.getAttribute('href'),200)}));
  document.querySelectorAll('[data-count]').forEach(el=>{
    const end=+el.dataset.count,suf=el.dataset.suffix||'';let started=false;
    const o=new IntersectionObserver(es=>{if(es[0].isIntersecting&&!started){started=true;el.closest('.stat')?.classList.add('in');const t0=performance.now();const step=t=>{const p=Math.min(1,(t-t0)/1400);const v=Math.round(end*(1-Math.pow(1-p,3)));el.textContent=v.toLocaleString()+suf;if(p<1)requestAnimationFrame(step)};requestAnimationFrame(step)}},{threshold:.5});o.observe(el)});
})();
