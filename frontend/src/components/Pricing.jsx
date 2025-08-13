import React, { useState } from 'react';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose the right plan for your health journey</h2>
          <p className="text-lg text-gray-600">Flexible options to suit your health monitoring needs.</p>
        </div>
        <div className="flex justify-center items-center space-x-4 mb-8">
          <span className={billingCycle === 'monthly' ? 'font-semibold' : ''}>Billed monthly</span>
          <label className="switch">
            <input type="checkbox" onChange={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')} />
            <span className="slider round"></span>
          </label>
          <span className={billingCycle === 'yearly' ? 'font-semibold' : ''}>Billed yearly</span>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Pricing cards would be mapped from data, this is a simplified example */}
          <div className="bg-white p-8 rounded-lg shadow-md flex flex-col">
            <h4 className="text-xl font-bold mb-2">Wellness Starter Plan</h4>
            <p className="text-gray-600 mb-6">Designed to enhance sleep quality with tailored insights.</p>
            <div className="mb-6">
              <p className="font-semibold mb-2">Features:</p>
              <ul className="space-y-2 text-gray-600">
                <li>✓ articles and tips</li>
                <li>✓ activity reminders</li>
                <li>✓ Basic health tracking</li>
                <li>✓ articles and tips</li>
                <li>✓ Weekly wellness check-in</li>
              </ul>
            </div>
            <div className="mt-auto">
              <div className="flex items-baseline mb-4">
                <h2 className="text-4xl font-bold">${billingCycle === 'monthly' ? '59' : '49'}</h2>
                <span className="text-gray-500 ml-2">/ month</span>
              </div>
              <a href="/contact" className="w-full text-center bg-blue-100 text-blue-600 font-semibold py-3 rounded-lg hover:bg-blue-200">
                Choose Plan
              </a>
            </div>
          </div>
          <div className="bg-blue-500 text-white p-8 rounded-lg shadow-lg flex flex-col relative">
            <span className="absolute top-0 right-0 bg-white text-blue-500 text-xs font-bold px-3 py-1 rounded-bl-lg">Popular</span>
            <h4 className="text-xl font-bold mb-2">Sleep Wellness Plan</h4>
            <p className="opacity-80 mb-6">Ideal for general wellness tracking and building healthy habits.</p>
            <div className="mb-6">
              <p className="font-semibold mb-2">Features:</p>
              <ul className="space-y-2 opacity-80">
                <li>✓ articles and tips</li>
                <li>✓ activity reminders</li>
                <li>✓ Basic health tracking</li>
                <li>✓ articles and tips</li>
                <li>✓ Weekly wellness check-in</li>
              </ul>
            </div>
            <div className="mt-auto">
              <div className="flex items-baseline mb-4">
                <h2 className="text-4xl font-bold">${billingCycle === 'monthly' ? '79' : '69'}</h2>
                <span className="opacity-80 ml-2">/ month</span>
              </div>
              <a href="/contact" className="w-full text-center bg-white text-blue-500 font-semibold py-3 rounded-lg hover:bg-gray-100">
                Choose Plan
              </a>
            </div>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md flex flex-col">
            <h4 className="text-xl font-bold mb-2">Weight Management Plan</h4>
            <p className="text-gray-600 mb-6">Focus on achieving and maintaining a healthy weight.</p>
            <div className="mb-6">
              <p className="font-semibold mb-2">Features:</p>
              <ul className="space-y-2 text-gray-600">
                <li>✓ articles and tips</li>
                <li>✓ activity reminders</li>
                <li>✓ Basic health tracking</li>
                <li>✓ articles and tips</li>
                <li>✓ Weekly wellness check-in</li>
              </ul>
            </div>
            <div className="mt-auto">
              <div className="flex items-baseline mb-4">
                <h2 className="text-4xl font-bold">${billingCycle === 'monthly' ? '99' : '89'}</h2>
                <span className="text-gray-500 ml-2">/ month</span>
              </div>
              <a href="/contact" className="w-full text-center bg-blue-100 text-blue-600 font-semibold py-3 rounded-lg hover:bg-blue-200">
                Choose Plan
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
