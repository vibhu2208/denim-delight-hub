
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

  // Load wishlist from localStorage or Supabase on component mount or user change
  useEffect(() => {
    const loadWishlist = async () => {
      setIsLoading(true);
      
      try {
        if (user) {
          // User is logged in, fetch wishlist from Supabase
          const { data, error } = await supabase
            .from('wishlists')
            .select(`
              product_id,
              products!inner(id, name, price, image_url, category, description, sizes),
              jeans!inner(id, name, price, image_url, category, description, size)
            `)
            .eq('user_id', user.id);

          if (error) {
            throw error;
          }

          if (data && data.length > 0) {
            // Process data from products and jeans tables
            const wishlistItems = data.map(item => {
              // Check if the product comes from products or jeans table
              const productData = item.products || item.jeans;
              if (!productData) return null;
              
              return {
                id: productData.id,
                name: productData.name,
                price: productData.price,
                image_url: productData.image_url,
                category: productData.category,
                description: productData.description,
                // Handle different naming conventions between tables
                size: productData.size || productData.sizes,
                // Add any other needed fields
              };
            }).filter(Boolean) as Product[];
            
            setWishlist(wishlistItems);
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
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      throw error;
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
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      throw error;
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
