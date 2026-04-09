import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import NodeField from './NodeField';

const POOL = [
  { text: "Experience, attention, and care you can't replace.", keyword: "care" },
  { text: "Dell Technologies 1st Choice Partner.",              keyword: "1st Choice Partner" },
  { text: "Trusted by Fortune 500 enterprises.",               keyword: "Fortune 500" },
  { text: "Consulting. Staffing. Delivery. Since 2016.",        keyword: "Delivery" },
  { text: "Enterprise outcomes. Human relationships.",          keyword: "Human relationships" },
];

const TYPE_SPEED   = 42;
const DELETE_SPEED = 22;
const PAUSE_MS     = 2200;

function renderTyped(displayed, item) {
  const { text, keyword } = item;
  const kStart = text.indexOf(keyword);
  const kEnd   = kStart + keyword.length;

  const before = displayed.slice(0, Math.min(displayed.length, kStart));
  const accent = displayed.length > kStart
    ? displayed.slice(kStart, Math.min(displayed.length, kEnd))
    : '';
  const after  = displayed.length > kEnd
    ? displayed.slice(kEnd)
    : '';

  return (
    <>
      {before}
      {accent && <span className="keyword-glow">{accent}</span>}
      {after}
    </>
  );
}

export default function HeroSection() {
  const containerRef = useRef(null);
  const timerRef     = useRef(null);

  const [displayed,  setDisplayed]  = useState('');
  const [poolIndex,  setPoolIndex]  = useState(0);
  const [phase,      setPhase]      = useState('typing');
  const [started,    setStarted]    = useState(false);

  // Initial delay before first character
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 250);
    return () => clearTimeout(t);
  }, []);

  // Typewriter loop
  useEffect(() => {
    if (!started) return;
    const current = POOL[poolIndex].text;

    if (phase === 'typing') {
      if (displayed.length < current.length) {
        timerRef.current = setTimeout(() =>
          setDisplayed(current.slice(0, displayed.length + 1))
        , TYPE_SPEED);
      } else {
        timerRef.current = setTimeout(() => setPhase('deleting'), PAUSE_MS);
      }
    } else {
      if (displayed.length > 0) {
        timerRef.current = setTimeout(() =>
          setDisplayed(displayed.slice(0, -1))
        , DELETE_SPEED);
      } else {
        setPoolIndex((poolIndex + 1) % POOL.length);
        setPhase('typing');
      }
    }

    return () => clearTimeout(timerRef.current);
  }, [displayed, phase, poolIndex, started]);

  // Entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.fromTo('.hero-label',
        { y: 30, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
        { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 0.8, ease: 'power3.out' }
      )
      .fromTo('.hero-title-2',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.6'
      )
      .fromTo('.hero-body',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.5'
      )
      .fromTo('.hero-cta',
        { y: 30, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out' }, '-=0.4'
      )
      .fromTo('.hero-tagline',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.6'
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="hero-gradient-bg relative h-[100dvh] w-full flex items-center justify-center px-6"
      style={{ overflow: 'clip' }}
    >
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        .cursor-blink { animation: blink 1s step-end infinite; }

        @keyframes glow-pulse {
          0%, 100% { text-shadow: 0 0 10px rgba(30,196,247,0.9), 0 0 22px rgba(30,196,247,0.5); }
          50%       { text-shadow: 0 0 18px rgba(30,196,247,1),   0 0 38px rgba(30,196,247,0.7); }
        }
        .keyword-glow {
          color: #1EC4F7;
          animation: glow-pulse 2.2s ease-in-out infinite;
        }
      `}</style>

      {/* Connected node field */}
      <NodeField />

      {/* Depth vignette */}
      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_120%_80%_at_15%_20%,rgba(10,52,138,0.30),transparent)] pointer-events-none" />

      {/* Bottom bridge */}
      <div className="absolute bottom-0 left-0 right-0 h-48 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(10,52,138,0.92) 0%, rgba(10,52,138,0.55) 30%, rgba(10,52,138,0.15) 60%, transparent 100%)' }}
      />

      {/* Content */}
      <div className="relative z-30 w-full max-w-7xl mx-auto flex flex-col items-center text-center gap-5">

        <span className="hero-label inline-block px-4 py-1.5 bg-white/15 border border-white/30 rounded-[2rem] text-white text-xs font-mono uppercase tracking-widest">
          IT Consulting &middot; Staffing &middot; Delivery
        </span>

        <h1>
          <span
            className="hero-title-2 font-heading font-extrabold tracking-tight text-white uppercase leading-none"
            style={{ fontSize: 'clamp(2.5rem, 6.5vw, 6rem)' }}
          >
            Solutions that Connect.
          </span>
        </h1>

        {/* Typewriter subtitle */}
        <p
          className="hero-tagline font-heading italic leading-snug"
          style={{ fontSize: 'clamp(1.15rem, 1.6vw, 1.75rem)', color: 'rgba(255,255,255,0.80)' }}
        >
          {renderTyped(displayed, POOL[poolIndex])}
          <span className="cursor-blink not-italic text-accent ml-px">|</span>
        </p>

        <div className="hero-body flex flex-col gap-4 max-w-xl mt-1">
          <p className="text-base md:text-lg text-white/60 font-body leading-relaxed">
            We bring deep expertise across IT consulting, resource staffing, and managed delivery—backed by proven enterprise outcomes and a commitment to your success.
          </p>
        </div>

        <Link
          to="/contact"
          className="hero-cta magnetic-btn relative px-8 py-4 text-base font-bold text-white bg-accent rounded-[2rem] shadow-lg shadow-accent/25 border border-accent/40 overflow-hidden"
        >
          <span className="relative z-10">Get in Touch</span>
          <span className="absolute inset-0 bg-white/15 rounded-[2rem] opacity-0 hover:opacity-100 transition-opacity duration-300 ease-out z-0" />
        </Link>

      </div>
    </section>
  );
}
