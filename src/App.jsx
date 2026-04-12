import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import AuroraBg from './components/AuroraBg';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SectionNav from './components/SectionNav';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import CaseStudies from './pages/CaseStudies';
import Contact from './pages/Contact';

function App() {
  return (
    <BrowserRouter>
      <AuroraBg />
      <ScrollToTop />
      <div className="min-h-screen flex flex-col font-body">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/what-we-do" element={<Services />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <SectionNav />
    </BrowserRouter>
  );
}

export default App;
