/**
 * APEX CHRONO - MAIN APPLICATION SCRIPT
 * Handles UI interactions, live telemetry, countdown timer, variant selector, and checkout modal
 */

import { initAnimations } from './animations.js';
import { initParticles } from './particles.js';
import { initQuiz } from './quiz.js';
import { initWhatsApp, initSocialToasts } from './tools.js';
import {
  initShippingCalculator,
  initComparisonTool,
  initBatterySimulator,
  initWatchFaceSwitcher
} from './calculator.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Framer Motion scroll and entrance animations
  initAnimations();

  // Initialize Hero redesign features
  initParticles('particle-canvas');
  initWatch3DTilt();
  initHeroLiveData();

  // Initialize interactive components
  initCountdownTimer();
  initVariantSelector();
  initTelemetrySimulator();
  initCheckoutModal();
  initFAQAccordion();

  // Initialize interactive tools suite
  initQuiz();
  initWhatsApp();
  initSocialToasts();
  initShippingCalculator();
  initComparisonTool();
  initBatterySimulator();
  initWatchFaceSwitcher();
});

/**
 * Watch 3D Tilt — gyroscope on mobile, mouse parallax on desktop
 */
function initWatch3DTilt() {
  const wrapper = document.getElementById('watch-3d');
  if (!wrapper) return;

  // Desktop: mouse-based parallax
  const hero = document.getElementById('hero');
  hero?.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const cx   = rect.left + rect.width / 2;
    const cy   = rect.top  + rect.height / 2;
    const dx   = (e.clientX - cx) / (rect.width / 2);
    const dy   = (e.clientY - cy) / (rect.height / 2);
    wrapper.style.transform = `perspective(600px) rotateY(${dx * 12}deg) rotateX(${-dy * 8}deg)`;
  });

  hero?.addEventListener('mouseleave', () => {
    wrapper.style.transform = '';
  });

  // Mobile: deviceorientation gyroscope
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', (e) => {
      if (e.gamma == null || e.beta == null) return;
      const tiltX = Math.max(-20, Math.min(20, e.gamma));
      const tiltY = Math.max(-10, Math.min(10, e.beta - 45));
      wrapper.style.transform = `perspective(600px) rotateY(${tiltX * 0.6}deg) rotateX(${-tiltY * 0.4}deg)`;
    }, { passive: true });
  }
}

/**
 * Hero Live Data — updates BPM and step counter dynamically
 */
function initHeroLiveData() {
  const heroBpm   = document.getElementById('hero-bpm');
  const heroSteps = document.getElementById('hero-steps');

  if (heroBpm) {
    setInterval(() => {
      const bpm = 70 + Math.floor(Math.random() * 6);
      heroBpm.textContent = bpm;
    }, 3200);
  }

  if (heroSteps) {
    let steps = 8240;
    setInterval(() => {
      steps += Math.floor(Math.random() * 8) + 1;
      heroSteps.textContent = steps.toLocaleString('pt-BR');
    }, 4500);
  }
}



/**
 * 1. Urgency Countdown Timer (e.g., 14:59 ticking down)
 */
function initCountdownTimer() {
  const countdownEl = document.getElementById('promo-countdown-time');
  if (!countdownEl) return;

  // Retrieve existing time from session or set 14 minutes 59 seconds
  let totalSeconds = parseInt(sessionStorage.getItem('apex_countdown_seconds'), 10);
  if (isNaN(totalSeconds) || totalSeconds <= 0) {
    totalSeconds = 14 * 60 + 59;
  }

  function updateDisplay() {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    countdownEl.textContent = `OFERTA ENCERRA EM ${formatted}`;
    sessionStorage.setItem('apex_countdown_seconds', totalSeconds.toString());
  }

  updateDisplay();

  const timerInterval = setInterval(() => {
    if (totalSeconds > 0) {
      totalSeconds -= 1;
      updateDisplay();
    } else {
      clearInterval(timerInterval);
      countdownEl.textContent = 'ÚLTIMAS UNIDADES NO LOTE';
    }
  }, 1000);
}

/**
 * 2. Strap / Finish Variant Selector
 */
function initVariantSelector() {
  const swatchButtons = document.querySelectorAll('.swatch-btn');
  const variantLabel = document.getElementById('selected-variant-name');
  const orderSummaryVariant = document.getElementById('order-summary-variant');

  if (!swatchButtons.length) return;

  swatchButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      swatchButtons.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const finishName = btn.getAttribute('data-variant') || 'Aço Milanês Preto';
      if (variantLabel) {
        variantLabel.textContent = finishName;
      }
      if (orderSummaryVariant) {
        orderSummaryVariant.textContent = `1x Smartwatch Apex (${finishName})`;
      }
    });
  });
}

/**
 * 3. Live ECG & BPM Telemetry Simulator
 */
function initTelemetrySimulator() {
  const bpmValueEl = document.getElementById('live-bpm-value');
  if (!bpmValueEl) return;

  // Realistically fluctuate BPM between 70 and 75
  setInterval(() => {
    const variation = Math.floor(Math.random() * 5) - 2; // -2 to +2
    const currentBpm = 72 + variation;
    bpmValueEl.childNodes[0].nodeValue = `${currentBpm} `;
  }, 3500);
}

/**
 * 4. FAQ Accordion (Single-open mode for pristine readability)
 */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        faqItems.forEach((other) => {
          if (other !== item && other.open) {
            other.removeAttribute('open');
          }
        });
      }
    });
  });
}

/**
 * 5. Checkout Confirmation Modal & Button Haptics
 */
function initCheckoutModal() {
  const buyButtons = [
    document.getElementById('hero-cta-btn'),
    document.getElementById('btn-buy-primary'),
    document.getElementById('sticky-buy-btn')
  ].filter(Boolean);

  const modalBackdrop = document.getElementById('checkout-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  if (!modalBackdrop) return;

  buyButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      // Micro-interaction bounce
      btn.style.transform = 'scale(0.96)';
      setTimeout(() => {
        btn.style.transform = '';
      }, 150);

      // Open tactile checkout modal
      modalBackdrop.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modalBackdrop.classList.remove('is-active');
    document.body.style.overflow = '';
  };

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  // ESC key listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('is-active')) {
      closeModal();
    }
  });
}
