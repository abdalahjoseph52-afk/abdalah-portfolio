import React, { useState, useEffect } from 'react';
import { ArrowRight, Download, Linkedin, Github } from 'lucide-react';
import { userData } from '../../data/userData';
import { db } from '../../lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { Reveal } from '../utils/Reveal';

const Hero = () => {
  const [heroData, setHeroData] = useState({
    profileImage: userData.profileImage,
    title: "", 
    subtitle: ""
  });

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "settings", "general"), (d) => {
      if (d.exists()) setHeroData(prev => ({ ...prev, ...d.data() }));
    });
    return unsub;
  }, []);

  return (
    <section id="home" className="relative pt-28 pb-16 md:pt-40 md:pb-32 overflow-hidden bg-white">
      
      {/* 1. Corporate Background (Subtle Grid Pattern) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-400 opacity-20 blur-[100px]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          
          {/* 2. Left: Professional Intro */}
          <div className="flex-1 text-center md:text-left order-2 md:order-1">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold mb-6 uppercase tracking-wider">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span> 
                Available for Projects
              </div>
            </Reveal>

            <Reveal>
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-4 tracking-tight">
                Building Digital <br className="hidden md:block"/>
                <span className="text-blue-600">Business Assets.</span>
              </h1>
            </Reveal>

            <Reveal>
              <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto md:mx-0 mb-8">
                {userData.about.desc} I combine financial logic with software architecture to build systems that drive revenue, not just code.
              </p>
            </Reveal>

            <Reveal>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start items-center">
                <a 
                  href="/contact" 
                  className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 text-white rounded-lg font-bold text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-200"
                >
                  Start a Project <ArrowRight size={16} />
                </a>
                
                {/* Secondary Actions (Social Proof) */}
                <div className="flex items-center gap-3 mt-4 sm:mt-0 sm:ml-4">
                  <a href={userData.socials.linkedin} target="_blank" rel="noreferrer" className="p-3 bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-blue-600 hover:border-blue-200 transition-all">
                    <Linkedin size={20} />
                  </a>
                  <a href={userData.socials.github} target="_blank" rel="noreferrer" className="p-3 bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-black hover:border-slate-400 transition-all">
                    <Github size={20} />
                  </a>
                  <a href="/cv.pdf" download className="px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-700 font-bold text-sm hover:bg-slate-50 transition-all flex items-center gap-2">
                    <Download size={16} /> CV
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* 3. Right: The "Logo Profile" (Fixed Sizing) */}
          <div className="flex-1 w-full flex justify-center md:justify-end order-1 md:order-2">
            <Reveal width="100%">
              <div className="relative">
                {/* MOBILE FIX: w-32 (128px) 
                   DESKTOP FIX: w-80 (320px)
                   This prevents the "Giant Image" look on phones.
                */}
                <div className="w-32 h-32 md:w-96 md:h-96 relative z-10 mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full md:rounded-[2rem] rotate-3 opacity-20 transform scale-105"></div>
                  <img 
                    src={heroData.profileImage} 
                    alt="Profile" 
                    className="w-full h-full object-cover rounded-full md:rounded-[2rem] border-4 border-white shadow-2xl shadow-blue-900/10"
                  />
                  
                  {/* Floating Badge (Only visible on Desktop to save mobile space) */}
                  <div className="hidden md:flex absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100 items-center gap-3 animate-bounce-slow">
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-bold">
                      5+
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Experience</p>
                      <p className="text-sm font-bold text-slate-900">Years Working</p>
                    </div>
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