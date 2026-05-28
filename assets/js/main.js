(function () {
  'use strict';

  /* === SCROLL ANIMATIONS === */
  const io = new IntersectionObserver(
    (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); }),
    { threshold: 0.10, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.animate').forEach(el => io.observe(el));

  /* === MOBILE NAV === */
  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    mobileNav.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => mobileNav.classList.remove('open'))
    );
  }

  /* === MOCKA LOOP ANIMATION (index.html) === */
  const steps  = document.querySelectorAll('.loop-step');
  const arrows = document.querySelectorAll('.loop-arrow');

  if (steps.length > 0) {
    let cur = 0, paused = false;

    function setActive(i) {
      steps.forEach((s, j)  => s.classList.toggle('lit', j === i));
      arrows.forEach((a, j) => a.classList.toggle('lit', j < i));
    }

    setActive(0);
    const iv = setInterval(() => {
      if (!paused) { cur = (cur + 1) % steps.length; setActive(cur); }
    }, 900);

    steps.forEach((step, i) => {
      step.addEventListener('mouseenter', () => { paused = true;  setActive(i); });
      step.addEventListener('mouseleave', () => { paused = false; });
    });
  }

  /* === GOLDEN SPIRAL (orchestra/index.html) === */
  const spiralSvg = document.getElementById('orchestra-spiral');
  if (spiralSvg) {
    const cx = 60, cy = 60, a = 3, b = 4.2, maxT = 3.8 * Math.PI;
    const pts = [];
    for (let i = 0; i <= 500; i++) {
      const t = (i / 500) * maxT;
      const r = a + b * t;
      pts.push((cx + r * Math.cos(t)).toFixed(2) + ',' + (cy - r * Math.sin(t)).toFixed(2));
    }
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M ' + pts.join(' L '));
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', '#C9A84C');
    path.setAttribute('stroke-width', '1.8');
    path.setAttribute('stroke-linecap', 'round');
    spiralSvg.appendChild(path);

    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('cx', String(cx)); dot.setAttribute('cy', String(cy));
    dot.setAttribute('r', '2.5'); dot.setAttribute('fill', '#C9A84C');
    spiralSvg.appendChild(dot);
  }

  /* === NOTIFY FORM (relay/index.html) === */
  const notifyForm = document.getElementById('notify-form');
  if (notifyForm) {
    notifyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = notifyForm.querySelector('input[type="email"]');
      if (input && input.value) {
        notifyForm.innerHTML = '<p class="form-success">You\'re on the list — we\'ll notify you when Relay launches.</p>';
      }
    });
  }

})();
