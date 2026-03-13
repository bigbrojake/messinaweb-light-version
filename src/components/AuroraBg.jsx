import { useEffect, useRef } from 'react';

/**
 * AuroraBg — two soft elliptical gradient bands that rotate slowly
 * like northern lights. Navy anchors top-left, cyan anchors bottom-right.
 *
 * Technique:
 *   ctx.scale(xStretch, 1) before ctx.createRadialGradient + ctx.arc
 *   stretches both the fill shape and the gradient into a wide ellipse.
 *
 * Scroll: scrollSmooth lerps toward scrollTarget each frame, then each
 *   band's Y center is offset by a small fraction of scrollSmooth, creating
 *   a parallax effect — bands shift at a different rate than page content.
 *
 * Perf: 2 gradient fills per frame (trivial). RAF pauses on tab hidden.
 */

const ROT_SPEED  = 0.055;   // radians/second — full rotation in ~114s
const ORBIT_K    = 0.30;    // orbit amplitude multiplier (fraction of band size)
const LERP       = 0.06;    // scroll lerp factor per frame

export default function AuroraBg() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let raf      = null;
    let resizeTimer = null;
    let scrollTarget = window.scrollY;
    let scrollSmooth = window.scrollY;

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function drawBand(cx, cy, stretchX, stretchY, radius, rot, color, opacity) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      ctx.scale(stretchX, stretchY);

      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
      grad.addColorStop(0,   `rgba(${color},${opacity})`);
      grad.addColorStop(0.4, `rgba(${color},${opacity * 0.55})`);
      grad.addColorStop(1,   `rgba(${color},0)`);

      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();
    }

    function animate(ts) {
      const t = ts * 0.001 * ROT_SPEED;

      // Lerp scroll
      scrollSmooth += (scrollTarget - scrollSmooth) * LERP;

      const W = canvas.width;
      const H = canvas.height;
      const R = Math.min(W, H);

      ctx.clearRect(0, 0, W, H);

      // ── Band A: Navy — top-left, drifts with gentle orbit ────────────────
      const aOrbit = R * 0.12 * ORBIT_K;
      const ax = W * -0.05  + Math.cos(t * 0.7)  * aOrbit;
      const ay = H * -0.08  + Math.sin(t * 0.5)  * aOrbit - scrollSmooth * 0.03;
      drawBand(ax, ay, 2.2, 1, R * 0.58, t, '10,52,138', 0.11);

      // ── Band B: Cyan — bottom-right, counter-drifts ──────────────────────
      const bOrbit = R * 0.14 * ORBIT_K;
      const bx = W * 1.05  + Math.cos(t * 0.6 + 2.1) * bOrbit;
      const by = H * 1.08  + Math.sin(t * 0.45 + 1.4) * bOrbit - scrollSmooth * 0.05;
      drawBand(bx, by, 2.0, 1, R * 0.62, -t * 0.85 + 0.8, '30,196,247', 0.09);

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
      scrollTarget = window.scrollY;
    }

    resize();
    raf = requestAnimationFrame(animate);

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);

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
        willChange: 'transform',
      }}
    />
  );
}
