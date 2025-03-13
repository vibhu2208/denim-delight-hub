
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Heart, ShoppingCart } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import ProductCard from '@/components/ProductCard';

const Wishlist = () => {
  const { user, loading: authLoading } = useAuth();
  const { wishlist, isLoading: wishlistLoading, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState<string>('');

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  const handleAddToCart = (productId: string) => {
    const product = wishlist.find(item => item.id === productId);
    if (product) {
      // If product has sizes, make sure one is selected
      if (product.size && product.size.length > 0 && !selectedSize) {
        toast.error("Please select a size");
        return;
      }

      addToCart(product, 1, selectedSize || product.size?.[0] || '');
      toast.success(`${product.name} added to your cart`);
      
      // Optionally remove from wishlist after adding to cart
      // removeFromWishlist(productId);
    }
  };

  const isLoading = authLoading || wishlistLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-20 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-denim-600" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-display font-semibold text-denim-900 mb-6">My Wishlist</h1>
          
          {wishlist.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-lg">
              <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h2 className="text-xl font-medium text-denim-800 mb-2">Your wishlist is empty</h2>
              <p className="text-denim-600 mb-6">Save your favorite items to come back to them later.</p>
              <Button 
                onClick={() => navigate('/products')}
                variant="default"
                size="lg"
                className="bg-denim-800 hover:bg-denim-900"
              >
                Explore Products
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {wishlist.map((product, index) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  index={index} 
                />
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Wishlist;
