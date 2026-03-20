import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ambient radial pulse — very slow, barely visible
      gsap.to('.ms-radial', {
        scale: 1.2,
        opacity: 0.12,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Text entrance
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
      });
      tl.fromTo('.ms-eyebrow', { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' })
        .fromTo('.ms-bar', { scaleY: 0 }, { scaleY: 1, duration: 0.9, ease: 'power3.out', transformOrigin: 'top' }, '-=0.4')
        .fromTo('.ms-quote', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }, '-=0.6')
        .fromTo('.ms-attribution', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5');
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-white">
      {/* Ambient radial glow — slow pulse */}
      <div
        className="ms-radial absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full pointer-events-none opacity-[0.06]"
        style={{ background: 'radial-gradient(ellipse at center, rgba(30,196,247,0.9) 0%, rgba(10,52,138,0.4) 45%, transparent 75%)' }}
      />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: 'radial-gradient(circle, #0A348A 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-8 md:px-16 py-14 md:py-18">
        {/* Eyebrow */}
        <div className="ms-eyebrow flex items-center gap-4 mb-8">
          <div className="w-px h-6 bg-gradient-to-b from-accent to-primary/50" />
          <span className="font-mono text-[11px] text-accent tracking-[0.28em] uppercase">Manifesto</span>
        </div>

        {/* Blockquote — accent bar + text */}
        <div className="flex gap-6 md:gap-8">
          {/* 4px left accent bar */}
          <div
            className="ms-bar shrink-0 w-1 rounded-full self-stretch"
            style={{ background: 'linear-gradient(180deg, #1EC4F7 0%, #0A348A 60%, transparent 100%)' }}
          />

          {/* Quote body */}
          <div className="flex flex-col gap-6">
            <blockquote className="ms-quote">
              <p
                className="font-heading font-bold text-textDark leading-[1.35]"
                style={{ fontSize: 'clamp(1.25rem, 2.5vw, 2rem)' }}
              >
                Our mission is to empower organizations through{' '}
                <em className="not-italic text-primary">innovative IT consulting</em>,{' '}
                <em className="not-italic text-primary">flexible resource staffing</em>, and{' '}
                <em className="not-italic text-primary">results-driven service delivery</em>.
              </p>
            </blockquote>

            {/* Attribution */}
            <div className="ms-attribution flex items-center gap-4 pt-2 border-t border-primary/8">
              <div className="w-8 h-8 rounded-full border border-primary/20 bg-white flex items-center justify-center shadow-sm shrink-0">
                <span className="font-mono text-[7px] font-black text-primary tracking-widest">MTS</span>
              </div>
              <div>
                <p className="font-heading font-semibold text-sm text-textDark leading-tight">Messina Technology Solutions</p>
                <p className="font-mono text-[10px] text-textDark/35 tracking-widest uppercase mt-0.5">Est. 1998 · Newburyport, MA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
