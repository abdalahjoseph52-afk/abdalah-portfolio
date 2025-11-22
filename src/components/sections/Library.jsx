import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Download } from 'lucide-react';
import { userData } from '../../data/userData';

const Library = () => {
  const { books } = userData;

  return (
    <section id="library" className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12 gap-4 md:gap-6">
          <div className="text-center md:text-left w-full">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 md:mb-4">
              My Library
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-xl mx-auto md:mx-0">
              Sharing knowledge through writing. Read online or download the full copy.
            </p>
          </div>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {books.map((book) => (
            <motion.div 
              key={book.id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-5 md:p-6 shadow-lg border border-slate-100 flex flex-col h-full"
            >
              {/* Book Cover */}
              <div className="relative aspect-[3/4] bg-slate-900 rounded-lg mb-5 overflow-hidden shadow-md group">
                {/* Background Image */}
                <img 
                  src={book.cover} 
                  alt={book.title} 
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" 
                />
                
                {/* Overlay Text */}
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center p-4 border-[8px] border-white/10">
                  <h3 className="text-white font-bold text-lg md:text-xl mb-2 font-serif drop-shadow-md leading-tight">
                    {book.title}
                  </h3>
                  <p className="text-yellow-400 text-[10px] uppercase tracking-widest font-bold">
                    {book.author}
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">{book.title}</h3>
                <p className="text-slate-600 text-xs md:text-sm line-clamp-3 mb-6 leading-relaxed">
                  {book.desc}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-auto">
                {/* READ BUTTON - Opens PDF in new tab */}
                <a 
                  href={book.pdfUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 py-3 rounded-lg bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <BookOpen size={16} /> Read
                </a>
                
                {/* DOWNLOAD BUTTON - Forces Download */}
                <a 
                  href={book.pdfUrl} 
                  download
                  className="px-4 py-3 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center"
                  title="Download PDF"
                >
                  <Download size={20} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Library;