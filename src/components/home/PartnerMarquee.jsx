const partners = [
  'Dell Technologies',
  'RedHat',
  'VMware',
  'Microsoft Azure',
  'ServiceNow',
  'OpenStack',
  'Ansible',
  'Terraform',
];

export default function PartnerMarquee() {
  // Double the array for seamless looping via -50% translateX
  const allPartners = [...partners, ...partners];

  return (
    <div className="w-full py-16 overflow-hidden relative z-20">
      <div className="text-center mb-10">
        <h3 className="text-sm font-mono tracking-widest uppercase text-primary/45">
          Integrated Ecosystem
        </h3>
      </div>

      <div className="relative overflow-x-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {allPartners.map((partner, index) => (
            <span
              key={index}
              className="mx-12 text-2xl md:text-4xl font-heading font-bold text-primary/20 transition-colors duration-300 hover:text-accent select-none"
            >
              {partner}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
