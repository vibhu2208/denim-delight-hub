
import { useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const HelpCenter = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageLayout title="Help Center">
      <p className="text-denim-800 mb-6">
        Welcome to our Help Center. Find answers to frequently asked questions and resources to assist you 
        with your DENIM shopping experience. If you can't find what you're looking for, please don't 
        hesitate to contact our customer service team.
      </p>
      
      <h2 className="text-2xl font-display text-denim-900 mt-10 mb-6">Frequently Asked Questions</h2>
      
      <Accordion type="single" collapsible className="mb-10">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-denim-800 font-medium">How do I track my order?</AccordionTrigger>
          <AccordionContent className="text-denim-700">
            <p>You can track your order by logging into your account and visiting the "Order History" section. Alternatively, 
            you can use the tracking number provided in your shipping confirmation email. If you're having trouble, 
            please contact our customer service team with your order number.</p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-denim-800 font-medium">What is your return policy?</AccordionTrigger>
          <AccordionContent className="text-denim-700">
            <p>We offer a 30-day return policy for all unworn items in their original condition with tags attached. 
            Returns can be initiated through your account or by contacting customer service. Please note that sale 
            items are final sale. For more details, visit our Shipping & Returns page.</p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-denim-800 font-medium">How do I find my size?</AccordionTrigger>
          <AccordionContent className="text-denim-700">
            <p>Each product page includes a size guide specific to that item. For general sizing information, please 
            visit our Size Guide page. If you're between sizes or have specific questions about fit, 
            our customer service team is happy to assist.</p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-4">
          <AccordionTrigger className="text-denim-800 font-medium">When will my order ship?</AccordionTrigger>
          <AccordionContent className="text-denim-700">
            <p>Orders are typically processed within 1-2 business days. Shipping times depend on your location and 
            chosen shipping method. You'll receive a confirmation email with tracking information once your order ships. 
            For expedited shipping options, please select the appropriate method at checkout.</p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-5">
          <AccordionTrigger className="text-denim-800 font-medium">Do you ship internationally?</AccordionTrigger>
          <AccordionContent className="text-denim-700">
            <p>Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. 
            Please note that customers are responsible for any customs duties or taxes imposed by their country. You can 
            view specific shipping information for your location during checkout.</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <h2 className="text-2xl font-display text-denim-900 mt-10 mb-6">Contact Customer Service</h2>
      <div className="bg-denim-50 p-6 rounded-lg">
        <p className="text-denim-800 mb-4">Our dedicated support team is available to assist you:</p>
        <ul className="text-denim-700 space-y-2">
          <li><strong>Email:</strong> support@denim.example.com</li>
          <li><strong>Phone:</strong> +1 (800) 123-4567</li>
          <li><strong>Hours:</strong> Monday-Friday, 9AM-6PM EST</li>
        </ul>
        <p className="text-denim-700 mt-4">For faster service, please have your order number ready when contacting us.</p>
      </div>
    </PageLayout>
  );
};

export default HelpCenter;
