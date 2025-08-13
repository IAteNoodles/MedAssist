import React from 'react';

const Hero = () => {
  return (
    <section className="bg-gray-50">
      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center bg-white rounded-full p-1 pr-4 mb-4">
                <img src="https://cdn.prod.website-files.com/67469be284b048fa58eda575/6747f658f2a000f871440bc4_union.svg" loading="lazy" alt="" className="mr-2" />
                <p className="text-sm font-medium text-gray-600">Reliable Solutions for Everyday Care</p>
              </div>
              <h1 className="text-5xl font-bold text-gray-900 mb-4">Where care meets innovation</h1>
              <p className="text-lg text-gray-600 mb-6">From daily wellness to advanced health insights, our platform is designed to support you.</p>
              <a href="/pricing" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg">
                Get Started For Free
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
              <div>
                <h2 className="text-4xl font-bold text-gray-900">190K+</h2>
                <p className="text-gray-600">Cured satisfied patients around the globe</p>
              </div>
              <div className="flex -space-x-4">
                <img src="https://cdn.prod.website-files.com/67469be284b048fa58eda575/6747fcd238135e8268725d27_user-1.png" loading="lazy" alt="" className="w-12 h-12 rounded-full border-2 border-white" />
                <img src="https://cdn.prod.website-files.com/67469be284b048fa58eda575/6747fcd2f32b8fbebe3efe10_user-2.png" loading="lazy" alt="" className="w-12 h-12 rounded-full border-2 border-white" />
                <img src="https://cdn.prod.website-files.com/67469be284b048fa58eda575/6747fcd268e9755d6d68ce65_user-3.png" loading="lazy" alt="" className="w-12 h-12 rounded-full border-2 border-white" />
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              <span className="bg-white text-gray-700 px-3 py-1 rounded-full text-sm font-medium">Rehabilitation</span>
              <span className="bg-white text-gray-700 px-3 py-1 rounded-full text-sm font-medium">Healthcare</span>
              <span className="bg-white text-gray-700 px-3 py-1 rounded-full text-sm font-medium">Monitoring</span>
              <span className="bg-white text-gray-700 px-3 py-1 rounded-full text-sm font-medium">Technology</span>
              <span className="bg-white text-gray-700 px-3 py-1 rounded-full text-sm font-medium">Personalized</span>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <img src="https://cdn.prod.website-files.com/67469be284b048fa58eda575/67480601e163925393a93976_insight.svg" loading="lazy" alt="" className="w-8 h-8" />
                  <a href="/features" className="text-sm font-semibold text-blue-500 hover:text-blue-600">Explore</a>
                </div>
                <h4 className="font-bold text-lg mb-2">Personalized care and demand</h4>
                <p className="text-sm text-gray-600 mb-4">From daily wellness to advanced health insights we support.</p>
                <div className="flex items-center justify-between">
                  <h3 className="text-3xl font-bold">78%</h3>
                  <img src="https://cdn.prod.website-files.com/67469be284b048fa58eda575/6748071e6774c9d5172580b6_menu.svg" loading="lazy" alt="" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-3xl font-bold">150+</h4>
                    <p className="text-gray-600">Doctors</p>
                  </div>
                  <div className="flex space-x-1">
                    <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                    <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                    <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                  </div>
                </div>
                <img src="https://cdn.prod.website-files.com/67469be284b048fa58eda575/674807975fa505c7fa9af34b_img-1.png" loading="lazy" alt="" className="w-full mt-4 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
