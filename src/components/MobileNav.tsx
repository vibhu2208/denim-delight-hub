
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ShoppingBag, 
  Search, 
  User, 
  Heart, 
  Home, 
  ShoppingBasket,
  LogOut,
  LogIn
} from 'lucide-react';
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="md:hidden">
      <div className="flex items-center space-x-4">
        <Link to="/search" aria-label="Search">
          <Search className="h-6 w-6 text-denim-900" />
        </Link>
        
        <Link to="/cart" className="relative" aria-label="Cart">
          <ShoppingBag className="h-6 w-6 text-denim-900" />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-denim-700 text-[10px] font-medium text-white">
              {cartItems.length}
            </span>
          )}
        </Link>
        
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="h-10 w-10 p-0">
              <Menu className="h-6 w-6 text-denim-900" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] sm:w-[350px]">
            <SheetHeader className="border-b pb-4 mb-4">
              <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4">
              <SheetClose asChild>
                <Link 
                  to="/" 
                  className="flex items-center gap-2 text-lg font-medium text-denim-900 hover:text-denim-700 transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  <Home className="h-5 w-5" />
                  Home
                </Link>
              </SheetClose>
              
              <SheetClose asChild>
                <Link 
                  to="/products" 
                  className="flex items-center gap-2 text-lg font-medium text-denim-900 hover:text-denim-700 transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  <ShoppingBasket className="h-5 w-5" />
                  Products
                </Link>
              </SheetClose>
              
              {user ? (
                <>
                  <SheetClose asChild>
                    <Link 
                      to="/account" 
                      className="flex items-center gap-2 text-lg font-medium text-denim-900 hover:text-denim-700 transition-colors py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <User className="h-5 w-5" />
                      My Account
                    </Link>
                  </SheetClose>
                  
                  <SheetClose asChild>
                    <Link 
                      to="/wishlist" 
                      className="flex items-center gap-2 text-lg font-medium text-denim-900 hover:text-denim-700 transition-colors py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <Heart className="h-5 w-5" />
                      Wishlist
                    </Link>
                  </SheetClose>
                  
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2 mt-2"
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                  >
                    <LogOut className="h-5 w-5" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <SheetClose asChild>
                  <Link 
                    to="/login" 
                    className="flex items-center gap-2 text-lg font-medium text-denim-900 hover:text-denim-700 transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <LogIn className="h-5 w-5" />
                    Sign In
                  </Link>
                </SheetClose>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default MobileNav;
