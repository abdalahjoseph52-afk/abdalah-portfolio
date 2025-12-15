// src/components/admin/tabs/ProjectManager.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../../../lib/firebase';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, addDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { uploadImage } from '../../../lib/uploadService';
import { useToast } from '../../../context/ToastContext';
import { Plus, Edit2, Trash2, Folder, X, Loader2, Save } from 'lucide-react';

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { success, error } = useToast();

  useEffect(() => {
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (s) => {
      setProjects(s.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return unsub;
  }, []);

  const handleSave = async () => {
    if (!formData.title) return error("Title required");
    setSubmitting(true);
    try {
      let payload = { ...formData };
      if (typeof payload.tech === 'string') payload.tech = payload.tech.split(',').map(t => t.trim());
      if (file) payload.image = await uploadImage(file);

      if (formData.id) {
        await updateDoc(doc(db, 'projects', formData.id), payload);
        success("Project Updated");
      } else {
        await addDoc(collection(db, 'projects'), { ...payload, createdAt: serverTimestamp() });
        success("Project Added");
      }
      setIsModalOpen(false); setFormData({}); setFile(null);
    } catch (e) { error("Error saving project"); console.error(e); }
    setSubmitting(false);
  };

  const handleDelete = async (id) => {
    if(!confirm("Delete this project?")) return;
    try { await deleteDoc(doc(db, 'projects', id)); success("Deleted"); } catch(e){ error("Failed"); }
  };

  if(loading) return <div className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-blue-600"/></div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Projects</h1>
        <button onClick={() => { setFormData({}); setIsModalOpen(true); }} className="bg-slate-900 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-600 transition-colors"><Plus size={18}/> Add New</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map(item => (
          <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col">
            <div className="h-40 bg-slate-100 rounded-lg mb-3 overflow-hidden relative">
              {item.image ? <img src={item.image} className="w-full h-full object-cover"/> : <div className="w-full h-full flex items-center justify-center text-slate-300"><Folder size={32}/></div>}
              <span className={`absolute top-2 right-2 px-2 py-1 text-[10px] font-bold rounded bg-white shadow-sm border ${item.statusColor || 'text-slate-600'}`}>{item.status || 'Draft'}</span>
            </div>
            <h3 className="font-bold text-slate-900 line-clamp-1">{item.title}</h3>
            <p className="text-xs text-slate-500 mb-2">{item.category}</p>
            <div className="grid grid-cols-2 gap-2 mt-auto pt-3 border-t border-slate-50">
              <button onClick={() => { setFormData(item); setIsModalOpen(true); }} className="flex items-center justify-center gap-1 py-1.5 bg-blue-50 text-blue-600 rounded text-xs font-bold hover:bg-blue-100"><Edit2 size={14}/> Edit</button>
              <button onClick={() => handleDelete(item.id)} className="flex items-center justify-center gap-1 py-1.5 bg-red-50 text-red-600 rounded text-xs font-bold hover:bg-red-100"><Trash2 size={14}/> Del</button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">{formData.id ? 'Edit' : 'Add'} Project</h3>
              <button onClick={() => setIsModalOpen(false)}><X/></button>
            </div>
            <div className="space-y-4">
              <input className="w-full p-3 border rounded-lg" placeholder="Project Title" value={formData.title||''} onChange={e=>setFormData({...formData, title:e.target.value})}/>
              <input className="w-full p-3 border rounded-lg" placeholder="Category (e.g. Fintech)" value={formData.category||''} onChange={e=>setFormData({...formData, category:e.target.value})}/>
              <textarea className="w-full p-3 border rounded-lg" rows="3" placeholder="Description" value={formData.description||''} onChange={e=>setFormData({...formData, description:e.target.value})}/>
              <input className="w-full p-3 border rounded-lg" placeholder="Tech Stack (comma separated)" value={formData.tech||''} onChange={e=>setFormData({...formData, tech:e.target.value})}/>
              
              <div className="grid grid-cols-2 gap-3">
                <input className="p-3 border rounded-lg" placeholder="Status (e.g. Live System)" value={formData.status||''} onChange={e=>setFormData({...formData, status:e.target.value})}/>
                <input className="p-3 border rounded-lg" placeholder="Status Color (Tailwind classes)" value={formData.statusColor||''} onChange={e=>setFormData({...formData, statusColor:e.target.value})}/>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input className="p-3 border rounded-lg" placeholder="Live Link" value={formData.link||''} onChange={e=>setFormData({...formData, link:e.target.value})}/>
                <input className="p-3 border rounded-lg" placeholder="Github URL" value={formData.github||''} onChange={e=>setFormData({...formData, github:e.target.value})}/>
              </div>

              <div className="border-2 border-dashed p-4 rounded-lg text-center">
                <p className="text-xs text-slate-500 mb-2">Cover Image</p>
                <input type="file" accept="image/*" onChange={e=>setFile(e.target.files[0])} className="mx-auto text-sm"/>
              </div>
            </div>
            <button disabled={submitting} onClick={handleSave} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold mt-6 flex justify-center items-center gap-2">
              {submitting ? <Loader2 className="animate-spin"/> : <><Save size={18}/> Save Project</>}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectManager;