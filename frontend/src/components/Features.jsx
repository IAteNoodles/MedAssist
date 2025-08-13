import React from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, Edit, History, Share2 } from 'lucide-react';

const Features = () => {
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
      scale: 1.03,
      boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 300,
      },
    },
  };

  const featuresData = [
    {
      title: "Upload Lab Report",
      description: "Upload lab report PDF → OCR → extract values → XGBoost & specialty models → SHAP → Med-Gemma produces differential diagnosis with rationale.",
      icon: UploadCloud,
      image: "https://cdn.prod.website-files.com/67469be284b048fa58eda575/674c20018ab05d1879bdf852_img-13.png"
    },
    {
      title: "Enter Symptoms/History",
      description: "Enter symptoms/history → Med-Gemma integrates with model outputs → structured assessment: likely diagnoses, uncertainties, recommended tests.",
      icon: Edit,
      image: "https://cdn.prod.website-files.com/67469be284b048fa58eda575/674c23c68dfb7342930d3401_img-14.png"
    },
    {
      title: "Revisit a Case",
      description: "Revisit a case → see versioned predictions and exact evidence used previously.",
      icon: History,
      image: "https://cdn.prod.website-files.com/67469be284b048fa58eda575/6755b6b3c9989275ef879c8e_img-13.png"
    },
    {
      title: "System Overview",
      description: "A high-level overview of the system architecture.",
      icon: Share2,
      image: "https://cdn.prod.website-files.com/67469be284b048fa58eda575/6755b74bd95765831746174b_img-17.png"
    }
  ];

  return (
    <motion.section 
      className="py-24 bg-white"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-5xl font-extrabold text-gray-900 mb-4">Users & Key Use Cases</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Primary user: Licensed physician (OPD/IPD). Secondary: Resident/PA under supervision; Data/ML engineer for maintenance.
          </p>
        </motion.div>
        <motion.div className="grid md:grid-cols-2 gap-8" variants={containerVariants}>
          {featuresData.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-gray-50/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100/80 overflow-hidden"
              variants={itemVariants}
              whileHover="hover"
            >
              <div className="flex items-start mb-4">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-xl mr-4">
                  <feature.icon size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2">{feature.title}</h4>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
              <motion.img 
                src={feature.image} 
                loading="lazy" 
                alt={feature.title} 
                className="w-full rounded-lg mt-6 shadow-md"
                variants={{
                  hover: { scale: 1.1, y: -10 }
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Features;
