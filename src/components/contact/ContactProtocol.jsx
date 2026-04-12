import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, CheckCircle, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactProtocol() {
  const [status,  setStatus]  = useState('idle');
  const [error,   setError]   = useState('');
  const [fields,  setFields]  = useState({ name: '', email: '', intent: '', message: '' });
  const containerRef = useRef(null);

  const handleChange = (e) => {
    setFields(f => ({ ...f, [e.target.id]: e.target.value }));
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.form-element',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0,
          duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setError('');
    try {
      const res = await fetch('/api/send-email', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(fields),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');
      setStatus('success');
    } catch (err) {
      setError(err.message);
      setStatus('idle');
    }
  };

  return (
    <section ref={containerRef} className="py-24 px-6 max-w-6xl mx-auto w-full relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-16 items-start">

        {/* Left: Editorial intro */}
        <div className="form-element flex flex-col gap-7 md:pt-4">
          <div className="flex items-center gap-4">
            <div className="w-px h-8 bg-gradient-to-b from-accent to-primary/50" />
            <span className="font-mono text-[11px] tracking-[0.28em] text-accent uppercase">Secure Transmission</span>
          </div>

          <h1 className="font-heading font-bold text-textDark leading-[1.05]" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}>
            Let's<br /><span className="text-primary">Talk.</span>
          </h1>

          <p className="font-body text-gray-500 text-lg leading-relaxed max-w-xs">
            Whether you need technical resources, consulting expertise, or are seeking new opportunities — our team is ready.
          </p>

          <div className="mt-4 flex flex-col gap-4">
            <div className="h-px bg-gradient-to-r from-primary/12 to-transparent" />
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/6 border border-primary/10 flex items-center justify-center">
                <MapPin size={14} className="text-primary/50" />
              </div>
              <div>
                <p className="font-mono text-[10px] text-primary/35 tracking-widest uppercase">Headquarters</p>
                <p className="font-body text-sm text-textDark/60">Newburyport, MA</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form panel */}
        <div className="form-element relative">
          {/* Top accent stripe */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-accent to-primary/40 rounded-t-[2rem] z-10" />

          <div className="bg-[#F7FAFF] rounded-[2rem] pt-10 px-8 md:px-10 pb-8 border border-primary/8 shadow-[0_4px_32px_rgba(10,52,138,0.06)]">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-16">
                <div className="w-20 h-20 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-2">
                  <CheckCircle className="text-accent" size={38} />
                </div>
                <h3 className="text-2xl font-heading font-bold text-textDark">Transmission Successful</h3>
                <p className="text-gray-500 font-body">Our team will review your inquiry and respond shortly.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-4 text-sm font-mono text-accent uppercase tracking-widest hover:text-primary transition-colors"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="form-element relative">
                  <input
                    type="text" id="name" required
                    value={fields.name} onChange={handleChange}
                    className="peer w-full bg-white border border-primary/10 rounded-xl px-4 py-3.5 text-textDark text-sm focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(30,196,247,0.12)] transition-all placeholder-transparent font-body"
                    placeholder="Name"
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-4 top-3.5 text-gray-400 text-sm font-body transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-accent peer-focus:bg-[#F7FAFF] peer-focus:px-1 peer-valid:-top-2.5 peer-valid:text-xs peer-valid:bg-[#F7FAFF] peer-valid:px-1"
                  >
                    Full Name
                  </label>
                </div>

                <div className="form-element relative">
                  <input
                    type="email" id="email" required
                    value={fields.email} onChange={handleChange}
                    className="peer w-full bg-white border border-primary/10 rounded-xl px-4 py-3.5 text-textDark text-sm focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(30,196,247,0.12)] transition-all placeholder-transparent font-body"
                    placeholder="Email"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-4 top-3.5 text-gray-400 text-sm font-body transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-accent peer-focus:bg-[#F7FAFF] peer-focus:px-1 peer-valid:-top-2.5 peer-valid:text-xs peer-valid:bg-[#F7FAFF] peer-valid:px-1"
                  >
                    Email Address
                  </label>
                </div>

                <div className="form-element">
                  <select
                    id="intent" required
                    value={fields.intent} onChange={handleChange}
                    className="w-full bg-white border border-primary/10 rounded-xl px-4 py-3.5 text-textDark text-sm focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(30,196,247,0.12)] transition-all appearance-none font-body [&>option]:bg-white [&>option]:text-textDark"
                  >
                    <option value="" disabled>Intent — select one</option>
                    <option value="client">I need resources / consulting</option>
                    <option value="consultant">I am looking for opportunities</option>
                    <option value="other">Other inquiry</option>
                  </select>
                </div>

                <div className="form-element relative">
                  <textarea
                    id="message" required rows="4"
                    value={fields.message} onChange={handleChange}
                    className="peer w-full bg-white border border-primary/10 rounded-xl px-4 py-3.5 text-textDark text-sm focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(30,196,247,0.12)] transition-all placeholder-transparent resize-none font-body"
                    placeholder="Message"
                  />
                  <label
                    htmlFor="message"
                    className="absolute left-4 top-3.5 text-gray-400 text-sm font-body transition-all duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-accent peer-focus:bg-[#F7FAFF] peer-focus:px-1 peer-valid:-top-2.5 peer-valid:text-xs peer-valid:bg-[#F7FAFF] peer-valid:px-1"
                  >
                    Your Message
                  </label>
                </div>

                {error && (
                  <p className="text-sm text-red-500 font-body -mt-2">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="form-element w-full py-4 bg-primary text-white rounded-xl font-semibold font-body flex items-center justify-center gap-2.5 group/btn disabled:opacity-70 shadow-[0_4px_20px_rgba(10,52,138,0.22)] hover:shadow-[0_4px_28px_rgba(30,196,247,0.28)] transition-shadow duration-300 relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {status === 'submitting' ? 'Transmitting...' : 'Transmit'}
                    {status !== 'submitting' && (
                      <Send size={16} className="transform group-hover/btn:translate-x-1 transition-transform" />
                    )}
                  </span>
                  <span className="absolute inset-0 bg-accent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 z-0" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
