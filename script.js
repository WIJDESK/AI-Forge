let menu = document.getElementById('menu');
function togglemenu(){
        menu.classList.toggle("open_nav")
}
document.addEventListener('click', function(e) {
    if (!menu.contains(e.target) && !e.target.closest('.nav_pop-up_menu')) {
        menu.classList.remove("open_nav");
    }
});
let bar = document.getElementById('bar');
function togglebar(){
        bar.classList.toggle("open_bar")
}
document.addEventListener('click', function(e) {
    if (!bar.contains(e.target) && !e.target.closest('.search_icon')) {
        bar.classList.remove("open_bar");
    }
});
const track = document.getElementById('track');       
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const dotsContainer = document.getElementById('dots');

let current = 0;

const visibleCount = () => {
  if (window.innerWidth <= 360) return 1;
  if (window.innerWidth <= 768) return 2;
  return 4;
};
const totalCards = () => track.children.length;       

function maxIndex() {
  return totalCards() - visibleCount();
}

function buildDots() {
  dotsContainer.innerHTML = '';
  for (let i = 0; i <= maxIndex(); i++) {
    const d = document.createElement('button');
    d.className = 'dot' + (i === current ? ' active' : '');
    d.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(d);
  }
}

function updateDots() {
  document.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('active', i === current);
  });
}

function getCardWidth() {
  const card = track.children[0];
  const gap = parseFloat(window.getComputedStyle(track).gap) || 18;
  return card.getBoundingClientRect().width + gap;
}

function goTo(index) {
  current = Math.max(0, Math.min(index, maxIndex()));
  track.style.transform = `translateX(-${current * getCardWidth()}px)`;
  updateDots();
  prevBtn.style.opacity = current === 0 ? '0.3' : '1';
  nextBtn.style.opacity = current >= maxIndex() ? '0.3' : '1';
}

prevBtn.addEventListener('click', () => goTo(current - 1));
nextBtn.addEventListener('click', () => goTo(current + 1));

buildDots();
goTo(0);

window.addEventListener('resize', () => {
  buildDots();
  goTo(Math.min(current, maxIndex()));
});

  const wrap = document.getElementById('selectWrap');
  const trigger = document.getElementById('selectTrigger');
  const dropdown = document.getElementById('selectDropdown');
  const valueEl = document.getElementById('selectValue');
  const options = dropdown.querySelectorAll('.select_option');

  trigger.addEventListener('click', () => {
    wrap.classList.toggle('open');
  });

  options.forEach(opt => {
    opt.addEventListener('click', () => {
      options.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      valueEl.textContent = opt.dataset.value;
      wrap.classList.remove('open');
    });
  });

  document.addEventListener('click', e => {
    if (!wrap.contains(e.target)) wrap.classList.remove('open');
  });

  trigger.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      wrap.classList.toggle('open');
    }
    if (e.key === 'Escape') wrap.classList.remove('open');
  });
          