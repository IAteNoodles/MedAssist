import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 300,
      },
    },
  };

  return (
    <section className="relative bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 py-24">
        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="space-y-8" variants={itemVariants}>
            <div>
              <motion.div
                className="inline-flex items-center bg-white rounded-full p-1 pr-4 mb-4 shadow-md"
                variants={itemVariants}
              >
                <img src="https://cdn.prod.website-files.com/67469be284b048fa58eda575/6747f658f2a000f871440bc4_union.svg" loading="lazy" alt="" className="mr-2" />
                <p className="text-sm font-medium text-blue-600">A Clinician-Facing, Agentic Diagnosis Assistant</p>
              </motion.div>
              <motion.h1 className="text-6xl font-extrabold text-gray-900 mb-4 leading-tight" variants={itemVariants}>
                Smarter Diagnosis,
                <br />
                Better Outcomes.
              </motion.h1>
              <motion.p className="text-lg text-gray-600 mb-8" variants={itemVariants}>
                Our AI-powered assistant provides decision support to empower medical professionals. We prioritize explainability, auditability, and data security.
              </motion.p>
              <motion.div className="flex items-center space-x-4" variants={itemVariants}>
                <motion.a
                  href="/pricing"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started For Free
                </motion.a>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/dashboard" className="inline-flex items-center bg-white hover:bg-gray-100 text-blue-600 font-bold py-4 px-8 rounded-xl border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 shadow-md">
                    Go to Dashboard <ArrowRight className="ml-2" size={20} />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
          <motion.div className="space-y-6" variants={containerVariants}>
            <motion.div
              className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/20 flex items-center justify-between"
              variants={itemVariants}
            >
              <div>
                <h2 className="text-5xl font-bold text-gray-900">190K+</h2>
                <p className="text-gray-600">Satisfied patients globally</p>
              </div>
              <div className="flex -space-x-4">
                <img src="https://cdn.prod.website-files.com/67469be284b048fa58eda575/6747fcd238135e8268725d27_user-1.png" loading="lazy" alt="" className="w-14 h-14 rounded-full border-4 border-white shadow-md" />
                <img src="https://cdn.prod.website-files.com/67469be284b048fa58eda575/6747fcd2f32b8fbebe3efe10_user-2.png" loading="lazy" alt="" className="w-14 h-14 rounded-full border-4 border-white shadow-md" />
                <img src="https://cdn.prod.website-files.com/67469be284b048fa58eda575/6747fcd268e9755d6d68ce65_user-3.png" loading="lazy" alt="" className="w-14 h-14 rounded-full border-4 border-white shadow-md" />
              </div>
            </motion.div>
            <div className="grid grid-cols-2 gap-6">
              <motion.div
                className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/20"
                variants={itemVariants}
                whileHover="hover"
              >
                <div className="flex justify-between items-start mb-4">
                  <img src="https://cdn.prod.website-files.com/67469be284b048fa58eda575/67480601e163925393a93976_insight.svg" loading="lazy" alt="" className="w-10 h-10" />
                  <a href="/features" className="text-sm font-semibold text-blue-600 hover:text-blue-700">Explore</a>
                </div>
                <h4 className="font-bold text-lg mb-2">Personalized Care</h4>
                <p className="text-sm text-gray-600 mb-4">From wellness to advanced health insights.</p>
                <div className="flex items-center justify-between">
                  <h3 className="text-4xl font-bold">78%</h3>
                  <img src="https://cdn.prod.website-files.com/67469be284b048fa58eda575/6748071e6774c9d5172580b6_menu.svg" loading="lazy" alt="" />
                </div>
              </motion.div>
              <motion.div
                className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/20 flex flex-col justify-between"
                variants={itemVariants}
                whileHover="hover"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-4xl font-bold">150+</h4>
                    <p className="text-gray-600">Doctors</p>
                  </div>
                  <div className="flex space-x-1">
                    <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                    <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                    <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                  </div>
                </div>
                <img src="https://cdn.prod.website-files.com/67469be284b048fa58eda575/674807975fa505c7fa9af34b_img-1.png" loading="lazy" alt="" className="w-full mt-4 rounded-lg" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
