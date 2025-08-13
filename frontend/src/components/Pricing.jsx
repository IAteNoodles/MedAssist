import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

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

  const pricingPlans = [
    {
      name: "Wellness Starter",
      description: "Designed to enhance sleep quality with tailored insights.",
      price: { monthly: 59, yearly: 49 },
      features: ["Articles and tips", "Activity reminders", "Basic health tracking", "Weekly wellness check-in"],
      popular: false,
    },
    {
      name: "Sleep Wellness",
      description: "Ideal for general wellness tracking and building healthy habits.",
      price: { monthly: 79, yearly: 69 },
      features: ["All Starter features", "Advanced sleep analytics", "Personalized recommendations", "Priority support"],
      popular: true,
    },
    {
      name: "Weight Management",
      description: "Focus on achieving and maintaining a healthy weight.",
      price: { monthly: 99, yearly: 89 },
      features: ["All Wellness features", "Nutrition tracking", "Custom meal plans", "1-on-1 coaching"],
      popular: false,
    }
  ];

  return (
    <motion.section 
      className="py-24 bg-gray-50"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-5xl font-extrabold text-gray-900 mb-4">Choose the right plan for your health journey</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">Flexible options to suit your health monitoring needs.</p>
        </motion.div>
        <motion.div className="flex justify-center items-center space-x-4 mb-12" variants={itemVariants}>
          <span className={`font-semibold ${billingCycle === 'monthly' ? 'text-blue-600' : 'text-gray-500'}`}>Billed monthly</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" onChange={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')} />
            <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
          <span className={`font-semibold ${billingCycle === 'yearly' ? 'text-blue-600' : 'text-gray-500'}`}>Billed yearly</span>
        </motion.div>
        <motion.div className="grid md:grid-cols-3 gap-8" variants={containerVariants}>
          {pricingPlans.map((plan, index) => (
            <motion.div 
              key={index} 
              className={`p-8 rounded-2xl flex flex-col ${plan.popular ? 'bg-blue-600 text-white shadow-2xl' : 'bg-white/80 backdrop-blur-sm shadow-lg border border-white/30'}`}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              {plan.popular && <span className="absolute top-0 right-0 bg-white text-blue-600 text-xs font-bold px-4 py-1 rounded-bl-2xl rounded-tr-2xl">Popular</span>}
              <h4 className="text-2xl font-bold mb-2">{plan.name}</h4>
              <p className={`mb-6 ${plan.popular ? 'opacity-80' : 'text-gray-600'}`}>{plan.description}</p>
              <div className="mb-6">
                <p className="font-semibold mb-4">Features:</p>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className={`mr-3 ${plan.popular ? 'text-blue-300' : 'text-blue-500'}`} size={20} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto">
                <div className="flex items-baseline mb-4">
                  <h2 className="text-5xl font-bold">${plan.price[billingCycle]}</h2>
                  <span className={`ml-2 ${plan.popular ? 'opacity-80' : 'text-gray-500'}`}>/ month</span>
                </div>
                <motion.a 
                  href="/contact" 
                  className={`w-full text-center font-semibold py-3 rounded-lg transition-colors duration-300 ${plan.popular ? 'bg-white text-blue-600 hover:bg-gray-100' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Choose Plan
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Pricing;
