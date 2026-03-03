import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { num: '01', title: 'Understand goals & objectives', desc: 'Confirm scope and align with organizational vision.' },
  { num: '02', title: 'Understand current state', desc: 'Evaluate existing capabilities, challenges, and opportunities.' },
  { num: '03', title: 'Design visions', desc: 'Formulate interim and future state target architectures.' },
  { num: '04', title: 'Build recommendations', desc: 'Create roadmap timelines and a concrete Business Case/ROI.' },
  { num: '05', title: 'Execute the roadmap', desc: 'Deploy solutions, measure results continuously, and adapt.' },
  { num: '06', title: 'Governance & improvement', desc: 'Establish metrics and long-term continuous improvement protocols.' },
];

export default function Methodology() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const nodes = gsap.utils.toArray('.methodology-node');

      nodes.forEach((node, i) => {
        const isEven = i % 2 === 0;
        gsap.fromTo(
          node,
          { opacity: 0, y: 40, x: isEven ? -30 : 30 },
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: node,
              start: 'top 82%',
            },
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-16 md:py-20 w-full bg-textDark relative z-10">
      <div className="max-w-4xl mx-auto px-6 text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
          MTS Client Success Approach
        </h2>
        <p className="text-accent font-mono text-sm tracking-widest uppercase mb-12">
          Methodology Protocol
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-6 relative">
        {/* Vertical line */}
        <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 bg-gray-800 -translate-x-1/2" />

        <div className="flex flex-col gap-8 md:gap-12 relative">
          {steps.map((step, i) => {
            const isEven = i % 2 === 0;
            return (
              <div
                key={i}
                className={`methodology-node relative flex flex-col md:flex-row items-start md:items-center w-full ${
                  isEven ? 'md:justify-start' : 'md:justify-end'
                }`}
              >
                {/* Center node */}
                <div className="absolute left-[28px] md:left-1/2 w-8 h-8 rounded-full bg-primary border-4 border-textDark -translate-x-1/2 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(30,196,247,0.5)]">
                  <div className="w-2 h-2 bg-accent rounded-full" />
                </div>

                {/* Content card */}
                <div
                  className={`w-full md:w-[45%] pl-16 md:pl-0 ${
                    isEven ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'
                  }`}
                >
                  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100 hover:scale-[1.02] transition-transform duration-300 ease-magnetic">
                    <span className="text-accent font-mono font-bold text-sm mb-2 block tracking-widest">
                      PHASE {step.num}
                    </span>
                    <h3 className="text-xl font-heading font-bold text-primary mb-2">{step.title}</h3>
                    <p className="text-gray-600 font-body text-[15px] leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
