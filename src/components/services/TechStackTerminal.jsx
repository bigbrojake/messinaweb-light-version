import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const clusters = [
  {
    id: 'cloud',
    label: 'Cloud & Platform',
    shortDesc: 'Multi-cloud architecture, Microsoft 365, and enterprise virtualization across Azure, Google, and VMware.',
    services: [
      {
        label: 'Microsoft Consulting Services',
        desc: 'Full-stack Microsoft advisory and implementation covering M365, identity, Dynamics 365, and platform infrastructure.',
        chips: ['O365 & Products', 'Entra ID (Azure AD)', 'D365 Application Services', 'Windows Server', 'Hypervisors'],
      },
      {
        label: 'Azure & Google Consulting',
        desc: 'Cloud architecture, modernization, and Day 2 operations across Azure and Google Cloud — from lift-and-shift to cloud-native containerized workloads.',
        chips: ['IaaS / PaaS / CaaS', 'DevOps & DevSecOps', 'Cost Optimization', 'Containerization', 'Virtual Desktop', 'Day 2 Admin'],
      },
      {
        label: 'VMware',
        desc: 'Comprehensive VMware consulting, migration, and modernization services including containerization, network micro-segmentation, and multi-site recovery.',
        chips: ['Azure VMware Solutions', 'Migrations', 'Tanzu Containerization', 'NSX Micro-Segmentation', 'VCF 9.X', 'ARIA Suite', 'SRM / Live Recovery'],
      },
    ],
  },
  {
    id: 'infra',
    label: 'Infrastructure & Migration',
    shortDesc: 'Fixed-fee workload migrations, automated OS upgrades, and Red Hat platform services — outcome-driven, no hourly billing.',
    services: [
      {
        label: 'Migration Factory',
        desc: 'Fixed-fee, outcome-driven workload migrations across virtual, physical, cloud, and database platforms. Predictable scope, predictable cost.',
        chips: ['X2V / P2V / V2C', 'Cross-Platform', 'Azure Local & Nutanix', 'SQL & Oracle DB', 'Storage & Data Mgmt', 'Fixed-Fee Pricing'],
      },
      {
        label: 'Automated OS Upgrades',
        desc: 'Fixed-fee, automated in-place OS upgrade services for Windows and Red Hat environments. US-based resources available 7x24x365.',
        chips: ['Windows 2022', 'Red Hat 9', 'Fixed Fee', 'Automation', 'US-Based 7x24x365'],
      },
      {
        label: 'Red Hat Services',
        desc: 'Workshops, migrations, Day 2 administration, and automation across the full Red Hat portfolio including OpenShift, OpenStack, and Ansible.',
        chips: ['OpenShift', 'OpenStack', 'Ansible Automation Platform', 'Automated Migrations', 'ServiceNow', 'Day 2 Services'],
      },
    ],
  },
  {
    id: 'automation',
    label: 'Automation & Networks',
    shortDesc: 'Process automation, network assessment and design, and 7x24x365 managed operations.',
    services: [
      {
        label: 'Process Design & Automation',
        desc: 'Define, design, and automate IT service processes — from initial blueprinting through version upgrades and ongoing operational migrations.',
        chips: ['Process Definition', 'Design & Implement', 'Automate', 'Version Upgrades', 'Migrations'],
      },
      {
        label: 'Network Assessments',
        desc: 'Current-state analysis, architecture redesign, and business resiliency planning for enterprise network environments.',
        chips: ['As-Is & To-Be Designs', 'Re-Designs', 'Get Well Plans', 'DR & HA', 'Security Resiliency'],
      },
      {
        label: 'Managed Services',
        desc: 'Onshore and offshore 7x24x365 managed support with L1–L3 engineers, flexible Staffing-aaS models, and continuous process improvement.',
        chips: ['7x24x365 Coverage', 'L1 / L2 / L3 Support', 'Staffing-aaS', 'Process Automation'],
      },
    ],
  },
  {
    id: 'ai',
    label: 'AI, Data & Security',
    shortDesc: 'GenAI strategy, data governance, and end-to-end cyber resilience programs.',
    services: [
      {
        label: 'AI/ML & Data',
        desc: 'End-to-end AI and data strategy — from stakeholder alignment and use case identification through data governance, GenAI implementation, and Agentic AI deployment.',
        chips: ['Use Case Identification', 'Data Governance', 'GenAI Strategy & Implementation', 'Agentic AI', 'Data Foundations'],
      },
      {
        label: 'Resilience & Cyber Security',
        desc: 'Holistic security and resilience programs covering risk assessment, protection architecture, recovery solutions, and ongoing contingency planning and testing.',
        chips: ['Cyber Risk Assessment', 'Protection Services', 'Business Impact Analysis', 'Security Risk Framework', 'Contingency Planning'],
      },
    ],
  },
  {
    id: 'strategy',
    label: 'Strategy & Transformation',
    shortDesc: 'Enterprise roadmaps, operating model design, and organizational transformation programs.',
    services: [
      {
        label: 'Applications',
        desc: 'Application rationalization, modernization, migration, and development — aligned to business goals and long-term platform strategy.',
        chips: ['App Rationalization', 'App Modernization', 'Migration & Development'],
      },
      {
        label: 'Strategy & Roadmaps',
        desc: 'Structured strategy workshops and executable technology roadmaps grounded in rigorous business case and ROI analysis.',
        chips: ['Strategy Development Workshop', 'Executable Roadmap', 'Business Case & ROI'],
      },
      {
        label: 'Technology Planning & Implementation',
        desc: 'Platform strategy development and end-to-end design and implementation of enterprise technology platforms.',
        chips: ['Platform Strategy & Roadmap', 'Platform Design & Implementation'],
      },
      {
        label: 'Centers of Excellence',
        desc: 'Build and operate PMO and CISO centers of excellence — establishing governance frameworks, standards, and leadership capability.',
        chips: ['PMO-as-a-Service', 'CISO-as-a-Service', 'Build Out & Operate'],
      },
      {
        label: 'Operating Model',
        desc: 'ITIL-aligned operating model design covering process automation, organizational structure, governance, and financial modeling.',
        chips: ['ITIL Optimization', 'Organizational Design', 'Human Change Mgmt', 'Governance & Metrics', 'Financial Modeling'],
      },
    ],
  },
];

export default function TechStackTerminal() {
  const [activeCluster, setActiveCluster] = useState(0);
  const sectionRef = useRef(null);
  const panelRef   = useRef(null);

  // Scroll entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cap-header',
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      );
      gsap.fromTo('.cap-body',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Panel fade when cluster changes
  useEffect(() => {
    if (!panelRef.current) return;
    gsap.fromTo(panelRef.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.22, ease: 'power2.out' }
    );
  }, [activeCluster]);

  function selectCluster(idx) {
    if (idx === activeCluster) return;
    setActiveCluster(idx);
  }

  const cluster = clusters[activeCluster];

  return (
    <section ref={sectionRef} className="py-28 px-6 max-w-7xl mx-auto">

      {/* Section header */}
      <div className="cap-header flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
        <div>
          <span className="font-mono text-[11px] text-accent tracking-[0.28em] uppercase block mb-4">
            Service Capabilities
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-textDark leading-tight">
            Deep Expertise.<br />Flexible Delivery.
          </h2>
        </div>
        <p className="font-body text-base text-textDark/75 max-w-sm leading-relaxed">
          With 25+ years of enterprise IT experience, we bring the right solution for your environment, not a one-size-fits-all approach.
        </p>
      </div>

      <div className="cap-body">

        {/* Mobile: horizontal tab strip */}
        <div className="lg:hidden overflow-x-auto flex gap-2 pb-3 mb-8 -mx-6 px-6">
          {clusters.map((c, i) => (
            <button
              key={c.id}
              onClick={() => selectCluster(i)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-heading font-semibold transition-all duration-250 border ${
                activeCluster === i
                  ? 'bg-primary text-white border-primary shadow-brand'
                  : 'bg-white text-textDark/75 border-primary/12 hover:border-primary/25 hover:text-textDark'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Desktop: sticky left rail + right panel */}
        <div className="flex gap-12 lg:gap-16">

          {/* Left rail */}
          <div className="hidden lg:block w-52 shrink-0">
            <div className="sticky top-28 flex flex-col gap-1">
              {clusters.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => selectCluster(i)}
                  className={`w-full text-left px-4 py-3.5 rounded-xl transition-all duration-250 relative ${
                    activeCluster === i
                      ? 'bg-primary/[0.05] text-primary'
                      : 'text-textDark/75 hover:text-textDark hover:bg-primary/[0.025]'
                  }`}
                >
                  {activeCluster === i && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-accent rounded-r-full" />
                  )}
                  <span className="font-heading font-semibold text-sm block leading-snug">
                    {c.label}
                  </span>
                  <span className={`font-mono text-[10px] tracking-wide mt-0.5 block ${
                    activeCluster === i ? 'text-accent/70' : 'text-textDark/55'
                  }`}>
                    {c.services.length} {c.services.length === 1 ? 'service' : 'services'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right panel */}
          <div ref={panelRef} className="flex-1 min-w-0">

            {/* Cluster intro */}
            <div className="mb-8 pb-8 border-b border-primary/8">
              <span className="font-mono text-[10px] tracking-[0.25em] text-accent uppercase block mb-2">
                {cluster.services.length} {cluster.services.length === 1 ? 'service' : 'services'}
              </span>
              <h3 className="font-heading font-bold text-2xl text-textDark mb-2">
                {cluster.label}
              </h3>
              <p className="font-body text-sm text-textDark/75 leading-relaxed max-w-xl">
                {cluster.shortDesc}
              </p>
            </div>

            {/* Service rows */}
            <div className="flex flex-col">
              {cluster.services.map((svc) => (
                <div
                  key={svc.label}
                  className="py-8 border-b border-primary/10 last:border-b-0"
                >
                  <h4 className="font-heading font-semibold text-base text-textDark mb-2.5">
                    {svc.label}
                  </h4>
                  <p className="font-body text-sm text-textDark/75 leading-relaxed mb-4 max-w-3xl">
                    {svc.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {svc.chips.map(chip => (
                      <span
                        key={chip}
                        className="px-2.5 py-1 rounded-full border border-primary/15 bg-primary/[0.02] font-mono text-[10px] text-primary/75 tracking-wide"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* CTA footer */}
      <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-6 pt-10 border-t border-primary/8">
        <div>
          <p className="font-heading font-semibold text-textDark text-lg">See something that fits your environment?</p>
          <p className="font-body text-sm text-textDark/75 mt-1">
            Most engagements start with a single conversation. Let's scope the right approach together.
          </p>
        </div>
        <a
          href="/contact"
          className="magnetic-btn inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-primary text-white font-heading font-semibold text-sm shadow-brand-md hover:shadow-brand-lg transition-shadow duration-300 shrink-0"
        >
          Start the Conversation
          <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs">→</span>
        </a>
      </div>

    </section>
  );
}
