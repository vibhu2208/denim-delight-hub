
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Loader2 } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

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
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const isWishlisted = isInWishlist(product.id);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const toggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      // Redirect to login if not authenticated
      toast.info("Please log in to save items to your wishlist");
      navigate('/login');
      return;
    }
    
    setIsWishlistLoading(true);
    
    try {
      if (isWishlisted) {
        await removeFromWishlist(product.id);
        toast.success(`${product.name} removed from your wishlist`);
      } else {
        await addToWishlist(product);
        toast.success(`${product.name} added to your wishlist`);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Wishlist action error:", error);
    } finally {
      setIsWishlistLoading(false);
    }
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
          className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full
            ${isWishlisted 
              ? 'bg-pink-500 text-white' 
              : 'bg-white/700 backdrop-blur-sm text-denim-900 opacity-0 group-hover:opacity-100'
            } transition-all`}
          onClick={toggleWishlist}
          disabled={isWishlistLoading}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isWishlistLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
          )}
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
