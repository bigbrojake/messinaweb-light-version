import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRightLeft, Building2, Cloud, RefreshCw, Terminal,
  GitBranch, Layers, Headphones, Network, BrainCircuit,
  ShieldCheck, Code2, Map, Cpu, Award, Settings2,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    icon: ArrowRightLeft,
    label: 'Migration Factory',
    desc: 'Fixed-fee, outcome-driven workload migrations across virtual, physical, cloud, and database platforms — no hourly billing.',
    chips: ['X2V / P2V / V2C', 'Cross-Platform', 'Azure Local & Nutanix', 'SQL & Oracle DB', 'Storage & Data Mgmt', 'Fixed-Fee Pricing'],
  },
  {
    icon: Building2,
    label: 'Microsoft Consulting Services',
    desc: 'Full-stack Microsoft advisory and implementation covering M365, identity, Dynamics 365, and platform infrastructure.',
    chips: ['O365 & Products', 'Entra ID (Azure AD)', 'D365 Application Services', 'Windows Server', 'Hypervisors'],
  },
  {
    icon: Cloud,
    label: 'Azure & Google Consulting',
    desc: 'Cloud architecture, modernization, and Day 2 operations across Azure and Google Cloud — from lift-and-shift to cloud-native.',
    chips: ['IaaS / PaaS / CaaS', 'DevOps & DevSecOps', 'Cost Optimization', 'Containerization', 'Virtual Desktop', 'Day 2 Admin'],
  },
  {
    icon: RefreshCw,
    label: 'Automated OS Upgrades',
    desc: 'Fixed-fee, automated in-place OS upgrade services for Windows and Red Hat environments — US-based resources, 7x24x365.',
    chips: ['Windows 2022', 'Red Hat 9', 'Fixed Fee', 'Automation', 'US-Based 7x24x365'],
  },
  {
    icon: Terminal,
    label: 'Red Hat Services',
    desc: 'Workshops, migrations, Day 2 administration, and automation across the full Red Hat portfolio.',
    chips: ['OpenShift', 'OpenStack', 'Ansible Automation Platform', 'Automated Migrations', 'ServiceNow', 'Day 2 Services'],
  },
  {
    icon: GitBranch,
    label: 'Process Design & Automation',
    desc: 'Define, implement, and automate IT service processes — from initial design through version upgrades and migrations.',
    chips: ['Process Definition', 'Design & Implement', 'Automate', 'Version Upgrades', 'Migrations'],
  },
  {
    icon: Layers,
    label: 'VMware',
    desc: 'Comprehensive VMware consulting, migration, and modernization services including containerization and multi-site recovery.',
    chips: ['Azure VMware Solutions', 'Migrations', 'Tanzu Containerization', 'NSX Micro-Segmentation', 'VCF 9.X', 'ARIA Suite', 'SRM / Live Recovery'],
  },
  {
    icon: Headphones,
    label: 'Managed Services',
    desc: 'Onshore and offshore 7x24x365 managed support with L1–L3 engineers, Staffing-aaS, and continuous process improvement.',
    chips: ['7x24x365 Coverage', 'L1 / L2 / L3 Support', 'Staffing-aaS', 'Process Automation', 'Network Assessment'],
  },
  {
    icon: Network,
    label: 'Network Assessments',
    desc: 'Current-state analysis, redesign, and business resiliency planning for enterprise network environments.',
    chips: ['As-Is & To-Be Designs', 'Re-Designs', 'Get Well Plans', 'DR & HA', 'Security Resiliency'],
  },
  {
    icon: BrainCircuit,
    label: 'AI/ML & Data',
    desc: 'End-to-end AI and data strategy — from use case identification and data governance to GenAI and Agentic AI implementation.',
    chips: ['Use Case Identification', 'Data Governance', 'GenAI Strategy', 'Agentic AI', 'Data Foundations'],
  },
  {
    icon: ShieldCheck,
    label: 'Resilience & Cyber Security',
    desc: 'Holistic security and resilience programs covering risk assessment, protection, recovery, and contingency planning.',
    chips: ['Cyber Risk Assessment', 'Protection Services', 'Business Impact Analysis', 'Security Risk Framework', 'Contingency Planning'],
  },
  {
    icon: Code2,
    label: 'Applications',
    desc: 'Application rationalization, modernization, migration, and development — aligned to business goals and long-term platform strategy.',
    chips: ['App Rationalization', 'App Modernization', 'Migration & Development'],
  },
  {
    icon: Map,
    label: 'Strategy & Roadmaps',
    desc: 'Structured strategy workshops and executable technology roadmaps grounded in business case and ROI analysis.',
    chips: ['Strategy Workshops', 'Executable Roadmap', 'Business Case & ROI'],
  },
  {
    icon: Cpu,
    label: 'Technology Planning & Implementation',
    desc: 'Platform strategy development and end-to-end design and implementation of enterprise technology platforms.',
    chips: ['Platform Strategy & Roadmap', 'Platform Design & Implementation'],
  },
  {
    icon: Award,
    label: 'Centers of Excellence',
    desc: 'Build and operate PMO and CISO centers of excellence — establishing governance, standards, and leadership capability.',
    chips: ['PMO-as-a-Service', 'CISO-as-a-Service', 'Build Out & Operate'],
  },
  {
    icon: Settings2,
    label: 'Operating Model',
    desc: 'ITIL-aligned operating model design covering process automation, organizational structure, governance, and financial modeling.',
    chips: ['ITIL Optimization', 'Organizational Design', 'Human Change Mgmt', 'Governance & Metrics', 'Financial Modeling'],
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
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.07, ease: 'power3.out',
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
            Service Capabilities
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-textDark leading-tight">
            What We Deliver
          </h2>
        </div>
        <p className="font-body text-base text-textDark/50 max-w-sm leading-relaxed">
          End-to-end capabilities across infrastructure, cloud, security, AI, and enterprise
          transformation — all under one roof.
        </p>
      </div>

      {/* Category grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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

              {/* Chips */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {cat.chips.map((chip) => (
                  <span
                    key={chip}
                    className="px-3 py-1 rounded-full border border-primary/12 bg-primary/[0.04] font-mono text-[11px] text-primary/70 tracking-wide"
                  >
                    {chip}
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
