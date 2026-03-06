import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const pillars = ['IT Consulting', 'Resource Staffing', 'Service Delivery'];

export default function Manifesto() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
      });

      tl.fromTo('.ms-label',
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' }
      )
      .fromTo('.ms-quote-mark',
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      )
      .fromTo('.ms-text',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo('.ms-footer',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo('.ms-pillar',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
        '-=0.5'
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-white/10 backdrop-blur-2xl"
    >
      {/* Left brand bar */}
      <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-accent via-primary to-primary/20" />

      {/* Dot-grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(circle, #0A348A 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_45%_50%,rgba(30,196,247,0.05),transparent)] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-10 md:px-16 py-28">

        {/* Label row */}
        <div className="ms-label flex items-center gap-4 mb-12">
          <div className="h-px w-14 bg-gradient-to-r from-accent to-primary/60" />
          <span className="font-mono text-[11px] text-accent tracking-[0.28em] uppercase">
            Mission Statement
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent max-w-[120px]" />
        </div>

        {/* Quote block */}
        <div className="relative">
          {/* Decorative open-quote */}
          <span
            className="ms-quote-mark absolute -top-6 -left-2 md:-left-6 font-heading font-black text-primary/[0.07] leading-none select-none pointer-events-none"
            style={{ fontSize: 'clamp(6rem, 14vw, 10rem)' }}
            aria-hidden
          >
            "
          </span>

          <p className="ms-text relative pl-2 text-2xl md:text-3xl lg:text-[2.35rem] font-heading font-bold text-textDark leading-[1.38]">
            Our mission is to empower organizations through{' '}
            <span className="text-primary">innovative IT consulting</span>,{' '}
            <span className="text-primary">flexible resource staffing</span>, and{' '}
            <span className="text-primary">results-driven service delivery</span>.
          </p>
        </div>

        {/* Footer row */}
        <div className="ms-footer mt-14 flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-t border-primary/10 pt-8">
          {/* Attribution */}
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-full border border-primary/20 bg-white flex items-center justify-center shadow-brand shrink-0">
              <span className="font-mono text-[8px] font-black text-primary tracking-widest">MTS</span>
            </div>
            <div>
              <p className="font-heading font-semibold text-sm text-textDark leading-tight">
                Messina Technology Solutions
              </p>
              <p className="font-mono text-[10px] text-textDark/35 tracking-widest uppercase mt-0.5">
                Est. 1998 · Newburyport, MA
              </p>
            </div>
          </div>

          {/* Pillar chips */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {pillars.map((p) => (
              <span
                key={p}
                className="ms-pillar px-4 py-1.5 rounded-full border border-primary/14 bg-white/70 font-mono text-[10px] text-primary/60 tracking-wider uppercase shadow-[0_1px_6px_rgba(10,52,138,0.06)]"
              >
                {p}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
