
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  hoverImage?: string;
  category: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  description?: string;
  details?: string[];
  sizes?: string[];
  reviews?: number;
  rating?: number;
}

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div 
      className="group animate-fade-in" 
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-lg bg-gray-100 mb-4">
        <Link to={`/product/${product.id}`}>
          <div className="relative aspect-[3/4] overflow-hidden">
            <img 
              src={isHovered && product.hoverImage ? product.hoverImage : product.image} 
              alt={product.name}
              className={`w-full h-full object-cover transition-all duration-700 ease-out transform ${
                isHovered ? 'scale-105' : 'scale-100'
              } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={handleImageLoad}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
            )}
          </div>
          
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
        </Link>
        
        <button 
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/70 backdrop-blur-sm text-denim-900 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Add to wishlist"
        >
          <Heart className="w-4 h-4" />
        </button>
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white/80 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Link 
            to={`/product/${product.id}`}
            className="block w-full text-center py-2 bg-denim-900 text-white rounded-full font-medium text-sm hover:bg-denim-800 transition-colors"
          >
            Quick View
          </Link>
        </div>
      </div>
      
      <div className="px-1">
        <h3 className="font-medium text-denim-900 mb-1 transition-colors group-hover:text-denim-700">
          <Link to={`/product/${product.id}`}>
            {product.name}
          </Link>
        </h3>
        <p className="text-denim-700">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
