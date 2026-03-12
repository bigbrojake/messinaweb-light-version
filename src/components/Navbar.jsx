import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const navLinks = [
  {
    path: '/',
    label: 'Home',
    sections: [
      { key: 'hero',       label: 'Home Overview'       },
      { key: 'trust',      label: 'Awards & Recognition' },
      { key: 'features',   label: 'What We Deliver'     },
      { key: 'highlights', label: 'Our Principles'      },
      { key: 'partners',   label: 'Partner Ecosystem'   },
    ],
  },
  {
    path: '/about',
    label: 'About',
    sections: [
      { key: 'mission',    label: 'Our Mission'     },
      { key: 'team',       label: 'Meet the Team'  },
      { key: 'pillars',    label: 'Core Pillars'   },
      { key: 'community',  label: 'Community'      },
    ],
  },
  {
    path: '/services',
    label: 'Services',
    sections: [
      { key: 'catalog',     label: 'Service Catalog'   },
      { key: 'techstack',   label: 'Tech Stack'        },
      { key: 'staffing',    label: 'Resource Staffing' },
      { key: 'methodology', label: 'MTS Methodology'   },
    ],
  },
  {
    path: '/case-studies',
    label: 'Case Studies',
    sections: [
      { key: 'grids',        label: 'Case Studies'  },
      { key: 'testimonials', label: 'Testimonials'  },
    ],
  },
  {
    path: '/contact',
    label: 'Contact',
    sections: [
      { key: 'protocol', label: 'Get in Touch'  },
      { key: 'map',      label: 'Global Reach'  },
    ],
  },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled]         = useState(false);
  const [pastHero, setPastHero]         = useState(false);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const closeTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      setPastHero(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
  }, [location.pathname]);

  function openDropdown(path) {
    clearTimeout(closeTimer.current);
    setActiveDropdown(path);
  }

  function closeDropdown() {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 110);
  }

  function keepDropdown() {
    clearTimeout(closeTimer.current);
  }

  function navigateToSection(pagePath, sectionKey) {
    setActiveDropdown(null);
    setMobileOpen(false);
    if (location.pathname === pagePath) {
      // Same page — scroll directly
      const el = document.querySelector(`[data-nav-section="${sectionKey}"]`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // Different page — navigate with hash; ScrollToTop handles the scroll
      navigate(`${pagePath}#${sectionKey}`);
    }
  }

  // Only use transparent glass treatment on the home page hero
  const onHeroGradient = location.pathname === '/' && !pastHero;

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 py-4 flex justify-center pointer-events-none">
      <nav
        className={`pointer-events-auto flex items-center justify-between px-7 py-3.5 rounded-[3rem] transition-all duration-500 ease-magnetic w-full max-w-5xl ${
          onHeroGradient
            ? 'bg-white/10 backdrop-blur-md border border-white/18 shadow-none'
            : scrolled
              ? 'bg-white/95 backdrop-blur-2xl border border-gray-200/80 shadow-[0_4px_32px_rgba(10,52,138,0.10),0_0_0_1px_rgba(10,52,138,0.04)]'
              : 'bg-white/88 backdrop-blur-xl border border-primary/10 shadow-[0_2px_24px_rgba(10,52,138,0.08)]'
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img src="/mts-logo.png" alt="Messina Technology Solutions" className="h-9 w-auto" />
          <span className={`text-base font-heading font-bold tracking-widest uppercase hidden sm:block ${onHeroGradient ? 'text-white' : 'text-primary'}`}>
            MTS
          </span>
        </Link>

        {/* Desktop nav links with dropdowns */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const active = location.pathname === link.path;
            const open   = activeDropdown === link.path;

            return (
              <div
                key={link.path}
                className="relative"
                onMouseEnter={() => openDropdown(link.path)}
                onMouseLeave={closeDropdown}
              >
                {/* Nav link */}
                <Link
                  to={link.path}
                  className={`relative flex items-center gap-1 text-sm font-semibold transition-all duration-300 py-1 select-none ${
                    active
                      ? (onHeroGradient ? 'text-white' : 'text-primary')
                      : (onHeroGradient ? 'text-white/70 hover:text-white' : 'text-textDark/55 hover:text-textDark')
                  }`}
                >
                  {link.label}
                  <ChevronDown
                    size={12}
                    strokeWidth={2.5}
                    className={`transition-transform duration-250 ${open ? 'rotate-180' : ''}`}
                  />
                  {active && (
                    <span className="absolute bottom-[-3px] left-0 right-0 h-[2px] bg-accent rounded-full shadow-[0_0_6px_rgba(30,196,247,0.8)]" />
                  )}
                </Link>

                {/* Dropdown panel */}
                <div
                  onMouseEnter={keepDropdown}
                  onMouseLeave={closeDropdown}
                  className={`absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 min-w-[188px] z-50
                    bg-white border border-primary/10 rounded-2xl shadow-brand-lg
                    py-2 px-2
                    transition-all duration-[220ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]
                    ${open
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 -translate-y-2 pointer-events-none'
                    }`}
                >
                  {/* Arrow notch */}
                  <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border-l border-t border-primary/8 rotate-45" />

                  <div className="relative z-10">
                    {link.sections.map((sec) => (
                      <button
                        key={sec.key}
                        onClick={() => navigateToSection(link.path, sec.key)}
                        className="w-full text-left flex items-center gap-2.5 px-3 py-2.5 rounded-xl
                          text-sm text-textDark/60 font-body
                          hover:bg-primary/5 hover:text-primary
                          transition-all duration-200 group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/18 group-hover:bg-accent
                          transition-colors duration-200 shrink-0" />
                        {sec.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <Link
          to="/contact"
          className="hidden md:inline-flex magnetic-btn px-6 py-2.5 text-sm font-bold text-white bg-accent rounded-[2rem] items-center shadow-[0_0_20px_rgba(30,196,247,0.3)] border border-accent/40 shrink-0"
        >
          <span className="relative z-10">Get In Touch</span>
          <span className="absolute inset-0 bg-white/15 rounded-[2rem] opacity-0 hover:opacity-100 transition-opacity duration-300 ease-out z-0" />
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden p-2 rounded-xl transition-colors ${onHeroGradient ? 'text-white/70 hover:text-white' : 'text-textDark/60 hover:text-textDark'}`}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`pointer-events-auto fixed inset-x-0 top-[76px] mx-4 rounded-[2rem] bg-white/96 backdrop-blur-2xl border border-gray-200 shadow-[0_8px_32px_rgba(0,0,0,0.10)] md:hidden
          transition-all duration-300 ease-magnetic origin-top overflow-hidden
          ${mobileOpen ? 'opacity-100 scale-y-100 translate-y-0' : 'opacity-0 scale-y-95 -translate-y-2 pointer-events-none'}`}
      >
        <div className="flex flex-col p-4 gap-0.5">
          {navLinks.map((link) => {
            const active   = location.pathname === link.path;
            const expanded = mobileExpanded === link.path;

            return (
              <div key={link.path}>
                {/* Page link row */}
                <div className={`flex items-center rounded-xl overflow-hidden ${
                  active ? 'bg-primary/8 border border-primary/14' : ''
                }`}>
                  <Link
                    to={link.path}
                    className={`flex-1 px-4 py-3 text-base font-semibold transition-all ${
                      active ? 'text-primary' : 'text-textDark/60 hover:text-textDark'
                    }`}
                  >
                    {link.label}
                  </Link>
                  <button
                    onClick={() => setMobileExpanded(expanded ? null : link.path)}
                    className="px-3 py-3 text-textDark/40 hover:text-primary transition-colors"
                  >
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-250 ${expanded ? 'rotate-180' : ''}`}
                    />
                  </button>
                </div>

                {/* Section sub-links — expand/collapse */}
                <div className={`overflow-hidden transition-all duration-300 ${
                  expanded ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="pl-5 pr-2 pb-1 pt-0.5 flex flex-col gap-0.5">
                    {link.sections.map((sec) => (
                      <button
                        key={sec.key}
                        onClick={() => navigateToSection(link.path, sec.key)}
                        className="text-left flex items-center gap-2.5 px-3 py-2 rounded-lg
                          text-sm text-textDark/50 hover:text-primary hover:bg-primary/5
                          transition-all duration-200 group"
                      >
                        <span className="w-1 h-1 rounded-full bg-accent/60 group-hover:bg-accent shrink-0" />
                        {sec.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Mobile CTA */}
          <Link
            to="/contact"
            onClick={() => setMobileOpen(false)}
            className="magnetic-btn mt-3 px-6 py-3 text-center text-base font-bold text-white bg-accent rounded-[2rem] shadow-[0_0_20px_rgba(30,196,247,0.25)]"
          >
            <span className="relative z-10">Get In Touch</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
