
import { FC } from 'react';
import { Product } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Star, Truck, RotateCcw, Shield } from 'lucide-react';

interface ProductDetailsProps {
  product: Product;
  selectedSize: string | null;
  setSelectedSize: (size: string) => void;
  quantity: number;
  isWishlisted: boolean;
  handleAddToCart: () => void;
  handleBuyNow: () => void;
  toggleWishlist: () => void;
  decreaseQuantity: () => void;
  increaseQuantity: () => void;
}

const ProductDetails: FC<ProductDetailsProps> = ({
  product,
  selectedSize,
  setSelectedSize,
  quantity,
  isWishlisted,
  handleAddToCart,
  handleBuyNow,
  toggleWishlist,
  decreaseQuantity,
  increaseQuantity
}) => {
  return (
    <div className="w-full lg:w-1/2">
      <div className="flex justify-between items-center mb-4">
        {product.isNew && (
          <span className="px-3 py-1 bg-denim-700 text-white font-medium text-xs uppercase tracking-wider rounded-full mr-2">
            New
          </span>
        )}
        {product.isBestSeller && (
          <span className="px-3 py-1 bg-amber-500 text-white font-medium text-xs uppercase tracking-wider rounded-full">
            Best Seller
          </span>
        )}
      </div>
      
      <h1 className="text-3xl font-display font-semibold text-denim-900 mb-2">{product.name}</h1>
      
      <div className="flex items-center mb-4">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star 
              key={star}
              className={`w-4 h-4 ${star <= Math.round(product.rating || 0) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
            />
          ))}
        </div>
        <span className="ml-2 text-sm text-denim-600">
          {product.rating} ({product.reviews} reviews)
        </span>
      </div>
      
      <p className="text-2xl font-medium text-denim-900 mb-6">${product.price.toFixed(2)}</p>
      
      <div className="mb-8">
        <p className="text-denim-600">{product.description}</p>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium text-denim-900 mb-2">Details</h3>
        <ul className="list-disc list-inside space-y-1 text-denim-600">
          {product.details?.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
      </div>
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium text-denim-900">Select Size</h3>
          <button className="text-denim-700 text-sm underline">Size Guide</button>
        </div>
        
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {product.sizes?.map((size) => (
            <button
              key={size}
              className={`py-2 rounded-md border ${
                selectedSize === size 
                  ? 'border-denim-700 bg-denim-50 text-denim-900' 
                  : 'border-gray-300 text-denim-600 hover:border-denim-400'
              } transition-colors min-h-[44px]`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium text-denim-900 mb-2">Quantity</h3>
        <div className="flex items-center">
          <button 
            className="w-12 h-12 border border-gray-300 rounded-l flex items-center justify-center text-denim-900"
            onClick={decreaseQuantity}
          >
            -
          </button>
          <div className="w-12 h-12 border-t border-b border-gray-300 flex items-center justify-center text-denim-900">
            {quantity}
          </div>
          <button 
            className="w-12 h-12 border border-gray-300 rounded-r flex items-center justify-center text-denim-900"
            onClick={increaseQuantity}
          >
            +
          </button>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Button
          variant="outline"
          size="lg"
          className="flex-1 h-14 border-denim-700 text-denim-700 hover:bg-denim-50 min-w-[44px]"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart
        </Button>
        
        <Button
          variant="default"
          size="lg" 
          className="flex-1 h-14 bg-denim-800 hover:bg-denim-900 min-w-[44px]"
          onClick={handleBuyNow}
        >
          Buy Now
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className={`h-12 w-12 ${
            isWishlisted 
              ? 'border-pink-500 text-pink-500 bg-pink-50 hover:bg-pink-100' 
              : 'border-gray-300 text-denim-600 hover:border-denim-400'
          }`}
          onClick={toggleWishlist}
          aria-label="Add to wishlist"
        >
          <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-pink-500' : ''}`} />
        </Button>
      </div>
      
      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 mb-8">
        <div className="flex items-center mb-3">
          <Truck className="h-5 w-5 text-denim-700 mr-3" />
          <p className="text-denim-700 font-medium">Free shipping on orders over $100</p>
        </div>
        <div className="flex items-center mb-3">
          <RotateCcw className="h-5 w-5 text-denim-700 mr-3" />
          <p className="text-denim-700 font-medium">Free 30-day returns</p>
        </div>
        <div className="flex items-center">
          <Shield className="h-5 w-5 text-denim-700 mr-3" />
          <p className="text-denim-700 font-medium">1-year warranty</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
