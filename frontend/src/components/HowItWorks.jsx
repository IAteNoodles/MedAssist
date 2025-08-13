import React from 'react';

const HowItWorks = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">How Our System Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Step <span className="text-gray-400">01</span></h3>
              <a href="/features" className="text-sm font-semibold text-blue-500 hover:text-blue-600">Explore</a>
            </div>
            <h4 className="text-xl font-bold mb-2">Data Ingestion & OCR</h4>
            <p className="text-gray-600">Upload PDF/image reports. Our OCR agent extracts text and structured key-values, flagging any uncertainties.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Step <span className="text-gray-400">02</span></h3>
              <a href="/features" className="text-sm font-semibold text-blue-500 hover:text-blue-600">Explore</a>
            </div>
            <h4 className="text-xl font-bold mb-2">ML & SHAP Analysis</h4>
            <p className="text-gray-600">A Tabular ML Agent runs XGBoost and other specialized models. The SHAP agent provides per-model explainability.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Step <span className="text-gray-400">03</span></h3>
              <a href="/features" className="text-sm font-semibold text-blue-500 hover:text-blue-600">Explore</a>
            </div>
            <h4 className="text-xl font-bold mb-2">LLM Synthesis (Med-Gemma)</h4>
            <p className="text-gray-600">The LLM Report Agent generates a differential diagnosis, rationale, and next steps based on all available evidence.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
