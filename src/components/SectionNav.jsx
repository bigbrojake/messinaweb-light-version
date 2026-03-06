import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronUp, ChevronDown } from 'lucide-react';

export default function SectionNav() {
  const location = useLocation();
  const [sections, setSections] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [visible, setVisible] = useState(false);

  // Re-discover sections on route change
  useEffect(() => {
    const timer = setTimeout(() => {
      const els = Array.from(document.querySelectorAll('[data-nav-section]'));
      setSections(els);
      setCurrentIdx(0);
      setVisible(els.length > 1);
    }, 150);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Track current section via scroll midpoint
  useEffect(() => {
    if (!sections.length) return;
    function onScroll() {
      const mid = window.scrollY + window.innerHeight * 0.5;
      let idx = 0;
      sections.forEach((el, i) => {
        if (mid >= el.offsetTop) idx = i;
      });
      setCurrentIdx(idx);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [sections]);

  const goTo = useCallback((idx) => {
    if (idx < 0 || idx >= sections.length) return;
    const targetTop = sections[idx].offsetTop;
    const distance  = Math.abs(targetTop - window.scrollY);
    // If jumping more than 2 viewports (e.g. through methodology's scroll space),
    // use instant scroll so we don't animate through intermediate phases
    const behavior = distance > window.innerHeight * 2 ? 'auto' : 'smooth';
    window.scrollTo({ top: targetTop, behavior });
  }, [sections]);

  if (!visible || sections.length < 2) return null;

  const atFirst = currentIdx <= 0;
  const atLast  = currentIdx >= sections.length - 1;

  const btnBase =
    'w-10 h-10 rounded-full flex items-center justify-center ' +
    'bg-white/85 backdrop-blur-md border border-primary/10 shadow-brand ' +
    'text-primary/60 ' +
    'hover:bg-primary hover:border-primary hover:text-white ' +
    'hover:shadow-[0_0_0_1px_rgba(30,196,247,0.28),0_8px_32px_rgba(10,52,138,0.28),0_0_28px_rgba(30,196,247,0.30)] ' +
    'transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ';

  return (
    <div className="fixed right-5 bottom-8 z-50 flex flex-col items-center gap-2 select-none">
      <button
        onClick={() => goTo(currentIdx - 1)}
        aria-label="Previous section"
        className={btnBase + (atFirst ? 'opacity-25 pointer-events-none' : '')}
      >
        <ChevronUp size={16} strokeWidth={2.2} />
      </button>

      <div className="flex flex-col items-center gap-[5px] py-1">
        {sections.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to section ${i + 1}`}
            className="transition-all duration-300"
            style={{
              width:  i === currentIdx ? 6 : 4,
              height: i === currentIdx ? 6 : 4,
              borderRadius: '9999px',
              background: i === currentIdx
                ? 'rgb(10,52,138)'
                : 'rgba(10,52,138,0.22)',
              boxShadow: i === currentIdx
                ? '0 0 8px rgba(30,196,247,0.55)'
                : 'none',
            }}
          />
        ))}
      </div>

      <button
        onClick={() => goTo(currentIdx + 1)}
        aria-label="Next section"
        className={btnBase + (atLast ? 'opacity-25 pointer-events-none' : '')}
      >
        <ChevronDown size={16} strokeWidth={2.2} />
      </button>
    </div>
  );
}
