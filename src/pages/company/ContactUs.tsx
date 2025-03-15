
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import PageLayout from '@/components/PageLayout';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useContactForm } from '@/hooks/useContactForm';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(3, { message: "Subject must be at least 3 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactUs = () => {
  const { isSubmitting, submitContactForm } = useContactForm();
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Initialize react-hook-form with zod validation
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSubmit = async (values: ContactFormValues) => {
    const result = await submitContactForm(values);
    if (result.success) {
      form.reset();
      setFormSubmitted(true);
    }
  };

  return (
    <PageLayout title="Contact Us">
      <p className="text-denim-800 mb-6">
        We're here to help! Whether you have questions about our products, need assistance with an order, 
        or want to provide feedback, our team is ready to assist you.
      </p>
      
      <div className="grid md:grid-cols-2 gap-10 mt-10">
        <div>
          <h2 className="text-2xl font-display text-denim-900 mb-6">Get in Touch</h2>
          
          {formSubmitted ? (
            <div className="bg-green-50 border border-green-200 rounded-md p-6 text-green-800">
              <h3 className="text-lg font-semibold mb-2">Thank you for your message!</h3>
              <p>We've received your inquiry and will get back to you as soon as possible.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setFormSubmitted(false)}
              >
                Send another message
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-denim-700">Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-denim-700">Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-denim-700">Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="How can we help?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-denim-700">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your inquiry..." 
                          className="min-h-[150px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="bg-denim-700 hover:bg-denim-800"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            </Form>
          )}
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
