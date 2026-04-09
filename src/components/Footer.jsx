import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-primary text-white rounded-t-[4rem] px-8 pt-16 pb-8 relative z-10 w-full">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-white/15 pb-12 mb-8">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img src="/mts-logo.png" alt="MTS" className="h-8 w-auto brightness-0 invert" />
            <h2 className="text-2xl font-heading font-bold text-white">MTS</h2>
          </div>
          <p className="text-sm text-white/60 font-body max-w-xs leading-relaxed">
            Empowering organizations through innovative IT consulting, flexible resource staffing, and results-driven service delivery.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-heading font-semibold text-white">Navigation</h3>
          <div className="flex flex-col gap-2">
            <Link to="/about" className="text-sm text-white/60 hover:text-accent transition-colors duration-300">About Us</Link>
            <Link to="/what-we-do" className="text-sm text-white/60 hover:text-accent transition-colors duration-300">What We Do</Link>
            <Link to="/case-studies" className="text-sm text-white/60 hover:text-accent transition-colors duration-300">Case Studies</Link>
            <Link to="/contact" className="text-sm text-white/60 hover:text-accent transition-colors duration-300">Contact</Link>
          </div>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-heading font-semibold text-white">Contact</h3>
          <div className="flex flex-col gap-2">
            <a href="mailto:info@messina-llc.com" className="text-sm text-white/60 hover:text-accent transition-colors duration-300">
              info@messina-llc.com
            </a>
            <p className="text-sm text-white/60">Newburyport, MA</p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-white/40 uppercase tracking-widest">
          &copy; 2026 Messina Technology Solutions
        </p>

        {/* System Operational */}
        <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-[2rem] border border-white/10">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-xs font-mono text-white/70 uppercase">System Operational</span>
        </div>
      </div>
    </footer>
  );
}
