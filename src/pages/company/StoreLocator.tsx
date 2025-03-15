
import { useEffect } from 'react';
import PageLayout from '@/components/PageLayout';

const StoreLocator = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageLayout title="Store Locator">
      <p className="text-denim-800 mb-6">
        Find DENIM stores near you. Our retail locations offer personalized shopping experiences, professional sizing assistance, 
        and exclusive in-store services. Use the interactive map or browse our directory to locate your nearest DENIM boutique.
      </p>
      
      <div className="bg-denim-50 p-6 rounded-lg mb-10">
        <h2 className="text-xl font-display text-denim-900 mb-4">Store Directory</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border-b border-denim-200 pb-4">
            <h3 className="font-semibold text-denim-800">New York - SoHo</h3>
            <p className="text-denim-700">123 Broadway, New York, NY 10012</p>
            <p className="text-denim-600 text-sm">Mon-Sat: 10AM-8PM, Sun: 11AM-6PM</p>
            <p className="text-denim-600 text-sm">+1 (212) 555-1234</p>
          </div>
          
          <div className="border-b border-denim-200 pb-4">
            <h3 className="font-semibold text-denim-800">Los Angeles - Venice</h3>
            <p className="text-denim-700">456 Abbot Kinney Blvd, Venice, CA 90291</p>
            <p className="text-denim-600 text-sm">Mon-Sat: 10AM-9PM, Sun: 11AM-7PM</p>
            <p className="text-denim-600 text-sm">+1 (310) 555-5678</p>
          </div>
          
          <div className="border-b border-denim-200 pb-4">
            <h3 className="font-semibold text-denim-800">Chicago - Magnificent Mile</h3>
            <p className="text-denim-700">789 N Michigan Ave, Chicago, IL 60611</p>
            <p className="text-denim-600 text-sm">Mon-Sat: 9AM-8PM, Sun: 10AM-6PM</p>
            <p className="text-denim-600 text-sm">+1 (312) 555-9012</p>
          </div>
          
          <div className="border-b border-denim-200 pb-4">
            <h3 className="font-semibold text-denim-800">Miami - Design District</h3>
            <p className="text-denim-700">101 NE 40th St, Miami, FL 33137</p>
            <p className="text-denim-600 text-sm">Mon-Sat: 10AM-9PM, Sun: 12PM-6PM</p>
            <p className="text-denim-600 text-sm">+1 (305) 555-3456</p>
          </div>
        </div>
      </div>
      
      <div className="bg-denim-100 p-6 rounded-lg">
        <h2 className="text-xl font-display text-denim-900 mb-4">Coming Soon</h2>
        <p className="text-denim-700">We're expanding! Look for new DENIM locations in Boston, Seattle, and Austin in the coming months.</p>
      </div>
    </PageLayout>
  );
};

export default StoreLocator;
