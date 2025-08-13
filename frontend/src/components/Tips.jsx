import React from 'react';
import { motion } from 'framer-motion';

const Tips = () => {
  return (
    <section className="py-20 bg-blue-600 text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="relative"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className="absolute inset-0 bg-blue-700/50 rounded-2xl transform -rotate-2"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, type: "spring" }}
          ></motion.div>
          <div className="relative bg-blue-600/80 backdrop-blur-sm border border-white/20 rounded-2xl p-12 shadow-2xl">
            <h2 className="text-5xl font-bold text-center leading-tight">
              Our Sophisticated, AI-Powered 
              <br />
              <span className="text-blue-200">Diagnostic Assistant</span>
            </h2>
            <p className="text-center text-xl mt-4 opacity-80 max-w-3xl mx-auto">
              Helping you make proactive, data-driven adjustments to patient care with confidence.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Tips;
