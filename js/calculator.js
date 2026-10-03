/**
 * APEX CHRONO — INTERACTIVE TOOLS ENGINE
 * 1. Cep Shipping Calculator (ViaCEP API + dynamic delivery estimation)
 * 2. Interactive Competitor Comparison & Savings Calculator
 * 3. Smart Battery Life Estimator
 * 4. Interactive Watch Face Virtual Previewer
 */

// ─────────────────────────────────────────────────────────────
// 1. CALCULADORA DE FRETE POR CEP (ViaCEP + Estimador)
// ─────────────────────────────────────────────────────────────
export function initShippingCalculator() {
  const cepInput = document.getElementById('shipping-cep-input');
  const calcBtn = document.getElementById('shipping-calc-btn');
  const resultBox = document.getElementById('shipping-result-box');

  if (!cepInput || !calcBtn || !resultBox) return;

  // Mask CEP as 00000-000
  cepInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 8) value = value.slice(0, 8);
    if (value.length > 5) {
      value = value.replace(/^(\d{5})(\d)/, '$1-$2');
    }
    e.target.value = value;
  });

  cepInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      calculateShipping();
    }
  });

  calcBtn.addEventListener('click', calculateShipping);

  async function calculateShipping() {
    const rawCep = cepInput.value.replace(/\D/g, '');

    if (rawCep.length !== 8) {
      showError('Por favor, informe um CEP válido com 8 dígitos.');
      return;
    }

    // UI Loading state
    calcBtn.disabled = true;
    calcBtn.innerHTML = '<span class="spinner-inline"></span> Calculando...';
    resultBox.classList.remove('is-active', 'is-error');
    resultBox.innerHTML = '';

    try {
      // Fetch ViaCEP
      const res = await fetch(`https://viacep.com.br/ws/${rawCep}/json/`, {
        headers: { 'Accept': 'application/json' },
        cache: 'no-cache'
      });

      if (!res.ok) throw new Error('Falha ao conectar no serviço de CEP.');

      const data = await res.json();

      if (data.erro) {
        showError('CEP não encontrado. Verifique os números digitados.');
        return;
      }

      // Calculate delivery days based on State region
      const uf = (data.uf || '').toUpperCase();
      let minDays = 3;
      let maxDays = 5;

      // Regional adjustment simulation
      if (['SP', 'RJ', 'MG', 'PR', 'SC'].includes(uf)) {
        minDays = 2;
        maxDays = 4;
      } else if (['RS', 'ES', 'GO', 'DF', 'MS', 'BA'].includes(uf)) {
        minDays = 3;
        maxDays = 6;
      } else {
        minDays = 5;
        maxDays = 8;
      }

      // Calculate projected date
      const today = new Date();
      const arrivalDateMin = new Date(today);
      arrivalDateMin.setDate(today.getDate() + minDays + (today.getDay() >= 4 ? 2 : 0));
      const arrivalDateMax = new Date(today);
      arrivalDateMax.setDate(today.getDate() + maxDays + (today.getDay() >= 3 ? 2 : 0));

      const dateFormatter = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short' });
      const rangeText = `${dateFormatter.format(arrivalDateMin)} a ${dateFormatter.format(arrivalDateMax)}`;

      const locationStr = data.localidade && data.uf
        ? `${data.bairro ? data.bairro + ' • ' : ''}${data.localidade} - ${data.uf}`
        : 'Sua Região';

      resultBox.classList.add('is-active');
      resultBox.innerHTML = `
        <div class="shipping-success-card">
          <div class="shipping-badge-row">
            <span class="shipping-pill-free">
              <span class="material-symbols-outlined" style="font-size:16px;">verified</span>
              FRETE GRÁTIS APLICADO
            </span>
            <span class="shipping-price-tag">R$ 0,00</span>
          </div>
          <div class="shipping-dest-info">
            <span class="material-symbols-outlined shipping-pin-icon">location_on</span>
            <strong>${locationStr}</strong>
          </div>
          <div class="shipping-delivery-meta">
            <div class="shipping-eta-pill">
              <span class="material-symbols-outlined" style="font-size:18px;">local_shipping</span>
              <span>Previsão: <strong>${minDays} a ${maxDays} dias úteis</strong> (${rangeText})</span>
            </div>
            <p class="shipping-notes">
              Envio imediato com código de rastreamento oficial dos Correios e seguro total contra extravio ou avaria.
            </p>
          </div>
        </div>
      `;
    } catch (err) {
      // Offline fallback: if network blocked or offline, still provide friendly estimate
      resultBox.classList.add('is-active');
      resultBox.innerHTML = `
        <div class="shipping-success-card">
          <div class="shipping-badge-row">
            <span class="shipping-pill-free">
              <span class="material-symbols-outlined" style="font-size:16px;">verified</span>
              FRETE GRÁTIS APLICADO
            </span>
            <span class="shipping-price-tag">R$ 0,00</span>
          </div>
          <div class="shipping-dest-info">
            <span class="material-symbols-outlined shipping-pin-icon">location_on</span>
            <strong>Entrega garantida para CEP ${cepInput.value}</strong>
          </div>
          <div class="shipping-delivery-meta">
            <div class="shipping-eta-pill">
              <span class="material-symbols-outlined" style="font-size:18px;">local_shipping</span>
              <span>Previsão: <strong>3 a 5 dias úteis</strong> via Sedex Expresso</span>
            </div>
            <p class="shipping-notes">
              Rastreamento em tempo real direto no WhatsApp após a confirmação.
            </p>
          </div>
        </div>
      `;
    } finally {
      calcBtn.disabled = false;
      calcBtn.innerHTML = '<span>Calcular</span><span class="material-symbols-outlined" style="font-size:18px;">arrow_forward</span>';
    }
  }

  function showError(msg) {
    resultBox.classList.remove('is-active');
    resultBox.classList.add('is-error');
    resultBox.innerHTML = `
      <div class="shipping-error-msg">
        <span class="material-symbols-outlined" style="font-size:18px;">error</span>
        <span>${msg}</span>
      </div>
    `;
    calcBtn.disabled = false;
    calcBtn.innerHTML = '<span>Calcular</span><span class="material-symbols-outlined" style="font-size:18px;">arrow_forward</span>';
  }
}

// ─────────────────────────────────────────────────────────────
// 2. COMPARADOR DE CONCORRENTES & CALCULADORA DE ECONOMIA
// ─────────────────────────────────────────────────────────────
export function initComparisonTool() {
  const competitorTabs = document.querySelectorAll('.comp-tab-btn');
  const compCards = document.querySelectorAll('.comp-column-card');
  const savingsHighlight = document.getElementById('comp-savings-val');

  if (!competitorTabs.length) return;

  const SAVINGS_MAP = {
    'apple': { price: 3899, name: 'Apple Watch Series 9', savings: 'R$ 3.712,00' },
    'galaxy': { price: 1999, name: 'Galaxy Watch 6', savings: 'R$ 1.812,00' }
  };

  competitorTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      competitorTabs.forEach((t) => t.classList.remove('is-active'));
      tab.classList.add('is-active');

      const targetModel = tab.getAttribute('data-model');

      compCards.forEach((card) => {
        if (card.getAttribute('data-model') === targetModel || card.classList.contains('is-apex')) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });

      if (savingsHighlight && SAVINGS_MAP[targetModel]) {
        savingsHighlight.textContent = SAVINGS_MAP[targetModel].savings;
      }
    });
  });
}

// ─────────────────────────────────────────────────────────────
// 3. SIMULADOR INTELIGENTE DE AUTONOMIA DE BATERIA
// ─────────────────────────────────────────────────────────────
export function initBatterySimulator() {
  const workoutsRange = document.getElementById('battery-workout');
  const heartRateSelect = document.getElementById('battery-heart');
  const screenTimeSelect = document.getElementById('battery-screen');
  const daysOutput = document.getElementById('battery-days-result');
  const barFill = document.getElementById('battery-bar-fill');
  const tipOutput = document.getElementById('battery-tip');

  if (!workoutsRange || !heartRateSelect || !screenTimeSelect || !daysOutput) return;

  function updateBatteryEstimate() {
    const workoutMins = parseInt(workoutsRange.value, 10); // 0 to 120
    const heartMode = heartRateSelect.value; // 'smart' (normal) or 'continuous'
    const screenMode = screenTimeSelect.value; // 'medium', 'high'

    // Base battery: 7.5 days
    let days = 7.5;

    // Workout consumption: -0.015 days per min of GPS/sport
    days -= (workoutMins * 0.015);

    // Heart rate consumption
    if (heartMode === 'continuous') {
      days -= 1.0;
    }

    // Screen brightness & wake on wrist raise
    if (screenMode === 'high') {
      days -= 0.8;
    }

    // Clamp days between 4.0 and 8.0
    days = Math.max(4.0, Math.min(8.0, days));
    const formattedDays = days.toFixed(1);

    daysOutput.textContent = formattedDays;

    if (barFill) {
      const pct = Math.round((days / 8.0) * 100);
      barFill.style.width = `${pct}%`;
    }

    // Dynamic tip
    if (tipOutput) {
      if (days >= 6.5) {
        tipOutput.textContent = '⚡ Excelente! Com este padrão de uso, você só precisará carregar uma vez por semana.';
      } else if (days >= 5.0) {
        tipOutput.textContent = '⚡ Muito bom! Quase 6 dias contínuos monitorando sono, passos e chamadas sem preocupações.';
      } else {
        tipOutput.textContent = '⚡ Uso intenso para atletas! Mesmo em alta demanda, você tem mais de 4 dias inteiros de autonomia.';
      }
    }
  }

  workoutsRange.addEventListener('input', (e) => {
    const label = document.getElementById('workout-val-label');
    if (label) label.textContent = `${e.target.value} min/dia`;
    updateBatteryEstimate();
  });

  heartRateSelect.addEventListener('change', updateBatteryEstimate);
  screenTimeSelect.addEventListener('change', updateBatteryEstimate);

  // Initialize
  updateBatteryEstimate();
}

// ─────────────────────────────────────────────────────────────
// 4. SELETOR / TESTADOR INTERATIVO DE WATCH FACES
// ─────────────────────────────────────────────────────────────
export function initWatchFaceSwitcher() {
  const facePills = document.querySelectorAll('.face-select-pill');
  const facePreviewImg = document.getElementById('watch-face-preview-img');
  const faceNameLabel = document.getElementById('face-name-label');
  const faceTypeLabel = document.getElementById('face-type-label');

  if (!facePills.length || !facePreviewImg) return;

  const FACES_DATA = {
    'chrono': {
      name: 'Chronograph Prestige',
      type: 'Clássico Executivo • Marcadores Metálicos',
      filter: 'none'
    },
    'neon': {
      name: 'Cyberpunk Neon Pulse',
      type: 'Digital Esportivo • Alto Contraste Noturno',
      filter: 'hue-rotate(140deg) saturate(1.4)'
    },
    'fitness': {
      name: 'Active BioMatrix 360',
      type: 'Fitness Dinâmico • Passos, BPM e Metas',
      filter: 'hue-rotate(280deg) saturate(1.2)'
    },
    'minimal': {
      name: 'Titanium Pure Minimal',
      type: 'Elegância Minimalista • Economia Ultra',
      filter: 'grayscale(0.85) contrast(1.1)'
    }
  };

  facePills.forEach((pill) => {
    pill.addEventListener('click', () => {
      facePills.forEach((p) => p.classList.remove('is-active'));
      pill.classList.add('is-active');

      const faceKey = pill.getAttribute('data-face');
      const data = FACES_DATA[faceKey];
      if (!data) return;

      // Animate face transition
      facePreviewImg.style.opacity = '0.4';
      facePreviewImg.style.transform = 'scale(0.96)';

      setTimeout(() => {
        facePreviewImg.style.filter = data.filter;
        if (faceNameLabel) faceNameLabel.textContent = data.name;
        if (faceTypeLabel) faceTypeLabel.textContent = data.type;

        facePreviewImg.style.opacity = '1';
        facePreviewImg.style.transform = 'scale(1)';
      }, 180);
    });
  });
}
