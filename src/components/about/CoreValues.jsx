import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const values = [
  { title: 'Agile & Efficient' },
  { title: 'Relationship-First' },
  { title: 'Innovation-Driven' },
];

export default function CoreValues() {
  const containerRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll-triggered entrance
      gsap.fromTo(
        '.value-title',
        { opacity: 0, y: 50, clipPath: 'inset(100% 0 0 0)' },
        {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0% 0 0 0)',
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
        }
      );

      // GSAP-powered hover (replaces inline handlers)
      itemRefs.current.forEach((el) => {
        if (!el) return;

        const enterAnim = gsap.to(el, {
          color: '#0A348A',
          x: '2rem',
          duration: 0.5,
          ease: 'power2.out',
          paused: true,
        });

        el.addEventListener('mouseenter', () => enterAnim.play());
        el.addEventListener('mouseleave', () => enterAnim.reverse());
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 overflow-hidden bg-background relative border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <h2 className="text-accent font-mono text-sm tracking-widest uppercase">Operational Axioms</h2>
      </div>

      <div className="flex flex-col gap-12 w-full px-6 md:px-12 lg:px-24">
        {values.map((v, i) => (
          <div key={i} className="group cursor-default w-full">
            <h3
              ref={(el) => (itemRefs.current[i] = el)}
              className="value-title text-5xl md:text-7xl lg:text-9xl font-heading font-black tracking-tighter uppercase transition-colors duration-700 text-transparent"
              style={{ WebkitTextStroke: '2px #0A348A' }}
            >
              {v.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
