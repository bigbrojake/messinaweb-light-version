import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: '01',
    title: 'Workshops & Assessments',
    desc: "Comprehensive network analyses, 'As-Is' & 'To-Be' designs, Re-Designs, Get Well Plans, and Business Resiliency evaluations covering DR, HA, and Security.",
    features: ['Discovery / Roadmap Generation', 'Cloud / Network Simulators', 'Risk & Compliance Prep (PCI, HIPAA)'],
    tag: 'ANALYSIS',
  },
  {
    num: '02',
    title: 'Automation Execution',
    desc: 'End-to-end automation pipelines utilizing industry-standard infrastructure as code (IaC) and configuration management tooling.',
    features: ['Ansible & Terraform', 'Python & ARM/Bicep', 'ServiceNow Integration'],
    tag: 'IaC',
  },
  {
    num: '03',
    title: 'Version Upgrades',
    desc: 'Automated OS In-Place Upgrades reducing downtime and operational risk for legacy and modernized environments alike.',
    features: ['Windows & RHEL Upgrades', 'Automated Rollbacks', 'Pre/Post Validation'],
    tag: 'MIGRATION',
  },
  {
    num: '04',
    title: 'Migrations Factory (X2V)',
    desc: 'Fixed-fee workload migrations and data center consolidation handled by our specialized factory framework — predictable scope, predictable cost.',
    features: ['V2V & P2V Workloads', 'Cloud Migrations (Azure/AWS/GCP)', 'Oracle & SQL DB Migrations'],
    tag: 'FACTORY',
  },
];

export default function ServiceCatalog() {
  const [openIdx, setOpenIdx] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.svc-row',
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0,
          duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 78%' },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-6 max-w-7xl mx-auto relative z-10">
      {/* Header */}
      <div className="mb-20 grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-8 items-end">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="w-px h-8 bg-gradient-to-b from-accent to-primary/50" />
            <span className="font-mono text-[11px] tracking-[0.28em] text-accent uppercase">Capability Matrix</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-textDark leading-none">Summary<br />of Services</h2>
        </div>
        <p className="font-body text-gray-500 text-lg leading-relaxed md:pb-2">
          Four core disciplines that form the backbone of the MTS delivery model — from roadmap through execution.
        </p>
      </div>

      {/* Accordion rows */}
      <div className="flex flex-col border-t border-primary/8">
        {services.map((svc, i) => {
          const isOpen = openIdx === i;
          return (
            <div key={i} className="svc-row border-b border-primary/8">
              {/* Row header — clickable */}
              <button
                onClick={() => setOpenIdx(isOpen ? -1 : i)}
                className="w-full flex items-center gap-6 md:gap-10 py-8 text-left group"
              >
                {/* Decorative number */}
                <span className={`font-heading font-black text-[3.5rem] md:text-[4.5rem] leading-none tracking-tight shrink-0 transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-primary/12 group-hover:text-primary/30'}`}>
                  {svc.num}
                </span>

                {/* Title + tag */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className={`font-mono text-[9px] tracking-[0.22em] uppercase transition-colors duration-300 ${isOpen ? 'text-accent' : 'text-primary/30'}`}>
                      {svc.tag}
                    </span>
                  </div>
                  <h3 className={`font-heading font-bold text-xl md:text-2xl transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-textDark/70 group-hover:text-textDark'}`}>
                    {svc.title}
                  </h3>
                </div>

                {/* Toggle */}
                <div className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'bg-primary border-primary text-white' : 'border-primary/20 text-primary/40 group-hover:border-primary/40 group-hover:text-primary/60'}`}>
                  {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                </div>
              </button>

              {/* Expandable content */}
              <div
                style={{
                  maxHeight: isOpen ? '400px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <div className="pb-10 pl-0 md:pl-[calc(4.5rem+2.5rem)] grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-10">
                  <div>
                    <p className="font-body text-gray-600 text-base leading-relaxed mb-8">{svc.desc}</p>
                    <div className="flex flex-col gap-3">
                      <p className="font-mono text-[9px] tracking-[0.25em] text-primary/35 uppercase mb-1">Deliverables</p>
                      {svc.features.map((feat, fi) => (
                        <div key={fi} className="flex items-center gap-3">
                          <span className="w-8 h-px bg-accent/45 shrink-0" />
                          <span className="font-mono text-sm font-semibold text-textDark">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Tag badge panel */}
                  <div className="flex items-start justify-end">
                    <div className="bg-[#F5F9FF] border border-primary/8 rounded-2xl px-6 py-4 text-right">
                      <p className="font-mono text-[9px] tracking-[0.25em] text-primary/35 uppercase mb-1">Service Type</p>
                      <p className="font-heading font-bold text-2xl text-primary">{svc.tag}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
