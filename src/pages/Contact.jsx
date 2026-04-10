import ContactProtocol from '../components/contact/ContactProtocol';
import LocationsMap from '../components/about/LocationsMap';

export default function Contact() {
  return (
    <div className="w-full min-h-screen pt-24">
      <div data-nav-section="protocol"><ContactProtocol /></div>
      <div data-nav-section="locations"><LocationsMap /></div>
    </div>
  );
}
