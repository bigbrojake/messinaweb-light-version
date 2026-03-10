import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Clock, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    Icon: Target,
    stat: '100%',
    title: 'Tailored Solutions',
    desc: 'We customize our services to fit your unique needs with precision.',
    tag: 'Scope',
  },
  {
    Icon: Clock,
    stat: '24/7',
    title: 'Always Available',
    desc: 'Our team is here for you anytime, ensuring support when you need it most.',
    tag: 'Support',
  },
  {
    Icon: ShieldCheck,
    stat: '25+',
    title: 'Years of Experience',
    desc: 'With over 25 years, we excel in solutions that drive your success.',
    tag: 'Expertise',
  },
];

export default function ValueHighlights() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.vh-card',
        { opacity: 0, y: 48, clipPath: 'inset(12% 0 0 0 round 2rem)' },
        {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0% 0 0 0 round 2rem)',
          duration: 0.9,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 82%',
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
          const Icon = item.Icon;
          return (
            <div
              key={i}
              className="vh-card group relative bg-white/80 backdrop-blur-sm rounded-[2rem] border border-primary/8 shadow-brand hover:shadow-brand-lg card-inertia overflow-hidden"
            >
              {/* Gradient accent stripe */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-accent to-primary/40 rounded-t-[2rem]" />

              {/* Top row: tag + icon */}
              <div className="flex items-center justify-between px-8 pt-8 pb-0">
                <span className="font-mono text-[10px] text-accent tracking-[0.2em] uppercase bg-accent/8 px-3 py-1 rounded-full">
                  {item.tag}
                </span>
                <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center shadow-brand group-hover:bg-accent group-hover:shadow-[0_4px_20px_rgba(30,196,247,0.40)] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                  <Icon size={20} className="text-white" />
                </div>
              </div>

              {/* Giant stat */}
              <div className="px-8 pt-6 pb-0">
                <span className="font-heading font-black text-[4rem] md:text-[4.5rem] leading-none text-primary tracking-tight select-none">
                  {item.stat}
                </span>
              </div>

              {/* Divider */}
              <div className="mx-8 mt-4 h-px bg-gradient-to-r from-primary/12 via-accent/20 to-transparent" />

              {/* Title + desc */}
              <div className="px-8 pt-5 pb-8">
                <h3 className="font-heading font-bold text-xl text-textDark mb-2">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Bottom scan line on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-accent rounded-b-[2rem] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]" />
            </div>
          );
        })}
      </div>
    </section>
  );
}
