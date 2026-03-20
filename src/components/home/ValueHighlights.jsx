import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    tag: 'SCOPE',
    statVal: 100,
    statSuffix: '%',
    title: 'Tailored Solutions',
    desc: 'No off-the-shelf playbooks. We engineer precision outcomes calibrated to your environment, constraints, and long-term roadmap.',
  },
  {
    tag: 'SUPPORT',
    statVal: 24,
    statSuffix: '/7',
    title: 'Always Available',
    desc: 'Round-the-clock coverage ensures your operations stay uninterrupted when it matters most.',
  },
  {
    tag: 'EXPERTISE',
    statVal: 25,
    statSuffix: '+',
    title: 'Years of Experience',
    desc: 'Two decades of enterprise delivery across energy, healthcare, federal, and retail.',
  },
];

export default function ValueHighlights() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.vh-col',
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0,
          duration: 0.9, stagger: 0.13, ease: 'power3.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
        }
      );

      highlights.forEach((item, i) => {
        const statEl = containerRef.current.querySelector(`[data-stat="${i}"]`);
        if (!statEl) return;
        const counter = { val: 0 };
        gsap.to(counter, {
          val: item.statVal, duration: 1.8, ease: 'power2.out',
          onUpdate() { statEl.textContent = Math.round(counter.val) + item.statSuffix; },
          scrollTrigger: { trigger: containerRef.current, start: 'top 78%' },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-10 px-6 max-w-7xl mx-auto relative z-20">
      {/* Eyebrow */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-px h-6 bg-gradient-to-b from-accent to-primary/50" />
        <span className="font-mono text-[11px] tracking-[0.28em] text-accent uppercase">Why MTS</span>
      </div>

      {/* 3-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-primary/8">
        {highlights.map((item, i) => (
          <div key={i} className="vh-col group flex flex-col gap-2.5 px-0 md:px-8 py-6 md:py-0 first:pl-0 last:pr-0">
            {/* Stat */}
            <div
              data-stat={i}
              className="font-heading font-black leading-none tracking-tight text-primary/15 group-hover:text-primary transition-colors duration-500"
              style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4rem)' }}
            >
              0{item.statSuffix}
            </div>

            {/* Tag + title */}
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[9px] tracking-[0.32em] uppercase text-accent/80">{item.tag}</span>
              <h3 className="font-heading font-bold text-lg text-textDark group-hover:text-primary transition-colors duration-400 leading-tight">
                {item.title}
              </h3>
            </div>

            {/* Accent rule */}
            <div className="w-8 h-0.5 bg-gradient-to-r from-accent to-primary/30" />

            {/* Desc */}
            <p className="font-body text-gray-500 text-xs leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
