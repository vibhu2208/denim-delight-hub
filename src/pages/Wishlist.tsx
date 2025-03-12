
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Heart } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const Wishlist = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-20 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-denim-600" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-display font-semibold text-denim-900 mb-6">My Wishlist</h1>
          
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h2 className="text-xl font-medium text-denim-800 mb-2">Your wishlist is empty</h2>
            <p className="text-denim-600 mb-6">Save your favorite items to come back to them later.</p>
            <Button 
              onClick={() => navigate('/products')}
              variant="default"
              size="lg"
              className="bg-denim-800 hover:bg-denim-900"
            >
              Explore Products
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Wishlist;
