
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from './AuthContext';
import { Product } from '@/components/ProductCard';

interface WishlistContextType {
  wishlist: Product[];
  isLoading: boolean;
  isInWishlist: (productId: string) => boolean;
  addToWishlist: (product: Product) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // Load wishlist from localStorage or Supabase on component mount
  useEffect(() => {
    const loadWishlist = async () => {
      setIsLoading(true);
      
      try {
        if (user) {
          // User is logged in, fetch wishlist from Supabase
          const { data, error } = await supabase
            .from('wishlists')
            .select('product_id')
            .eq('user_id', user.id);

          if (error) {
            throw error;
          }

          if (data && data.length > 0) {
            // Get product details for each wishlist item
            const productIds = data.map(item => item.product_id);
            
            // In a real app, you would fetch product details from your products table
            // For now, we'll use the mock data from localStorage or fetch from the products hardcoded data
            const allProducts = JSON.parse(localStorage.getItem('allProducts') || '[]');
            
            const wishlistProducts = allProducts.filter((product: Product) => 
              productIds.includes(product.id)
            );
            
            setWishlist(wishlistProducts);
          } else {
            setWishlist([]);
          }
        } else {
          // User is not logged in, fetch wishlist from localStorage
          const localWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
          setWishlist(localWishlist);
        }
      } catch (error) {
        console.error('Error loading wishlist:', error);
        toast.error('Failed to load wishlist');
      } finally {
        setIsLoading(false);
      }
    };

    loadWishlist();
  }, [user]);

  // Save wishlist to localStorage whenever it changes (for non-logged in users)
  useEffect(() => {
    if (!user && wishlist.length >= 0) {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist, user]);

  // Check if a product is in the wishlist
  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.id === productId);
  };

  // Add a product to the wishlist
  const addToWishlist = async (product: Product) => {
    try {
      if (user) {
        // User is logged in, add to Supabase
        const { error } = await supabase
          .from('wishlists')
          .insert([
            { user_id: user.id, product_id: product.id }
          ]);

        if (error) {
          // Skip duplicate error (unique constraint)
          if (error.code !== '23505') {
            throw error;
          }
        }
      }
      
      // Update local state if not already in wishlist
      if (!isInWishlist(product.id)) {
        setWishlist(prev => [...prev, product]);
      }
      
      toast.success(`${product.name} added to your wishlist`);
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      toast.error('Failed to add to wishlist');
    }
  };

  // Remove a product from the wishlist
  const removeFromWishlist = async (productId: string) => {
    try {
      if (user) {
        // User is logged in, remove from Supabase
        const { error } = await supabase
          .from('wishlists')
          .delete()
          .eq('user_id', user.id)
          .eq('product_id', productId);

        if (error) {
          throw error;
        }
      }
      
      // Update local state
      setWishlist(prev => prev.filter(item => item.id !== productId));
      toast.success('Removed from your wishlist');
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast.error('Failed to remove from wishlist');
    }
  };

  return (
    <WishlistContext.Provider value={{ 
      wishlist, 
      isLoading, 
      isInWishlist, 
      addToWishlist, 
      removeFromWishlist 
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
