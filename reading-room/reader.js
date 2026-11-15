
'use strict';
(() => {
const data=window.READING_ROOM_BOOK;
const book=document.getElementById('book');
const status=document.getElementById('status');
const prev=document.getElementById('prev');
const next=document.getElementById('next');
const dialog=document.getElementById('contents-dialog');
const query=matchMedia('(max-width:740px)');
const reduced=matchMedia('(prefers-reduced-motion:reduce)');
let position=0, full=false, locked=false, size=17, cleanupTimer;
const storageKey='deskbench.smallsteps.notes.v1';
let notes={};
try { const stored=JSON.parse(localStorage.getItem(storageKey)||'{}'); if(stored && typeof stored==='object' && !Array.isArray(stored)) notes=stored; } catch {}
function normalize(n) {
 n=Math.max(0,Math.min(data.pages.length-1,n));
 return !query.matches && n>0 ? n%2===0?n-1:n : n;
}
function visiblePages() { return query.matches||position===0 ? [position] : [position,position+1].filter(n=>n<data.pages.length); }
function makePage(index) {
 const p=data.pages[index],el=document.createElement('article');
 el.className='page '+p.type;
 el.id='page-'+index;
 el.setAttribute('aria-label',(index===0?'Cover':'Page '+index)+': '+p.title);
 if(p.chapter!==undefined){ const c=data.chapters[p.chapter];el.style.setProperty('--chapter',c.color);el.style.setProperty('--chapter-ink',c.ink); }
 el.innerHTML=p.body+'<div class="folio"><span>Desk&amp;Bench</span><span>'+index+'</span></div>';
 el.querySelectorAll('[data-note]').forEach(t=>{t.value=typeof notes[t.dataset.note]==='string'?notes[t.dataset.note]:'';});
 return el;
}
function render() {
 const indices=full?data.pages.map((_,i)=>i):visiblePages();
 book.className=full?'book full-text':'book'+(indices.length===1?' solo':'');
 book.replaceChildren(...indices.map(makePage));
 prev.disabled=full||position===0;
 next.disabled=full||visiblePages().at(-1)===data.pages.length-1;
 const end=visiblePages().at(-1);
 status.textContent=full?'46 pages':position===0?'Cover':position===end?'Page '+position+' of 45':'Pages '+position+'–'+end+' of 45';
 document.getElementById('bar').style.width=(full?100:(end+1)/data.pages.length*100)+'%';
 document.getElementById('mode').textContent=full?'Book view':'Full text';
 document.getElementById('mode').setAttribute('aria-pressed',String(full));
 document.querySelector('.hint').textContent=full?'Read continuously. Use Contents to jump to a chapter.':'Use the arrow keys, the buttons or swipe on a touch screen.';
}
function go(n,animate=true) {
 n=Math.max(0,Math.min(data.pages.length-1,n));
 if(full) {position=normalize(n);document.getElementById('page-'+n)?.scrollIntoView({block:'start'}); return;}
 n=normalize(n);
 if(locked||n===position)return;
 const forward=n>position;
 const leaf=book.children[forward?book.children.length-1:0]?.cloneNode(true);
 const wasSolo=book.classList.contains('solo');
 position=n; render();
 try {history.replaceState(null,'','#page-'+n);}catch{}
 if(leaf && animate && !reduced.matches){
  locked=true;
  leaf.removeAttribute('id');
  leaf.querySelectorAll('[id]').forEach(e=>e.removeAttribute('id'));
  leaf.setAttribute('aria-hidden','true');
  leaf.setAttribute('inert','');
  leaf.classList.add('turning');
  if(!forward)leaf.classList.add('backward');
  if(wasSolo)leaf.style.width='100%';
  book.append(leaf);
  const done=()=>{leaf.remove();locked=false;clearTimeout(cleanupTimer);};
  leaf.addEventListener('animationend',done,{once:true});
  cleanupTimer=setTimeout(done,850);
 }
 if(book.getBoundingClientRect().top<0)book.scrollIntoView({block:'start',behavior:'auto'});
}
function after(){return position===0?1:position+(query.matches?1:2);}
function before(){return position===1?0:position-(query.matches?1:2);}
prev.addEventListener('click',()=>go(before()));
next.addEventListener('click',()=>go(after()));
book.addEventListener('click',e=>{const b=e.target.closest('[data-page]');if(b)go(Number(b.dataset.page));});
book.addEventListener('input',e=>{
 const field=e.target.closest('[data-note]');if(!field)return;
 notes[field.dataset.note]=field.value;
 const state=field.closest('.page').querySelector('.save-state');
 try{localStorage.setItem(storageKey,JSON.stringify(notes));state.textContent='Saved in this browser.';}catch{state.textContent='Not saved. Keep a separate copy before leaving this page.';}
});
document.getElementById('contents').addEventListener('click',()=>dialog.showModal());
document.getElementById('close-contents').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{
 const b=e.target.closest('[data-page]');
 if(b){dialog.close();go(Number(b.dataset.page));}
});
document.getElementById('mode').addEventListener('click',()=>{
 clearTimeout(cleanupTimer);locked=false;full=!full;render();
 book.scrollIntoView({block:'start'});
});
document.getElementById('smaller').addEventListener('click',()=>resizeText(-1));
document.getElementById('larger').addEventListener('click',()=>resizeText(1));
function resizeText(delta){
 size=Math.max(16,Math.min(22,size+delta));document.documentElement.style.setProperty('--body-size',size+'px');
 document.getElementById('smaller').disabled=size===16;document.getElementById('larger').disabled=size===22;
}
document.addEventListener('keydown',e=>{
 if(dialog.open||full||e.altKey||e.ctrlKey||e.metaKey||e.target.closest('textarea,input,select,[contenteditable]'))return;
 if(e.key==='ArrowRight'){e.preventDefault();go(after());}
 if(e.key==='ArrowLeft'){e.preventDefault();go(before());}
 if(e.key==='Home'){e.preventDefault();go(0);}
 if(e.key==='End'){e.preventDefault();go(data.pages.length-1);}
});
let touch=null;
book.addEventListener('touchstart',e=>{
 if(full||e.target.closest('textarea,button,a,summary')||e.touches.length!==1){touch=null;return;}
 touch={x:e.touches[0].clientX,y:e.touches[0].clientY};
},{passive:true});
book.addEventListener('touchend',e=>{
 if(!touch)return;
 const dx=e.changedTouches[0].clientX-touch.x,dy=e.changedTouches[0].clientY-touch.y;touch=null;
 if(Math.abs(dx)>65&&Math.abs(dx)>Math.abs(dy)*1.5)go(dx<0?after():before());
},{passive:true});
query.addEventListener('change',()=>{clearTimeout(cleanupTimer);locked=false;position=normalize(position);render();});
document.getElementById('chapter-links').innerHTML='<li><button data-page="0">Book cover</button></li><li><button data-page="1">Contents</button></li>'+data.chapters.map((c,i)=>'<li><button data-page="'+c.page+'"><span class="num">'+String(i+1).padStart(2,'0')+'</span><span>'+c.title+'</span></button></li>').join('');
const hash=location.hash.match(/^#page-([0-9]+)$/);
if(hash)position=normalize(Number(hash[1]));
render();
})();
