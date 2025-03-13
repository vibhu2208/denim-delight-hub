import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Lock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const { updatePassword } = useAuth();
  const navigate = useNavigate();

  const validatePassword = () => {
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return false;
    }
    
    setPasswordError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePassword()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await updatePassword(password);
      navigate('/login', { replace: true });
    } catch (error) {
      // Error is already handled in the updatePassword function
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
            <h1 className="text-2xl font-display font-semibold text-denim-900 mb-2">Set New Password</h1>
            <p className="text-denim-600">Enter your new password below</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-denim-800">
                New Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-denim-800">
                Confirm New Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              {passwordError && (
                <p className="text-red-500 text-xs mt-1">{passwordError}</p>
              )}
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-denim-700 hover:bg-denim-800" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Updating...' : (
                <>
                  <Lock className="mr-2 h-4 w-4" /> Update Password
                </>
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <Separator className="my-4" />
            <p className="text-sm text-denim-600">
              Remember your password?{' '}
              <a href="/login" className="text-denim-700 hover:text-denim-900 font-medium">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ResetPassword; 