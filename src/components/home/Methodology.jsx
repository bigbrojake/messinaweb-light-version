import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { sc, sca, Visuals } from './MethodologyVisuals';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const steps = [
  { num: '01', title: 'Understand Goals & Objectives', desc: 'Confirm scope and align with organizational vision.' },
  { num: '02', title: 'Understand Current State',      desc: 'Evaluate existing capabilities, challenges, and opportunities.' },
  { num: '03', title: 'Design Visions',                desc: 'Formulate interim and future state target architectures.' },
  { num: '04', title: 'Build Recommendations',         desc: 'Create roadmap timelines and a concrete Business Case/ROI.' },
  { num: '05', title: 'Execute the Roadmap',           desc: 'Deploy solutions, measure results continuously, and adapt.' },
  { num: '06', title: 'Governance & Improvement',      desc: 'Establish metrics and long-term continuous improvement protocols.' },
];

/* ── Main Component ───────────────────────────────────────────────────── */
export default function Methodology() {
  const containerRef   = useRef(null);
  const progressRef    = useRef(null);
  const navigatingRef  = useRef(false);
  const [phase, setPhase] = useState(0);

  // Track current phase from scroll + debounced manual snap
  useEffect(() => {
    let snapTimer = null;

    function onScroll() {
      if (!containerRef.current) return;
      const top = containerRef.current.offsetTop;
      const idx = Math.min(
        steps.length - 1,
        Math.max(0, Math.round((window.scrollY - top) / window.innerHeight))
      );
      setPhase(idx);

      // Snap to nearest step on scroll-end, but not during button navigation
      if (!navigatingRef.current) {
        clearTimeout(snapTimer);
        snapTimer = setTimeout(() => {
          if (!containerRef.current) return;
          const t   = containerRef.current.offsetTop;
          const raw = (window.scrollY - t) / window.innerHeight;
          const snapped = Math.min(steps.length - 1, Math.max(0, Math.round(raw)));
          // Only if we're inside the methodology section
          if (window.scrollY >= t && window.scrollY <= t + (steps.length - 1) * window.innerHeight) {
            gsap.to(window, {
              scrollTo: { y: t + snapped * window.innerHeight, autoKill: true },
              duration: 0.4,
              ease: 'power3.out',
            });
          }
        }, 150);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(snapTimer);
    };
  }, []);

  function goToPhase(i) {
    if (!containerRef.current || i < 0 || i >= steps.length) return;
    navigatingRef.current = true;
    gsap.to(window, {
      scrollTo: { y: containerRef.current.offsetTop + i * window.innerHeight, autoKill: false },
      duration: 0.6,
      ease: 'power3.out',
      overwrite: true,
      onComplete: () => {
        setPhase(i);
        navigatingRef.current = false;
      },
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
