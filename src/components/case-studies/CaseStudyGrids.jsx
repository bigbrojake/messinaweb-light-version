import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const studies = [
  {
    num: '01',
    industry: 'Energy / Oil & Gas',
    title: 'IT Transformation',
    context: 'One of the world\'s largest publicly traded energy providers and chemical manufacturers.',
    challenge: 'Transform service management and delivery with measurable, consistent, and integrated processes and automation across a complex multi-cloud environment.',
    outcomes: [
      '$11M gain in employee productivity',
      'Zero-Trust security enhancements deployed enterprise-wide',
      'ITaaS model with multi-cloud enablement fully realized',
    ],
    disciplines: ['Service Management', 'Process Automation', 'IT Finance', 'Strategy', 'Org Design'],
    metric: '$11M', metricLabel: 'Productivity Gain',
    img: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?q=80&w=2070&auto=format&fit=crop',
  },
  {
    num: '02',
    industry: 'Insurance / Healthcare',
    title: 'IT Modernization & Cloud Strategy',
    context: 'A nationwide federation of locally operated health insurance companies navigating 15+ M&A over a decade.',
    challenge: 'Develop and implement a cloud strategy and IT-as-a-Service operating model with full cost transparency after aggressive cloud adoption without data or platform strategy.',
    outcomes: [
      '33% cost savings from application rationalization',
      '20% productivity increase through new org roles',
      'CMDB optimization and chargeback/showback implemented',
    ],
    disciplines: ['Process Automation', 'Platform Strategy', 'IT Finance', 'CMDB Optimization', 'Change Management'],
    metric: '33%', metricLabel: 'Cost Savings',
    img: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=2070&auto=format&fit=crop',
  },
  {
    num: '03',
    industry: 'Federal Agency',
    title: 'IT Operating Model Design',
    context: 'Independent agency of the US government responsible for postal services nationwide.',
    challenge: 'Plan and implement a modern IT operating model to improve data governance and customer service delivery against competitive and mission pressures.',
    outcomes: [
      'Customer-centric, elastic ITaaS operating model deployed',
      'Automated and integrated processes via ServiceNow',
      'New IT organization with Service Catalog and Service Management Office',
    ],
    disciplines: ['Service Management', 'Org Design', 'Process Development', 'Change Management'],
    metric: 'ITaaS', metricLabel: 'Operating Model',
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2070&auto=format&fit=crop',
  },
  {
    num: '04',
    industry: 'Online Trading',
    title: 'Service Center Design & Automation',
    context: 'Investment brokerage and electronic trading platform with no cost transparency or trust between business and IT.',
    challenge: 'Improve customer service with standardized processes, defined SLAs, and end-to-end automation across a fragmented IT service delivery model.',
    outcomes: [
      'Service Catalog with taxonomy, definitions, and provisioning workflows',
      'SLA/OLA templates, KPI dashboards, and service charters delivered',
      'Actionable automation roadmap guiding IT prioritization',
    ],
    disciplines: ['Service Design', 'Process Improvement', 'Org Design', 'ServiceNow', 'Change Management'],
    metric: 'SLA+', metricLabel: 'Service Excellence',
    img: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=2070&auto=format&fit=crop',
  },
  {
    num: '05',
    industry: 'Retail',
    title: 'Zero-Trust Security & Workforce Modernization',
    context: 'American multinational discount retailer with 2M+ employees across 10,500 stores in 24 countries.',
    challenge: 'Increase competitive position against cloud-native rivals by improving workforce productivity at scale — with minimal disruption and security front and center.',
    outcomes: [
      '168% return on investment',
      '$1.6M saved from 50% reduction in unplanned downtime',
      '60% facilities savings and 40% power savings',
      '8 FTE redirected; $1.7M end-user productivity gain',
    ],
    disciplines: ['Zero-Trust Security', 'Persona Design', 'Access Management', 'Change Management'],
    metric: '168%', metricLabel: 'Return on Investment',
    img: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop',
  },
  {
    num: '06',
    industry: 'Financial Services',
    title: 'Application Mobility & Multi-Cloud Strategy',
    context: 'One of the oldest American global financial services and banking companies with a large legacy environment.',
    challenge: 'Design a reference architecture, operating model, and executable roadmap for a new multi-cloud strategy while cutting OPEX significantly over 3 years.',
    outcomes: [
      'Cohesive roadmap across people, process, apps, and infrastructure',
      'New IT service model built on supply/demand framework',
      'Change management program driving awareness and adoption',
    ],
    disciplines: ['Operating Model', 'Service Management', 'App Architecture', 'DevOps', 'Change Management'],
    metric: 'Multi-Cloud', metricLabel: 'Platform Strategy',
    img: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=2070&auto=format&fit=crop',
  },
  {
    num: '07',
    industry: 'Hospitality & Entertainment',
    title: 'Commercial IIoT Strategy',
    context: 'A technologically advanced international company evaluating commercialization of an internally built IIoT product.',
    challenge: 'Develop a robust strategy and business case for taking an internally developed IIoT ride-safety product to market across new industries and geographies.',
    outcomes: [
      'Full commercialization strategy addressing all product lifecycle stages',
      'Business case with significant market growth potential validated',
      'Roadmap for partner selection, product hardening, and global launch',
    ],
    disciplines: ['Business Strategy', 'Enterprise Architecture', 'AI/ML', 'Data Management', 'Sales & Marketing'],
    metric: 'IIoT', metricLabel: 'Commercial Strategy',
    img: 'https://images.unsplash.com/photo-1557264337-e8a93017fe92?q=80&w=2070&auto=format&fit=crop',
  },
];

export default function CaseStudyGrids() {
  const [active, setActive] = useState(0);
  const cardRef = useRef(null);
  const sectionRef = useRef(null);

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cs-header',
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      );
      gsap.fromTo('.cs-card-wrap',
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  function goTo(i) {
    if (i === active || !cardRef.current) return;
    const dir = i > active ? 1 : -1;
    gsap.to(cardRef.current, {
      opacity: 0, x: -40 * dir, duration: 0.2, ease: 'power2.in',
      onComplete: () => {
        setActive(i);
        gsap.fromTo(cardRef.current,
          { opacity: 0, x: 40 * dir },
          { opacity: 1, x: 0, duration: 0.35, ease: 'power3.out' }
        );
      },
    });
  }

  const study = studies[active];

  const navBtnCls = (disabled) =>
    'w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-250 ' +
    'bg-white/[0.08] border-white/20 text-white/60 ' +
    'hover:bg-white/15 hover:border-white/40 hover:text-white ' +
    (disabled ? 'opacity-25 pointer-events-none' : '');

  return (
    <section ref={sectionRef} className="pt-28 pb-24 px-6" style={{ background: '#050d1a' }}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="cs-header flex items-end justify-between mb-10">
          <div>
            <span className="font-mono text-[11px] text-accent tracking-[0.28em] uppercase block mb-4">
              Impact Archive
            </span>
            <h2 className="font-heading font-black text-4xl md:text-5xl text-white leading-none">
              Outcomes That Speak.
            </h2>
          </div>
          <span className="font-mono text-[10px] text-white/25 tracking-widest hidden md:block">
            {studies.length} Case Studies
          </span>
        </div>

        {/* Card */}
        <div className="cs-card-wrap">
          <div
            ref={cardRef}
            className="rounded-[2rem] overflow-hidden border"
            style={{
              borderColor: 'rgba(30,196,247,0.12)',
              background: '#0d1b2e',
              boxShadow: '0 24px 80px rgba(5,13,26,0.6), 0 0 0 1px rgba(30,196,247,0.06)',
            }}
          >
            {/* Image strip */}
            <div className="relative w-full overflow-hidden" style={{ height: '220px' }}>
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url("${study.img}")`,
                  filter: 'blur(6px) saturate(0.6) brightness(0.5)',
                  transform: 'scale(1.08)',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b2e] via-[#0d1b2e]/40 to-transparent" />

              {/* Industry + metric overlay */}
              <div className="absolute inset-x-0 bottom-0 px-8 pb-5 flex items-end justify-between">
                <span className="font-mono text-[10px] text-accent tracking-[0.22em] uppercase">
                  {study.industry}
                </span>
                <div className="text-right">
                  <span
                    className="font-heading font-black text-white leading-none block"
                    style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', textShadow: '0 0 30px rgba(30,196,247,0.3)' }}
                  >
                    {study.metric}
                  </span>
                  <span className="font-mono text-[9px] text-white/40 tracking-widest uppercase">
                    {study.metricLabel}
                  </span>
                </div>
              </div>
            </div>

            {/* Content — fixed height prevents layout shift between cards */}
            <div className="px-8 pt-6 pb-8" style={{ height: '380px', overflow: 'hidden' }}>
              {/* Title + case number */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <h3 className="font-heading font-bold text-xl text-white leading-tight">
                  {study.title}
                </h3>
                <span className="font-mono text-[10px] text-white/20 tracking-widest shrink-0 mt-1">
                  {study.num} / {String(studies.length).padStart(2, '0')}
                </span>
              </div>

              {/* Two-column content grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Left: Challenge + Context */}
                <div>
                  <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-accent/50 mb-2">The Challenge</p>
                  <p className="text-sm font-body text-white/65 leading-relaxed mb-4">{study.challenge}</p>
                  <p className="text-xs font-body text-white/30 leading-relaxed italic">{study.context}</p>
                </div>

                {/* Right: Outcomes + Disciplines */}
                <div>
                  <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-accent/50 mb-2">Key Outcomes</p>
                  <ul className="flex flex-col gap-2 mb-5">
                    {study.outcomes.map((o, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm font-body text-white/65 leading-relaxed">
                        <span className="w-1 h-1 rounded-full bg-accent/50 shrink-0 mt-2" />
                        {o}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5">
                    {study.disciplines.map((d) => (
                      <span
                        key={d}
                        className="px-2.5 py-1 rounded-full font-mono text-[10px] tracking-wide"
                        style={{
                          background: 'rgba(30,196,247,0.07)',
                          border: '1px solid rgba(30,196,247,0.15)',
                          color: 'rgba(30,196,247,0.6)',
                        }}
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-6 flex items-center justify-between">

            {/* Dot indicators */}
            <div className="flex items-center gap-1.5">
              {studies.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="transition-all duration-250 rounded-full"
                  style={{
                    width: i === active ? '20px' : '6px',
                    height: '6px',
                    background: i === active ? '#1EC4F7' : 'rgba(255,255,255,0.2)',
                  }}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => goTo(active - 1)}
                className={navBtnCls(active === 0)}
                style={{ boxShadow: active === 0 ? 'none' : '0 0 10px rgba(255,255,255,0.12), 0 0 20px rgba(255,255,255,0.06)' }}
              >
                <ChevronLeft size={14} strokeWidth={2.2} />
              </button>
              <span className="font-mono text-[10px] text-white/30 tracking-[0.15em] min-w-[40px] text-center">
                {String(active + 1).padStart(2, '0')} / {String(studies.length).padStart(2, '0')}
              </span>
              <button
                onClick={() => goTo(active + 1)}
                className={navBtnCls(active === studies.length - 1)}
                style={{ boxShadow: active === studies.length - 1 ? 'none' : '0 0 10px rgba(255,255,255,0.12), 0 0 20px rgba(255,255,255,0.06)' }}
              >
                <ChevronRight size={14} strokeWidth={2.2} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
