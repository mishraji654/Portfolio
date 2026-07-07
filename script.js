// =========================================================
// Footer year
// =========================================================
document.getElementById('year').textContent = new Date().getFullYear();

// =========================================================
// Mobile nav toggle
// =========================================================
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');

navToggle.addEventListener('click', () => {
  const isOpen = navMobile.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});

navMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMobile.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
  });
});

// =========================================================
// Scroll-reveal for section heads and cards
// =========================================================
const revealTargets = document.querySelectorAll(
  '.section-head, .project-card, .skill-panel, .about-card, .strip-item'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

revealTargets.forEach(el => revealObserver.observe(el));

// =========================================================
// Project filter tabs
// =========================================================
const filterButtons = document.querySelectorAll('.tab-filter');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    filterButtons.forEach(b => {
      b.classList.remove('is-active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('is-active');
    btn.setAttribute('aria-selected', 'true');

    projectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.author === filter;
      card.classList.toggle('is-hidden', !match);
    });
  });
});

// =========================================================
// Custom cursor dot (desktop / fine-pointer only)
// =========================================================
const cursorDot = document.getElementById('cursorDot');
const supportsFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (supportsFinePointer && cursorDot) {
  let hasMoved = false;

  window.addEventListener('mousemove', (e) => {
    cursorDot.style.left = `${e.clientX}px`;
    cursorDot.style.top = `${e.clientY}px`;
    if (!hasMoved) {
      cursorDot.classList.add('is-active');
      hasMoved = true;
    }
  });

  document.addEventListener('mouseleave', () => cursorDot.classList.remove('is-active'));
  document.addEventListener('mouseenter', () => { if (hasMoved) cursorDot.classList.add('is-active'); });
}

// =========================================================
// Nav background solidify on scroll (subtle)
// =========================================================
const nav = document.getElementById('nav');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  nav.style.boxShadow = y > 8 ? '0 1px 0 rgba(10,12,31,0.08)' : 'none';
  lastScrollY = y;
}, { passive: true });

// =========================================================
// Contact form — client-side only (no backend wired up yet)
// =========================================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = new FormData(contactForm);

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });
    if (response.ok) {
      formStatus.classList.remove('is-error');
      formStatus.textContent = 'Message sent — we\'ll get back to you soon.';
      contactForm.reset();
    } else {
      throw new Error('Submission failed');
    }
  } catch (err) {
    formStatus.classList.add('is-error');
    formStatus.textContent = 'Something went wrong. Please email us directly instead.';
  }
});