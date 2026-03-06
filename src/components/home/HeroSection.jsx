import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';

// ─── Palette ──────────────────────────────────────────────────────────────────
const ACCENT  = [30, 196, 247];
const PRIMARY = [10,  52, 138];

// ─── Config ───────────────────────────────────────────────────────────────────
const HUB_N     = 16;   // large cyan hubs — participate in edges + triangle fills
const SAT_N     = 80;   // navy satellites — participate in edges
const MICRO_N   = 500;  // decorative particles — NO edge checks, zero O(n²) cost
const PACKET_N  = 60;
const MAX_EDGE  = 148;
const TRI_DIST  = 225;  // max hub-hub distance to form triangle fill
const CURVATURE = 0.20;
const GRID_STEP = 36;

// ─── Helpers ──────────────────────────────────────────────────────────────────
const d2 = (a, b) => {
  const dx = b.x - a.x, dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
};

function initNetwork(w, h) {
  return Array.from({ length: HUB_N + SAT_N }, (_, i) => {
    const isHub = i < HUB_N;
    return {
      x:      Math.random() * w,
      y:      Math.random() * h,
      vx:     (Math.random() - 0.5) * (isHub ? 0.11 : 0.19),
      vy:     (Math.random() - 0.5) * (isHub ? 0.09 : 0.15),
      depth:  0.3 + Math.random() * 0.7,
      radius: isHub ? 6 + Math.random() * 4 : 1.8 + Math.random() * 2.2,
      color:  isHub ? ACCENT : PRIMARY,
      phase:  Math.random() * Math.PI * 2,
      isHub,
    };
  });
}

function initMicro(w, h) {
  return Array.from({ length: MICRO_N }, (_, i) => {
    // every 4th dot is a "bright" focal point — these bloom beautifully under blur
    const bright    = i % 4 === 0;
    const isAccent  = Math.random() > 0.52;
    return {
      x:      Math.random() * w,
      y:      Math.random() * h,
      vx:     (Math.random() - 0.5) * 0.062,
      vy:     (Math.random() - 0.5) * 0.048,
      radius: bright ? 2.2 + Math.random() * 1.8 : 0.8 + Math.random() * 1.2,
      alpha:  bright ? 0.32 + Math.random() * 0.22 : 0.10 + Math.random() * 0.16,
      color:  isAccent ? ACCENT : PRIMARY,
    };
  });
}

function buildEdges(nodes) {
  const edges = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (d2(nodes[i], nodes[j]) < MAX_EDGE) edges.push({ a: i, b: j });
    }
  }
  return edges;
}

function initPackets(edges) {
  return Array.from({ length: PACKET_N }, () => ({
    ei:    Math.floor(Math.random() * Math.max(edges.length, 1)),
    t:     Math.random(),
    speed: 0.0014 + Math.random() * 0.0016,
  }));
}

function cpOf(a, b, i, j) {
  const mx = (a.x + b.x) * 0.5, my = (a.y + b.y) * 0.5;
  const dx = b.x - a.x, dy = b.y - a.y;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const sgn = (i + j) % 2 === 0 ? 1 : -1;
  return { cpx: mx + (-dy / len) * len * CURVATURE * sgn,
           cpy: my + ( dx / len) * len * CURVATURE * sgn };
}

function bpt(t, ax, ay, cpx, cpy, bx, by) {
  const u = 1 - t;
  return { x: u*u*ax + 2*u*t*cpx + t*t*bx,
           y: u*u*ay + 2*u*t*cpy + t*t*by };
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function HeroSection() {
  const containerRef = useRef(null);
  const canvasRef    = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId, w = 0, h = 0, t0 = null;
    let network = [], micro = [], edges = [], packets = [];

    const resize = () => {
      w = canvas.width  = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
      network = initNetwork(w, h);
      micro   = initMicro(w, h);
      edges   = buildEdges(network);
      packets = initPackets(edges);
    };

    const draw = (stamp) => {
      if (!t0) t0 = stamp;
      const ms = stamp - t0;

      ctx.clearRect(0, 0, w, h);

      // ── Layer 1: dot grid ───────────────────────────────────────────────────
      ctx.fillStyle = 'rgba(10,52,138,0.062)';
      for (let gx = 0; gx < w; gx += GRID_STEP)
        for (let gy = 0; gy < h; gy += GRID_STEP) {
          ctx.beginPath(); ctx.arc(gx, gy, 1.1, 0, Math.PI * 2); ctx.fill();
        }

      // ── Layer 3: micro-nodes (200 cheap arc calls, no edge logic) ────────────
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

      // ── Layer 4: move network nodes ───────────────────────────────────────────
      for (const n of network) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        n.x = Math.max(0, Math.min(w, n.x));
        n.y = Math.max(0, Math.min(h, n.y));
      }

      // ── Layer 5: edges ────────────────────────────────────────────────────────
      ctx.lineCap = 'round';
      for (const { a: ai, b: bi } of edges) {
        const a = network[ai], b = network[bi];
        const dist = d2(a, b);
        if (dist > MAX_EDGE * 1.3) continue;
        const fade  = Math.max(0, 1 - dist / MAX_EDGE);
        const alpha = fade * fade * 0.20;
        const { cpx, cpy } = cpOf(a, b, ai, bi);
        const [r1,g1,b1] = a.color, [r2,g2,b2] = b.color;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.quadraticCurveTo(cpx, cpy, b.x, b.y);
        ctx.strokeStyle = `rgba(${Math.round((r1+r2)/2)},${Math.round((g1+g2)/2)},${Math.round((b1+b2)/2)},${alpha.toFixed(3)})`;
        ctx.lineWidth = 0.5 + fade;
        ctx.stroke();
      }

      // ── Layer 6: traveling packets ────────────────────────────────────────────
      for (const pkt of packets) {
        pkt.t += pkt.speed;
        if (pkt.t >= 1) { pkt.t = 0; pkt.ei = Math.floor(Math.random() * edges.length); }
        const edge = edges[pkt.ei];
        if (!edge) continue;
        const a = network[edge.a], b = network[edge.b];
        const { cpx, cpy } = cpOf(a, b, edge.a, edge.b);
        const { x, y } = bpt(pkt.t, a.x, a.y, cpx, cpy, b.x, b.y);
        const halo = ctx.createRadialGradient(x, y, 0, x, y, 14);
        halo.addColorStop(0, 'rgba(30,196,247,0.32)');
        halo.addColorStop(1, 'rgba(30,196,247,0)');
        ctx.beginPath(); ctx.arc(x, y, 14, 0, Math.PI * 2);
        ctx.fillStyle = halo; ctx.fill();
        ctx.beginPath(); ctx.arc(x, y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(30,196,247,0.96)'; ctx.fill();
      }

      // ── Layer 7: network node bodies ──────────────────────────────────────────
      for (let i = 0; i < network.length; i++) {
        const n = network[i];
        const [r, g, b] = n.color;
        const dr    = n.radius * (0.62 + n.depth * 0.38);
        const pulse = n.isHub ? 1 + 0.16 * Math.sin(ms * 0.0012 + n.phase) : 1;

        if (n.isHub) {
          // Wide soft glow
          const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, dr * 9);
          glow.addColorStop(0,   `rgba(${r},${g},${b},0.17)`);
          glow.addColorStop(0.5, `rgba(${r},${g},${b},0.07)`);
          glow.addColorStop(1,   `rgba(${r},${g},${b},0)`);
          ctx.beginPath(); ctx.arc(n.x, n.y, dr * 9, 0, Math.PI * 2);
          ctx.fillStyle = glow; ctx.fill();
          // Pulsing outer ring
          ctx.beginPath(); ctx.arc(n.x, n.y, dr * 3.0 * pulse, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${r},${g},${b},0.17)`;
          ctx.lineWidth = 0.9; ctx.stroke();
          // Inner ring
          ctx.beginPath(); ctx.arc(n.x, n.y, dr * 1.8, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${r},${g},${b},0.30)`;
          ctx.lineWidth = 0.7; ctx.stroke();
        }

        ctx.beginPath(); ctx.arc(n.x, n.y, dr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${n.isHub ? 0.82 : 0.30})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    resize();
    animId = requestAnimationFrame(draw);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.fromTo('.hero-label',
        { y: 30, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
        { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 0.8, ease: 'power3.out' }
      )
      .fromTo('.hero-title-1',
        { y: 60, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
        { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 1, ease: 'power3.out' }, '-=0.4'
      )
      .fromTo('.hero-title-2',
        { y: 60, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
        { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 1, ease: 'power3.out' }, '-=0.6'
      )
      .fromTo('.hero-body',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.5'
      )
      .fromTo('.hero-cta',
        { y: 30, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out' }, '-=0.4'
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-[100dvh] w-full flex items-end pb-24 lg:pb-32 px-6 overflow-hidden"
      style={{ background: 'radial-gradient(ellipse 85% 65% at 68% 28%, rgba(10,52,138,0.055) 0%, #fff 60%)' }}
    >
      {/* Canvas — blur applied here so text siblings stay razor sharp */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ filter: 'blur(1.5px)' }}
      />

      {/* Left readability wash */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-white/60 via-white/15 to-transparent pointer-events-none" />
      {/* Bottom bridge to white body */}
      <div className="absolute bottom-0 left-0 right-0 h-32 z-10 bg-gradient-to-t from-white via-white/55 to-transparent pointer-events-none" />

      {/* Content — z-30 keeps it fully above the blurred canvas */}
      <div className="relative z-30 w-full max-w-7xl mx-auto flex flex-col items-start gap-6">

        <span className="hero-label inline-block px-4 py-1.5 bg-accent/10 border border-accent/35 rounded-[2rem] text-accent text-xs font-mono uppercase tracking-widest">
          IT Consulting &middot; Staffing &middot; Delivery
        </span>

        <h1 className="flex flex-col gap-1">
          <span className="hero-title-1 text-3xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-primary">
            Empower your Enterprise
          </span>
          <span
            className="hero-title-2 text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-extrabold tracking-tight uppercase"
            style={{ WebkitTextStroke: '1.5px rgba(10,52,138,0.70)', color: 'transparent' }}
          >
            Solutions that Connect.
          </span>
        </h1>

        <p className="hero-body max-w-xl text-base md:text-lg text-gray-600 font-body leading-relaxed">
          Empowering organizations through innovative IT consulting, flexible resource staffing, and results-driven service delivery.
        </p>

        <Link
          to="/contact"
          className="hero-cta magnetic-btn relative px-8 py-4 text-base font-bold text-white bg-accent rounded-[2rem] shadow-lg shadow-accent/25 border border-accent/40 overflow-hidden"
        >
          <span className="relative z-10">Get in Touch</span>
          <span className="absolute inset-0 bg-primary rounded-[2rem] opacity-0 hover:opacity-100 transition-opacity duration-300 ease-out z-0" />
        </Link>
      </div>
    </section>
  );
}
