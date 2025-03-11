
import { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '@/hooks/useDebounce';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/components/ProductCard';

interface SearchResult {
  id: string;
  name: string;
  category: string;
}

export const SearchInput = ({ onClose, isFullWidth = false }: { onClose?: () => void, isFullWidth?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Function to fetch search results from Supabase
  const fetchSearchResults = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    
    try {
      // For now, using mock data - but structured for easy transition to Supabase
      // In a production environment, this would be replaced with a Supabase query
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const mockProducts = [
        { id: "1", name: "Classic Straight Leg Jeans", category: "men" },
        { id: "2", name: "Relaxed Tapered Jeans", category: "men" },
        { id: "3", name: "Slim Fit Dark Wash Jeans", category: "men" },
        { id: "4", name: "Loose Fit Distressed Jeans", category: "men" },
        { id: "5", name: "High-Rise Slim Fit Jeans", category: "women" },
        { id: "6", name: "Wide-Leg Cropped Jeans", category: "women" },
        { id: "7", name: "Skinny High-Waisted Jeans", category: "women" },
        { id: "8", name: "Mom Fit Vintage Jeans", category: "women" },
        { id: "9", name: "Levi's 501 Original Fit", category: "brands" },
        { id: "10", name: "Calvin Klein Slim Straight", category: "brands" },
        { id: "11", name: "Wrangler Retro Slim Boot", category: "brands" },
        { id: "12", name: "Diesel Sleenker Skinny", category: "brands" },
      ];
      
      // Enhanced search logic to match partial keywords and be case-insensitive
      const lowercaseQuery = searchQuery.toLowerCase();
      const filtered = mockProducts.filter(product => 
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.category.toLowerCase().includes(lowercaseQuery)
      );
      
      console.log('Search results:', filtered);
      setResults(filtered);
    } catch (error) {
      console.error('Error searching products:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSearchResults(debouncedQuery);
  }, [debouncedQuery]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle clicks outside of the search results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultsRef.current && 
        !resultsRef.current.contains(event.target as Node) &&
        inputRef.current && 
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
      setIsOpen(false);
      setIsFocused(false);
      if (onClose) onClose();
    }
  };

  const handleResultClick = (id: string) => {
    navigate(`/product/${id}`);
    setQuery('');
    setIsOpen(false);
    setIsFocused(false);
    if (onClose) onClose();
  };

  const handleInputFocus = () => {
    setIsOpen(true);
    setIsFocused(true);
  };

  const handleClearSearch = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <div className={`relative ${isFullWidth ? 'w-full' : ''}`}>
      <form 
        onSubmit={handleSearch} 
        className={`relative transition-all duration-200 ${isFocused ? 'scale-[1.02]' : ''}`}
      >
        <input
          ref={inputRef}
          type="search"
          placeholder="Search for jeans, brands, and more..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleInputFocus}
          className={`w-full h-12 pl-12 pr-10 rounded-full border border-gray-200 text-base outline-none 
            ${isFocused 
              ? 'border-denim-500 shadow-md ring-1 ring-denim-500/20' 
              : 'hover:border-gray-300 hover:shadow-sm'
            } 
            transition-all`}
          autoComplete="off"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
        {query && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
          </button>
        )}
      </form>

      {isOpen && query && (
        <div 
          ref={resultsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg max-h-[80vh] overflow-y-auto z-50"
        >
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">
              <Loader2 className="w-5 h-5 mx-auto animate-spin mb-2" />
              Searching...
            </div>
          ) : results.length > 0 ? (
            <div className="py-2">
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result.id)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors flex items-center min-h-[44px]"
                >
                  <div className="flex-1">
                    <div className="font-medium text-denim-900">{result.name}</div>
                    <div className="text-sm text-gray-500 capitalize">in {result.category}</div>
                  </div>
                  <Search className="w-4 h-4 text-gray-400 ml-2" />
                </button>
              ))}
              <div className="px-4 py-3 border-t">
                <button
                  onClick={handleSearch}
                  className="w-full text-center text-denim-700 font-medium hover:underline min-h-[44px] flex items-center justify-center"
                >
                  <Search className="w-4 h-4 mr-2" />
                  See all results for "{query}"
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              No results found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};
