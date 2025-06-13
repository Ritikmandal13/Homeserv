import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Calendar, Clock, MapPin, Phone, User, MessageSquare, Building2, ArrowLeft } from 'lucide-react';

interface CustomerBooking {
  id: string;
  provider_name: string;
  provider_business_name: string;
  provider_phone: string;
  service_name: string;
  service_category: string;
  scheduled_date: string;
  scheduled_time: string;
  address: string;
  city: string;
  pincode: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  total_amount: number;
  customer_notes: string;
  provider_notes: string;
  created_at: string;
  service_provider_id: string;
  service_id: string;
}

interface CustomerBookingsProps {
  onBack: () => void;
}

const CustomerBookings: React.FC<CustomerBookingsProps> = ({ onBack }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<CustomerBooking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      const { data, error } = await (supabase as any)
        .rpc('get_customer_bookings', { customer_user_id: user?.id });

      if (error) {
        console.error('Error fetching bookings:', error);
        setBookings([]);
      } else {
        setBookings(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', bookingId);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to cancel booking.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Booking cancelled successfully!",
        });
        fetchBookings(); // Refresh the list
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pending Approval';
      case 'confirmed': return 'Confirmed';
      case 'in_progress': return 'Work in Progress';
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  if (loading) {
    return (
      <div className="p-6">
        <Button variant="outline" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Services
        </Button>
        <div>Loading your bookings...</div>
      </div>
    );
  }

  const activeBookings = bookings.filter(b => ['pending', 'confirmed', 'in_progress'].includes(b.status));
  const completedBookings = bookings.filter(b => ['completed', 'cancelled'].includes(b.status));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Button variant="outline" onClick={onBack} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Button>
          <h1 className="text-2xl font-bold">My Bookings</h1>
          <p className="text-gray-600">Track your service requests and appointments</p>
        </div>
      </div>

      {/* Active Bookings */}
      {activeBookings.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Current Bookings ({activeBookings.length})</h2>
          <div className="grid grid-cols-1 gap-4">
            {activeBookings.map((booking) => (
              <Card key={booking.id} className={`border-l-4 ${
                booking.status === 'pending' ? 'border-l-yellow-500' :
                booking.status === 'confirmed' ? 'border-l-blue-500' :
                'border-l-purple-500'
              }`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{booking.service_name}</CardTitle>
                      <CardDescription>
                        <div className="flex items-center gap-2 mt-1">
                          <User className="w-4 h-4" />
                          <span>{booking.provider_name}</span>
                          {booking.provider_business_name && (
                            <>
                              <Building2 className="w-4 h-4 ml-2" />
                              <span>{booking.provider_business_name}</span>
                            </>
                          )}
                        </div>
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(booking.status)}>
                      {getStatusText(booking.status)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(booking.scheduled_date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{formatTime(booking.scheduled_time)}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-1 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mt-0.5" />
                      <span>{booking.address}, {booking.city} - {booking.pincode}</span>
                    </div>

                    {booking.provider_phone && (
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>Provider: {booking.provider_phone}</span>
                      </div>
                    )}

                    {booking.customer_notes && (
                      <div className="flex items-start gap-1 text-sm text-gray-600">
                        <MessageSquare className="w-4 h-4 mt-0.5" />
                        <span>Your notes: {booking.customer_notes}</span>
                      </div>
                    )}

                    {booking.provider_notes && (
                      <div className="flex items-start gap-1 text-sm text-blue-600">
                        <MessageSquare className="w-4 h-4 mt-0.5" />
                        <span>Provider notes: {booking.provider_notes}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-3">
                      <span className="text-lg font-bold text-green-600">₹{booking.total_amount}</span>
                      <div className="flex gap-2">
                        {booking.status === 'pending' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => cancelBooking(booking.id)}
                            className="text-red-600 border-red-300 hover:bg-red-50"
                          >
                            Cancel Request
                          </Button>
                        )}
                        {booking.status === 'confirmed' && (
                          <span className="text-sm text-green-600 font-medium">
                            ✓ Confirmed by provider
                          </span>
                        )}
                        {booking.status === 'in_progress' && (
                          <span className="text-sm text-purple-600 font-medium">
                            🔄 Work in progress
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Completed Bookings */}
      {completedBookings.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Booking History ({completedBookings.length})</h2>
          <div className="grid grid-cols-1 gap-4">
            {completedBookings.map((booking) => (
              <Card key={booking.id} className={`border-l-4 ${booking.status === 'completed' ? 'border-l-green-500' : 'border-l-red-500'}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{booking.service_name}</CardTitle>
                      <CardDescription>
                        <div className="flex items-center gap-2 mt-1">
                          <User className="w-4 h-4" />
                          <span>{booking.provider_name}</span>
                          {booking.provider_business_name && (
                            <>
                              <Building2 className="w-4 h-4 ml-2" />
                              <span>{booking.provider_business_name}</span>
                            </>
                          )}
                        </div>
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(booking.status)}>
                      {getStatusText(booking.status)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(booking.scheduled_date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{formatTime(booking.scheduled_time)}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3">
                      <span className="text-lg font-bold text-green-600">₹{booking.total_amount}</span>
                      {booking.status === 'completed' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            toast({
                              title: "Coming Soon",
                              description: "Review and rating feature will be available soon!",
                            });
                          }}
                        >
                          Write Review
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {bookings.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center text-gray-500">
            <h3 className="text-lg font-semibold mb-2">No bookings yet</h3>
            <p>When you book services, they'll appear here.</p>
            <Button onClick={onBack} className="mt-4">
              Browse Services
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CustomerBookings; 