
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import CustomerDashboard from '@/components/CustomerDashboard';
import ProviderDashboard from '@/components/ProviderDashboard';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

const Index = () => {
  const { loading, user, profile } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
      </div>
    );
  }

  // If user is authenticated, show role-based dashboard
  if (user && profile) {
    return (
      <div className="min-h-screen">
        <Header />
        {profile.role === 'service_provider' ? (
          <ProviderDashboard />
        ) : (
          <CustomerDashboard />
        )}
      </div>
    );
  }

  // If user is not authenticated, show landing page
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <Features />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
