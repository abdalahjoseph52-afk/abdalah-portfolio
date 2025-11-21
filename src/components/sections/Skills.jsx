import React from 'react';
import { Code2, Database, Layout, TrendingUp, Calculator, Users, Brain, MessageSquare } from 'lucide-react';

const Skills = () => {
  
  // We organize data here to keep the HTML clean
  const skillCategories = [
    {
      title: "Technical Architecture",
      icon: <Code2 className="w-8 h-8 text-blue-600" />,
      description: "Building scalable, secure, and high-performance applications.",
      skills: ["React.js & Next.js", "Tailwind CSS", "Node.js & Express", "PostgreSQL / Firebase"],
      bg: "bg-blue-50/50",
      border: "border-blue-100"
    },
    {
      title: "Business & Finance",
      icon: <TrendingUp className="w-8 h-8 text-yellow-600" />, // Yellow for Money/Gold
      description: "Ensuring digital solutions align with profitability and operational efficiency.",
      skills: ["Financial Analysis", "Business Administration", "Strategic Planning", "Data Visualization"],
      bg: "bg-yellow-50/50",
      border: "border-yellow-100"
    },
    {
      title: "Psychology & Leadership",
      icon: <Brain className="w-8 h-8 text-slate-600" />,
      description: "Designing user experiences that connect on a human emotional level.",
      skills: ["Emotional Intelligence", "User Psychology (UX)", "Team Leadership", "Conflict Resolution"],
      bg: "bg-slate-50",
      border: "border-slate-200"
    }
  ];

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            More than just code.
          </h2>
          <p className="text-lg text-slate-600">
            I bring a unique combination of technical power, financial logic, and human understanding to every project.
          </p>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div 
              key={index} 
              className={`p-8 rounded-2xl border ${category.border} ${category.bg} hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group`}
            >
              <div className="mb-6 p-3 bg-white rounded-xl inline-block shadow-sm group-hover:scale-110 transition-transform">
                {category.icon}
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {category.title}
              </h3>
              
              <p className="text-slate-600 mb-6 leading-relaxed">
                {category.description}
              </p>
              
              <div className="space-y-2">
                {category.skills.map((skill, i) => (
                  <div key={i} className="flex items-center text-sm font-medium text-slate-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
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