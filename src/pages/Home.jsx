import HeroSection from '../components/home/HeroSection';
import TrustAwards from '../components/home/TrustAwards';
import ValueHighlights from '../components/home/ValueHighlights';
import CoreValues from '../components/about/CoreValues';
import PartnerMarquee from '../components/home/PartnerMarquee';

export default function Home() {
  return (
    <div className="w-full">
      <div data-nav-section="hero"><HeroSection /></div>
      <div data-nav-section="features"><ValueHighlights /></div>
      <div data-nav-section="trust"><TrustAwards /></div>
      <div data-nav-section="highlights"><CoreValues /></div>
      <div data-nav-section="partners"><PartnerMarquee /></div>
    </div>
  );
}
