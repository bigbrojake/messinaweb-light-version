import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const quotes = [
  {
    text: "I've known Josh for many years — he and his team are outstanding to work with: professional, reliable and truly trustworthy. Messina Technology Solutions will always be my go-to partner.",
    role: 'Advisory Infrastructure Consultant',
    company: '',
  },
  {
    text: "From day one, the team at Messina Tech ensured I was set up for success — providing clear expectations, strong communication, and ongoing support throughout my engagement.",
    role: 'Senior IT Consultant',
    company: '',
  },
  {
    text: "What stands out most is their commitment to their people. Messina Technology Solutions fosters a collaborative environment where consultants feel valued, heard, and empowered to perform at their best.",
    role: 'Infrastructure Specialist',
    company: '',
  },
];

export default function ExecutiveTestimonials() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.quote-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 1, stagger: 0.2, ease: 'power2.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 85%' },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-6 w-full relative z-20 bg-[#F5F9FF] border-t border-primary/8">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <div className="w-px h-8 bg-gradient-to-b from-accent to-primary/50" />
          <span className="font-mono text-[11px] tracking-[0.28em] text-accent uppercase">Executive Testimonials</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quotes.map((q, i) => (
            <div
              key={i}
              className="quote-card group bg-white rounded-[2rem] p-10 border border-primary/8 shadow-[0_4px_32px_rgba(10,52,138,0.06)] flex flex-col gap-6 hover:shadow-[0_8px_48px_rgba(10,52,138,0.10)] hover:border-accent/20 transition-all duration-400"
            >
              {/* Decorative quote mark */}
              <span
                className="text-[4.5rem] text-accent/25 font-serif leading-none select-none -mb-4"
                style={{ textShadow: '0 0 30px rgba(30,196,247,0.25)' }}
              >
                &ldquo;
              </span>

              {/* Quote text */}
              <p className="font-heading font-normal italic text-xl md:text-2xl text-textDark leading-relaxed flex-1">
                {q.text}
              </p>

              {/* Attribution */}
              <div className="pt-5 border-t border-primary/8">
                <p className="font-mono text-sm font-bold text-accent tracking-widest uppercase">{q.role}</p>
                {q.company && <p className="font-body text-sm text-gray-400 mt-1">{q.company}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
