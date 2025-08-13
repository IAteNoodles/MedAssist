import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const CTA = () => {
  return (
    <motion.section 
      className="py-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-2xl p-12 text-white">
          <div className="flex flex-wrap items-center justify-between">
            <motion.div 
              className="w-full md:w-2/3 mb-8 md:mb-0"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-4xl font-extrabold">
                Ready to Transform Patient Care?
              </h2>
              <p className="mt-2 text-lg opacity-80">
                Speak with one of our health tech experts to discover how our AI assistant can support your practice.
              </p>
            </motion.div>
            <motion.div 
              className="w-full md:w-1/3 md:text-right"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.a 
                href="/appointment" 
                className="inline-flex items-center bg-white text-blue-600 font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book a Demo <ArrowRight className="ml-2" size={20} />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default CTA;
