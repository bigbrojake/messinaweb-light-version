import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    num: '01',
    title: 'Agile & Efficient',
    sub: 'Fast cycles, lean delivery, zero drag.',
    detail: 'We compress timelines without compressing quality. Speed is a feature.',
  },
  {
    num: '02',
    title: 'Relationship-First',
    sub: 'Partnerships built on trust, not transactions.',
    detail: 'Every engagement begins with listening. We invest in the long game.',
  },
  {
    num: '03',
    title: 'Innovation-Driven',
    sub: "Continuously pushing what's operationally possible.",
    detail: 'We prototype, iterate, and deploy — not theorize and report.',
  },
];

export default function CoreValues() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cv-header-text',
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );

      gsap.utils.toArray('.cv-row').forEach((row, i) => {
        gsap.fromTo(row,
          { opacity: 0, x: -40 },
          {
            opacity: 1, x: 0,
            duration: 0.85,
            ease: 'power3.out',
            delay: i * 0.1,
            scrollTrigger: { trigger: row, start: 'top 88%' },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-primary py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="cv-header-text mb-20">
          <span className="font-mono text-[11px] text-accent tracking-[0.25em] uppercase block mb-3">
            Operational Axioms
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-black text-white leading-[1.08]">
            The Principles<br />We Ship By
          </h2>
        </div>

        {/* Value strips */}
        <div className="border-t border-white/[0.08]">
          {values.map((v, i) => (
            <div
              key={i}
              className="cv-row group border-b border-white/[0.08] py-10 md:py-14 cursor-default"
            >
              <div className="flex items-center gap-6 md:gap-10">
                {/* Number — far left */}
                <span className="font-mono text-[10px] text-white/20 tracking-widest shrink-0 w-10">
                  {v.num}
                </span>

                {/* Title + sub — main visual element */}
                <div className="flex-1 min-w-0">
                  <h3
                    className="font-heading font-black text-white/[0.18] group-hover:text-white transition-colors duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] leading-none tracking-tight uppercase"
                    style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
                  >
                    {v.title}
                  </h3>
                  <p className="font-body text-sm text-white/0 group-hover:text-white/40 mt-2 transition-all duration-500 delay-75 translate-y-1 group-hover:translate-y-0 leading-relaxed max-w-xs">
                    {v.sub}
                  </p>
                </div>

                {/* Detail + arrow — slides in from right on hover */}
                <div className="hidden md:flex items-center gap-6 shrink-0">
                  <p className="font-body text-sm text-white/0 group-hover:text-white/40 transition-all duration-500 delay-100 leading-relaxed w-56 text-right translate-x-4 group-hover:translate-x-0">
                    {v.detail}
                  </p>
                  <div className="w-9 h-9 rounded-full border border-white/[0.10] flex items-center justify-center group-hover:border-accent group-hover:shadow-[0_0_20px_rgba(30,196,247,0.30)] transition-all duration-500">
                    <ArrowRight
                      size={15}
                      className="text-white/20 group-hover:text-accent transition-all duration-500 translate-x-0 group-hover:translate-x-0.5"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
