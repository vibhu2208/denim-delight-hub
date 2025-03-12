
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Jean {
  id: string;
  name: string;
  description: string | null;
  price: number;
  size: string[];
  color: string | null;
  category: string | null;
  image_url: string | null;
  stock: number;
  created_at: string | null;
}

export const useJeans = () => {
  return useQuery({
    queryKey: ['jeans'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('jeans')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data as Jean[];
    }
  });
};
