import HeroSection from '../components/home/HeroSection';
import ValueHighlights from '../components/home/ValueHighlights';
import TrustAwards from '../components/home/TrustAwards';
import FeaturesSection from '../components/home/FeaturesSection';
import Methodology from '../components/home/Methodology';
import PartnerMarquee from '../components/home/PartnerMarquee';

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <ValueHighlights />
      <TrustAwards />
      <FeaturesSection />
      <Methodology />
      <PartnerMarquee />
    </div>
  );
}
