import React from 'react';
import { ArrowRight, Github, Linkedin, Mail, TrendingUp, Brain, Code2 } from 'lucide-react';
import profileImg from '../../assets/profile.jpg'; // Import the image

const Hero = () => {
  return (
    <section id="about" className="pt-32 pb-16 md:pt-48 md:pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* LEFT: The Hybrid Identity */}
        <div className="flex-1 text-center md:text-left space-y-6">
          
          {/* The "Badge" */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mx-auto md:mx-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Open for Tech & Business Roles
          </div>

          {/* The Headline: Merging Tech + Business */}
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight">
            Merging <span className="text-blue-600">Technical Logic</span> <br/>
            with <span className="text-yellow-500">Business Strategy.</span>
          </h1>

          {/* The Pitch: Explaining the Trio */}
          <p className="text-lg text-slate-600 max-w-2xl mx-auto md:mx-0 leading-relaxed">
            I am not just a Developer. With a background in <strong>Accounting & Finance</strong> and <strong>Psychology</strong>, I build digital systems that are profitable, scalable, and human-centric.
          </p>

          {/* Skill Pills (Visualizing the Hybrid) */}
          <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
            <span className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg text-sm font-medium text-slate-700">
              <Code2 size={16} className="text-blue-500"/> Full Stack Dev
            </span>
            <span className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg text-sm font-medium text-slate-700">
              <TrendingUp size={16} className="text-green-500"/> Finance & Admin
            </span>
            <span className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg text-sm font-medium text-slate-700">
              <Brain size={16} className="text-purple-500"/> EQ & Psychology
            </span>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start pt-4">
            <a href="#projects" className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-all hover:shadow-lg">
              View My Projects
            </a>
            <a href="#contact" className="text-slate-600 hover:text-blue-600 font-medium px-4">
              Contact Me
            </a>
          </div>
        </div>

        {/* RIGHT: The Image */}
        <div className="flex-1 w-full max-w-lg relative flex justify-center md:justify-end">
          {/* Background Blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-8 left-10 w-64 h-64 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          
          {/* Profile Image Container */}
          <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-white rotate-3 hover:rotate-0 transition-transform duration-500">
            <img 
              src={profileImg} 
              alt="Abdalah Wambura" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;