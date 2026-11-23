/* Sarvatrik Impex - light, performance-friendly interactions */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Sticky nav: frosted glass after scrolling a little
  var nav = document.querySelector('.nav');
  function onScroll() {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
  }
  onScroll();

  // Mobile menu
  var burger = document.querySelector('.burger');
  var links = document.querySelector('.links');
  if (burger && links) {
    burger.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open);
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('open');
        burger.classList.remove('open');
      }
    });
  }

  // Scroll reveal (plays once per element)
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Very slow hero parallax (transform only, throttled with rAF)
  var para = document.querySelector('[data-parallax]');
  var ticking = false;
  function frame() {
    if (para && window.scrollY < window.innerHeight * 1.2) {
      para.style.transform = 'translate3d(0,' + (window.scrollY * 0.05).toFixed(1) + 'px,0)';
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    onScroll();
    if (para && !reduce && !ticking) { ticking = true; requestAnimationFrame(frame); }
  }, { passive: true });

  // Footer year
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Inquiry form
  var form = document.getElementById('inquiry-form');
  if (form) {
    // Pre-select product from ?product=Onion%20Powder
    var wanted = new URLSearchParams(window.location.search).get('product');
    var select = form.querySelector('select[name="Product"]');
    if (wanted && select) {
      Array.prototype.forEach.call(select.options, function (o) {
        if (o.value.toLowerCase() === wanted.toLowerCase()) select.value = o.value;
      });
    }

    var msg = document.getElementById('form-msg');
    var success = document.getElementById('success');
    var btn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      msg.textContent = '';
      btn.disabled = true;
      var label = btn.textContent;
      btn.textContent = 'Sending...';

      var data = {};
      new FormData(form).forEach(function (v, k) { data[k] = v; });

      fetch('https://formsubmit.co/ajax/sarvatrik.impex@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(function (r) { if (!r.ok) throw new Error('bad'); return r.json(); })
        .then(function () {
          form.style.display = 'none';
          success.classList.add('show');
          success.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
        })
        .catch(function () {
          msg.innerHTML = 'Sorry, we could not send your inquiry. Please email us at ' +
            '<a href="mailto:sarvatrik.impex@gmail.com"><u>sarvatrik.impex@gmail.com</u></a> or call +91 93737 98454.';
          btn.disabled = false;
          btn.textContent = label;
        });
    });
  }
})();
