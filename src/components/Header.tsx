
import React from 'react';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">H</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">HomeServ</span>
          <span className="text-sm text-orange-600 font-medium">India</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#services" className="text-gray-700 hover:text-orange-600 transition-colors">Services</a>
          <a href="#features" className="text-gray-700 hover:text-orange-600 transition-colors">Features</a>
          <a href="#about" className="text-gray-700 hover:text-orange-600 transition-colors">About</a>
          <a href="#contact" className="text-gray-700 hover:text-orange-600 transition-colors">Contact</a>
        </nav>

        <div className="flex items-center space-x-4">
          <a href="tel:+91-8888-888-888" className="hidden sm:flex items-center space-x-2 text-gray-700 hover:text-orange-600 transition-colors">
            <Phone className="w-4 h-4" />
            <span className="text-sm">+91-8888-888-888</span>
          </a>
          <Button className="bg-orange-600 hover:bg-orange-700 text-white">
            Book Now
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
