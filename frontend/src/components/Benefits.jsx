import React from 'react';

const Benefits = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Goals & Non-Goals</h2>
          </div>
          <div>
            <p className="text-lg text-gray-600 mb-6">Provide clinicians a single screen to view patient data and agent-generated differential diagnosis with transparent evidence (SHAP + citations to inputs).</p>
            <a href="/pricing" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg">
              Get Started For Free
            </a>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-bold text-lg">Modular Toolset</h4>
              <a href="/features" className="text-sm font-semibold text-blue-500 hover:text-blue-600">Explore</a>
            </div>
            <p className="text-sm text-gray-600 mb-4">OCR, tabular ML, LLM reasoning (Med-Gemma), and orchestration.</p>
            <div className="flex items-center justify-between">
              <img src="https://cdn.prod.website-files.com/67469be284b048fa58eda575/674824d84cbd5773dc9de322_union2.svg" loading="lazy" alt="" className="w-8 h-8" />
              <h2 className="text-4xl font-bold">Safe</h2>
            </div>
          </div>
          <div className="bg-cover bg-center rounded-lg shadow-md p-6 flex flex-col justify-between" style={{ backgroundImage: "url('https://cdn.prod.website-files.com/67469be284b048fa58eda575/674826c9b9cd09200f7a69a8_img-2.png')" }}>
            <div>
              <span className="bg-white text-black text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">Safe</span>
              <span className="bg-white text-black text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">Auditable</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs">Versioned Models</span>
              <span className="bg-white text-gray-800 px-2 py-1 rounded-full text-xs">Prompts</span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-bold text-lg">Non-Goals</h4>
              <a href="/features" className="text-sm font-semibold text-blue-500 hover:text-blue-600">Explore</a>
            </div>
            <p className="text-sm text-gray-600 mb-4">Not a replacement for clinical judgment or patient-facing medical advice.</p>
            <div className="flex items-center justify-between">
              <img src="https://cdn.prod.website-files.com/67469be284b048fa58eda575/6748259f69f3e06e062fd80b_subtract.svg" loading="lazy" alt="" className="w-8 h-8" />
              <h2 className="text-4xl font-bold">Not Advice</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
