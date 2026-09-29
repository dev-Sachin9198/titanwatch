(function () {
  // ---------- Smooth auto-sliding banner ----------
  var slider = document.getElementById('img-section');
  var INTERVAL = 3500;
  var timer = null;
  var resumeTimer = null;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function nextSlide() {
    if (!slider) return;
    var maxScroll = slider.scrollWidth - slider.clientWidth;
    if (maxScroll <= 0) return;
    var atEnd = slider.scrollLeft >= maxScroll - 2;
    slider.scrollTo({ left: atEnd ? 0 : slider.scrollLeft + slider.clientWidth, behavior: 'smooth' });
  }

  function start() {
    if (reduceMotion || timer) return;
    timer = setInterval(nextSlide, INTERVAL);
  }

  function stop() {
    clearInterval(timer);
    timer = null;
  }

  if (slider) {
    start();

    // Pause while the user is dragging/swiping, resume shortly after
    function userTouch() {
      stop();
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(start, 5000);
    }
    slider.addEventListener('touchstart', userTouch, { passive: true });
    slider.addEventListener('pointerdown', userTouch);
    slider.addEventListener('wheel', userTouch, { passive: true });

    // Don't run in a background tab
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop(); else start();
    });
  }

  // ---------- Mobile menu ----------
  var btn = document.getElementById('menuBtn');
  var nav = document.getElementById('mainNav');

  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }
})();
