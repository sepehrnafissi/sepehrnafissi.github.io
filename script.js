// Nav background on scroll
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Volume / Mix % toggle
const mixImg = document.getElementById('mixImg');
const mixBtn = document.getElementById('mixBtn');
const sources = { volume: 'images/db_mix_volume.jpg', percent: 'images/db_mix_percent.jpg' };
new Image().src = sources.percent; // preload
document.querySelectorAll('.toggle-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.toggle-btn').forEach((b) => {
      b.classList.toggle('active', b === btn);
      b.setAttribute('aria-selected', b === btn);
    });
    const src = sources[btn.dataset.mode];
    mixImg.style.opacity = 0;
    setTimeout(() => {
      mixImg.src = src;
      mixImg.alt = `Subscriber activity mix report dashboard, ${btn.dataset.mode === 'volume' ? 'volume' : 'mix %'} view`;
      mixBtn.dataset.full = src;
      mixImg.style.opacity = 1;
    }, 150);
  });
});

// Lightbox
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const modalCap = document.getElementById('modalCap');
document.querySelectorAll('.img-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    modalImg.src = btn.dataset.full;
    modalImg.alt = btn.dataset.title;
    modalCap.innerHTML = btn.dataset.title;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  });
});
const closeModal = () => { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); };
document.getElementById('modalClose').addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

// Lightweight SQL syntax highlighting
const code = document.getElementById('sqlCode');
if (code) {
  const kw = 'WITH|AS|SELECT|FROM|WHERE|AND|OR|NOT|IN|LIKE|CASE|WHEN|THEN|ELSE|END|GROUP|BY|ORDER|OVER|PARTITION|ON|JOIN|LEFT|ROUND|SUM|COUNT|NULLIF|DATE_TRUNC|CURRENT_DATE';
  const re = new RegExp(`(--[^\\n]*)|('(?:[^']|'')*')|\\b(${kw})\\b|\\b(\\d+(?:\\.\\d+)?)\\b`, 'g');
  const fns = new Set(['ROUND', 'SUM', 'COUNT', 'NULLIF', 'DATE_TRUNC', 'CURRENT_DATE']);
  code.innerHTML = code.innerHTML.replace(re, (m, com, str, k, num) => {
    if (com) return `<span class="tok-com">${com}</span>`;
    if (str) return `<span class="tok-str">${str}</span>`;
    if (k) return `<span class="${fns.has(k) ? 'tok-fn' : 'tok-kw'}">${k}</span>`;
    if (num) return `<span class="tok-num">${num}</span>`;
    return m;
  });
}
