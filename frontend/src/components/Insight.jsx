import React from 'react';

const Insight = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900">
                Studies show that proactive health tracking can reduce chronic <span className="text-gray-500">health risks by up to 78%</span>
              </h2>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <img src="https://cdn.prod.website-files.com/67469be284b048fa58eda575/67480601e163925393a93976_insight.svg" loading="lazy" alt="" className="w-8 h-8" />
                <a href="/features" className="text-sm font-semibold text-blue-500 hover:text-blue-600">Explore</a>
              </div>
              <h4 className="font-bold text-lg mb-2">Health Monitoring Matters</h4>
              <p className="text-sm text-gray-600 mb-4">Studies show that proactive health tracking can reduce chronic health risks by up to</p>
              <div className="flex items-center justify-between">
                <h3 className="text-3xl font-bold">78%</h3>
                <img src="https://cdn.prod.website-files.com/67469be284b048fa58eda575/6748071e6774c9d5172580b6_menu.svg" loading="lazy" alt="" />
              </div>
              <div className="flex flex-wrap gap-2 mt-6">
                <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs">Rehabilitation</span>
                <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs">Healthcare</span>
                <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs">Monitoring</span>
                <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs">Technology</span>
                <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs">Personalized</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Insight;
