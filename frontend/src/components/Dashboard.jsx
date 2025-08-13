import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, ArrowUpRight, Users, FileText, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const recentConsultations = [
    { id: 'P001', name: 'Sameer Ahmed', date: '2025-08-12', outcome: 'Differential: Suspected Pneumonia' },
    { id: 'P002', name: 'Jane Doe', date: '2025-08-11', outcome: 'Follow-up scheduled' },
    { id: 'P003', name: 'John Smith', date: '2025-08-11', outcome: 'Awaiting lab results' },
    { id: 'P004', name: 'Anjali Sharma', date: '2025-08-10', outcome: 'Cleared for discharge' },
    { id: 'P005', name: 'Robert Brown', date: '2025-08-09', outcome: 'Referred to cardiology' },
  ];

  const stats = [
    { title: "Total Consultations", value: "147", icon: Users, change: "+5 this week", changeType: "positive" },
    { title: "Pending Results", value: "12", icon: FileText, change: "-2 this week", changeType: "negative" },
    { title: "New Messages", value: "3", icon: MessageSquare, change: "+1 today", changeType: "positive" },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="container mx-auto px-4 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="flex justify-between items-center mb-8" variants={itemVariants}>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Good afternoon, Dr. Avasthi.</h1>
          <p className="text-gray-500">Here's a summary of your recent activity.</p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/consultation" className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-blue-700 transition-all duration-300 flex items-center shadow-lg hover:shadow-xl">
            <Plus size={20} className="mr-2" />
            Start New Consultation
          </Link>
        </motion.div>
      </motion.div>

      <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8" variants={containerVariants}>
        {stats.map((stat, index) => (
          <motion.div 
            key={index} 
            className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-white/20"
            variants={itemVariants}
          >
            <div>
              <div className="flex justify-between items-start">
                <h3 className="text-gray-600 font-medium">{stat.title}</h3>
                <stat.icon className="text-blue-500" size={24} />
              </div>
              <p className="text-5xl font-bold text-gray-800 mt-2">{stat.value}</p>
            </div>
            <div className="flex items-center text-sm mt-4">
              <span className={`flex items-center font-semibold ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                <ArrowUpRight size={16} className="mr-1" />
                {stat.change}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/20" variants={itemVariants}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Recent Consultations</h2>
          <button className="text-blue-600 font-semibold hover:underline">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="p-4 font-semibold text-gray-600 rounded-tl-lg">Patient Name/ID</th>
                <th className="p-4 font-semibold text-gray-600">Date</th>
                <th className="p-4 font-semibold text-gray-600">Outcome Summary</th>
                <th className="p-4 font-semibold text-gray-600 rounded-tr-lg"></th>
              </tr>
            </thead>
            <tbody>
              {recentConsultations.map((item, index) => (
                <motion.tr 
                  key={item.id} 
                  className="border-b border-gray-200/50 hover:bg-gray-100/50 transition-colors duration-200"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <td className="p-4 font-medium text-gray-900">{item.name} ({item.id})</td>
                  <td className="p-4 text-gray-600">{item.date}</td>
                  <td className="p-4 text-gray-800">{item.outcome}</td>
                  <td className="p-4 text-right">
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="text-blue-600 hover:text-blue-800 font-semibold">Details</motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
