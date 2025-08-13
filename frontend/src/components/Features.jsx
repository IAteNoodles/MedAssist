import React from 'react';

const Features = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Users & Key Use Cases</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Primary user: Licensed physician (OPD/IPD). Secondary: Resident/PA under supervision; Data/ML engineer for maintenance.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="grid gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h4 className="font-bold text-xl mb-2">Upload Lab Report</h4>
              <p className="text-gray-600 mb-4">Upload lab report PDF → OCR → extract values → XGBoost & specialty models → SHAP → Med-Gemma produces differential diagnosis with rationale.</p>
              <img src="https://cdn.prod.website-files.com/67469be284b048fa58eda575/674c20018ab05d1879bdf852_img-13.png" loading="lazy" alt="" className="w-full rounded-lg" />
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h4 className="font-bold text-xl mb-2">Enter Symptoms/History</h4>
              <p className="text-gray-600 mb-4">Enter symptoms/history → Med-Gemma integrates with model outputs → structured assessment: likely diagnoses, uncertainties, recommended tests.</p>
              <img src="https://cdn.prod.website-files.com/67469be284b048fa58eda575/674c23c68dfb7342930d3401_img-14.png" loading="lazy" alt="" className="w-full rounded-lg" />
            </div>
          </div>
          <div className="grid gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h4 className="font-bold text-xl mb-2">Revisit a Case</h4>
              <p className="text-gray-600 mb-4">Revisit a case → see versioned predictions and exact evidence used previously.</p>
              <div className="grid grid-cols-2 gap-4">
                <img src="https://cdn.prod.website-files.com/67469be284b048fa58eda575/6755b6b3c9989275ef879c8e_img-13.png" loading="lazy" alt="" className="w-full rounded-lg" />
                <img src="https://cdn.prod.website-files.com/67469be284b048fa58eda575/6755b6b24ef606132010d23e_img-16.png" loading="lazy" alt="" className="w-full rounded-lg" />
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h4 className="font-bold text-xl mb-2">System Overview</h4>
              <p className="text-gray-600 mb-4">A high-level overview of the system architecture.</p>
              <img src="https://cdn.prod.website-files.com/67469be284b048fa58eda575/6755b74bd95765831746174b_img-17.png" loading="lazy" alt="" className="w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
