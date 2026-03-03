import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Clock, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    icon: Target,
    title: 'Tailored Solutions',
    desc: 'We customize our services to fit your unique hiring needs with precision.',
  },
  {
    icon: Clock,
    title: 'Always Available',
    desc: 'Our team is here for you anytime, ensuring support when you need it most.',
  },
  {
    icon: ShieldCheck,
    title: '25+ Years of Experience',
    desc: 'With over 25 years, we excel in talent solutions that drive your success.',
  },
];

export default function ValueHighlights() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.highlight-card',
        { opacity: 0, y: 40, clipPath: 'inset(8% 0 0 0)' },
        {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0% 0 0 0)',
          duration: 0.9,
          stagger: 0.15,
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
    <section ref={containerRef} className="py-24 px-6 max-w-7xl mx-auto relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {highlights.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="highlight-card group relative bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 transition-all duration-500 hover:shadow-2xl overflow-hidden cursor-pointer"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] z-0" />

              <div className="relative z-10 w-14 h-14 bg-surface rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-500 transform group-hover:scale-110 group-hover:-rotate-3">
                <div className="text-accent group-hover:text-white transition-colors duration-500">
                  <Icon size={28} />
                </div>
              </div>

              <h3 className="relative z-10 text-xl font-heading font-bold text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                {item.title}
              </h3>
              <p className="relative z-10 text-gray-600 font-body text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
