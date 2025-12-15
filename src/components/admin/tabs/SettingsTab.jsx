// src/components/admin/tabs/SettingsTab.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../../../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { uploadImage } from '../../../lib/uploadService';
import { useToast } from '../../../context/ToastContext';
import { Save, Loader2, UploadCloud } from 'lucide-react';

const SettingsTab = () => {
  const [data, setData] = useState({});
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { success, error } = useToast();

  useEffect(() => {
    getDoc(doc(db, "settings", "general")).then(d => { if(d.exists()) setData(d.data()); });
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      let payload = { ...data };
      if (file) payload.profileImage = await uploadImage(file);
      await setDoc(doc(db, "settings", "general"), payload, { merge: true });
      success("Settings Saved");
    } catch (e) { error("Failed to save"); }
    setLoading(false);
  };

  const Input = ({ label, k, placeholder }) => (
    <div>
      <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">{label}</label>
      <input className="w-full p-3 border rounded-lg text-sm" placeholder={placeholder} value={data[k]||''} onChange={e=>setData({...data, [k]:e.target.value})}/>
    </div>
  );

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Global Settings</h1>
      
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-6">
        <h3 className="font-bold text-lg mb-4 text-slate-800">Hero Section</h3>
        <div className="flex gap-6 items-start mb-6">
          <div className="w-24 h-24 bg-slate-100 rounded-full overflow-hidden border-2 border-slate-200">
            {file ? <img src={URL.createObjectURL(file)} className="w-full h-full object-cover"/> : (data.profileImage && <img src={data.profileImage} className="w-full h-full object-cover"/>)}
          </div>
          <div className="flex-1">
            <label className="cursor-pointer bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 w-fit hover:bg-blue-100">
              <UploadCloud size={16}/> Change Photo <input type="file" hidden onChange={e=>setFile(e.target.files[0])}/>
            </label>
            <p className="text-xs text-slate-400 mt-2">Recommended: 500x500px Square JPG</p>
          </div>
        </div>
        <div className="space-y-4">
          <Input label="Hero Title" k="heroTitle" placeholder="Merging Technical Logic..." />
          <Input label="Hero Subtitle" k="heroSubtitle" placeholder="I noticed a gap in the market..." />
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-6">
        <h3 className="font-bold text-lg mb-4 text-slate-800">Contact Info</h3>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Phone" k="phone" />
          <Input label="Email" k="email" />
          <Input label="Location" k="location" />
          <Input label="Address" k="address" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-6">
        <h3 className="font-bold text-lg mb-4 text-slate-800">Social Links</h3>
        <div className="grid grid-cols-1 gap-4">
          <Input label="WhatsApp (Full Link)" k="whatsapp" placeholder="https://wa.me/..." />
          <Input label="LinkedIn" k="linkedin" />
          <Input label="GitHub" k="github" />
          <Input label="Twitter" k="twitter" />
          <Input label="Instagram" k="instagram" />
          <Input label="Facebook" k="facebook" />
        </div>
      </div>

      <button disabled={loading} onClick={handleSave} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-200">
        {loading ? <Loader2 className="animate-spin"/> : <><Save size={20}/> Save Changes</>}
      </button>
    </div>
  );
};

export default SettingsTab;