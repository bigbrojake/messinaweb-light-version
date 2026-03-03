import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { value: 11, label: 'Productivity Gain', prefix: '$', suffix: 'M', duration: 2.5 },
  { value: 50, label: 'Downtime Reduction', prefix: '', suffix: '%', duration: 2.0 },
  { value: 33, label: 'Cost Savings', prefix: '', suffix: '%', duration: 1.5 },
];

export default function RoiDashboard() {
  const containerRef = useRef(null);
  const metricRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      metrics.forEach((metric, i) => {
        const el = metricRefs.current[i];
        if (!el) return;

        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top 75%',
          onEnter: () => {
            gsap.fromTo(
              el.closest('.metric-card'),
              { scale: 0.95, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.7, delay: i * 0.12, ease: 'power3.out' }
            );
            gsap.to(el, {
              innerText: metric.value,
              duration: metric.duration,
              snap: { innerText: 1 },
              ease: 'power3.out',
            });
          },
          once: true,
        });
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
        <h2 className="text-5xl md:text-7xl font-heading font-black text-primary uppercase tracking-tighter">
          ROI Dashboards
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {metrics.map((m, i) => (
          <div
            key={i}
            className="metric-card bg-textDark text-white p-12 rounded-[3rem] text-center flex flex-col items-center justify-center shadow-2xl opacity-0"
          >
            <div
              className="flex items-baseline mb-4 font-heading font-bold overflow-hidden"
              style={{ minHeight: '80px' }}
            >
              <span className="text-4xl text-accent">{m.prefix}</span>
              <span ref={(el) => (metricRefs.current[i] = el)} className="text-7xl md:text-8xl tracking-tighter">
                0
              </span>
              <span className="text-5xl text-accent">{m.suffix}</span>
            </div>
            <h3 className="font-mono text-sm tracking-widest uppercase opacity-80">{m.label}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
