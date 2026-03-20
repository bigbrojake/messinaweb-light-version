import { useEffect, useRef, useState } from 'react';
import createGlobe from 'cobe';

const SIZE = 700;

export default function GlobeHero() {
  const canvasRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Delay globe initialization by 800ms to let other content load first
    const timer = setTimeout(() => {
      let phi = 0;
      let lastScrollY = 0;
      let scrollVelocity = 0;
      let animId;

      const onScroll = () => {
        const delta = Math.abs(window.scrollY - lastScrollY);
        lastScrollY = window.scrollY;
        scrollVelocity = Math.min(delta * 0.0004, 0.008);
      };
      window.addEventListener('scroll', onScroll, { passive: true });

      const globe = createGlobe(canvasRef.current, {
        devicePixelRatio: window.devicePixelRatio || 2,
        width:  SIZE,
        height: SIZE,
        phi:    0,
        theta:  0.28,
        dark:   0,
        diffuse: 1.8,
        mapSamples:    16000,
        mapBrightness: 7,
        baseColor:   [1.0,  1.0,  1.0],
        markerColor: [0.0,  0.71, 0.89],
        glowColor:   [0.88, 0.94, 1.0],
        markers: [],
      });

      // COBE v2 requires a manual rAF loop — no onRender callback
      const animate = () => {
        phi += 0.0018 + scrollVelocity;
        scrollVelocity *= 0.88;
        globe.update({ phi });
        animId = requestAnimationFrame(animate);
      };
      animId = requestAnimationFrame(animate);

      setIsReady(true);

      return () => {
        globe.destroy();
        cancelAnimationFrame(animId);
        window.removeEventListener('scroll', onScroll);
      };
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    // overflow:hidden contains any canvas overflow from COBE's internal DOM injection
    <div
      className="hidden md:block"
      style={{
        position:      'absolute',
        right:         '15%',
        top:           '58%',
        transform:     'translateY(-50%)',
        width:          SIZE,
        height:         SIZE,
        zIndex:         5,
        pointerEvents: 'none',
        overflow:      'hidden',
      }}
    >
      {/* width/height 100% so it fills the wrapper after COBE moves it into its own injected div */}
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          opacity: isReady ? 0.42 : 0,
          transition: 'opacity 1.2s ease-in-out',
        }}
      />
    </div>
  );
}
