
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Priya Sharma',
      location: 'Mumbai, Maharashtra',
      rating: 5,
      text: 'Amazing service! Got my AC repaired the same day I booked. The technician was professional and the UPI payment was so convenient.',
      service: 'AC Repair'
    },
    {
      name: 'Rajesh Kumar',
      location: 'Delhi NCR',
      rating: 5,
      text: 'Finally a service that understands Indian homes! The plumber spoke Hindi and fixed our bathroom leak perfectly. Very reasonable pricing.',
      service: 'Plumbing'
    },
    {
      name: 'Meera Patel',
      location: 'Ahmedabad, Gujarat',
      rating: 5,
      text: 'Booked cleaning service for Diwali preparation. The team was thorough and respectful. Will definitely use again for regular cleaning.',
      service: 'Home Cleaning'
    },
    {
      name: 'Arjun Reddy',
      location: 'Hyderabad, Telangana',
      rating: 5,
      text: 'Excellent electrician service! Quick response, fair pricing, and they even provided GST invoice. Highly recommend for electrical work.',
      service: 'Electrical'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join millions of satisfied customers across India who trust HomeServ for their home service needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">"{testimonial.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.location}</p>
                  </div>
                  <div className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
                    {testimonial.service}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-4 bg-white rounded-lg px-6 py-4 shadow-md">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <div className="text-left">
              <div className="font-bold text-gray-900">4.8/5 Average Rating</div>
              <div className="text-gray-600 text-sm">Based on 50,000+ reviews</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
