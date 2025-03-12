
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, ShoppingCart, Heart, X } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const Wishlist = () => {
  const { wishlist, isLoading, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = (product: any) => {
    addToCart(product, 1, product.sizes?.[0] || 'Default');
    // Optionally: removeFromWishlist(product.id);
  };
  
  const handleRemoveFromWishlist = async (productId: string) => {
    await removeFromWishlist(productId);
  };

  if (isLoading || authLoading) {
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
            <div className="space-y-6">
              {wishlist.map((product) => (
                <div 
                  key={product.id} 
                  className="flex flex-col sm:flex-row gap-4 border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                >
                  <div className="w-full sm:w-1/4 aspect-square overflow-hidden rounded-md bg-gray-100">
                    <img 
                      src={product.image_url || product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start">
                      <h2 className="text-xl font-medium text-denim-900 mb-2">{product.name}</h2>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-500 hover:text-red-500"
                        onClick={() => handleRemoveFromWishlist(product.id)}
                        aria-label="Remove from wishlist"
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </div>
                    
                    <p className="text-denim-600 mb-4 line-clamp-2">{product.description || 'No description available'}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.sizes?.map((size: string) => (
                        <span 
                          key={size} 
                          className="px-3 py-1 text-xs border rounded-md text-denim-700 bg-gray-50"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-auto flex flex-col sm:flex-row gap-3">
                      <div className="text-lg font-medium text-denim-900 mb-3 sm:mb-0 sm:self-center">
                        ${product.price?.toFixed(2)}
                      </div>
                      
                      <div className="flex-1"></div>
                      
                      <Button
                        variant="default"
                        size="sm"
                        className="bg-denim-800 hover:bg-denim-900 min-h-[44px]"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
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
