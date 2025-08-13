import React from 'react';

const Features = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Features designed for your health journey</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Healix is designed to help you track and understand your health to make informed decisions for a healthier lifestyle.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="grid gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h4 className="font-bold text-xl mb-2">Get answers to your health questions</h4>
              <p className="text-gray-600 mb-4">Healix encourages users to stay active.</p>
              <img src="https://cdn.prod.website-files.com/67469be284b048fa58eda575/674c20018ab05d1879bdf852_img-13.png" loading="lazy" alt="" className="w-full rounded-lg" />
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h4 className="font-bold text-xl mb-2">Find answers to all your health concerns</h4>
              <p className="text-gray-600 mb-4">Healix inspires users to maintain activity</p>
              <img src="https://cdn.prod.website-files.com/67469be284b048fa58eda575/674c23c68dfb7342930d3401_img-14.png" loading="lazy" alt="" className="w-full rounded-lg" />
            </div>
          </div>
          <div className="grid gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h4 className="font-bold text-xl mb-2">Find solutions to your health inquiries</h4>
              <p className="text-gray-600 mb-4">Healix motivates users to stay active.</p>
              <div className="grid grid-cols-2 gap-4">
                <img src="https://cdn.prod.website-files.com/67469be284b048fa58eda575/6755b6b3c9989275ef879c8e_img-13.png" loading="lazy" alt="" className="w-full rounded-lg" />
                <img src="https://cdn.prod.website-files.com/67469be284b048fa58eda575/6755b6b24ef606132010d23e_img-16.png" loading="lazy" alt="" className="w-full rounded-lg" />
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h4 className="font-bold text-xl mb-2">Discover answers to your health concerns</h4>
              <p className="text-gray-600 mb-4">Healix helps users embrace an active life.</p>
              <img src="https://cdn.prod.website-files.com/67469be284b048fa58eda575/6755b74bd95765831746174b_img-17.png" loading="lazy" alt="" className="w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
