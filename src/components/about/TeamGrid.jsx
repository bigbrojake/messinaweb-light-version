import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const team = [
  { name: 'John Doe', role: 'Founder & CEO', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=70&w=500&auto=format&fit=crop' },
  { name: 'Sarah Jenkins', role: 'Head of Cloud Strategy', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=70&w=500&auto=format&fit=crop' },
  { name: 'Michael Chen', role: 'Lead Solutions Architect', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=70&w=500&auto=format&fit=crop' },
  { name: 'Elena Rodriguez', role: 'VP of Staffing', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=70&w=500&auto=format&fit=crop' },
];

export default function TeamGrid() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.team-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.8, stagger: 0.12, ease: 'power3.out',
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
          <span className="font-mono text-[11px] tracking-[0.28em] text-accent uppercase">The Team</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-textDark">Meet the minds<br />behind the architecture.</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {team.map((member, i) => (
          <div
            key={i}
            className="team-card group relative w-full aspect-[3/4] rounded-[2rem] overflow-hidden cursor-pointer border border-gray-200 hover:border-accent/30 hover:shadow-[0_0_20px_rgba(30,196,247,0.12),0_8px_32px_rgba(10,52,138,0.12)] transition-all duration-400 card-inertia"
          >
            {/* Corner bracket */}
            <div className="absolute top-0 left-0 w-7 h-7 border-t-2 border-l-2 border-accent/0 group-hover:border-accent/60 transition-all duration-500 rounded-tl-[2rem] z-20 pointer-events-none" />

            {/* Photo */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
              style={{ backgroundImage: `url("${member.img}")` }}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030a18]/90 via-[#030a18]/25 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

            {/* Name + role — always visible, slides up on hover */}
            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-400 ease-out">
              <h3 className="text-white font-heading font-bold text-lg leading-tight mb-1.5">{member.name}</h3>
              <div className="flex items-center gap-2">
                <span className="w-4 h-px bg-accent/60" />
                <span className="text-accent/80 font-mono text-[10px] uppercase tracking-widest">{member.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
