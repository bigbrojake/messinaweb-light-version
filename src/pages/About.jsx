import Manifesto from '../components/about/Manifesto';
import TeamGrid from '../components/about/TeamGrid';
import CommunityImpact from '../components/about/CommunityImpact';
import CoreValues from '../components/about/CoreValues';

export default function About() {
  return (
    <div className="w-full min-h-screen pt-24">
      <div data-nav-section="mission"><Manifesto /></div>
      <div data-nav-section="team"><TeamGrid /></div>
      <div data-nav-section="community"><CommunityImpact /></div>
      <div data-nav-section="values"><CoreValues /></div>
    </div>
  );
}
