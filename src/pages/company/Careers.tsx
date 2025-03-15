
import { useEffect } from 'react';
import PageLayout from '@/components/PageLayout';

const Careers = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageLayout title="Careers">
      <p className="text-denim-800 mb-6">
        Join our team at DENIM and become part of a passionate community dedicated to quality craftsmanship, 
        sustainability, and innovation in fashion. We offer diverse opportunities across retail, design, 
        manufacturing, and corporate roles.
      </p>
      
      <h2 className="text-2xl font-display text-denim-900 mt-10 mb-4">Why Work With Us</h2>
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-denim-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-denim-800 mb-2">Inclusive Culture</h3>
          <p className="text-denim-700">We celebrate diversity and create an environment where all team members feel valued and empowered.</p>
        </div>
        
        <div className="bg-denim-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-denim-800 mb-2">Growth Opportunities</h3>
          <p className="text-denim-700">We invest in our team's development through training, mentorship, and advancement pathways.</p>
        </div>
        
        <div className="bg-denim-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-denim-800 mb-2">Work With Purpose</h3>
          <p className="text-denim-700">Contribute to sustainable fashion practices that are changing the industry for the better.</p>
        </div>
      </div>
      
      <h2 className="text-2xl font-display text-denim-900 mt-10 mb-4">Current Openings</h2>
      <div className="space-y-4 mb-10">
        <div className="border-b border-denim-200 pb-4">
          <h3 className="font-semibold text-denim-800">Senior Denim Designer</h3>
          <p className="text-denim-700">New York, NY | Full-time</p>
          <p className="text-denim-600 mt-2">Lead the design of our premium denim collections, from concept to production.</p>
        </div>
        
        <div className="border-b border-denim-200 pb-4">
          <h3 className="font-semibold text-denim-800">Retail Store Manager</h3>
          <p className="text-denim-700">Chicago, IL | Full-time</p>
          <p className="text-denim-600 mt-2">Oversee operations of our flagship Chicago location while delivering exceptional customer experiences.</p>
        </div>
        
        <div className="border-b border-denim-200 pb-4">
          <h3 className="font-semibold text-denim-800">Sustainability Coordinator</h3>
          <p className="text-denim-700">Los Angeles, CA | Full-time</p>
          <p className="text-denim-600 mt-2">Help implement and manage our eco-friendly initiatives across production and retail operations.</p>
        </div>
        
        <div className="border-b border-denim-200 pb-4">
          <h3 className="font-semibold text-denim-800">E-Commerce Specialist</h3>
          <p className="text-denim-700">Remote | Full-time</p>
          <p className="text-denim-600 mt-2">Drive digital sales growth through website optimization and digital marketing strategies.</p>
        </div>
      </div>
    </PageLayout>
  );
};

export default Careers;
