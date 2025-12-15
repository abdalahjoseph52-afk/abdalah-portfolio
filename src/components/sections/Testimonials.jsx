import React from 'react';
import { Quote } from 'lucide-react';
import { userData } from '../../data/userData';
import { Reveal } from '../utils/Reveal';

const Testimonials = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">What Partners Say</h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {userData.testimonials.map((item, index) => (
            <Reveal key={index} width="100%">
              <div className="bg-slate-50 p-10 rounded-3xl relative border border-slate-100 hover:border-blue-100 transition-colors">
                <Quote className="text-blue-200 w-12 h-12 absolute top-8 left-8" />
                <p className="text-slate-700 text-lg font-medium relative z-10 leading-relaxed italic mb-6 pt-6">
                  "{item.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {item.author.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900">{item.author}</h5>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">{item.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;