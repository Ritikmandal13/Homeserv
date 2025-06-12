
import React from 'react';
import { Phone, Map, Home } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <span className="text-2xl font-bold">HomeServ</span>
              <span className="text-orange-400 font-medium">India</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              India's most trusted home services platform connecting you with verified 
              professionals for all your household needs.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="w-4 h-4" />
                <span>+91-8888-888-888</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Map className="w-4 h-4" />
                <span>Available in 100+ Cities</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-orange-400 transition-colors">Plumbing Services</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Electrical Work</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">AC Repair & Service</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Home Cleaning</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Pest Control</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Appliance Repair</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Major Cities</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-orange-400 transition-colors">Mumbai</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Delhi NCR</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Bangalore</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Chennai</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Hyderabad</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Pune</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-orange-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Partner with Us</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Support</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 HomeServ India. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">Accepted Payments:</span>
              <div className="flex items-center space-x-2">
                <span className="bg-gray-800 px-2 py-1 rounded text-xs">UPI</span>
                <span className="bg-gray-800 px-2 py-1 rounded text-xs">Cards</span>
                <span className="bg-gray-800 px-2 py-1 rounded text-xs">Net Banking</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
