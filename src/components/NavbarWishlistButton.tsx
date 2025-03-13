
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlist } from '@/context/WishlistContext';
import { Badge } from '@/components/ui/badge';

const NavbarWishlistButton = () => {
  const { wishlist } = useWishlist();
  
  return (
    <Link to="/wishlist" className="relative inline-flex items-center justify-center w-10 h-10 rounded-full">
      <Heart className="h-[22px] w-[22px] text-gray-700" />
      {wishlist.length > 0 && (
        <Badge 
          variant="destructive" 
          className="absolute -top-2 -right-2 min-w-[18px] h-[18px] flex items-center justify-center bg-pink-500 border-white border-2 text-white text-[10px] p-0 rounded-full"
        >
          {wishlist.length > 99 ? '99+' : wishlist.length}
        </Badge>
      )}
    </Link>
  );
};

export default NavbarWishlistButton;
