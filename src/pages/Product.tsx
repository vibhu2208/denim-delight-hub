
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductGallery from '@/components/product/ProductGallery';
import ProductDetails from '@/components/product/ProductDetails';
import SimilarProducts from '@/components/product/SimilarProducts';
import { useProduct } from '@/hooks/useProduct';
import { allProducts } from '@/hooks/useProduct';

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const { 
    product,
    loading,
    selectedSize,
    setSelectedSize,
    quantity,
    isWishlisted,
    mainImage,
    setMainImage,
    handleAddToCart,
    handleBuyNow,
    toggleWishlist,
    decreaseQuantity,
    increaseQuantity
  } = useProduct(id);

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

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      <Navbar />
      
      <main className="pt-16 md:pt-20">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <ProductGallery 
              product={product}
              mainImage={mainImage}
              setMainImage={setMainImage}
            />
            
            <ProductDetails 
              product={product}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              quantity={quantity}
              isWishlisted={isWishlisted}
              handleAddToCart={handleAddToCart}
              handleBuyNow={handleBuyNow}
              toggleWishlist={toggleWishlist}
              decreaseQuantity={decreaseQuantity}
              increaseQuantity={increaseQuantity}
            />
          </div>
          
          <SimilarProducts product={product} allProducts={allProducts} />
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
