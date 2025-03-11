import { useState, useEffect } from 'react';
import { Product as ProductType } from '@/components/ProductCard';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';

const allProducts: ProductType[] = [
  // Men's products
  {
    id: "1",
    name: "Classic Straight Leg Jeans",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
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

export const useProduct = (id: string | undefined) => {
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

  const handleAddToCart = () => {
    if (!product || !selectedSize) {
      toast.error("Please select a size");
      return;
    }
    
    addToCart(product, quantity, selectedSize);
    toast.success(`${product.name} added to your cart`);
  };

  const handleBuyNow = () => {
    if (!product || !selectedSize) {
      toast.error("Please select a size");
      return;
    }
    
    addToCart(product, quantity, selectedSize);
    navigate('/cart');
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    
    if (!isWishlisted) {
      toast.success(`${product?.name} added to your wishlist`);
    } else {
      toast.success(`${product?.name} removed from your wishlist`);
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

  return {
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
  };
};
