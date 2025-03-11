
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface Jean {
  id: string;
  name: string;
  description: string;
  price: number;
  size: string[];
  color: string;
  category: string;
  image_url: string;
  stock: number;
  created_at: string;
}

export const useJeans = () => {
  return useQuery({
    queryKey: ['jeans'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('jeans')
        .select('*');

      if (error) {
        throw error;
      }

      return data as Jean[];
    }
  });
};
