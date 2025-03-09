
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { LogIn, User } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await login(email, password);
      navigate('/account');
    } catch (error) {
      // Error is already handled in the login function
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container max-w-md mx-auto px-4 pt-32 pb-20">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-display font-semibold text-denim-900 mb-2">Welcome Back</h1>
            <p className="text-denim-600">Sign in to your account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-denim-800">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-sm font-medium text-denim-800">
                  Password
                </label>
                <Link to="/forgot-password" className="text-xs text-denim-600 hover:text-denim-800">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-denim-700 hover:bg-denim-800" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing in...' : (
                <>
                  <LogIn className="mr-2 h-4 w-4" /> Sign In
                </>
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <Separator className="my-4" />
            <p className="text-sm text-denim-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-denim-700 hover:text-denim-900 font-medium">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
