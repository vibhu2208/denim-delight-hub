
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Jean } from './useJeans';

export const useJean = (id: string) => {
  return useQuery({
    queryKey: ['jean', id],
    queryFn: async () => {
      if (!id) {
        throw new Error('Product ID is required');
      }

      const { data, error } = await supabase
        .from('jeans')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw error;
      }

      return data as Jean;
    },
    enabled: !!id
  });
};
