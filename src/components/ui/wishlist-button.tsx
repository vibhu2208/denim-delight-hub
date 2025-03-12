
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlist } from '@/context/WishlistContext';
import { cn } from '@/lib/utils';

interface WishlistButtonProps {
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function WishlistButton({ 
  className, 
  variant = 'ghost',
  size = 'icon'
}: WishlistButtonProps) {
  const { wishlist } = useWishlist();
  const count = wishlist.length;
  const hasItems = count > 0;
  
  return (
    <Link 
      to="/wishlist" 
      className={cn(
        'relative inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
        {
          'bg-transparent text-denim-800 hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
          'bg-background hover:bg-accent hover:text-accent-foreground': variant === 'outline',
          'bg-primary text-primary-foreground hover:bg-primary/90 min-h-10': variant === 'default',
          'h-10 w-10 p-0': size === 'icon',
          'h-9 px-3': size === 'sm',
          'h-10 px-4 py-2': size === 'default',
          'h-11 px-8': size === 'lg',
        },
        className
      )}
    >
      <Heart className="h-5 w-5" />
      {hasItems && (
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 text-[10px] font-medium text-white">
          {count}
        </span>
      )}
    </Link>
  );
}
