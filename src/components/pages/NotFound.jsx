import React from 'react';
import { Home, ArrowLeft, AlertTriangle } from 'lucide-react';

const NotFound = () => {
  return (
    // "style={{ zIndex: 9999 }}" inahakikisha ukurasa huu unakuwa juu kabisa ya Navbar
    <div 
      className="fixed inset-0 bg-slate-50 flex flex-col items-center justify-center px-4 text-center"
      style={{ zIndex: 9999 }}
    >
      
      <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6 animate-bounce">
        <AlertTriangle className="text-red-500 w-10 h-10" />
      </div>
      
      <h1 className="text-6xl font-extrabold text-slate-900 mb-2">404</h1>
      <h2 className="text-2xl font-bold text-slate-700 mb-4">Page Not Found</h2>
      <p className="text-slate-500 mb-8 max-w-md">
        Samahani, ukurasa huu haupatikani au umeshafutwa.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 relative z-50">
        {/* Hii inatumia window.history kurudi nyuma */}
        <button 
          onClick={() => window.history.back()} 
          className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-full font-bold hover:bg-slate-100 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <ArrowLeft size={18} /> Rudi Nyuma
        </button>

        {/* Hii inalazimisha browser kurefresh na kwenda Home */}
        <a 
          href="/" 
          className="px-8 py-3 bg-slate-900 text-white rounded-full font-bold hover:bg-blue-600 transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
        >
          <Home size={18} /> Rudi Nyumbani
        </a>
      </div>

    </div>
  );
};

export default NotFound;