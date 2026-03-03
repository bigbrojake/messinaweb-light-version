import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/case-studies', label: 'Case Studies' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkClass = (path) => {
    const active = location.pathname === path;
    if (scrolled) {
      return `text-sm font-semibold transition-all duration-300 ${active ? 'text-primary' : 'text-textDark/70 hover:text-primary'}`;
    }
    return `text-sm font-semibold transition-all duration-300 ${active ? 'text-white' : 'text-white/70 hover:text-white'}`;
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 py-4 flex justify-center pointer-events-none">
      <nav
        className={`pointer-events-auto flex items-center justify-between px-6 py-3 rounded-[3rem] transition-all duration-500 ease-magnetic w-full max-w-5xl ${
          scrolled
            ? 'bg-white/80 backdrop-blur-xl border border-gray-200/60 shadow-lg shadow-black/5'
            : 'bg-primary/20 backdrop-blur-sm border border-white/10'
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/mts-logo.png" alt="MTS" className="h-8 w-auto" />
          <span className={`text-lg font-heading font-bold tracking-wide transition-colors duration-500 ${scrolled ? 'text-primary' : 'text-white'}`}>
            MTS
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className={linkClass(link.path)}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <Link
          to="/contact"
          className="hidden md:inline-flex magnetic-btn px-6 py-2.5 text-sm font-bold text-white bg-accent rounded-[2rem] shadow-sm items-center"
        >
          <span className="relative z-10">Get Started</span>
          <span className="absolute inset-0 bg-white/20 rounded-[2rem] opacity-0 hover:opacity-100 transition-opacity duration-300 ease-out z-0" />
        </Link>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden p-2 rounded-xl transition-colors ${scrolled ? 'text-textDark' : 'text-white'}`}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`pointer-events-auto fixed inset-x-0 top-[72px] mx-4 rounded-[2rem] bg-white/95 backdrop-blur-xl border border-gray-200/60 shadow-2xl transition-all duration-400 ease-magnetic origin-top md:hidden ${
          mobileOpen
            ? 'opacity-100 scale-y-100 translate-y-0'
            : 'opacity-0 scale-y-95 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="flex flex-col p-6 gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                location.pathname === link.path
                  ? 'bg-primary/10 text-primary'
                  : 'text-textDark hover:bg-gray-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setMobileOpen(false)}
            className="magnetic-btn mt-2 px-6 py-3 text-center text-base font-bold text-white bg-accent rounded-[2rem]"
          >
            <span className="relative z-10">Get Started</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
