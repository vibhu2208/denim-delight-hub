
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Heart, ShoppingBag } from 'lucide-react';
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

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login', { replace: true });
    }
  }, [user, authLoading, navigate]);

  const handleAddToCart = (productId: string) => {
    const product = wishlist.find(item => item.id === productId);
    if (product) {
      // Add default size if available
      const defaultSize = product.size?.[0] || product.sizes?.[0] || '';
      
      addToCart(product, 1, defaultSize);
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

  // This check ensures we only render the content after verifying auth
  if (!user) {
    return null; // Effect will handle redirect
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
            <>
              <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="text-denim-600">
                  {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} in your wishlist
                </p>
                <Button 
                  onClick={() => navigate('/products')}
                  variant="outline" 
                  className="border-denim-700 text-denim-700 hover:bg-denim-50"
                >
                  Continue Shopping
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {wishlist.map((product, index) => (
                  <div key={product.id} className="relative">
                    <ProductCard 
                      product={product} 
                      index={index} 
                    />
                    <div className="mt-2 flex gap-2">
                      <Button 
                        onClick={() => handleAddToCart(product.id)}
                        className="w-full text-xs bg-denim-800 hover:bg-denim-900"
                        size="sm"
                      >
                        <ShoppingBag className="w-4 h-4 mr-1" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Wishlist;
