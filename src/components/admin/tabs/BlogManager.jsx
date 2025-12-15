// src/components/admin/tabs/BlogManager.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../../../lib/firebase';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, addDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { uploadImage } from '../../../lib/uploadService';
import { useToast } from '../../../context/ToastContext';
import { Plus, Edit2, Trash2, FileText, X, Loader2, Save } from 'lucide-react';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';

const BlogManager = () => {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { success, error } = useToast();

  const quillModules = {
    toolbar: [[{ 'header': [2, 3, false] }], ['bold', 'italic', 'underline'], [{ 'list': 'ordered'}, { 'list': 'bullet' }], ['link', 'clean']],
  };

  useEffect(() => {
    return onSnapshot(query(collection(db, 'blogs'), orderBy('createdAt', 'desc')), s => {
      setPosts(s.docs.map(d => ({ id: d.id, ...d.data() })));
    });
  }, []);

  const handleSave = async () => {
    if (!formData.title) return error("Title missing");
    setSubmitting(true);
    try {
      let payload = { ...formData };
      if (file) payload.image = await uploadImage(file);
      
      if (formData.id) { await updateDoc(doc(db, 'blogs', formData.id), payload); success("Article updated"); } 
      else { await addDoc(collection(db, 'blogs'), { ...payload, createdAt: serverTimestamp() }); success("Article published"); }
      setIsModalOpen(false); setFormData({}); setFile(null);
    } catch (e) { error("Save failed"); }
    setSubmitting(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Blog Posts</h1>
        <button onClick={() => { setFormData({}); setIsModalOpen(true); }} className="bg-slate-900 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-600"><Plus size={18}/> Write Article</button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {posts.map(item => (
          <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center group hover:border-blue-200 transition-colors">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                {item.image ? <img src={item.image} className="w-full h-full object-cover"/> : <FileText className="m-auto text-slate-300 mt-4"/>}
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-500">{item.date} • {item.category}</p>
              </div>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => { setFormData(item); setIsModalOpen(true); }} className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Edit2 size={16}/></button>
              <button onClick={async () => { if(confirm("Delete?")) await deleteDoc(doc(db, 'blogs', item.id)); }} className="p-2 bg-red-50 text-red-600 rounded-lg"><Trash2 size={16}/></button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6"><h3 className="text-xl font-bold">Write Article</h3><button onClick={() => setIsModalOpen(false)}><X/></button></div>
            <div className="space-y-4">
              <input className="w-full p-3 border rounded-lg font-bold text-lg" placeholder="Article Title" value={formData.title||''} onChange={e=>setFormData({...formData, title:e.target.value})}/>
              <div className="grid grid-cols-2 gap-4">
                <input className="p-3 border rounded-lg" placeholder="Category" value={formData.category||''} onChange={e=>setFormData({...formData, category:e.target.value})}/>
                <input type="date" className="p-3 border rounded-lg" value={formData.date||''} onChange={e=>setFormData({...formData, date:e.target.value})}/>
              </div>
              <textarea className="w-full p-3 border rounded-lg" rows="2" placeholder="Short Summary" value={formData.summary||''} onChange={e=>setFormData({...formData, summary:e.target.value})}/>
              
              <div className="h-64 mb-12">
                <ReactQuill theme="snow" value={formData.content || ''} onChange={(c) => setFormData({...formData, content: c})} modules={quillModules} className="h-full" />
              </div>

              <div className="border-2 border-dashed p-4 rounded-lg mt-8 text-center">
                <p className="text-xs text-slate-500 mb-1">Cover Image</p>
                <input type="file" accept="image/*" onChange={e=>setFile(e.target.files[0])} className="mx-auto text-sm"/>
              </div>
            </div>
            <button disabled={submitting} onClick={handleSave} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold mt-6 flex justify-center items-center gap-2">{submitting ? <Loader2 className="animate-spin"/> : 'Publish Article'}</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManager;