import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Download, Loader2 } from 'lucide-react';
import { db } from '../../lib/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const Library = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'books'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setBooks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return <div className="py-12 flex justify-center"><Loader2 className="animate-spin text-blue-600"/></div>;

  return (
    <section id="library" className="py-12 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-2">My Library</h2>
          <p className="text-sm md:text-lg text-slate-600">Knowledge sharing & resources.</p>
        </div>

        {/* 📱 MOBILE FIX: grid-cols-2 (Books look great in 2 cols) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8">
          {books.map((book) => (
            <div 
              key={book.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 flex flex-col h-full"
            >
              {/* Cover - Aspect Ratio Locked */}
              <div className="relative aspect-[3/4] bg-slate-200 group overflow-hidden">
                {book.cover ? (
                  <img src={book.cover} alt={book.title} className="w-full h-full object-cover transition-transform duration-500 md:group-hover:scale-105" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-100">
                    <BookOpen size={32} />
                  </div>
                )}
                
                {/* Mobile: Gradient Overlay for Text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                   <p className="text-white text-[10px] md:text-xs font-bold line-clamp-2 md:hidden">{book.title}</p>
                </div>
              </div>

              {/* Details - Minimal on Mobile */}
              <div className="p-3 flex-1 flex flex-col">
                <h3 className="hidden md:block text-lg font-bold text-slate-900 mb-1 leading-tight">{book.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed flex-1">
                  {book.desc}
                </p>

                {/* Actions - Icons only on mobile */}
                <div className="flex gap-2 mt-auto">
                  {book.pdfUrl && (
                    <a 
                      href={book.pdfUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex-1 py-2 rounded bg-slate-900 text-white font-bold text-[10px] md:text-xs hover:bg-blue-600 transition-colors flex items-center justify-center gap-1"
                    >
                      <BookOpen size={12} /> <span className="hidden md:inline">Read</span>
                    </a>
                  )}
                  {book.pdfUrl && (
                    <a 
                      href={book.pdfUrl.replace('/upload/', '/upload/fl_attachment/')} 
                      className="px-3 py-2 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center"
                      title="Download"
                    >
                      <Download size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Library;