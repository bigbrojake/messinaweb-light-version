import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import DotWave from './components/DotWave';
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
      <DotWave />
      <ScrollToTop />
      <div className="min-h-screen flex flex-col font-body">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <SectionNav />
    </BrowserRouter>
  );
}

export default App;
