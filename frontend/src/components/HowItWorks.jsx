import React from 'react';

const HowItWorks = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Simple steps to start your health journey</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Step <span className="text-gray-400">01</span></h3>
              <a href="/features" className="text-sm font-semibold text-blue-500 hover:text-blue-600">Explore</a>
            </div>
            <h4 className="text-xl font-bold mb-2">Download the app and connect your devices</h4>
            <p className="text-gray-600">For access, sync Healix with your health wearables for updates.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Step <span className="text-gray-400">02</span></h3>
              <a href="/features" className="text-sm font-semibold text-blue-500 hover:text-blue-600">Explore</a>
            </div>
            <h4 className="text-xl font-bold mb-2">Set your health goals and start monitoring your journey</h4>
            <p className="text-gray-600">Define your wellness targets for a personalized experience.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Step <span className="text-gray-400">03</span></h3>
              <a href="/features" className="text-sm font-semibold text-blue-500 hover:text-blue-600">Explore</a>
            </div>
            <h4 className="text-xl font-bold mb-2">Track & achieve your desired goal and stay healthy</h4>
            <p className="text-gray-600">Start monitoring, receive insights, and adjust your habits based on data.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
