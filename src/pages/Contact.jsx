import ContactProtocol from '../components/contact/ContactProtocol';
import GlobalReachMap from '../components/contact/GlobalReachMap';

export default function Contact() {
  return (
    <div className="w-full min-h-screen pt-24">
      <div data-nav-section="protocol"><ContactProtocol /></div>
      <div data-nav-section="map"><GlobalReachMap /></div>
    </div>
  );
}
