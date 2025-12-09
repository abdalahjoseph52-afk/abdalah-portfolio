import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Tag, ArrowRight, Loader2 } from 'lucide-react';
import { db } from '../../lib/firebase'; // Connect to Firebase
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const Blog = () => {
  const [activePost, setActivePost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH BLOGS FROM FIREBASE
  useEffect(() => {
    const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedPosts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(fetchedPosts);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleReadArticleClick = (e, post) => {
    e.preventDefault();
    setActivePost(post);
    document.getElementById('blog').scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) return <div className="py-24 flex justify-center"><Loader2 className="animate-spin text-blue-600"/></div>;

  const renderFullPost = () => (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <button onClick={() => setActivePost(null)} className="flex items-center gap-2 text-blue-600 font-bold mb-10 hover:text-blue-700 transition-colors">
        <ArrowLeft size={20} /> Back to Articles
      </button>

      {/* Hero Image */}
      <div className="h-64 md:h-96 w-full bg-slate-200 relative overflow-hidden rounded-2xl shadow-xl mb-12">
        {activePost.image && (
          <img src={activePost.image} alt={activePost.title} className="w-full h-full object-cover object-center opacity-90" />
        )}
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="text-center">
            <div className="text-xs font-bold text-white/80 mb-2 uppercase tracking-widest">
              {activePost.category}
            </div>
            <h1 className="text-2xl md:text-5xl font-bold text-white drop-shadow-lg leading-tight">
              {activePost.title}
            </h1>
            <div className="flex items-center justify-center text-sm text-white/70 mt-4 space-x-4">
              <span className="flex items-center gap-1.5"><Calendar size={16} /> {activePost.date}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content - FIXED CSS FOR RICH TEXT */}
      {/* 'break-words' and 'max-w-full' prevent horizontal scrolling */}
      <div 
        className="prose prose-lg prose-blue max-w-none text-slate-700 bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
        style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }} 
        dangerouslySetInnerHTML={{ __html: activePost.content }}
      >
      </div>

      <div className="mt-16 pt-8 border-t border-slate-200 text-center">
        <button onClick={() => setActivePost(null)} className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg">
          View More Articles
        </button>
      </div>
    </div>
  );

  const renderPostList = () => (
    <>
      <div className="text-center max-w-3xl mx-auto mb-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Insights & Articles</h2>
        <p className="text-lg text-slate-600">Thoughts on Technology, Finance, and Human-Centric Design.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {posts.length === 0 ? <p className="text-center text-slate-500 py-10">No articles yet.</p> : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <a key={post.id} href={`#blog/${post.id}`} onClick={(e) => handleReadArticleClick(e, post)} className="group bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                <div className="h-48 bg-slate-200 relative overflow-hidden">
                  {post.image && <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center text-xs text-slate-500 mb-3 space-x-3">
                    <span className="flex items-center gap-1.5"><Calendar size={14} /> {post.date}</span>
                    <span className="flex items-center gap-1.5 text-blue-600 font-medium"><Tag size={14} /> {post.category}</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">{post.title}</h3>
                  <p className="text-slate-600 mb-4 flex-1 leading-relaxed text-sm line-clamp-3">{post.summary}</p>
                  
                  <span className="flex items-center gap-2 text-blue-600 font-medium text-sm mt-auto">
                    Read Article <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </>
  );

  return (
    <section id="blog" className="py-20 md:py-32 bg-slate-50">
      {activePost ? renderFullPost() : renderPostList()}
    </section>
  );
};

export default Blog;