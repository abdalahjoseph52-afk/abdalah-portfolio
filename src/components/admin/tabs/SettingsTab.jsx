import React, { useState } from 'react';
import { db } from '../../../lib/firebase';
import { collection, addDoc, serverTimestamp, getDocs, writeBatch, doc } from 'firebase/firestore';
import { userData } from '../../../data/userData';
import { UploadCloud, Trash2, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { useToast } from '../../../context/ToastContext';

const SettingsTab = () => {
  const [loading, setLoading] = useState(false);
  const { success, error } = useToast();

  const handleSeedProjects = async () => {
    if (!confirm("This will upload all projects from userData.js to Firebase. Continue?")) return;
    
    setLoading(true);
    try {
      const projectsRef = collection(db, 'projects');
      
      // Upload each project one by one
      const uploadPromises = userData.projects.map(project => 
        addDoc(projectsRef, {
          ...project,
          createdAt: serverTimestamp(), // Adds a timestamp so they can be sorted
          status: project.status || "Live System",
          statusColor: project.statusColor || "text-green-600 bg-green-50 border-green-100"
        })
      );

      await Promise.all(uploadPromises);
      success(`Successfully uploaded ${userData.projects.length} projects!`);
    } catch (err) {
      console.error(err);
      error("Failed to upload projects.");
    }
    setLoading(false);
  };

  const handleClearProjects = async () => {
    if (!confirm("WARNING: This will DELETE ALL projects from the database. This cannot be undone.")) return;
    
    setLoading(true);
    try {
      const q = collection(db, 'projects');
      const snapshot = await getDocs(q);
      
      const batch = writeBatch(db);
      snapshot.docs.forEach((docSnap) => {
        batch.delete(doc(db, 'projects', docSnap.id));
      });
      
      await batch.commit();
      success("All projects deleted from database.");
    } catch (err) {
      console.error(err);
      error("Failed to delete projects.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      
      <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl">
        <h3 className="text-lg font-bold text-blue-900 mb-2 flex items-center gap-2">
          <UploadCloud className="w-5 h-5"/> Data Migration
        </h3>
        <p className="text-blue-700 text-sm mb-6">
          Your database is currently empty. Use this tool to upload your static projects from <code>userData.js</code> into the live Firebase database.
        </p>

        <button 
          onClick={handleSeedProjects} 
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-3 transition-all shadow-lg shadow-blue-200"
        >
          {loading ? <Loader2 className="animate-spin"/> : <UploadCloud size={20}/>}
          Import Projects to Database
        </button>
      </div>

      <div className="bg-red-50 border border-red-100 p-6 rounded-2xl opacity-80 hover:opacity-100 transition-opacity">
        <h3 className="text-lg font-bold text-red-900 mb-2 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5"/> Danger Zone
        </h3>
        <p className="text-red-700 text-sm mb-6">
          Need to restart? This will wipe all projects from the database so you can re-import them clean.
        </p>

        <button 
          onClick={handleClearProjects} 
          disabled={loading}
          className="bg-white border border-red-200 text-red-600 hover:bg-red-600 hover:text-white px-6 py-3 rounded-xl font-bold flex items-center gap-3 transition-all"
        >
          {loading ? <Loader2 className="animate-spin"/> : <Trash2 size={20}/>}
          Delete All Projects
        </button>
      </div>

    </div>
  );
};

export default SettingsTab;