import React from 'react';
import DashboardHeader from '../components/DashboardHeader';
import Dashboard from '../components/Dashboard';
import Footer from '../components/Footer';

const DashboardPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <DashboardHeader />
      <main>
        <Dashboard />
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
