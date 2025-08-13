import React from 'react';
import { Search, Bell } from 'lucide-react';

const DashboardHeader = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center">
            <a href="/" aria-current="page" className="mr-8">
              <img src="https://cdn.prod.website-files.com/67469be284b048fa58eda575/6746d4199bb662466d5e5744_logo.svg" loading="lazy" alt="Healix Logo" className="h-8" />
            </a>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for a patient..."
                className="pl-10 pr-4 py-2 w-96 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <button className="text-gray-500 hover:text-gray-700">
              <Bell size={24} />
            </button>
            <div className="flex items-center space-x-3">
              <img
                src="https://i.pravatar.cc/40?u=dravasthi"
                alt="Dr. Avasthi"
                className="h-10 w-10 rounded-full"
              />
              <div>
                <p className="font-semibold text-gray-800">Dr. Avasthi</p>
                <p className="text-sm text-gray-500">Cardiologist</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
