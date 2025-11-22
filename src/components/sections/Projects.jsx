import React from 'react';
import { ExternalLink, Github, Folder, ArrowRight } from 'lucide-react';
import { userData } from '../../data/userData'; // <--- CONNECT TO BRAIN

const Projects = () => {
  // Pull projects from the central data file
  const { projects } = userData; 

  return (
    <section id="projects" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Featured Work</h2>
            <p className="text-lg text-slate-600 max-w-xl">
              Scalable systems designed with business logic first, code second.
            </p>
          </div>
          <a href={userData.socials.github} target="_blank" rel="noreferrer" className="hidden md:flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors">
            View Github <ArrowRight size={16} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
              <div className="h-48 bg-slate-100 relative overflow-hidden group-hover:bg-slate-200 transition-colors">
                {project.image ? (
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-slate-300"><Folder size={48} /></div>
                )}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold border ${project.statusColor} bg-white shadow-sm z-10`}>{project.status}</div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="text-xs font-bold text-blue-600 mb-2 uppercase tracking-wide">{project.category}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{project.title}</h3>
                <p className="text-slate-600 mb-6 flex-1 leading-relaxed text-sm">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-md">{tech}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium"><Github size={18} /> Code</a>
                  <a href={project.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors text-sm font-medium"><ExternalLink size={18} /> Live Demo</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;