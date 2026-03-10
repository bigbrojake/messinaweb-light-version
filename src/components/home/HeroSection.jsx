import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  const containerRef = useRef(null);

  // ── GSAP text entrance ────────────────────────────────────────────────────
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
      className="hero-gradient-bg relative h-[100dvh] w-full flex items-end pb-[22vh] lg:pb-[26vh] px-6"
      style={{ overflow: 'clip' }}
    >
      {/* ── Depth vignette — adds navy weight to upper-left, protects text readability */}
      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_120%_80%_at_15%_20%,rgba(10,52,138,0.30),transparent)] pointer-events-none" />

      {/* ── Bottom bridge — fades toward TrustAwards navy to avoid white flash ── */}
      <div className="absolute bottom-0 left-0 right-0 h-48 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(10,52,138,0.92) 0%, rgba(10,52,138,0.55) 30%, rgba(10,52,138,0.15) 60%, transparent 100%)' }}
      />

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="relative z-30 w-full max-w-7xl mx-auto flex flex-col items-start gap-6">

        <span className="hero-label inline-block px-4 py-1.5 bg-white/15 border border-white/30 rounded-[2rem] text-white text-xs font-mono uppercase tracking-widest">
          IT Consulting &middot; Staffing &middot; Delivery
        </span>

        <h1 className="flex flex-col gap-1">
          <span className="hero-title-1 text-3xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-white">
            Empower your Enterprise
          </span>
          <span
            className="hero-title-2 text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-extrabold tracking-tight uppercase"
            style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.60)', color: 'transparent' }}
          >
            Solutions that Connect.
          </span>
        </h1>

        <p className="hero-body max-w-xl text-base md:text-lg text-white/70 font-body leading-relaxed">
          Empowering organizations through innovative IT consulting, flexible resource staffing, and results-driven service delivery.
        </p>

        <Link
          to="/contact"
          className="hero-cta magnetic-btn relative px-8 py-4 text-base font-bold text-white bg-accent rounded-[2rem] shadow-lg shadow-accent/25 border border-accent/40 overflow-hidden"
        >
          <span className="relative z-10">Get in Touch</span>
          <span className="absolute inset-0 bg-white/15 rounded-[2rem] opacity-0 hover:opacity-100 transition-opacity duration-300 ease-out z-0" />
        </Link>
      </div>
    </section>
  );
}
