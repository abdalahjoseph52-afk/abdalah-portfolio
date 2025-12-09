import React from 'react';
import { Code2, TrendingUp, Brain, Megaphone } from 'lucide-react';

const Skills = () => {
  
  const skillCategories = [
    {
      title: "Technical Architecture",
      icon: <Code2 className="w-6 h-6 text-blue-600" />,
      description: "Building scalable, secure, and high-performance digital architectures.",
      skills: [
        "Full Stack (React & Node)", 
        "Database Design (Firebase)", 
        "API Integration & Security", 
        "System Optimization"
      ],
      // Blue Theme
      bg: "bg-blue-50/50", 
      border: "border-blue-100",
      dot: "bg-blue-600"
    },
    {
      title: "Finance & Strategy",
      icon: <TrendingUp className="w-6 h-6 text-yellow-600" />,
      description: "Ensuring every line of code contributes directly to business profitability.",
      skills: [
        "Financial Modeling", 
        "Business Logic Implementation", 
        "Automated Reporting", 
        "Cost-Benefit Analysis"
      ],
      // Yellow Theme
      bg: "bg-yellow-50/50", 
      border: "border-yellow-100",
      dot: "bg-yellow-600"
    },
    {
      title: "Digital Marketing",
      icon: <Megaphone className="w-6 h-6 text-slate-700" />,
      description: "Amplifying brand visibility through data-driven content and SEO strategies.",
      skills: [
        "SEO & Search Ranking", 
        "Content Strategy", 
        "Social Media Growth", 
        "Brand Positioning"
      ],
      // Slate Theme (Professional)
      bg: "bg-slate-100", 
      border: "border-slate-200",
      dot: "bg-slate-600"
    },
    {
      title: "Psychology & Leadership",
      icon: <Brain className="w-6 h-6 text-slate-700" />,
      description: "Designing intuitive user experiences that connect on a human emotional level.",
      skills: [
        "UX Psychology", 
        "Team Leadership", 
        "Conflict Resolution", 
        "Public Speaking"
      ],
      // Slate Theme
      bg: "bg-slate-100", 
      border: "border-slate-200",
      dot: "bg-slate-600"
    }
  ];

  return (
    <section id="skills" className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            The Complete Package.
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            I bring a unique combination of <span className="font-bold text-blue-600">Technical Power</span>, <span className="font-bold text-yellow-600">Financial Logic</span>, and <span className="font-bold text-slate-700">Market Strategy</span> to every project.
          </p>
        </div>

        {/* Grid: 4 Columns Horizontal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {skillCategories.map((category, index) => (
            <div 
              key={index} 
              className={`p-5 rounded-2xl border ${category.border} ${category.bg} hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group flex flex-col h-full`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <div className={`w-1.5 h-1.5 rounded-full ${category.dot}`}></div>
              </div>
              
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {category.title}
              </h3>
              
              <p className="text-slate-600 mb-4 leading-relaxed text-xs opacity-90 min-h-[40px]">
                {category.description}
              </p>
              
              {/* Skills List - Compact & Professional */}
              <div className="space-y-2 bg-white/70 p-3 rounded-xl border border-slate-100/50 mt-auto">
                {category.skills.map((skill, i) => (
                  <div key={i} className="flex items-center text-slate-800 text-xs font-semibold">
                    <div className={`w-1 h-1 rounded-full mr-2 ${category.dot}`}></div>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;