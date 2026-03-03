import ServiceCatalog from '../components/services/ServiceCatalog';
import TechStackTerminal from '../components/services/TechStackTerminal';

export default function Services() {
  return (
    <div className="w-full bg-background min-h-screen pt-24">
      <ServiceCatalog />
      <TechStackTerminal />
    </div>
  );
}
