import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';

const Dashboard = () => {
  const recentConsultations = [
    { id: 'P001', name: 'Sameer Ahmed', date: '2025-08-12', outcome: 'Differential: Suspected Pneumonia' },
    { id: 'P002', name: 'Jane Doe', date: '2025-08-11', outcome: 'Follow-up scheduled' },
    { id: 'P003', name: 'John Smith', date: '2025-08-11', outcome: 'Awaiting lab results' },
    { id: 'P004', name: 'Anjali Sharma', date: '2025-08-10', outcome: 'Cleared for discharge' },
    { id: 'P005', name: 'Robert Brown', date: '2025-08-09', outcome: 'Referred to cardiology' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Good afternoon, Dr. Avasthi.</h1>
          <p className="text-gray-500">Welcome back to your diagnostic assistant.</p>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/consultation" className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Plus size={20} className="mr-2" />
            Start New Consultation
          </Link>
          <button className="bg-white border border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors">
            Review Past Consultations
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-4">Patient Name/ID</th>
                <th className="p-4">Date</th>
                <th className="p-4">Outcome Summary</th>
              </tr>
            </thead>
            <tbody>
              {recentConsultations.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-900">{item.name} ({item.id})</td>
                  <td className="p-4 text-gray-600">{item.date}</td>
                  <td className="p-4 text-gray-800">{item.outcome}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
