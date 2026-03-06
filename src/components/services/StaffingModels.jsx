import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileSignature, RefreshCw, UserCheck, Building2, Layers, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const tracks = [
  { label: 'Consulting Services', desc: '[Placeholder: brief description of consulting services track]' },
  { label: 'Product Lead Services', desc: '[Placeholder: brief description of product lead services track]' },
];

const models = [
  {
    id: 'C2H',
    icon: FileSignature,
    title: 'Contract-to-Hire',
    tag: 'Low Risk',
    tagColor: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    desc: '[Placeholder: description of contract-to-hire model]',
  },
  {
    id: 'T2P',
    icon: RefreshCw,
    title: 'Temp-to-Perm',
    tag: 'Flexible',
    tagColor: 'text-sky-600 bg-sky-50 border-sky-200',
    desc: '[Placeholder: description of temp-to-perm model]',
  },
  {
    id: 'DH',
    icon: UserCheck,
    title: 'Direct-Hire',
    tag: 'Fast Track',
    tagColor: 'text-violet-600 bg-violet-50 border-violet-200',
    desc: '[Placeholder: description of direct-hire model]',
  },
  {
    id: 'RES',
    icon: Building2,
    title: 'Residencies',
    tag: 'Embedded',
    tagColor: 'text-amber-600 bg-amber-50 border-amber-200',
    desc: '[Placeholder: description of residencies model]',
  },
  {
    id: 'SAAS',
    icon: Layers,
    title: 'Staffing-aaS',
    tag: 'Managed',
    tagColor: 'text-accent bg-accent/10 border-accent/30',
    desc: '[Placeholder: description of Staffing-aaS model]',
    featured: true,
  },
  {
    id: 'BENCH',
    icon: TrendingUp,
    title: 'Bench Strength',
    tag: 'Strategic',
    tagColor: 'text-primary bg-primary/[0.06] border-primary/20',
    desc: '[Placeholder: description of bench strength building model]',
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
      .fromTo('.sm-track',
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
        '-=0.3'
      )
      .fromTo('.sm-card',
        { opacity: 0, y: 32, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.09, ease: 'power3.out' },
        '-=0.2'
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 px-6 max-w-7xl mx-auto border-t border-primary/8">

      {/* Header */}
      <div className="sm-header mb-12">
        <span className="font-mono text-[11px] text-accent tracking-[0.28em] uppercase block mb-4">
          Resource Staffing
        </span>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-textDark leading-tight max-w-xl">
            Customized Hiring Models,<br />Built for Scale.
          </h2>
          <p className="font-body text-base text-textDark/50 max-w-sm leading-relaxed">
            [Placeholder: section intro copy]
          </p>
        </div>
      </div>

      {/* Dual track indicator */}
      <div className="flex flex-col sm:flex-row gap-3 mb-14">
        {tracks.map((t, i) => (
          <div
            key={i}
            className="sm-track flex items-start gap-4 px-6 py-4 rounded-2xl border border-primary/10 bg-white shadow-brand flex-1"
          >
            <div className="w-2 h-2 rounded-full bg-accent mt-1.5 shrink-0 shadow-[0_0_8px_rgba(30,196,247,0.5)]" />
            <div>
              <p className="font-heading font-semibold text-sm text-textDark leading-tight">{t.label}</p>
              <p className="font-body text-xs text-textDark/45 mt-0.5">{t.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Model cards — 3-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {models.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.id}
              className={`sm-card group relative flex flex-col rounded-[2rem] border p-7 transition-all duration-400
                ${m.featured
                  ? 'border-accent/30 bg-primary shadow-[0_0_40px_rgba(30,196,247,0.12),inset_0_1px_0_rgba(30,196,247,0.15)]'
                  : 'border-primary/10 bg-white shadow-brand hover:shadow-brand-md hover:border-primary/20'
                }`}
            >
              {/* Model ID badge */}
              <div className="absolute top-5 right-5">
                <span className={`font-mono text-[10px] tracking-widest font-bold
                  ${m.featured ? 'text-accent/60' : 'text-primary/25'}`}>
                  {m.id}
                </span>
              </div>

              {/* Icon */}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-5
                ${m.featured
                  ? 'bg-accent/10 border border-accent/25'
                  : 'bg-primary/[0.05] border border-primary/10 group-hover:border-accent/20 group-hover:bg-accent/[0.06] transition-colors duration-300'
                }`}>
                <Icon size={18} className={m.featured ? 'text-accent' : 'text-primary/50 group-hover:text-accent/70 transition-colors duration-300'} />
              </div>

              {/* Title */}
              <h3 className={`font-heading font-bold text-lg leading-snug mb-2
                ${m.featured ? 'text-white' : 'text-textDark'}`}>
                {m.title}
              </h3>

              {/* Tag */}
              <span className={`self-start mb-4 px-2.5 py-0.5 rounded-full border text-[10px] font-mono tracking-wider uppercase
                ${m.featured ? 'text-accent/80 bg-accent/10 border-accent/25' : m.tagColor}`}>
                {m.tag}
              </span>

              {/* Description */}
              <p className={`font-body text-sm leading-relaxed mt-auto
                ${m.featured ? 'text-white/60' : 'text-textDark/50'}`}>
                {m.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* CTA footer row */}
      <div className="mt-14 flex flex-col md:flex-row items-center justify-between gap-6 pt-10 border-t border-primary/8">
        <div>
          <p className="font-heading font-semibold text-textDark text-lg">[Placeholder: CTA headline]</p>
          <p className="font-body text-sm text-textDark/45 mt-1">
            [Placeholder: CTA supporting copy]
          </p>
        </div>
        <a
          href="/contact"
          className="magnetic-btn inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-primary text-white font-heading font-semibold text-sm shadow-brand-md hover:shadow-brand-lg transition-shadow duration-300"
        >
          Start the Conversation
          <span className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center text-xs">→</span>
        </a>
      </div>
    </section>
  );
}
