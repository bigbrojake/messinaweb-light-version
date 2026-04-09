import CaseStudyGrids from '../components/case-studies/CaseStudyGrids';
import ExecutiveTestimonials from '../components/case-studies/ExecutiveTestimonials';

export default function CaseStudies() {
  return (
    <div className="w-full min-h-screen" style={{ background: '#050d1a' }}>
      <div data-nav-section="grids"><CaseStudyGrids /></div>
      <div data-nav-section="testimonials"><ExecutiveTestimonials /></div>
    </div>
  );
}
