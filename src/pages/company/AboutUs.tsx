
import { useEffect } from 'react';
import PageLayout from '@/components/PageLayout';

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageLayout title="About Us">
      <p className="text-denim-800 mb-6">
        Founded in 2008, DENIM has established itself as a premium provider of high-quality denim apparel. 
        Our commitment to exceptional craftsmanship and sustainable practices forms the cornerstone of our brand philosophy.
      </p>
      
      <h2 className="text-2xl font-display text-denim-900 mt-10 mb-4">Our Story</h2>
      <p className="text-denim-800 mb-6">
        What began as a small workshop in Milan has evolved into a global brand recognized for its distinctive style and 
        dedication to quality. We combine traditional denim-making techniques with modern innovations to create 
        timeless pieces that stand the test of time.
      </p>
      
      <h2 className="text-2xl font-display text-denim-900 mt-10 mb-4">Our Mission</h2>
      <p className="text-denim-800 mb-6">
        At DENIM, we're committed to creating clothing that not only looks good but feels good to wear and is produced 
        responsibly. We believe in crafting products that our customers can feel proud to own, knowing they were made 
        with care for both people and the planet.
      </p>
      
      <h2 className="text-2xl font-display text-denim-900 mt-10 mb-4">Our Values</h2>
      <ul className="list-disc pl-6 text-denim-800 mb-6 space-y-2">
        <li><strong>Quality:</strong> We never compromise on the materials or craftsmanship of our products.</li>
        <li><strong>Sustainability:</strong> Every decision we make considers its environmental impact.</li>
        <li><strong>Innovation:</strong> We continuously explore new techniques and technologies.</li>
        <li><strong>Transparency:</strong> We believe in honest communication about our practices.</li>
      </ul>
    </PageLayout>
  );
};

export default AboutUs;
