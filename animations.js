/* ═══════════════════════════════════════════════════
   ANIMATIONS.JS
   1. Page transition links
   2. Floating particles
   3. ECG heartbeat line
   4. Scroll reveal
═══════════════════════════════════════════════════ */


/* ─────────────────────────────────────────────────
   1. PAGE TRANSITIONS
   Intercepts all internal link clicks,
   fades the page out, then navigates
───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {

  document.querySelectorAll('a[href]').forEach(function (link) {
    const href = link.getAttribute('href');

    // Only intercept internal HTML page links
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;

    link.addEventListener('click', function (e) {
      e.preventDefault();
      document.body.classList.add('page-exit');

      setTimeout(function () {
        window.location.href = href;
      }, 350);
    });
  });


  /* ───────────────────────────────────────────────
     2. FLOATING PARTICLES
     Draws soft glowing dots drifting upward
     Runs on all pages
  ─────────────────────────────────────────────── */
  const canvas = document.createElement('canvas');
  canvas.id    = 'particle-canvas';
  document.body.appendChild(canvas);

  const ctx    = canvas.getContext('2d');
  let   particles = [];
  let   W, H;

  function resizeCanvas() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Determine particle color based on page theme
  const isAuthPage = document.body.classList.contains('auth-body') ||
                     document.body.classList.contains('welcome-body');
  const particleColor = isAuthPage ? '255,255,255' : '26,86,219';

  // Create particles
  for (let i = 0; i < 55; i++) {
    particles.push({
      x:       Math.random() * window.innerWidth,
      y:       Math.random() * window.innerHeight,
      r:       Math.random() * 2.5 + 0.5,
      speedY:  Math.random() * 0.4 + 0.1,
      speedX:  (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.5 + 0.1
    });
  }

  function drawParticles() {
    ctx.clearRect(0, 0, W, H);

    particles.forEach(function (p) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${particleColor}, ${p.opacity})`;
      ctx.fill();

      // Drift upward and slightly sideways
      p.y -= p.speedY;
      p.x += p.speedX;

      // Reset when off screen
      if (p.y < -10) {
        p.y = H + 10;
        p.x = Math.random() * W;
      }
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
    });

    requestAnimationFrame(drawParticles);
  }

  drawParticles();


  /* ───────────────────────────────────────────────
     3. ECG HEARTBEAT BAR
     Only shows on the dashboard page
  ─────────────────────────────────────────────── */
  const isDashboard = window.location.pathname.includes('health-companion');

  if (isDashboard) {
    document.body.classList.add('has-ecg');

    const ecgBar = document.createElement('div');
    ecgBar.className = 'ecg-bar';

    // ECG path — one full cycle repeated so the scroll loop is seamless
    const ecgPoints = '0,24 30,24 40,24 50,4 58,44 66,8 74,40 82,24 120,24 150,24 160,4 168,44 176,8 184,40 192,24 230,24';

    ecgBar.innerHTML = `
      <svg viewBox="0 0 230 48" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <polyline class="ecg-path" points="${ecgPoints}"/>
        <polyline class="ecg-path" points="${ecgPoints}" transform="translate(230,0)"/>
      </svg>
    `;

    document.body.appendChild(ecgBar);
  }


  /* ───────────────────────────────────────────────
     4. SCROLL REVEAL
     Watches elements with class .reveal and adds
     .revealed when they enter the viewport
  ─────────────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length > 0) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target); // only reveal once
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(function (el) { observer.observe(el); });
  }

});
