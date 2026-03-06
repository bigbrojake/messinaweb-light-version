import HeroSection from '../components/home/HeroSection';
import ValueHighlights from '../components/home/ValueHighlights';
import TrustAwards from '../components/home/TrustAwards';
import FeaturesSection from '../components/home/FeaturesSection';
import PartnerMarquee from '../components/home/PartnerMarquee';

export default function Home() {
  return (
    <div className="w-full">
      <div data-nav-section="hero"><HeroSection /></div>
      <div data-nav-section="trust"><TrustAwards /></div>
      <div data-nav-section="highlights"><ValueHighlights /></div>
      <div data-nav-section="features"><FeaturesSection /></div>
      <div data-nav-section="partners"><PartnerMarquee /></div>
    </div>
  );
}
