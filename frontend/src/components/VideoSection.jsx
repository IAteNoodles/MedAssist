import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, Share } from 'lucide-react';

const VideoSection = () => {
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
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
            Powerful & Intuitive API Design
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Seamlessly integrate our diagnostic assistant into your existing workflow with our robust and well-documented API.
          </p>
        </motion.div>
        <motion.div 
          className="relative bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-20"></div>
          <div className="relative p-8 sm:p-12">
            <div className="bg-black/50 backdrop-blur-sm p-6 rounded-lg border border-white/10">
              <pre className="text-sm text-gray-200 overflow-x-auto">
                <code>
                  {`
{
  "patient_id": "UUID",
  "encounter_id": "UUID",
  "symptoms_text": "...",
  "labs": [{"code":"HB", "value":12.8, "unit":"g/dL", "collected_at":"..."}],
  "artifacts": [{"artifact_id":"...", "path":"s3://.../report.pdf"}]
}
                  `}
                </code>
              </pre>
            </div>
          </div>
          <motion.div 
            className="absolute inset-0 flex items-center justify-center bg-black/30"
            initial={{ opacity: 1 }}
            whileHover={{ opacity: 0 }}
          >
            <PlayCircle className="text-white" size={80} />
          </motion.div>
        </motion.div>
        <motion.div className="text-center mt-12" variants={itemVariants}>
          <motion.a 
            href="/contact" 
            className="inline-flex items-center bg-white hover:bg-gray-100 text-gray-800 font-bold py-4 px-8 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-md"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Share className="mr-2" size={20} />
            Explore API Documentation
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default VideoSection;
