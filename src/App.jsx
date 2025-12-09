import React, { Suspense, lazy, useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Blog from './components/sections/Blog';
import Library from './components/sections/Library';
import Contact from './components/sections/Contact';
import { Loader2, MessageCircle, Phone, Mail, MapPin, Linkedin, Github, Twitter, Instagram } from 'lucide-react';
import { auth, db } from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { userData } from './data/userData'; 

import AdminDashboard from './components/admin/AdminDashboard';

const SectionLoader = () => (<div className="py-24 flex justify-center"><Loader2 className="animate-spin text-blue-600"/></div>);

// Custom WhatsApp Icon for Footer
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
);

function App() {
  const [isAdminView, setIsAdminView] = useState(false);
  const [contactInfo, setContactInfo] = useState(userData.socials); 
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
     // Fetch Settings
     const unsubSettings = onSnapshot(doc(db, "settings", "general"), (docSnap) => { 
       if(docSnap.exists()) {
         const data = docSnap.data();
         setContactInfo({ ...userData, ...userData.socials, ...data });
       }
     });

     // Auth Persistence
     const unsubAuth = onAuthStateChanged(auth, (u) => {
       if(u) setIsAdminView(true);
       setAuthLoading(false);
     });

     return () => { unsubSettings(); unsubAuth(); }
  }, []);

  if (authLoading) return <SectionLoader />;

  if (isAdminView) {
    return (
      <>
        <div className="fixed bottom-4 right-4 z-[1000]">
          <button onClick={() => setIsAdminView(false)} className="bg-red-600 text-white px-4 py-2 rounded-full shadow-xl font-bold text-xs hover:bg-red-700 transition-all hover:scale-105 border border-red-400">Back to Site</button>
        </div>
        <AdminDashboard />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />
      
      <main>
        <div id="home"><Hero /></div>
        <div id="about"><About /></div>
        <div id="skills"><Skills /></div>
        <div id="projects"><Projects /></div>
        <div id="blog"><Blog /></div>
        <div id="library"><Library /></div>
        <div id="contact"><Contact /></div>
      </main>

      <footer className="bg-[#0f172a] text-slate-300 pt-16 pb-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-10 md:gap-20 mb-12">
            
            <div className="md:w-1/3 space-y-4">
               <h3 className="text-white font-bold text-2xl tracking-wider">{userData.name}</h3>
               <p className="text-slate-400 text-sm leading-relaxed">{userData.tagline}</p>
            </div>

            <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div>
                <h4 className="text-white font-bold text-sm mb-4">Contact</h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2"><Phone size={16} className="text-blue-500" /> <span>{contactInfo.phone}</span></li>
                  <li className="flex items-center gap-2"><Mail size={16} className="text-blue-500" /> <span>{contactInfo.email}</span></li>
                  <li className="flex items-start gap-2"><MapPin size={16} className="text-blue-500 mt-1" /> <span>{contactInfo.location}</span></li>
                </ul>
              </div>
              <div>
                 <h4 className="text-white font-bold text-sm mb-4">Socials</h4>
                 <div className="flex gap-4 flex-wrap">
                    {/* WhatsApp Iko Hapa Sasa */}
                    {contactInfo.whatsapp && (
                       <a href={contactInfo.whatsapp} target="_blank" rel="noreferrer" className="p-2 bg-slate-800 rounded-lg hover:bg-[#25D366] hover:text-white transition-all text-slate-400">
                         <WhatsAppIcon />
                       </a>
                    )}
                    {contactInfo.linkedin && <a href={contactInfo.linkedin} target="_blank" className="p-2 bg-slate-800 rounded-lg hover:bg-blue-600 hover:text-white transition-all text-slate-400"><Linkedin size={20}/></a>}
                    {contactInfo.github && <a href={contactInfo.github} target="_blank" className="p-2 bg-slate-800 rounded-lg hover:bg-white hover:text-black transition-all text-slate-400"><Github size={20}/></a>}
                    {contactInfo.twitter && <a href={contactInfo.twitter} target="_blank" className="p-2 bg-slate-800 rounded-lg hover:bg-sky-500 hover:text-white transition-all text-slate-400"><Twitter size={20}/></a>}
                    {contactInfo.instagram && <a href={contactInfo.instagram} target="_blank" className="p-2 bg-slate-800 rounded-lg hover:bg-pink-600 hover:text-white transition-all text-slate-400"><Instagram size={20}/></a>}
                 </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-xs text-slate-500">
            <p>
              © {new Date().getFullYear()} {userData.name}. All Rights Reserved
              {/* THE STEALTH DOT (.) - Imerekebishwa iwe rahisi kugusika */}
              <button 
                onClick={() => setIsAdminView(true)} 
                className="w-4 h-4 inline-flex items-center justify-center ml-1 text-slate-800 hover:text-slate-600 focus:outline-none transition-colors cursor-pointer select-none"
                title="."
              >.</button>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;