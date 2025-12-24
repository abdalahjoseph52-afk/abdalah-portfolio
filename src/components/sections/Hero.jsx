import React from 'react';
import { ArrowRight, Download } from 'lucide-react';
import { userData } from '../../data/userData'; // 👈 Tunavuta data moja kwa moja hapa
import { Reveal } from '../utils/Reveal';

const Hero = () => {
  // Tunatumia data za kwenye file tu, hatutaki za Database zinazotuchanganya
  const { name, role, tagline, profileImage } = userData;

  return (
    <section className="min-h-[90vh] flex items-center justify-center bg-slate-50 relative overflow-hidden pt-20">
      
      {/* Background decoration */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-100 rounded-full blur-3xl opacity-50 -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">
          
          {/* Left Side: Text */}
          <div className="flex-1 text-center lg:text-left space-y-8">
            <Reveal>
              <div className="inline-block px-4 py-2 bg-blue-50 border border-blue-100 rounded-full">
                <span className="text-blue-600 font-bold text-sm tracking-wide uppercase">
                  Available for Hire
                </span>
              </div>
            </Reveal>

            <Reveal>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
                Hi, I'm <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {name}
                </span>
              </h1>
            </Reveal>

            <Reveal>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                <span className="font-bold text-slate-900">{role}</span>. <br/>
                {tagline}
              </p>
            </Reveal>

            <Reveal>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a 
                  href="/contact" 
                  className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 flex items-center gap-2"
                >
                  Let's Talk <ArrowRight size={20} />
                </a>
                
                <a 
                  href="/cv.pdf" 
                  download 
                  className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-full font-bold text-lg hover:border-slate-400 transition-all flex items-center gap-2"
                >
                  Download CV <Download size={20} />
                </a>
              </div>
            </Reveal>

            <Reveal>
              <div className="pt-8 flex items-center justify-center lg:justify-start gap-6 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                {userData.clients && userData.clients.map((client, i) => (
                   <img key={i} src={client.logo} alt={client.name} className="h-8 object-contain" />
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right Side: Image */}
          <div className="flex-1 relative">
             <Reveal>
              <div className="relative w-72 h-72 sm:w-96 sm:h-96 mx-auto lg:mx-0">
                {/* Decoration Circles */}
                <div className="absolute inset-0 border-2 border-dashed border-blue-200 rounded-full animate-[spin_10s_linear_infinite]"></div>
                
                {/* Profile Image Container */}
                <div className="absolute inset-4 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-slate-200">
                   <img 
                     src={profileImage} 
                     alt={name} 
                     className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                   />
                </div>

                {/* Floating Badge */}
                <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase">Experience</p>
                    <p className="text-lg font-bold text-slate-900">3+ Years</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;