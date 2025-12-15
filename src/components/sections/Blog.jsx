// src/components/sections/Blog.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // New import
import { Calendar, ArrowRight, FileText } from 'lucide-react';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Only fetch the latest 3 posts for the homepage
    const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'), limit(3));
    return onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  return (
    <section id="blog" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Latest Insights</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Thoughts on technology, finance, and system architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div 
              key={post.id} 
              onClick={() => navigate(`/blog/${post.id}`)} // 👈 Navigation Action
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group border border-slate-100 flex flex-col h-full"
            >
              <div className="h-48 overflow-hidden bg-slate-200 relative">
                {post.image ? (
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <FileText size={48} opacity={0.5} />
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
                  {post.category || 'Tech'}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-3 font-medium">
                  <Calendar size={14} className="text-blue-500" />
                  {post.date}
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-slate-600 text-sm mb-4 line-clamp-3 flex-grow">
                  {post.summary}
                </p>

                <div className="pt-4 border-t border-slate-50 flex items-center text-blue-600 font-bold text-sm">
                  Read Article <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;