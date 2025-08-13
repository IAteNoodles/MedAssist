import React from 'react';

const Tips = () => {
  return (
    <section className="py-20 bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-700 rounded-lg transform -rotate-2"></div>
          <div className="relative bg-blue-600 rounded-lg p-12">
            <h2 className="text-4xl font-bold text-center">
              Receive tailored health tips and alerts based on your individual data trends, <span className="opacity-75">helping you make proactive adjustments</span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tips;
