
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Star, Phone, Clock } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Check className="w-8 h-8 text-green-600" />,
      title: 'Verified Professionals',
      description: 'All service providers are ID-verified with background checks and skill assessments.',
      highlight: 'ID Verified'
    },
    {
      icon: <span className="text-2xl">💳</span>,
      title: 'UPI & Digital Payments',
      description: 'Pay seamlessly with UPI, Paytm, PhonePe, cards, or net banking. GST invoices included.',
      highlight: 'Secure Payments'
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-600" />,
      title: '24/7 Support',
      description: 'Round-the-clock customer support and emergency services for urgent home issues.',
      highlight: 'Always Available'
    },
    {
      icon: <span className="text-2xl">🌏</span>,
      title: 'Multilingual Support',
      description: 'Available in Hindi, English, and regional languages for comfortable communication.',
      highlight: 'Local Languages'
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      title: 'Transparent Pricing',
      description: 'No hidden charges. See exact pricing upfront with detailed breakdowns.',
      highlight: 'No Hidden Costs'
    },
    {
      icon: <span className="text-2xl">📍</span>,
      title: 'Live Tracking',
      description: 'Track your service provider in real-time with accurate ETA and updates.',
      highlight: 'Real-time Updates'
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose HomeServ India?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built specifically for Indian households with features that matter most to you and your family.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-gray-100">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                      <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full">
                        {feature.highlight}
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
