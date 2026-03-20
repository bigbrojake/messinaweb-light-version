import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const studies = [
  {
    industry: 'Energy',
    title: 'Data Center Consolidation',
    challenge: 'Legacy infrastructure fragmented across 4 non-compliant facilities causing 18% availability downtime.',
    solution: 'Full P2V and V2V migration to a centralized, redundant facility running updated Windows/RHEL.',
    metric: '18%', metricLabel: 'Downtime Eliminated',
    img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop',
  },
  {
    industry: 'Healthcare',
    title: 'Epic Systems High-Availability',
    challenge: 'Critical care systems at risk of split-brain failure during failover events.',
    solution: 'Redesigned storage replication and automated DR via Terraform with sub-minute RTO validation.',
    metric: '<1min', metricLabel: 'RTO Achieved',
    img: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=2128&auto=format&fit=crop',
  },
  {
    industry: 'Federal',
    title: 'Zero-Trust Infrastructure',
    challenge: 'Massive security debt pre-audit restricting operations access across agencies.',
    solution: 'Deployed hardened RHEL environments and restricted access controls via ServiceNow automation.',
    metric: '100%', metricLabel: 'Audit Clearance',
    img: 'https://images.unsplash.com/photo-1541888001602-5c0240d12521?q=80&w=2069&auto=format&fit=crop',
  },
  {
    industry: 'Retail',
    title: 'Peak-Season Elasticity',
    challenge: 'Inability to scale resources dynamically during Black Friday traffic spikes.',
    solution: 'Migrated edge services to Azure via Bicep templates allowing instant scaling profiles.',
    metric: '33%', metricLabel: 'Cost Reduction',
    img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop',
  },
];

export default function CaseStudyGrids() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.study-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.85, stagger: 0.14, ease: 'power3.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="pb-24 pt-8 px-6 w-full max-w-7xl mx-auto relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {studies.map((study, i) => (
          <div
            key={i}
            className="study-card group cursor-pointer rounded-[2rem] overflow-hidden border border-primary/8 shadow-[0_4px_24px_rgba(10,52,138,0.07)] hover:shadow-[0_8px_48px_rgba(10,52,138,0.13),0_0_20px_rgba(30,196,247,0.08)] hover:border-accent/20 transition-all duration-400 card-inertia"
          >
            {/* Image zone — dark */}
            <div className="relative w-full aspect-[16/9] overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url("${study.img}")` }}
              />
              {/* Cinematic overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050d1a]/80 via-[#050d1a]/20 to-transparent" />

              {/* Industry badge */}
              <div className="absolute top-4 left-4">
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/90 bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-full">
                  {study.industry}
                </span>
              </div>

              {/* Metric — top right, reveals on hover */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-400">
                <div className="bg-accent/15 backdrop-blur-md border border-accent/25 px-3 py-2 rounded-xl text-right">
                  <span className="block font-heading font-black text-white text-sm leading-none">{study.metric}</span>
                  <span className="block font-mono text-[8px] text-white/60 tracking-widest mt-0.5">{study.metricLabel}</span>
                </div>
              </div>

              {/* Title + arrow over image on hover */}
              <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                <h3 className="text-white font-heading font-bold text-lg leading-tight">{study.title}</h3>
                <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0 ml-3">
                  <ArrowUpRight size={14} className="text-accent" />
                </div>
              </div>
            </div>

            {/* Content zone — white */}
            <div className="bg-white px-7 py-6">
              <h3 className="font-heading font-bold text-lg text-textDark mb-5 group-hover:text-primary transition-colors duration-300">
                {study.title}
              </h3>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-primary/35 mb-2">Challenge</p>
                  <p className="text-sm font-body text-gray-600 leading-relaxed">{study.challenge}</p>
                </div>
                <div>
                  <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-primary/35 mb-2">Solution</p>
                  <p className="text-sm font-body text-gray-600 leading-relaxed">{study.solution}</p>
                </div>
              </div>
              <div className="mt-5 h-px bg-gradient-to-r from-primary/0 via-primary/8 to-primary/0 group-hover:via-accent/25 transition-all duration-500" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
