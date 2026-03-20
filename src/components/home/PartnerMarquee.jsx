const partners = [
  'Dell Technologies', 'RedHat', 'VMware', 'Microsoft Azure',
  'ServiceNow', 'OpenStack', 'Ansible', 'Terraform',
];

const fadeMask = {
  maskImage: 'linear-gradient(to right, transparent, black 14%, black 86%, transparent)',
  WebkitMaskImage: 'linear-gradient(to right, transparent, black 14%, black 86%, transparent)',
};

export default function PartnerMarquee() {
  const row = [...partners, ...partners, ...partners];

  return (
    <div className="w-full relative z-20 overflow-hidden bg-[#F5F9FF] border-t border-b border-primary/8 py-16">
      {/* Eyebrow */}
      <div className="flex items-center justify-center gap-5 mb-10">
        <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary/15" />
        <span className="font-mono text-[10px] tracking-[0.32em] text-primary/35 uppercase">Technology Partners</span>
        <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary/15" />
      </div>

      {/* Single row — large, slow */}
      <div className="relative overflow-x-hidden" style={fadeMask}>
        <div className="animate-marquee-slow whitespace-nowrap flex items-center">
          {row.map((partner, i) => (
            <span key={i} className="inline-flex items-center gap-5 mx-16">
              <span className="font-mono text-base text-accent/30 select-none">·</span>
              <span className="text-4xl md:text-5xl font-heading font-bold text-primary/20 hover:text-primary/45 transition-colors duration-400 select-none tracking-tight">
                {partner}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
