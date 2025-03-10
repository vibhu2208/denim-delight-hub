import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard, { Product } from '../components/ProductCard';
import { Search as SearchIcon, X, ChevronDown, SlidersHorizontal } from 'lucide-react';

const allProducts: Product[] = [
  // Men's products
  {
    id: 1,
    name: "Classic Straight Leg Jeans",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    hoverImage: "https://images.unsplash.com/photo-1475178626620-a4d074967452?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=986&q=80",
    category: "men",
    isBestSeller: true,
    description: "Premium denim straight leg jeans for men with classic fit and comfort."
  },
  {
    id: 2,
    name: "Relaxed Tapered Jeans",
    price: 94.99,
    image: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1009&q=80",
    hoverImage: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "men",
    description: "Comfortable tapered jeans with a relaxed fit through the thigh."
  },
  {
    id: 3,
    name: "Slim Fit Dark Wash Jeans",
    price: 84.99,
    image: "https://images.unsplash.com/photo-1530286910461-6a1960d1e83a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "men",
    isNew: true,
    description: "Stylish slim fit jeans in a dark wash, perfect for a night out."
  },
  {
    id: 4,
    name: "Loose Fit Distressed Jeans",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1590503033123-5d1fb3717b91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    category: "men",
    description: "Edgy loose fit jeans with distressed details for a unique look."
  },
  // Women's products
  {
    id: 5,
    name: "High-Rise Slim Fit Jeans",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    hoverImage: "https://images.unsplash.com/photo-1608234807905-4466023792f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=997&q=80",
    category: "women",
    isNew: true,
    description: "Flattering high-rise slim fit jeans for women, perfect for any occasion."
  },
  {
    id: 6,
    name: "Wide-Leg Cropped Jeans",
    price: 84.99,
    image: "https://images.unsplash.com/photo-1604176424472-17cd740f74e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80",
    hoverImage: "https://images.unsplash.com/photo-1548615661-5d58c8af8d95?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2063&q=80",
    category: "women",
    isBestSeller: true,
    description: "Trendy wide-leg cropped jeans for women, offering style and comfort."
  },
  {
    id: 7,
    name: "Skinny High-Waisted Jeans",
    price: 74.99,
    image: "https://images.unsplash.com/photo-1551854838-212c50b4c184?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80",
    category: "women",
    description: "Classic skinny high-waisted jeans for women, a wardrobe staple."
  },
  {
    id: 8,
    name: "Mom Fit Vintage Jeans",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1593091861575-0c2eab54a6fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    category: "women",
    isNew: true,
    description: "Vintage-inspired mom fit jeans for women, offering a retro vibe."
  }
];

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 200 });
  const [selectedFits, setSelectedFits] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';
    setSearchQuery(query);
    
    window.scrollTo(0, 0);
  }, [location.search]);

  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const timer = setTimeout(() => {
      const query = searchQuery.toLowerCase();
      
      let results = allProducts.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        (product.description && product.description.toLowerCase().includes(query))
      );

      if (selectedFits.length > 0) {
        results = results;
      }
      
      results = results.filter(
        product => product.price >= priceRange.min && product.price <= priceRange.max
      );
      
      if (sortBy === 'price-low-high') {
        results.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'price-high-low') {
        results.sort((a, b) => b.price - a.price);
      } else if (sortBy === 'newest') {
        results = results;
      }

      setSearchResults(results);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, sortBy, priceRange, selectedFits]);

  const toggleFit = (fit: string) => {
    if (selectedFits.includes(fit)) {
      setSelectedFits(selectedFits.filter(f => f !== fit));
    } else {
      setSelectedFits([...selectedFits, fit]);
    }
  };

  const updateSearchQuery = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-16 md:pt-20">
        <div className="bg-denim-50 py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto">
              <h1 className="text-2xl md:text-3xl font-display font-semibold text-denim-900 text-center mb-6">
                {searchQuery ? `Search results for "${searchQuery}"` : 'Search Products'}
              </h1>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for jeans..."
                  value={searchQuery}
                  onChange={(e) => updateSearchQuery(e.target.value)}
                  className="w-full p-3 pl-10 pr-4 border border-denim-300 rounded-full focus:outline-none focus:ring-2 focus:ring-denim-500"
                />
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-denim-500" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-denim-700"></div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <button 
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="inline-flex items-center text-denim-900 font-medium md:hidden"
                >
                  <SlidersHorizontal className="mr-2 w-4 h-4" />
                  Filters
                </button>
                
                <div className="hidden md:block">
                  <p className="text-denim-600">
                    {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} found
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
                
                <div 
                  className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ${
                    isFilterOpen ? 'translate-x-0' : 'translate-x-full'
                  } md:hidden`}
                >
                  <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="text-lg font-medium text-denim-900">Filters</h3>
                    <button onClick={() => setIsFilterOpen(false)}>
                      <X className="w-5 h-5 text-denim-800" />
                    </button>
                  </div>
                  
                  <div className="p-4 overflow-y-auto h-[calc(100vh-64px)]">
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
                      <div className="space-y-3">
                        {['Straight', 'Slim', 'Relaxed', 'Skinny', 'Wide Leg'].map((fit) => (
                          <label key={fit} className="flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={selectedFits.includes(fit)} 
                              onChange={() => toggleFit(fit)}
                              className="mr-2 accent-denim-700 w-5 h-5"
                            />
                            <span className="text-denim-800">{fit}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-denim-900 mb-4">Size</h3>
                      <div className="grid grid-cols-4 gap-2">
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
                    
                    <div className="mt-8 pt-4 border-t">
                      <button 
                        onClick={() => setIsFilterOpen(false)}
                        className="w-full bg-denim-900 text-white py-3 rounded-full font-medium"
                      >
                        Apply Filters
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1">
                  {searchResults.length === 0 ? (
                    <div className="py-16 text-center">
                      <p className="text-denim-600 mb-4">No products found matching your search.</p>
                      <button 
                        onClick={() => {
                          setPriceRange({ min: 0, max: 200 });
                          setSelectedFits([]);
                          setSortBy('recommended');
                        }}
                        className="text-denim-800 underline"
                      >
                        Clear filters
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                      {searchResults.map((product, index) => (
                        <ProductCard key={product.id} product={product} index={index} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Search;
