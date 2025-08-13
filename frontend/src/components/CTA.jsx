import React from 'react';

const CTA = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold text-gray-900">
              Speak with one of our health tech experts to discover <span className="text-gray-500">how Healix can support your wellness journey.</span>
            </h2>
          </div>
          <div className="w-full md:w-1/2 md:text-right">
            <p className="mb-4 text-gray-600">Start your health journey with Healix today. Your health, your data, your power.</p>
            <a href="/appointment" className="inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
              Book your appointment
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
