import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const bootSequence = [
  '[SYSTEM] Initializing Tech Stack Matrix...',
  '[SYSTEM] Loading IaC Modules...',
  '> Terraform : ACTIVE (v1.5.0)',
  '> Ansible : ACTIVE (Core 2.15)',
  '> Azure Bicep : ACTIVE',
  '> ARM Templates : ACTIVE',
  '[SYSTEM] Loading Scripting Engine...',
  '> Python : ACTIVE (3.11+)',
  '[SYSTEM] Matrix Online. Waiting for deployment command...',
];

export default function TechStackTerminal() {
  const containerRef = useRef(null);
  const [typedLines, setTypedLines] = useState([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 70%',
        onEnter: () => {
          let currentLine = 0;
          const interval = setInterval(() => {
            setTypedLines((prev) => {
              if (currentLine >= bootSequence.length) return prev;
              return [...prev, bootSequence[currentLine]];
            });
            currentLine++;
            if (currentLine >= bootSequence.length) clearInterval(interval);
          }, 400);
        },
        once: true,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 px-6 w-full flex justify-center bg-background">
      <div className="w-full max-w-4xl bg-[#0d1117] rounded-xl overflow-hidden shadow-2xl border border-gray-800 flex flex-col">
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-gray-800">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-4 text-xs font-mono text-gray-500">mts-terminal ~ root</span>
        </div>

        {/* Terminal body */}
        <div className="p-6 md:p-8 min-h-[300px] font-mono text-xs md:text-sm flex flex-col gap-2">
          {typedLines.map((line, i) => (
            <div key={i} className={line.startsWith('>') ? 'text-accent pl-4' : 'text-emerald-400'}>
              {line}
            </div>
          ))}
          <div className="flex items-center mt-2">
            <span className="text-accent pr-2">root@mts:~#</span>
            <span className="animate-pulse w-2 h-4 bg-gray-400" />
          </div>
        </div>
      </div>
    </section>
  );
}
