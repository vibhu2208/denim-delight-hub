
import { useJeans } from '@/hooks/useJeans';
import ProductCard from './ProductCard';
import { Loader2 } from 'lucide-react';

export const ProductsGrid = () => {
  const { data: jeans = [], isLoading, error } = useJeans();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-denim-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        Error loading products. Please try again later.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
      {jeans.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
};
