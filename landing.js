/* ================================================================
   Zenith Aim — landing.js
   Landing page particle canvas + interactions
   ================================================================ */
(function () {
  'use strict';

  /* ── Particle canvas ── */
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], animId;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function randomBetween(a, b) { return a + Math.random() * (b - a); }

  const COLORS = [
    'rgba(139,0,255,',
    'rgba(77,143,255,',
    'rgba(232,192,0,',
    'rgba(191,62,255,',
  ];

  function makeParticle() {
    return {
      x:    randomBetween(0, W),
      y:    randomBetween(0, H),
      r:    randomBetween(1, 2.5),
      vx:   randomBetween(-0.18, 0.18),
      vy:   randomBetween(-0.25, -0.07),
      life: randomBetween(0.3, 1),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
  }

  function initParticles() {
    particles = [];
    const count = Math.min(Math.floor(W * H / 9000), 90);
    for (let i = 0; i < count; i++) particles.push(makeParticle());
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach((p, i) => {
      p.x  += p.vx;
      p.y  += p.vy;
      p.life -= 0.0015;

      if (p.life <= 0 || p.y < -10) {
        particles[i] = makeParticle();
        particles[i].y = H + 5;
        return;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + Math.min(p.life, 0.6) + ')';
      ctx.fill();
    });

    animId = requestAnimationFrame(draw);
  }

  function start() {
    resize();
    initParticles();
    draw();
  }

  window.addEventListener('resize', () => {
    resize();
    initParticles();
  });

  start();

  /* ── Scroll-reveal for feature cards ── */
  const cards = document.querySelectorAll('.feat-card');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity    = '1';
          e.target.style.transform  = 'translateY(0)';
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    cards.forEach((c, i) => {
      c.style.opacity   = '0';
      c.style.transform = 'translateY(28px)';
      c.style.transition = `opacity .5s ease ${i * 0.10}s, transform .5s cubic-bezier(0.16,1,0.3,1) ${i * 0.10}s`;
      io.observe(c);
    });
  }

  /* ── Smooth hero entrance ── */
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.opacity   = '0';
    heroContent.style.transform = 'translateY(24px)';
    heroContent.style.transition = 'opacity .7s ease .1s, transform .7s cubic-bezier(0.16,1,0.3,1) .1s';
    requestAnimationFrame(() => {
      heroContent.style.opacity   = '1';
      heroContent.style.transform = 'translateY(0)';
    });
  }

})();

/* ── Section routing via sessionStorage (no # in URL) ── */
document.querySelectorAll('[data-goto]').forEach(el => {
  el.addEventListener('click', function(e) {
    e.preventDefault();
    const section = this.dataset.goto;
    sessionStorage.setItem('zenith_section', section);
    window.location.href = 'app.html';
  });
});
