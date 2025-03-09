
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('promo-banner');
      if (element) {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight - 100) {
          setIsVisible(true);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section 
      id="promo-banner" 
      className="relative py-16 md:py-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-denim-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1515664069236-68a74c5c797b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-40"></div>
      </div>
      
      <div className="relative container mx-auto px-4 text-center">
        <div className={`max-w-3xl mx-auto transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs tracking-widest uppercase mb-6">
            Limited Time Offer
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-semibold text-white mb-6">
            20% Off New Season Styles
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Discover our latest collection and refresh your wardrobe with premium denim essentials designed to last.
          </p>
          <Link 
            to="/products" 
            className="inline-block bg-white text-denim-900 px-8 py-3 rounded-full font-medium transition-all hover:bg-denim-100"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
