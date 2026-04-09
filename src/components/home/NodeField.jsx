import { useEffect, useRef } from 'react';

// Three depth layers — background nodes are smaller, dimmer, slower
const LAYERS = [
  { count: 37, minR: 1.0, maxR: 2.2, speed: 0.14, opacity: 0.22, range: 200, lineAlpha: 0.14,  cyanChance: 0.12 },
  { count: 22, minR: 1.8, maxR: 3.2, speed: 0.24, opacity: 0.38, range: 240, lineAlpha: 0.20,  cyanChance: 0.25 },
  { count: 12, minR: 2.8, maxR: 5.0, speed: 0.36, opacity: 0.60, range: 280, lineAlpha: 0.26,  cyanChance: 0.40 },
];

export default function NodeField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let nodes = [];
    let W = 0, H = 0;

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }

    function initNodes() {
      nodes = [];
      LAYERS.forEach((layer, li) => {
        for (let i = 0; i < layer.count; i++) {
          const cyan = Math.random() < layer.cyanChance;
          nodes.push({
            li,
            x:  Math.random() * W,
            y:  Math.random() * H,
            r:  layer.minR + Math.random() * (layer.maxR - layer.minR),
            vx: (Math.random() - 0.5) * layer.speed * 2,
            vy: (Math.random() - 0.5) * layer.speed * 2,
            baseOpacity: layer.opacity * (0.65 + Math.random() * 0.35),
            range:       layer.range,
            lineAlpha:   layer.lineAlpha,
            cyan,
            phase: Math.random() * Math.PI * 2,
          });
        }
      });
    }

    function draw(ts) {
      ctx.clearRect(0, 0, W, H);
      const t = ts * 0.001;

      // ── Connections ────────────────────────────────────────────────
      for (let a = 0; a < nodes.length - 1; a++) {
        const na = nodes[a];
        for (let b = a + 1; b < nodes.length; b++) {
          const nb = nodes[b];
          if (Math.abs(na.li - nb.li) > 1) continue;       // adjacent layers only
          const dx = na.x - nb.x, dy = na.y - nb.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const range = Math.min(na.range, nb.range);
          if (dist >= range) continue;

          const fade  = 1 - dist / range;
          const alpha = fade * Math.min(na.lineAlpha, nb.lineAlpha);
          const isCyan = na.cyan || nb.cyan;
          ctx.beginPath();
          ctx.moveTo(na.x, na.y);
          ctx.lineTo(nb.x, nb.y);
          ctx.strokeStyle = isCyan
            ? `rgba(30,196,247,${alpha})`
            : `rgba(200,220,255,${alpha})`;
          ctx.lineWidth = 0.55 + (na.li + nb.li) * 0.1;
          ctx.stroke();
        }
      }

      // ── Nodes ──────────────────────────────────────────────────────
      nodes.forEach(n => {
        const pulse  = 0.82 + 0.18 * Math.sin(t * 0.9 + n.phase);
        const opacity = n.baseOpacity * pulse;

        // Soft glow for larger cyan foreground nodes
        if (n.cyan && n.li >= 1) {
          const glowR = n.r * 6;
          const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR);
          grd.addColorStop(0, `rgba(30,196,247,${opacity * 0.45})`);
          grd.addColorStop(1, 'rgba(30,196,247,0)');
          ctx.beginPath();
          ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.cyan
          ? `rgba(30,196,247,${opacity})`
          : `rgba(210,228,255,${opacity})`;
        ctx.fill();

        // Advance position — wrap edges so nodes flow continuously
        n.x += n.vx;
        n.y += n.vy;
        const pad = 24;
        if (n.x < -pad) n.x = W + pad;
        if (n.x > W + pad) n.x = -pad;
        if (n.y < -pad) n.y = H + pad;
        if (n.y > H + pad) n.y = -pad;
      });

      raf = requestAnimationFrame(draw);
    }

    resize();
    initNodes();
    raf = requestAnimationFrame(draw);

    const onResize = () => { resize(); initNodes(); };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1, opacity: 0.9 }}
    />
  );
}
