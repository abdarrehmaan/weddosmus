/**
 * Ultra-Luxury Muslim Wedding Digital Invitation (Nikah & Walima)
 * Mobile-First Interactive Architecture & Light-Reveal Engine
 */

(function () {
  'use strict';

  // --- Mobile 100dvh Viewport Fix ---
  function updateViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  window.addEventListener('resize', updateViewportHeight);
  window.addEventListener('orientationchange', updateViewportHeight);
  updateViewportHeight();

  // --- Target Wedding Date (May 21, 2026 at 17:00) ---
  const WEDDING_DATE = new Date('2026-05-21T17:00:00');

  // --- DOM Elements ---
  const body = document.body;
  const envelopeStage = document.getElementById('envelope-stage');
  const waxSealButton = document.getElementById('waxSealButton');
  const pulseIndicator = document.getElementById('pulseIndicator');
  const heroTypography = document.getElementById('heroTypography');
  const scrollDownBtn = document.getElementById('scrollDownBtn');
  const confettiCanvas = document.getElementById('confetti-canvas');

  let isEnvelopeOpened = false;

  // ==========================================================================
  // STAGE 1: ENVELOPE OPENING & HERO REVEAL
  // ==========================================================================
  function triggerLightReveal() {
    if (isEnvelopeOpened) return;
    isEnvelopeOpened = true;

    // 1. Touch Feedback & Indicator Fade
    if (pulseIndicator) {
      pulseIndicator.style.opacity = '0';
      setTimeout(() => pulseIndicator.remove(), 400);
    }

    // Subtle tactile unseal response
    if (waxSealButton) {
      waxSealButton.classList.add('unsealed');
    }

    // 2. Smoothly unmount envelope and reveal invitation
    setTimeout(() => {
      envelopeStage.classList.add('fade-out');
      body.classList.remove('locked');

      if (heroTypography) {
        heroTypography.classList.add('revealed');
      }

      // Start gentle ambient soundscape upon unsealing
      try {
        startAmbientAtmosphere();
      } catch (err) {
        console.log('Audio autoplay prevented:', err);
      }

      setTimeout(() => {
        envelopeStage.style.display = 'none';
        // Ensure scratch canvas dimensions match after envelope unmount
        if (typeof refreshAllScratchCanvases === 'function') {
          refreshAllScratchCanvases();
        }
      }, 1000);
    }, 350);
  }

  // Wax Seal tap/click event listeners
  if (waxSealButton) {
    waxSealButton.addEventListener('click', triggerLightReveal);
    waxSealButton.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerLightReveal();
      }
    });
  }

  // Hero Scroll Down Indicator Click
  if (scrollDownBtn) {
    scrollDownBtn.addEventListener('click', () => {
      const mainContent = document.getElementById('mainContent');
      if (mainContent) {
        mainContent.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // ==========================================================================
  // SECTION 1: LIVE COUNTDOWN TICKER
  // ==========================================================================
  const countDaysEl = document.getElementById('countDays');
  const countHoursEl = document.getElementById('countHours');
  const countMinutesEl = document.getElementById('countMinutes');
  const countSecondsEl = document.getElementById('countSeconds');

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = WEDDING_DATE.getTime() - now;

    if (distance <= 0) {
      if (countDaysEl) countDaysEl.textContent = '00';
      if (countHoursEl) countHoursEl.textContent = '00';
      if (countMinutesEl) countMinutesEl.textContent = '00';
      if (countSecondsEl) countSecondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (countDaysEl) countDaysEl.textContent = String(days).padStart(2, '0');
    if (countHoursEl) countHoursEl.textContent = String(hours).padStart(2, '0');
    if (countMinutesEl) countMinutesEl.textContent = String(minutes).padStart(2, '0');
    if (countSecondsEl) countSecondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ==========================================================================
  // SECTION 2: INTERACTIVE GOLD FOIL SCRATCH PASSES & TIMELINE
  // ==========================================================================
  const btnViewScratch = document.getElementById('btnViewScratch');
  const btnViewTimeline = document.getElementById('btnViewTimeline');
  const scratchPassesSection = document.getElementById('scratchPassesSection');
  const eventsAccordion = document.getElementById('eventsAccordion');
  const revealAllPassesBtn = document.getElementById('revealAllPassesBtn');
  const refoilAllPassesBtn = document.getElementById('refoilAllPassesBtn');

  // Ceremony metadata for the 3 events
  const CEREMONY_PASSES = {
    mehendi: {
      key: 'mehendi',
      arabicTitle: 'حفل الحناء',
      englishTitle: 'MEHENDI CELEBRATION',
      dateText: 'TUESDAY · MAY 19, 2026',
      timeText: '06:30 PM',
      icon: '🌺',
      cardId: 'scratchPassMehendi',
      layerId: 'foilLayerMehendi',
      canvasId: 'canvasMehendi'
    },
    nikah: {
      key: 'nikah',
      arabicTitle: 'عقد القران',
      englishTitle: 'NIKAH SOLEMNIZATION',
      dateText: 'THURSDAY · MAY 21, 2026',
      timeText: '05:00 PM',
      icon: '💍',
      cardId: 'scratchPassNikah',
      layerId: 'foilLayerNikah',
      canvasId: 'canvasNikah'
    },
    walima: {
      key: 'walima',
      arabicTitle: 'وليمة العرس',
      englishTitle: 'DAWAT-E-WALIMA BANQUET',
      dateText: 'FRIDAY · MAY 22, 2026',
      timeText: '07:30 PM',
      icon: '✨',
      cardId: 'scratchPassWalima',
      layerId: 'foilLayerWalima',
      canvasId: 'canvasWalima'
    }
  };

  const passState = {
    mehendi: { revealed: false, scratchCount: 0 },
    nikah: { revealed: false, scratchCount: 0 },
    walima: { revealed: false, scratchCount: 0 }
  };

  // Celestial Arpeggio Sound
  function playCelebrationChime() {
    initAudioContext();
    if (!audioCtx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          const now = audioCtx.currentTime;
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);
          gain.gain.setValueAtTime(0.001, now);
          gain.gain.exponentialRampToValueAtTime(0.04, now + 0.04);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.1);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now);
          osc.stop(now + 1.2);
        }, idx * 110);
      });
    } catch (e) {}
  }

  // Tactile Scratch Sound
  let lastScratchTickTime = 0;
  function playScratchTick() {
    const nowMs = Date.now();
    if (nowMs - lastScratchTickTime < 70) return;
    lastScratchTickTime = nowMs;

    initAudioContext();
    if (!audioCtx) return;
    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(400 + Math.random() * 350, now);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1000 + Math.random() * 400, now);
      filter.Q.value = 2.5;

      gain.gain.setValueAtTime(0.018, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch (e) {}
  }

  // Floating Golden Foil Spark Particles
  function createFoilSpark(clientX, clientY) {
    const spark = document.createElement('div');
    spark.className = 'scratch-spark-particle';
    spark.style.left = clientX + 'px';
    spark.style.top = clientY + 'px';
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * 32 + 14;
    spark.style.setProperty('--tx', `${Math.cos(angle) * dist}px`);
    spark.style.setProperty('--ty', `${Math.sin(angle) * dist - 8}px`);
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 600);
  }

  // Draw Metallic Gold Foil on Canvas
  function drawGoldFoil(canvas, meta) {
    if (!canvas) return;
    const container = canvas.parentElement;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const width = Math.max(rect.width || 340, 280);
    const height = Math.max(rect.height || 480, 420);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    const ctx = canvas.getContext('2d');
    ctx.save();
    ctx.scale(dpr, dpr);

    // 1. Rich Metallic Gold Foil Gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#B88225');
    grad.addColorStop(0.18, '#FEEB96');
    grad.addColorStop(0.38, '#DF9E26');
    grad.addColorStop(0.58, '#8C631F');
    grad.addColorStop(0.8, '#FFE685');
    grad.addColorStop(1, '#AA7922');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // 2. Diagonal Specular Shimmer Bands
    ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
    for (let i = -width; i < width * 2; i += 75) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + 45, 0);
      ctx.lineTo(i + 45 - height * 0.45, height);
      ctx.lineTo(i - height * 0.45, height);
      ctx.closePath();
      ctx.fill();
    }

    // 3. Double Gold Inset Borders
    ctx.strokeStyle = 'rgba(255, 245, 200, 0.7)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(12, 12, width - 24, height - 24);

    ctx.strokeStyle = 'rgba(140, 99, 31, 0.45)';
    ctx.lineWidth = 1;
    ctx.strokeRect(17, 17, width - 34, height - 34);

    // Corner decorative brackets
    const drawCorner = (cx, cy, flipX, flipY) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(flipX, flipY);
      ctx.strokeStyle = '#5E4010';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(0, 18);
      ctx.lineTo(0, 0);
      ctx.lineTo(18, 0);
      ctx.stroke();
      ctx.fillStyle = '#FFE685';
      ctx.beginPath();
      ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };
    drawCorner(22, 22, 1, 1);
    drawCorner(width - 22, 22, -1, 1);
    drawCorner(22, height - 22, 1, -1);
    drawCorner(width - 22, height - 22, -1, -1);

    // 4. Center Royal Foil Seal
    const centerX = width / 2;
    const centerY = height * 0.44;

    // Outer medallion circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 70, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(66, 46, 20, 0.42)';
    ctx.fill();
    ctx.strokeStyle = '#FFE685';
    ctx.lineWidth = 1.8;
    ctx.stroke();

    // Dashed inner decorative ring
    ctx.beginPath();
    ctx.arc(centerX, centerY, 63, 0, Math.PI * 2);
    ctx.setLineDash([5, 4]);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.setLineDash([]);

    // Typography on Foil
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.65)';
    ctx.shadowBlur = 6;

    ctx.font = 'bold 22px "Amiri", serif';
    ctx.fillText(meta.arabicTitle, centerX, centerY - 14);

    ctx.font = '16px serif';
    ctx.fillText(meta.icon, centerX, centerY + 14);

    ctx.font = '700 10.5px "Montserrat", sans-serif';
    ctx.fillStyle = '#FFECA0';
    ctx.shadowBlur = 4;
    ctx.fillText(meta.englishTitle, centerX, centerY + 36);

    ctx.font = '600 9.5px "Montserrat", sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowBlur = 3;
    ctx.fillText(meta.dateText, centerX, centerY + 52);

    ctx.shadowBlur = 0;

    // Prominent scratch callout
    const calloutY = height - 58;
    ctx.fillStyle = 'rgba(45, 28, 14, 0.7)';
    const boxW = Math.min(width * 0.82, 280);
    const boxX = (width - boxW) / 2;
    if (ctx.roundRect) {
      ctx.beginPath();
      ctx.roundRect(boxX, calloutY - 14, boxW, 28, 14);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 235, 150, 0.65)';
      ctx.lineWidth = 1;
      ctx.stroke();
    } else {
      ctx.fillRect(boxX, calloutY - 14, boxW, 28);
    }

    ctx.font = '700 9px "Montserrat", sans-serif';
    ctx.fillStyle = '#FFF8D6';
    ctx.fillText('✨ SCRATCH WITH FINGER OR MOUSE ✨', centerX, calloutY);

    ctx.restore();
  }

  // Calculate percentage scratched
  function getScratchedPercentage(canvas) {
    if (!canvas) return 0;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const stride = 24;

    let cleared = 0;
    let total = 0;

    try {
      const imgData = ctx.getImageData(0, 0, width, height).data;
      for (let y = 0; y < height; y += stride) {
        for (let x = 0; x < width; x += stride) {
          const idx = (y * width + x) * 4 + 3;
          total++;
          if (imgData[idx] < 64) {
            cleared++;
          }
        }
      }
    } catch (e) {
      return 0;
    }
    return total > 0 ? (cleared / total) * 100 : 0;
  }

  // Reveal Ceremony Pass
  function revealPass(key) {
    const meta = CEREMONY_PASSES[key];
    if (!meta) return;

    if (passState[key].revealed) return;
    passState[key].revealed = true;

    const card = document.getElementById(meta.cardId);
    const layer = document.getElementById(meta.layerId);

    if (card) card.classList.add('is-revealed');
    if (layer) layer.classList.add('scratched-away');

    fireGoldenConfetti();
    playCelebrationChime();
    showLuxuryToast(`✨ ${meta.englishTitle} Pass Unlocked!`);

    checkAllRevealedState();
  }

  function checkAllRevealedState() {
    const allRevealed = Object.keys(passState).every((k) => passState[k].revealed);
    if (allRevealed) {
      if (revealAllPassesBtn) revealAllPassesBtn.style.display = 'none';
      if (refoilAllPassesBtn) refoilAllPassesBtn.style.display = 'inline-flex';
      setTimeout(() => {
        showLuxuryToast('🎉 Mabrouk! All 3 Wedding Ceremony Passes Unlocked!');
      }, 700);
    }
  }

  // Setup Scratch Canvas Interaction
  function setupScratchCanvas(key) {
    const meta = CEREMONY_PASSES[key];
    const canvas = document.getElementById(meta.canvasId);
    if (!canvas) return;

    drawGoldFoil(canvas, meta);

    const ctx = canvas.getContext('2d');
    let isDown = false;
    let lastX = 0;
    let lastY = 0;
    let moveCounter = 0;

    function getCoords(e) {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const clientX = e.clientX;
      const clientY = e.clientY;
      return {
        canvasX: (clientX - rect.left) * dpr,
        canvasY: (clientY - rect.top) * dpr,
        screenX: clientX,
        screenY: clientY
      };
    }

    function onPointerDown(e) {
      if (passState[key].revealed) return;
      isDown = true;
      try {
        canvas.setPointerCapture(e.pointerId);
      } catch (err) {}

      const coords = getCoords(e);
      lastX = coords.canvasX;
      lastY = coords.canvasY;

      scratchLine(lastX, lastY, coords.canvasX, coords.canvasY);
      playScratchTick();
    }

    function onPointerMove(e) {
      if (!isDown || passState[key].revealed) return;

      const coords = getCoords(e);
      scratchLine(lastX, lastY, coords.canvasX, coords.canvasY);
      lastX = coords.canvasX;
      lastY = coords.canvasY;

      moveCounter++;
      playScratchTick();

      // Emit sparks every few moves
      if (moveCounter % 3 === 0) {
        createFoilSpark(coords.screenX, coords.screenY);
      }

      // Check percentage throttled
      if (moveCounter % 10 === 0) {
        const percent = getScratchedPercentage(canvas);
        if (percent > 35) {
          revealPass(key);
        }
      }
    }

    function onPointerUp(e) {
      if (!isDown) return;
      isDown = false;
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch (err) {}

      if (!passState[key].revealed) {
        const percent = getScratchedPercentage(canvas);
        if (percent > 30) {
          revealPass(key);
        }
      }
    }

    function scratchLine(x1, y1, x2, y2) {
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 44;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x2, y2, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointercancel', onPointerUp);
  }

  // Initialize all 3 scratch passes
  function initAllScratchCards() {
    Object.keys(CEREMONY_PASSES).forEach((key) => {
      setupScratchCanvas(key);
    });

    // Individual Quick Scratch buttons
    document.querySelectorAll('.btn-quick-scratch').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetKey = btn.getAttribute('data-target');
        if (targetKey) revealPass(targetKey);
      });
    });

    // "Reveal All Passes" Button
    if (revealAllPassesBtn) {
      revealAllPassesBtn.addEventListener('click', () => {
        const keys = Object.keys(CEREMONY_PASSES);
        keys.forEach((key, idx) => {
          setTimeout(() => {
            revealPass(key);
          }, idx * 220);
        });
      });
    }

    // "Scratch Again (Re-foil)" Button
    if (refoilAllPassesBtn) {
      refoilAllPassesBtn.addEventListener('click', () => {
        Object.keys(CEREMONY_PASSES).forEach((key) => {
          passState[key].revealed = false;
          const meta = CEREMONY_PASSES[key];
          const card = document.getElementById(meta.cardId);
          const layer = document.getElementById(meta.layerId);
          const canvas = document.getElementById(meta.canvasId);

          if (card) card.classList.remove('is-revealed');
          if (layer) layer.classList.remove('scratched-away');
          if (canvas) drawGoldFoil(canvas, meta);
        });

        refoilAllPassesBtn.style.display = 'none';
        revealAllPassesBtn.style.display = 'inline-flex';
        showLuxuryToast('✨ Gold Foil restored! Enjoy scratching again.');
      });
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        refreshAllScratchCanvases();
      });
    }
  }

  function refreshAllScratchCanvases() {
    if (!scratchPassesSection || scratchPassesSection.style.display === 'none') return;
    Object.keys(CEREMONY_PASSES).forEach((key) => {
      if (!passState[key].revealed) {
        const meta = CEREMONY_PASSES[key];
        const canvas = document.getElementById(meta.canvasId);
        if (canvas) drawGoldFoil(canvas, meta);
      }
    });
  }

  // View Mode Switcher
  if (btnViewScratch && btnViewTimeline && scratchPassesSection && eventsAccordion) {
    btnViewScratch.addEventListener('click', () => {
      btnViewScratch.classList.add('active');
      btnViewScratch.setAttribute('aria-selected', 'true');
      btnViewTimeline.classList.remove('active');
      btnViewTimeline.setAttribute('aria-selected', 'false');

      scratchPassesSection.style.display = 'flex';
      eventsAccordion.style.display = 'none';

      // Redraw any un-revealed cards to ensure proper dimensions
      Object.keys(CEREMONY_PASSES).forEach((key) => {
        if (!passState[key].revealed) {
          const meta = CEREMONY_PASSES[key];
          const canvas = document.getElementById(meta.canvasId);
          if (canvas) drawGoldFoil(canvas, meta);
        }
      });
    });

    btnViewTimeline.addEventListener('click', () => {
      btnViewTimeline.classList.add('active');
      btnViewTimeline.setAttribute('aria-selected', 'true');
      btnViewScratch.classList.remove('active');
      btnViewScratch.setAttribute('aria-selected', 'false');

      scratchPassesSection.style.display = 'none';
      eventsAccordion.style.display = 'flex';
    });
  }

  // Window resize re-fits non-revealed foils
  window.addEventListener('resize', () => {
    if (scratchPassesSection && scratchPassesSection.style.display !== 'none') {
      Object.keys(CEREMONY_PASSES).forEach((key) => {
        if (!passState[key].revealed) {
          const meta = CEREMONY_PASSES[key];
          const canvas = document.getElementById(meta.canvasId);
          if (canvas) drawGoldFoil(canvas, meta);
        }
      });
    }
  });

  // Run initial scratch card setup
  initAllScratchCards();

  // ==========================================================================
  // SECTION 2B: ACCORDION TIMELINE & CALENDAR DOWNLOAD
  // ==========================================================================
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach((item) => {
    const trigger = item.querySelector('.accordion-trigger');
    const content = item.querySelector('.accordion-content');

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other accordions for sleek compact accordion behavior
      accordionItems.forEach((other) => {
        other.classList.remove('active');
        other.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
        other.querySelector('.accordion-content').style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // Dynamic Add to Calendar (.ics Generator)
  document.querySelectorAll('.btn-add-calendar').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const title = btn.getAttribute('data-title') || 'Yassine & Fatima Wedding';
      const start = btn.getAttribute('data-start') || '20260521T170000';
      const end = btn.getAttribute('data-end') || '20260521T210000';
      const location = btn.getAttribute('data-loc') || 'Royal Andalusian Palace';

      const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Yassine & Fatima Wedding//EN',
        'CALSCALE:GREGORIAN',
        'BEGIN:VEVENT',
        `SUMMARY:${title}`,
        `DTSTART:${start}`,
        `DTEND:${end}`,
        `LOCATION:${location}`,
        'DESCRIPTION:Wedding celebration of Yassine & Fatima. May Allah bless this sacred union.',
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', `${title.replace(/\s+/g, '_')}.ics`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  });

  // ==========================================================================
  // SECTION 4: GALLERY TOUCH CAROUSEL & LIGHTBOX MODAL
  // ==========================================================================
  const galleryTrack = document.getElementById('galleryTrack');
  const carouselDots = document.querySelectorAll('.carousel-dot');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
  const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
  const lightboxNextBtn = document.getElementById('lightboxNextBtn');

  let currentGalleryIndex = 0;

  // Track horizontal scroll and sync active dot
  if (galleryTrack && carouselDots.length > 0) {
    galleryTrack.addEventListener('scroll', () => {
      const scrollLeft = galleryTrack.scrollLeft;
      const itemWidth = 280 + 16; // width + gap
      const activeIdx = Math.round(scrollLeft / itemWidth);
      carouselDots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === activeIdx);
      });
    }, { passive: true });
  }

  function openLightbox(index) {
    currentGalleryIndex = index;
    const item = galleryItems[index];
    if (!item) return;

    const img = item.querySelector('.gallery-img');
    const caption = item.getAttribute('data-caption') || '';

    lightboxImg.src = img.src;
    lightboxCaption.textContent = caption;
    lightboxModal.classList.add('active');
  }

  function closeLightbox() {
    lightboxModal.classList.remove('active');
  }

  function navigateLightbox(direction) {
    currentGalleryIndex = (currentGalleryIndex + direction + galleryItems.length) % galleryItems.length;
    openLightbox(currentGalleryIndex);
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', () => navigateLightbox(-1));
  if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', () => navigateLightbox(1));

  // Lightbox click backdrop to close
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  // Keyboard navigation for lightbox
  window.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });

  // Touch swipe support for Lightbox
  let touchStartX = 0;
  if (lightboxModal) {
    lightboxModal.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightboxModal.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        navigateLightbox(1); // Swipe left -> Next
      } else if (touchEndX - touchStartX > 50) {
        navigateLightbox(-1); // Swipe right -> Prev
      }
    }, { passive: true });
  }

  // ==========================================================================
  // SECTION 5: RSVP MODAL & LOCAL STORAGE PERSISTENCE
  // ==========================================================================
  const openRsvpModalBtn = document.getElementById('openRsvpModalBtn');
  const rsvpModal = document.getElementById('rsvpModal');
  const closeRsvpModalBtn = document.getElementById('closeRsvpModalBtn');
  const rsvpForm = document.getElementById('rsvpForm');
  const rsvpSuccessBox = document.getElementById('rsvpSuccessBox');
  const closeSuccessBtn = document.getElementById('closeSuccessBtn');
  const attendYesLabel = document.getElementById('attendYesLabel');
  const attendNoLabel = document.getElementById('attendNoLabel');

  function openRsvp() {
    if (rsvpModal) rsvpModal.classList.add('active');
  }

  function closeRsvp() {
    if (rsvpModal) rsvpModal.classList.remove('active');
  }

  if (openRsvpModalBtn) openRsvpModalBtn.addEventListener('click', openRsvp);
  if (closeRsvpModalBtn) closeRsvpModalBtn.addEventListener('click', closeRsvp);
  if (closeSuccessBtn) closeSuccessBtn.addEventListener('click', closeRsvp);

  if (rsvpModal) {
    rsvpModal.addEventListener('click', (e) => {
      if (e.target === rsvpModal) closeRsvp();
    });
  }

  // Radio button visual selection
  const attendanceRadios = document.querySelectorAll('input[name="attendance"]');
  attendanceRadios.forEach((radio) => {
    radio.addEventListener('change', () => {
      if (radio.value === 'attending') {
        attendYesLabel.classList.add('selected');
        attendNoLabel.classList.remove('selected');
      } else {
        attendNoLabel.classList.add('selected');
        attendYesLabel.classList.remove('selected');
      }
    });
  });

  // Handle RSVP Form Submission
  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const guestName = document.getElementById('guestName').value.trim();
      const guestPhone = document.getElementById('guestPhone').value.trim();
      const guestCount = document.getElementById('guestCount').value;
      const attendance = document.querySelector('input[name="attendance"]:checked').value;
      const guestDua = document.getElementById('guestDua').value.trim();

      const rsvpData = {
        name: guestName,
        phone: guestPhone,
        guests: guestCount,
        attendance: attendance,
        dua: guestDua,
        submittedAt: new Date().toISOString()
      };

      try {
        localStorage.setItem('wedding_rsvp_' + Date.now(), JSON.stringify(rsvpData));
      } catch (err) {
        console.warn('LocalStorage error:', err);
      }

      // Transition to Success confirmation state
      rsvpForm.style.display = 'none';
      rsvpSuccessBox.style.display = 'block';

      // Golden Celebration Confetti
      fireGoldenConfetti();

      // If guest left a Dua, add it to the Duas Wall live
      if (guestDua && guestName) {
        addDuaToWall(guestName, guestDua, 'Just now');
        saveDuaToStorage(guestName, guestDua);
      }
      showLuxuryToast('✨ Your RSVP & Dua have been graciously received!');
    });
  }

  // ==========================================================================
  // WHATSAPP 1-CLICK SHARE GENERATOR
  // ==========================================================================
  const whatsappShareBtn = document.getElementById('whatsappShareBtn');
  if (whatsappShareBtn) {
    whatsappShareBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const shareUrl = window.location.href;
      const shareText = `Assalamu Alaikum ✨\n\nYou are cordially invited to celebrate the royal wedding of Yassine & Fatima.\n\nOpen your digital heirloom invitation here:\n${shareUrl}`;

      if (navigator.share) {
        navigator.share({
          title: 'Yassine & Fatima Wedding Invitation',
          text: shareText,
          url: shareUrl
        }).catch(() => {
          window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
        });
      } else {
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
      }
    });
  }

  // ==========================================================================
  // LUXURY TOAST NOTIFICATION ENGINE
  // ==========================================================================
  const luxuryToast = document.getElementById('luxuryToast');
  let toastTimeout;

  function showLuxuryToast(message, duration = 3200) {
    if (!luxuryToast) return;
    luxuryToast.textContent = message;
    luxuryToast.classList.add('active');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      luxuryToast.classList.remove('active');
    }, duration);
  }

  // ==========================================================================
  // 1-CLICK COPY VENUE ADDRESS
  // ==========================================================================
  const copyAddressBtn = document.getElementById('copyAddressBtn');
  if (copyAddressBtn) {
    copyAddressBtn.addEventListener('click', () => {
      const address = copyAddressBtn.getAttribute('data-address') || 'The Royal Andalusian Palace, Avenue des Jardins, Marrakech';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(address).then(() => {
          showLuxuryToast('📍 Venue address copied to clipboard!');
        }).catch(() => {
          fallbackCopyText(address);
        });
      } else {
        fallbackCopyText(address);
      }
    });
  }

  function fallbackCopyText(text) {
    const tempInput = document.createElement('textarea');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showLuxuryToast('📍 Venue address copied to clipboard!');
  }

  // ==========================================================================
  // INTERACTIVE DUAS WALL & PERSISTENCE
  // ==========================================================================
  const duasGrid = document.getElementById('duasGrid');
  const leaveDuaPromptBtn = document.getElementById('leaveDuaPromptBtn');

  function addDuaToWall(name, message, timeText) {
    if (!duasGrid) return;
    const card = document.createElement('div');
    card.className = 'dua-card new-blessing';
    card.innerHTML = `
      <div class="dua-card-header">
        <span class="dua-author-name">${escapeHtml(name)}</span>
        <span class="dua-tag">Guest Blessing</span>
      </div>
      <p class="dua-message-text">“${escapeHtml(message)}”</p>
      <span class="dua-time">${timeText || 'Just now'}</span>
    `;
    duasGrid.insertBefore(card, duasGrid.firstChild);
  }

  function saveDuaToStorage(name, message) {
    try {
      const stored = JSON.parse(localStorage.getItem('wedding_duas_list') || '[]');
      stored.unshift({ name, message, date: new Date().toLocaleDateString() });
      localStorage.setItem('wedding_duas_list', JSON.stringify(stored.slice(0, 20)));
    } catch (e) {
      console.warn(e);
    }
  }

  function loadStoredDuas() {
    try {
      const stored = JSON.parse(localStorage.getItem('wedding_duas_list') || '[]');
      stored.forEach((item) => {
        addDuaToWall(item.name, item.message, item.date || 'Recent blessing');
      });
    } catch (e) {
      console.warn(e);
    }
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  if (leaveDuaPromptBtn) {
    leaveDuaPromptBtn.addEventListener('click', () => {
      openRsvp();
      const guestDuaField = document.getElementById('guestDua');
      if (guestDuaField) {
        setTimeout(() => guestDuaField.focus(), 300);
      }
    });
  }

  loadStoredDuas();

  // ==========================================================================
  // FLOATING BOTTOM QUICK-ACTION DOCK
  // ==========================================================================
  const floatingNavDock = document.getElementById('floatingNavDock');
  const dockRsvpBtn = document.getElementById('dockRsvpBtn');

  if (floatingNavDock) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 380) {
        floatingNavDock.classList.add('visible');
      } else {
        floatingNavDock.classList.remove('visible');
      }
    }, { passive: true });

    floatingNavDock.querySelectorAll('.dock-btn[data-target]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const targetEl = document.getElementById(targetId) || document.querySelector('.' + targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    if (dockRsvpBtn) {
      dockRsvpBtn.addEventListener('click', openRsvp);
    }
  }

  // ==========================================================================
  // WEB AUDIO AMBIENT SOUND GENERATOR (ACOUSTIC OUD & CELESTIAL DRONE)
  // ==========================================================================
  const ambientAudioBtn = document.getElementById('ambientAudioBtn');
  let audioCtx = null;
  let isPlayingAudio = false;
  let melodyTimer = null;
  let droneGain = null;

  // Pentatonic Oud scale frequencies (D3, F3, G3, A3, C4, D4, F4, G4, A4, C5)
  const OUD_NOTES = [146.83, 174.61, 196.0, 220.0, 261.63, 293.66, 349.23, 392.0, 440.0, 523.25];

  function initAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return null;
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playPluckedOudNote(freq) {
    if (!audioCtx || !isPlayingAudio) return;
    const now = audioCtx.currentTime;

    const osc = audioCtx.createOscillator();
    const filter = audioCtx.createBiquadFilter();
    const noteGain = audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    // Warm resonant acoustic filter
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.exponentialRampToValueAtTime(320, now + 1.8);

    // Plucked string envelope
    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.exponentialRampToValueAtTime(0.045, now + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

    osc.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 2.3);
  }

  function startAmbientAtmosphere() {
    initAudioContext();
    if (!audioCtx) return;

    isPlayingAudio = true;
    if (ambientAudioBtn) ambientAudioBtn.classList.add('playing');

    // Create subtle warm celestial drone pad
    if (!droneGain) {
      const now = audioCtx.currentTime;
      const droneOsc1 = audioCtx.createOscillator();
      const droneOsc2 = audioCtx.createOscillator();
      const droneFilter = audioCtx.createBiquadFilter();
      droneGain = audioCtx.createGain();

      droneOsc1.type = 'sine';
      droneOsc1.frequency.setValueAtTime(146.83, now); // D3

      droneOsc2.type = 'sine';
      droneOsc2.frequency.setValueAtTime(220.0, now); // A3

      droneFilter.type = 'lowpass';
      droneFilter.frequency.setValueAtTime(450, now);

      droneGain.gain.setValueAtTime(0.001, now);
      droneGain.gain.exponentialRampToValueAtTime(0.015, now + 2);

      droneOsc1.connect(droneFilter);
      droneOsc2.connect(droneFilter);
      droneFilter.connect(droneGain);
      droneGain.connect(audioCtx.destination);

      droneOsc1.start(now);
      droneOsc2.start(now);
    } else {
      droneGain.gain.exponentialRampToValueAtTime(0.015, audioCtx.currentTime + 1);
    }

    // Play periodic serene melody
    playMelodySequence();
    showLuxuryToast('🎵 Ambient Oud Melody playing softly');
  }

  function playMelodySequence() {
    if (!isPlayingAudio) return;
    const note = OUD_NOTES[Math.floor(Math.random() * OUD_NOTES.length)];
    playPluckedOudNote(note);

    const delay = Math.random() * 2200 + 1600;
    melodyTimer = setTimeout(playMelodySequence, delay);
  }

  function stopAmbientAtmosphere() {
    isPlayingAudio = false;
    if (ambientAudioBtn) ambientAudioBtn.classList.remove('playing');
    clearTimeout(melodyTimer);

    if (droneGain && audioCtx) {
      droneGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.8);
    }
    showLuxuryToast('Muted ambient music');
  }

  if (ambientAudioBtn) {
    ambientAudioBtn.addEventListener('click', () => {
      if (isPlayingAudio) {
        stopAmbientAtmosphere();
      } else {
        startAmbientAtmosphere();
      }
    });
  }

  // ==========================================================================
  // GOLDEN CONFETTI PARTICLE SYSTEM (60FPS Canvas Engine)
  // ==========================================================================
  function fireGoldenConfetti() {
    if (!confettiCanvas) return;
    const ctx = confettiCanvas.getContext('2d');
    let width = (confettiCanvas.width = window.innerWidth);
    let height = (confettiCanvas.height = window.innerHeight);

    const particles = [];
    const colors = ['#FFF3B0', '#F7C844', '#D49B27', '#E8CA7C', '#FFFFFF', '#DEC4B3'];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: width * 0.5 + (Math.random() - 0.5) * 120,
        y: height * 0.55,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.9) * 16 - 4,
        size: Math.random() * 7 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 8,
        gravity: 0.35,
        friction: 0.985,
        alpha: 1,
        alphaDecay: Math.random() * 0.008 + 0.006
      });
    }

    let animationFrameId;

    function render() {
      ctx.clearRect(0, 0, width, height);
      let activeParticles = 0;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.alpha <= 0) continue;
        activeParticles++;

        p.vx *= p.friction;
        p.vy *= p.friction;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.alpha -= p.alphaDecay;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;

        // Draw diamond / petal shapes
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.lineTo(p.size * 0.7, 0);
        ctx.lineTo(0, p.size);
        ctx.lineTo(-p.size * 0.7, 0);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      }

      if (activeParticles > 0) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
        cancelAnimationFrame(animationFrameId);
      }
    }

    render();
  }

})();
