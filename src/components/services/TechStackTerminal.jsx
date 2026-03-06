import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Cloud, Cpu, Server } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    icon: Code2,
    label: 'Infrastructure as Code',
    desc: 'Automated, repeatable provisioning across cloud and on-prem — eliminating configuration drift at scale.',
    tools: ['Terraform', 'Ansible', 'Azure Bicep', 'ARM Templates'],
  },
  {
    icon: Cloud,
    label: 'Cloud Platforms',
    desc: 'Multi-cloud architecture, migration, and managed services across the three major hyperscalers.',
    tools: ['Microsoft Azure', 'Amazon AWS', 'Google Cloud'],
  },
  {
    icon: Cpu,
    label: 'Scripting & Automation',
    desc: 'Custom pipelines and integrations that eliminate manual operational overhead and accelerate delivery.',
    tools: ['Python 3.11+', 'PowerShell', 'Bash', 'ServiceNow'],
  },
  {
    icon: Server,
    label: 'Enterprise Platforms',
    desc: 'Deep hands-on expertise in the infrastructure platforms powering critical business operations.',
    tools: ['VMware', 'Red Hat Linux', 'Dell Technologies', 'Windows Server'],
  },
];

export default function TechStackTerminal() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ts-header',
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      );
      gsap.fromTo('.ts-card',
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 px-6 max-w-7xl mx-auto">

      {/* Header */}
      <div className="ts-header flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
        <div>
          <span className="font-mono text-[11px] text-accent tracking-[0.28em] uppercase block mb-4">
            Technology Proficiencies
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-textDark leading-tight">
            The Tools We Deploy
          </h2>
        </div>
        <p className="font-body text-base text-textDark/50 max-w-sm leading-relaxed">
          A curated stack of enterprise-grade technologies — selected for reliability,
          scalability, and proven results in production.
        </p>
      </div>

      {/* Category grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {categories.map((cat, i) => {
          const Icon = cat.icon;
          return (
            <div
              key={i}
              className="ts-card group relative rounded-[2rem] border border-primary/10 bg-white p-8 shadow-brand hover:shadow-brand-md hover:border-primary/20 transition-all duration-400"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-8 right-8 h-[2px] rounded-b-full bg-gradient-to-r from-accent/60 via-primary/30 to-transparent" />

              {/* Icon */}
              <div className="w-11 h-11 rounded-xl bg-primary/[0.06] border border-primary/10 flex items-center justify-center mb-6 group-hover:bg-accent/10 group-hover:border-accent/20 transition-colors duration-300">
                <Icon size={20} className="text-primary/60 group-hover:text-accent transition-colors duration-300" />
              </div>

              {/* Label */}
              <h3 className="font-heading font-bold text-xl text-textDark mb-2 leading-snug">
                {cat.label}
              </h3>

              {/* Description */}
              <p className="font-body text-sm text-textDark/50 leading-relaxed mb-7">
                {cat.desc}
              </p>

              {/* Tool chips */}
              <div className="flex flex-wrap gap-2">
                {cat.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1 rounded-full border border-primary/12 bg-primary/[0.04] font-mono text-[11px] text-primary/70 tracking-wide"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
