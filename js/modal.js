 const modal = document.getElementById('infoModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalInfo = document.getElementById('modalInfo');
  const closeBtn = document.querySelector('.modal-close');

  // Abrir modal
  document.querySelectorAll('.ver-mas').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modalTitle.textContent = btn.getAttribute('data-title') || '';
      modalInfo.textContent = btn.getAttribute('data-info') || '';
      modal.classList.add('active');       // <- CAMBIO: agregar clase
      document.body.style.overflow = 'hidden'; // opcional: evitar scroll del body
    });
  });

  // Cerrar modal con la X
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');      // <- CAMBIO: quitar clase
    document.body.style.overflow = '';
  });

  // Cerrar al hacer clic fuera del contenido
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Cerrar con ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
