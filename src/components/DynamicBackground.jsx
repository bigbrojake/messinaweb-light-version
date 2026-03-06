import { useEffect, useRef } from 'react';

// ── Composite Background ─────────────────────────────────────────────────────
//
// LAYER 1 — Color Field (Option 10)
//   Three large gradient pools drift very slowly across the canvas.
//   Gives the background color temperature — not flat black.
//   Non-reactive, trivially cheap.
//
// LAYER 2 — Morphing Star Topology (Option 8)
//   20 depth-layered nodes drift on their own velocities.
//   Edges drawn as quadratic bezier curves between nearby nodes.
//   Scroll drives a coherent parallax system: each node carries a depth value
//   that affects Y-shift speed, apparent size, and edge opacity simultaneously,
//   so the network feels like a 3D structure you move through as you scroll.
//
// ~30 draw calls per frame. Full clearRect. No trails.

// ── Palette ──────────────────────────────────────────────────────────────────
const ACCENT  = [30,  196, 247];
const PRIMARY = [10,   52, 138];
const WHITE   = [200, 225, 255];   // cool-white, slightly blue

// ── Layer 1: color field blobs ───────────────────────────────────────────────
// Very low opacity — they give the bg depth without competing with L2.
const BLOBS = [
  { bx: 0.14, by: 0.55, ax: 0.09, ay: 0.13, fx: 0.000078, fy: 0.000062,
    color: [8, 28, 76],   r: 0.72, alpha: 0.20, ph: 0.0 },
  { bx: 0.82, by: 0.36, ax: 0.07, ay: 0.10, fx: 0.000055, fy: 0.000090,
    color: [10, 44, 105], r: 0.60, alpha: 0.14, ph: 2.3 },
  { bx: 0.48, by: 0.20, ax: 0.05, ay: 0.06, fx: 0.000042, fy: 0.000068,
    color: [12, 72, 125], r: 0.30, alpha: 0.07, ph: 1.1 },
];

// ── Layer 2: node palette distribution ───────────────────────────────────────
// 3 white, 9 accent, 8 primary = 20 nodes
const NODE_PALETTE = [
  ...Array(3).fill(WHITE),
  ...Array(9).fill(ACCENT),
  ...Array(8).fill(PRIMARY),
];

// ── Helpers ──────────────────────────────────────────────────────────────────
function lerp(a, b, t) { return a + (b - a) * t; }
function rgba([r, g, b], a) { return `rgba(${r},${g},${b},${Math.min(1, a).toFixed(3)})`; }

function initNodes(w, h) {
  return NODE_PALETTE.map((color, i) => {
    const isWhite  = i < 3;
    const isAccent = i >= 3 && i < 12;
    return {
      x:      Math.random() * w,
      y:      Math.random() * h,
      vx:     (Math.random() - 0.5) * 0.28,
      vy:     (Math.random() - 0.5) * 0.22,
      depth:  0.1 + Math.random() * 0.9,       // 0.1 = far, 1.0 = close
      radius: isWhite ? 2.8 + Math.random() * 1.4
                      : isAccent ? 2.2 + Math.random() * 1.8
                                 : 1.6 + Math.random() * 1.6,
      color,
      isWhite,
    };
  });
}

const MAX_EDGE  = 230;   // px — max connection distance
const CURVATURE = 0.22;  // control point offset as fraction of edge length

export default function DynamicBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx   = canvas.getContext('2d');
    let animId;
    let w = 0, h = 0;
    let nodes = [];

    const resize = () => {
      w = canvas.width  = window.innerWidth;
      h = canvas.height = window.innerHeight;
      nodes = initNodes(w, h);
    };

    let smoothScroll = 0;

    const draw = (time) => {
      // Smooth scroll (polled in rAF — no listener jitter)
      const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
      smoothScroll    = lerp(smoothScroll, Math.min(1, window.scrollY / maxScroll), 0.04);

      ctx.clearRect(0, 0, w, h);
      const minDim = Math.min(w, h);

      // ────────────────────────────────────────────────────────────────────
      // LAYER 1 — Subtle color field
      // ────────────────────────────────────────────────────────────────────
      for (const blob of BLOBS) {
        const bx = blob.bx * w + Math.cos(time * blob.fx + blob.ph) * blob.ax * w;
        const by = blob.by * h + Math.sin(time * blob.fy + blob.ph) * blob.ay * h;
        const r  = blob.r * minDim;
        const [cr, cg, cb] = blob.color;

        const g = ctx.createRadialGradient(bx, by, 0, bx, by, r);
        g.addColorStop(0.0, `rgba(${cr},${cg},${cb},${blob.alpha.toFixed(3)})`);
        g.addColorStop(0.5, `rgba(${cr},${cg},${cb},${(blob.alpha * 0.3).toFixed(3)})`);
        g.addColorStop(1.0, `rgba(${cr},${cg},${cb},0)`);

        ctx.beginPath();
        ctx.arc(bx, by, r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }

      // ────────────────────────────────────────────────────────────────────
      // LAYER 2 — Star topology
      // ────────────────────────────────────────────────────────────────────

      // Advance node positions, bounce off edges
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        n.x = Math.max(0, Math.min(w, n.x));
        n.y = Math.max(0, Math.min(h, n.y));
      }

      // Compute display positions — scroll parallax
      // Each node's apparent Y shifts at a rate proportional to its depth.
      // Closer (depth→1) = shifts more = moves faster = appears nearer.
      // Depth also scales apparent size and base opacity for a coherent 3D read.
      const displayNodes = nodes.map(n => {
        const yShift      = smoothScroll * h * n.depth * 0.07;
        const scaleFactor = 0.65 + n.depth * 0.50;           // 0.65–1.15
        const alphaFactor = 0.55 + n.depth * 0.45;           // 0.55–1.00
        return {
          ...n,
          dx: n.x,
          dy: n.y - yShift,
          dr: n.radius * scaleFactor,
          alphaFactor,
        };
      });

      // ── Edges ─────────────────────────────────────────────────────────────
      ctx.lineCap = 'round';
      for (let i = 0; i < displayNodes.length; i++) {
        const a = displayNodes[i];
        for (let j = i + 1; j < displayNodes.length; j++) {
          const b = displayNodes[j];
          const ddx = b.dx - a.dx;
          const ddy = b.dy - a.dy;
          const dist = Math.sqrt(ddx * ddx + ddy * ddy);
          if (dist > MAX_EDGE) continue;

          // Quadratic falloff: edges are barely visible near threshold
          const t     = 1 - dist / MAX_EDGE;
          // Depth-aware: edges connecting nodes of very different depth are
          // slightly more transparent (they "recede" into the background)
          const dDiff = Math.abs(a.depth - b.depth);
          const alpha = t * t * 0.14 * (1 - dDiff * 0.45);

          // Bezier control point — perpendicular to edge midpoint
          const mx  = (a.dx + b.dx) * 0.5;
          const my  = (a.dy + b.dy) * 0.5;
          const len = dist;
          const cpOffset = len * CURVATURE;
          // Alternate curve direction per pair
          const sign = (i + j) % 2 === 0 ? 1 : -1;
          const cpx  = mx + (-ddy / len) * cpOffset * sign;
          const cpy  = my + ( ddx / len) * cpOffset * sign;

          // Edge color: interpolate between the two node colors
          const [r1, g1, b1] = a.color;
          const [r2, g2, b2] = b.color;
          const er = Math.round((r1 + r2) / 2);
          const eg = Math.round((g1 + g2) / 2);
          const eb = Math.round((b1 + b2) / 2);

          ctx.beginPath();
          ctx.moveTo(a.dx, a.dy);
          ctx.quadraticCurveTo(cpx, cpy, b.dx, b.dy);
          ctx.strokeStyle = `rgba(${er},${eg},${eb},${alpha.toFixed(3)})`;
          ctx.lineWidth   = 0.7 + t * 0.5;
          ctx.stroke();
        }
      }

      // ── Nodes ──────────────────────────────────────────────────────────────
      for (const n of displayNodes) {
        const { dx, dy, dr, color, isWhite, alphaFactor } = n;
        const [r, g, b] = color;
        const glowR = dr * (isWhite ? 7.5 : 5.5);

        // Soft glow halo
        const halo = ctx.createRadialGradient(dx, dy, 0, dx, dy, glowR);
        const peakA = (isWhite ? 0.18 : 0.14) * alphaFactor;
        halo.addColorStop(0.0, `rgba(${r},${g},${b},${peakA.toFixed(3)})`);
        halo.addColorStop(0.4, `rgba(${r},${g},${b},${(peakA * 0.35).toFixed(3)})`);
        halo.addColorStop(1.0, `rgba(${r},${g},${b},0)`);
        ctx.beginPath();
        ctx.arc(dx, dy, glowR, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();

        // Core dot
        const coreAlpha = (isWhite ? 0.85 : 0.70) * alphaFactor;
        ctx.beginPath();
        ctx.arc(dx, dy, dr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${coreAlpha.toFixed(3)})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    resize();
    animId = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      style={{ background: '#030a18' }}
    />
  );
}
