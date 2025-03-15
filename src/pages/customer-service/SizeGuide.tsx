
import { useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SizeGuide = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageLayout title="Size Guide">
      <p className="text-denim-800 mb-6">
        Finding your perfect fit is essential when shopping for denim. Use our comprehensive size guide 
        to determine your ideal size across our different styles and cuts. For the best fit, we recommend 
        taking your measurements and comparing them to the charts below.
      </p>
      
      <h2 className="text-2xl font-display text-denim-900 mt-10 mb-4">How to Measure</h2>
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-denim-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-denim-800 mb-2">Waist</h3>
          <p className="text-denim-700">Measure around your natural waistline, keeping the tape comfortably loose.</p>
        </div>
        
        <div className="bg-denim-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-denim-800 mb-2">Hips</h3>
          <p className="text-denim-700">Measure around the fullest part of your hips, about 8 inches below your waist.</p>
        </div>
        
        <div className="bg-denim-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-denim-800 mb-2">Inseam</h3>
          <p className="text-denim-700">Measure from the crotch to the bottom of the leg along the inner seam.</p>
        </div>
      </div>
      
      <Tabs defaultValue="mens" className="mt-10">
        <TabsList>
          <TabsTrigger value="mens">Men's Sizing</TabsTrigger>
          <TabsTrigger value="womens">Women's Sizing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="mens" className="mt-6">
          <h3 className="text-xl font-display text-denim-900 mb-4">Men's Jeans Size Chart</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-denim-100">
                  <th className="py-3 px-4 text-left font-medium text-denim-800">Size (US)</th>
                  <th className="py-3 px-4 text-left font-medium text-denim-800">Waist (inches)</th>
                  <th className="py-3 px-4 text-left font-medium text-denim-800">Waist (cm)</th>
                  <th className="py-3 px-4 text-left font-medium text-denim-800">Hip (inches)</th>
                  <th className="py-3 px-4 text-left font-medium text-denim-800">Hip (cm)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-denim-200">
                <tr>
                  <td className="py-3 px-4 text-denim-700">28</td>
                  <td className="py-3 px-4 text-denim-700">28-29</td>
                  <td className="py-3 px-4 text-denim-700">71-74</td>
                  <td className="py-3 px-4 text-denim-700">34-35</td>
                  <td className="py-3 px-4 text-denim-700">86-89</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-denim-700">30</td>
                  <td className="py-3 px-4 text-denim-700">30-31</td>
                  <td className="py-3 px-4 text-denim-700">76-79</td>
                  <td className="py-3 px-4 text-denim-700">36-37</td>
                  <td className="py-3 px-4 text-denim-700">91-94</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-denim-700">32</td>
                  <td className="py-3 px-4 text-denim-700">32-33</td>
                  <td className="py-3 px-4 text-denim-700">81-84</td>
                  <td className="py-3 px-4 text-denim-700">38-39</td>
                  <td className="py-3 px-4 text-denim-700">97-99</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-denim-700">34</td>
                  <td className="py-3 px-4 text-denim-700">34-35</td>
                  <td className="py-3 px-4 text-denim-700">86-89</td>
                  <td className="py-3 px-4 text-denim-700">40-41</td>
                  <td className="py-3 px-4 text-denim-700">102-104</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-denim-700">36</td>
                  <td className="py-3 px-4 text-denim-700">36-37</td>
                  <td className="py-3 px-4 text-denim-700">91-94</td>
                  <td className="py-3 px-4 text-denim-700">42-43</td>
                  <td className="py-3 px-4 text-denim-700">107-109</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-denim-700">38</td>
                  <td className="py-3 px-4 text-denim-700">38-39</td>
                  <td className="py-3 px-4 text-denim-700">97-99</td>
                  <td className="py-3 px-4 text-denim-700">44-45</td>
                  <td className="py-3 px-4 text-denim-700">112-114</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <h3 className="text-xl font-display text-denim-900 mt-8 mb-4">Men's Inseam Guide</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-denim-100">
                  <th className="py-3 px-4 text-left font-medium text-denim-800">Length</th>
                  <th className="py-3 px-4 text-left font-medium text-denim-800">Inseam (inches)</th>
                  <th className="py-3 px-4 text-left font-medium text-denim-800">Inseam (cm)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-denim-200">
                <tr>
                  <td className="py-3 px-4 text-denim-700">Short</td>
                  <td className="py-3 px-4 text-denim-700">30</td>
                  <td className="py-3 px-4 text-denim-700">76</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-denim-700">Regular</td>
                  <td className="py-3 px-4 text-denim-700">32</td>
                  <td className="py-3 px-4 text-denim-700">81</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-denim-700">Long</td>
                  <td className="py-3 px-4 text-denim-700">34</td>
                  <td className="py-3 px-4 text-denim-700">86</td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>
        
        <TabsContent value="womens" className="mt-6">
          <h3 className="text-xl font-display text-denim-900 mb-4">Women's Jeans Size Chart</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-denim-100">
                  <th className="py-3 px-4 text-left font-medium text-denim-800">Size (US)</th>
                  <th className="py-3 px-4 text-left font-medium text-denim-800">Waist (inches)</th>
                  <th className="py-3 px-4 text-left font-medium text-denim-800">Waist (cm)</th>
                  <th className="py-3 px-4 text-left font-medium text-denim-800">Hip (inches)</th>
                  <th className="py-3 px-4 text-left font-medium text-denim-800">Hip (cm)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-denim-200">
                <tr>
                  <td className="py-3 px-4 text-denim-700">23/00</td>
                  <td className="py-3 px-4 text-denim-700">23-24</td>
                  <td className="py-3 px-4 text-denim-700">58-61</td>
                  <td className="py-3 px-4 text-denim-700">33-34</td>
                  <td className="py-3 px-4 text-denim-700">84-86</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-denim-700">24/0</td>
                  <td className="py-3 px-4 text-denim-700">24-25</td>
                  <td className="py-3 px-4 text-denim-700">61-64</td>
                  <td className="py-3 px-4 text-denim-700">34-35</td>
                  <td className="py-3 px-4 text-denim-700">86-89</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-denim-700">25/2</td>
                  <td className="py-3 px-4 text-denim-700">25-26</td>
                  <td className="py-3 px-4 text-denim-700">64-66</td>
                  <td className="py-3 px-4 text-denim-700">35-36</td>
                  <td className="py-3 px-4 text-denim-700">89-91</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-denim-700">26/4</td>
                  <td className="py-3 px-4 text-denim-700">26-27</td>
                  <td className="py-3 px-4 text-denim-700">66-69</td>
                  <td className="py-3 px-4 text-denim-700">36-37</td>
                  <td className="py-3 px-4 text-denim-700">91-94</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-denim-700">27/6</td>
                  <td className="py-3 px-4 text-denim-700">27-28</td>
                  <td className="py-3 px-4 text-denim-700">69-71</td>
                  <td className="py-3 px-4 text-denim-700">37-38</td>
                  <td className="py-3 px-4 text-denim-700">94-97</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-denim-700">28/8</td>
                  <td className="py-3 px-4 text-denim-700">28-29</td>
                  <td className="py-3 px-4 text-denim-700">71-74</td>
                  <td className="py-3 px-4 text-denim-700">38-39</td>
                  <td className="py-3 px-4 text-denim-700">97-99</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-denim-700">29/10</td>
                  <td className="py-3 px-4 text-denim-700">29-30</td>
                  <td className="py-3 px-4 text-denim-700">74-76</td>
                  <td className="py-3 px-4 text-denim-700">39-40</td>
                  <td className="py-3 px-4 text-denim-700">99-102</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-denim-700">30/12</td>
                  <td className="py-3 px-4 text-denim-700">30-31</td>
                  <td className="py-3 px-4 text-denim-700">76-79</td>
                  <td className="py-3 px-4 text-denim-700">40-41</td>
                  <td className="py-3 px-4 text-denim-700">102-104</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <h3 className="text-xl font-display text-denim-900 mt-8 mb-4">Women's Inseam Guide</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-denim-100">
                  <th className="py-3 px-4 text-left font-medium text-denim-800">Length</th>
                  <th className="py-3 px-4 text-left font-medium text-denim-800">Inseam (inches)</th>
                  <th className="py-3 px-4 text-left font-medium text-denim-800">Inseam (cm)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-denim-200">
                <tr>
                  <td className="py-3 px-4 text-denim-700">Cropped</td>
                  <td className="py-3 px-4 text-denim-700">26</td>
                  <td className="py-3 px-4 text-denim-700">66</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-denim-700">Ankle</td>
                  <td className="py-3 px-4 text-denim-700">28</td>
                  <td className="py-3 px-4 text-denim-700">71</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-denim-700">Regular</td>
                  <td className="py-3 px-4 text-denim-700">30</td>
                  <td className="py-3 px-4 text-denim-700">76</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-denim-700">Long</td>
                  <td className="py-3 px-4 text-denim-700">32</td>
                  <td className="py-3 px-4 text-denim-700">81</td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="bg-denim-50 p-6 rounded-lg mt-10">
        <h3 className="text-xl font-display text-denim-900 mb-4">Still Unsure About Your Size?</h3>
        <p className="text-denim-700">
          Our customer service team is happy to assist you with sizing questions. Contact us at support@denim.example.com 
          with your measurements, and we'll recommend the best size for you. You can also visit one of our 
          retail locations for a personalized fitting session.
        </p>
      </div>
    </PageLayout>
  );
};

export default SizeGuide;
