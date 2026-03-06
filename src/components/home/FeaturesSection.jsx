import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, CheckCircle, Activity } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturesSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.feature-card',
        { opacity: 0, y: 52, clipPath: 'inset(10% 0 0 0 round 2rem)' },
        {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0% 0 0 0 round 2rem)',
          duration: 1.0,
          stagger: 0.16,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 78%',
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 px-6 max-w-7xl mx-auto relative z-20">

      {/* Section header */}
      <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <span className="font-mono text-[11px] text-accent tracking-[0.25em] uppercase block mb-3">
            What We Deliver
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-black text-textDark leading-[1.05]">
            Core Messina<br className="hidden md:block" /> Pillars
          </h2>
        </div>
        <p className="text-gray-400 font-body text-sm max-w-xs leading-relaxed md:text-right">
          Precision consulting through proven methodologies, integrated telemetry, and flexible scaling.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="feature-card"><DiagnosticShuffler /></div>
        <div className="feature-card"><TelemetryTypewriter /></div>
        <div className="feature-card"><ScalableResourceGrid /></div>
      </div>
    </section>
  );
}

/* ─── Card 1: Diagnostic Shuffler ──────────────────────────────────────── */
function DiagnosticShuffler() {
  const [cards, setCards] = useState([
    'Consulting Lifecycle',
    'Continuous Adaptation',
    'Partner Integration',
  ]);

  useEffect(() => {
    const id = setInterval(() => {
      setCards((prev) => {
        const next = [...prev];
        const last = next.pop();
        next.unshift(last);
        return next;
      });
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative bg-[#06101f] rounded-[2rem] p-8 border border-accent/[0.12] flex flex-col h-[380px] overflow-hidden"
      style={{ boxShadow: '0 0 0 1px rgba(30,196,247,0.10), 0 12px 48px rgba(10,52,138,0.30), 0 0 60px rgba(30,196,247,0.06)' }}>

      {/* Top accent stripe */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent via-accent/60 to-primary/40 rounded-t-[2rem]" />

      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className="font-mono text-[10px] text-accent/60 tracking-[0.2em] uppercase block mb-2">
            Engagement Model
          </span>
          <h3 className="font-heading font-bold text-white text-xl leading-snug">
            Agile &amp;<br />Relationship-First
          </h3>
        </div>
        <div className="w-10 h-10 rounded-xl bg-accent/[0.08] border border-accent/[0.18] flex items-center justify-center shrink-0"
          style={{ boxShadow: '0 0 18px rgba(30,196,247,0.14)' }}>
          <Users size={17} className="text-accent" />
        </div>
      </div>

      <p className="text-[13px] text-white/35 font-body mb-6 leading-relaxed">
        Long-term partnerships that adapt instantly to your evolving needs.
      </p>

      {/* Shuffling cards */}
      <div className="relative flex-grow flex items-center justify-center">
        {cards.map((card, i) => (
          <div
            key={card}
            className="absolute w-full px-5 py-3.5 rounded-xl border transition-all duration-700"
            style={{
              transform: `translateY(${i * 15}px) scale(${1 - i * 0.045})`,
              zIndex: 10 - i,
              opacity: i === 0 ? 1 : 1 - i * 0.55,
              filter: i === 0 ? 'none' : `blur(${i * 2}px)`,
              backgroundColor: i === 0 ? 'rgba(30,196,247,0.07)' : 'rgba(255,255,255,0.03)',
              borderColor:     i === 0 ? 'rgba(30,196,247,0.22)' : 'rgba(255,255,255,0.06)',
              boxShadow:       i === 0 ? '0 0 22px rgba(30,196,247,0.10)' : 'none',
              transition: 'transform 0.7s cubic-bezier(0.34,1.56,0.64,1), opacity 0.7s ease, filter 0.7s ease',
            }}
          >
            <div className="flex items-center gap-3">
              <span
                className="w-1.5 h-1.5 rounded-full bg-accent shrink-0"
                style={{ boxShadow: i === 0 ? '0 0 8px rgba(30,196,247,0.9)' : 'none' }}
              />
              <span className="font-mono text-[13px] text-white/80 font-medium">{card}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Card 2: Telemetry Typewriter ─────────────────────────────────────── */
function TelemetryTypewriter() {
  const [text, setText] = useState('');
  const lines = [
    '[MTS-AUTO] Initiating Phase III OS In-Place Upgrade... OK',
    '[MTS-AUTO] Cloud Trajectory Validated... OK',
    '[MTS-AUTO] ROI Metrics Generated: +33% Efficiency',
    '[MTS-AUTO] Continuous Improvement Loop Armed.',
  ];
  const fullText = lines.join('\n');

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) {
        setTimeout(() => { i = 0; }, 2200);
      }
    }, 38);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="relative rounded-[2rem] p-8 border flex flex-col h-[380px] overflow-hidden"
      style={{
        background: 'linear-gradient(145deg, #060d1a 0%, #0a1628 100%)',
        borderColor: 'rgba(10,52,138,0.35)',
        boxShadow: '0 0 0 1px rgba(10,52,138,0.20), 0 12px 48px rgba(10,52,138,0.35), 0 0 80px rgba(30,196,247,0.04)',
      }}
    >
      {/* Top stripe — primary side */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-accent/50 to-primary/20 rounded-t-[2rem]" />

      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className="font-mono text-[10px] text-primary/50 tracking-[0.2em] uppercase block mb-2">
            Automation Feed
          </span>
          <h3 className="font-heading font-bold text-white text-xl leading-snug">
            Outcome-Based<br />Delivery
          </h3>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span
            className="w-2 h-2 rounded-full bg-accent animate-pulse"
            style={{ boxShadow: '0 0 10px rgba(30,196,247,0.8)' }}
          />
          <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Live</span>
        </div>
      </div>

      <p className="text-[13px] text-white/30 font-body mb-5 leading-relaxed">
        Turnkey, results-driven solutions powered by measurable automated telemetry.
      </p>

      {/* Terminal */}
      <div
        className="flex-grow rounded-xl p-4 border font-mono text-[11px] md:text-xs whitespace-pre-wrap overflow-hidden leading-relaxed"
        style={{
          background: 'rgba(0,0,0,0.4)',
          borderColor: 'rgba(10,52,138,0.25)',
          color: '#1EC4F7',
        }}
      >
        {text}
        <span
          className="inline-block w-[7px] h-[13px] align-middle ml-0.5 animate-pulse"
          style={{ background: '#1EC4F7', boxShadow: '0 0 8px rgba(30,196,247,0.6)' }}
        />
      </div>
    </div>
  );
}

/* ─── Card 3: Scalable Resource Grid ───────────────────────────────────── */
function ScalableResourceGrid() {
  const containerRef = useRef(null);
  const nodesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, yoyo: true });

      tl.to('.capacity-bar', { width: '82%', duration: 1.6, ease: 'power2.inOut' })
        .to(nodesRef.current, {
          backgroundColor: '#1EC4F7',
          opacity: 1,
          scale: 1.15,
          duration: 0.08,
          stagger: { amount: 1.2, from: 'random' },
          boxShadow: '0 0 8px rgba(30,196,247,0.7)',
        }, '<')
        .to('.capacity-label', { innerText: '82% Capacity', duration: 1.6, snap: { innerText: 1 } }, '<')
        .to('.capacity-bar', { width: '28%', duration: 1.6, ease: 'power2.inOut', delay: 1.1 })
        .to(nodesRef.current, {
          backgroundColor: 'rgba(30,196,247,0.08)',
          opacity: 0.35,
          scale: 1,
          duration: 0.08,
          stagger: { amount: 1.2, from: 'random' },
          boxShadow: 'none',
        }, '<')
        .to('.capacity-label', { innerText: '28% Capacity', duration: 1.6, snap: { innerText: 1 } }, '<');
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const nodes = Array.from({ length: 24 });

  return (
    <div
      ref={containerRef}
      className="relative rounded-[2rem] p-8 border flex flex-col h-[380px] overflow-hidden"
      style={{
        background: 'linear-gradient(145deg, #07101e 0%, #050c18 100%)',
        borderColor: 'rgba(30,196,247,0.08)',
        boxShadow: '0 0 0 1px rgba(30,196,247,0.07), 0 12px 48px rgba(10,52,138,0.28), 0 0 60px rgba(30,196,247,0.04)',
      }}
    >
      {/* Top stripe */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent/60 to-primary/60 rounded-t-[2rem]" />

      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className="font-mono text-[10px] text-accent/50 tracking-[0.2em] uppercase block mb-2">
            Workforce Capacity
          </span>
          <h3 className="font-heading font-bold text-white text-xl leading-snug">
            Flexible<br />Staffing
          </h3>
        </div>
        <div className="w-10 h-10 rounded-xl bg-accent/[0.07] border border-accent/[0.14] flex items-center justify-center shrink-0">
          <Activity size={17} className="text-accent/80" />
        </div>
      </div>

      <p className="text-[13px] text-white/30 font-body mb-5 leading-relaxed">
        Customized hiring and scalable bench strength to match any deployment schedule.
      </p>

      {/* Capacity display */}
      <div
        className="flex-grow rounded-xl p-4 border flex flex-col"
        style={{ background: 'rgba(0,0,0,0.35)', borderColor: 'rgba(10,52,138,0.22)' }}
      >
        <div className="flex justify-between items-center mb-3">
          <span className="text-[10px] font-mono text-white/25 uppercase tracking-widest">Resource Allocation</span>
          <span className="capacity-label text-[10px] font-mono font-bold" style={{ color: '#1EC4F7', textShadow: '0 0 8px rgba(30,196,247,0.5)' }}>28% Capacity</span>
        </div>

        {/* Capacity bar */}
        <div className="w-full h-1.5 rounded-full mb-4 overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <div
            className="capacity-bar h-full rounded-full"
            style={{
              width: '28%',
              background: 'linear-gradient(to right, #1EC4F7, #0A348A)',
              boxShadow: '0 0 12px rgba(30,196,247,0.5)',
            }}
          />
        </div>

        {/* Node grid */}
        <div className="grid grid-cols-6 gap-1.5 flex-grow">
          {nodes.map((_, i) => (
            <div
              key={i}
              ref={(el) => (nodesRef.current[i] = el)}
              className="rounded-md"
              style={{
                backgroundColor: 'rgba(30,196,247,0.08)',
                opacity: 0.35,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
