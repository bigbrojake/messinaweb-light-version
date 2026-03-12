import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Star, Shield, Trophy, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const awards = [
  {
    year: '2019',
    title: 'Best Partner in a Crisis Award',
    subtitle: 'Dell Technologies',
    icon: Shield,
    desc: 'Recognized for exceptional dedication and rapid response when enterprise clients needed it most.',
    accent: false,
  },
  {
    year: '1st Choice',
    title: 'Award Winning Partner',
    subtitle: 'Dell Technologies',
    icon: Star,
    desc: 'Designated as Dell\'s premier consulting partner for enterprise IT infrastructure and solutions.',
    accent: true,
  },
  {
    year: '2024',
    title: 'Best Consulting Partner',
    subtitle: 'Dell Technologies',
    icon: Trophy,
    desc: 'Latest recognition for outstanding consulting outcomes across energy, healthcare, and federal sectors.',
    accent: false,
  },
  {
    year: '2025',
    title: 'Inc. 5000',
    subtitle: 'Fastest-Growing Private Companies',
    icon: TrendingUp,
    desc: '#1401 in America · #35 in Massachusetts · #71 in IT Services.',
    accent: false,
  },
];

export default function TrustAwards() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      tl.fromTo('.ta-eyebrow',
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      )
      .fromTo('.ta-card',
        { opacity: 0, y: 40, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo('.ta-divider',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden">
      {/* Frosted glass layer over GlobalCanvas */}
      <div className="absolute inset-0 bg-primary/90 backdrop-blur-sm" />

      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, #1EC4F7 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">

        {/* Eyebrow */}
        <div className="ta-eyebrow flex items-center gap-4 mb-12">
          <Award className="text-accent shrink-0" size={18} />
          <div className="h-px flex-1 bg-gradient-to-r from-accent/40 to-transparent max-w-[80px]" />
          <span className="font-mono text-[10px] text-accent/80 tracking-[0.3em] uppercase">
            Award Winning · Dell Technologies Partner
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-accent/40 to-transparent max-w-[80px]" />
        </div>

        {/* Award cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {awards.map((a, i) => {
            const Icon = a.icon;
            return (
              <div
                key={i}
                className={`ta-card group relative rounded-[1.5rem] p-7 transition-all duration-500 cursor-default
                  ${a.accent
                    ? 'bg-accent/10 border border-accent/30 shadow-[0_0_40px_rgba(30,196,247,0.15),inset_0_1px_0_rgba(30,196,247,0.2)]'
                    : 'bg-white/[0.04] border border-white/10 hover:border-white/20 hover:bg-white/[0.07]'
                  }`}
              >
                {/* Featured badge */}
                {a.accent && (
                  <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-accent text-primary font-mono text-[9px] font-black tracking-widest uppercase shadow-[0_0_16px_rgba(30,196,247,0.4)]">
                    Featured
                  </div>
                )}

                {/* Icon */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-5
                  ${a.accent
                    ? 'bg-accent/20 border border-accent/30'
                    : 'bg-white/[0.07] border border-white/10 group-hover:border-accent/20 transition-colors duration-300'
                  }`}>
                  <Icon
                    size={18}
                    className={a.accent ? 'text-accent' : 'text-white/50 group-hover:text-accent/70 transition-colors duration-300'}
                  />
                </div>

                {/* Year / status */}
                <div className={`font-mono text-[11px] tracking-[0.22em] uppercase mb-2
                  ${a.accent ? 'text-accent' : 'text-white/35'}`}>
                  {a.year}
                </div>

                {/* Title */}
                <h3 className={`font-heading font-bold text-lg leading-snug mb-1
                  ${a.accent ? 'text-white' : 'text-white/80 group-hover:text-white transition-colors duration-300'}`}>
                  {a.title}
                </h3>

                {/* Subtitle */}
                <p className={`font-mono text-[10px] tracking-wider uppercase mb-4
                  ${a.accent ? 'text-accent/70' : 'text-white/25'}`}>
                  {a.subtitle}
                </p>

                {/* Divider */}
                <div className={`ta-divider h-px mb-4 origin-left
                  ${a.accent ? 'bg-accent/30' : 'bg-white/10'}`} />

                {/* Description */}
                <p className="font-body text-[13px] text-white/45 leading-relaxed group-hover:text-white/60 transition-colors duration-300">
                  {a.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom trust line */}
        <p className="mt-10 text-center font-mono text-[10px] text-white/25 tracking-[0.2em] uppercase">
          Trusted by energy · healthcare · federal · retail enterprises since 1998
        </p>
      </div>
    </section>
  );
}
