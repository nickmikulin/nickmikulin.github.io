(function() {
  'use strict';

  function initDotNav() {
    const nav = document.querySelector('.dot-nav');
    const dots = document.querySelectorAll('.dot-nav__dot');
    const sections = document.querySelectorAll('.section[id]');
    if (!nav || !dots.length || !sections.length) return;

    const dotStep = 6 + 8;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          let activeIndex = 0;
          dots.forEach((dot, i) => {
            const isActive = dot.getAttribute('href') === '#' + id;
            dot.classList.toggle('is-active', isActive);
            if (isActive) activeIndex = i;
          });
          nav.style.transform = `translateY(-${activeIndex * dotStep}px)`;
        }
      });
    }, { threshold: 0.5 });

    sections.forEach(section => observer.observe(section));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDotNav);
  } else {
    initDotNav();
  }
})();
