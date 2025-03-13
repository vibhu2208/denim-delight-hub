
import { useWishlist } from '@/context/WishlistContext';
import { Badge } from '@/components/ui/badge';

const WishlistCounter = () => {
  const { wishlist } = useWishlist();
  
  if (!wishlist.length) return null;
  
  return (
    <Badge 
      variant="secondary" 
      className="absolute -top-2 -right-2 min-w-[18px] h-[18px] flex items-center justify-center bg-pink-500 text-white text-xs p-0 rounded-full"
    >
      {wishlist.length}
    </Badge>
  );
};

export default WishlistCounter;
