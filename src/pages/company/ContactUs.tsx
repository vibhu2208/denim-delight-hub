
import { useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const ContactUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageLayout title="Contact Us">
      <p className="text-denim-800 mb-6">
        We're here to help! Whether you have questions about our products, need assistance with an order, 
        or want to provide feedback, our team is ready to assist you.
      </p>
      
      <div className="grid md:grid-cols-2 gap-10 mt-10">
        <div>
          <h2 className="text-2xl font-display text-denim-900 mb-6">Get in Touch</h2>
          
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-denim-700 mb-1">
                Name
              </label>
              <Input id="name" placeholder="Your name" />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-denim-700 mb-1">
                Email
              </label>
              <Input id="email" type="email" placeholder="your@email.com" />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-denim-700 mb-1">
                Subject
              </label>
              <Input id="subject" placeholder="How can we help?" />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-denim-700 mb-1">
                Message
              </label>
              <Textarea id="message" placeholder="Tell us about your inquiry..." className="min-h-[150px]" />
            </div>
            
            <Button className="bg-denim-700 hover:bg-denim-800">
              Send Message
            </Button>
          </form>
        </div>
        
        <div>
          <h2 className="text-2xl font-display text-denim-900 mb-6">Contact Information</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-denim-800 mb-2">Customer Support</h3>
              <p className="text-denim-700">contact@denim.example.com</p>
              <p className="text-denim-700">+1 (800) 123-4567</p>
              <p className="text-denim-600 text-sm mt-1">Available Monday-Friday, 9AM-6PM EST</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-denim-800 mb-2">Corporate Headquarters</h3>
              <p className="text-denim-700">1234 Fashion Avenue</p>
              <p className="text-denim-700">New York, NY 10001</p>
              <p className="text-denim-700">United States</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-denim-800 mb-2">Press Inquiries</h3>
              <p className="text-denim-700">press@denim.example.com</p>
              <p className="text-denim-600 text-sm mt-1">For media, partnership, and PR inquiries</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ContactUs;
