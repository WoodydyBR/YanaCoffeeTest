const slider  = document.getElementById('slider');
const dotsEl  = document.getElementById('dots');
const music   = document.getElementById('bg-music');
const mMap    = {"01":"Январь","02":"Февраль","03":"Март","04":"Апрель","05":"Май","06":"Июнь","07":"Июль","08":"Август","09":"Сентябрь","10":"Октябрь","11":"Ноябрь","12":"Декабрь"};
let visible=[], curIdx=0, touchX=0;



/* ══════════════════════════════════════
   PARALLAX HERO
══════════════════════════════════════ */
const parallaxBg = document.querySelector('.hero-parallax-bg');
const heroSection = document.querySelector('.hero');
window.addEventListener('scroll', () => {
  const sy = window.scrollY;
  if (parallaxBg && sy < window.innerHeight * 1.5) {
    parallaxBg.style.transform = `translateY(${sy * 0.38}px)`;
  }
}, { passive: true });



/* On image load: hide skeleton */
document.querySelectorAll('img.card-img').forEach(img => {
  if (img.complete && img.naturalWidth > 0) {
    const skel = img.previousElementSibling;
    if (skel && skel.classList.contains('skeleton')) skel.classList.add('hidden');
  } else {
    img.addEventListener('load', () => {
      const skel = img.previousElementSibling;
      if (skel && skel.classList.contains('skeleton')) {
        skel.classList.add('hidden');
        setTimeout(() => skel.remove(), 600);
      }
    }, { once: true });
  }
});

function toggleMusic(){
  const btn=document.getElementById('audioBtn'), lbl=document.getElementById('audio-label');
  if(music.paused){music.play();btn.classList.add('playing');lbl.textContent='Пауза';}
  else{music.pause();btn.classList.remove('playing');lbl.textContent='Включить музыку';}
}
function toggleMenu(){
  document.getElementById('mobileMenu').classList.toggle('open');
  document.getElementById('burgerBtn').classList.toggle('open');
}
function closeMenu(){
  document.getElementById('mobileMenu').classList.remove('open');
  document.getElementById('burgerBtn').classList.remove('open');
}
function handleFlip(e,wrap){
  if(e.target.closest('.open-btn')) return;
  wrap.classList.toggle('flipped');
}
function openLightbox(wrap){
  const img = wrap.querySelector('img.card-img') || wrap.querySelector('img');
  document.getElementById('lb-img').src = img.src || img.dataset.src || '';
  document.getElementById('lb-date').textContent = wrap.querySelector('.date-text').textContent;
  document.getElementById('lightbox').classList.add('open');
}
function closeLightbox(e){
  if(e && e.target.closest('.lb-polaroid')) return;
  document.getElementById('lightbox').classList.remove('open');
}
function buildFilterBar(){
  const dates=[...new Set(Array.from(document.querySelectorAll('.coffee-card')).map(c=>c.dataset.date))].filter(d=>d!=='unknown').sort().reverse();
  const bar=document.getElementById('filterBar');
  dates.forEach(m=>{
    const [y,mm]=m.split('-');
    const btn=document.createElement('button');
    btn.className='filter-btn';btn.dataset.val=m;
    btn.textContent=`${mMap[mm]} ${y}`;
    btn.onclick=()=>applyFilter(m,btn);
    bar.appendChild(btn);
  });
}
function plural(n){
  if(n%10===1&&n%100!==11)return'работа';
  if([2,3,4].includes(n%10)&&![12,13,14].includes(n%100))return'работы';
  return'работ';
}
function applyFilter(val,btn){
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  if(btn) btn.classList.add('active');
  const all=document.querySelectorAll('.coffee-card');
  all.forEach(c=>{
    const show=val==='all'||c.dataset.date===val;
    c.style.display=show?'flex':'none';
    c.classList.remove('visible');
    c.querySelector('.polaroid-wrap').classList.remove('flipped');
  });
  visible=Array.from(all).filter(c=>c.style.display!=='none');
  document.getElementById('galleryCount').textContent=visible.length+' '+plural(visible.length);

  // ── Card entrance animation (staggered drop-in) ──
  visible.forEach((c, i) => {
    c.classList.remove('card-enter');
    // Force reflow so animation re-triggers
    void c.offsetWidth;
    c.style.animationDelay = `${i * 0.055}s`;
    c.classList.add('card-enter');
    setTimeout(() => c.classList.remove('card-enter'), 600 + i * 55);
  });

  renderDots();
  if(visible.length) {
    goTo(0);
    visible[0].classList.add('visible');
  } else {
    updateUI(0);
  }
}
function renderDots(){
  dotsEl.innerHTML='';
  visible.forEach((_,i)=>{
    const d=document.createElement('div');
    d.className='dot'+(i===0?' active':'');
    d.onclick=()=>goTo(i);
    dotsEl.appendChild(d);
  });
  document.getElementById('totNum').textContent=visible.length;
  updateProgress();
}
function goTo(i){
  if(!visible[i]) return;
  curIdx=i;
  const targetScroll = visible[i].offsetLeft - slider.offsetLeft;
  slider.scrollTo({left:targetScroll, behavior:'smooth'});
  
  visible.forEach(c=>c.classList.remove('visible'));
  visible[i].classList.add('visible');
  updateUI(i);
}
function updateUI(i){
  document.getElementById('curNum').textContent=visible.length?i+1:0;
  dotsEl.querySelectorAll('.dot').forEach((d,idx)=>d.classList.toggle('active',idx===i));
  document.getElementById('prevBtn').disabled=i===0;
  document.getElementById('nextBtn').disabled=i>=visible.length-1;
  updateProgress();
}
function updateProgress(){
  const pct=visible.length>1?(curIdx/(visible.length-1))*100:100;
  document.getElementById('progressFill').style.width=pct+'%';
}
function move(dir){const n=curIdx+dir;if(n>=0&&n<visible.length)goTo(n);}

slider.addEventListener('touchstart',e=>{touchX=e.touches[0].clientX;},{passive:true});
slider.addEventListener('touchend',e=>{const d=touchX-e.changedTouches[0].clientX;if(Math.abs(d)>45)move(d>0?1:-1);},{passive:true});

// Исправленный скролл для ПК
let isScrolling;
slider.addEventListener('scroll',()=>{
  window.clearTimeout(isScrolling);
  isScrolling = setTimeout(()=>{
    const mid=slider.scrollLeft+slider.offsetWidth/2;
    let ci=0,cd=Infinity;
    visible.forEach((c,i)=>{
      const m=c.offsetLeft-slider.offsetLeft+c.offsetWidth/2;
      const dd=Math.abs(mid-m);
      if(dd<cd){cd=dd;ci=i;}
    });
    if(ci!==curIdx){
      curIdx=ci;
      updateUI(ci);
      visible.forEach(c=>c.classList.remove('visible'));
      visible[ci]?.classList.add('visible');
    }
  },100);
});

buildFilterBar();
applyFilter('all',document.querySelector('.filter-btn[data-val="all"]'));
/* ══════════════════════════════════════
   GUESTBOOK — Firebase Realtime Database
══════════════════════════════════════ */
(function () {

  /* ──────────────────────────────────────
     🔧 ВСТАВЬ СЮДА СВОИ ДАННЫЕ ИЗ FIREBASE
     (Project Settings → Your apps → SDK setup)
  ────────────────────────────────────── */
  const FB_CONFIG = {
    apiKey:            "ЗАМЕНИ_НА_СВОЙ",
    authDomain:        "ЗАМЕНИ_НА_СВОЙ.firebaseapp.com",
    databaseURL:       "https://ЗАМЕНИ_НА_СВОЙ-default-rtdb.firebaseio.com",
    projectId:         "ЗАМЕНИ_НА_СВОЙ",
    storageBucket:     "ЗАМЕНИ_НА_СВОЙ.firebasestorage.app",
    messagingSenderId: "ЗАМЕНИ_НА_СВОЙ",
    appId:             "ЗАМЕНИ_НА_СВОЙ"
  };

  /* ── Цвета и оформление ── */
  const ROTATIONS = [-2,-1.5,-1,-0.5,0,0.5,1,1.5,2,-1,1];
  const TAPE_ROTS = [-3,-1,0,2,-2,1];
  let selectedColor = 'yellow';

  /* ── Firebase SDK (модульный v9 compat) ── */
  const FB_SDK = 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js';
  const FB_DB  = 'https://www.gstatic.com/firebasejs/10.12.0/firebase-database-compat.js';

  let db, entriesRef;
  let localKey = 'latte_gb_mine_v1'; // ключи своих записок (для кнопки удаления)

  function getMyKeys() {
    try { return JSON.parse(localStorage.getItem(localKey)) || []; } catch { return []; }
  }
  function addMyKey(k) {
    const keys = getMyKeys(); keys.push(k); 
    try { localStorage.setItem(localKey, JSON.stringify(keys)); } catch {}
  }
  function removeMyKey(k) {
    const keys = getMyKeys().filter(x => x !== k);
    try { localStorage.setItem(localKey, JSON.stringify(keys)); } catch {}
  }

  function formatDate(ts) {
    return new Date(ts).toLocaleDateString('ru-RU', {day:'2-digit',month:'2-digit',year:'2-digit'});
  }
  function escHtml(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function createSticker(key, entry, idx) {
    const rot = ROTATIONS[idx % ROTATIONS.length];
    const tr  = TAPE_ROTS[idx % TAPE_ROTS.length];
    const mine = getMyKeys().includes(key);
    const el = document.createElement('div');
    const wrapper = document.createElement('div');
    wrapper.className = 'gb-cell';
    el.className = `gb-sticker ${entry.color || 'yellow'}`;
    el.dataset.key = key;
    el.style.setProperty('--sr', rot + 'deg');
    el.style.setProperty('--tr', tr + 'deg');
    el.style.animationDelay = Math.min(idx * 0.04, 0.4) + 's';
    el.innerHTML = `
      <div class="gb-sticker-name">${escHtml(entry.name || 'Аноним')}</div>
      <div class="gb-sticker-text">${escHtml(entry.text)}</div>
      <div class="gb-sticker-date">${formatDate(entry.ts)}</div>
      ${mine ? `<button class="gb-del" title="Удалить" onclick="gbDelete('${key}')">✕</button>` : ''}
    `;
    wrapper.appendChild(el);
    return wrapper;
  }

  function renderAll(snapshot) {
    const board = document.getElementById('gbBoard');
    const empty = document.getElementById('gbEmpty');
    board.querySelectorAll('.gb-sticker').forEach(s => s.remove());

    const entries = [];
    snapshot.forEach(child => entries.unshift({ key: child.key, ...child.val() }));

    if (entries.length === 0) { empty.style.display = 'block'; return; }
    empty.style.display = 'none';
    entries.forEach((e, i) => board.appendChild(createSticker(e.key, e, i)));
  }

  /* ── Слушаем Firebase в реальном времени ── */
  function startListening() {
    entriesRef.on('value', snapshot => renderAll(snapshot));
  }

  /* ── Публичные функции ── */
  window.gbPost = function () {
    const name = document.getElementById('gbName').value.trim();
    const text = document.getElementById('gbMsg').value.trim();
    if (!text) {
      const ta = document.getElementById('gbMsg');
      ta.focus();
      ta.style.borderColor = 'rgba(248,113,113,0.7)';
      setTimeout(() => ta.style.borderColor = '', 800);
      return;
    }
    const entry = { name: name || 'Аноним', text, color: selectedColor, ts: Date.now() };
    const ref = entriesRef.push(entry);
    addMyKey(ref.key);

    document.getElementById('gbName').value = '';
    document.getElementById('gbMsg').value  = '';
    document.getElementById('gbChars').textContent = '160';

    const btn = document.getElementById('gbSubmit');
    btn.textContent = 'Готово ✓';
    btn.style.background = '#4ade80';
    setTimeout(() => { btn.textContent = 'Прикрепить ✦'; btn.style.background = ''; }, 1400);
  };

  window.gbDelete = function (key) {
    entriesRef.child(key).remove();
    removeMyKey(key);
  };

  /* ── Color picker ── */
  document.getElementById('gbColors').addEventListener('click', e => {
    const btn = e.target.closest('.gb-color');
    if (!btn) return;
    document.querySelectorAll('.gb-color').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedColor = btn.dataset.color;
  });

  /* ── Счётчик символов ── */
  document.getElementById('gbMsg').addEventListener('input', function () {
    const left = 160 - this.value.length;
    const el = document.getElementById('gbChars');
    el.textContent = left;
    el.classList.toggle('low', left < 20);
  });

  /* ── Ctrl+Enter ── */
  document.getElementById('gbMsg').addEventListener('keydown', e => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) window.gbPost();
  });

  /* ── Загружаем Firebase SDK динамически ── */
  function loadScript(src) {
    return new Promise((res, rej) => {
      const s = document.createElement('script');
      s.src = src; s.onload = res; s.onerror = rej;
      document.head.appendChild(s);
    });
  }

  loadScript(FB_SDK).then(() => loadScript(FB_DB)).then(() => {
    firebase.initializeApp(FB_CONFIG);
    db          = firebase.database();
    entriesRef  = db.ref('guestbook');
    startListening();
  }).catch(err => {
    console.error('Firebase load error:', err);
    document.getElementById('gbEmpty').textContent = '⚠ Не удалось подключиться к базе данных';
  });

})();
