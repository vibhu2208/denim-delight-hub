
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[700px] overflow-hidden">
      <div className="absolute inset-0 bg-denim-900">
        <div
          className={`absolute inset-0 bg-[url('https://images.unsplash.com/photo-1582418702059-97ebafb35d09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80')] bg-cover bg-center animate-image-zoom opacity-80`}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-denim-950/40 to-denim-950/90"></div>
      </div>

      <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-24 md:pb-36">
        <div className={`max-w-xl transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white text-xs tracking-widest uppercase mb-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            New Collection
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-white mb-6 leading-tight animate-fade-in" style={{ animationDelay: '0.5s' }}>
            Timeless Denim.<br />Modern Craft.
          </h1>
          <p className="text-white/80 text-lg mb-8 max-w-lg animate-fade-in" style={{ animationDelay: '0.7s' }}>
            Experience premium jeans crafted with exceptional attention to detail. Designed for comfort and style that endures.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.9s' }}>
            <Link 
              to="/products" 
              className="group inline-flex items-center gap-2 bg-white text-denim-900 px-6 py-3 rounded-full font-medium transition-all hover:bg-denim-100"
            >
              Shop Collection
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/products?category=new" 
              className="inline-flex items-center gap-2 bg-transparent border border-white/20 text-white px-6 py-3 rounded-full font-medium transition-all hover:bg-white/10"
            >
              Explore New Arrivals
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
