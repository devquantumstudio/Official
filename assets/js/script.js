// ====== Elements
const header = document.getElementById('header');
const menuToggle = document.getElementById('menuToggle');
const sideMenu = document.getElementById('sideMenu');
const sideClose = document.getElementById('sideClose');
const overlay = document.getElementById('overlay');
const toTop = document.getElementById('toTop');

document.getElementById("year").textContent = new Date().getFullYear();

// ====== Helpers
const openMenu = () => {
  sideMenu.classList.add('open');
  overlay.classList.add('open');
  sideMenu.setAttribute('aria-hidden', 'false');
  menuToggle.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
};
const closeMenu = () => {
  sideMenu.classList.remove('open');
  overlay.classList.remove('open');
  sideMenu.setAttribute('aria-hidden', 'true');
  menuToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
};

// ====== Events: Menu
menuToggle?.addEventListener('click', openMenu);
sideClose?.addEventListener('click', closeMenu);
overlay?.addEventListener('click', closeMenu);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

// ====== Header shadow on scroll
let lastY = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY || window.pageYOffset;
  header.style.boxShadow = y > 10 ? '0 10px 30px rgba(0,0,0,.25)' : 'none';
  // show "to top"
  if (y > 400) toTop?.classList.add('visible'); else toTop?.classList.remove('visible');
  lastY = y;
});

// ====== Back to top
toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ====== In-view fade for cards
const faders = document.querySelectorAll('.will-fade');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.animate(
          [
            { opacity: 0, transform: 'translateY(8px)' },
            { opacity: 1, transform: 'translateY(0)' }
          ],
          { duration: 450, easing: 'cubic-bezier(.21,.7,.27,1)', fill: 'forwards' }
        );
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  faders.forEach((el) => io.observe(el));
}

// ====== 3D tilt effect on product cards (subtle)
const tiltCards = document.querySelectorAll('[data-tilt]');
tiltCards.forEach((card) => {
  const damp = 18; // lower = stronger tilt
  let raf = null;

  const onMove = (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y / rect.height) - 0.5) * -damp;
    const ry = ((x / rect.width) - 0.5) * damp;

    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
    });
  };

  const reset = () => {
    if (raf) cancelAnimationFrame(raf);
    card.style.transform = '';
  };

  card.addEventListener('mousemove', onMove);
  card.addEventListener('mouseleave', reset);
});

// ====== Smooth in-page anchor fix for iOS
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
