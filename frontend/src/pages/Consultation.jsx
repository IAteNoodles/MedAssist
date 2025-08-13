import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { Paperclip, Mic, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Consultation = () => {
  const [messages, setMessages] = useState([
    { from: 'agent', text: 'Understood. Case for Sameer Ahmed created. Please upload the lab report PDF or image.' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      setMessages(prevMessages => [
        ...prevMessages,
        {
          from: 'user',
          text: `File uploaded: ${file.name}`,
        },
        {
            from: 'agent',
            text: 'Thank you. The lab report has been attached to Sameer Ahmed\'s case. Is there anything else?'
        }
      ]);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true
  });

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { from: 'user', text: input }]);
      setInput('');
      // Here you would typically send the message to the backend API
      // and receive a response from the agent.
    }
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div {...getRootProps()} className={`flex flex-col h-screen bg-gradient-to-br from-gray-100 to-gray-200 ${isDragActive ? 'border-2 border-dashed border-blue-500 bg-blue-50' : ''}`}>
      <input {...getInputProps()} />
      <header className="sticky top-0 bg-white/70 backdrop-blur-lg shadow-md z-10 border-b border-white/30">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">New Consultation</h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-green-600 flex items-center">
              <span className="relative flex h-3 w-3 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              All Systems Online
            </span>
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto p-6">
        {isDragActive && (
          <div className="absolute inset-0 bg-blue-500 bg-opacity-10 flex items-center justify-center z-20">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-2xl font-bold text-blue-600">
              Drop files anywhere to upload
            </motion.div>
          </div>
        )}
        <div className="space-y-6 container mx-auto">
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div 
                key={index} 
                className={`flex items-end gap-3 ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                variants={messageVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: 0.3, ease: 'easeOut' }}
                layout
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
              >
                {msg.from === 'agent' && <img src="https://cdn.prod.website-files.com/67469be284b048fa58eda575/6746d4199bb662466d5e5744_logo.svg" alt="Agent" className="h-8 w-8 rounded-full mb-2"/>}
                <div className={`max-w-xl px-5 py-3 rounded-2xl shadow-lg ${msg.from === 'user' ? 'bg-blue-500/90 backdrop-blur-md text-white rounded-br-none' : 'bg-white/80 backdrop-blur-md text-gray-700 border border-gray-200/50 rounded-bl-none'}`}>
                  <p className="leading-relaxed">{msg.text}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </main>
      <footer className="bg-white/70 backdrop-blur-lg p-4 border-t border-white/30 sticky bottom-0 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)]">
        <div className="container mx-auto">
            <div className="flex items-center bg-white/50 shadow-inner rounded-lg p-2">
              <button onClick={open} className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200/50 rounded-full transition-colors">
                <Paperclip size={20} />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200/50 rounded-full transition-colors">
                <Mic size={20} />
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Start a new case for a patient..."
                className="flex-1 mx-2 p-2 bg-transparent focus:outline-none"
              />
              <motion.button 
                onClick={handleSend} 
                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center disabled:bg-blue-300"
                disabled={!input.trim()}
                whileTap={{ scale: 0.95 }}
              >
                <Send size={18} />
              </motion.button>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default Consultation;
