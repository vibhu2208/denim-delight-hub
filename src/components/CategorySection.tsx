
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Category {
  id: string;
  name: string;
  image: string;
  link: string;
}

const categories: Category[] = [
  {
    id: 'men',
    name: "Men's Collection",
    image: "https://images.unsplash.com/photo-1516826957135-700dedea698c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    link: "/products?category=men"
  },
  {
    id: 'women',
    name: "Women's Collection",
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=986&q=80",
    link: "/products?category=women"
  },
  {
    id: 'new',
    name: "New Arrivals",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    link: "/products?category=new"
  }
];

const CategorySection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('category-section');
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

  const handleImageLoad = (id: string) => {
    setImagesLoaded(prev => ({
      ...prev,
      [id]: true
    }));
  };

  return (
    <section id="category-section" className="py-16 md:py-24 bg-denim-50">
      <div className="container mx-auto px-4">
        <h2 className={`text-3xl md:text-4xl font-display font-semibold text-denim-900 text-center mb-4 transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          Shop By Category
        </h2>
        <p className={`text-denim-600 text-center max-w-2xl mx-auto mb-12 transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '100ms' }}>
          Explore our curated collections for every style and occasion
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <Link 
              key={category.id}
              to={category.link}
              className={`group relative overflow-hidden rounded-xl aspect-[3/4] md:aspect-[3/4] transform transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gray-200">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className={`w-full h-full object-cover transition-transform duration-700 ease-out transform group-hover:scale-105 ${
                    imagesLoaded[category.id] ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => handleImageLoad(category.id)}
                />
                {!imagesLoaded[category.id] && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-denim-950/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-display font-medium text-white mb-2">
                  {category.name}
                </h3>
                <div className="inline-flex items-center text-white text-sm font-medium">
                  Shop Now
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
