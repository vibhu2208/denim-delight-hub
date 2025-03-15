
import { useEffect } from 'react';
import PageLayout from '@/components/PageLayout';

const ShippingAndReturns = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageLayout title="Shipping & Returns">
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-display text-denim-900 mb-6">Shipping Information</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-denim-800 mb-2">Domestic Shipping</h3>
              <p className="text-denim-700 mb-4">We offer the following shipping options for orders within the United States:</p>
              
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-denim-100">
                      <th className="py-3 px-4 text-left font-medium text-denim-800">Shipping Method</th>
                      <th className="py-3 px-4 text-left font-medium text-denim-800">Estimated Delivery</th>
                      <th className="py-3 px-4 text-left font-medium text-denim-800">Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-denim-200">
                    <tr>
                      <td className="py-3 px-4 text-denim-700">Standard Shipping</td>
                      <td className="py-3 px-4 text-denim-700">5-7 business days</td>
                      <td className="py-3 px-4 text-denim-700">Free on orders over $75<br />$7.95 for orders under $75</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-denim-700">Expedited Shipping</td>
                      <td className="py-3 px-4 text-denim-700">2-3 business days</td>
                      <td className="py-3 px-4 text-denim-700">$15.95</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-denim-700">Overnight Shipping</td>
                      <td className="py-3 px-4 text-denim-700">Next business day</td>
                      <td className="py-3 px-4 text-denim-700">$29.95</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-denim-800 mb-2">International Shipping</h3>
              <p className="text-denim-700 mb-4">We ship to most countries worldwide. International shipping rates and delivery times vary by location:</p>
              
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-denim-100">
                      <th className="py-3 px-4 text-left font-medium text-denim-800">Region</th>
                      <th className="py-3 px-4 text-left font-medium text-denim-800">Estimated Delivery</th>
                      <th className="py-3 px-4 text-left font-medium text-denim-800">Starting From</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-denim-200">
                    <tr>
                      <td className="py-3 px-4 text-denim-700">Canada</td>
                      <td className="py-3 px-4 text-denim-700">7-10 business days</td>
                      <td className="py-3 px-4 text-denim-700">$14.95</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-denim-700">Europe</td>
                      <td className="py-3 px-4 text-denim-700">10-15 business days</td>
                      <td className="py-3 px-4 text-denim-700">$19.95</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-denim-700">Asia & Australia</td>
                      <td className="py-3 px-4 text-denim-700">12-18 business days</td>
                      <td className="py-3 px-4 text-denim-700">$24.95</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-denim-700">Rest of World</td>
                      <td className="py-3 px-4 text-denim-700">14-21 business days</td>
                      <td className="py-3 px-4 text-denim-700">$29.95</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <p className="text-denim-600 text-sm mt-4">
                Note: International customers are responsible for any customs duties, taxes, or import fees imposed by their country.
              </p>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-display text-denim-900 mb-6">Return Policy</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-denim-800 mb-2">Return Eligibility</h3>
              <p className="text-denim-700 mb-3">Items are eligible for return if they meet the following criteria:</p>
              <ul className="list-disc pl-6 text-denim-700 space-y-1">
                <li>Returned within 30 days of delivery</li>
                <li>Unworn, unwashed, and undamaged</li>
                <li>Original tags still attached</li>
                <li>In original packaging</li>
              </ul>
              <p className="text-denim-600 mt-3">
                Please note that sale items marked as "Final Sale" and underwear cannot be returned for health and hygiene reasons.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-denim-800 mb-2">How to Return</h3>
              <ol className="list-decimal pl-6 text-denim-700 space-y-2">
                <li>Log into your account and navigate to your order history</li>
                <li>Select the order containing the items you wish to return</li>
                <li>Follow the prompts to initiate your return</li>
                <li>Print the provided return shipping label</li>
                <li>Pack the items securely in the original packaging if possible</li>
                <li>Attach the return shipping label to your package</li>
                <li>Drop off the package at the specified carrier location</li>
              </ol>
              <p className="text-denim-600 mt-3">
                If you received a defective or incorrect item, please contact customer service immediately.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-denim-800 mb-2">Refund Process</h3>
              <p className="text-denim-700">
                Once we receive and inspect your return, a confirmation email will be sent. Your refund will be 
                processed to your original payment method within 5-7 business days. Please note that shipping 
                charges are non-refundable, and a $7.95 return shipping fee will be deducted from your refund 
                amount unless the return is due to our error.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-denim-800 mb-2">Exchanges</h3>
              <p className="text-denim-700">
                We currently do not offer direct exchanges. If you need a different size or color, please return the 
                original item and place a new order for the desired item. This ensures the item you want remains in 
                stock during the return process.
              </p>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default ShippingAndReturns;
