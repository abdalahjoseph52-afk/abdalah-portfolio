import React, { useState, useEffect } from 'react';
import { db } from '../../../lib/firebase';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, addDoc, serverTimestamp } from 'firebase/firestore';
import { uploadImage, uploadPDF } from '../../../lib/uploadService'; // Ensure export uploadPDF in uploadService
import { useToast } from '../../../context/ToastContext';
import { Plus, Trash2, BookOpen, Loader2 } from 'lucide-react';

const LibraryManager = () => {
  const [books, setBooks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({});
  const [cover, setCover] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [loading, setLoading] = useState(false);
  const { success } = useToast();

  useEffect(() => onSnapshot(query(collection(db,'books'), orderBy('createdAt','desc')), s => setBooks(s.docs.map(d=>({id:d.id,...d.data()})))), []);

  const handleSave = async () => {
    setLoading(true);
    try {
      let payload = { ...data };
      if(cover) payload.cover = await uploadImage(cover);
      if(pdf) payload.pdfUrl = await uploadPDF(pdf);
      await addDoc(collection(db,'books'), {...payload, createdAt: serverTimestamp()});
      success("Book Added"); setIsOpen(false); setData({});
    } catch(e) { console.error(e); }
    setLoading(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Library</h1>
        <button onClick={() => setIsOpen(true)} className="bg-slate-900 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2"><Plus size={18}/> Add Book</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {books.map(b => (
          <div key={b.id} className="bg-white p-4 rounded-xl border border-slate-100 group relative">
            <div className="aspect-[3/4] bg-slate-100 rounded-lg mb-3 overflow-hidden">
              {b.cover ? <img src={b.cover} className="w-full h-full object-cover"/> : <BookOpen className="m-auto mt-10 text-slate-300"/>}
            </div>
            <h4 className="font-bold text-sm line-clamp-1">{b.title}</h4>
            <button onClick={()=>deleteDoc(doc(db,'books',b.id))} className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={12}/></button>
          </div>
        ))}
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6">
            <h3 className="font-bold text-xl mb-4">Add Book</h3>
            <div className="space-y-3">
              <input className="w-full p-3 border rounded" placeholder="Title" onChange={e=>setData({...data, title:e.target.value})}/>
              <input className="w-full p-3 border rounded" placeholder="Subtitle" onChange={e=>setData({...data, subtitle:e.target.value})}/>
              <textarea className="w-full p-3 border rounded" placeholder="Description" onChange={e=>setData({...data, desc:e.target.value})}/>
              <div className="border p-3 rounded text-sm"><p className="mb-1">Cover</p><input type="file" onChange={e=>setCover(e.target.files[0])}/></div>
              <div className="border p-3 rounded text-sm bg-blue-50"><p className="mb-1 text-blue-800">PDF File</p><input type="file" accept=".pdf" onChange={e=>setPdf(e.target.files[0])}/></div>
            </div>
            <button disabled={loading} onClick={handleSave} className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold mt-6 flex justify-center">{loading?<Loader2 className="animate-spin"/>:'Save Book'}</button>
            <button onClick={()=>setIsOpen(false)} className="w-full text-slate-500 py-3 text-sm">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default LibraryManager;