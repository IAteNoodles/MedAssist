import React from 'react';

const Benefits = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why choose Healix for health tracking & monitoring?</h2>
          </div>
          <div>
            <p className="text-lg text-gray-600 mb-6">Healix is designed to help you track and understand your health in real time. Whether it's monitoring vital signs, activity levels, or health patterns to make informed decisions for a healthier lifestyle.</p>
            <a href="/pricing" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg">
              Get Started For Free
            </a>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-bold text-lg">Enhanced health awareness</h4>
              <a href="/features" className="text-sm font-semibold text-blue-500 hover:text-blue-600">Explore</a>
            </div>
            <p className="text-sm text-gray-600 mb-4">Healix encourages users to stay active through custom goals.</p>
            <div className="flex items-center justify-between">
              <img src="https://cdn.prod.website-files.com/67469be284b048fa58eda575/674824d84cbd5773dc9de322_union2.svg" loading="lazy" alt="" className="w-8 h-8" />
              <h2 className="text-4xl font-bold">250k+</h2>
            </div>
          </div>
          <div className="bg-cover bg-center rounded-lg shadow-md p-6 flex flex-col justify-between" style={{ backgroundImage: "url('https://cdn.prod.website-files.com/67469be284b048fa58eda575/674826c9b9cd09200f7a69a8_img-2.png')" }}>
            <div>
              <span className="bg-white text-black text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">Boost in physical</span>
              <span className="bg-white text-black text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">activity levels</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs">Step count</span>
              <span className="bg-white text-gray-800 px-2 py-1 rounded-full text-xs">Physical activity</span>
              <span className="bg-white text-gray-800 px-2 py-1 rounded-full text-xs">Custom goals</span>
              <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs">Cardiovascular</span>
              <span className="bg-white text-gray-800 px-2 py-1 rounded-full text-xs">Fitness</span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-bold text-lg">Faster response to health changes</h4>
              <a href="/features" className="text-sm font-semibold text-blue-500 hover:text-blue-600">Explore</a>
            </div>
            <p className="text-sm text-gray-600 mb-4">Healix inspires you to keep moving with tailored objectives.</p>
            <div className="flex items-center justify-between">
              <img src="https://cdn.prod.website-files.com/67469be284b048fa58eda575/6748259f69f3e06e062fd80b_subtract.svg" loading="lazy" alt="" className="w-8 h-8" />
              <h2 className="text-4xl font-bold">78.00%</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
