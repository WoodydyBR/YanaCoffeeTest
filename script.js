const slider = document.getElementById('slider');
const filter = document.getElementById('monthFilter');
const dotsContainer = document.getElementById('dots');
const music = document.getElementById('bg-music');
const musicBtn = document.querySelector('.audio-control');
const monthNames = {"01":"Январь","02":"Февраль","03":"Март","04":"Апрель","05":"Май","06":"Июнь","07":"Июль","08":"Август","09":"Сентябрь","10":"Октябрь","11":"Ноябрь","12":"Декабрь"};

let visibleCards = [];
let currentIdx = 0;
let touchStartX = 0;

function toggleMusic() {
    if (music.paused) { music.play(); musicBtn.classList.add('playing'); document.getElementById('music-icon').textContent = '⏸'; }
    else { music.pause(); musicBtn.classList.remove('playing'); document.getElementById('music-icon').textContent = '🎵'; }
}

function handleCardClick(e, wrap) {
    const element = wrap || e;
    element.classList.toggle('flipped');
}

function openLightbox(wrap) {
    const img = wrap.querySelector('img');
    const date = wrap.querySelector('.date-text');
    document.getElementById('lb-img').src = img.src;
    document.getElementById('lb-date').textContent = date.textContent;
    document.getElementById('lightbox').classList.add('open');
}

function closeLightbox(e) {
    if (e && e.target.closest('.lightbox-polaroid')) return;
    document.getElementById('lightbox').classList.remove('open');
}

document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.15) return;
    const drop = document.createElement('div');
    drop.className = 'milk-drop';
    drop.style.left = e.clientX + 'px';
    drop.style.top = e.clientY + 'px';
    document.body.appendChild(drop);
    setTimeout(() => drop.remove(), 800);

    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    document.getElementById('stain1').style.transform = `translate(${moveX}px, ${moveY}px)`;
    document.getElementById('stain2').style.transform = `translate(${-moveX}px, ${-moveY}px) rotate(180deg)`;
});

slider.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, {passive: true});
slider.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) move(diff > 0 ? 1 : -1);
}, {passive: true});

function generateFilter() {
    const dates = [...new Set(Array.from(document.querySelectorAll('.coffee-card')).map(c => c.dataset.date))].filter(d => d !== 'unknown').sort().reverse();
    dates.forEach(m => {
        const [y, mm] = m.split('-');
        const opt = document.createElement('option');
        opt.value = m; opt.textContent = `${monthNames[mm]} ${y}`;
        filter.appendChild(opt);
    });
}

function applyFilter() {
    const val = filter.value;
    const all = document.querySelectorAll('.coffee-card');
    all.forEach(c => {
        c.style.display = (val === 'all' || c.dataset.date === val) ? 'flex' : 'none';
        const wrap = c.querySelector('.polaroid-wrap');
        if (wrap) wrap.classList.remove('flipped');
    });
    visibleCards = Array.from(all).filter(c => c.style.display !== 'none');
    renderDots();
    if (visibleCards.length === 0) {
        document.getElementById('current').textContent = '0';
        return;
    }
    goTo(0);
}

function renderDots() {
    dotsContainer.innerHTML = '';
    visibleCards.forEach((_, i) => {
        const d = document.createElement('div');
        d.className = 'dot' + (i === 0 ? ' active' : '');
        d.onclick = () => goTo(i);
        dotsContainer.appendChild(d);
    });
    document.getElementById('total').textContent = visibleCards.length;
    if (currentIdx >= visibleCards.length) currentIdx = visibleCards.length - 1;
    document.getElementById('current').textContent = visibleCards.length ? currentIdx + 1 : 0;
}

function goTo(i) {
    if (!visibleCards[i]) return;
    currentIdx = i;
    slider.scrollTo({ left: visibleCards[i].offsetLeft - slider.offsetLeft, behavior: 'smooth' });
    updateUI(i);
    visibleCards.forEach(c => c.classList.remove('visible'));
    setTimeout(() => visibleCards[i].classList.add('visible'), 300);
}

function updateUI(i) {
    document.getElementById('current').textContent = i + 1;
    dotsContainer.querySelectorAll('.dot').forEach((d, idx) => d.classList.toggle('active', idx === i));
}

function move(dir) {
    const n = currentIdx + dir;
    if (n >= 0 && n < visibleCards.length) goTo(n);
}

function setupImageLightbox() {
    document.querySelectorAll('.polaroid-front img').forEach(img => {
        img.addEventListener('click', (event) => {
            event.stopPropagation();
            const wrap = img.closest('.polaroid-wrap');
            openLightbox(wrap);
        });
    });
}

for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.width = p.style.height = (Math.random() * 3 + 2) + 'px';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.animationDelay = Math.random() * 20 + 's';
    document.getElementById('particles').appendChild(p);
}

generateFilter();
applyFilter();
setupImageLightbox();
