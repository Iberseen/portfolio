(() => {
  'use strict';

  const header = document.querySelector('.header');
  const btn = document.querySelector('.menu-btn');
  const drawer = document.querySelector('.drawer');

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

    const onScroll = () => header && header.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

    if (btn && drawer) {
    const label = btn.querySelector('.menu-btn__label');
    const set = (open) => {
      btn.setAttribute('aria-expanded', String(open));
      label.textContent = open ? 'Cerrar' : 'Menú';
      drawer.classList.toggle('is-open', open);
      drawer.toggleAttribute('inert', !open);
      document.body.style.overflow = open ? 'hidden' : '';
    };
    set(false);
    btn.addEventListener('click', () => set(btn.getAttribute('aria-expanded') !== 'true'));
    drawer.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => set(false)));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) { set(false); btn.focus(); }
    });
    window.matchMedia('(min-width: 56rem)').addEventListener('change', (m) => { if (m.matches) set(false); });
  }

  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-in'));
    return;
  }

    const links = [...document.querySelectorAll('.nav a')];
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      const a = links.find((l) => l.hash === `#${en.target.id}`);
      if (a) a.setAttribute('aria-current', String(en.isIntersecting));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  links.forEach((l) => { const s = document.querySelector(l.hash); if (s) spy.observe(s); });

    const items = document.querySelectorAll('[data-reveal]');
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); obs.unobserve(en.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
  items.forEach((el) => io.observe(el));
  setTimeout(() => items.forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.top < innerHeight && r.bottom > 0) el.classList.add('is-in');
  }), 2000);
})();


