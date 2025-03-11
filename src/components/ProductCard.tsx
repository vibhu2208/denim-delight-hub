import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  price: number;
  image_url?: string; // Optional to support both patterns
  category: string;
  description?: string;
  size?: string[];
  stock?: number;
  
  // Additional properties needed by other components
  image?: string; // For backward compatibility
  hoverImage?: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  details?: string[];
  sizes?: string[]; // Some components use sizes instead of size
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

  // Use image_url or fallback to image property for backward compatibility
  const imageUrl = product.image_url || product.image;

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
              src={imageUrl} 
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
        </Link>
        
        <button 
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/700 backdrop-blur-sm text-denim-900 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Add to wishlist"
        >
          <Heart className="w-4 h-4" />
        </button>
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
