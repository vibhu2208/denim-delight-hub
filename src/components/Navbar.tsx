
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { SearchInput } from './SearchInput';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  const { cartItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex-1 flex justify-start">
            <button
              className="md:hidden flex items-center justify-center p-2 text-denim-800 hover:text-denim-600 transition-colors min-h-[44px] min-w-[44px]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
            
            <nav className="hidden md:flex space-x-8">
              <Link 
                to="/products?category=men" 
                className="text-denim-800 hover:text-denim-600 text-sm uppercase tracking-wide font-medium transition-colors"
              >
                Men
              </Link>
              <Link 
                to="/products?category=women" 
                className="text-denim-800 hover:text-denim-600 text-sm uppercase tracking-wide font-medium transition-colors"
              >
                Women
              </Link>
              <Link 
                to="/products?category=new" 
                className="text-denim-800 hover:text-denim-600 text-sm uppercase tracking-wide font-medium transition-colors"
              >
                New Arrivals
              </Link>
              <Link 
                to="/products" 
                className="text-denim-800 hover:text-denim-600 text-sm uppercase tracking-wide font-medium transition-colors"
              >
                Shop All
              </Link>
            </nav>
          </div>
          
          <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex-shrink-0">
            <h1 className="text-xl md:text-2xl font-display font-semibold text-denim-900">DENIM</h1>
          </Link>
          
          <div className="flex-1 flex justify-end">
            <div className="flex items-center space-x-2 md:space-x-4">
              <button 
                className="p-2 text-denim-800 hover:text-denim-600 transition-colors min-h-[44px] min-w-[44px]" 
                aria-label="Search"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="w-5 h-5" />
              </button>
              
              <Link 
                to={user ? "/account" : "/login"} 
                className={`p-2 text-denim-800 hover:text-denim-600 transition-colors min-h-[44px] min-w-[44px] ${
                  location.pathname === '/account' || location.pathname === '/login' ? 'text-denim-600' : ''
                }`}
                aria-label={user ? "My Account" : "Login"}
              >
                <User className="w-5 h-5" />
              </Link>
              
              <Link 
                to="/cart" 
                className={`p-2 text-denim-800 hover:text-denim-600 transition-colors min-h-[44px] min-w-[44px] ${
                  location.pathname === '/cart' ? 'text-denim-600' : ''
                }`}
                aria-label="Cart"
              >
                <div className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-denim-700 text-white text-xs rounded-full">
                      {cartItems.length}
                    </span>
                  )}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Search overlay - optimized for mobile */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20 md:pt-24 px-4 animate-fade-in">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-4 md:p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Search Products</h2>
              <button 
                onClick={() => setIsSearchOpen(false)} 
                className="p-2 min-h-[44px] min-w-[44px]"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <SearchInput onClose={() => setIsSearchOpen(false)} />
          </div>
        </div>
      )}
      
      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden`}
      >
        <div className="container mx-auto px-4 py-20">
          <nav className="flex flex-col space-y-6">
            <Link 
              to="/products?category=men" 
              className="text-denim-800 hover:text-denim-600 text-lg font-medium transition-colors min-h-[44px] flex items-center"
            >
              Men
            </Link>
            <Link 
              to="/products?category=women" 
              className="text-denim-800 hover:text-denim-600 text-lg font-medium transition-colors min-h-[44px] flex items-center"
            >
              Women
            </Link>
            <Link 
              to="/products?category=new" 
              className="text-denim-800 hover:text-denim-600 text-lg font-medium transition-colors min-h-[44px] flex items-center"
            >
              New Arrivals
            </Link>
            <Link 
              to="/products" 
              className="text-denim-800 hover:text-denim-600 text-lg font-medium transition-colors min-h-[44px] flex items-center"
            >
              Shop All
            </Link>
            <Link 
              to="/search"
              className="text-denim-800 hover:text-denim-600 text-lg font-medium transition-colors min-h-[44px] flex items-center"
            >
              Search
            </Link>
            <Link 
              to={user ? "/account" : "/login"}
              className="text-denim-800 hover:text-denim-600 text-lg font-medium transition-colors min-h-[44px] flex items-center"
            >
              {user ? 'My Account' : 'Sign In'}
            </Link>
            <Link 
              to="/cart" 
              className="text-denim-800 hover:text-denim-600 text-lg font-medium transition-colors min-h-[44px] flex items-center"
            >
              Cart
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
