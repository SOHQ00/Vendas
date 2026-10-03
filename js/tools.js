/**
 * APEX CHRONO — WHATSAPP WIDGET + SOCIAL PROOF TOASTS
 */

// ─────────────────────────────────────────────────
// WhatsApp Floating Widget
// ─────────────────────────────────────────────────
const WA_NUMBER  = '5511999999999'; // coloque aqui o número do WhatsApp com DDI
const WA_MESSAGE = encodeURIComponent(
  'Olá! Vim pelo site e tenho interesse no *Smartwatch Apex Chrono*. Poderia me ajudar? 😊'
);
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

export function initWhatsApp() {
  const fab        = document.getElementById('wa-fab');
  const bubble     = document.getElementById('wa-bubble');
  const bubbleClose = document.getElementById('wa-bubble-close');

  if (!fab) return;

  let bubbleOpen = false;
  let autoShown  = false;

  function openBubble() {
    bubble.classList.add('is-open');
    bubbleOpen = true;
    // Remove unread badge once seen
    const badge = document.getElementById('wa-badge');
    if (badge) badge.style.animation = 'none', setTimeout(() => badge.remove(), 300);
  }

  function closeBubble() {
    bubble.classList.remove('is-open');
    bubbleOpen = false;
  }

  // Auto-open bubble after 8 seconds on first visit
  const hasSeenBubble = sessionStorage.getItem('apex_wa_bubble_seen');
  if (!hasSeenBubble) {
    setTimeout(() => {
      openBubble();
      autoShown = true;
      sessionStorage.setItem('apex_wa_bubble_seen', '1');
    }, 8000);
  }

  // Auto-close after 12s if auto-opened
  setInterval(() => {
    if (autoShown && bubbleOpen) closeBubble();
  }, 20000);

  fab.addEventListener('click', () => {
    if (!bubbleOpen) {
      openBubble();
    } else {
      window.open(WA_LINK, '_blank');
    }
  });

  // Clicking the bubble text opens WhatsApp
  bubble.addEventListener('click', (e) => {
    if (e.target !== bubbleClose && !bubbleClose?.contains(e.target)) {
      window.open(WA_LINK, '_blank');
    }
  });

  bubbleClose?.addEventListener('click', (e) => {
    e.stopPropagation();
    closeBubble();
  });
}

// ─────────────────────────────────────────────────
// Social Proof Toast Queue (live buyer notifications)
// ─────────────────────────────────────────────────
const BUYERS = [
  { initials: 'RC', color: '#00f0ff', name: 'Rodrigo C.',   city: 'São Paulo',      action: 'acabou de comprar o Apex Chrono!', time: 'agora mesmo' },
  { initials: 'ML', color: '#ff5e00', name: 'Mariana L.',   city: 'Curitiba',       action: 'garantiu com frete grátis!',       time: '2 min atrás' },
  { initials: 'JP', color: '#10b981', name: 'João Pedro',   city: 'Belo Horizonte', action: 'escolheu o modelo Milanês Preto!', time: '4 min atrás' },
  { initials: 'AF', color: '#eab308', name: 'Ana Figueiredo',city: 'Recife',        action: 'comprou junto com pulseira grátis!', time: '6 min atrás' },
  { initials: 'LM', color: '#00f0ff', name: 'Lucas M.',     city: 'Porto Alegre',  action: 'avaliou com 5 estrelas!',           time: '8 min atrás' },
  { initials: 'TS', color: '#ff5e00', name: 'Thais S.',     city: 'Fortaleza',     action: 'acabou de comprar o Apex Chrono!', time: 'agora mesmo' },
  { initials: 'GN', color: '#10b981', name: 'Gabriel N.',   city: 'Brasília',      action: 'garantiu o último do lote!',       time: '3 min atrás' },
];

export function initSocialToasts() {
  const container = document.getElementById('social-toast-container');
  if (!container) return;

  // Don't show toasts immediately — stagger from 5s, every 12s
  let index = 0;

  function showToast() {
    const buyer = BUYERS[index % BUYERS.length];
    index++;

    const toast = document.createElement('div');
    toast.className = 'social-toast';
    toast.innerHTML = `
      <div class="toast-avatar" style="color:${buyer.color};border-color:${buyer.color}40">
        ${buyer.initials}
      </div>
      <div class="toast-content">
        <div class="toast-buyer-name">${buyer.name} · ${buyer.city}</div>
        <div class="toast-action">${buyer.action}</div>
        <div class="toast-time">⏱ ${buyer.time}</div>
      </div>
      <span class="material-symbols-outlined toast-icon-live icon-filled">verified</span>
    `;

    container.appendChild(toast);

    // Slide in
    requestAnimationFrame(() => {
      requestAnimationFrame(() => toast.classList.add('is-visible'));
    });

    // Slide out after 5s
    setTimeout(() => {
      toast.classList.remove('is-visible');
      setTimeout(() => toast.remove(), 500);
    }, 5000);
  }

  setTimeout(() => {
    showToast();
    setInterval(showToast, 12000);
  }, 5000);
}
