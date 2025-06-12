
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Star, TrendingUp, Users, DollarSign, CheckCircle } from 'lucide-react';

const ProviderDashboard = () => {
  const stats = [
    { title: 'Total Earnings', value: '₹45,250', icon: DollarSign, change: '+12%' },
    { title: 'Jobs Completed', value: '127', icon: CheckCircle, change: '+8%' },
    { title: 'Rating', value: '4.8', icon: Star, change: '+0.2' },
    { title: 'Active Bookings', value: '5', icon: Calendar, change: '+2' },
  ];

  const pendingBookings = [
    {
      service: 'Plumbing Repair',
      customer: 'Rajesh Kumar',
      date: '2024-01-16',
      time: '10:00 AM',
      location: 'Sector 15, Gurgaon',
      amount: '₹450'
    },
    {
      service: 'AC Installation',
      customer: 'Priya Sharma',
      date: '2024-01-16',
      time: '2:00 PM',
      location: 'Koramangala, Bangalore',
      amount: '₹1,200'
    },
    {
      service: 'House Cleaning',
      customer: 'Amit Patel',
      date: '2024-01-17',
      time: '9:00 AM',
      location: 'Andheri West, Mumbai',
      amount: '₹800'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Provider Dashboard</h1>
              <p className="text-gray-600">Manage your services and bookings</p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <CheckCircle className="w-4 h-4 mr-1" />
                Verified
              </Badge>
              <Badge variant="outline">
                <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                4.8 Rating
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-500">{stat.change}</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pending Bookings */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Pending Bookings</h2>
            <Button variant="outline">View All</Button>
          </div>
          <div className="space-y-4">
            {pendingBookings.map((booking, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{booking.service}</h3>
                          <p className="text-gray-600">Customer: {booking.customer}</p>
                        </div>
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                          Pending
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{booking.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{booking.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{booking.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-green-600">{booking.amount}</p>
                      <div className="flex space-x-2 mt-2">
                        <Button size="sm" variant="outline">
                          Decline
                        </Button>
                        <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                          Accept
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Update Profile</h3>
                <p className="text-sm text-gray-600">Manage your business details</p>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <Star className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">View Reviews</h3>
                <p className="text-sm text-gray-600">Check customer feedback</p>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Earnings Report</h3>
                <p className="text-sm text-gray-600">Track your income</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
