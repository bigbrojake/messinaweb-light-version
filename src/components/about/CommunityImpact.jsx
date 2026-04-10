import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CommunityImpact() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.community-image', { opacity: 0, scale: 0.96, x: -30 }, {
        opacity: 1, scale: 1, x: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
      });
      gsap.fromTo('.community-text', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 75%' },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-32 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Image */}
        <div className="community-image relative aspect-square md:aspect-[4/3] rounded-[3rem] overflow-hidden border border-accent/20 shadow-[0_8px_48px_rgba(30,196,247,0.08)] hover:border-accent/40 transition-colors duration-400">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] hover:scale-110 ease-out"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1552664730-d307ca884978?q=70&w=800&auto=format&fit=crop")' }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-accent/10 mix-blend-multiply" />
          {/* Image overlay label */}
          <div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur-sm border border-primary/10 rounded-2xl px-4 py-2.5">
            <p className="font-mono text-[9px] tracking-[0.22em] text-accent uppercase mb-0.5">Community First</p>
            <p className="font-heading font-bold text-sm text-textDark">Since 2016</p>
          </div>
        </div>

        {/* Text */}
        <div className="community-text flex flex-col gap-6">
          {/* Eyebrow */}
          <div className="flex items-center gap-4">
            <div className="w-px h-8 bg-gradient-to-b from-accent to-primary/50" />
            <span className="font-mono text-[11px] tracking-[0.28em] text-accent uppercase">Community Impact</span>
          </div>

          <h3 className="text-3xl md:text-4xl font-heading font-bold text-textDark leading-tight">
            Investing in the<br />Local Fabric.
          </h3>

          <p className="font-body text-gray-600 text-base leading-relaxed">
            Beyond our global reach, MTS is deeply anchored in Newburyport and surrounding communities. We believe operational excellence extends beyond the digital realm into the neighborhoods where we live and work.
          </p>

          <div className="w-14 h-0.5 bg-gradient-to-r from-accent to-primary/30" />

          <div className="flex flex-col gap-8">
            <div>
              <p className="font-mono text-[10px] text-accent tracking-[0.22em] uppercase mb-4">Annual Sponsors</p>
              <ul className="flex flex-col gap-2.5">
                {[
                  { name: 'Angel Fund for ALS Research',    url: 'https://theangelfund.org' },
                  { name: 'Newburyport Education Foundation', url: 'https://www.newburyportef.org' },
                  { name: "St. Jude Children's Hospital",   url: 'https://www.stjude.org' },
                ].map((org, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-body">
                    <span className="w-8 h-px bg-accent/45 shrink-0" />
                    <a
                      href={org.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-accent transition-colors duration-200 underline-offset-2 hover:underline"
                    >
                      {org.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[10px] text-accent tracking-[0.22em] uppercase mb-4">Team Nonprofits</p>
              <ul className="flex flex-col gap-2.5">
                {[
                  { name: 'UP for Women and Children — Louisville, KY', url: 'https://www.uplouisville.org' },
                  { name: 'Friends of MADACC — Milwaukee, WI',          url: 'https://www.friendsofmadacc.org' },
                  { name: 'United Way of Jackson County — Oregon',       url: 'https://unitedwayofjacksoncounty.org' },
                  { name: 'Vanderburgh Humane Society — Indiana',        url: 'https://www.vhslifesaver.org' },
                  { name: 'World Central Kitchen',                       url: 'https://wck.org' },
                ].map((org, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-body">
                    <span className="w-8 h-px bg-primary/30 shrink-0" />
                    <a
                      href={org.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-accent transition-colors duration-200 underline-offset-2 hover:underline"
                    >
                      {org.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
