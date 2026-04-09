import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const team = [
  {
    name: 'Josh Messina',
    role: 'Principal',
    img: '/team/josh.jpg',
    bio: 'Three decades in consulting and staffing, built on an unwavering commitment to ethics, hard work, and community. Outside the office, Josh can be found cooking for his family, on the golf course, at a live music show, or locked into playoff hockey.',
  },
  {
    name: 'John Palmer',
    role: 'Managing Director, Sales & Business Development',
    img: '/team/john.jpg',
    bio: 'A technology professional with 30+ years in enterprise infrastructure, John has a talent for turning complex technical ideas into real-world outcomes at scale. Before IT, he was a commercial pilot — these days he trades the cockpit for the Jersey Shore, tournament pool, and what he calls a very bad game of golf.',
  },
  {
    name: 'Erin Mitchell',
    role: 'VP of Finance & Operations',
    img: '/team/erin.jpg',
    bio: "Working alongside Josh since 2018, Erin has helped scale Messina over 500% through strategic financial leadership and operational excellence. A live music devotee with 300+ concerts and 46 states behind her, she's also a proud rescue Frenchie mom to Dolly.",
  },
  {
    name: 'Maggie Ellison',
    role: 'Resource Relationship Director',
    img: '/team/maggie.jpg',
    bio: "With 25 years across HR and accounting — from nonprofits to universities to staffing — Maggie brings warmth and depth to every relationship she manages. She's been part of the Messina family for nearly two years and is happiest somewhere outside, ideally on a lanai.",
  },
  {
    name: 'William Killebrew',
    role: 'Workforce Operations Manager',
    img: '/team/will.png',
    imgPosition: 'center center',
    bio: "A military brat who's lived across Europe and the U.S., Will brings adaptability and a people-first mindset to everything he does. He chases Phish concerts coast to coast with his wife, bleeds Cardinal red, and shares his home with two cats — Manny and Moony, aka the Man 'n the Moon.",
  },
  {
    name: 'Keri Burnell',
    role: 'Director of Business Insights & Analytics',
    img: '/team/keri.jpg',
    bio: 'Keri drives automation and efficiency at Messina, making complex data clear and genuinely useful. A Wisconsin-proud Packers shareholder and proud dog mom — may your queries be fast and your dashboards honest.',
  },
];

export default function TeamGrid() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.team-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 px-6 max-w-7xl mx-auto relative z-20">
      {/* Section header */}
      <div className="mb-16 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="w-px h-8 bg-gradient-to-b from-accent to-primary/50" />
          <span className="font-mono text-[11px] tracking-[0.28em] text-accent uppercase">People First</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-textDark">
          Meet the team.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member, i) => (
          <div
            key={i}
            className="team-card group relative w-full overflow-hidden rounded-[2rem] cursor-pointer border border-gray-200 hover:border-accent/30 hover:shadow-[0_0_20px_rgba(30,196,247,0.12),0_8px_32px_rgba(10,52,138,0.12)] transition-all duration-500 card-inertia"
            style={{ height: '480px' }}
          >
            {/* Corner bracket */}
            <div className="absolute top-0 left-0 w-7 h-7 border-t-2 border-l-2 border-accent/0 group-hover:border-accent/60 transition-all duration-500 rounded-tl-[2rem] z-20 pointer-events-none" />

            {/* Photo */}
            <div
              className="absolute inset-0 bg-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
              style={{ backgroundImage: `url("${member.img}")`, backgroundPosition: member.imgPosition ?? 'center top' }}
            />

            {/* Base gradient — always visible for name legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030a18]/90 via-[#030a18]/10 to-transparent" />

            {/* Hover gradient — expands to cover more for bio legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030a18]/98 via-[#030a18]/80 to-[#030a18]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
              {/* Bio — fades and slides up on hover */}
              <p
                className="text-white/75 text-sm font-body leading-relaxed mb-4 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75"
                style={{ textShadow: '0 1px 6px rgba(3,10,24,0.8)' }}
              >
                {member.bio}
              </p>

              {/* Name */}
              <h3 className="text-white font-heading font-bold text-lg leading-tight mb-1.5">
                {member.name}
              </h3>

              {/* Role */}
              <div className="flex items-center gap-2">
                <span className="w-4 h-px bg-accent/60 shrink-0" />
                <span className="text-accent/80 font-mono text-[10px] uppercase tracking-widest leading-tight">
                  {member.role}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
