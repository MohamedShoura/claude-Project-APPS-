/* =============================================
   DAR AL HIKMAH TRADING — Main JavaScript
   ============================================= */
(function () {
  'use strict';

  /* ── Sticky Navbar ── */
  const header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  /* ── Mobile Menu ── */
  const toggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('nav-mobile');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => mobileMenu.classList.toggle('open'));
    mobileMenu.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => mobileMenu.classList.remove('open'))
    );
  }

  /* ── Smooth Scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Typewriter Effect ── */
  const typedEl = document.getElementById('typed-text');
  const cursorEl = document.getElementById('typed-cursor');
  if (typedEl) {
    const words = (typedEl.dataset.words || '').split(',').map(w => w.trim()).filter(Boolean);
    let wi = 0, ci = 0, deleting = false;
    function type() {
      const word = words[wi % words.length];
      if (!deleting && ci < word.length) {
        typedEl.textContent = word.slice(0, ++ci);
        setTimeout(type, 120);
      } else if (!deleting && ci === word.length) {
        setTimeout(() => { deleting = true; type(); }, 2200);
      } else if (deleting && ci > 0) {
        typedEl.textContent = word.slice(0, --ci);
        setTimeout(type, 60);
      } else {
        deleting = false; wi++;
        setTimeout(type, 300);
      }
    }
    if (words.length) type();
  }

  /* ── Product Filter Tabs ── */
  const filterTabs = document.querySelectorAll('.filter-tab');
  const productCards = document.querySelectorAll('.product-card[data-category]');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.cat;
      productCards.forEach(card => {
        const show = cat === 'all' || card.dataset.category === cat;
        card.classList.toggle('hidden', !show);
      });
    });
  });

  /* ── Language Toggle ── */
  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    const savedLang = localStorage.getItem('dah-lang') || 'en';
    applyLang(savedLang);
    langBtn.addEventListener('click', () => {
      const current = document.documentElement.lang || 'en';
      applyLang(current === 'en' ? 'ar' : 'en');
    });
  }

  function applyLang(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('rtl', lang === 'ar');
    localStorage.setItem('dah-lang', lang);
    if (langBtn) {
      langBtn.innerHTML = lang === 'ar'
        ? '<span>🇬🇧</span> English'
        : '<span>🇸🇦</span> العربية';
    }
    // Show/hide language-specific elements
    document.querySelectorAll('[data-lang]').forEach(el => {
      el.style.display = el.dataset.lang === lang ? '' : 'none';
    });
  }

  /* ── Quote / Contact Form Submission ── */
  document.querySelectorAll('.dah-form').forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const originalText = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:rotateSlow 1s linear infinite;display:inline-block"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg> Sending...';

      const data = new FormData(form);
      data.append('action', 'dah_submit_form');

      fetch(dahAjax.url, { method: 'POST', body: data })
        .then(r => r.json())
        .then(res => {
          if (res.success) {
            form.innerHTML = `<div class="success-box"><div class="icon">✅</div><h3>${res.data.title}</h3><p>${res.data.message}</p><button class="btn-gold" onclick="location.reload()">${res.data.btn}</button></div>`;
          } else {
            btn.disabled = false;
            btn.innerHTML = originalText;
            alert(res.data || 'Something went wrong. Please try again.');
          }
        })
        .catch(() => {
          btn.disabled = false;
          btn.innerHTML = originalText;
        });
    });
  });

  /* ── Intersection Observer — fade in ── */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card-glass, .product-card, .partner-card, .service-card, .reason-card, .milk-card').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity .6s ease, transform .6s ease';
      io.observe(el);
    });
  }

})();
