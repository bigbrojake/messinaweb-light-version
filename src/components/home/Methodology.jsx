import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const steps = [
  { num: '01', title: 'Understand Goals & Objectives', desc: 'Confirm scope and align with organizational vision.' },
  { num: '02', title: 'Understand Current State',      desc: 'Evaluate existing capabilities, challenges, and opportunities.' },
  { num: '03', title: 'Design Visions',                desc: 'Formulate interim and future state target architectures.' },
  { num: '04', title: 'Build Recommendations',         desc: 'Create roadmap timelines and a concrete Business Case/ROI.' },
  { num: '05', title: 'Execute the Roadmap',           desc: 'Deploy solutions, measure results continuously, and adapt.' },
  { num: '06', title: 'Governance & Improvement',      desc: 'Establish metrics and long-term continuous improvement protocols.' },
];

// Accent (#1EC4F7 = 30,196,247) → Primary (#0A348A = 10,52,138) as phases advance
function sc(i, n) {
  const t = i / (n - 1);
  const r = Math.round(30  + (10  - 30)  * t);
  const g = Math.round(196 + (52  - 196) * t);
  const b = Math.round(247 + (138 - 247) * t);
  return `rgb(${r},${g},${b})`;
}
function sca(i, n, a) {
  const t = i / (n - 1);
  const r = Math.round(30  + (10  - 30)  * t);
  const g = Math.round(196 + (52  - 196) * t);
  const b = Math.round(247 + (138 - 247) * t);
  return `rgba(${r},${g},${b},${a})`;
}

/* ── Phase Visuals ────────────────────────────────────────────────────── */

// Phase 01 — Target (Understand Goals)
function V01({ color }) {
  return (
    <svg viewBox="0 0 180 180" fill="none" style={{ width: '100%', maxWidth: 220 }}>
      {[72, 54, 36, 18].map((r, i) => (
        <circle key={r} cx="90" cy="90" r={r}
          stroke={color} strokeWidth={i === 3 ? 1.8 : 0.9}
          strokeOpacity={0.18 + i * 0.12}
          style={i === 0 ? {
            transformBox: 'fill-box', transformOrigin: '50% 50%',
            animation: 'meth-outer-pulse 3.2s ease-in-out infinite',
          } : undefined}
        />
      ))}
      <circle cx="90" cy="90" r="5" fill={color}
        style={{ filter: `drop-shadow(0 0 6px ${color})` }} />
      {/* Crosshair */}
      {[[90,8,90,68],[90,112,90,172],[8,90,68,90],[112,90,172,90]].map(([x1,y1,x2,y2],i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={color} strokeWidth="0.75" strokeOpacity="0.4" />
      ))}
      {/* Corner ticks */}
      {[[-1,-1],[1,-1],[-1,1],[1,1]].map(([sx,sy],i) => (
        <g key={i} transform={`translate(${90+sx*72},${90+sy*72})`}>
          <line x1="0" y1="0" x2={sx*-10} y2="0" stroke={color} strokeWidth="1.2" strokeOpacity="0.5" />
          <line x1="0" y1="0" x2="0" y2={sy*-10} stroke={color} strokeWidth="1.2" strokeOpacity="0.5" />
        </g>
      ))}
    </svg>
  );
}

// Phase 02 — Radar Sweep (Understand Current State)
function V02({ color }) {
  const cx = 90, cy = 90, r = 70;
  const wedgePath = `M${cx},${cy} L${cx+r*Math.cos(-Math.PI/5)},${cy+r*Math.sin(-Math.PI/5)} A${r},${r} 0 0,1 ${cx+r*Math.cos(Math.PI/5)},${cy+r*Math.sin(Math.PI/5)} Z`;
  return (
    <svg viewBox="0 0 180 180" fill="none" style={{ width: '100%', maxWidth: 220 }}>
      {[25, 46, 68].map((ri, i) => (
        <circle key={ri} cx={cx} cy={cy} r={ri}
          stroke={color} strokeWidth="0.75" strokeOpacity={0.15 + i * 0.08}
          strokeDasharray={i === 0 ? '3 5' : undefined} />
      ))}
      <line x1={cx} y1={cy-70} x2={cx} y2={cy+70} stroke={color} strokeWidth="0.5" strokeOpacity="0.12" />
      <line x1={cx-70} y1={cy} x2={cx+70} y2={cy} stroke={color} strokeWidth="0.5" strokeOpacity="0.12" />
      <line x1={cx-50} y1={cy-50} x2={cx+50} y2={cy+50} stroke={color} strokeWidth="0.5" strokeOpacity="0.08" />
      <line x1={cx+50} y1={cy-50} x2={cx-50} y2={cy+50} stroke={color} strokeWidth="0.5" strokeOpacity="0.08" />
      <g style={{ transformOrigin: `${cx}px ${cy}px`, animation: 'meth-spin-slow 4s linear infinite' }}>
        <path d={wedgePath} fill={color} fillOpacity="0.10" />
        <line x1={cx} y1={cy} x2={cx+r} y2={cy} stroke={color} strokeWidth="1.5" strokeOpacity="0.55"
          style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
      </g>
      <circle cx={cx} cy={cy} r="4" fill={color} style={{ filter: `drop-shadow(0 0 5px ${color})` }} />
      {/* Scattered ping dots */}
      {[[55,52],[130,70],[105,125],[45,115],[120,48]].map(([px,py],i) => (
        <circle key={i} cx={px} cy={py} r="2.5" fill={color} fillOpacity="0.6"
          style={{ animation: `meth-node-light 3s ${i*0.55}s ease-in-out infinite` }} />
      ))}
    </svg>
  );
}

// Phase 03 — Architecture Nodes (Design Visions)
function V03({ color }) {
  const cx = 90, cy = 90, r = 62;
  const nodes = Array.from({ length: 6 }, (_, i) => ({
    x: cx + r * Math.cos((i * Math.PI * 2) / 6 - Math.PI / 2),
    y: cy + r * Math.sin((i * Math.PI * 2) / 6 - Math.PI / 2),
  }));
  const edges = [[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[0,3],[1,4],[2,5]];
  return (
    <svg viewBox="0 0 180 180" fill="none" style={{ width: '100%', maxWidth: 220 }}>
      {edges.map(([a, b], i) => (
        <line key={i}
          x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
          stroke={color} strokeWidth="0.85" strokeOpacity="0.28"
          strokeDasharray="3 4"
          style={{ animation: `meth-draw-in 0.5s ${i * 0.18}s ease-out both` }}
        />
      ))}
      {nodes.map((node, i) => (
        <circle key={i} cx={node.x} cy={node.y} r="7"
          fill={color} fillOpacity="0.08"
          stroke={color} strokeWidth="1.4" strokeOpacity="0.55"
          style={{ animation: `meth-node-light 3.5s ${i * 0.45}s ease-in-out infinite` }} />
      ))}
      <circle cx={cx} cy={cy} r="9" fill={color} fillOpacity="0.15"
        stroke={color} strokeWidth="2" strokeOpacity="0.7"
        style={{ filter: `drop-shadow(0 0 6px ${color})` }} />
    </svg>
  );
}

// Phase 04 — Gantt Bars (Build Recommendations)
function V04({ color }) {
  const bars = [0.78, 0.52, 0.88, 0.44];
  return (
    <svg viewBox="0 0 180 140" fill="none" style={{ width: '100%', maxWidth: 220 }}>
      {bars.map((fill, i) => (
        <g key={i} transform={`translate(10,${16 + i * 30})`}>
          <rect width="158" height="7" rx="3.5" fill={color} fillOpacity="0.07" />
          <rect width={158 * fill} height="7" rx="3.5" fill={color} fillOpacity="0.48"
            style={{ animation: `meth-bar-breathe 2.8s ${i * 0.22}s ease-in-out infinite` }} />
          <circle cx={158 * fill} cy="3.5" r="5" fill={color}
            style={{
              animation: `meth-bar-breathe 2.8s ${i * 0.22}s ease-in-out infinite`,
              filter: `drop-shadow(0 0 4px ${color})`,
            }} />
          <text x="0" y="20" fontSize="7" fill={color} fillOpacity="0.35"
            fontFamily="'Roboto Mono', monospace">
            {['DISCOVERY','ARCHITECTURE','ROADMAP','ROI MODEL'][i]}
          </text>
        </g>
      ))}
    </svg>
  );
}

// Phase 05 — Pipeline (Execute the Roadmap)
function V05({ color }) {
  const nodeX = [15, 52, 90, 128, 165];
  return (
    <svg viewBox="0 0 180 100" fill="none" style={{ width: '100%', maxWidth: 220 }}>
      {/* Connection lines */}
      {nodeX.slice(0, -1).map((x, i) => (
        <line key={i} x1={x + 9} y1="42" x2={nodeX[i + 1] - 9} y2="42"
          stroke={color} strokeWidth="1.5" strokeOpacity="0.25" />
      ))}
      {/* Nodes */}
      {nodeX.map((x, i) => (
        <g key={i}>
          <circle cx={x} cy="42" r="9" fill={color} fillOpacity="0.08"
            stroke={color} strokeWidth="1.4" strokeOpacity="0.45"
            style={{ animation: `meth-node-light 3s ${i * 0.55}s ease-in-out infinite` }} />
          <circle cx={x} cy="42" r="4" fill={color}
            style={{
              animation: `meth-node-light 3s ${i * 0.55}s ease-in-out infinite`,
              filter: `drop-shadow(0 0 5px ${color})`,
            }} />
          <text x={x} y="65" fontSize="6.5" fill={color} fillOpacity="0.38"
            textAnchor="middle" fontFamily="'Roboto Mono', monospace">
            {['PLAN','BUILD','TEST','DEPLOY','ADOPT'][i]}
          </text>
        </g>
      ))}
    </svg>
  );
}

// Phase 06 — Cycle (Governance & Improvement)
function V06({ color }) {
  const cx = 90, cy = 85, pr = 58;
  const pts = Array.from({ length: 3 }, (_, i) => ({
    x: cx + pr * Math.cos((i * Math.PI * 2) / 3 - Math.PI / 2),
    y: cy + pr * Math.sin((i * Math.PI * 2) / 3 - Math.PI / 2),
  }));
  return (
    <svg viewBox="0 0 180 170" fill="none" style={{ width: '100%', maxWidth: 220 }}>
      <defs>
        <marker id="mArrow" viewBox="0 0 7 7" refX="6" refY="3.5"
          markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 z" fill={color} fillOpacity="0.65" />
        </marker>
      </defs>
      <g style={{ transformOrigin: `${cx}px ${cy}px`, animation: 'meth-spin-slow 7s linear infinite' }}>
        {pts.map((from, i) => {
          const to = pts[(i + 1) % 3];
          const dx = to.x - from.x, dy = to.y - from.y;
          const len = Math.hypot(dx, dy);
          const ux = dx / len, uy = dy / len;
          const off = 15;
          // Slightly curve the line using a midpoint offset
          const mx = (from.x + to.x) / 2 + uy * 18;
          const my = (from.y + to.y) / 2 - ux * 18;
          return (
            <path key={i}
              d={`M${from.x + ux * off},${from.y + uy * off} Q${mx},${my} ${to.x - ux * off},${to.y - uy * off}`}
              stroke={color} strokeWidth="1.6" strokeOpacity="0.55"
              markerEnd="url(#mArrow)"
              style={{ animation: `meth-bar-breathe 2.5s ${i * 0.8}s ease-in-out infinite` }}
            />
          );
        })}
        {pts.map((pt, i) => (
          <circle key={i} cx={pt.x} cy={pt.y} r="12"
            fill={color} fillOpacity="0.08"
            stroke={color} strokeWidth="1.4" strokeOpacity="0.55"
            style={{ animation: `meth-node-light 2.5s ${i * 0.8}s ease-in-out infinite` }} />
        ))}
      </g>
      {/* Center cycle icon text */}
      <text x={cx} y={cy + 5} textAnchor="middle" fontSize="8.5"
        fill={color} fillOpacity="0.4" fontFamily="'Roboto Mono', monospace" letterSpacing="2">
        CONTINUOUS
      </text>
    </svg>
  );
}

const Visuals = [V01, V02, V03, V04, V05, V06];

/* ── Main Component ───────────────────────────────────────────────────── */
export default function Methodology() {
  const containerRef = useRef(null);
  const progressRef  = useRef(null);
  const [phase, setPhase] = useState(0);

  // Track current phase from scroll position
  useEffect(() => {
    function onScroll() {
      if (!containerRef.current) return;
      const top = containerRef.current.offsetTop;
      const idx = Math.min(
        steps.length - 1,
        Math.max(0, Math.round((window.scrollY - top) / window.innerHeight))
      );
      setPhase(idx);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function goToPhase(i) {
    if (!containerRef.current || i < 0 || i >= steps.length) return;
    gsap.to(window, {
      scrollTo: { y: containerRef.current.offsetTop + i * window.innerHeight, autoKill: false },
      duration: 0.6,
      ease: 'power3.out',
      overwrite: true,
    });
  }

  // GSAP panel transitions
  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = Array.from(containerRef.current.querySelectorAll('.mstep'));
      gsap.set(panels.slice(1), { xPercent: 100 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${(steps.length - 1) * 100}%`,
          scrub: 0.8,
          pin: false,
          snap: {
            snapTo: 1 / (steps.length - 1),
            duration: { min: 0.2, max: 0.55 },
            ease: 'power3.out',
            delay: 0.03,
          },
        },
      });

      tl.to(progressRef.current, { scaleX: 1, ease: 'none', duration: steps.length - 1 }, 0);

      panels.slice(1).forEach((panel, i) => {
        tl.to(panel,     { xPercent: 0,   ease: 'back.out(1.5)', duration: 1    }, i);
        tl.to(panels[i], { opacity: 0,    ease: 'power3.in',     duration: 0.28 }, i);
        tl.to(panels[i], { xPercent: -20, ease: 'power2.in',     duration: 0.6  }, i);
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const phaseArrowCls = (disabled) =>
    `w-9 h-9 rounded-full flex items-center justify-center ` +
    `bg-white/80 backdrop-blur-md border border-primary/12 shadow-brand ` +
    `text-primary/55 hover:bg-primary hover:text-white hover:border-primary ` +
    `hover:shadow-[0_0_0_1px_rgba(30,196,247,0.25),0_4px_20px_rgba(10,52,138,0.28),0_0_20px_rgba(30,196,247,0.25)] ` +
    `transition-all duration-[350ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ` +
    (disabled ? 'opacity-20 pointer-events-none' : '');

  return (
    <div ref={containerRef} style={{ height: `${steps.length * 100}vh` }}>
      {/* Transparent sticky shell — GlobalCanvas shows through */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-[3px] z-20"
          style={{ background: 'rgba(10,52,138,0.08)' }}>
          <div ref={progressRef} className="h-full origin-left scale-x-0"
            style={{ background: 'linear-gradient(to right, #1EC4F7, #0A348A)' }} />
        </div>

        {/* Section header — large and prominent */}
        <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none px-8 md:px-14 pt-10">
          <div className="flex items-end justify-between">
            <div>
              <span className="font-mono text-[10px] text-accent tracking-[0.25em] uppercase block mb-3">
                How We Work
              </span>
              <h2 className="font-heading font-black text-5xl md:text-6xl lg:text-7xl text-textDark leading-none">
                MTS Approach
              </h2>
            </div>
            {/* Live phase counter — stroke number matching phase color */}
            <div className="text-right shrink-0">
              <span
                className="font-heading font-black leading-none block"
                style={{
                  fontSize: 'clamp(3rem, 6vw, 5rem)',
                  color: 'transparent',
                  WebkitTextStroke: `1.6px ${sca(phase, steps.length, 0.5)}`,
                  textShadow: `0 0 24px ${sca(phase, steps.length, 0.28)}`,
                }}
              >
                {String(phase + 1).padStart(2, '0')}
              </span>
              <span className="font-mono text-[10px] text-textDark/30 tracking-widest block mt-1">
                6-Phase Framework
              </span>
            </div>
          </div>
          <div className="mt-4 h-px bg-gradient-to-r from-transparent via-primary/12 to-transparent" />
        </div>

        {/* In-section phase navigation */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
          <button onClick={() => goToPhase(phase - 1)} className={phaseArrowCls(phase === 0)}>
            <ChevronLeft size={14} strokeWidth={2.2} />
          </button>
          <span className="font-mono text-[10px] text-textDark/35 tracking-[0.18em] min-w-[36px] text-center">
            {String(phase + 1).padStart(2, '0')}/{String(steps.length).padStart(2, '0')}
          </span>
          <button onClick={() => goToPhase(phase + 1)} className={phaseArrowCls(phase === steps.length - 1)}>
            <ChevronRight size={14} strokeWidth={2.2} />
          </button>
        </div>

        {/* Panels */}
        {steps.map((step, i) => {
          const color   = sc(i, steps.length);
          const colorA  = (a) => sca(i, steps.length, a);
          const Visual  = Visuals[i];

          return (
            <div
              key={i}
              className="mstep absolute inset-0 flex items-center justify-center px-6 sm:px-10 md:px-14 pt-40 md:pt-44 pb-16"
              style={{ willChange: 'transform, opacity' }}
            >
              <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-[100px_1fr_240px] gap-6 md:gap-8 lg:gap-12 items-center">

                {/* Left — phase number (stroke outline style) */}
                <div className="hidden md:flex flex-col items-start gap-2.5">
                  <span
                    className="font-heading font-black leading-none select-none"
                    style={{
                      fontSize: 'clamp(4rem, 9vw, 7.5rem)',
                      color: 'transparent',
                      WebkitTextStroke: `1.8px ${colorA(0.52)}`,
                      textShadow: `0 0 28px ${colorA(0.32)}, 0 0 60px ${colorA(0.14)}`,
                    }}
                  >
                    {step.num}
                  </span>
                  <span className="font-mono text-[10px] tracking-widest uppercase"
                    style={{ color: colorA(0.48) }}>
                    Phase {step.num} / 06
                  </span>
                </div>

                {/* Center — content card */}
                <div
                  className="bg-white/88 backdrop-blur-md rounded-[2rem] p-8 md:p-10 border"
                  style={{
                    borderColor: colorA(0.18),
                    boxShadow: [
                      `0 16px 60px rgba(10,52,138,0.10)`,
                      `0 4px 24px ${colorA(0.18)}`,
                      `0 0 56px ${colorA(0.07)}`,
                      `0 0 0 1px ${colorA(0.12)}`,
                    ].join(', '),
                  }}
                >
                  <span className="font-mono text-[10px] tracking-widest uppercase block mb-5 md:hidden"
                    style={{ color }}>
                    Phase {step.num} / 06
                  </span>

                  <div className="w-10 h-[3px] rounded-full mb-6"
                    style={{ background: `linear-gradient(to right, ${color}, ${colorA(0.28)})` }} />

                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-textDark mb-4 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 font-body text-base md:text-lg leading-relaxed">
                    {step.desc}
                  </p>

                  <div className="mt-7 flex items-center gap-3">
                    <div className="h-px flex-1"
                      style={{ background: `linear-gradient(to right, ${color}, transparent)` }} />
                    <span className="font-mono text-[9px] tracking-widest uppercase opacity-50"
                      style={{ color }}>
                      {i < steps.length - 1 ? `Phase ${steps[i + 1].num} →` : '✓ Complete'}
                    </span>
                  </div>
                </div>

                {/* Right — phase visual */}
                <div className="hidden md:flex items-center justify-center" style={{ opacity: 0.75 }}>
                  <Visual color={color} />
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
