
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

      // Map the Supabase product schema to our frontend Product interface
      return data.map((item: any) => ({
        id: item.id, // Keep the UUID as string
        name: item.name,
        price: item.price,
        image: item.image_url, // Map image_url to image
        hoverImage: item.hover_image_url, // Map hover_image_url to hoverImage
        category: item.category,
        isNew: item.is_new, // Map is_new to isNew
        isBestSeller: item.is_best_seller, // Map is_best_seller to isBestSeller
        description: item.description,
        sizes: item.sizes,
        stock: item.stock
      })) as Product[];
    }
  });
};
