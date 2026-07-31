document.querySelector('.menu')?.addEventListener('click', () => {
  document.querySelector('nav')?.classList.toggle('open');
});

function initCarousel(carousel) {
  const slides = [...carousel.querySelectorAll('.carousel-slide')];
  if (slides.length < 2) return;

  const prevBtn = carousel.querySelector('[data-prev]');
  const nextBtn = carousel.querySelector('[data-next]');
  const dotsWrap = carousel.querySelector('.carousel-dots');
  const interval = Number(carousel.dataset.interval || 5000);
  const autoplay = carousel.hasAttribute('data-autoplay');
  let index = 0;
  let timer;

  if (dotsWrap) {
    dotsWrap.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'carousel-dot';
      dot.setAttribute('aria-label', `Show photo ${i + 1}`);
      dot.addEventListener('click', () => show(i));
      dotsWrap.appendChild(dot);
    });
  }

  function show(i) {
    index = (i + slides.length) % slides.length;
    slides.forEach((slide, n) => slide.classList.toggle('active', n === index));
    dotsWrap?.querySelectorAll('.carousel-dot').forEach((dot, n) => {
      dot.classList.toggle('active', n === index);
    });
  }

  function next() { show(index + 1); }
  function prev() { show(index - 1); }
  function start() { if (autoplay) timer = setInterval(next, interval); }
  function stop() { clearInterval(timer); }

  prevBtn?.addEventListener('click', prev);
  nextBtn?.addEventListener('click', next);
  carousel.tabIndex = 0;
  carousel.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });
  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);
  carousel.addEventListener('focusin', stop);
  carousel.addEventListener('focusout', start);

  show(0);
  start();
}

document.querySelectorAll('[data-carousel]').forEach(initCarousel);
