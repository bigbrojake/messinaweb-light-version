import ServiceCatalog from '../components/services/ServiceCatalog';
import TechStackTerminal from '../components/services/TechStackTerminal';
import StaffingModels from '../components/services/StaffingModels';
import Methodology from '../components/home/Methodology';

export default function Services() {
  return (
    <div className="w-full min-h-screen pt-24">
      <div data-nav-section="catalog"><ServiceCatalog /></div>
      <div data-nav-section="techstack"><TechStackTerminal /></div>
      <div data-nav-section="staffing"><StaffingModels /></div>
      <div data-nav-section="methodology"><Methodology /></div>
    </div>
  );
}
