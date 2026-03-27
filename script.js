function openModal(src, title) {
  const modal = document.getElementById('modal');
  const img   = document.getElementById('modal-img');
  const ttl   = document.getElementById('modal-title');
  img.src     = src;
  img.alt     = title;
  ttl.innerHTML = title;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
  document.getElementById('modal-img').src = '';
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});
