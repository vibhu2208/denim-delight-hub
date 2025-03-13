
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Button } from '@/components/ui/button';
import { ShoppingBag, User, Heart } from 'lucide-react';
import MobileNav from './MobileNav';
import { cn } from '@/lib/utils';

const NavbarWithMobileMenu = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useAuth();
  const { cartItems } = useCart();
  const { wishlistCount } = useWishlist();

  // Handle navbar background on scroll
  const handleScroll = () => {
    if (window.scrollY > 10) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  // Add scroll event listener
  useState(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="text-2xl font-display font-bold text-denim-900">
            DENIM
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-denim-800 hover:text-denim-600 transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-denim-800 hover:text-denim-600 transition-colors">
              Products
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/search" aria-label="Search" className="text-denim-800 hover:text-denim-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>
            
            <Link to="/wishlist" className="relative" aria-label="Wishlist">
              <Heart className="h-6 w-6 text-denim-800 hover:text-denim-600 transition-colors" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-denim-700 text-[10px] font-medium text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>
            
            <Link to="/cart" className="relative" aria-label="Cart">
              <ShoppingBag className="h-6 w-6 text-denim-800 hover:text-denim-600 transition-colors" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-denim-700 text-[10px] font-medium text-white">
                  {cartItems.length}
                </span>
              )}
            </Link>
            
            {user ? (
              <Link to="/account" aria-label="Account">
                <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 text-denim-800 hover:text-denim-600 transition-colors">
                  <User className="h-6 w-6" />
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Navigation */}
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default NavbarWithMobileMenu;
