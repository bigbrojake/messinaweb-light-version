import RoiDashboard from '../components/case-studies/RoiDashboard';
import CaseStudyGrids from '../components/case-studies/CaseStudyGrids';
import ExecutiveTestimonials from '../components/case-studies/ExecutiveTestimonials';

export default function CaseStudies() {
  return (
    <div className="w-full bg-background min-h-screen pt-24">
      <RoiDashboard />
      <CaseStudyGrids />
      <ExecutiveTestimonials />
    </div>
  );
}
