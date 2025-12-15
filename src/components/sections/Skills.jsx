import React from 'react';
import { Code2, TrendingUp, Brain, Megaphone, Smartphone, Globe, ShieldCheck, Zap } from 'lucide-react';
import { Reveal } from '../utils/Reveal';

const Skills = () => {
  // UNIFIED PROFESSIONAL STYLE
  // All icons will use the same class in the render loop below.
  const services = [
    {
      title: "Profit-Driven Code",
      icon: <TrendingUp className="w-6 h-6" />, // Color is applied in the loop
      desc: "I don't just write software. I build financial engines that track, report, and optimize your revenue automatically."
    },
    {
      title: "Enterprise Security",
      icon: <ShieldCheck className="w-6 h-6" />,
      desc: "Bank-grade data protection. Your users' data is safe, building the trust required for high-ticket sales."
    },
    {
      title: "High-Speed Web",
      icon: <Zap className="w-6 h-6" />,
      desc: "Slow sites lose customers. My architectures load instantly, boosting your Google ranking and conversion rates."
    },
    {
      title: "Mobile Domination",
      icon: <Smartphone className="w-6 h-6" />,
      desc: "Your customers are on their phones. I build responsive experiences that feel like native apps."
    },
    {
      title: "Psychological UX",
      icon: <Brain className="w-6 h-6" />,
      desc: "Design that speaks to the subconscious. I structure user flows to reduce friction and increase 'Buy Now' clicks."
    },
    {
      title: "SEO & Visibility",
      icon: <Globe className="w-6 h-6" />,
      desc: "What good is a website if no one sees it? I bake SEO strategy into the code foundation from day one."
    }
  ];

  return (
    <section id="skills" className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal>
            <h2 className="text-blue-600 font-bold tracking-widest uppercase text-xs md:text-sm mb-3">
              Why Leaders Choose Me
            </h2>
            <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              Stop Building "Just a Website." <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Start Building an Asset.
              </span>
            </h3>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed">
              Most developers just type code. I combine <span className="font-bold text-slate-900">Financial Logic</span> with <span className="font-bold text-slate-900">Technical Mastery</span> to solve your actual business problems.
            </p>
          </Reveal>
        </div>

        {/* 📱 Mobile: 2 Columns | 💻 Desktop: 3 Columns */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {services.map((service, index) => (
            <Reveal key={index} width="100%">
              <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col group">
                
                {/* ✅ UNIFORM ICON STYLE 
                   We use 'text-blue-600' for the icon and 'bg-white' for the box.
                   This creates a very clean, mono-colored corporate look.
                */}
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-xl border border-slate-100 flex items-center justify-center mb-5 md:mb-6 shadow-sm group-hover:border-blue-100 group-hover:scale-105 transition-all text-blue-600">
                  {service.icon}
                </div>

                {/* Title */}
                <h4 className="text-sm md:text-lg font-bold text-slate-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h4>

                {/* Description */}
                <p className="text-slate-500 text-[11px] md:text-sm leading-relaxed">
                  {service.desc}
                </p>

              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom Trust Signal */}
        <Reveal>
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs md:text-sm font-medium text-slate-600">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
              Currently powering systems for <span className="font-bold text-slate-900">TUCASA</span>, <span className="font-bold text-slate-900">RedInk</span>, and <span className="font-bold text-slate-900">PropertyPro</span>.
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
};

export default Skills;