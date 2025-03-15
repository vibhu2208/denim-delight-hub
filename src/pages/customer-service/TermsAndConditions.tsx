
import { useEffect } from 'react';
import PageLayout from '@/components/PageLayout';

const TermsAndConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageLayout title="Terms & Conditions">
      <p className="text-denim-800 mb-6">
        Last Updated: January 1, 2023
      </p>
      <p className="text-denim-800 mb-6">
        Please read these Terms and Conditions ("Terms") carefully before using the DENIM website or making a purchase. 
        By accessing our website or placing an order, you agree to be bound by these Terms.
      </p>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-display text-denim-900 mb-4">1. Acceptance of Terms</h2>
          <p className="text-denim-700">
            By accessing or using our website, you acknowledge that you have read, understood, and agree to be bound by these 
            Terms, as well as our Privacy Policy. If you do not agree to these Terms, please do not use our website or services.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-display text-denim-900 mb-4">2. Account Registration</h2>
          <p className="text-denim-700 mb-3">
            To make a purchase or access certain features, you may need to create an account. When you register, you agree to:
          </p>
          <ul className="list-disc pl-6 text-denim-700 space-y-1">
            <li>Provide accurate, current, and complete information</li>
            <li>Maintain and promptly update your account information</li>
            <li>Keep your password confidential and secure</li>
            <li>Accept responsibility for all activities that occur under your account</li>
          </ul>
          <p className="text-denim-700 mt-3">
            We reserve the right to terminate or suspend accounts that violate these Terms or for any other reason at our discretion.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-display text-denim-900 mb-4">3. Products and Pricing</h2>
          <p className="text-denim-700 mb-3">
            We strive to provide accurate product descriptions and pricing information. However:
          </p>
          <ul className="list-disc pl-6 text-denim-700 space-y-1">
            <li>Product images are for illustrative purposes and may vary slightly from the actual items</li>
            <li>Colors may appear differently depending on your display settings</li>
            <li>We reserve the right to correct any errors in pricing or product descriptions</li>
            <li>Prices are subject to change without notice</li>
            <li>Items in your cart are not reserved until checkout is completed</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-2xl font-display text-denim-900 mb-4">4. Orders and Payment</h2>
          <p className="text-denim-700 mb-3">
            When you place an order:
          </p>
          <ul className="list-disc pl-6 text-denim-700 space-y-1">
            <li>You represent that you are authorized to use the payment method provided</li>
            <li>Your order constitutes an offer to purchase our products</li>
            <li>We reserve the right to refuse or cancel any order for any reason</li>
            <li>Orders are subject to availability and confirmation of the order price</li>
            <li>We accept major credit cards, debit cards, and other payment methods as specified at checkout</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-2xl font-display text-denim-900 mb-4">5. Shipping and Delivery</h2>
          <p className="text-denim-700 mb-3">
            Regarding shipping and delivery:
          </p>
          <ul className="list-disc pl-6 text-denim-700 space-y-1">
            <li>Delivery times are estimates and not guaranteed</li>
            <li>Shipping charges are non-refundable</li>
            <li>Risk of loss and title for items passes to you upon delivery by the carrier</li>
            <li>You are responsible for providing accurate shipping information</li>
            <li>International customers are responsible for all duties, taxes, and customs fees</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-2xl font-display text-denim-900 mb-4">6. Returns and Refunds</h2>
          <p className="text-denim-700 mb-3">
            Our return policy allows for returns within 30 days of delivery, subject to the following conditions:
          </p>
          <ul className="list-disc pl-6 text-denim-700 space-y-1">
            <li>Items must be unworn, unwashed, and in original condition with all tags attached</li>
            <li>Sale items marked as "Final Sale" are not eligible for return</li>
            <li>Certain items cannot be returned for health and hygiene reasons</li>
            <li>Return shipping costs are the customer's responsibility unless the return is due to our error</li>
            <li>Refunds will be issued to the original payment method</li>
          </ul>
          <p className="text-denim-700 mt-3">
            Please refer to our Shipping & Returns page for detailed instructions on how to initiate a return.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-display text-denim-900 mb-4">7. Intellectual Property</h2>
          <p className="text-denim-700 mb-3">
            All content on our website, including but not limited to text, graphics, logos, images, product designs, and software, 
            is the property of DENIM or its licensors and is protected by copyright, trademark, and other intellectual property laws.
          </p>
          <p className="text-denim-700 mb-3">
            You may not:
          </p>
          <ul className="list-disc pl-6 text-denim-700 space-y-1">
            <li>Copy, reproduce, modify, or create derivative works from our content</li>
            <li>Use our content for commercial purposes without express permission</li>
            <li>Remove any copyright, trademark, or other proprietary notices</li>
            <li>Use our trademarks, logos, or trade dress without written consent</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-2xl font-display text-denim-900 mb-4">8. Limitation of Liability</h2>
          <p className="text-denim-700">
            To the maximum extent permitted by law, DENIM and its officers, employees, agents, and affiliates shall not be 
            liable for any direct, indirect, incidental, special, consequential, or punitive damages, including but not 
            limited to loss of profits, data, or goodwill, arising from your use of or inability to use our website or 
            products, even if we have been advised of the possibility of such damages.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-display text-denim-900 mb-4">9. Indemnification</h2>
          <p className="text-denim-700">
            You agree to indemnify, defend, and hold harmless DENIM and its officers, directors, employees, agents, and 
            affiliates from and against any claims, liabilities, damages, losses, costs, expenses, or fees (including 
            reasonable attorneys' fees) arising from your violation of these Terms, your use of our website, or your 
            violation of any rights of a third party.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-display text-denim-900 mb-4">10. Modifications to Terms</h2>
          <p className="text-denim-700">
            We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting 
            on our website. Your continued use of our website following the posting of updated Terms constitutes your 
            acceptance of the changes. It is your responsibility to review these Terms periodically.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-display text-denim-900 mb-4">11. Governing Law</h2>
          <p className="text-denim-700">
            These Terms shall be governed by and construed in accordance with the laws of the State of New York, 
            without regard to its conflict of law provisions. Any disputes arising under or in connection with 
            these Terms shall be subject to the exclusive jurisdiction of the courts located in New York County, New York.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-display text-denim-900 mb-4">12. Contact Information</h2>
          <p className="text-denim-700">
            If you have any questions about these Terms, please contact us at:
          </p>
          <p className="text-denim-700 mt-3">
            <strong>Email:</strong> legal@denim.example.com<br />
            <strong>Address:</strong> 1234 Fashion Avenue, New York, NY 10001, USA<br />
            <strong>Phone:</strong> +1 (800) 123-4567
          </p>
        </section>
      </div>
    </PageLayout>
  );
};

export default TermsAndConditions;
