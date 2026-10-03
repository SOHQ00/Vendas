/**
 * APEX CHRONO — INTERACTIVE QUIZ ENGINE
 * "Qual smartwatch Apex é ideal para você?"
 */

const QUIZ_STEPS = [
  {
    id: 'uso_principal',
    icon: '🎯',
    question: 'Qual é o seu principal uso para um smartwatch?',
    options: [
      { icon: '💼', label: 'Trabalho & Reuniões', sub: 'Chamadas, agenda e notificações', value: 'business' },
      { icon: '🏃', label: 'Esporte & Saúde', sub: 'Treinos, BPM, calorias', value: 'sport' },
      { icon: '✨', label: 'Estilo & Moda', sub: 'Elegância e personalização', value: 'style' },
      { icon: '🌟', label: 'Tudo acima!', sub: 'Quero o máximo de recursos', value: 'all' },
    ],
  },
  {
    id: 'atividade',
    icon: '⚡',
    question: 'Como você descreveria sua rotina diária?',
    options: [
      { icon: '🏙️', label: 'Executivo / Escritório', sub: 'Reuniões, apresentações, clientes', value: 'exec' },
      { icon: '🏋️', label: 'Atleta / Academia', sub: 'Treinos intensos e ao ar livre', value: 'athlete' },
      { icon: '🚶', label: 'Vida Equilibrada', sub: 'Mistura de trabalho e lazer', value: 'balanced' },
      { icon: '🎮', label: 'Tecnologia & Inovação', sub: 'Sempre conectado e antenado', value: 'techie' },
    ],
  },
  {
    id: 'pulseira',
    icon: '⌚',
    question: 'Qual tipo de visual você prefere?',
    options: [
      { icon: '⛓️', label: 'Metal Refinado', sub: 'Malha milanesa ou aço inox', value: 'metal' },
      { icon: '🖤', label: 'Esportivo & Leve', sub: 'Silicone resistente ao suor', value: 'sport' },
      { icon: '🎨', label: 'Intercambiável', sub: 'Troco conforme o momento', value: 'swap' },
    ],
  },
  {
    id: 'prioridade',
    icon: '🔋',
    question: 'O que é mais importante para você?',
    options: [
      { icon: '📞', label: 'Fazer Chamadas', sub: 'Bluetooth 5.3 nítido no pulso', value: 'calls' },
      { icon: '❤️', label: 'Monitorar Saúde', sub: 'Cardíaco, sono, pressão', value: 'health' },
      { icon: '🔔', label: 'Notificações', sub: 'WhatsApp, Instagram, SMS', value: 'notify' },
      { icon: '⏳', label: 'Bateria Longa', sub: 'Dias sem recarregar', value: 'battery' },
    ],
  },
];

const QUIZ_RESULTS = {
  // For each result profile, define features and message
  executive: {
    emoji: '🏆',
    title: 'Apex Chrono Edição Executiva',
    subtitle: 'Perfeito para você! A malha milanesa de aço inox com chamadas Bluetooth 5.3 nítidas vai transformar sua produtividade. Você foi feito para o Apex Chrono.',
    features: ['Aço Milanês', 'Chamadas BT 5.3', 'Notificações VIP', 'Mostradores Premium'],
  },
  athlete: {
    emoji: '🏅',
    title: 'Apex Chrono Sport Edition',
    subtitle: 'Seu parceiro de treino! Monitor cardíaco contínuo, contador de passos e bateria de 7 dias para você nunca perder um treino sem dados.',
    features: ['BPM 24/7', 'GPS Integrado', 'Resistente à Água', 'Pulseira Sport'],
  },
  lifestyle: {
    emoji: '✨',
    title: 'Apex Chrono Lifestyle',
    subtitle: 'Estilo e tecnologia em um único relógio! +500 mostradores, notificações de todos os apps e design refinado para qualquer ocasião.',
    features: ['+500 Watch Faces', 'Todos os Apps', 'Design Premium', 'Bateria 7 dias'],
  },
  default: {
    emoji: '⚡',
    title: 'Apex Chrono Premium',
    subtitle: 'Você precisa do melhor! O Apex Chrono entrega tudo: chamadas, saúde, estilo e conexão total. Um relógio que se adapta a cada momento da sua vida.',
    features: ['Tudo Incluso', 'Aço + Silicone', 'Bluetooth 5.3', 'Bio-Sensores'],
  },
};

function scoreToProfile(answers) {
  const counts = { business: 0, sport: 0, style: 0 };
  for (const a of answers) {
    if (['business', 'exec', 'calls', 'metal'].includes(a)) counts.business++;
    if (['sport', 'athlete', 'health', 'battery'].includes(a)) counts.sport++;
    if (['style', 'balanced', 'techie', 'swap', 'notify', 'all'].includes(a)) counts.style++;
  }
  const max = Math.max(counts.business, counts.sport, counts.style);
  if (max === counts.business) return 'executive';
  if (max === counts.sport)    return 'athlete';
  if (max === counts.style)    return 'lifestyle';
  return 'default';
}

export function initQuiz() {
  const quizSteps   = document.getElementById('quiz-steps');
  const quizResult  = document.getElementById('quiz-result');
  const progressFill = document.getElementById('quiz-progress-fill');
  const stepLabel   = document.getElementById('quiz-step-label');
  const questionText = document.getElementById('quiz-question-text');
  const optionsGrid = document.getElementById('quiz-options-grid');
  const quizIcon    = document.getElementById('quiz-icon-badge');
  const btnBack     = document.getElementById('quiz-btn-back');
  const btnNext     = document.getElementById('quiz-btn-next');
  const btnRestart  = document.getElementById('quiz-restart-btn');

  if (!quizSteps) return;

  let currentStep = 0;
  let selectedAnswers = [];
  let currentSelection = null;

  function renderStep(stepIndex) {
    const step = QUIZ_STEPS[stepIndex];
    currentSelection = selectedAnswers[stepIndex] ?? null;

    // Progress
    const pct = ((stepIndex) / QUIZ_STEPS.length) * 100;
    progressFill.style.width = `${pct}%`;
    stepLabel.textContent = `${stepIndex + 1} / ${QUIZ_STEPS.length}`;

    // Icon & question with fade
    quizIcon.textContent = step.icon;
    questionText.style.opacity = 0;
    setTimeout(() => {
      questionText.textContent = step.question;
      questionText.style.opacity = 1;
      questionText.style.transition = 'opacity 0.3s';
    }, 80);

    // Options
    optionsGrid.innerHTML = '';
    for (const opt of step.options) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'quiz-option-btn' + (currentSelection === opt.value ? ' is-selected' : '');
      btn.innerHTML = `
        <div class="quiz-option-icon">${opt.icon}</div>
        <div class="quiz-option-text">
          <span class="quiz-option-label">${opt.label}</span>
          <span class="quiz-option-sub">${opt.sub}</span>
        </div>
      `;
      btn.addEventListener('click', () => {
        optionsGrid.querySelectorAll('.quiz-option-btn').forEach(b => b.classList.remove('is-selected'));
        btn.classList.add('is-selected');
        currentSelection = opt.value;
        btnNext.disabled = false;
      });
      optionsGrid.appendChild(btn);
    }

    // Nav buttons
    btnBack.disabled = stepIndex === 0;
    btnNext.disabled = currentSelection === null;
    btnNext.innerHTML = stepIndex === QUIZ_STEPS.length - 1
      ? 'Ver meu resultado <span class="material-symbols-outlined" style="font-size:18px">auto_awesome</span>'
      : 'Próximo <span class="material-symbols-outlined" style="font-size:18px">arrow_forward</span>';
  }

  function showResult() {
    const profile = scoreToProfile(selectedAnswers);
    const res = QUIZ_RESULTS[profile];

    progressFill.style.width = '100%';
    quizSteps.style.display = 'none';
    quizResult.classList.add('is-visible');

    document.getElementById('quiz-result-emoji').textContent = res.emoji;
    document.getElementById('quiz-result-title').textContent = res.title;
    document.getElementById('quiz-result-subtitle').textContent = res.subtitle;

    const tagsContainer = document.getElementById('quiz-result-features');
    tagsContainer.innerHTML = res.features
      .map(f => `<span class="result-feature-tag">${f}</span>`)
      .join('');
  }

  btnNext.addEventListener('click', () => {
    if (currentSelection === null) return;
    selectedAnswers[currentStep] = currentSelection;
    currentStep++;
    if (currentStep >= QUIZ_STEPS.length) {
      showResult();
    } else {
      currentSelection = null;
      renderStep(currentStep);
    }
  });

  btnBack.addEventListener('click', () => {
    if (currentStep === 0) return;
    currentStep--;
    currentSelection = selectedAnswers[currentStep] ?? null;
    renderStep(currentStep);
  });

  btnRestart?.addEventListener('click', () => {
    currentStep = 0;
    selectedAnswers = [];
    currentSelection = null;
    quizResult.classList.remove('is-visible');
    quizSteps.style.display = '';
    progressFill.style.width = '0%';
    renderStep(0);
  });

  // Initial render
  renderStep(0);
}
