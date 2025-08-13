import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Cpu, FileText } from 'lucide-react';

const HowItWorks = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const steps = [
    {
      step: "01",
      title: "Data Ingestion & OCR",
      description: "Upload PDF/image reports. Our OCR agent extracts text and structured key-values, flagging any uncertainties.",
      icon: Upload
    },
    {
      step: "02",
      title: "ML & SHAP Analysis",
      description: "A Tabular ML Agent runs XGBoost and other specialized models. The SHAP agent provides per-model explainability.",
      icon: Cpu
    },
    {
      step: "03",
      title: "LLM Synthesis (Med-Gemma)",
      description: "The LLM Report Agent generates a differential diagnosis, rationale, and next steps based on all available evidence.",
      icon: FileText
    }
  ];

  return (
    <motion.section 
      className="py-24 bg-gray-50"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-5xl font-extrabold text-center text-gray-900 mb-16"
          variants={itemVariants}
        >
          How Our System Works
        </motion.h2>
        <div className="relative">
          <div className="absolute left-1/2 top-12 bottom-12 w-1 bg-blue-100 rounded-full transform -translate-x-1/2"></div>
          <motion.div 
            className="grid md:grid-cols-3 gap-12"
            variants={containerVariants}
          >
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/30 text-center"
                variants={itemVariants}
                whileHover={{ y: -10, boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="mb-6 inline-block bg-blue-100 p-4 rounded-full">
                  <step.icon className="text-blue-600" size={32} />
                </div>
                <h3 className="text-lg font-bold text-blue-600 mb-2">Step <span className="text-gray-900">{step.step}</span></h3>
                <h4 className="text-2xl font-bold mb-4">{step.title}</h4>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default HowItWorks;
