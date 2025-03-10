
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/components/ProductCard';

export const useProducts = (options?: {
  category?: string;
  sortBy?: string;
  priceRange?: { min: number; max: number };
  selectedFits?: string[];
}) => {
  return useQuery({
    queryKey: ['products', options],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select('*');

      // Apply category filter
      if (options?.category === 'men' || options?.category === 'women') {
        query = query.eq('category', options.category);
      } else if (options?.category === 'new') {
        query = query.eq('is_new', true);
      } else if (options?.category === 'bestsellers') {
        query = query.eq('is_best_seller', true);
      }

      // Apply price range filter
      if (options?.priceRange) {
        query = query
          .gte('price', options.priceRange.min)
          .lte('price', options.priceRange.max);
      }

      // Apply sorting
      if (options?.sortBy === 'price-low-high') {
        query = query.order('price', { ascending: true });
      } else if (options?.sortBy === 'price-high-low') {
        query = query.order('price', { ascending: false });
      } else if (options?.sortBy === 'newest') {
        query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      return data as Product[];
    }
  });
};
