import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ExecutiveTestimonials() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const quotes = gsap.utils.toArray('.quote-element');
      quotes.forEach((q) => {
        gsap.fromTo(
          q,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: q,
              start: 'top 85%',
            },
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-6 w-full bg-textDark relative z-20 mt-24">
      <div className="max-w-4xl mx-auto flex flex-col gap-32 text-center">
        <div className="quote-element flex flex-col gap-6">
          <span className="text-6xl text-accent font-serif opacity-50 block mb-[-30px]">&ldquo;</span>
          <p
            className="font-heading font-medium text-3xl md:text-5xl italic text-white leading-tight"
            style={{ fontWeight: 400 }}
          >
            MTS executed our environment transition smoothly; their deep understanding of redundant architecture
            completely mitigated our risk footprint.
          </p>
          <div className="mt-8">
            <h4 className="font-mono font-bold text-accent uppercase tracking-widest text-sm">
              Director of Infrastructure
            </h4>
            <p className="font-body text-gray-400 text-sm mt-1">Global Healthcare Provider</p>
          </div>
        </div>

        <div className="quote-element flex flex-col gap-6">
          <span className="text-6xl text-accent font-serif opacity-50 block mb-[-30px]">&ldquo;</span>
          <p
            className="font-heading font-medium text-3xl md:text-5xl italic text-white leading-tight"
            style={{ fontWeight: 400 }}
          >
            The level of precision in their automation rollout saved our engineering team thousands of hours. It
            wasn&apos;t just staffing; it was architectural leadership.
          </p>
          <div className="mt-8">
            <h4 className="font-mono font-bold text-accent uppercase tracking-widest text-sm">
              VP of Information Technology
            </h4>
            <p className="font-body text-gray-400 text-sm mt-1">National Retail Enterprise</p>
          </div>
        </div>
      </div>
    </section>
  );
}
