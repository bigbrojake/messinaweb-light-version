import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { label: 'Productivity Gain', prefix: '$', suffix: 'M' },
  { label: 'Downtime Reduction', prefix: '', suffix: '%' },
  { label: 'Cost Savings', prefix: '', suffix: '%' },
];

export default function RoiDashboard() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 75%',
        onEnter: () => {
          gsap.fromTo('.metric-card',
            { scale: 0.95, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out' }
          );
        },
        once: true,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 px-6 max-w-7xl mx-auto w-full border-t border-gray-100 mt-12">
      <div className="mb-20 text-center">
        <h1 className="text-sm font-mono tracking-widest uppercase text-accent font-semibold mb-4">
          The Impact Archive
        </h1>
        <h2 className="text-5xl md:text-7xl font-heading font-black text-textDark uppercase tracking-tighter">
          ROI Dashboards
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {metrics.map((m, i) => (
          <div
            key={i}
            className="metric-card relative bg-white text-textDark p-12 rounded-[3rem] text-center flex flex-col items-center justify-center border border-gray-100 shadow-[0_4px_32px_rgba(10,52,138,0.08)] hover:shadow-[0_8px_48px_rgba(10,52,138,0.14)] transition-shadow duration-500 opacity-0 overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary/60 rounded-t-[3rem]" />
            <div
              className="flex items-baseline mb-4 font-heading font-bold"
              style={{ minHeight: '80px' }}
            >
              <span className="text-4xl text-accent/30">{m.prefix}</span>
              <span className="text-7xl md:text-8xl tracking-tighter text-gray-200 select-none">—</span>
              <span className="text-5xl text-accent/30">{m.suffix}</span>
            </div>
            <h3 className="font-mono text-sm tracking-widest uppercase text-textDark/70">{m.label}</h3>
            <p className="font-body text-xs text-gray-400 mt-2 tracking-wide">Data pending</p>
          </div>
        ))}
      </div>
    </section>
  );
}
