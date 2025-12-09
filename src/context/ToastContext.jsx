import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

const ToastContext = createContext();
export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(p => [...p, { id, message, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ success: (m) => addToast(m, 'success'), error: (m) => addToast(m, 'error') }}>
      {children}
      <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2">
        {toasts.map(t => (
          <div key={t.id} className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border-l-4 bg-white animate-in slide-in-from-right ${t.type === 'success' ? 'border-green-500' : 'border-red-500'}`}>
            {t.type === 'success' ? <CheckCircle size={20} className="text-green-500"/> : <AlertCircle size={20} className="text-red-500"/>}
            <p className="text-sm font-bold text-slate-800">{t.message}</p>
            <button onClick={() => setToasts(p => p.filter(x => x.id !== t.id))}><X size={14} className="text-slate-400"/></button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};