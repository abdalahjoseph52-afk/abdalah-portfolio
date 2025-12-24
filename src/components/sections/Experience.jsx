import React from 'react';
import { Briefcase, Calendar } from 'lucide-react';
import { userData } from '../../data/userData';
import { Reveal } from '../utils/Reveal';

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Career History</h2>
            <p className="text-slate-600 mt-2">My professional journey and impact.</p>
          </div>
        </Reveal>

        <div className="max-w-4xl mx-auto space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
          {userData.experience.map((item, index) => (
            <Reveal key={index} width="100%">
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <Briefcase className="w-4 h-4 text-blue-600" />
                </div>
                
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between space-x-2 mb-2">
                    <div className="font-bold text-slate-900">{item.role}</div>
                    <time className="font-mono text-xs font-medium text-slate-500">{item.date}</time>
                  </div>
                  <div className="text-blue-600 text-xs font-bold uppercase tracking-wider mb-3">
                    {item.company}
                  </div>
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                    {item.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.tech.map((t, i) => (
                      <span key={i} className="px-2 py-1 bg-slate-50 text-slate-500 text-[10px] font-bold uppercase rounded border border-slate-100">
                        {t}
                      </span>
                    ))}
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

export default Experience;