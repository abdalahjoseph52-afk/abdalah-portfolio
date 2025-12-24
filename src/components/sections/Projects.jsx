import React, { useState, useEffect } from 'react';
import { ExternalLink, Folder, Loader2, Github } from 'lucide-react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Reveal } from '../utils/Reveal';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const categories = ['All', ...new Set(projects.map(p => p.category))];
  const filteredProjects = projects.filter(p => filter === 'All' || p.category === filter);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-blue-600 w-8 h-8"/>
      </div>
    );
  }

  return (
    <section className="py-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Reveal key={project.id} width="100%">
              <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                
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
                  {project.status && (
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold border ${project.statusColor || 'text-slate-600 border-slate-200'} bg-white shadow-sm`}>
                      {project.status}
                    </div>
                  )}
                </div>

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

                  <div className="flex flex-wrap gap-2 mb-8">
                    {Array.isArray(project.tech) && project.tech.slice(0, 3).map((tech, i) => (
                      <span key={i} className="px-2 py-1 bg-slate-50 text-slate-500 text-xs font-medium rounded border border-slate-100">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex gap-3">
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="flex-1 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-200"
                      >
                        <ExternalLink size={18} /> Live Demo
                      </a>
                    )}
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="px-4 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl hover:border-slate-400 transition-colors"
                      >
                        <Github size={20} />
                      </a>
                    )}
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