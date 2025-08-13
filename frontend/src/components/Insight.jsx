import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Zap } from 'lucide-react';

const Insight = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.3
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
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
        <motion.div 
          className="bg-white/60 backdrop-blur-md rounded-2xl shadow-xl border border-white/30 overflow-hidden"
          variants={itemVariants}
        >
          <div className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <motion.div variants={itemVariants}>
                <h2 className="text-5xl font-extrabold text-gray-900 leading-tight">
                  Reduce Chronic Health Risks by up to <span className="text-blue-600">78%</span>
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                  Studies show that proactive health tracking and early intervention are key to long-term wellness. Our platform empowers you to take control.
                </p>
              </motion.div>
              <motion.div 
                className="bg-gray-50/50 p-8 rounded-2xl shadow-lg border border-gray-200/80"
                variants={itemVariants}
                whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-blue-100 p-3 rounded-xl">
                    <TrendingUp className="text-blue-600" size={28} />
                  </div>
                  <a href="/features" className="text-sm font-semibold text-blue-600 hover:underline">Explore Features</a>
                </div>
                <h4 className="font-bold text-xl mb-2">Health Monitoring Matters</h4>
                <p className="text-sm text-gray-600 mb-4">Proactive tracking is proven to significantly lower risks associated with chronic conditions.</p>
                <div className="flex items-center justify-between mt-6">
                  <h3 className="text-6xl font-bold text-blue-600">78%</h3>
                  <Zap className="text-yellow-400" size={40} />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Insight;
