import React, { useState } from 'react';
import { Paperclip, Mic } from 'lucide-react';

const Consultation = () => {
  const [messages, setMessages] = useState([
    { from: 'agent', text: 'Understood. Case for Sameer Ahmed created. Please upload the lab report PDF or image.' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { from: 'user', text: input }]);
      setInput('');
      // Here you would typically send the message to the backend API
      // and receive a response from the agent.
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">New Consultation</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-green-600 flex items-center">
            <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
            All Systems Online
          </span>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-lg px-4 py-2 rounded-lg ${msg.from === 'user' ? 'bg-blue-500 text-white' : 'bg-white shadow'}`}>
                <p>{msg.text}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer className="bg-white p-4 border-t">
        <div className="flex items-center">
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <Paperclip size={20} />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <Mic size={20} />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Start a new case for a patient..."
            className="flex-1 mx-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={handleSend} className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
            Send
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Consultation;
