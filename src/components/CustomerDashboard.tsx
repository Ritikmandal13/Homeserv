
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar, MapPin, Phone, Star, Wrench, Zap, Paintbrush, Car, Shield, Droplets } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import ServiceBooking from './ServiceBooking';

interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  base_price: number;
  duration_minutes: number;
  provider_id: string;
}

const CustomerDashboard = () => {
  const { user } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showBookingDialog, setShowBookingDialog] = useState(false);

  const categoryIcons: { [key: string]: any } = {
    plumbing: Droplets,
    electrical: Zap,
    cleaning: Shield,
    carpentry: Wrench,
    painting: Paintbrush,
    ac_repair: Car,
    pest_control: Shield,
    appliance_repair: Wrench,
    home_maintenance: Wrench,
  };

  const recentBookings = [
    { service: 'Plumbing Repair', date: '2024-01-15', status: 'Completed', rating: 5 },
    { service: 'House Cleaning', date: '2024-01-10', status: 'Completed', rating: 4 },
  ];

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching services:', error);
      } else {
        setServices(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookService = (service: Service) => {
    setSelectedService(service);
    setShowBookingDialog(true);
  };

  const closeBookingDialog = () => {
    setShowBookingDialog(false);
    setSelectedService(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-4">Book Trusted Home Services</h1>
          <p className="text-xl mb-6">Professional services at your doorstep across India</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md">
            <div className="flex items-center space-x-2 text-orange-100">
              <MapPin className="w-5 h-5" />
              <span>Serving 500+ cities</span>
            </div>
            <div className="flex items-center space-x-2 text-orange-100">
              <Phone className="w-5 h-5" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Services Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Available Services</h2>
          {loading ? (
            <div className="text-center py-8">Loading services...</div>
          ) : services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => {
                const IconComponent = categoryIcons[service.category] || Wrench;
                return (
                  <Card key={service.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{service.name}</CardTitle>
                          <CardDescription className="text-orange-600 font-semibold">
                            Starting from ₹{service.base_price}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-2">{service.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <span>Duration: {service.duration_minutes} mins</span>
                        <span className="capitalize">{service.category.replace('_', ' ')}</span>
                      </div>
                      <Button 
                        className="w-full bg-orange-600 hover:bg-orange-700"
                        onClick={() => handleBookService(service)}
                      >
                        Book Now
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No services available at the moment.</p>
            </div>
          )}
        </div>

        {/* Recent Bookings */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Recent Bookings</h2>
          <div className="space-y-4">
            {recentBookings.map((booking, index) => (
              <Card key={index}>
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex items-center space-x-4">
                    <Calendar className="w-8 h-8 text-orange-600" />
                    <div>
                      <h3 className="font-semibold">{booking.service}</h3>
                      <p className="text-gray-600">{booking.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {booking.status}
                    </span>
                    <div className="flex items-center space-x-1">
                      {[...Array(booking.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedService && (
            <ServiceBooking
              service={selectedService}
              onClose={closeBookingDialog}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomerDashboard;
