import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CustomerBookings from '@/components/CustomerBookings';

const BookingsPage = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  if (!user || !profile) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-white to-orange-200">
        <Card className="max-w-lg w-full shadow-2xl rounded-3xl border-0 p-8">
          <CardHeader>
            <CardTitle>My Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <p>You must be signed in to view your bookings.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <CustomerBookings onBack={handleBackToHome} />
      </div>
    </div>
  );
};

export default BookingsPage; 