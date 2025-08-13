import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, XCircle } from 'lucide-react';

const Benefits = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const cardHover = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 300,
      },
    },
  };

  return (
    <motion.section 
      className="py-24"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container mx-auto px-4">
        <motion.div className="grid md:grid-cols-2 gap-12 items-center mb-16" variants={containerVariants}>
          <motion.div variants={itemVariants}>
            <h2 className="text-5xl font-extrabold text-gray-900 mb-4">Goals & Non-Goals</h2>
            <p className="text-lg text-gray-600">
              Our aim is to provide clinicians with a single, intuitive interface to view patient data and an AI-generated differential diagnosis, complete with transparent, evidence-based reasoning (SHAP + citations).
            </p>
          </motion.div>
          <motion.div className="text-right" variants={itemVariants}>
            <motion.a 
              href="/pricing" 
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started For Free <ArrowRight className="ml-2" size={20} />
            </motion.a>
          </motion.div>
        </motion.div>
        <motion.div className="grid md:grid-cols-3 gap-8" variants={containerVariants}>
          <motion.div className="bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/20" variants={itemVariants} whileHover="hover">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-bold text-xl">Modular Toolset</h4>
              <CheckCircle className="text-green-500" size={28} />
            </div>
            <p className="text-gray-700 mb-4">Leverages OCR, tabular ML, LLM reasoning (Med-Gemma), and advanced orchestration for a comprehensive diagnostic toolkit.</p>
            <div className="flex items-center justify-between mt-8">
              <img src="https://cdn.prod.website-files.com/67469be284b048fa58eda575/674824d84cbd5773dc9de322_union2.svg" loading="lazy" alt="" className="w-10 h-10" />
              <h2 className="text-5xl font-bold text-green-600">Safe</h2>
            </div>
          </motion.div>
          <motion.div 
            className="bg-cover bg-center rounded-2xl shadow-lg p-8 flex flex-col justify-between border border-white/20" 
            style={{ backgroundImage: "url('https://cdn.prod.website-files.com/67469be284b048fa58eda575/674826c9b9cd09200f7a69a8_img-2.png')" }}
            variants={itemVariants}
            whileHover="hover"
          >
            <div className="bg-black/30 p-4 rounded-lg">
              <div className="flex flex-wrap gap-2">
                <span className="bg-white/80 text-blue-800 text-xs font-semibold mr-2 px-3 py-1 rounded-full">Safe</span>
                <span className="bg-white/80 text-blue-800 text-xs font-semibold mr-2 px-3 py-1 rounded-full">Auditable</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="bg-gray-200/80 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">Versioned Models</span>
                <span className="bg-white/80 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">Prompts</span>
              </div>
            </div>
          </motion.div>
          <motion.div className="bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/20" variants={itemVariants} whileHover="hover">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-bold text-xl">Non-Goals</h4>
              <XCircle className="text-red-500" size={28} />
            </div>
            <p className="text-gray-700 mb-4">This tool is not a replacement for clinical judgment or a source of patient-facing medical advice. It is for professional support only.</p>
            <div className="flex items-center justify-between mt-8">
              <img src="https://cdn.prod.website-files.com/67469be284b048fa58eda575/6748259f69f3e06e062fd80b_subtract.svg" loading="lazy" alt="" className="w-10 h-10" />
              <h2 className="text-5xl font-bold text-red-600">Not Advice</h2>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Benefits;