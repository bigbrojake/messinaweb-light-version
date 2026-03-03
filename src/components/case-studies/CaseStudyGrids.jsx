import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const studies = [
  {
    industry: 'Energy',
    title: 'Data Center Consolidation',
    challenge: 'Legacy infrastructure fragmented across 4 non-compliant facilities causing 18% availability downtime.',
    solution: 'Full P2V and V2V migration to a centralized, redundant facility running updated Windows/RHEL.',
    img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop',
  },
  {
    industry: 'Healthcare',
    title: 'Epic Systems High-Availability',
    challenge: 'Critical care systems at risk of split-brain failure during failover events.',
    solution: 'Redesigned storage replication and automated DR via Terraform with sub-minute RTO validation.',
    img: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=2128&auto=format&fit=crop',
  },
  {
    industry: 'Federal',
    title: 'Zero-Trust Infrastructure',
    challenge: 'Massive security debt pre-audit restricting operations access across agencies.',
    solution: 'Deployed hardened RHEL environments and restricted access controls via ServiceNow automation.',
    img: 'https://images.unsplash.com/photo-1541888001602-5c0240d12521?q=80&w=2069&auto=format&fit=crop',
  },
  {
    industry: 'Retail',
    title: 'Peak-Season Elasticity',
    challenge: 'Inability to scale resources dynamically during Black Friday traffic spikes.',
    solution: 'Migrated edge services to Azure via Bicep templates allowing instant scaling profiles.',
    img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop',
  },
];

export default function CaseStudyGrids() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.study-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="pb-24 pt-8 px-6 w-full max-w-7xl mx-auto relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {studies.map((study, i) => (
          <div key={i} className="study-card group flex flex-col gap-6 cursor-pointer">
            <div className="w-full aspect-video rounded-[2rem] overflow-hidden relative shadow-lg">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-magnetic group-hover:scale-105"
                style={{ backgroundImage: `url("${study.img}")` }}
              />
              <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-40 mix-blend-multiply transition-opacity duration-500" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full font-mono text-xs font-bold text-primary shadow-sm tracking-widest uppercase">
                {study.industry}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-heading font-bold text-primary">{study.title}</h3>
                <div className="w-10 h-10 rounded-full bg-surface border border-gray-200 flex items-center justify-center -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                  <ArrowRight size={20} className="text-accent" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                <div>
                  <h4 className="font-mono text-xs font-bold tracking-widest uppercase text-gray-400 mb-2">
                    Challenge
                  </h4>
                  <p className="text-sm font-body text-gray-600 leading-relaxed">{study.challenge}</p>
                </div>
                <div>
                  <h4 className="font-mono text-xs font-bold tracking-widest uppercase text-gray-400 mb-2">
                    Deployed Solution
                  </h4>
                  <p className="text-sm font-body text-gray-600 leading-relaxed">{study.solution}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
