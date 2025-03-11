
import { FC } from 'react';
import { Product } from '@/components/ProductCard';

interface ProductGalleryProps {
  product: Product;
  mainImage: string;
  setMainImage: (image: string) => void;
}

const ProductGallery: FC<ProductGalleryProps> = ({ product, mainImage, setMainImage }) => {
  return (
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
  );
};

export default ProductGallery;
