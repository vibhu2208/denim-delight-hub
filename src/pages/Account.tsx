
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { User, Package, Heart, LogOut } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Account = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const [totalOrders, setTotalOrders] = useState(0);
  
  useEffect(() => {
    // In a real app, this would fetch from an API
    // For demo purposes, we'll just use a random number
    setTotalOrders(Math.floor(Math.random() * 5));
  }, []);
  
  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar />
      <div className="container max-w-4xl mx-auto px-4 pt-32 pb-20">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-display font-semibold text-denim-900 mb-2">My Account</h1>
              <p className="text-denim-600">Welcome back, {user.name}</p>
            </div>
            <Button 
              variant="outline" 
              onClick={logout}
              className="mt-4 md:mt-0"
            >
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </Button>
          </div>
          
          <Separator className="my-6" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <User className="h-5 w-5 text-denim-700 mr-2" />
                <h2 className="text-lg font-medium text-denim-800">Account Details</h2>
              </div>
              <div className="space-y-3">
                <p className="text-sm text-denim-700">
                  <span className="font-medium">Name:</span> {user.name}
                </p>
                <p className="text-sm text-denim-700">
                  <span className="font-medium">Email:</span> {user.email}
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2 w-full"
                >
                  Edit Details
                </Button>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Package className="h-5 w-5 text-denim-700 mr-2" />
                <h2 className="text-lg font-medium text-denim-800">Orders</h2>
              </div>
              <div>
                <p className="text-2xl font-semibold text-denim-900 mb-1">{totalOrders}</p>
                <p className="text-sm text-denim-600 mb-4">Total Orders</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                >
                  View Order History
                </Button>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Heart className="h-5 w-5 text-denim-700 mr-2" />
                <h2 className="text-lg font-medium text-denim-800">Wishlist</h2>
              </div>
              <div>
                <p className="text-2xl font-semibold text-denim-900 mb-1">0</p>
                <p className="text-sm text-denim-600 mb-4">Saved Items</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                >
                  View Wishlist
                </Button>
              </div>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <Package className="h-5 w-5 text-denim-700 mr-2" />
              <h2 className="text-lg font-medium text-denim-800">Current Cart</h2>
            </div>
            
            {cartItems.length > 0 ? (
              <div>
                <p className="text-sm text-denim-600 mb-4">
                  You have {cartItems.length} item(s) in your cart
                </p>
                <Button 
                  variant="default" 
                  size="sm" 
                  className="bg-denim-700 hover:bg-denim-800"
                  onClick={() => window.location.href = '/cart'}
                >
                  View Cart
                </Button>
              </div>
            ) : (
              <p className="text-sm text-denim-600">Your cart is empty</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Account;
