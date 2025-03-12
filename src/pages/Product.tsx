
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Truck, RotateCcw, Shield, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useJean } from '@/hooks/useJean';
import ProductCard from '@/components/ProductCard';
import { useJeans } from '@/hooks/useJeans';

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState('');

  // Fetch the product data from Supabase
  const { data: product, isLoading, error } = useJean(id || '');
  
  // Fetch all products for similar products section
  const { data: allProducts = [] } = useJeans();

  // Set the main image when the product data is loaded
  useEffect(() => {
    if (product?.image_url) {
      setMainImage(product.image_url);
    }
  }, [product]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-20 flex items-center justify-center">
          <div className="animate-pulse flex space-x-12 w-full max-w-6xl">
            <div className="rounded-lg bg-gray-200 h-[600px] w-full max-w-md"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
              <div className="h-10 bg-gray-200 rounded w-28"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
              <div className="h-10 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-medium text-denim-900 mb-4">Product Not Found</h1>
          <p className="text-denim-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Button 
            onClick={() => navigate('/products')}
            variant="default"
            className="bg-denim-800 hover:bg-denim-900"
          >
            Return to Products
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    
    addToCart(product, quantity, selectedSize);
    toast.success(`${product.name} added to your cart`);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    
    addToCart(product, quantity, selectedSize);
    navigate('/cart');
  };

  const toggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Filter similar products by category
  const similarProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      <Navbar />
      
      <main className="pt-16 md:pt-20">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <div className="w-full lg:w-1/2">
              <div className="sticky top-24">
                <div className="bg-gray-50 rounded-lg overflow-hidden mb-4">
                  <img 
                    src={mainImage} 
                    alt={product.name} 
                    className="w-full h-auto object-cover aspect-[4/5]"
                  />
                </div>
                
                {product.image_url && (
                  <div className="grid grid-cols-4 gap-2">
                    <button 
                      className={`bg-gray-50 rounded-md overflow-hidden ${mainImage === product.image_url ? 'ring-2 ring-denim-700' : ''}`}
                      onClick={() => setMainImage(product.image_url || '')}
                    >
                      <img 
                        src={product.image_url} 
                        alt={product.name} 
                        className="w-full h-auto object-cover aspect-square"
                      />
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="w-full lg:w-1/2">
              <h1 className="text-3xl font-display font-semibold text-denim-900 mb-4">{product.name}</h1>
              
              <p className="text-2xl font-medium text-denim-900 mb-6">${product.price.toFixed(2)}</p>
              
              {product.description && (
                <div className="mb-8">
                  <p className="text-denim-600">{product.description}</p>
                </div>
              )}
              
              {product.size && product.size.length > 0 && (
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-medium text-denim-900">Select Size</h3>
                    <button className="text-denim-700 text-sm underline">Size Guide</button>
                  </div>
                  
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {product.size.map((size) => (
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
              )}
              
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
                  aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
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
          </div>
          
          {similarProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-display font-semibold text-denim-900 mb-6">You May Also Like</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {similarProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex gap-3 md:hidden shadow-lg z-40">
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
      </div>
      
      <Footer />
    </div>
  );
};

export default Product;
