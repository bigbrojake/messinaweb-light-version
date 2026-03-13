import { useEffect, useRef } from 'react';

/**
 * DotWave — full-viewport canvas dot grid with a traveling sine wave.
 *
 * Strategy (efficient):
 *  - Single <canvas> fixed behind everything (z-index: -1)
 *  - Grid spacing: 24px, dot radius: ~1.5px (≈20% bigger than prior 1px CSS dots)
 *  - Wave: opacity = BASE + AMP * sin(x*FREQ + y*FREQ*0.4 + time*SPEED)
 *    Diagonal propagation (x + 0.4y) makes it feel organic, not grid-marching.
 *  - Canvas resizes on window resize (debounced 150ms)
 *  - RAF loop with timestamp — sine input uses real time so speed is
 *    frame-rate independent
 *  - Pauses when tab is hidden (visibilitychange) to save battery
 */

const SPACING = 24;       // px between dot centers
const RADIUS  = 1.5;      // dot radius px — 20% bigger than the 1px CSS grid
const BASE    = 0.07;     // minimum dot opacity
const AMP     = 0.18;     // wave amplitude on top of BASE
const FREQ    = 0.22;     // spatial frequency (radians per pixel)
const SPEED   = 0.55;     // radians per second
const COLOR   = '10,52,138'; // navy RGB

export default function DotWave() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf = null;
    let resizeTimer = null;

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function draw(ts) {
      const t = ts * 0.001 * SPEED; // seconds * speed → radians
      const W = canvas.width;
      const H = canvas.height;

      ctx.clearRect(0, 0, W, H);

      // Precompute column count; start half a spacing outside left edge
      // so dots always fill edge-to-edge regardless of viewport width.
      const cols = Math.ceil(W / SPACING) + 1;
      const rows = Math.ceil(H / SPACING) + 1;

      for (let row = 0; row < rows; row++) {
        const y = row * SPACING;
        for (let col = 0; col < cols; col++) {
          const x = col * SPACING;
          // Diagonal wave: phase offset by both x and y (0.4 skews the diagonal)
          const phase   = x * FREQ + y * FREQ * 0.4 + t;
          const opacity = BASE + AMP * (0.5 + 0.5 * Math.sin(phase));

          ctx.beginPath();
          ctx.arc(x, y, RADIUS, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${COLOR},${opacity.toFixed(3)})`;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    }

    function handleVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        raf = requestAnimationFrame(draw);
      }
    }

    function handleResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    }

    resize();
    raf = requestAnimationFrame(draw);

    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
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
      }}
    />
  );
}
