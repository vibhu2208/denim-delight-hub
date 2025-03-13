import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Mail } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await resetPassword(email);
      setIsSuccess(true);
    } catch (error) {
      // Error is already handled in the resetPassword function
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
            <h1 className="text-2xl font-display font-semibold text-denim-900 mb-2">Reset Password</h1>
            <p className="text-denim-600">Enter your email to receive reset instructions</p>
          </div>
          
          {isSuccess ? (
            <div className="text-center space-y-4">
              <div className="bg-green-50 text-green-700 p-4 rounded-lg">
                <p>Check your email for password reset instructions.</p>
                <p className="text-sm mt-2">If you don't see the email, check your spam folder.</p>
              </div>
              <Link to="/login" className="text-denim-700 hover:text-denim-900 font-medium">
                Return to Login
              </Link>
            </div>
          ) : (
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
              
              <Button 
                type="submit" 
                className="w-full bg-denim-700 hover:bg-denim-800" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : (
                  <>
                    <Mail className="mr-2 h-4 w-4" /> Send Reset Instructions
                  </>
                )}
              </Button>
            </form>
          )}
          
          <div className="mt-6 text-center">
            <Separator className="my-4" />
            <p className="text-sm text-denim-600">
              Remember your password?{' '}
              <Link to="/login" className="text-denim-700 hover:text-denim-900 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPassword; 