import React, { useState } from 'react';
import { ExternalLink, ArrowRight, Folder } from 'lucide-react';
import { userData } from '../../data/userData';
import { Reveal } from '../utils/Reveal';

const Projects = () => {
  const { projects } = userData;
  // Simple category filter
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...new Set(projects.map(p => p.category))];
  const filteredProjects = projects.filter(p => filter === 'All' || p.category === filter);

  return (
    <section className="py-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
              Featured Work
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Real-world systems delivering business value. <br/>
              Explore the live applications below.
            </p>
          </Reveal>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                filter === cat 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Reveal key={index} width="100%">
              <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                
                {/* Image */}
                <div className="h-56 bg-slate-100 relative overflow-hidden">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                      <Folder size={48} />
                    </div>
                  )}
                  {/* Status Badge */}
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold border ${project.statusColor} bg-white shadow-sm`}>
                    {project.status}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex-1 flex flex-col">
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
                    {project.category}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 mb-6 line-clamp-3 text-sm leading-relaxed flex-1">
                    {project.description}
                  </p>

                  {/* Tech Stack Bubbles */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-slate-50 text-slate-500 text-xs font-medium rounded border border-slate-100">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Single Action Button (Live Demo Only) */}
                  <div className="mt-auto">
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-200"
                    >
                      <ExternalLink size={18} /> View Live System
                    </a>
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

export default Projects;