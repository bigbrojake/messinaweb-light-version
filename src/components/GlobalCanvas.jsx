import { useEffect, useRef } from 'react';

const ACCENT  = [30, 196, 247];
const PRIMARY = [10,  52, 138];

const HUB_N   = 11;
const SAT_N   = 38;
const MICRO_N = 350;
const PKT_N   = 22;
const MAX_EDGE = 175;
const GRID_STEP = 54;
const CURV = 0.18;

const d2 = (a, b) => {
  const dx = b.x - a.x, dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
};

function initNet(w, h) {
  return Array.from({ length: HUB_N + SAT_N }, (_, i) => {
    const isHub = i < HUB_N;
    return {
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * (isHub ? 0.047 : 0.087),
      vy: (Math.random() - 0.5) * (isHub ? 0.040 : 0.067),
      radius: isHub ? 6.25 + Math.random() * 3.75 : 1.75 + Math.random() * 2.25,
      color: isHub ? ACCENT : PRIMARY,
      phase: Math.random() * Math.PI * 2,
      depth: 0.3 + Math.random() * 0.7,
      isHub,
    };
  });
}

function initMicro(w, h) {
  return Array.from({ length: MICRO_N }, (_, i) => {
    const bright = i % 4 === 0;
    return {
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.025, vy: (Math.random() - 0.5) * 0.020,
      radius: bright ? 1.875 + Math.random() * 1.375 : 0.6875 + Math.random() * 1.0625,
      alpha:  bright ? 0.16 + Math.random() * 0.12 : 0.05 + Math.random() * 0.09,
      color: Math.random() > 0.55 ? ACCENT : PRIMARY,
    };
  });
}

function buildEdges(nodes) {
  const e = [];
  for (let i = 0; i < nodes.length; i++)
    for (let j = i + 1; j < nodes.length; j++)
      if (d2(nodes[i], nodes[j]) < MAX_EDGE) e.push({ a: i, b: j });
  return e;
}

function initPkts(edges) {
  return Array.from({ length: PKT_N }, () => ({
    ei: Math.floor(Math.random() * Math.max(edges.length, 1)),
    t: Math.random(),
    speed: 0.00054 + Math.random() * 0.00067,
  }));
}

function cp(a, b, i, j) {
  const mx = (a.x + b.x) * 0.5, my = (a.y + b.y) * 0.5;
  const dx = b.x - a.x, dy = b.y - a.y;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const s = (i + j) % 2 === 0 ? 1 : -1;
  return { cpx: mx + (-dy / len) * len * CURV * s, cpy: my + (dx / len) * len * CURV * s };
}

function bpt(t, ax, ay, cpx, cpy, bx, by) {
  const u = 1 - t;
  return { x: u*u*ax + 2*u*t*cpx + t*t*bx, y: u*u*ay + 2*u*t*cpy + t*t*by };
}

export default function GlobalCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId, w = 0, h = 0, t0 = null;
    let net = [], micro = [], edges = [], pkts = [];

    const resize = () => {
      w = canvas.width  = window.innerWidth;
      h = canvas.height = window.innerHeight;
      net   = initNet(w, h);
      micro = initMicro(w, h);
      edges = buildEdges(net);
      pkts  = initPkts(edges);
    };

    const draw = (stamp) => {
      if (!t0) t0 = stamp;
      const ms = stamp - t0;
      ctx.clearRect(0, 0, w, h);

      // Dot grid
      ctx.fillStyle = 'rgba(10,52,138,0.040)';
      for (let gx = 0; gx < w; gx += GRID_STEP)
        for (let gy = 0; gy < h; gy += GRID_STEP) {
          ctx.beginPath(); ctx.arc(gx, gy, 0.9, 0, Math.PI * 2); ctx.fill();
        }

      // Micro nodes
      for (const m of micro) {
        m.x += m.vx; m.y += m.vy;
        if (m.x < 0 || m.x > w) m.vx *= -1;
        if (m.y < 0 || m.y > h) m.vy *= -1;
        m.x = Math.max(0, Math.min(w, m.x));
        m.y = Math.max(0, Math.min(h, m.y));
        const [r, g, b] = m.color;
        ctx.beginPath(); ctx.arc(m.x, m.y, m.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${m.alpha.toFixed(3)})`; ctx.fill();
      }

      // Move network
      for (const n of net) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        n.x = Math.max(0, Math.min(w, n.x));
        n.y = Math.max(0, Math.min(h, n.y));
      }

      // Edges
      ctx.lineCap = 'round';
      for (const { a: ai, b: bi } of edges) {
        const a = net[ai], b = net[bi];
        const dist = d2(a, b);
        if (dist > MAX_EDGE * 1.3) continue;
        const fade  = Math.max(0, 1 - dist / MAX_EDGE);
        const alpha = fade * fade * 0.10;
        const { cpx, cpy } = cp(a, b, ai, bi);
        const [r1,g1,b1] = a.color, [r2,g2,b2] = b.color;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.quadraticCurveTo(cpx, cpy, b.x, b.y);
        ctx.strokeStyle = `rgba(${Math.round((r1+r2)/2)},${Math.round((g1+g2)/2)},${Math.round((b1+b2)/2)},${alpha.toFixed(3)})`;
        ctx.lineWidth = 0.4 + fade * 0.55;
        ctx.stroke();
      }

      // Packets
      for (const pkt of pkts) {
        pkt.t += pkt.speed;
        if (pkt.t >= 1) { pkt.t = 0; pkt.ei = Math.floor(Math.random() * edges.length); }
        const edge = edges[pkt.ei];
        if (!edge) continue;
        const a = net[edge.a], b = net[edge.b];
        const { cpx, cpy } = cp(a, b, edge.a, edge.b);
        const { x, y } = bpt(pkt.t, a.x, a.y, cpx, cpy, b.x, b.y);
        const halo = ctx.createRadialGradient(x, y, 0, x, y, 8);
        halo.addColorStop(0, 'rgba(30,196,247,0.20)');
        halo.addColorStop(1, 'rgba(30,196,247,0)');
        ctx.beginPath(); ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fillStyle = halo; ctx.fill();
        ctx.beginPath(); ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(30,196,247,0.85)'; ctx.fill();
      }

      // Nodes
      for (let i = 0; i < net.length; i++) {
        const n = net[i];
        const [r, g, b] = n.color;
        const dr    = n.radius * (0.62 + n.depth * 0.38);
        const pulse = n.isHub ? 1 + 0.13 * Math.sin(ms * 0.001 + n.phase) : 1;
        if (n.isHub) {
          const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, dr * 8);
          glow.addColorStop(0,   `rgba(${r},${g},${b},0.10)`);
          glow.addColorStop(0.5, `rgba(${r},${g},${b},0.03)`);
          glow.addColorStop(1,   `rgba(${r},${g},${b},0)`);
          ctx.beginPath(); ctx.arc(n.x, n.y, dr * 8, 0, Math.PI * 2);
          ctx.fillStyle = glow; ctx.fill();
          ctx.beginPath(); ctx.arc(n.x, n.y, dr * 2.8 * pulse, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${r},${g},${b},0.13)`;
          ctx.lineWidth = 0.6; ctx.stroke();
        }
        ctx.beginPath(); ctx.arc(n.x, n.y, dr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${n.isHub ? 0.65 : 0.20})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    resize();
    animId = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1, opacity: 0.55 }}
    />
  );
}
