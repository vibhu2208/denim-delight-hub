import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Filter, X, ChevronDown } from 'lucide-react';
import { ProductsGrid } from '@/components/ProductsGrid';
import { useJeans } from '@/hooks/useJeans';

const Products = () => {
  const { data: jeans = [] } = useJeans();
  const location = useLocation();
  const [category, setCategory] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 200 });
  const [selectedFits, setSelectedFits] = useState<string[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    setCategory(categoryParam);
    window.scrollTo(0, 0);
  }, [location]);

  const toggleFit = (fit: string) => {
    if (selectedFits.includes(fit)) {
      setSelectedFits(selectedFits.filter(f => f !== fit));
    } else {
      setSelectedFits([...selectedFits, fit]);
    }
  };

  const getCategoryTitle = () => {
    if (category === 'men') return "Men's Collection";
    if (category === 'women') return "Women's Collection";
    if (category === 'new') return "New Arrivals";
    if (category === 'bestsellers') return "Best Sellers";
    return "All Products";
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-16 md:pt-20">
        <div className="bg-denim-50 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-display font-semibold text-denim-900 text-center animate-fade-in">
              {getCategoryTitle()}
            </h1>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="inline-flex items-center text-denim-900 font-medium md:hidden"
            >
              <Filter className="mr-2 w-4 h-4" />
              Filters
            </button>
            
            <div className="hidden md:block">
              <p className="text-denim-600">
                Showing {jeans.length} products
              </p>
            </div>
            
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-4 pr-8 py-2 bg-transparent border border-denim-200 rounded-full text-sm text-denim-900 focus:outline-none focus:border-denim-300"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-denim-600 pointer-events-none" />
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="hidden md:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-denim-900 mb-4">Price Range</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-denim-600">
                      <span>${priceRange.min}</span>
                      <span>${priceRange.max}</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="200" 
                      value={priceRange.max} 
                      onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                      className="w-full accent-denim-700"
                    />
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-denim-900 mb-4">Fit</h3>
                  <div className="space-y-2">
                    {['Straight', 'Slim', 'Relaxed', 'Skinny', 'Wide Leg'].map((fit) => (
                      <label key={fit} className="flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={selectedFits.includes(fit)} 
                          onChange={() => toggleFit(fit)}
                          className="mr-2 accent-denim-700"
                        />
                        <span className="text-denim-800">{fit}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-denim-900 mb-4">Size</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {['24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '36'].map((size) => (
                      <button
                        key={size}
                        className="px-3 py-2 border border-denim-200 rounded text-sm text-denim-800 hover:border-denim-400 transition-colors"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <ProductsGrid />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
