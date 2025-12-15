import React from 'react';
import { userData } from '../../data/userData';
import { Reveal } from '../utils/Reveal';

const LogoCloud = () => {
  return (
    <section className="py-10 border-b border-slate-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">
            Trusted by innovative teams
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {userData.clients.map((client, index) => (
              <div key={index} className="flex items-center gap-2 group">
                {/* Ideally, use real SVG logos here. 
                   For now, we use a text placeholder if logo is generic 
                */}
                <div className="h-8 w-8 bg-slate-200 rounded-full group-hover:bg-blue-100 transition-colors"></div>
                <span className="text-lg font-bold text-slate-600 group-hover:text-slate-900">{client.name}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default LogoCloud;