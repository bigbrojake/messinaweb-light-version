import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const team = [
  {
    name: 'John Doe',
    role: 'Founder & CEO',
    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop',
  },
  {
    name: 'Sarah Jenkins',
    role: 'Head of Cloud Strategy',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop',
  },
  {
    name: 'Michael Chen',
    role: 'Lead Solutions Architect',
    img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop',
  },
  {
    name: 'Elena Rodriguez',
    role: 'VP of Staffing',
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop',
  },
];

export default function TeamGrid() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.team-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 px-6 max-w-7xl mx-auto relative z-20">
      <div className="mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-4">Meet the team</h2>
        <p className="text-gray-500 font-body max-w-2xl mx-auto">The minds behind the architecture.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {team.map((member, i) => (
          <div
            key={i}
            className="team-card group relative w-full aspect-[3/4] rounded-[2rem] overflow-hidden cursor-pointer shadow-md"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-magnetic grayscale group-hover:grayscale-0 group-hover:scale-105"
              style={{ backgroundImage: `url("${member.img}")` }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-textDark/90 via-textDark/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

            <div className="absolute bottom-0 left-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out flex flex-col gap-1">
              <h3 className="text-white font-heading font-bold text-xl">{member.name}</h3>
              <span className="text-accent font-mono text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                {member.role}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
