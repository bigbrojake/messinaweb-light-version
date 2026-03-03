import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function TrustAwards() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.award-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-primary text-white py-14 px-6 relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left">
        <div className="award-item flex-1">
          <div className="flex items-center gap-3 justify-center md:justify-start mb-3">
            <Award className="text-accent" size={22} />
            <h2 className="text-xl md:text-2xl font-heading font-bold text-accent">
              The Dell Legacy
            </h2>
          </div>
          <p className="text-sm md:text-base font-body text-white/70 max-w-lg leading-relaxed">
            Proven excellence and partnership driving your critical IT infrastructure forwards.
          </p>
        </div>

        <div className="flex-1 flex flex-col md:flex-row items-center justify-end gap-6 md:gap-12">
          <div className="award-item flex flex-col items-center md:items-start border-l border-white/15 pl-6">
            <span className="text-2xl font-mono text-white mb-1">2019</span>
            <span className="text-xs uppercase tracking-widest text-accent font-semibold">
              Best Partner in a Crisis Award
            </span>
          </div>

          <div className="award-item flex flex-col items-center md:items-start border-l border-white/15 pl-6">
            <span className="text-2xl font-mono text-white mb-1">1st Choice</span>
            <span className="text-xs uppercase tracking-widest text-accent font-semibold">
              Partner of Dell Technologies
            </span>
          </div>

          <div className="award-item flex flex-col items-center md:items-start border-l-2 border-accent pl-6">
            <span className="text-3xl font-mono text-white mb-1">2024</span>
            <span className="text-xs uppercase tracking-widest text-accent font-semibold">
              Best Consulting Partner
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
