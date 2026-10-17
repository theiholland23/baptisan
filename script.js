/* ==========================================================================
   Undangan Syukuran Permandian — Hereun & Michelete
   Interactive Animations, Gallery Filter, Touch Lightbox & Piano.mp3 Audio
   ========================================================================== */

(function () {
  'use strict';

  // 1. Parse Guest Name from URL query string (?to=Nama+Tamu or ?kepada=Nama+Tamu)
  const params = new URLSearchParams(window.location.search);
  const guestParam = params.get('to') || params.get('kepada') || params.get('tamu');
  const guestNameEl = document.getElementById('guest-name-display');
  if (guestParam && guestNameEl) {
    guestNameEl.textContent = guestParam.trim();
  }

  // 2. Background Music (Piano.mp3)
  const bgMusic = document.getElementById('bg-music');
  const musicFab = document.getElementById('music-fab');
  let isMusicPlaying = false;

  function playBackgroundMusic() {
    if (!bgMusic) return;
    bgMusic
      .play()
      .then(() => {
        isMusicPlaying = true;
        if (musicFab) musicFab.classList.add('is-playing');
      })
      .catch(() => {
        isMusicPlaying = false;
        if (musicFab) musicFab.classList.remove('is-playing');
      });
  }

  function pauseBackgroundMusic() {
    if (!bgMusic) return;
    bgMusic.pause();
    isMusicPlaying = false;
    if (musicFab) musicFab.classList.remove('is-playing');
  }

  if (musicFab) {
    musicFab.addEventListener('click', () => {
      if (isMusicPlaying && bgMusic && !bgMusic.paused) {
        pauseBackgroundMusic();
        showToast('Musik latar dijeda');
      } else {
        playBackgroundMusic();
        showToast('Alunan musik piano diputar');
      }
    });
  }

  // 3. Opening Cover Gate & Smooth Scroll Actions
  const coverGate = document.getElementById('cover-gate');
  const btnOpenInvite = document.getElementById('btn-open-invite');
  const btnJumpLocation = document.getElementById('btn-jump-location');

  function unlockInvitation(targetSectionId) {
    if (coverGate) {
      coverGate.classList.add('is-hidden');
    }
    document.body.classList.remove('gate-locked');
    spawnCelebrationBurst(window.innerWidth / 2, window.innerHeight / 2, 34);
    playBackgroundMusic();

    if (targetSectionId) {
      setTimeout(() => {
        const target = document.getElementById(targetSectionId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 320);
    }
  }

  if (btnOpenInvite) {
    btnOpenInvite.addEventListener('click', () => {
      const rect = btnOpenInvite.getBoundingClientRect();
      spawnCelebrationBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 28);
      unlockInvitation(null);
    });
  }

  if (btnJumpLocation) {
    btnJumpLocation.addEventListener('click', () => {
      unlockInvitation('lokasi');
    });
  }

  // 4. Top Scroll Progress Bar & Bottom Nav Active State
  const progressBar = document.getElementById('scroll-progress-bar');
  const navLinks = document.querySelectorAll('.bottom-navbar .nav-item');
  const trackedSections = ['beranda', 'profil', 'lokasi', 'galeri'];

  function onScrollUpdate() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
    if (progressBar) {
      progressBar.style.width = pct.toFixed(1) + '%';
    }

    let currentSec = 'beranda';
    const viewportMid = scrollTop + window.innerHeight * 0.38;
    for (const secId of trackedSections) {
      const el = document.getElementById(secId);
      if (el && el.offsetTop <= viewportMid) {
        currentSec = secId;
      }
    }
    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === '#' + currentSec) {
        link.classList.add('is-active');
      } else {
        link.classList.remove('is-active');
      }
    });
  }

  window.addEventListener('scroll', onScrollUpdate, { passive: true });
  onScrollUpdate();

  // 5. IntersectionObserver Staggered Cascade Reveals
  const revealItems = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );
    revealItems.forEach((el) => observer.observe(el));
  } else {
    revealItems.forEach((el) => el.classList.add('is-visible'));
  }

  // 6. Real-Time Countdown Timer to Sunday, 18 October 2026 at 13:00
  const cdDays = document.getElementById('cd-days');
  const cdHours = document.getElementById('cd-hours');
  const cdMins = document.getElementById('cd-mins');
  const cdSecs = document.getElementById('cd-secs');
  const cdStatusText = document.getElementById('countdown-status-label');

  const eventDate = new Date(2026, 9, 18, 13, 0, 0).getTime();

  function updateCountdown() {
    const now = Date.now();
    const diff = eventDate - now;

    if (diff <= 0) {
      if (cdDays) cdDays.textContent = '00';
      if (cdHours) cdHours.textContent = '00';
      if (cdMins) cdMins.textContent = '00';
      if (cdSecs) cdSecs.textContent = '00';
      if (cdStatusText) {
        cdStatusText.textContent = 'Hari Penuh Berkat Telah Tiba • Minggu, 18 Oktober 2026';
      }
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / 1000 / 60) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    if (cdDays) cdDays.textContent = String(days).padStart(2, '0');
    if (cdHours) cdHours.textContent = String(hours).padStart(2, '0');
    if (cdMins) cdMins.textContent = String(mins).padStart(2, '0');
    if (cdSecs) cdSecs.textContent = String(secs).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // 7. Gallery Data, Filter Tabs & Touch-Swipeable Lightbox (High-Resolution Original Photos)
  const galleryPhotos = [];
  for (let i = 1; i <= 11; i++) {
    const num = String(i).padStart(2, '0');
    galleryPhotos.push({
      src: `img/hereun-${num}.jpg`,
      category: 'hereun',
      title: 'Hereun Sintikhe Balubun',
      family: 'Keluarga Besar Balubun-Kwando',
      badge: `Hereun #${i}`
    });
    galleryPhotos.push({
      src: `img/michelete-${num}.jpg`,
      category: 'michelete',
      title: 'Michelete Miska Noya',
      family: 'Keluarga Besar Noya-Ngabalin',
      badge: `Michelete #${i}`
    });
  }

  const galleryGrid = document.getElementById('gallery-grid');
  const filterButtons = document.querySelectorAll('.gallery-tab-btn');
  let activeCategory = 'all';
  let visiblePhotos = [...galleryPhotos];
  let currentLightboxIdx = 0;

  function renderGallery() {
    if (!galleryGrid) return;
    galleryGrid.innerHTML = '';
    visiblePhotos = galleryPhotos.filter(
      (item) => activeCategory === 'all' || item.category === activeCategory
    );

    visiblePhotos.forEach((item, idx) => {
      const card = document.createElement('div');
      card.className = 'gallery-item';
      card.style.setProperty('--stagger-delay', `${(idx % 6) * 45}ms`);
      card.innerHTML = `
        <img src="${item.src}" alt="${item.title} - ${item.badge}" loading="lazy" />
        <div class="gallery-caption-pill">
          <span>${item.category === 'hereun' ? 'Hereun' : 'Michelete'}</span>
          <span class="gallery-caption-dot"></span>
        </div>
      `;
      card.addEventListener('click', () => openLightbox(idx));
      galleryGrid.appendChild(card);
    });
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      activeCategory = btn.getAttribute('data-filter') || 'all';
      renderGallery();
      const rect = btn.getBoundingClientRect();
      spawnCelebrationBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 12);
    });
  });

  renderGallery();

  document.querySelectorAll('[data-open-subject]').forEach((el) => {
    el.addEventListener('click', () => {
      const subj = el.getAttribute('data-open-subject');
      activeCategory = 'all';
      filterButtons.forEach((b) => {
        b.classList.toggle('is-active', b.getAttribute('data-filter') === 'all');
      });
      renderGallery();
      const targetIdx = visiblePhotos.findIndex((p) => p.category === subj);
      openLightbox(targetIdx >= 0 ? targetIdx : 0);
    });
  });

  // Lightbox Modal Controls & Touch Swipe
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxSub = document.getElementById('lightbox-sub');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  function updateLightboxSlide() {
    if (!visiblePhotos.length) return;
    const item = visiblePhotos[currentLightboxIdx];
    if (lightboxImg) {
      lightboxImg.src = item.src;
      lightboxImg.alt = item.title;
    }
    if (lightboxCounter) {
      lightboxCounter.textContent = `${currentLightboxIdx + 1} / ${visiblePhotos.length}`;
    }
    if (lightboxTitle) {
      lightboxTitle.textContent = item.title;
    }
    if (lightboxSub) {
      lightboxSub.textContent = item.family;
    }
  }

  function openLightbox(index) {
    currentLightboxIdx = index;
    updateLightboxSlide();
    if (lightboxModal) {
      lightboxModal.classList.add('is-open');
    }
  }

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('is-open');
    }
  }

  function stepLightbox(delta) {
    if (!visiblePhotos.length) return;
    currentLightboxIdx = (currentLightboxIdx + delta + visiblePhotos.length) % visiblePhotos.length;
    updateLightboxSlide();
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', () => stepLightbox(-1));
  if (lightboxNext) lightboxNext.addEventListener('click', () => stepLightbox(1));
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') stepLightbox(-1);
    if (e.key === 'ArrowRight') stepLightbox(1);
  });

  // Touch Swipe Left/Right on Lightbox
  let touchStartX = 0;
  let touchStartY = 0;
  if (lightboxModal) {
    lightboxModal.addEventListener(
      'touchstart',
      (e) => {
        if (e.touches.length === 1) {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
        }
      },
      { passive: true }
    );

    lightboxModal.addEventListener(
      'touchend',
      (e) => {
        if (e.changedTouches.length === 1) {
          const dx = e.changedTouches[0].clientX - touchStartX;
          const dy = e.changedTouches[0].clientY - touchStartY;
          if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy)) {
            if (dx < 0) {
              stepLightbox(1);
            } else {
              stepLightbox(-1);
            }
          }
        }
      },
      { passive: true }
    );
  }

  // 8. Copy Location Link & Save to Calendar
  const toastEl = document.getElementById('toast-msg');
  let toastTimer = null;

  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('is-shown');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('is-shown');
    }, 2600);
  }

  const btnCopyMap = document.getElementById('btn-copy-map');
  const mapUrl = 'https://maps.app.goo.gl/f7eLwaeYmprcdi9L9?g_st=aw';

  if (btnCopyMap) {
    btnCopyMap.addEventListener('click', () => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(mapUrl).then(() => {
          showToast('Tautan Google Maps berhasil disalin!');
        });
      } else {
        showToast('Membuka Google Maps...');
        window.open(mapUrl, '_blank');
      }
    });
  }

  const btnAddCalendar = document.getElementById('btn-add-calendar');
  if (btnAddCalendar) {
    btnAddCalendar.addEventListener('click', () => {
      const title = encodeURIComponent(
        'Syukuran Permandian Hereun Sintikhe Balubun & Michelete Miska Noya'
      );
      const details = encodeURIComponent(
        'Undangan Syukuran Permandian Hereun Sintikhe Balubun (Keluarga Besar Balubun-Kwando) & Michelete Miska Noya (Keluarga Besar Noya-Ngabalin). Lokasi: Kediaman Bapak Dr. Daniel Balubun - Tisay, Belakang POM. Google Maps: ' +
          mapUrl
      );
      const location = encodeURIComponent(
        'Kediaman Bapak Dr. Daniel Balubun - Tisay, Belakang POM'
      );
      const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20261018T060000Z/20261018T100000Z&details=${details}&location=${location}`;
      window.open(gcalUrl, '_blank', 'noopener');
    });
  }

  // 9. HTML5 Canvas: Drifting Petals, Twinkling 4-Point Stars, Button Bursts & Touch Sparkles
  const canvas = document.getElementById('ambient-canvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  let cw = window.innerWidth;
  let ch = window.innerHeight;
  const petals = [];
  const stars = [];
  const sparkles = [];

  function resizeCanvas() {
    if (!canvas) return;
    cw = window.innerWidth;
    ch = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = cw * dpr;
    canvas.height = ch * dpr;
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  for (let i = 0; i < 16; i++) {
    petals.push({
      x: Math.random() * cw,
      y: Math.random() * ch,
      r: 3.5 + Math.random() * 4.5,
      vy: 0.35 + Math.random() * 0.55,
      vx: -0.25 + Math.random() * 0.5,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.02,
      color: i % 2 === 0 ? 'rgba(223, 181, 176, 0.38)' : 'rgba(232, 215, 185, 0.42)'
    });
  }

  for (let i = 0; i < 14; i++) {
    stars.push({
      x: Math.random() * cw,
      y: Math.random() * ch,
      size: 3 + Math.random() * 4.5,
      phase: Math.random() * Math.PI * 2,
      speed: 0.02 + Math.random() * 0.025
    });
  }

  function spawnCelebrationBurst(x, y, count) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
      const speed = 1.2 + Math.random() * 3.8;
      sparkles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.6,
        size: 2.5 + Math.random() * 3.5,
        alpha: 1,
        decay: 0.016 + Math.random() * 0.015,
        color: i % 2 === 0 ? '#C29B53' : '#DFB5B0'
      });
    }
  }

  window.addEventListener(
    'touchmove',
    (e) => {
      if (e.touches.length > 0 && Math.random() < 0.45) {
        const t = e.touches[0];
        sparkles.push({
          x: t.clientX,
          y: t.clientY,
          vx: (Math.random() - 0.5) * 1.2,
          vy: -0.5 - Math.random() * 1.0,
          size: 2 + Math.random() * 2.5,
          alpha: 0.85,
          decay: 0.028,
          color: '#C29B53'
        });
      }
    },
    { passive: true }
  );

  function drawFourPointStar(cx, cy, radius, alpha) {
    if (!ctx) return;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.beginPath();
    const inner = radius * 0.28;
    for (let i = 0; i < 8; i++) {
      const r = i % 2 === 0 ? radius : inner;
      const a = (i * Math.PI) / 4;
      const px = Math.cos(a) * r;
      const py = Math.sin(a) * r;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fillStyle = `rgba(194, 155, 83, ${alpha.toFixed(3)})`;
    ctx.fill();
    ctx.restore();
  }

  function animateCanvas() {
    if (!ctx) return;
    ctx.clearRect(0, 0, cw, ch);

    for (const p of petals) {
      p.y += p.vy;
      p.x += p.vx + Math.sin(p.y * 0.012) * 0.25;
      p.angle += p.spin;
      if (p.y > ch + 12) {
        p.y = -12;
        p.x = Math.random() * cw;
      }
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.beginPath();
      ctx.ellipse(0, 0, p.r, p.r * 0.58, 0, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      ctx.restore();
    }

    for (const s of stars) {
      s.phase += s.speed;
      const alpha = 0.15 + ((Math.sin(s.phase) + 1) * 0.5) * 0.42;
      drawFourPointStar(s.x, s.y, s.size, alpha);
    }

    for (let i = sparkles.length - 1; i >= 0; i--) {
      const sp = sparkles[i];
      sp.x += sp.vx;
      sp.y += sp.vy;
      sp.vy += 0.04;
      sp.alpha -= sp.decay;
      if (sp.alpha <= 0) {
        sparkles.splice(i, 1);
        continue;
      }
      drawFourPointStar(sp.x, sp.y, sp.size, sp.alpha);
    }

    requestAnimationFrame(animateCanvas);
  }

  requestAnimationFrame(animateCanvas);
})();
