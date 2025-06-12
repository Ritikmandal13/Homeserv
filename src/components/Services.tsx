
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const Services = () => {
  const services = [
    {
      icon: '🔧',
      title: 'Plumbing',
      description: 'Leak repairs, pipe fitting, bathroom renovation',
      popular: true
    },
    {
      icon: '⚡',
      title: 'Electrical',
      description: 'Wiring, appliance repair, electrical installations',
      popular: true
    },
    {
      icon: '🧹',
      title: 'Cleaning',
      description: 'Deep cleaning, regular housekeeping, sanitization',
      popular: false
    },
    {
      icon: '🔨',
      title: 'Carpentry',
      description: 'Furniture repair, woodwork, custom installations',
      popular: false
    },
    {
      icon: '🎨',
      title: 'Painting',
      description: 'Interior/exterior painting, wall textures, touch-ups',
      popular: false
    },
    {
      icon: '❄️',
      title: 'AC Service',
      description: 'AC repair, maintenance, installation, gas refilling',
      popular: true
    },
    {
      icon: '🐛',
      title: 'Pest Control',
      description: 'Termite control, cockroach treatment, mosquito control',
      popular: false
    },
    {
      icon: '🚪',
      title: 'Appliance Repair',
      description: 'Washing machine, refrigerator, microwave repairs',
      popular: false
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            All Home Services at Your Doorstep
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From urgent repairs to regular maintenance, we've got every home service covered 
            across major Indian cities and towns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-white hover:bg-orange-50">
              <CardContent className="p-6 text-center">
                {service.popular && (
                  <div className="inline-block bg-orange-600 text-white text-xs px-2 py-1 rounded-full mb-3">
                    Popular
                  </div>
                )}
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            View All Services
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
