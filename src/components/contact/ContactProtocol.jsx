import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactProtocol() {
  const [status, setStatus] = useState('idle');
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.form-element',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <section ref={containerRef} className="py-24 px-6 max-w-5xl mx-auto w-full relative z-20">
      <div className="bg-white rounded-[3rem] p-10 md:p-16 border border-primary/10 shadow-[0_8px_48px_rgba(10,52,138,0.10)] grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="form-element flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-textDark">
            Get In
            <br />
            Touch
          </h1>
          <p className="text-gray-500 font-body text-lg">
            Whether you&apos;re a client who needs resources or a consultant looking for new opportunities, we
            would love to hear from you.
          </p>
          <div className="mt-8 flex flex-col gap-4">
            <a
              href="mailto:info@messina-llc.com"
              className="font-mono text-accent hover:text-primary transition-colors text-lg font-semibold"
            >
              info@messina-llc.com
            </a>
            <p className="font-mono text-gray-400 text-sm">HQ: Newburyport, MA</p>
          </div>
        </div>

        <div className="w-full">
          {status === 'success' ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-12">
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <CheckCircle className="text-accent" size={40} />
              </div>
              <h3 className="text-2xl font-heading font-bold text-textDark">Transmission Successful</h3>
              <p className="text-gray-500 font-body">Our team will review your inquiry and respond shortly.</p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-6 text-sm font-mono text-accent uppercase tracking-widest hover:text-primary transition-colors"
              >
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="form-element relative group">
                <input
                  type="text"
                  id="name"
                  required
                  className="peer w-full bg-transparent border-b-2 border-gray-300 py-3 text-textDark focus:outline-none focus:border-accent transition-colors placeholder-transparent"
                  placeholder="Name"
                />
                <label
                  htmlFor="name"
                  className="absolute left-0 top-3 text-gray-400 font-body transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent peer-valid:-top-4 peer-valid:text-xs"
                >
                  Full Name
                </label>
              </div>

              <div className="form-element relative group mt-4">
                <input
                  type="email"
                  id="email"
                  required
                  className="peer w-full bg-transparent border-b-2 border-gray-300 py-3 text-textDark focus:outline-none focus:border-accent transition-colors placeholder-transparent"
                  placeholder="Email"
                />
                <label
                  htmlFor="email"
                  className="absolute left-0 top-3 text-gray-400 font-body transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent peer-valid:-top-4 peer-valid:text-xs"
                >
                  Email Address
                </label>
              </div>

              <div className="form-element relative group mt-4">
                <select
                  id="intent"
                  required
                  defaultValue=""
                  className="peer w-full bg-transparent border-b-2 border-gray-300 py-3 text-textDark focus:outline-none focus:border-accent transition-colors appearance-none [&>option]:bg-white [&>option]:text-textDark"
                >
                  <option value="" disabled hidden />
                  <option value="client">I need resources / consulting</option>
                  <option value="consultant">I am looking for opportunities</option>
                  <option value="other">Other inquiry</option>
                </select>
                <label
                  htmlFor="intent"
                  className="absolute left-0 -top-4 text-xs text-gray-400 font-body transition-all duration-300 peer-focus:text-accent"
                >
                  Intent
                </label>
              </div>

              <div className="form-element relative group mt-4">
                <textarea
                  id="message"
                  required
                  rows="3"
                  className="peer w-full bg-transparent border-b-2 border-gray-300 py-3 text-textDark focus:outline-none focus:border-accent transition-colors placeholder-transparent resize-none"
                  placeholder="Message"
                />
                <label
                  htmlFor="message"
                  className="absolute left-0 top-3 text-gray-400 font-body transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent peer-valid:-top-4 peer-valid:text-xs"
                >
                  Your Message
                </label>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="form-element mt-6 magnetic-btn w-full py-4 bg-primary text-white rounded-[2rem] font-semibold flex items-center justify-center gap-2 group/btn disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {status === 'submitting' ? 'Transmitting...' : 'Transmit'}
                  {status !== 'submitting' && (
                    <Send size={18} className="transform group-hover/btn:translate-x-1 transition-transform" />
                  )}
                </span>
                <span className="absolute inset-0 bg-accent rounded-[2rem] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 ease-out z-0" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
