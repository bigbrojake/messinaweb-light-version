import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const models = [
  {
    num: '01',
    id: 'C2H',
    title: 'Contract-to-Hire',
    tag: 'Low Risk',
    tagColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/25',
    desc: 'Engage talent on a contract basis with a defined path to full-time. Evaluate technical fit and cultural alignment before making a permanent commitment — reducing hiring risk without slowing momentum.',
  },
  {
    num: '02',
    id: 'DH',
    title: 'Direct-Hire',
    tag: 'Fast Track',
    tagColor: 'text-violet-400 bg-violet-400/10 border-violet-400/25',
    desc: 'When you know what you need, we move fast. MTS sources, vets, and presents candidates for direct placement — cutting time-to-hire without sacrificing quality or fit.',
  },
  {
    num: '03',
    id: 'SAAS',
    title: 'Staffing-aaS',
    tag: 'Managed',
    tagColor: 'text-accent bg-accent/10 border-accent/30',
    desc: 'A fully managed resourcing model built for enterprise IT operations. MTS provides dedicated L1–L3 resources with defined SLAs, onshore and offshore coverage, and continuous process improvement baked in — so your team scales without the overhead.',
  },
];

export default function StaffingModels() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
      });

      tl.fromTo('.sm-header',
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
      )
      .fromTo('.sm-panel',
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: 'power3.out' },
        '-=0.3'
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6 bg-primary"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="sm-header mb-10">
          <span className="font-mono text-[11px] text-accent tracking-[0.28em] uppercase block mb-4">
            Resource Staffing
          </span>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white leading-tight">
              Talent on Your Terms.
            </h2>
            <p className="font-body text-sm text-white/55 max-w-xs leading-relaxed md:mt-1">
              Whether you're evaluating fit before committing or scaling an entire support operation, we work closely with you to structure the right model — not hand you a template.
            </p>
          </div>
        </div>

        {/* Three-panel typographic grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.08]">
          {models.map((m) => (
            <div key={m.id} className="sm-panel py-8 md:py-0 md:px-8 first:md:pl-0 last:md:pr-0">

              {/* Accent bar */}
              <div className="w-8 h-[2px] bg-accent/50 mb-6" />

              {/* Number */}
              <span className="font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase block mb-3">
                {m.num}
              </span>

              {/* Model name */}
              <h3
                className="font-heading font-black text-white uppercase leading-none tracking-tight mb-4"
                style={{ fontSize: 'clamp(1.4rem, 1.9vw, 2rem)' }}
              >
                {m.title}
              </h3>

              {/* Tag */}
              <span className={`inline-flex mb-6 px-2.5 py-1 rounded-full border text-[10px] font-mono tracking-wider uppercase ${m.tagColor}`}>
                {m.tag}
              </span>

              {/* Description */}
              <p className="font-body text-[13px] leading-loose text-white/65">
                {m.desc}
              </p>

            </div>
          ))}
        </div>

        {/* CTA footer row */}
        <div className="mt-14 flex flex-col md:flex-row items-center justify-between gap-6 pt-10 border-t border-white/[0.08]">
          <div>
            <p className="font-heading font-semibold text-white text-lg">Not sure which model fits your team?</p>
            <p className="font-body text-sm text-white/45 mt-1">
              Most engagements start with a single conversation. Let's figure out the right structure together.
            </p>
          </div>
          <a
            href="/contact"
            className="magnetic-btn inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-white text-primary font-heading font-semibold text-sm shadow-brand-md hover:shadow-brand-lg transition-shadow duration-300 shrink-0"
          >
            Start the Conversation
            <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-xs">→</span>
          </a>
        </div>

      </div>
    </section>
  );
}
