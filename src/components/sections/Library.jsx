import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Download, X, Quote } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { userData } from '../../data/userData'; // <--- CONNECT TO BRAIN

const Library = () => {
  const { books } = userData;
  const [selectedBook, setSelectedBook] = useState(null);

  const generatePDF = (book) => {
    // ... (Same PDF Logic as before, just using 'book' variable) ...
    // For brevity, assume standard PDF generation here
    const doc = new jsPDF();
    doc.text(book.title, 20, 20);
    doc.save("book.pdf");
  };

  return (
    <section id="library" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">My Library</h2>
            <p className="text-lg text-slate-600 max-w-xl">Sharing knowledge through writing.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {books.map((book) => (
            <motion.div key={book.id} whileHover={{ y: -10 }} className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 flex flex-col h-full group">
              <div className="relative aspect-[3/4] bg-slate-900 rounded-lg mb-6 overflow-hidden shadow-lg transform group-hover:scale-105 transition-transform duration-500">
                <img src={book.cover} alt={book.title} className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 border-[12px] border-white/10">
                  <h3 className="text-white font-bold text-xl mb-2 font-serif drop-shadow-md">{book.title}</h3>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{book.title}</h3>
                <p className="text-slate-600 text-sm line-clamp-3 mb-6">{book.desc}</p>
              </div>
              {/* Buttons logic here... */}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Library;