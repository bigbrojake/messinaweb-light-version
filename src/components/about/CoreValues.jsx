import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Heart, Lightbulb } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    num: '01',
    title: 'Agile & Efficient',
    sub: 'Fast cycles, lean delivery, zero drag.',
    detail: 'We compress timelines without compressing quality. Speed is a feature.',
    Icon: Zap,
  },
  {
    num: '02',
    title: 'Relationship-First',
    sub: 'Partnerships built on trust, not transactions.',
    detail: 'Every engagement begins with listening. We invest in the long game.',
    Icon: Heart,
  },
  {
    num: '03',
    title: 'Innovation-Driven',
    sub: "Continuously pushing what's operationally possible.",
    detail: 'We prototype, iterate, and deploy — not theorize and report.',
    Icon: Lightbulb,
  },
];

export default function CoreValues() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header line + label
      gsap.fromTo('.cv-header-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );
      gsap.fromTo('.cv-header-text',
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
        }
      );

      // Each row slides in from left
      gsap.utils.toArray('.cv-row').forEach((row, i) => {
        gsap.fromTo(row,
          { opacity: 0, x: -48 },
          {
            opacity: 1, x: 0,
            duration: 0.85,
            ease: 'power3.out',
            delay: i * 0.12,
            scrollTrigger: { trigger: row, start: 'top 85%' },
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
          <div className="flex items-end gap-6">
            <h2 className="text-4xl md:text-5xl font-heading font-black text-white leading-[1.08]">
              The Principles<br />We Ship By
            </h2>
            <div
              className="cv-header-line hidden md:block h-[2px] bg-gradient-to-r from-accent to-accent/0 origin-left mb-3 flex-1"
            />
          </div>
        </div>

        {/* Value rows */}
        <div className="divide-y divide-white/[0.08]">
          {values.map((v, i) => {
            const Icon = v.Icon;
            return (
              <div
                key={i}
                className="cv-row group flex flex-col md:flex-row md:items-center gap-6 md:gap-0 py-10 md:py-12 cursor-default"
              >
                {/* Number */}
                <div className="shrink-0 w-20 md:w-24">
                  <span className="font-mono text-[11px] text-white/25 tracking-widest uppercase">
                    {v.num} / 03
                  </span>
                </div>

                {/* Icon pill */}
                <div className="shrink-0 mr-0 md:mr-12">
                  <div className="w-14 h-14 rounded-2xl border border-white/[0.12] bg-white/[0.05] group-hover:bg-accent group-hover:border-accent flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-[0_0_0_1px_rgba(30,196,247,0)] group-hover:shadow-[0_0_28px_rgba(30,196,247,0.45)]">
                    <Icon size={22} className="text-white/60 group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>

                {/* Title — dramatic reveal */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-black text-3xl md:text-4xl lg:text-5xl text-white/[0.18] group-hover:text-white transition-colors duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] leading-none tracking-tight">
                    {v.title}
                  </h3>
                  <p className="font-body text-sm text-white/35 group-hover:text-white/60 mt-2 transition-colors duration-400 max-w-xs">
                    {v.sub}
                  </p>
                </div>

                {/* Detail — hidden until hover */}
                <div className="md:w-72 shrink-0 overflow-hidden">
                  <p className="font-body text-sm text-white/0 group-hover:text-white/50 transition-colors duration-500 delay-100 leading-relaxed md:text-right">
                    {v.detail}
                  </p>
                </div>

                {/* Trailing accent line */}
                <div className="shrink-0 ml-0 md:ml-10 hidden md:block">
                  <div className="w-8 h-[2px] bg-accent/0 group-hover:bg-accent origin-left transition-all duration-500 delay-75" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer stat bar */}
        <div className="mt-16 pt-10 border-t border-white/[0.08] grid grid-cols-3 gap-6">
          {['25+ Years', '100% Custom', 'Always On'].map((label, i) => (
            <div key={i} className="text-center">
              <p className="font-heading font-black text-2xl md:text-3xl text-white">{label}</p>
              <p className="font-mono text-[10px] text-white/30 tracking-widest uppercase mt-1">
                {['Deep Experience', 'Tailored Scope', 'True Partnership'][i]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
