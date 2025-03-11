
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Truck, RotateCcw, Shield } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Product as ProductType } from '@/components/ProductCard';
import { useCart } from '@/context/CartContext';

const allProducts: ProductType[] = [
  // Men's products
  {
    id: "1",
    name: "Classic Straight Leg Jeans",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    image_url: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    hoverImage: "https://images.unsplash.com/photo-1475178626620-a4d074967452?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=986&q=80",
    category: "men",
    isBestSeller: true,
    description: "Our classic straight leg jeans offer timeless style and all-day comfort. Made from premium denim with just the right amount of stretch, these jeans maintain their shape wear after wear. The straight leg cut provides a clean, versatile silhouette that pairs perfectly with everything in your wardrobe.",
    details: [
      "98% Cotton, 2% Elastane",
      "Machine washable",
      "Mid-rise waist",
      "Straight leg fit",
      "Button and zip fly closure",
      "5-pocket styling"
    ],
    sizes: ["28", "30", "32", "34", "36", "38"],
    reviews: 127,
    rating: 4.8
  },
  {
    id: "2",
    name: "Relaxed Tapered Jeans",
    price: 94.99,
    image: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1009&q=80",
    image_url: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1009&q=80",
    hoverImage: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "men",
    description: "Our relaxed tapered jeans combine laid-back comfort with a modern silhouette. The relaxed fit through the seat and thigh tapers down for a contemporary look. Made from premium heavyweight denim that gets better with every wear, these will quickly become your go-to jeans.",
    details: [
      "100% Cotton",
      "Machine washable",
      "Mid-rise waist",
      "Relaxed fit with tapered leg",
      "Button and zip fly closure",
      "5-pocket styling"
    ],
    sizes: ["30", "32", "34", "36", "38"],
    reviews: 94,
    rating: 4.6
  },
  {
    id: "3",
    name: "Slim Fit Dark Wash Jeans",
    price: 84.99,
    image: "https://images.unsplash.com/photo-1530286910461-6a1960d1e83a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    image_url: "https://images.unsplash.com/photo-1530286910461-6a1960d1e83a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "men",
    isNew: true,
    description: "Our slim fit dark wash jeans offer a sleek, modern silhouette. The deep indigo wash provides versatile styling options for both casual and dressier occasions. Made with premium stretch denim for all-day comfort that holds its shape.",
    details: [
      "94% Cotton, 5% Polyester, 1% Elastane",
      "Machine washable",
      "Mid-rise waist",
      "Slim fit through hip and thigh",
      "Button and zip fly closure",
      "5-pocket styling"
    ],
    sizes: ["28", "30", "32", "34", "36"],
    reviews: 68,
    rating: 4.7
  },
  {
    id: "4",
    name: "Loose Fit Distressed Jeans",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1590503033123-5d1fb3717b91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    image_url: "https://images.unsplash.com/photo-1590503033123-5d1fb3717b91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    category: "men",
    description: "Our loose fit distressed jeans embody casual cool with authentic distressing and a relaxed silhouette. Each pair is uniquely worn and faded for a lived-in look. The loose fit provides maximum comfort for all-day wear, while the quality denim ensures durability.",
    details: [
      "100% Cotton",
      "Machine washable",
      "Mid-rise waist",
      "Loose fit throughout",
      "Button and zip fly closure",
      "5-pocket styling",
      "Distressed detailing"
    ],
    sizes: ["30", "32", "34", "36", "38", "40"],
    reviews: 42,
    rating: 4.5
  },
  // Women's products
  {
    id: "5",
    name: "High-Rise Slim Fit Jeans",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    image_url: "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    hoverImage: "https://images.unsplash.com/photo-1608234807905-4466023792f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=997&q=80",
    category: "women",
    isNew: true,
    description: "Our high-rise slim fit jeans flatter and elongate your silhouette with a modern, feminine fit. The high rise sits comfortably at your natural waist, while the slim leg creates a sleek profile. Made with premium stretch denim for all-day comfort that holds its shape.",
    details: [
      "92% Cotton, 6% Polyester, 2% Elastane",
      "Machine washable",
      "High-rise waist",
      "Slim fit throughout",
      "Button and zip fly closure",
      "5-pocket styling"
    ],
    sizes: ["24", "26", "27", "28", "29", "30", "31", "32"],
    reviews: 152,
    rating: 4.8
  },
  {
    id: "6",
    name: "Wide-Leg Cropped Jeans",
    price: 84.99,
    image: "https://images.unsplash.com/photo-1604176424472-17cd740f74e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80",
    image_url: "https://images.unsplash.com/photo-1604176424472-17cd740f74e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80",
    hoverImage: "https://images.unsplash.com/photo-1548615661-5d58c8af8d95?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2063&q=80",
    category: "women",
    isBestSeller: true,
    description: "Our wide-leg cropped jeans make a stylish statement with their modern silhouette. The high-rise waist and wide-leg cut create a flattering, balanced proportion, while the cropped length showcases your favorite footwear. Made from structured denim with minimal stretch for an authentic feel.",
    details: [
      "99% Cotton, 1% Elastane",
      "Machine washable",
      "High-rise waist",
      "Wide-leg fit",
      "Cropped length",
      "Button and zip fly closure",
      "5-pocket styling"
    ],
    sizes: ["24", "25", "26", "27", "28", "29", "30", "31"],
    reviews: 86,
    rating: 4.7
  },
  {
    id: "7",
    name: "Skinny High-Waisted Jeans",
    price: 74.99,
    image: "https://images.unsplash.com/photo-1551854838-212c50b4c184?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80",
    image_url: "https://images.unsplash.com/photo-1551854838-212c50b4c184?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80",
    category: "women",
    description: "Our skinny high-waisted jeans offer a second-skin fit that flatters your curves. The super stretchy denim provides exceptional comfort and recovery, maintaining its shape wear after wear. The high rise sits at your natural waist for a sleek, elongated silhouette.",
    details: [
      "91% Cotton, 7% Polyester, 2% Elastane",
      "Machine washable",
      "High-rise waist",
      "Skinny fit throughout",
      "Button and zip fly closure",
      "5-pocket styling"
    ],
    sizes: ["24", "25", "26", "27", "28", "29", "30"],
    reviews: 118,
    rating: 4.6
  },
  {
    id: "8",
    name: "Mom Fit Vintage Jeans",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1593091861575-0c2eab54a6fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    image_url: "https://images.unsplash.com/photo-1593091861575-0c2eab54a6fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    category: "women",
    isNew: true,
    description: "Our mom fit vintage jeans bring back the iconic 90s silhouette with a modern twist. The high waist and slightly tapered leg create a flattering vintage-inspired look. Made from rigid denim that softens with wear, these jeans develop a unique character that's all your own.",
    details: [
      "100% Cotton",
      "Machine washable",
      "High-rise waist",
      "Relaxed through hip and thigh with tapered leg",
      "Button and zip fly closure",
      "5-pocket styling",
      "Light distressing"
    ],
    sizes: ["24", "26", "27", "28", "29", "30", "31", "32"],
    reviews: 74,
    rating: 4.5
  }
];

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    const foundProduct = allProducts.find(p => p.id === id);
    
    if (foundProduct) {
      setProduct(foundProduct);
      setMainImage(foundProduct.image);
    }
    
    setLoading(false);
  }, [id]);

  if (loading) {
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

  if (!product) {
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
    setIsWishlisted(!isWishlisted);
    
    if (!isWishlisted) {
      toast.success(`${product.name} added to your wishlist`);
    } else {
      toast.success(`${product.name} removed from your wishlist`);
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
                
                <div className="grid grid-cols-4 gap-2">
                  <button 
                    className={`bg-gray-50 rounded-md overflow-hidden ${mainImage === product.image ? 'ring-2 ring-denim-700' : ''}`}
                    onClick={() => setMainImage(product.image)}
                  >
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-auto object-cover aspect-square"
                    />
                  </button>
                  
                  {product.hoverImage && (
                    <button 
                      className={`bg-gray-50 rounded-md overflow-hidden ${mainImage === product.hoverImage ? 'ring-2 ring-denim-700' : ''}`}
                      onClick={() => setMainImage(product.hoverImage)}
                    >
                      <img 
                        src={product.hoverImage} 
                        alt={`${product.name} alternate view`} 
                        className="w-full h-auto object-cover aspect-square"
                      />
                    </button>
                  )}
                </div>
              </div>
            </div>
            
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
          </div>
          
          {similarProducts.length > 0 && (
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
