import React, { useState, useEffect } from 'react';
import { ArrowRight, Code2, TrendingUp, Brain } from 'lucide-react';
import { userData } from '../../data/userData';
import { db } from '../../lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const Hero = () => {
  // Local state for dynamic data
  const [heroData, setHeroData] = useState({
    profileImage: userData.profileImage, // Default from file
    title: "", 
    subtitle: ""
  });

  // Listen to Firebase updates
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "settings", "general"), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setHeroData(prev => ({
          ...prev,
          profileImage: data.profileImage || prev.profileImage, // Prioritize Firebase image
          title: data.heroTitle,
          subtitle: data.heroSubtitle
        }));
      }
    });
    return unsub;
  }, []);

  return (
    <section id="about" className="pt-32 pb-16 md:pt-48 md:pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        
        <div className="flex-1 text-center md:text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mx-auto md:mx-0">
            <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span></span> Open for Tech & Business Roles
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
            Merging <span className="text-blue-600">Technical Logic</span> <br/>
            with <span className="text-yellow-500">Business Strategy.</span>
          </h1>

          <p className="text-lg text-slate-600 max-w-2xl mx-auto md:mx-0 leading-relaxed">
            {userData.about.desc}
          </p>

          <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
            <span className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg text-sm font-medium text-slate-700"><Code2 size={16} className="text-blue-500"/> Full Stack Dev</span>
            <span className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg text-sm font-medium text-slate-700"><TrendingUp size={16} className="text-green-500"/> Finance & Admin</span>
            <span className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg text-sm font-medium text-slate-700"><Brain size={16} className="text-purple-500"/> EQ & Psychology</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start pt-4">
            <a href="#projects" className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-all hover:shadow-lg w-full sm:w-auto text-center">View My Projects</a>
            <a href="#contact" className="text-slate-600 hover:text-blue-600 font-medium px-4 py-2 w-full sm:w-auto text-center">Contact Me</a>
          </div>
        </div>

        {/* Dynamic Image */}
        <div className="flex-1 w-full max-w-lg relative flex justify-center md:justify-end">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-8 left-10 w-64 h-64 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full md:rounded-2xl overflow-hidden shadow-2xl border-4 border-white rotate-0 md:rotate-3 md:hover:rotate-0 transition-transform duration-500 bg-slate-200">
            <img 
              src={heroData.profileImage} 
              alt={userData.name} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;