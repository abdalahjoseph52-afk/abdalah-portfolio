import React, { useState, useEffect } from 'react';
import { db, auth } from '../../lib/firebase';
import { collection, query, orderBy, onSnapshot, addDoc, deleteDoc, updateDoc, doc, serverTimestamp, setDoc, getDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { uploadImage } from '../../lib/uploadService';
import { useToast } from '../../context/ToastContext';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css'; 
import { 
  LayoutDashboard, Folder, BookOpen, FileText, Mail, LogOut, Plus, Edit2, Trash2, X, Loader2, 
  UploadCloud, Phone, MessageSquare, Settings, Instagram, Twitter, Linkedin, Github, Facebook, MapPin, Download, Menu
} from 'lucide-react'; // 👈 Menu Icon Added

const AdminDashboard = () => {
  const { success, error } = useToast();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('projects');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // 👈 State for Mobile Menu
  
  const [data, setData] = useState({ projects: [], blogs: [], books: [], messages: [] });
  const [settings, setSettings] = useState({
    email: '', phone: '', location: '', address: '', whatsapp: '', 
    instagram: '', twitter: '', linkedin: '', github: '', facebook: '',
    profileImage: ''
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null); 
  const [authForm, setAuthForm] = useState({ email: '', password: '' });

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'align': [] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'clean']
    ],
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
      if (u) {
        const collections = ['projects', 'blogs', 'books', 'messages'];
        const unsubs = collections.map(key => 
          onSnapshot(query(collection(db, key), orderBy('createdAt', 'desc')), s => {
            setData(prev => ({ ...prev, [key]: s.docs.map(d => ({ id: d.id, ...d.data() })) }));
          })
        );
        getDoc(doc(db, "settings", "general")).then(d => { if(d.exists()) setSettings(d.data()); });
        
        setIsLoading(false);
        return () => unsubs.forEach(u => u && u());
      } else { setIsLoading(false); }
    });
    return unsubscribe;
  }, []);

  const handleLogin = async (e) => { 
    e.preventDefault(); 
    setIsSubmitting(true); 
    try { 
      await signInWithEmailAndPassword(auth, authForm.email, authForm.password); 
      success("Umeingia!"); 
    } catch (err) { error("Imeshindikana. Hakiki email/password."); } 
    finally { setIsSubmitting(false); }
  };

  const handleLogout = async () => { await signOut(auth); };

  const handleSave = async (collectionName) => {
    if (!formData.title && collectionName !== 'messages') {
      error("Weka Kichwa cha Habari (Title)!");
      return;
    }
    setIsSubmitting(true);
    try {
      let payload = { ...formData };
      
      if (selectedFile) {
        try {
          const url = await uploadImage(selectedFile);
          payload.image = url; 
          if (collectionName === 'books') payload.cover = url;
        } catch(e) { throw new Error("Picha imegoma."); }
      }
      
      if (collectionName === 'books' && pdfFile) {
         try { const pdfUrl = await uploadImage(pdfFile); payload.pdfUrl = pdfUrl; } catch(e) { throw new Error("PDF imegoma."); }
      }

      if (collectionName === 'projects' && typeof payload.tech === 'string') {
        payload.tech = payload.tech.split(',').map(t => t.trim());
      }

      if (editingId) { await updateDoc(doc(db, collectionName, editingId), payload); success("Imesasishwa!"); } 
      else { await addDoc(collection(db, collectionName), { ...payload, createdAt: serverTimestamp() }); success("Imeongezwa!"); }
      
      closeModal();
    } catch (err) { error(err.message || "Kosa la mtandao."); } 
    finally { setIsSubmitting(false); }
  };

  const handleSettingsSave = async () => {
    setIsSubmitting(true);
    try { 
        let payload = { ...settings };
        if (selectedFile) { const url = await uploadImage(selectedFile); payload.profileImage = url; }
        await setDoc(doc(db, "settings", "general"), payload, { merge: true }); 
        success("Settings Saved!"); setSelectedFile(null);
    } 
    catch (err) { error("Failed."); } finally { setIsSubmitting(false); }
  };

  const deleteItem = async (col, id) => { if (confirm("Futa?")) await deleteDoc(doc(db, col, id)); };
  const openModal = (item = null) => { setFormData(item || {}); setEditingId(item?.id || null); setSelectedFile(null); setPdfFile(null); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setFormData({}); setEditingId(null); };

  const handleExportMessages = () => {
    if (data.messages.length === 0) { error("Hakuna ujumbe."); return; }
    try {
      const headers = ["Name,Email,Phone,Message,Date"];
      const rows = data.messages.map(msg => [`"${msg.name||''}"`,`"${msg.email||''}"`,`"${msg.phone||''}"`,`"${msg.message||''}"`,`"${msg.createdAt?.toDate().toLocaleDateString()||''}"`].join(","));
      const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers, ...rows].join("\n");
      const link = document.createElement("a"); link.href = encodeURI(csvContent); link.download = "messages.csv"; document.body.appendChild(link); link.click(); document.body.removeChild(link);
      success("Imepakuliwa!");
    } catch (err) { error("Export failed."); }
  };

  const renderForm = () => {
    switch(activeTab) {
      case 'projects': return (<><input className="w-full p-3 border rounded mb-3" placeholder="Project Title" value={formData.title||''} onChange={e=>setFormData({...formData, title:e.target.value})}/><input className="w-full p-3 border rounded mb-3" placeholder="Category" value={formData.category||''} onChange={e=>setFormData({...formData, category:e.target.value})}/><textarea className="w-full p-3 border rounded mb-3" rows="3" placeholder="Description" value={formData.description||''} onChange={e=>setFormData({...formData, description:e.target.value})}/><input className="w-full p-3 border rounded mb-3" placeholder="Tech Stack (comma separated)" value={formData.tech||''} onChange={e=>setFormData({...formData, tech:e.target.value})}/><div className="grid grid-cols-2 gap-3 mb-3"><input className="p-3 border rounded" placeholder="Live Link" value={formData.link||''} onChange={e=>setFormData({...formData, link:e.target.value})}/><input className="p-3 border rounded" placeholder="Github Link" value={formData.github||''} onChange={e=>setFormData({...formData, github:e.target.value})}/></div><div className="border-2 border-dashed p-4 rounded text-center"><p className="text-xs mb-1">Project Image</p><input type="file" accept="image/*" onChange={e=>setSelectedFile(e.target.files[0])}/></div></>);
      case 'blogs': return (
        <>
          <input className="w-full p-3 border rounded mb-3" placeholder="Article Title" value={formData.title||''} onChange={e=>setFormData({...formData, title:e.target.value})}/>
          <div className="grid grid-cols-2 gap-3 mb-3"><input className="p-3 border rounded" placeholder="Category" value={formData.category||''} onChange={e=>setFormData({...formData, category:e.target.value})}/><input className="p-3 border rounded" type="date" value={formData.date||''} onChange={e=>setFormData({...formData, date:e.target.value})}/></div><textarea className="w-full p-3 border rounded mb-3" rows="2" placeholder="Short Summary" value={formData.summary||''} onChange={e=>setFormData({...formData, summary:e.target.value})}/>
          <div className="mb-4 bg-white"><label className="block text-sm font-bold mb-1 text-slate-700">Content</label><ReactQuill theme="snow" value={formData.content || ''} onChange={(content) => setFormData({...formData, content})} modules={quillModules} className="h-64 mb-12" /></div>
          <div className="border-2 border-dashed p-4 rounded text-center mt-4"><p className="text-xs mb-1">Blog Image</p><input type="file" accept="image/*" onChange={e=>setSelectedFile(e.target.files[0])}/></div>
        </>
      );
      case 'books': return (<><input className="w-full p-3 border rounded mb-3" placeholder="Book Title" value={formData.title||''} onChange={e=>setFormData({...formData, title:e.target.value})}/><input className="w-full p-3 border rounded mb-3" placeholder="Subtitle" value={formData.subtitle||''} onChange={e=>setFormData({...formData, subtitle:e.target.value})}/><textarea className="w-full p-3 border rounded mb-3" rows="3" placeholder="Description" value={formData.desc||''} onChange={e=>setFormData({...formData, desc:e.target.value})}/><div className="border-2 border-dashed p-4 rounded text-center mb-3"><p className="text-xs mb-1">Cover Image</p><input type="file" accept="image/*" onChange={e=>setSelectedFile(e.target.files[0])}/></div><div className="border-2 border-dashed p-4 rounded text-center bg-blue-50"><p className="text-xs mb-1 text-blue-800">PDF File</p><input type="file" accept=".pdf" onChange={e=>setPdfFile(e.target.files[0])}/></div></>);
      default: return null;
    }
  };

  // Login Screen
  if (!user) return (<div className="min-h-screen flex items-center justify-center bg-slate-100 p-4"><div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"><h2 className="text-2xl font-bold text-center mb-6">Portfolio Admin</h2><form onSubmit={handleLogin} className="space-y-4"><input className="w-full p-4 border rounded-xl" placeholder="Email" value={authForm.email} onChange={e=>setAuthForm({...authForm, email:e.target.value})}/><input className="w-full p-4 border rounded-xl" type="password" placeholder="Password" value={authForm.password} onChange={e=>setAuthForm({...authForm, password:e.target.value})}/><button disabled={isSubmitting} className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold">{isSubmitting?'Checking...':'Login'}</button></form></div></div>);

  // MAIN ADMIN LAYOUT
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-900">
      
      {/* 🔴 MOBILE HEADER (Mpya: Inaonekana kwenye simu tu) */}
      <div className="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
        <h2 className="font-bold text-lg tracking-wide">Admin Panel</h2>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 🔴 MOBILE NAVIGATION MENU (Inashuka chini ikibonyezwa) */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40 bg-slate-900/95 backdrop-blur-sm p-4 overflow-y-auto">
           <nav className="space-y-2 mb-8">
             {[{id:'projects',icon:Folder,l:'Projects'},{id:'blogs',icon:FileText,l:'Blog'},{id:'books',icon:BookOpen,l:'Library'},{id:'messages',icon:Mail,l:'Inbox'},{id:'settings',icon:Settings,l:'Settings'}].map(t => (
               <button 
                 key={t.id} 
                 onClick={() => { setActiveTab(t.id); setIsMobileMenuOpen(false); }} 
                 className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl text-lg font-medium transition-all ${activeTab===t.id ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
               >
                 <t.icon size={20}/> {t.l}
               </button>
             ))}
           </nav>
           <button onClick={handleLogout} className="flex items-center gap-3 text-red-400 hover:text-red-300 w-full px-4 py-4 text-lg font-bold border-t border-slate-800"><LogOut size={20}/> Logout</button>
        </div>
      )}

      {/* DESKTOP SIDEBAR (Inaonekana kwenye PC tu) */}
      <aside className="hidden md:block w-64 bg-slate-900 text-slate-300 flex-shrink-0 md:h-screen sticky top-0 overflow-y-auto">
        <div className="p-6 font-bold text-white text-xl">Admin Panel</div>
        <nav className="flex-1 px-4 space-y-2">
          {[{id:'projects',icon:Folder,l:'Projects'},{id:'blogs',icon:FileText,l:'Blog'},{id:'books',icon:BookOpen,l:'Library'},{id:'messages',icon:Mail,l:'Inbox'},{id:'settings',icon:Settings,l:'Settings'}].map(t => (
            <button key={t.id} onClick={()=>setActiveTab(t.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab===t.id ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'}`}><t.icon size={18}/> {t.l}</button>
          ))}
        </nav>
        <div className="p-4"><button onClick={handleLogout} className="flex items-center gap-2 text-red-400 hover:text-red-300 w-full px-4"><LogOut size={18}/> Logout</button></div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 md:p-10 pb-32">
        {isLoading ? <div className="text-center py-20"><Loader2 className="animate-spin mx-auto"/></div> : (
          <>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-slate-900 capitalize">{activeTab}</h1>
              {activeTab === 'messages' ? (
                 <button onClick={handleExportMessages} className="bg-green-600 text-white px-4 md:px-6 py-2 rounded-full font-bold flex items-center gap-2 shadow-lg hover:bg-green-700 text-sm md:text-base"><Download size={20}/> <span className="hidden md:inline">Export CSV</span></button>
              ) : activeTab !== 'settings' && (
                 <button onClick={()=>openModal()} className="bg-slate-900 text-white px-4 md:px-6 py-2 rounded-full font-bold flex items-center gap-2 shadow-lg hover:bg-slate-800 text-sm md:text-base"><Plus size={20}/> <span className="hidden md:inline">Add New</span><span className="md:hidden">Add</span></button>
              )}
            </div>

            {/* CONTENT RENDERER */}
            {activeTab === 'settings' ? (
               <div className="max-w-3xl space-y-6">
                 {/* Settings Form */}
                 <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                   <h3 className="font-bold text-lg mb-4">Contact Info</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                     <input className="p-3 border rounded-lg" placeholder="Email" value={settings.email} onChange={e=>setSettings({...settings, email:e.target.value})}/>
                     <input className="p-3 border rounded-lg" placeholder="Phone" value={settings.phone} onChange={e=>setSettings({...settings, phone:e.target.value})}/>
                     <input className="p-3 border rounded-lg" placeholder="Location" value={settings.location} onChange={e=>setSettings({...settings, location:e.target.value})}/>
                     <input className="p-3 border rounded-lg" placeholder="Address (P.O. Box)" value={settings.address} onChange={e=>setSettings({...settings, address:e.target.value})}/>
                   </div>
                 </div>
                 <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                   <h3 className="font-bold text-lg mb-4">Social Media & Profile</h3>
                   <div className="grid grid-cols-1 gap-4 mb-6">
                     <div className="flex gap-2 items-center"><span className="w-8"><MessageSquare size={20}/></span><input className="flex-1 p-2 border rounded" placeholder="WhatsApp Link" value={settings.whatsapp} onChange={e=>setSettings({...settings, whatsapp:e.target.value})}/></div>
                     <div className="flex gap-2 items-center"><span className="w-8"><Facebook size={20}/></span><input className="flex-1 p-2 border rounded" placeholder="Facebook Link" value={settings.facebook} onChange={e=>setSettings({...settings, facebook:e.target.value})}/></div>
                     <div className="flex gap-2 items-center"><span className="w-8"><Instagram size={20}/></span><input className="flex-1 p-2 border rounded" placeholder="Instagram Link" value={settings.instagram} onChange={e=>setSettings({...settings, instagram:e.target.value})}/></div>
                     <div className="flex gap-2 items-center"><span className="w-8"><Linkedin size={20}/></span><input className="flex-1 p-2 border rounded" placeholder="LinkedIn Link" value={settings.linkedin} onChange={e=>setSettings({...settings, linkedin:e.target.value})}/></div>
                     <div className="flex gap-2 items-center"><span className="w-8"><Github size={20}/></span><input className="flex-1 p-2 border rounded" placeholder="GitHub Link" value={settings.github} onChange={e=>setSettings({...settings, github:e.target.value})}/></div>
                   </div>
                   <div className="border-t pt-4">
                       <h4 className="font-bold text-sm mb-2">Update Profile Picture</h4>
                       <input type="file" accept="image/*" onChange={e => setSelectedFile(e.target.files[0])} className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700"/>
                   </div>
                 </div>
                 <button onClick={handleSettingsSave} disabled={isSubmitting} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold">{isSubmitting?'Saving...':'Save Settings'}</button>
               </div>
            ) : activeTab === 'messages' ? (
               <div className="grid gap-4">
                 {data.messages.length === 0 ? <p>No messages.</p> : data.messages.map(msg => (
                   <div key={msg.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                     <div className="flex justify-between items-start">
                       <div><h4 className="font-bold">{msg.name}</h4><p className="text-xs text-slate-500">{msg.email} • {msg.phone}</p></div>
                       <button onClick={()=>deleteItem('messages', msg.id)} className="text-red-400 hover:text-red-600"><Trash2 size={16}/></button>
                     </div>
                     <p className="mt-3 text-sm bg-slate-50 p-3 rounded">{msg.message}</p>
                     <div className="mt-3 flex gap-2">
                       {msg.phone && <a href={`https://wa.me/${msg.phone.replace('+','')}`} target="_blank" rel="noreferrer" className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded font-bold flex items-center gap-1"><MessageSquare size={12}/> WhatsApp</a>}
                       {msg.phone && <a href={`tel:${msg.phone}`} className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded font-bold flex items-center gap-1"><Phone size={12}/> Call</a>}
                     </div>
                   </div>
                 ))}
               </div>
            ) : (
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {data[activeTab]?.map(item => (
                   <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 relative flex flex-col">
                     {/* Image Section */}
                     <div className="h-40 bg-slate-100 rounded-lg mb-3 overflow-hidden">
                       {(item.image || item.cover) ? (
                         <img src={item.image || item.cover} className="w-full h-full object-cover"/>
                       ) : (
                         <div className="w-full h-full flex items-center justify-center text-slate-300"><Folder size={32}/></div>
                       )}
                     </div>
                     
                     {/* Content Section */}
                     <div className="flex-1">
                        <h3 className="font-bold text-slate-900 line-clamp-1">{item.title}</h3>
                        <p className="text-xs text-slate-500 line-clamp-1 mb-4">{item.category || item.author}</p>
                     </div>

                     {/* FIXED MOBILE BUTTONS: Ziko chini, zinaonekana muda wote */}
                     <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 mt-auto">
                       <button onClick={()=>openModal(item)} className="flex items-center justify-center gap-1 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-bold active:scale-95 transition-transform">
                         <Edit2 size={16}/> Edit
                       </button>
                       <button onClick={()=>deleteItem(activeTab, item.id)} className="flex items-center justify-center gap-1 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-bold active:scale-95 transition-transform">
                         <Trash2 size={16}/> Del
                       </button>
                     </div>
                   </div>
                 ))}
               </div>
            )}
          </>
        )}
      </main>

      {isModalOpen && (<div className="fixed inset-0 z-[500] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"><div className="bg-white w-full max-w-lg rounded-2xl p-6 max-h-[90vh] overflow-y-auto"><div className="flex justify-between items-center mb-6"><h3 className="text-xl font-bold">{editingId?'Edit':'Add New'} {activeTab.slice(0,-1)}</h3><button onClick={closeModal}><X/></button></div><div className="space-y-4">{renderForm()}</div><button disabled={isSubmitting} onClick={()=>handleSave(activeTab)} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold mt-6">{isSubmitting?'Processing...':'Save Item'}</button></div></div>)}
    </div>
  );
};

export default AdminDashboard;