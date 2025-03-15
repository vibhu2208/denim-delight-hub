
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';

const FeaturedProducts = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { data: products = [], isLoading, error } = useProducts();

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('featured-products');
      if (element) {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight - 200) {
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
    <section id="featured-products" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16">
          <div className={`transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-denim-900 mb-4">
              Featured Collection
            </h2>
            <p className="text-denim-600 max-w-2xl">
              Discover our most coveted styles crafted from premium materials and designed for exceptional comfort and durability.
            </p>
          </div>
          <Link 
            to="/products" 
            className={`inline-flex items-center text-denim-900 font-medium mt-4 md:mt-0 group transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            style={{ transitionDelay: '200ms' }}
          >
            View All
            <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-denim-600" />
          </div>
        ) : error ? (
          <div className="text-center text-red-600 py-8">
            Error loading products. Please try again later.
          </div>
        ) : products.length === 0 ? (
          <div className="text-center text-denim-600 py-8">
            No products found.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {products.slice(0, 4).map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
