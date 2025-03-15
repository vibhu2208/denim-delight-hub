
import { useEffect } from 'react';
import PageLayout from '@/components/PageLayout';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageLayout title="Privacy Policy">
      <p className="text-denim-800 mb-6">
        Effective Date: January 1, 2023
      </p>
      <p className="text-denim-800 mb-6">
        At DENIM, we respect your privacy and are committed to protecting your personal data. This privacy policy explains how 
        we collect, use, and safeguard your information when you visit our website, make a purchase, or interact with us in any way.
      </p>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-display text-denim-900 mb-4">Information We Collect</h2>
          
          <h3 className="text-lg font-semibold text-denim-800 mb-2">Personal Information</h3>
          <p className="text-denim-700 mb-3">
            We may collect the following personal information when you create an account, make a purchase, sign up for our newsletter, 
            or otherwise interact with our website:
          </p>
          <ul className="list-disc pl-6 text-denim-700 space-y-1 mb-4">
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Billing and shipping addresses</li>
            <li>Payment information (note: payment card details are processed securely by our payment processors)</li>
            <li>Purchase history</li>
            <li>Account username and password</li>
          </ul>
          
          <h3 className="text-lg font-semibold text-denim-800 mb-2">Automatically Collected Information</h3>
          <p className="text-denim-700 mb-3">
            When you visit our website, certain information is automatically collected, including:
          </p>
          <ul className="list-disc pl-6 text-denim-700 space-y-1">
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Device information</li>
            <li>Pages visited and time spent on those pages</li>
            <li>Referring website or source</li>
            <li>Location information</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-2xl font-display text-denim-900 mb-4">How We Use Your Information</h2>
          <p className="text-denim-700 mb-3">
            We use the information we collect for various purposes, including:
          </p>
          <ul className="list-disc pl-6 text-denim-700 space-y-1">
            <li>Processing and fulfilling your orders</li>
            <li>Managing your account</li>
            <li>Providing customer support</li>
            <li>Sending transactional emails (order confirmations, shipping updates, etc.)</li>
            <li>Marketing communications (with your consent)</li>
            <li>Improving our website and products</li>
            <li>Analyzing shopping trends and preferences</li>
            <li>Preventing fraud and enhancing security</li>
            <li>Complying with legal obligations</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-2xl font-display text-denim-900 mb-4">Cookies and Tracking Technologies</h2>
          <p className="text-denim-700 mb-3">
            We use cookies and similar tracking technologies to collect information about your browsing activities. 
            These technologies help us provide a better user experience, analyze website traffic, and personalize content.
          </p>
          <p className="text-denim-700 mb-3">
            We use the following types of cookies:
          </p>
          <ul className="list-disc pl-6 text-denim-700 space-y-1">
            <li><strong>Essential cookies:</strong> Necessary for the basic functionality of the website</li>
            <li><strong>Functional cookies:</strong> Enable personalized features and remember your preferences</li>
            <li><strong>Analytical cookies:</strong> Help us understand how visitors interact with our website</li>
            <li><strong>Marketing cookies:</strong> Track your activities across websites to deliver targeted advertisements</li>
          </ul>
          <p className="text-denim-700 mt-3">
            You can manage your cookie preferences through your browser settings. However, disabling certain 
            cookies may affect the functionality of our website.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-display text-denim-900 mb-4">Data Sharing and Third Parties</h2>
          <p className="text-denim-700 mb-3">
            We may share your personal information with the following categories of third parties:
          </p>
          <ul className="list-disc pl-6 text-denim-700 space-y-1">
            <li><strong>Service providers:</strong> Payment processors, shipping carriers, customer support services, and marketing platforms</li>
            <li><strong>Business partners:</strong> Companies we collaborate with for joint marketing efforts or promotions</li>
            <li><strong>Analytics providers:</strong> Companies that help us analyze website traffic and user behavior</li>
            <li><strong>Legal authorities:</strong> When required by law or to protect our rights</li>
          </ul>
          <p className="text-denim-700 mt-3">
            We do not sell your personal information to third parties.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-display text-denim-900 mb-4">Your Rights and Choices</h2>
          <p className="text-denim-700 mb-3">
            Depending on your location, you may have the following rights regarding your personal information:
          </p>
          <ul className="list-disc pl-6 text-denim-700 space-y-1">
            <li>Access and review your personal information</li>
            <li>Correct inaccurate or incomplete information</li>
            <li>Delete your personal information</li>
            <li>Restrict or object to the processing of your information</li>
            <li>Data portability (receiving your data in a structured, machine-readable format)</li>
            <li>Withdraw consent for marketing communications</li>
          </ul>
          <p className="text-denim-700 mt-3">
            To exercise these rights, please contact us using the information provided in the "Contact Us" section.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-display text-denim-900 mb-4">Data Security</h2>
          <p className="text-denim-700">
            We implement appropriate technical and organizational measures to protect your personal information against 
            unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the 
            internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-display text-denim-900 mb-4">Changes to This Privacy Policy</h2>
          <p className="text-denim-700">
            We may update this privacy policy from time to time to reflect changes in our practices or for other operational, 
            legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on our 
            website with a new effective date.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-display text-denim-900 mb-4">Contact Us</h2>
          <p className="text-denim-700">
            If you have any questions or concerns about this privacy policy or our data practices, please contact us at:
          </p>
          <p className="text-denim-700 mt-3">
            <strong>Email:</strong> privacy@denim.example.com<br />
            <strong>Address:</strong> 1234 Fashion Avenue, New York, NY 10001, USA<br />
            <strong>Phone:</strong> +1 (800) 123-4567
          </p>
        </section>
      </div>
    </PageLayout>
  );
};

export default PrivacyPolicy;
