// ===== 1. Tarjimalar: matn qo'shish/o'zgartirish uchun shu obyektni tahrirlang =====
const P1U="Talabalar uchun ko'nikma va ish topish platformasi: o'z ko'nikmalaringni ko'rsat, mos ish va amaliyotlarni top. Loyiha ustida hozir ishlayapman.",P1E="A skills and job-finding platform for students: showcase your skills and find matching jobs and internships. Currently in development.",SU="Yangi loyiha ustida ish boshlanadi. Kuzatib boring!",SE="A new project is on the way. Stay tuned!";
const T={
uz:{nav_about:"Men haqimda",nav_skills:"Ko'nikmalar",nav_projects:"Loyihalar",nav_contact:"Aloqa",hi:"Salom, men",lead:"G'oyalarni toza kod va jonli interfeyslarga aylantiraman.",btn_work:"Ishlarimni ko'rish",btn_contact:"Bog'lanish",about_t:"Men haqimda",about_p:"Men dasturchiman. Veb-sahifalarni nafaqat ishlaydigan, balki yoqimli his qilinadigan qilib yarataman. Yangi texnologiyalarni o'rganish va murakkab muammolarni oddiy yechimlarga aylantirish menga yoqadi.",skills_t:"Ko'nikmalar",projects_t:"Loyihalar",wip:"Jarayonda",soon:"Tez orada",p1_t:"SkillMatch",p2_t:"Yangi loyiha",p3_t:"Yangi loyiha",p1_d:P1U,p2_d:SU,p3_d:SU,view:"GitHub'da ko'rish",contact_t:"Birga ishlaymizmi?",contact_p:"Loyihangiz bormi? Yozing, muhokama qilamiz.",roles:["Frontend dasturchi","Veb dizayner","Muammo yechuvchi"]},
en:{nav_about:"About",nav_skills:"Skills",nav_projects:"Projects",nav_contact:"Contact",hi:"Hi, I'm",lead:"I turn ideas into clean code and living interfaces.",btn_work:"See my work",btn_contact:"Get in touch",about_t:"About me",about_p:"I'm a developer. I build web pages that don't just work, they feel good to use. I enjoy learning new technologies and turning complex problems into simple solutions.",skills_t:"Skills",projects_t:"Projects",wip:"In progress",soon:"Coming soon",p1_t:"SkillMatch",p2_t:"New project",p3_t:"New project",p1_d:P1E,p2_d:SE,p3_d:SE,view:"View on GitHub",contact_t:"Shall we work together?",contact_p:"Have a project? Write to me and we'll talk it through.",roles:["Frontend Developer","Web Designer","Problem Solver"]}};
// ===== 2. Yordamchi funksiyalar va holat (localStorage xato bersa ham ishlaydi) =====
const $=s=>document.querySelector(s),root=document.documentElement;
const get=k=>{try{return localStorage.getItem(k)}catch(e){return null}},set=(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}};
let lang=get('lang')||'uz',theme=get('theme')||'dark',ri=0,ci=0,del=false;
// ===== 3. Til va mavzuni qo'llash =====
// data-i18n atributli har bir element matni tanlangan til bo'yicha almashadi
function applyLang(){root.lang=lang;$('#lang').textContent=lang==='uz'?'EN':'UZ';
 document.querySelectorAll('[data-i18n]').forEach(e=>e.textContent=T[lang][e.dataset.i18n]);ri=0;ci=0;del=false}
function applyTheme(){root.dataset.theme=theme;$('#theme').textContent=theme==='dark'?'☾':'☀'}
$('#lang').onclick=()=>{lang=lang==='uz'?'en':'uz';set('lang',lang);applyLang()};
// Mavzu almashganda tugma joyidan doira bo'lib kengayadi (View Transitions API, qo'llab-quvvatlanmasa oddiy almashadi)
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
$('#theme').onclick=e=>{
 const flip=()=>{theme=theme==='dark'?'light':'dark';set('theme',theme);applyTheme()};
 if(!document.startViewTransition||reduce){flip();return}
 const r0=e.currentTarget.getBoundingClientRect(),x=r0.left+r0.width/2,y=r0.top+r0.height/2,r=Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y));
 document.startViewTransition(flip).ready.then(()=>root.animate({clipPath:[`circle(0 at ${x}px ${y}px)`,`circle(${r}px at ${x}px ${y}px)`]},{duration:700,easing:'ease-in-out',pseudoElement:'::view-transition-new(root)'}));
};
// ===== 4. Typing effekti: kasb nomlari yoziladi va o'chadi =====
(function type(){const w=T[lang].roles[ri%3];ci+=del?-1:1;$('#typed').textContent=w.slice(0,Math.max(ci,0));
 let d=del?40:90;if(!del&&ci>=w.length){del=true;d=1400}else if(del&&ci<=0){del=false;ri++;d=300}setTimeout(type,d)})();
// ===== 5. Sichqoncha ortidan yuruvchi glow =====
addEventListener('pointermove',e=>{const g=$('#glow');g.style.left=e.clientX+'px';g.style.top=e.clientY+'px'});
// ===== 6. Kartalarda 3D tilt: sichqoncha o'rniga qarab buriladi =====
document.querySelectorAll('.tilt').forEach(c=>{
 c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
  c.style.transform=`perspective(700px) rotateY(${x*10}deg) rotateX(${-y*10}deg) translateY(-6px)`});
 c.addEventListener('pointerleave',()=>c.style.transform='')});
// ===== 7. Scroll reveal va progress barlarni to'ldirish (IntersectionObserver) =====
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');
 e.target.querySelectorAll('.bar').forEach(b=>b.querySelector('u').style.width=b.dataset.v+'%');io.unobserve(e.target)}}),{threshold:.2});
document.querySelectorAll('.reveal').forEach(e=>io.observe(e));
$('#year').textContent=new Date().getFullYear();
applyTheme();applyLang();

// ===== 8. Ism harflarini ajratish (har bir harf alohida animatsiya oladi) =====
{const h=$('h1');let i=0;h.innerHTML=h.innerHTML.split('<br>').map(w=>[...w].map(c=>`<span class="ch" style="--i:${i++}">${c}</span>`).join('')).join('<br>')}
// ===== 9. Maxsus kursor: nuqta darhol, halqa silliq ergashadi =====
{const cur=$('#cur'),ring=$('#ring');let mx=0,my=0,rx=0,ry=0;
addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY;cur.style.transform=`translate(${mx}px,${my}px)`});
(function loop(){rx+=(mx-rx)*.15;ry+=(my-ry)*.15;ring.style.transform=`translate(${rx}px,${ry}px)`;requestAnimationFrame(loop)})();
document.addEventListener('pointerover',e=>ring.classList.toggle('big',!!e.target.closest('a,button,.tilt')))}
// ===== 10. Magnit tugmalar: kursorga qarab biroz tortiladi =====
document.querySelectorAll('.btn,.pill').forEach(b=>{
 b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.translate=`${(e.clientX-r.left-r.width/2)*.25}px ${(e.clientY-r.top-r.height/2)*.35}px`});
 b.addEventListener('pointerleave',()=>b.style.translate='')});
// ===== 11. Hero chiplari kursorga qarab siljiydi (parallax) =====
$('.hero').addEventListener('pointermove',e=>{const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;
 document.querySelectorAll('.chip').forEach((c,i)=>{c.style.setProperty('--px',x*(i+1)*14+'px');c.style.setProperty('--py',y*(i+1)*14+'px')})});
// ===== 12. Kartalar ichida kursor nuri =====
document.querySelectorAll('.card').forEach(c=>c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();c.style.setProperty('--mx',e.clientX-r.left+'px');c.style.setProperty('--my',e.clientY-r.top+'px')}));
// ===== 13. Scroll progress =====
addEventListener('scroll',()=>{$('#progress').style.width=scrollY/(root.scrollHeight-innerHeight)*100+'%'},{passive:true});
// ===== 14. Bosilganda yulduzchalar uchib chiqadi =====
addEventListener('click',e=>{if(reduce)return;for(let i=0;i<8;i++){const s=document.createElement('span'),a=i/8*6.283,d=40+Math.random()*40;
 s.className='spark';s.textContent='✦';s.style.cssText=`left:${e.clientX}px;top:${e.clientY}px;--x:${Math.cos(a)*d}px;--y:${Math.sin(a)*d}px;color:var(--${['a','b','c'][i%3]})`;
 document.body.append(s);setTimeout(()=>s.remove(),800)}});
