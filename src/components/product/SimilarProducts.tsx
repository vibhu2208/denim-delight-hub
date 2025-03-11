
import { FC } from 'react';
import { Product } from '@/components/ProductCard';

interface SimilarProductsProps {
  product: Product;
  allProducts: Product[];
}

const SimilarProducts: FC<SimilarProductsProps> = ({ product, allProducts }) => {
  const similarProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  if (similarProducts.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-display font-semibold text-denim-900 mb-6">You May Also Like</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {similarProducts.map((product, index) => (
          <div 
            key={product.id}
            className="group animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="relative overflow-hidden rounded-lg bg-gray-100 mb-4">
              <a href={`/product/${product.id}`} className="block">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-auto object-cover aspect-[3/4] transition-transform duration-500 group-hover:scale-105"
                />
                
                {product.isNew && (
                  <div className="absolute top-3 left-3 px-3 py-1 bg-white font-medium text-xs uppercase tracking-wider rounded-full">
                    New
                  </div>
                )}
                {product.isBestSeller && (
                  <div className="absolute top-3 left-3 px-3 py-1 bg-denim-700 text-white font-medium text-xs uppercase tracking-wider rounded-full">
                    Best Seller
                  </div>
                )}
              </a>
            </div>
            
            <h3 className="font-medium text-denim-900 mb-1 transition-colors group-hover:text-denim-700">
              <a href={`/product/${product.id}`}>
                {product.name}
              </a>
            </h3>
            <p className="text-denim-700">${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;
