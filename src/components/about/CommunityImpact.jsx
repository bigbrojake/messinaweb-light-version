import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CommunityImpact() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.community-image',
        { opacity: 0, scale: 0.95, x: -30 },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
        }
      );
      gsap.fromTo(
        '.community-text',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 75%' },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-32 w-full overflow-hidden bg-white z-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="community-image relative aspect-square md:aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] hover:scale-110 ease-out"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1593113565694-c6aa89f4facd?q=80&w=2070&auto=format&fit=crop")',
            }}
          />
          <div className="absolute inset-0 bg-accent/20 mix-blend-multiply" />
        </div>

        <div className="community-text flex flex-col gap-6">
          <h2 className="text-sm font-mono tracking-widest uppercase text-accent font-semibold">
            Community Impact
          </h2>
          <h3 className="text-3xl md:text-5xl font-heading font-bold text-primary leading-tight">
            Investing in the Local Fabric.
          </h3>
          <p className="font-body text-gray-600 text-lg leading-relaxed">
            Beyond our global reach, Messina Technology Solutions is deeply anchored in Newburyport and the
            surrounding communities. We believe that true operational excellence extends beyond the digital
            realm and into the neighborhoods where we live and work.
          </p>
          <div className="w-16 h-1 mt-4 bg-accent rounded-full" />
        </div>
      </div>
    </section>
  );
}
