/**
 * APEX CHRONO - ANIMATIONS MODULE
 * Powered by Framer Motion / Motion.dev Web Engine
 */

import { animate, inView, stagger, scroll } from './vendor/motion.esm.js';

export function initAnimations() {
  // Check user preference for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    document.querySelectorAll('.motion-fade-up').forEach((el) => {
      el.classList.add('is-visible');
    });
    return;
  }

  try {
    setupHeroAnimations();
    setupScrollReveals();
    setupFeatureInteractions();
    setupStickyBarScrollTrigger();
  } catch (err) {
    console.warn('[Animations] Falling back to standard observer:', err);
    setupFallbackObserver();
  }
}

/**
 * 1. Hero Entrance & Subtle Ambient Floating
 */
function setupHeroAnimations() {
  // Staggered hero entrance
  animate(
    '.hero-section .motion-fade-up',
    { opacity: [0, 1], y: [30, 0] },
    { delay: stagger(0.12), duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  );

  // Gentle breathing float on hero smartwatch image
  const watchImg = document.querySelector('.hero-watch-img');
  if (watchImg) {
    animate(
      watchImg,
      { y: [-5, 5, -5], rotate: [-0.5, 0.5, -0.5] },
      { duration: 5, repeat: Infinity, ease: 'easeInOut' }
    );
  }

  // Ambient beacon pulse
  const beacon = document.querySelector('.status-beacon');
  if (beacon) {
    animate(
      beacon,
      { scale: [1, 1.25, 1], opacity: [0.8, 1, 0.8] },
      { duration: 2, repeat: Infinity, ease: 'easeInOut' }
    );
  }
}

/**
 * 2. Scroll-triggered entrance reveals with Framer Motion inView
 */
function setupScrollReveals() {
  // Section Headers
  inView('.section-header', (info) => {
    animate(
      info.target,
      { opacity: [0, 1], y: [20, 0] },
      { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    );
  });

  // Feature Showcase Cards
  inView('.feature-showcase-card', (info) => {
    animate(
      info.target,
      { opacity: [0, 1], y: [35, 0], scale: [0.97, 1] },
      { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
    );
  });

  // Health Matrix Grid (Staggered tiles)
  inView('.health-matrix-grid', (info) => {
    const tiles = info.target.querySelectorAll('.matrix-tile');
    animate(
      tiles,
      { opacity: [0, 1], y: [25, 0], scale: [0.96, 1] },
      { delay: stagger(0.08), duration: 0.55, ease: [0.16, 1, 0.3, 1] }
    );
  });

  // Tech Specs Rows (Staggered rows)
  inView('.specs-table-box', (info) => {
    const rows = info.target.querySelectorAll('.spec-row');
    animate(
      rows,
      { opacity: [0, 1], x: [-15, 0] },
      { delay: stagger(0.06), duration: 0.45, ease: [0.16, 1, 0.3, 1] }
    );
  });

  // Testimonials Cards
  inView('.testimonials-grid', (info) => {
    const cards = info.target.querySelectorAll('.testimonial-card');
    animate(
      cards,
      { opacity: [0, 1], y: [20, 0] },
      { delay: stagger(0.12), duration: 0.55, ease: [0.16, 1, 0.3, 1] }
    );
  });

  // FAQ Items
  inView('.faq-list', (info) => {
    const items = info.target.querySelectorAll('.faq-item');
    animate(
      items,
      { opacity: [0, 1], y: [15, 0] },
      { delay: stagger(0.07), duration: 0.45, ease: [0.16, 1, 0.3, 1] }
    );
  });

  // Checkout Box
  inView('.checkout-offer-card', (info) => {
    animate(
      info.target,
      { opacity: [0, 1], y: [30, 0], scale: [0.98, 1] },
      { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
    );
  });
}

/**
 * 3. Feature Card interactive hover & micro-interactions
 */
function setupFeatureInteractions() {
  const cards = document.querySelectorAll('.matrix-tile, .feature-showcase-card, .testimonial-card');
  cards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      animate(card, { y: -3 }, { duration: 0.2, ease: 'easeOut' });
    });
    card.addEventListener('mouseleave', () => {
      animate(card, { y: 0 }, { duration: 0.25, ease: 'easeOut' });
    });
  });
}

/**
 * 4. Sticky Buy Bar scroll trigger (appears when hero CTA passes)
 */
function setupStickyBarScrollTrigger() {
  const stickyBar = document.getElementById('sticky-cart-bar');
  const heroCTA = document.getElementById('hero-cta-btn');
  if (!stickyBar || !heroCTA) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
          // Hero CTA has scrolled above the viewport -> show sticky bar
          animate(stickyBar, { y: [50, 0], opacity: [0, 1] }, { duration: 0.35, ease: 'easeOut' });
          stickyBar.style.pointerEvents = 'auto';
        } else {
          // Hero CTA is still visible or user is at top
          animate(stickyBar, { y: [0, 50], opacity: [1, 0] }, { duration: 0.25, ease: 'easeIn' });
          stickyBar.style.pointerEvents = 'none';
        }
      });
    },
    { threshold: 0 }
  );

  observer.observe(heroCTA);
}

/**
 * Fallback observer if Framer Motion encounters an environment issue
 */
function setupFallbackObserver() {
  const elements = document.querySelectorAll('.motion-fade-up');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  elements.forEach((el) => observer.observe(el));
}
