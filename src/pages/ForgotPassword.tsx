
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ForgotPasswordForm from '@/components/ForgotPasswordForm';
import Layout from '@/components/Layout';

const ForgotPassword = () => {
  return (
    <Layout>
      <div className="container max-w-md mx-auto px-4 pt-32 pb-16">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="mb-6">
            <Link to="/login" className="inline-flex items-center text-denim-600 hover:text-denim-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Link>
          </div>
          
          <h1 className="text-2xl font-display font-semibold text-denim-900 mb-2">Reset Password</h1>
          <p className="text-denim-600 mb-6">
            Enter your email address and we'll send you a link to reset your password.
          </p>

          <ForgotPasswordForm />
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
