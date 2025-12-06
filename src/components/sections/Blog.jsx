// src/components/sections/Blog.jsx

import React from 'react';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import { blogPosts } from '../../data/blogData';

const Blog = () => {
  return (
    <section id="blog" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Insights & Articles
          </h2>
          <p className="text-lg text-slate-600">
            Thoughts on Technology, Finance, and Human-Centric Design.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <a 
              key={post.id} 
              href={post.link}
              className="group bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              
              {/* Image Container */}
              <div className="h-48 bg-slate-200 relative overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                
                {/* Meta */}
                <div className="flex items-center text-xs text-slate-500 mb-3 space-x-3">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} /> {post.date}
                  </span>
                  <span className="flex items-center gap-1.5 text-blue-600 font-medium">
                    <Tag size={14} /> {post.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{post.title}</h3>
                <p className="text-slate-600 mb-4 flex-1 leading-relaxed text-sm">{post.summary}</p>
                
                <span className="flex items-center gap-2 text-blue-600 font-medium text-sm mt-auto">
                  Read Article <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;