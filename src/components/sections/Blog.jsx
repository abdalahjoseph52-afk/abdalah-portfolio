// src/components/sections/Blog.jsx

import React, { useState } from 'react';
import { ArrowLeft, Calendar, Tag, ArrowRight } from 'lucide-react';
import { blogPosts } from '../../data/blogData';

const Blog = () => {
  // State to hold the post object currently being viewed, or null for the list view
  const [activePost, setActivePost] = useState(null);

  // Handler to open the full post view
  const handleReadArticleClick = (e, post) => {
    e.preventDefault();
    setActivePost(post);
    // Scroll to the top of the blog section for a seamless transition
    document.getElementById('blog').scrollIntoView({ behavior: 'smooth' });
  };

  // Function to render the full article view
  const renderFullPost = () => (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Back Button */}
      <button 
        onClick={() => setActivePost(null)} 
        className="flex items-center gap-2 text-blue-600 font-bold mb-10 hover:text-blue-700 transition-colors"
      >
        <ArrowLeft size={20} /> Back to Articles
      </button>

      {/* Hero Image */}
      <div className="h-96 w-full bg-slate-200 relative overflow-hidden rounded-2xl shadow-xl mb-12">
        <img 
          src={activePost.image} 
          alt={activePost.title} 
          className="w-full h-full object-cover object-center opacity-90" 
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="text-sm font-medium text-white/80 mb-2 uppercase tracking-widest">
              {activePost.category}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg leading-tight">
              {activePost.title}
            </h1>
            <div className="flex items-center justify-center text-sm text-white/70 mt-4 space-x-4">
              <span className="flex items-center gap-1.5"><Calendar size={16} /> {activePost.date}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div 
        className="prose prose-lg max-w-none text-slate-600"
        dangerouslySetInnerHTML={{ __html: activePost.content }}
      >
      </div>

      {/* CTA at the end */}
      <div className="mt-16 pt-8 border-t border-slate-200 text-center">
        <button 
          onClick={() => setActivePost(null)} 
          className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg"
        >
          View More Articles
        </button>
      </div>
    </div>
  );

  // Function to render the list of posts (default view)
  const renderPostList = () => (
    <>
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Insights & Articles
        </h2>
        <p className="text-lg text-slate-600">
          Thoughts on Technology, Finance, and Human-Centric Design.
        </p>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <a 
              key={post.id} 
              href={`#blog/${post.slug}`}
              onClick={(e) => handleReadArticleClick(e, post)} 
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
    </>
  );

  return (
    <section id="blog" className="py-20 md:py-32 bg-slate-50">
      {/* Conditional Rendering: Show full post or list of posts */}
      {activePost ? renderFullPost() : renderPostList()}
    </section>
  );
};

export default Blog;