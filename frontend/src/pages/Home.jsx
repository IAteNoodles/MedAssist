import React from 'react';
import Header from '../components/Header';
import Dashboard from '../components/Dashboard';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main>
        <Dashboard />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
