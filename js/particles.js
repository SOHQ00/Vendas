/**
 * APEX CHRONO — PARTICLES ENGINE
 * Floating luminous particles behind the hero watch
 */
export function initParticles(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W = (canvas.width  = canvas.offsetWidth);
  let H = (canvas.height = canvas.offsetHeight);
  let animId;

  const PARTICLE_COUNT = 55;
  const particles = Array.from({ length: PARTICLE_COUNT }, createParticle);

  function createParticle() {
    const isCyan  = Math.random() > 0.55;
    const isAmber = !isCyan && Math.random() > 0.6;
    return {
      x    : Math.random() * W,
      y    : Math.random() * H,
      r    : Math.random() * 1.8 + 0.4,
      vx   : (Math.random() - 0.5) * 0.35,
      vy   : (Math.random() - 0.5) * 0.35 - 0.15,
      alpha: Math.random() * 0.55 + 0.15,
      color: isCyan  ? '0,240,255'
           : isAmber ? '234,179,8'
           : '255,94,0',
      pulse: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.03 + 0.01,
    };
  }

  function tick() {
    ctx.clearRect(0, 0, W, H);

    for (const p of particles) {
      p.pulse += p.speed;
      const a = p.alpha * (0.65 + 0.35 * Math.sin(p.pulse));

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${a.toFixed(3)})`;
      ctx.fill();

      // soft glow
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
      grad.addColorStop(0, `rgba(${p.color},${(a * 0.4).toFixed(3)})`);
      grad.addColorStop(1, `rgba(${p.color},0)`);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -10)  p.x = W + 10;
      if (p.x > W+10) p.x = -10;
      if (p.y < -10)  p.y = H + 10;
      if (p.y > H+10) p.y = -10;
    }

    animId = requestAnimationFrame(tick);
  }

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  const ro = new ResizeObserver(resize);
  ro.observe(canvas.parentElement);

  tick();
  return () => { cancelAnimationFrame(animId); ro.disconnect(); };
}
