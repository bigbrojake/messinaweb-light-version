import Manifesto from '../components/about/Manifesto';
import TeamGrid from '../components/about/TeamGrid';
import FeaturesSection from '../components/home/FeaturesSection';
import CommunityImpact from '../components/about/CommunityImpact';
import LocationsMap from '../components/about/LocationsMap';

export default function About() {
  return (
    <div className="w-full min-h-screen pt-24">
      <div data-nav-section="mission"><Manifesto /></div>
      <div data-nav-section="team"><TeamGrid /></div>
      <div data-nav-section="pillars"><FeaturesSection /></div>
      <div data-nav-section="community"><CommunityImpact /></div>
      <div data-nav-section="locations"><LocationsMap /></div>
    </div>
  );
}
