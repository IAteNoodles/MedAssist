import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { Paperclip, Mic, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { agentChat, agentChatJson, healthCheck, getApiBase } from '../lib/api';

const Consultation = () => {
  const [messages, setMessages] = useState([
    { from: 'agent', text: 'Hi, I\'m your MedAssist agent. Share patient data or ask a risk prediction question.' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const [healthy, setHealthy] = useState(null); // null=unknown,true/false
  const [sending, setSending] = useState(false);
  const [showParamForm, setShowParamForm] = useState(false);
  const [paramValues, setParamValues] = useState({});

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Ping backend health on mount and every 30s
  useEffect(() => {
    let mounted = true;
    const ping = async () => {
      try {
        const res = await healthCheck();
        if (mounted) setHealthy(res?.status === 'ok');
      } catch {
        if (mounted) setHealthy(false);
      }
    };
    ping();
    const id = setInterval(ping, 30000);
    return () => { mounted = false; clearInterval(id); };
  }, []);

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

  const uiToHistory = useMemo(() => (msgs) => msgs
    .filter(m => m.from === 'user' || m.from === 'agent')
    .map(m => ({ role: m.from === 'user' ? 'user' : 'assistant', content: m.text })), []);

  const lastAgentMeta = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      const m = messages[i];
      if (m.from === 'agent' && m.meta) return m.meta;
    }
    return null;
  }, [messages]);

  const missingParams = lastAgentMeta?.required_params && lastAgentMeta.required_params.length > 0
    ? lastAgentMeta.required_params
    : [];

  useEffect(() => {
    if (missingParams.length > 0) {
      // Prefill from extracted data if provided
      const pre = lastAgentMeta?.extracted_data || {};
      setParamValues(prev => ({ ...pre, ...prev }));
      setShowParamForm(true);
    } else {
      setShowParamForm(false);
    }
  }, [missingParams, lastAgentMeta]);

  const compilePatientMessageFromParams = (vals) => {
    const parts = [];
    // Helpers
    const norm = (k) => (typeof k === 'string' ? k.toLowerCase() : k);
    const get = (k) => vals[k] ?? vals[norm(k)] ?? '';
    const pushIf = (label, value) => {
      if (value !== undefined && value !== null && String(value).trim() !== '') parts.push(`${label} ${value}`);
    };
    const sex = get('sex') || get('gender');
    const age = get('age');
    const bmi = get('bmi');
  const hba1c = get('HbA1c_level') || get('hba1c') || get('hba1c_level');
  const glucose = get('blood_glucose_level') || get('glucose');
    const hypertension = get('hypertension');
  const heartDisease = get('heart_disease') ?? get('heartdisease');
  const smoking = get('smoking_history') ?? get('smokinghistory');

    if (sex) parts.push(String(sex));
    if (age) parts.push(`${age}`);
    pushIf('bmi', bmi);
  if (hba1c) parts.push(`HbA1c_level ${hba1c}`);
  if (glucose) parts.push(`blood_glucose_level ${glucose}`);
    if (hypertension !== '' && hypertension !== undefined) parts.push(`hypertension ${hypertension}`);
    if (heartDisease !== '' && heartDisease !== undefined) parts.push(`heart disease ${heartDisease}`);
    if (smoking) parts.push(`smoking history ${smoking}`);

    // Include any additional missing params as free-form k=v
  const known = new Set(['sex','gender','age','bmi','hba1c','hba1c_level','HbA1c_level','glucose','blood_glucose_level','hypertension','heart_disease','heartdisease','smoking_history','smokinghistory']);
    Object.entries(vals).forEach(([k, v]) => {
      if (!known.has(norm(k)) && v !== undefined && v !== null && String(v).trim() !== '') {
        parts.push(`${k} ${v}`);
      }
    });

    const patientStr = parts.join(', ');
    const intent = (lastAgentMeta?.intent || '').toLowerCase();
    if (intent.includes('diabetes')) {
      return `Predict diabetes risk: ${patientStr}`;
    }
    if (intent.includes('hypertension')) {
      return `Predict hypertension risk: ${patientStr}`;
    }
    // Fallback
    return `Predict risk: ${patientStr}`;
  };

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || sending) return;
    const userMsg = { from: 'user', text: trimmed };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setSending(true);
    try {
      // Try plain text per server contract
      let res;
      try {
        res = await agentChat(trimmed);
      } catch (err) {
        // Fallback to JSON endpoint with history
        const history = uiToHistory(messages);
        res = await agentChatJson({ message: trimmed, history });
      }
      const assistantText = res?.reply || 'No reply.';
      setMessages(prev => [
        ...prev,
        { from: 'agent', text: assistantText, meta: { intent: res?.intent, required_params: res?.required_params, extracted_data: res?.extracted_data, model_result: res?.model_result } }
      ]);
    } catch (err) {
      setMessages(prev => [...prev, { from: 'agent', text: `Error: ${err.message}. Check server at ${getApiBase()}.` }]);
    } finally {
      setSending(false);
    }
  };

  const handleSubmitParams = async (e) => {
    e?.preventDefault?.();
    if (sending) return;
    const message = compilePatientMessageFromParams(paramValues);
    const userMsg = { from: 'user', text: message };
    setMessages(prev => [...prev, userMsg]);
    setSending(true);
    try {
      let res;
      try {
        res = await agentChat(message);
      } catch (err) {
        const history = uiToHistory(messages);
        res = await agentChatJson({ message, history });
      }
      const assistantText = res?.reply || 'No reply.';
      setMessages(prev => [
        ...prev,
        { from: 'agent', text: assistantText, meta: { intent: res?.intent, required_params: res?.required_params, extracted_data: res?.extracted_data, model_result: res?.model_result } }
      ]);
      setShowParamForm(false);
    } catch (err) {
      setMessages(prev => [...prev, { from: 'agent', text: `Error: ${err.message}. Check server at ${getApiBase()}.` }]);
    } finally {
      setSending(false);
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
            {healthy === null ? (
              <span className="text-sm text-gray-500">Checking server…</span>
            ) : healthy ? (
              <span className="text-sm text-green-600 flex items-center">
                <span className="relative flex h-3 w-3 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                Connected
              </span>
            ) : (
              <span className="text-sm text-red-600 flex items-center">
                <span className="relative flex h-3 w-3 mr-2">
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                Server offline
              </span>
            )}
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
                  {msg.from === 'agent' && msg.meta && (
                    <div className="mt-2 text-xs text-gray-600 space-y-2">
                      {Array.isArray(msg.meta?.required_params) && msg.meta.required_params.length > 0 && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-2">
                          <div className="font-medium text-yellow-800">Missing info needed:</div>
                          <div className="mt-1 flex flex-wrap gap-2">
                            {msg.meta.required_params.map((p) => (
                              <span key={p} className="px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full">{p}</span>
                            ))}
                          </div>
                          <button onClick={() => setShowParamForm(true)} className="mt-2 text-blue-600 hover:underline">Provide now</button>
                        </div>
                      )}
                      {msg.meta?.intent && (
                        <div>Intent: <span className="font-mono">{msg.meta.intent}</span></div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </main>
      <footer className="bg-white/70 backdrop-blur-lg p-4 border-t border-white/30 sticky bottom-0 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)]">
        <div className="container mx-auto">
            {showParamForm && missingParams.length > 0 && (
              <form onSubmit={handleSubmitParams} className="mb-3 bg-white/80 border border-gray-200 rounded-lg p-3">
                <div className="text-sm font-medium text-gray-700 mb-2">Provide details</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {missingParams.map((name) => {
                    const key = String(name);
                    const lower = key.toLowerCase();
                    const val = paramValues[key] ?? paramValues[lower] ?? '';
                    if (lower === 'sex' || lower === 'gender') {
                      return (
                        <label key={key} className="text-sm text-gray-700">
                          Sex
                          <select className="mt-1 w-full border rounded px-2 py-1" value={val}
                            onChange={(e) => setParamValues(v => ({ ...v, [key]: e.target.value }))}>
                            <option value="">Select</option>
                            <option value="male">male</option>
                            <option value="female">female</option>
                          </select>
                        </label>
                      );
                    }
                    if (lower === 'age' || lower === 'bmi' || lower === 'hba1c' || lower === 'glucose') {
                      const label = lower.toUpperCase();
                      return (
                        <label key={key} className="text-sm text-gray-700">
                          {label}
                          <input type="number" step="any" className="mt-1 w-full border rounded px-2 py-1" value={val}
                            onChange={(e) => setParamValues(v => ({ ...v, [key]: e.target.value }))} />
                        </label>
                      );
                    }
                    if (lower === 'hypertension' || lower === 'heart_disease') {
                      return (
                        <label key={key} className="text-sm text-gray-700">
                          {lower.replace('_',' ')} (0/1)
                          <select className="mt-1 w-full border rounded px-2 py-1" value={val}
                            onChange={(e) => setParamValues(v => ({ ...v, [key]: e.target.value }))}>
                            <option value="">Select</option>
                            <option value="1">1</option>
                            <option value="0">0</option>
                          </select>
                        </label>
                      );
                    }
                    if (lower === 'smoking_history') {
                      return (
                        <label key={key} className="text-sm text-gray-700">
                          Smoking history
                          <select className="mt-1 w-full border rounded px-2 py-1" value={val}
                            onChange={(e) => setParamValues(v => ({ ...v, [key]: e.target.value }))}>
                            <option value="">Select</option>
                            <option value="never">never</option>
                            <option value="former">former</option>
                            <option value="current">current</option>
                          </select>
                        </label>
                      );
                    }
                    return (
                      <label key={key} className="text-sm text-gray-700">
                        {key}
                        <input className="mt-1 w-full border rounded px-2 py-1" value={val}
                          onChange={(e) => setParamValues(v => ({ ...v, [key]: e.target.value }))} />
                      </label>
                    );
                  })}
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <button type="submit" disabled={sending} className="bg-blue-600 text-white text-sm px-3 py-1.5 rounded hover:bg-blue-700 disabled:bg-blue-300">Submit details</button>
                  <button type="button" onClick={() => setShowParamForm(false)} className="text-sm text-gray-600 hover:underline">Cancel</button>
                </div>
              </form>
            )}
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
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="e.g., Predict diabetes risk for 45yo male, bmi 28, hba1c 6.1, glucose 130, hypertension 1, heart disease 0, smoking history former"
                className="flex-1 mx-2 p-2 bg-transparent focus:outline-none"
              />
              <motion.button 
                onClick={handleSend}
                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center disabled:bg-blue-300"
                disabled={!input.trim() || sending}
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
