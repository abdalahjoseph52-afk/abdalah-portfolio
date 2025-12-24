// src/components/pages/ProjectDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github, CheckCircle, Layers } from 'lucide-react';
import { userData } from '../../data/userData';
import { Reveal } from '../utils/Reveal';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    // Find the specific project by the ID in the URL
    const found = userData.projects.find(p => p.id === id);
    setProject(found);
    window.scrollTo(0, 0); // Scroll to top when page loads
  }, [id]);

  if (!project) return (
    <div className="h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900">Project Not Found</h2>
        <Link to="/projects" className="text-blue-600 font-bold mt-4 inline-block">Back to Portfolio</Link>
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      
      {/* Navigation Back */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/projects" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-8 font-bold text-sm transition-colors">
          <ArrowLeft size={16} /> Back to Projects
        </Link>
        
        {/* Title Section */}
        <Reveal>
          <span className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-2 block bg-blue-50 w-fit px-3 py-1 rounded-full">{project.category}</span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">{project.title}</h1>
        </Reveal>

        {/* Hero Image */}
        <Reveal>
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-100 mb-12 bg-slate-100 aspect-video">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          </div>
        </Reveal>

        {/* The Case Study Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* Main Content (Problem & Solution) */}
          <div className="md:col-span-2 space-y-10">
            <Reveal>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 border-l-4 border-red-500 pl-4">The Challenge</h3>
                <p className="text-slate-600 leading-relaxed text-lg">{project.problem}</p>
              </div>
            </Reveal>
            <Reveal>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 border-l-4 border-green-500 pl-4">The Solution</h3>
                <p className="text-slate-600 leading-relaxed text-lg">{project.solution}</p>
              </div>
            </Reveal>

            {/* Key Features List */}
            <Reveal>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                 <h3 className="text-lg font-bold text-slate-900 mb-4">Key Engineering Features</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   {project.features?.map((feature, i) => (
                     <div key={i} className="flex items-start gap-3">
                       <CheckCircle className="text-blue-600 shrink-0 mt-0.5" size={18} />
                       <span className="text-slate-700 font-medium text-sm">{feature}</span>
                     </div>
                   ))}
                 </div>
              </div>
            </Reveal>
          </div>

          {/* Sidebar (Tech Stack & Links) */}
          <div className="h-fit space-y-8">
            <Reveal width="100%">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-wider">Technologies Used</h4>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.techStack?.map((tech) => (
                    <span key={tech.name} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700">
                       <span>{tech.icon}</span> {tech.name}
                    </span>
                  ))}
                </div>
                
                <div className="space-y-3">
                  <a href={project.link} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full py-3.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 text-sm">
                    <ExternalLink size={18} /> Visit Live Site
                  </a>
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full py-3.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all text-sm">
                      <Github size={18} /> View Source Code
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* System Architecture Section (The "Senior" Differentiator) */}
        <Reveal>
          <div className="bg-[#0f172a] text-white rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Layers className="text-blue-400" /> System Architecture
              </h3>
              <p className="text-slate-400 mb-8 max-w-2xl leading-relaxed">
                Designed for scalability and security. The diagram below illustrates the data flow from the client-side interface through the API layer to the database structure.
              </p>
              
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 overflow-hidden">
                 <img 
                    src={project.architectureImage} 
                    alt="System Architecture Diagram" 
                    className="w-full h-auto rounded-lg opacity-90 hover:opacity-100 transition-opacity" 
                 />
                 <div className="mt-4 flex justify-center">
                    <span className="text-xs text-slate-500 bg-slate-900 px-3 py-1 rounded-full">High-Level Data Flow</span>
                 </div>
              </div>
            </div>
          </div>
        </Reveal>

      </div>
    </div>
  );
};

export default ProjectDetails;