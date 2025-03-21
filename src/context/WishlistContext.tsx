
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
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // Compute wishlist count
  const wishlistCount = wishlist.length;

  // Load wishlist from localStorage or Supabase on component mount
  useEffect(() => {
    const loadWishlist = async () => {
      setIsLoading(true);
      
      try {
        if (user) {
          // User is logged in, fetch wishlist from Supabase
          const { data: wishlistItems, error: wishlistError } = await supabase
            .from('wishlists')
            .select('product_id')
            .eq('user_id', user.id);

          if (wishlistError) {
            throw wishlistError;
          }

          if (wishlistItems && wishlistItems.length > 0) {
            // Get product details for each wishlist item
            const productIds = wishlistItems.map(item => item.product_id);
            
            // Fetch products from products table
            const { data: productsData, error: productsError } = await supabase
              .from('products')
              .select('*')
              .in('id', productIds);
              
            // Fetch products from jeans table
            const { data: jeansData, error: jeansError } = await supabase
              .from('jeans')
              .select('*')
              .in('id', productIds);
            
            if (productsError && jeansError) {
              console.error('Error fetching products:', productsError);
              console.error('Error fetching jeans:', jeansError);
              toast.error('Failed to load wishlist items');
              setWishlist([]);
              setIsLoading(false);
              return;
            }
            
            // Combine products from both tables
            const allProducts: Product[] = [];
            
            // Add products from products table
            if (productsData) {
              productsData.forEach(product => {
                allProducts.push({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image_url: product.image_url,
                  image: product.image_url, // For backward compatibility
                  category: product.category,
                  description: product.description || undefined,
                  size: product.sizes || [],
                  sizes: product.sizes || [],
                });
              });
            }
            
            // Add products from jeans table
            if (jeansData) {
              jeansData.forEach(jean => {
                allProducts.push({
                  id: jean.id,
                  name: jean.name,
                  price: jean.price,
                  image_url: jean.image_url,
                  image: jean.image_url, // For backward compatibility
                  category: jean.category || '',
                  description: jean.description || undefined,
                  size: jean.size || [],
                  sizes: jean.size || [],
                });
              });
            }
            
            setWishlist(allProducts);
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
      removeFromWishlist,
      wishlistCount
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
