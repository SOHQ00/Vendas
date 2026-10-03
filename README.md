# ⌚ Apex Chrono — Landing Page de Alta Conversão

Landing page institucional e de vendas de alta performance e conversão desenvolvida para o **Smartwatch Apex Chrono** (Edição Aço Inoxidável Milanês). O projeto conta com arquitetura modular, estética cibernética em Dark Mode / Glassmorphism, animações baseadas em física e uma suíte completa de ferramentas interativas de suporte à decisão de compra.

---

## 🚀 Principais Funcionalidades

### 1. 📦 Calculadora de Frete em Tempo Real (ViaCEP)
- Integração dinâmica com a API oficial do **ViaCEP** diretamente no fluxo de checkout.
- Formatação automática de máscara de CEP (`00000-000`).
- Estimativa regionalizada de dias úteis (Sedex/Correios) com datas previstas calculadas automaticamente.
- Selo de **"Frete Grátis Aplicado"** e garantia com seguro oficial.

### 2. ⚖️ Comparador de Mercado & Calculadora de Economia
- Tabela interativa comparativa: **Apex Chrono** vs. **Apple Watch Series 9** vs. **Galaxy Watch 6**.
- Alternância rápida por abas interativas.
- Destaque para bateria (7 dias vs. 18 horas), acabamento em malha milanesa magnética e compatibilidade dupla (Android e iOS).
- Indicador visual dinâmico de economia gerada de **mais de R$ 3.700,00**.

### 3. 🔋 Simulador Inteligente de Autonomia de Bateria
- Simulador interativo baseado no perfil de uso do cliente:
  - Tempo diário de exercícios físicos (0 a 120 minutos/dia).
  - Frequência de leitura cardíaca (Modo Inteligente vs. Contínuo 24/7).
  - Notificações de mensagens e brilho da tela.
- Display HUD com velocímetro de bateria e cálculo da projeção em dias de autonomia em tempo real.

### 4. 🎨 Provador Virtual de Mostradores (Watch Face Tester)
- Seletor de estilos ao vivo com 4 temas personalizáveis: *Cronógrafo Prestige*, *Cyberpunk Neon*, *BioMatrix 360* e *Titanium Minimal*.
- Transições dinâmicas de visualização sobre o display do smartwatch.

### 5. 🎯 Quiz Interativo de Recomendação de Estilo
- Questionário de 4 etapas que analisa o estilo de vida do usuário (Executivo, Fitness, Tecnológico ou Casual).
- Apresenta o modelo ideal com direcionamento imediato para a oferta com brinde exclusivo.

### 6. 💬 Widget de Atendimento WhatsApp & Notificações de Prova Social
- Botão flutuante de atendimento direto via WhatsApp com balão de boas-vindas programado.
- Toasts automáticos de prova social exibindo compras recentes em cidades brasileiras.

### 7. ❤️ Telemetria Cardíaca ao Vivo & Efeito 3D Hero
- Visualizador com ECG dinâmico em SVG e variação biométrica simulada.
- Efeito Parallax/3D Tilt com sensor giroscópico para dispositivos móveis e rastreamento de cursor em desktops.
- Canvas com renderização de partículas cibernéticas em segundo plano.

---

## 🛠️ Stack e Tecnologias

- **Estrutura & Semântica:** HTML5 Semântico (`<header>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`)
- **Estilos & Design:** CSS3 Moderno, Variáveis CSS (Custom Properties), Flexbox, CSS Grid, Glassmorphism, Backdrop Filters
- **Lógica & Interatividade:** JavaScript Nativo (ES6+ Modules), sem dependências pesadas
- **Tipografia & Ícones:** Google Fonts (Outfit, Inter, JetBrains Mono) & Google Material Symbols
- **Integrações Externas:** API Pública ViaCEP (`https://viacep.com.br/`)

---

## 📋 Pré-requisitos

Por se tratar de uma aplicação front-end baseada em módulos nativos do JavaScript (ES Modules), é necessário apenas um navegador moderno e um servidor HTTP estático local (para evitar bloqueios de CORS por protocolo `file://`).

- **Navegador:** Chrome, Edge, Firefox, Safari ou compatível.
- **Servidor local (qualquer um dos abaixo):**
  - Python 3 (`python -m http.server`)
  - Node.js (`npx serve` ou Live Server do VS Code)
  - PHP (`php -S localhost:8080`)

---

## 💻 Instalação e Execução

### 1. Clonar o repositório
```bash
git clone https://github.com/SOHQ00/Vendas.git
cd Vendas
```

### 2. Executar localmente

#### Opção A: Usando Python
```bash
python -m http.server 8080
```

#### Opção B: Usando Node.js / npx
```bash
npx serve -l 8080
```

#### Opção C: Usando a extensão Live Server no VS Code
Abra a pasta do projeto no VS Code, clique com o botão direito em `index.html` e selecione **"Open with Live Server"**.

Acesse no navegador:
```
http://localhost:8080/
```

---

## ⚙️ Variáveis de Ambiente

O projeto é 100% estático e funciona imediatamente sem necessidade de build. Caso deseje personalizar o número do WhatsApp de atendimento oficial, consulte o arquivo [.env.example](.env.example) e edite a constante `WA_NUMBER` no arquivo [js/tools.js](js/tools.js):

```javascript
// js/tools.js
const WA_NUMBER = '5511999999999'; // Seu número com DDI + DDD
```

---

## 🧪 Validação Técnica

Para verificar a sintaxe e a integridade de todos os scripts JavaScript:
```bash
node -c js/main.js js/calculator.js js/quiz.js js/tools.js js/animations.js js/particles.js
```

---

## 📁 Estrutura do Projeto

```
07 Vendas/
├── assets/                  # Imagens de alta resolução e favicons
│   └── images/
├── css/                     # Folhas de estilo modulares
│   ├── style.css            # Design System, reset, tipografia e layout principal
│   └── tools.css            # Estilos dedicados das ferramentas interativas e widgets
├── js/                      # Módulos JavaScript (ES6)
│   ├── main.js              # Ponto de entrada e inicialização dos componentes
│   ├── calculator.js        # Motores: ViaCEP, Comparador, Bateria e Mostradores
│   ├── quiz.js              # Lógica e renderização do Quiz de recomendação
│   ├── tools.js             # Widget do WhatsApp e Notificações de Prova Social
│   ├── animations.js        # Animações de scroll estilo Framer Motion
│   └── particles.js         # Canvas de partículas do Hero
├── old/                     # Arquivos legados de referência histórica
├── .docs/                   # Documentações e especificações internas
├── .env.example             # Documentação de variáveis de configuração
├── .gitignore               # Regras de exclusão do Git
├── index.html               # Documento principal da aplicação
└── README.md                # Documentação técnica do projeto
```

---

## 📄 Licença

Este projeto foi desenvolvido para fins demonstrativos e comerciais sob boas práticas de engenharia de software e padrões modernos da web.
