
import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/useDebounce';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/components/ProductCard';

interface SearchResult {
  id: number;
  name: string;
  category: string;
}

export const SearchInput = ({ onClose }: { onClose?: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Mock function for demo - in production this would query Supabase
  const fetchSearchResults = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    
    // In a real implementation, this would be a Supabase query
    // For now, we'll use the mock data
    try {
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const mockProducts = [
        { id: 1, name: "Classic Straight Leg Jeans", category: "men" },
        { id: 2, name: "Relaxed Tapered Jeans", category: "men" },
        { id: 3, name: "Slim Fit Dark Wash Jeans", category: "men" },
        { id: 4, name: "Loose Fit Distressed Jeans", category: "men" },
        { id: 5, name: "High-Rise Slim Fit Jeans", category: "women" },
        { id: 6, name: "Wide-Leg Cropped Jeans", category: "women" },
        { id: 7, name: "Skinny High-Waisted Jeans", category: "women" },
        { id: 8, name: "Mom Fit Vintage Jeans", category: "women" },
      ];
      
      const filtered = mockProducts.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
      setIsOpen(false);
      if (onClose) onClose();
    }
  };

  const handleResultClick = (id: number) => {
    navigate(`/product/${id}`);
    setQuery('');
    setIsOpen(false);
    if (onClose) onClose();
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleClearSearch = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSearch} className="relative">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search for jeans..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleInputFocus}
          className="w-full pl-10 pr-10"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        {query && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <X className="w-4 h-4 text-gray-500 hover:text-gray-700" />
          </button>
        )}
      </form>

      {isOpen && query && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-md shadow-lg max-h-96 overflow-y-auto z-50">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">Searching...</div>
          ) : results.length > 0 ? (
            <div className="py-2">
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result.id)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition-colors"
                >
                  <div className="font-medium text-denim-900">{result.name}</div>
                  <div className="text-sm text-gray-500 capitalize">{result.category}</div>
                </button>
              ))}
              <div className="px-4 py-2 border-t">
                <button
                  onClick={handleSearch}
                  className="w-full text-center text-denim-700 font-medium hover:underline"
                >
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
