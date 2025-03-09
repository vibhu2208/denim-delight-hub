import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ChevronRight, Tag, CreditCard, Shield } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useCart } from '@/context/CartContext';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{code: string, amount: number} | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Calculate cart summary
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal > 150 ? 0 : 9.99;
  const discount = appliedDiscount ? appliedDiscount.amount : 0;
  const total = subtotal + shipping - discount;

  // Apply promo code
  const applyPromoCode = () => {
    if (!promoCode.trim()) {
      toast.error("Please enter a promo code");
      return;
    }

    // Mock promo code validation
    if (promoCode.toUpperCase() === 'DENIM20') {
      setAppliedDiscount({ code: 'DENIM20', amount: subtotal * 0.2 });
      toast.success("Promo code applied successfully!");
    } else if (promoCode.toUpperCase() === 'FREESHIP') {
      setAppliedDiscount({ code: 'FREESHIP', amount: shipping });
      toast.success("Free shipping applied!");
    } else {
      toast.error("Invalid promo code");
    }
  };

  // Remove applied discount
  const removeDiscount = () => {
    setAppliedDiscount(null);
    setPromoCode('');
    toast.info("Promo code removed");
  };

  // Handle checkout
  const handleCheckout = () => {
    setIsCheckingOut(true);
    
    // Simulate checkout process
    setTimeout(() => {
      setIsCheckingOut(false);
      toast.success("Order placed successfully!");
    }, 1500);
  };

  // Reset scroll position
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-20 md:pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-semibold text-denim-900 mb-4">
              Your Shopping Cart
            </h1>
            <div className="flex items-center text-sm text-denim-600">
              <Link to="/" className="hover:underline">Home</Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span>Cart</span>
            </div>
          </div>
          
          {cartItems.length === 0 ? (
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 text-center">
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-denim-50 rounded-full">
                <ShoppingBag className="w-8 h-8 text-denim-600" />
              </div>
              <h2 className="text-2xl font-display font-medium text-denim-900 mb-4">
                Your cart is empty
              </h2>
              <p className="text-denim-600 mb-6">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Link 
                to="/products" 
                className="inline-block bg-denim-900 text-white px-6 py-3 rounded-full font-medium hover:bg-denim-800 transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-xl font-medium text-denim-900 mb-4">
                      Cart Items ({cartItems.reduce((total, item) => total + item.quantity, 0)})
                    </h2>
                    
                    <div className="divide-y divide-gray-100">
                      {cartItems.map((item) => (
                        <div key={item.id} className="py-6 flex flex-col sm:flex-row items-start gap-4">
                          <div className="w-full sm:w-24 h-32 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:justify-between">
                              <div>
                                <h3 className="font-medium text-denim-900 mb-1">
                                  {item.name}
                                </h3>
                                <p className="text-sm text-denim-600 mb-2">Size: {item.size}</p>
                              </div>
                              <p className="font-medium text-denim-900">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                            
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center">
                                <button 
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-l-md text-denim-600 hover:bg-gray-50 transition-colors"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <div className="w-10 h-8 flex items-center justify-center border-t border-b border-gray-200 text-denim-900">
                                  {item.quantity}
                                </div>
                                <button 
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-r-md text-denim-600 hover:bg-gray-50 transition-colors"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                              
                              <button 
                                onClick={() => removeFromCart(item.id)}
                                className="text-denim-500 hover:text-red-500 transition-colors flex items-center text-sm"
                              >
                                <Trash2 className="w-4 h-4 mr-1" />
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Promo code section */}
                <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-denim-900">
                      Apply Promo Code
                    </h3>
                    {appliedDiscount && (
                      <button 
                        onClick={removeDiscount}
                        className="text-sm text-denim-600 hover:text-denim-900 transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <div className="flex-1">
                      <Input
                        type="text"
                        placeholder="Enter promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        disabled={!!appliedDiscount}
                        className="h-11"
                      />
                    </div>
                    <Button 
                      onClick={applyPromoCode}
                      disabled={!!appliedDiscount || isCheckingOut}
                      className="h-11 bg-denim-900 hover:bg-denim-800 text-white rounded-md"
                    >
                      Apply
                    </Button>
                  </div>
                  
                  {appliedDiscount && (
                    <div className="mt-3 p-2 bg-denim-50 rounded-md flex items-center justify-between">
                      <div className="flex items-center">
                        <Tag className="w-4 h-4 text-denim-700 mr-2" />
                        <span className="text-sm font-medium text-denim-900">
                          {appliedDiscount.code}
                        </span>
                      </div>
                      <span className="text-sm text-denim-700">
                        -{appliedDiscount.code === 'FREESHIP' ? 'Free Shipping' : `$${appliedDiscount.amount.toFixed(2)}`}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-24">
                  <h2 className="text-xl font-medium text-denim-900 mb-4">
                    Order Summary
                  </h2>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-denim-600">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between text-denim-600">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    
                    {discount > 0 && (
                      <div className="flex justify-between text-denim-700">
                        <span>Discount</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between text-denim-900 font-semibold mb-6">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  
                  <Button 
                    onClick={handleCheckout}
                    disabled={isCheckingOut || cartItems.length === 0}
                    className="w-full bg-denim-900 hover:bg-denim-800 text-white py-6 rounded-full transition-all"
                  >
                    {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
                  </Button>
                  
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center text-sm text-denim-600">
                      <CreditCard className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>Secure payment processing</span>
                    </div>
                    <div className="flex items-center text-sm text-denim-600">
                      <Shield className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>Protected by buyer guarantee</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-center space-x-2">
                    <img src="https://cdn-icons-png.flaticon.com/128/5968/5968299.png" alt="Visa" className="h-8 opacity-60" />
                    <img src="https://cdn-icons-png.flaticon.com/128/196/196578.png" alt="MasterCard" className="h-8 opacity-60" />
                    <img src="https://cdn-icons-png.flaticon.com/128/196/196565.png" alt="PayPal" className="h-8 opacity-60" />
                    <img src="https://cdn-icons-png.flaticon.com/128/196/196539.png" alt="American Express" className="h-8 opacity-60" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
