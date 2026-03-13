import { useEffect, useRef } from 'react';

/**
 * DotWave — viewport-fixed canvas dot grid with a traveling sine wave.
 *
 * Wave formula: opacity = BASE + AMP * (0.5 + 0.5 * sin(x*FREQ + y*FREQ*Y_SKEW + t + scrollPhase))
 *   - Long wavelength (low FREQ) → uniform, orderly ripple rather than busy noise
 *   - Y_SKEW 0.6 → clean diagonal propagation
 *   - scrollPhase shifts the wave as the user scrolls so dots ease into dark sections
 *
 * Perf:
 *   - Single fixed canvas, z-index: -1
 *   - RAF loop, frame-rate independent via timestamp
 *   - Pauses on tab hidden
 *   - Debounced resize (150ms)
 *   - prefers-reduced-motion → single static frame, no RAF
 */

const SPACING   = 24;          // px grid spacing
const RADIUS    = 1.43;        // dot radius (1.5 * 0.95 ≈ -5%)
const BASE      = 0.06;        // minimum opacity (dots never fully invisible)
const AMP       = 0.16;        // wave amplitude
const FREQ      = 0.14;        // spatial frequency — lower = longer wavelength = more uniform
const Y_SKEW    = 0.6;         // diagonal skew; higher = more diagonal, more orderly
const SPEED     = 0.45;        // radians/second
const SCROLL_K  = 0.004;       // scroll phase multiplier (scrollY * SCROLL_K → radians)
const COLOR     = '10,52,138'; // navy RGB

export default function DotWave() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = null;
    let resizeTimer = null;
    let scrollY = window.scrollY;

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function drawFrame(t) {
      const scrollPhase = scrollY * SCROLL_K;
      const W = canvas.width;
      const H = canvas.height;

      ctx.clearRect(0, 0, W, H);

      const cols = Math.ceil(W / SPACING) + 1;
      const rows = Math.ceil(H / SPACING) + 1;

      for (let row = 0; row < rows; row++) {
        const y = row * SPACING;
        for (let col = 0; col < cols; col++) {
          const x = col * SPACING;
          const phase   = x * FREQ + y * FREQ * Y_SKEW + t + scrollPhase;
          const opacity = BASE + AMP * (0.5 + 0.5 * Math.sin(phase));

          ctx.beginPath();
          ctx.arc(x, y, RADIUS, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${COLOR},${opacity.toFixed(3)})`;
          ctx.fill();
        }
      }
    }

    function animate(ts) {
      drawFrame(ts * 0.001 * SPEED);
      raf = requestAnimationFrame(animate);
    }

    function handleVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        raf = requestAnimationFrame(animate);
      }
    }

    function handleResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    }

    function handleScroll() {
      scrollY = window.scrollY;
    }

    resize();

    if (reducedMotion) {
      // Static frame at mid-wave opacity — no animation
      drawFrame(0);
    } else {
      raf = requestAnimationFrame(animate);
      document.addEventListener('visibilitychange', handleVisibility);
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        display: 'block',
        willChange: 'contents',
      }}
    />
  );
}
