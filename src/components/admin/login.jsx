// src/components/admin/Login.jsx
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { Loader2, Lock } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { error } = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      error("Login Failed. Check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-200">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-blue-50 rounded-full">
            <Lock className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center mb-2 text-slate-900">Admin Access</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1 uppercase">Email</label>
            <input 
              type="email" 
              className="w-full p-3 border border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1 uppercase">Password</label>
            <input 
              type="password" 
              className="w-full p-3 border border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required
            />
          </div>
          <button 
            disabled={loading} 
            className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors flex justify-center items-center gap-2 mt-4"
          >
            {loading ? <Loader2 className="animate-spin" size={20}/> : 'Access Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;