
import { useEffect } from 'react';
import PageLayout from '@/components/PageLayout';

const Sustainability = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageLayout title="Sustainability">
      <p className="text-denim-800 mb-6">
        At DENIM, sustainability isn't just a feature of our business—it's the foundation. We're committed to 
        responsible practices across every aspect of our operations, from sourcing raw materials to 
        manufacturing processes and packaging solutions.
      </p>
      
      <h2 className="text-2xl font-display text-denim-900 mt-10 mb-4">Responsible Sourcing</h2>
      <p className="text-denim-800 mb-6">
        We carefully select our materials, prioritizing organic cotton, recycled fibers, and sustainable alternatives. 
        All our suppliers must adhere to strict environmental and ethical standards, ensuring that every 
        component of our products reflects our commitment to sustainability.
      </p>
      
      <h2 className="text-2xl font-display text-denim-900 mt-10 mb-4">Eco-Friendly Production</h2>
      <p className="text-denim-800 mb-6">
        Our manufacturing facilities utilize water-saving technologies, renewable energy sources, and eco-friendly dyes. 
        We've reduced water usage in our denim production by 60% compared to traditional methods, and we're 
        continuously investing in technologies that minimize our environmental footprint.
      </p>
      
      <h2 className="text-2xl font-display text-denim-900 mt-10 mb-4">Circular Economy Initiatives</h2>
      <p className="text-denim-800 mb-6">
        We're proud to offer a garment recycling program in all our stores, allowing customers to return worn DENIM 
        items for recycling. These materials are then transformed into new fabrics or repurposed for other 
        applications, reducing waste and closing the production loop.
      </p>
    </PageLayout>
  );
};

export default Sustainability;
