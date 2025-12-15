// src/components/pages/BlogPost.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import DOMPurify from 'dompurify'; // 🛡️ Security: Prevents XSS attacks
import { Helmet } from 'react-helmet-async'; // 🔍 SEO: Dynamic Titles
import { ArrowLeft, Calendar, User, Tag, Loader2 } from 'lucide-react';
import Navbar from '../layout/Navbar'; // Reuse your Navbar

const BlogPost = () => {
  const { id } = useParams(); // Get the ID from the URL (e.g., /blog/123)
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, 'blogs', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() });
        } else {
          navigate('/'); // Redirect if not found
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id, navigate]);

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-blue-600 w-10 h-10"/></div>;

  if (!post) return null;

  // 🛡️ Sanitize HTML content before rendering
  const cleanContent = DOMPurify.sanitize(post.content);

  return (
    <>
      <Helmet>
        <title>{post.title} | Abdalah Portfolio</title>
        <meta name="description" content={post.summary || "Read this article on my portfolio."} />
      </Helmet>

      <Navbar /> {/* Ensure navigation is available */}
      
      <div className="bg-slate-50 min-h-screen pt-24 pb-20">
        <article className="max-w-3xl mx-auto px-6">
          {/* Back Button */}
          <button onClick={() => navigate(-1)} className="group flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-8 transition-colors font-medium">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Library
          </button>

          {/* Header */}
          <header className="mb-10 text-center">
            <div className="flex items-center justify-center gap-4 text-xs font-bold text-slate-500 mb-4 uppercase tracking-wider">
              <span className="flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-slate-200"><Tag size={12}/> {post.category || 'Tech'}</span>
              <span className="flex items-center gap-1"><Calendar size={12}/> {post.date}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">{post.title}</h1>
          </header>

          {/* Featured Image */}
          {post.image && (
            <div className="rounded-2xl overflow-hidden shadow-lg mb-10 aspect-video bg-slate-200">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}

          {/* Content Body - Rendered Safely */}
          <div 
            className="prose prose-lg prose-slate max-w-none bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100"
            dangerouslySetInnerHTML={{ __html: cleanContent }} 
          />
        </article>
      </div>
    </>
  );
};

export default BlogPost;