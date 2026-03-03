import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Animated geometric grid background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let nodes = [];
    const NODE_COUNT = 60;
    const PRIMARY = '#0A348A';
    const ACCENT = '#1EC4F7';

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initNodes = () => {
      nodes = [];
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2 + 1,
          pulse: Math.random() * Math.PI * 2,
        });
      }
    };

    const draw = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            const opacity = (1 - dist / 200) * 0.15;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(30, 196, 247, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += 0.02;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        const pulseFactor = 1 + Math.sin(node.pulse) * 0.3;
        const r = node.radius * pulseFactor;

        // Glow
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 4);
        gradient.addColorStop(0, `rgba(30, 196, 247, 0.3)`);
        gradient.addColorStop(1, 'rgba(30, 196, 247, 0)');
        ctx.beginPath();
        ctx.arc(node.x, node.y, r * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = ACCENT;
        ctx.fill();
      }

      // Draw subtle grid lines
      ctx.strokeStyle = 'rgba(10, 52, 138, 0.06)';
      ctx.lineWidth = 0.5;
      const gridSize = 80;
      const offsetX = (time * 0.01) % gridSize;
      const offsetY = (time * 0.008) % gridSize;
      for (let x = -gridSize + offsetX; x < canvas.width + gridSize; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = -gridSize + offsetY; y < canvas.height + gridSize; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      animId = requestAnimationFrame(draw);
    };

    resize();
    initNodes();
    animId = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // GSAP text entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo('.hero-label',
        { y: 30, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
        { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 0.8, ease: 'power3.out' }
      )
      .fromTo('.hero-title-1',
        { y: 60, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
        { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 1, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo('.hero-title-2',
        { y: 60, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
        { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 1, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo('.hero-body',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo('.hero-cta',
        { y: 30, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out' },
        '-=0.4'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-[100dvh] w-full flex items-end pb-24 lg:pb-32 px-6 overflow-hidden">
      {/* Coded Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'linear-gradient(135deg, #050d1e 0%, #0A348A 50%, #071a40 100%)' }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050d1e]/95 via-[#0A348A]/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050d1e]/60 via-transparent to-transparent" />

      {/* Content — bottom-left third */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-start gap-5">
        <span className="hero-label inline-block px-4 py-1.5 bg-accent/15 border border-accent/30 rounded-[2rem] text-accent text-xs font-mono uppercase tracking-widest">
          IT Consulting &middot; Staffing &middot; Delivery
        </span>

        <h1 className="flex flex-col gap-2 text-white">
          <span className="hero-title-1 text-3xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-accent">
            Empower your Enterprise
          </span>
          <span
            className="hero-title-2 text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-extrabold tracking-tight uppercase"
            style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.8)', color: 'transparent' }}
          >
            Solutions that Connect.
          </span>
        </h1>

        <p className="hero-body max-w-xl text-base md:text-lg text-white/75 font-body leading-relaxed">
          Empowering organizations through innovative IT consulting, flexible resource staffing, and results-driven service delivery.
        </p>

        <Link
          to="/contact"
          className="hero-cta magnetic-btn px-8 py-4 text-base font-bold text-white bg-accent rounded-[2rem] shadow-lg shadow-accent/20 border border-accent/30"
        >
          <span className="relative z-10">Get in Touch</span>
          <span className="absolute inset-0 bg-white rounded-[2rem] opacity-0 hover:opacity-10 transition-opacity duration-300 ease-out z-0" />
        </Link>
      </div>
    </section>
  );
}
