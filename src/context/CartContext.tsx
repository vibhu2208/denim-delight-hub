
import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/components/ProductCard';
import { toast } from 'sonner';

export interface CartItem {
  id: string; // Updated to string to match Supabase UUID
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number, size: string) => void;
  removeFromCart: (id: string) => void; // Updated to string
  updateQuantity: (id: string, quantity: number) => void; // Updated to string
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, quantity: number, size: string) => {
    setCartItems(prevItems => {
      // Convert product.id to string if it's not already
      const productId = String(product.id);
      
      // Check if the item already exists in the cart with the same size
      const existingItemIndex = prevItems.findIndex(
        item => item.id === productId && item.size === size
      );

      if (existingItemIndex !== -1) {
        // If item exists, update its quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // If item doesn't exist, add it to the cart
        return [...prevItems, {
          id: productId,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity,
          size
        }];
      }
    });

    toast.success(`${product.name} added to your cart`);
  };

  const removeFromCart = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    toast.success("Item removed from cart");
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
