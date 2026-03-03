import ContactProtocol from '../components/contact/ContactProtocol';
import GlobalReachMap from '../components/contact/GlobalReachMap';

export default function Contact() {
  return (
    <div className="w-full bg-background min-h-screen pt-24">
      <ContactProtocol />
      <GlobalReachMap />
    </div>
  );
}
